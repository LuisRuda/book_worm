import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import colors from '../../assets/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const BooksCountContainer = ({color, type, ...props}) => {
  return (
    <View style={styles.container}>
      <Text style={{color: color}}>{props.books[type].length || 0}</Text>
    </View>
  );
};

BooksCountContainer.defaultProps = {
  color: colors.txtPlaceholder,
};

BooksCountContainer.propTypes = {
  color: PropTypes.string,
  type: PropTypes.string.isRequired,
};

const mapStateToProps = state => {
  return {
    books: state.books,
  };
};

export default connect(mapStateToProps)(BooksCountContainer);
