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
});

class BooksReadScreen extends Component {
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
          data={this.props.books.booksRead}
          renderItem={({item}, index) => this.renderItem(item, index)}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={
            !this.props.books.isLoadingBooks && (
              <ListEmptyComponent text="No books read." />
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

export default connect(mapStateToProps)(BooksReadScreen);
