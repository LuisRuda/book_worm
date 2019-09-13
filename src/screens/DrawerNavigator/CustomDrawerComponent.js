import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Platform,
} from 'react-native';
import Icon from 'react-native-ionicons';
import {DrawerNavigatorItems} from 'react-navigation-drawer';

import colors from '../../assets/colors';

export default class CustomDrawerComponent extends Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <SafeAreaView style={styles.header}>
          <Icon
            ios="ios-bookmarks"
            android="md-bookmarks"
            size={100}
            color={colors.logoColor}
          />
          <Text style={styles.text}>Book Worm</Text>
        </SafeAreaView>
        <SafeAreaView>
          <DrawerNavigatorItems {...this.props} />
        </SafeAreaView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 150,
    backgroundColor: colors.bgMain,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? 20 : 0,
  },
  text: {
    fontSize: 24,
    color: '#fff',
    fontWeight: '100',
  },
});
