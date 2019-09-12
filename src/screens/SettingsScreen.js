import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import CustomActionButton from '../components/CustomActionButton';
import colors from '../assets/colors';

export default class SettingsScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <CustomActionButton
          style={styles.button}
          title="Sign up"
          onPress={() => this.props.navigation.navigate('WelcomeScreen')}>
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
