import React from 'react';
import {Text, View} from 'react-native';
import PropTypes from 'prop-types';

const BookCount = ({title, count}) => (
  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text style={{fontSize: 18}}>{title}</Text>
    <Text>{count}</Text>
  </View>
);

BookCount.propTypes = {
  count: PropTypes.number.isRequired,
  title: PropTypes.string,
};

BookCount.defaultProps = {
  title: 'Title',
};

export default BookCount;
