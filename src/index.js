import React, {Component} from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Icon from 'react-native-ionicons';
import FlashMessage from 'react-native-flash-message';
import {Provider} from 'react-redux';

import store from './redux/store';

import colors from '../src/assets/colors';

import BooksCountContainer from './redux/containers/BooksCountContainer';
import WelcomeScreen from './screens/AppSwitchNavigator/WelcomeScreen';
import LoadingScreen from './screens/AppSwitchNavigator/LoadingScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import SettingsScreen from './screens/SettingsScreen';
import CustomDrawerComponent from './screens/DrawerNavigator/CustomDrawerComponent';
import BooksReadingScreen from './screens/HomeTabNavigator/BooksReadingScreen';
import BooksReadScreen from './screens/HomeTabNavigator/BooksReadScreen';

const styles = StyleSheet.create({
  iconDrawer: {
    marginLeft: 30,
  },
});

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <StatusBar barStyle="light-content" backgroundColor={colors.bgMain} />
        <AppContainer />
        <FlashMessage position="top" floating />
      </Provider>
    );
  }
}

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

const HomeTabNavigator = createBottomTabNavigator(
  {
    HomeScreen: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarLabel: 'Total Books',
        tabBarIcon: ({tintColor}) => (
          <BooksCountContainer color={tintColor} type="books" />
        ),
      },
    },
    BooksReadingScreen: {
      screen: BooksReadingScreen,
      navigationOptions: {
        tabBarLabel: 'Books Reading',
        tabBarIcon: ({tintColor}) => (
          <BooksCountContainer color={tintColor} type="booksReading" />
        ),
      },
    },
    BooksReadScreen: {
      screen: BooksReadScreen,
      navigationOptions: {
        tabBarLabel: 'Books Read',
        tabBarIcon: ({tintColor}) => (
          <BooksCountContainer color={tintColor} type="booksRead" />
        ),
      },
    },
  },
  {
    tabBarOptions: {
      style: {
        backgroundColor: colors.bgMain,
      },
      activeTintColor: colors.logoColor,
      inactiveTintColor: colors.bgTextInput,
    },
  },
);

HomeTabNavigator.navigationOptions = ({navigation}) => {
  const {routeName} = navigation.state.routes[navigation.state.index];

  switch (routeName) {
    case 'HomeScreen':
      return {
        headerTitle: 'Total Books',
      };
    case 'BooksReadingScreen':
      return {
        headerTitle: 'Books Reading',
      };
    case 'BooksReadScreen':
      return {
        headerTitle: 'Books Read',
      };
    default:
      return {
        headerTitle: 'Book Worm',
      };
  }
};

const HomeStackNavigator = createStackNavigator(
  {
    HomeTabNavigator: {
      screen: HomeTabNavigator,
      navigationOptions: ({navigation}) => {
        return {
          headerLeft: (
            <Icon
              ios="ios-menu"
              android="md-menu"
              size={30}
              color={colors.logoColor}
              onPress={() => navigation.openDrawer()}
              style={styles.iconDrawer}
            />
          ),
        };
      },
    },
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: colors.bgMain,
      },
      headerTintColor: colors.txtWhite,
    },
  },
);

const AppDrawerNavigator = createDrawerNavigator(
  {
    HomeStackNavigator: {
      screen: HomeStackNavigator,
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
