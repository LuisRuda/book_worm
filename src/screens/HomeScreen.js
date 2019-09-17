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

import BookCount from '../components/BookCount';
import CustomActionButton from '../components/CustomActionButton';

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

    this.setState({currentUser: currentUserData.val()});
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
            books: [...state.books, book],
            booksReading: [...state.booksReading, book],
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

  markAsRead = (selectedBook, index) => {
    let books = this.state.books.filter(book => book !== selectedBook);
    let booksReading = this.state.booksReading.filter(
      book => book !== selectedBook);

    this.setState(prevState => ({
      books: books,
      booksReading: booksReading,
      booksRead: [...prevState.booksRead, selectedBook],
      // readingCount: prevState.readingCount - 1,
      // readCount: prevState.readCount + 1,
    }));
  };

  renderItem = (item, index) => (
    <View style={styles.listItemContainer}>
      <View style={styles.listItemTitleContainer}>
        <Text>{item}</Text>
      </View>
      <CustomActionButton
        style={styles.markAsReadButton}
        onPress={() => this.markAsRead(item, index)}>
        <Text style={styles.markAsReadButtonText}>Mark as read</Text>
      </CustomActionButton>
    </View>
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
  listItemContainer: {
    height: 50,
    flexDirection: 'row',
  },
  listItemTitleContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 5,
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
