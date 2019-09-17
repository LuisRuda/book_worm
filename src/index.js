import React from 'react';
import {StatusBar} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import Icon from 'react-native-ionicons';
import FlashMessage from 'react-native-flash-message';

import colors from '../src/assets/colors';

import WelcomeScreen from './screens/AppSwitchNavigator/WelcomeScreen';
import LoadingScreen from './screens/AppSwitchNavigator/LoadingScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import SettingsScreen from './screens/SettingsScreen';
import CustomDrawerComponent from './screens/DrawerNavigator/CustomDrawerComponent';

const App = () => (
  <>
    <StatusBar barStyle="light-content" backgroundColor={colors.bgMain} />
    <AppContainer />
    <FlashMessage position="top" floating />
  </>
);

const LoginStackNavigator = createStackNavigator(
  {
    WelcomeScreen: {
      screen: WelcomeScreen,
      navigationOptions: {
        header: null,
      },
    },
    LoginScreen: {
      screen: LoginScreen,
      navigationOptions: {},
    },
  },
  {
    mode: 'modal',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: colors.bgMain,
      },
    },
  },
);

const AppDrawerNavigator = createDrawerNavigator(
  {
    HomeScreen: {
      screen: HomeScreen,
      navigationOptions: {
        title: 'Home',
        drawerIcon: () => <Icon ios="ios-home" android="md-home" size={24} />,
      },
    },
    SettingsScreen: {
      screen: SettingsScreen,
      navigationOptions: {
        title: 'Settings',
        drawerIcon: () => (
          <Icon ios="ios-settings" android="md-settings" size={24} />
        ),
      },
    },
  },
  {
    contentComponent: CustomDrawerComponent,
  },
);

const AppSwitchNavigator = createSwitchNavigator({
  LoadingScreen,
  LoginStackNavigator,
  AppDrawerNavigator,
});

const AppContainer = createAppContainer(AppSwitchNavigator);

export default App;
