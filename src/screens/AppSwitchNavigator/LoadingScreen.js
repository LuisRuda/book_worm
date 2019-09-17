import React, {Component} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import Firebase from 'react-native-firebase';

import colors from '../../assets/colors';

export default class LoadingScreen extends Component {
  componentDidMount() {
    this.checkIfLoggedIn();
  }

  checkIfLoggedIn = () => {
    this.unsubscribe = Firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // navigate to the home screen
        this.props.navigation.navigate('HomeScreen', {user});
      } else {
        // navigate the user to the login screen
        this.props.navigation.navigate('LoginStackNavigator');
      }
    });
  };

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.logoColor} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.bgMain,
  },
});
