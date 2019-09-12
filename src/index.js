import React from 'react';
import {StatusBar} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import Icon from 'react-native-ionicons';

import colors from '../src/assets/colors';

import WelcomeScreen from './screens/AppSwitchNavigator/WelcomeScreen';
import HomeScreen from './screens/HomeScreen';
import SignUpScreen from './screens/SignUpScreen';
import SettingsScreen from './screens/SettingsScreen';

const App = () => (
  <>
    <StatusBar barStyle="light-content" backgroundColor={colors.bgMain} />
    <AppContainer />
  </>
);

const LoginStackNavigator = createStackNavigator({
  WelcomeScreen: {
    screen: WelcomeScreen,
    navigationOptions: {
      header: null,
    },
  },
  SignUpScreen,
});

const AppDrawerNavigator = createDrawerNavigator({
  HomeScreen: {
    screen: HomeScreen,
    navigationOptions: {
      title: 'Home',
      drawerIcon: () => (
        <Icon ios="ios-home" android="md-home" size={24} color="#000" />
      ),
    },
  },
  SettingsScreen: {
    screen: SettingsScreen,
    navigationOptions: {
      title: 'Settings',
      drawerIcon: () => (
        <Icon ios="ios-settings" android="md-settings" size={24} color="#000" />
      ),
    },
  },
});

const AppSwitchNavigator = createSwitchNavigator({
  LoginStackNavigator,
  AppDrawerNavigator,
});

const AppContainer = createAppContainer(AppSwitchNavigator);

export default App;
