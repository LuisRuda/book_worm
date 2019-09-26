import React, {Component} from 'react';
import {View, StyleSheet, FlatList, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';

import colors from '../../assets/colors';
import ListItem from '../../components/ListItem';
import ListEmptyComponent from '../../components/ListEmptyComponent';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgMain,
  },
  ListEmptyComponent: {
    marginTop: 50,
    alignItems: 'center',
  },
  ListEmptyComponentText: {
    fontWeight: 'bold',
  },
});

class BooksReadingScreen extends Component {
  renderItem = item => {
    return <ListItem item={item} />;
  };

  render() {
    return (
      <View style={styles.container}>
        {this.props.books.isLoadingBooks && (
          <View style={styles.containerLoading}>
            <ActivityIndicator size="large" color={colors.logoColor} />
          </View>
        )}
        <FlatList
          data={this.props.books.booksReading}
          renderItem={({item}, index) => this.renderItem(item, index)}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={
            !this.props.books.isLoadingBooks && (
              <ListEmptyComponent text="Not reading any books." />
            )
          }
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    books: state.books,
  };
};

export default connect(mapStateToProps)(BooksReadingScreen);
