import React, { Component } from 'react';
import { StyleProvider } from 'native-base';
import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';
import AppNavigator from './src/navigation/AppNavigator';

export default class App extends Component {
  render() {
    console.disableYellowBox = true;
    return (
      <StyleProvider style={getTheme(material)}>
        <AppNavigator />
      </StyleProvider>
    );
  }
}