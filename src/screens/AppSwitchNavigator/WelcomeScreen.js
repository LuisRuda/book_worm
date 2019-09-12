import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-ionicons';

import colors from '../../assets/colors';
import CustomActionButton from '../../components/CustomActionButton';

export default class WelcomeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerLogo}>
          <Icon
            ios="ios-bookmarks"
            android="md-bookmarks"
            size={150}
            color={colors.logoColor}
          />
          <Text style={styles.title}>Book Worm</Text>
        </View>
        <View style={styles.containerButtons}>
          <CustomActionButton
            style={styles.loginButton}
            title="Login in"
            onPress={() => this.props.navigation.navigate('HomeScreen')}>
            <Text style={styles.text}>Login In</Text>
          </CustomActionButton>
          <CustomActionButton
            style={styles.logoutButton}
            title="Sign up"
            onPress={() => this.props.navigation.navigate('SignUpScreen')}>
            <Text style={styles.text}>Sign Up</Text>
          </CustomActionButton>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgMain,
  },
  containerLogo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 50,
    fontWeight: '100',
    color: '#fff',
  },
  containerButtons: {
    flex: 1,
    alignItems: 'center',
  },
  loginButton: {
    width: 200,
    backgroundColor: 'transparent',
    borderWidth: 0.5,
    borderColor: colors.bgPrimary,
    marginBottom: 10,
  },
  logoutButton: {
    width: 200,
    backgroundColor: 'transparent',
    borderWidth: 0.5,
    borderColor: colors.bgError,
  },
  text: {
    fontWeight: '100',
    color: '#fff',
  },
});
