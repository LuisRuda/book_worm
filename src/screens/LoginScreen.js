import React, {Component} from 'react';
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
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

  onSignIn = async () => {
    const {email, password} = this.state;
    if (email && password) {
      this.setState({isLoading: true});
      try {
        const response = await Firebase.auth().signInWithEmailAndPassword(
          email,
          password,
        );

        if (response) {
          this.setState({isLoading: false});
          this.props.navigation.navigate('LoadingScreen');
        }
      } catch (error) {
        this.setState({isLoading: false});
        switch (error.code) {
          case 'auth/user-not-found':
            showMessage({
              message: 'A user with that email does not exist. Try signing Up!',
              type: 'warning',
            });
            break;
          case 'auth/invalid-email':
            showMessage({
              message: 'Please enter an email address!',
              type: 'warning',
            });
            break;
        }
      }
    } else {
      showMessage({
        message: 'Please enter email and password!',
        type: 'warning',
      });
    }
  };

  onSignUp = async () => {
    const {email, password} = this.state;
    if (email && password) {
      this.setState({isLoading: true});
      try {
        const response = await Firebase.auth().createUserWithEmailAndPassword(
          email,
          password,
        );

        if (response) {
          this.setState({isLoading: true});
          //Signin the user
          this.onSignIn(email, password);
        }
      } catch (error) {
        this.setState({isLoading: false});
        if (error.code === 'auth/email-already-in-use') {
          showMessage({
            message: 'User already exists. Try loggin in!',
            type: 'warning',
          });
        }
      }
    } else {
      showMessage({
        message: 'Please enter email and password!',
        type: 'warning',
      });
    }
  };

  render() {
    const {isLoading} = this.state;

    return (
      <View style={styles.container}>
        {isLoading && (
          <View style={styles.containerLoading}>
            <ActivityIndicator size="large" color={colors.logoColor} />
          </View>
        )}
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
  containerLoading: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    elevation: 1000,
  },
});
