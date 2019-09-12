import React from 'react';
import {StatusBar} from 'react-native';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import colors from '../src/assets/colors';

import WelcomeScreen from './screens/AppSwitchNavigator/WelcomeScreen';

const App = () => (
  <>
    <StatusBar barStyle="light-content" backgroundColor={colors.bgMain} />
    <AppContainer />
  </>
);

const AppSwitchNavigator = createSwitchNavigator({
  WelcomeScreen,
});

const AppContainer = createAppContainer(AppSwitchNavigator);

export default App;
