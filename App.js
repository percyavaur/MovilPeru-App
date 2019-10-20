import React from "react";
import { Provider } from "react-redux";
import { StatusBar, Platform } from "react-native"
import AppNavigator from './navigation/AppNavigator';
import { store } from "./redux/store";
import { AppLoading, Font, Notifications, Permissions} from 'expo';

function cacheFonts(fonts) {
  return fonts.map(font => Font.loadAsync(font));
}


export default class App extends React.Component {

  state = {
    isReady: false,
  };

  componentDidMount() {
    this.createChannel();

  }

  async createChannel() {
    if (Platform.OS === 'android') {
      Notifications.createChannelAndroidAsync('chat-messages', {
        name: 'Chat messages',
        sound: true,
        priority: 'max',
        vibrate: [0, 250, 250, 250],
      });

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

    /* Notifications.presentLocalNotificationAsync({
      title: 'New Message',
      body: 'Message!!!!',
      android: {
        channelId: 'chat-messages',
        priority: 'max',
        vibrate: [0, 250, 250, 250],
        color: '#ffff',
      },
    }); */
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
