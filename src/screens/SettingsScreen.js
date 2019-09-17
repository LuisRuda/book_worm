import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Firebase from 'react-native-firebase';
import {showMessage} from 'react-native-flash-message';

import CustomActionButton from '../components/CustomActionButton';
import colors from '../assets/colors';

export default class SettingsScreen extends Component {
  signOut = async () => {
    try {
      await Firebase.auth().signOut();
      this.props.navigation.navigate('WelcomeScreen');
    } catch (error) {
      showMessage({
        message: 'Unable to sign out right now!',
        type: 'warning',
      });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <CustomActionButton
          style={styles.button}
          title="Sign up"
          onPress={this.signOut}>
          <Text style={styles.text}>Log Out</Text>
        </CustomActionButton>
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
  button: {
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
