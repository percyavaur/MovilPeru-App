import React from "react";
import { Provider } from "react-redux";
import { StatusBar } from "react-native"
import AppNavigator from './navigation/AppNavigator';
import { store } from "./redux/store";

export default class App extends React.Component {

  render() {
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
