import React, {Component} from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-ionicons';

import colors from '../../assets/colors';
import CustomActionButton from '../../components/CustomActionButton';

export default class WelcomeScreen extends Component {
  render() {
    return (
      <View style={{flex: 1, backgroundColor: colors.bgMain}}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Icon
            ios="ios-bookmarks"
            android="md-bookmarks"
            size={150}
            color={colors.logoColor}
          />
          <Text style={{fontSize: 50, fontWeight: '100', color: '#fff'}}>
            Book Worm
          </Text>
        </View>
        <View style={{flex: 1, alignItems: 'center'}}>
          <CustomActionButton
            style={{
              width: 200,
              backgroundColor: 'transparent',
              borderWidth: 0.5,
              borderColor: colors.bgPrimary,
              marginBottom: 10,
            }}
            title="Login in"
            onPress={() => alert('Login')}>
            <Text style={{fontWeight: '100', color: '#fff'}}>Login In</Text>
          </CustomActionButton>
          <CustomActionButton
            style={{
              width: 200,
              backgroundColor: 'transparent',
              borderWidth: 0.5,
              borderColor: colors.bgError,
            }}
            title="Sign up"
            onPress={() => alert('Sigup')}>
            <Text style={{fontWeight: '100', color: '#fff'}}>Sign Up</Text>
          </CustomActionButton>
        </View>
      </View>
    );
  }
}
