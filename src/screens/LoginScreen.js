import React, {Component} from 'react';
import {TextInput, View, Text, StyleSheet} from 'react-native';
import Firebase from 'react-native-firebase';
import {showMessage} from 'react-native-flash-message';

import colors from '../assets/colors';
import CustomActionButton from '../components/CustomActionButton';

export default class LoginScreen extends Component {
  state = {
    email: '',
    password: '',
    isLoading: false,
  };

  onSignIn = () => {

  }

  onSignUp = async () => {
    const {email, password} = this.state;
    if (email && password) {
      try {
        const response = await Firebase.auth().createUserWithEmailAndPassword(
          email,
          password,
        );
      } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
          showMessage({
            message: 'User already exists. Try loggin in!',
            type: 'warning',
          });
        }
      }
    } else {
      showMessage({
        message: "Please enter email and password!",
        type: "warning",
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.sections}>
          <TextInput
            style={styles.textInput}
            placeholder="seuemail@email.com"
            placeholderTextColor={colors.bgTextInputDark}
            keyboardType="email-address"
            onChangeText={email => this.setState({email})}
          />
          <TextInput
            style={styles.textInput}
            placeholder="enter password"
            placeholderTextColor={colors.bgTextInputDark}
            secureTextEntry
            onChangeText={password => this.setState({password})}
          />

          <View style={styles.containerButtons}>
            <CustomActionButton
              onPress={this.onSignIn}
              style={[styles.loginButtons, {borderColor: colors.bgPrimary}]}>
              <Text style={styles.textButton}>Login</Text>
            </CustomActionButton>
            <CustomActionButton
              onPress={this.onSignUp}
              style={[styles.loginButtons, {borderColor: colors.bgError}]}>
              <Text style={styles.textButton}>Sign Up</Text>
            </CustomActionButton>
          </View>
        </View>
        <View style={styles.sections} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgMain,
  },
  sections: {
    flex: 1,
    justifyContent: 'center',
  },
  textInput: {
    height: 50,
    borderWidth: 0.5,
    borderColor: colors.borderColor,
    marginHorizontal: 40,
    marginBottom: 10,
    color: colors.txtWhite,
    paddingHorizontal: 10,
  },
  loginButtons: {
    borderWidth: 0.5,
    backgroundColor: 'transparent',
    marginTop: 10,
    width: 200,
  },
  containerButtons: {
    alignItems: 'center',
  },
  textButton: {
    color: '#fff',
    fontWeight: '100',
  },
});
