import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
} from 'react-native';
import Firebase from 'react-native-firebase';
import {showMessage} from 'react-native-flash-message';
import Icon from 'react-native-ionicons';

import {snapshotToArray} from '../helpers/firebaseHelpers';

import BookCount from '../components/BookCount';
import CustomActionButton from '../components/CustomActionButton';
import ListItem from '../components/ListItem';

import colors from '../assets/colors';

export default class HomeScreen extends Component {
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
      books: booksArray,
      booksReading: booksArray.filter(book => !book.read),
      booksRead: booksArray.filter(book => book.read),
    });
  };

  showAddNewBook = () => {
    this.setState({isAddNewBookVisible: true});
  };

  hideAddNewBook = () => {
    this.setState({isAddNewBookVisible: false});
  };

  addBook = async book => {
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

        this.setState((state, props) => ({
            books: [...state.books, {name: book, read: false}],
            booksReading: [...state.booksReading, {name: book, read: false}],
            isAddNewBookVisible: false,
          }),
          () => {
            console.log(this.state);
          },
        );
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
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Book Worm</Text>
        </View>
        <View style={styles.container}>
          {this.state.isAddNewBookVisible && (
            <View style={styles.textInputContainer}>
              <TextInput
                onChangeText={text => this.setState({textInputData: text})}
                style={styles.textInput}
                placeholder="Enter Book Name"
                placeholderTextColor="grey"
              />
              <CustomActionButton
                style={styles.checkmarkButton}
                onPress={() => this.addBook(textInputData)}>
                <Icon
                  ios="ios-checkmark"
                  android="md-checkmark"
                  color="#fff"
                  size={40}
                />
              </CustomActionButton>
              <CustomActionButton onPress={this.hideAddNewBook}>
                <Icon
                  ios="ios-close"
                  android="md-close"
                  color="#fff"
                  size={40}
                />
              </CustomActionButton>
            </View>
          )}

          <FlatList
            data={this.state.books}
            renderItem={({item}, index) => this.renderItem(item, index)}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={
              <View style={styles.ListEmptyComponent}>
                <Text style={styles.ListEmptyComponentText}>
                  Not reading any books.
                </Text>
              </View>
            }
          />
          <CustomActionButton
            position="right"
            style={styles.addNewBookButton}
            onPress={this.showAddNewBook}>
            <Text style={styles.addNewBookButtonText}>+</Text>
          </CustomActionButton>
        </View>
        <View style={styles.footer}>
          <BookCount title="Total Books" count={this.state.books.length} />
          <BookCount title="Reading" count={this.state.booksReading.length} />
          <BookCount title="Read" count={this.state.booksRead.length} />
        </View>
        <SafeAreaView />
      </View>
    );
  }
}

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
  },
  textInput: {
    flex: 1,
    backgroundColor: colors.bgTextInput,
    paddingLeft: 5,
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
