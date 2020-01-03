import React from "react";
import { Provider } from "react-redux";
import { StatusBar, Platform } from "react-native"
import AppNavigator from './navigation/AppNavigator';
import { store } from "./redux/store";
import { AppLoading, Font, Notifications, Permissions } from 'expo';

function cacheFonts(fonts) {
  return fonts.map(font => Font.loadAsync(font));
}

export default class App extends React.Component {

  state = {
    isReady: false,
  };

  componentDidMount() {
    this.createChannel();

    if (Platform.OS === 'android') {
      Notifications.createChannelAndroidAsync('news-notifications', {
        name: 'News Notifications',
        sound: false,
        priority: 'max',
        vibrate: [0, 250, 250, 250],
      });
    }
  }

  async createChannel() {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );

    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      try {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      } catch (e) {
        handleBasicError(e);
      }
    }

    if (finalStatus !== 'granted') {
      return;
    }
  }

  async _loadAssetsAsync() {
    await Expo.Font.loadAsync({
      NeoSans: require("./assets/fonts/NeoSans.ttf"),
    });
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
