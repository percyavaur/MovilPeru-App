import React from "react";
import { Provider } from "react-redux";
import { StatusBar } from "react-native"
import AppNavigator from './navigation/AppNavigator';
import { store } from "./redux/store";
import { AppLoading, Font } from 'expo';
import { Ionicons } from '@expo/vector-icons';

function cacheFonts(fonts) {
  return fonts.map(font => Font.loadAsync(font));
}


export default class App extends React.Component {

  state = {
    isReady: false,
  };
  
  async _loadAssetsAsync() {

    await Expo.Font.loadAsync({
      NeoSans: require("./assets/fonts/NeoSans.ttf"),
    });
    const fontAssets = cacheFonts([Ionicons.font]);

    await Promise.all([...fontAssets]);
  }

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      )
    } else {
      return (
        <Provider store={store}>
          <StatusBar
            barStyle="light-content"
          />
          <AppNavigator />
        </Provider>
      )
    }

  }
}
