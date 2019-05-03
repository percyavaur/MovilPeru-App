import React from 'react';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';

export default class App extends React.Component {

  state = {
    isLoadingComplete: false,
  }

  render() {
    return (
      <AppNavigator />
    )
  }
}
