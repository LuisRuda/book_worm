import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  FlatList,
} from 'react-native';
import Firebase from 'react-native-firebase';
import {showMessage} from 'react-native-flash-message';
import Icon from 'react-native-ionicons';
import * as Animatable from 'react-native-animatable';
import {connect} from 'react-redux';

import {snapshotToArray} from '../helpers/firebaseHelpers';

import CustomActionButton from '../components/CustomActionButton';
import ListItem from '../components/ListItem';
import ListEmptyComponent from '../components/ListEmptyComponent';

import colors from '../assets/colors';

class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: {},
      totalCount: 0,
      readingCount: 0,
      readCount: 0,
      isAddNewBookVisible: false,
      textInputData: '',
      books: [],
      booksReading: [],
      booksRead: [],
    };

    this.textInputRef = null;
  }

  componentDidMount = async () => {
    const {navigation} = this.props;
    const user = navigation.getParam('user');

    const currentUserData = await Firebase.database()
      .ref('users')
      .child(user.uid)
      .once('value');

    const books = await Firebase.database()
      .ref('books')
      .child(user.uid)
      .once('value');

    const booksArray = snapshotToArray(books);

    this.setState({
      currentUser: currentUserData.val(),
    });

    this.props.loadBooks(booksArray.reverse());
  };

  showAddNewBook = () => {
    this.setState({isAddNewBookVisible: true});
  };

  hideAddNewBook = () => {
    this.setState({isAddNewBookVisible: false});
  };

  addBook = async book => {
    this.setState({textInputData: ''});
    this.textInputRef.setNativeProps({text: ''});
    try {
      const snapshot = await Firebase.database()
        .ref('books')
        .child(this.state.currentUser.uid)
        .orderByChild('name')
        .equalTo(book)
        .once('value');

      if (snapshot.exists()) {
        showMessage({
          message: 'Unable to add as book already exists.',
          type: 'warning',
        });
      } else {
        const key = await Firebase.database()
          .ref('books')
          .child(this.state.currentUser.uid)
          .push().key;

        const response = await Firebase.database()
          .ref('books')
          .child(this.state.currentUser.uid)
          .child(key)
          .set({name: book, read: false});

        this.props.addBook({name: book, read: false, key});
      }
    } catch (error) {
      console.log(error);
    }
  };

  markAsRead = async (selectedBook, index) => {
    try {
      await Firebase.database()
        .ref('books')
        .child(this.state.currentUser.uid)
        .child(selectedBook.key)
        .update({read: true});

      let books = this.state.books.map(book => {
        if (book.name === selectedBook.name) {
          return {...book, read: true};
        }

        return book;
      });
      let booksReading = this.state.booksReading.filter(
        book => book.name !== selectedBook.name,
      );

      this.setState(prevState => ({
        books: books,
        booksReading: booksReading,
        booksRead: [
          ...prevState.booksRead,
          {name: selectedBook.name, read: true},
        ],
        // readingCount: prevState.readingCount - 1,
        // readCount: prevState.readCount + 1,
      }));

      this.props.markBookAsRead(selectedBook);
    } catch (error) {
      console.log(error);
    }
  };

  renderItem = (item, index) => (
    <ListItem item={item}>
      {item.read ? (
        <Icon
          ios="ios-checkmark"
          android="md-checkmark"
          color={colors.logoColor}
          size={30}
        />
      ) : (
        <CustomActionButton
          style={styles.markAsReadButton}
          onPress={() => this.markAsRead(item, index)}>
          <Text style={styles.markAsReadButtonText}>Mark as read</Text>
        </CustomActionButton>
      )}
    </ListItem>
  );

  render() {
    const {textInputData} = this.state;

    return (
      <View style={styles.container}>
        <SafeAreaView />
        <View style={styles.container}>
          <View style={styles.textInputContainer}>
            <TextInput
              onChangeText={text => this.setState({textInputData: text})}
              style={styles.textInput}
              placeholder="Enter Book Name"
              placeholderTextColor={colors.txtPlaceholder}
              ref={component => {this.textInputRef = component}}
            />
          </View>

          <FlatList
            data={this.props.books.books}
            renderItem={({item}, index) => this.renderItem(item, index)}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={
              <ListEmptyComponent text="Not reading any books." />
            }
          />

          <Animatable.View
            useNativeDriver={true}
            animation={
              this.state.textInputData.length > 0
                ? 'slideInRight'
                : 'slideOutRight'
            }>
            <CustomActionButton
              position="right"
              style={styles.addNewBookButton}
              onPress={() => this.addBook(this.state.textInputData)}>
              <Text style={styles.addNewBookButtonText}>+</Text>
            </CustomActionButton>
          </Animatable.View>
        </View>
        <SafeAreaView />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    books: state.books,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadBooks: books =>
      dispatch({
        type: 'LOAD_BOOKS_FROM_SERVER',
        payload: books,
      }),
    addBook: book => dispatch({type: 'ADD_BOOK', payload: book}),
    markBookAsRead: book =>
      dispatch({type: 'MARK_BOOK_AS_READ', payload: book}),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgMain,
  },
  header: {
    height: 70,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.borderColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 24,
  },
  textInputContainer: {
    height: 50,
    flexDirection: 'row',
    margin: 5,
  },
  textInput: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingLeft: 5,
    borderColor: colors.listItemBg,
    borderBottomWidth: 5,
    fontSize: 22,
    fontWeight: '200',
    color: colors.txtWhite,
  },
  checkmarkButton: {
    backgroundColor: colors.bgSuccess,
  },
  ListEmptyComponent: {
    marginTop: 50,
    alignItems: 'center',
  },
  ListEmptyComponentText: {
    fontWeight: 'bold',
  },
  markAsReadButton: {
    width: 100,
    backgroundColor: colors.bgSuccess,
  },
  markAsReadButtonText: {
    fontWeight: 'bold',
    color: '#FFF',
  },
  addNewBookButton: {
    backgroundColor: colors.bgPrimary,
    borderRadius: 25,
    zIndex: 100,
  },
  addNewBookButtonText: {
    color: '#FFF',
    fontSize: 30,
  },
  footer: {
    height: 70,
    borderTopWidth: 0.5,
    borderTopColor: colors.borderColor,
    flexDirection: 'row',
  },
});
