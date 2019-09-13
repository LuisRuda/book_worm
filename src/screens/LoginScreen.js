import React, {Component} from 'react';
import {TextInput, View, Text, StyleSheet} from 'react-native';

import colors from '../assets/colors';
import CustomActionButton from '../components/CustomActionButton';

export default class LoginScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.sections}>
          <TextInput
            style={styles.textInput}
            placeholder="seuemail@email.com"
            placeholderTextColor={colors.bgTextInputDark}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.textInput}
            placeholder="enter password"
            placeholderTextColor={colors.bgTextInputDark}
            secureTextEntry
          />

          <View style={styles.containerButtons}>
            <CustomActionButton
              style={[styles.loginButtons, {borderColor: colors.bgPrimary}]}>
              <Text style={styles.textButton}>Login</Text>
            </CustomActionButton>
            <CustomActionButton
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
