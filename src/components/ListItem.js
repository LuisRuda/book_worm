import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

import colors from '../assets/colors';

const ListItem = ({item, children, marginVertical, editable, onPress}) => {
  return (
    <View style={[styles.listItemContainer, {marginVertical}]}>
      <View style={styles.imageContainer}>
        <TouchableOpacity
          style={styles.button}
          disabled={!editable}
          onPress={() => onPress(item)}>
          <Image style={styles.image} />
        </TouchableOpacity>
      </View>
      <View style={styles.listItemTitleContainer}>
        <Text style={styles.listItemTitle}>{item.name}</Text>
      </View>
      {children}
    </View>
  );
};

ListItem.defaultProps = {
  marginVertical: 5,
  editable: false,
};

const styles = StyleSheet.create({
  listItemContainer: {
    minHeight: 100,
    flexDirection: 'row',
    backgroundColor: colors.listItemBg,
    alignItems: 'center',
  },
  imageContainer: {
    height: 70,
    width: 70,
    marginLeft: 10,
  },
  image: {
    flex: 1,
    height: null,
    width: null,
    borderRadius: 35,
    backgroundColor: '#fff',
  },
  listItemTitleContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 5,
  },
  listItemTitle: {
    fontWeight: '100',
    fontSize: 22,
    color: colors.txtWhite,
  },
  button: {
    flex: 1,
  },
});

export default ListItem;
