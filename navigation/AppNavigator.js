import React, { Component } from "react";
import Icon from '@expo/vector-icons/Ionicons';
import {
  createSwitchNavigator,
  createAppContainer,
  createDrawerNavigator,
  createBottomTabNavigator,
  createStackNavigator
} from 'react-navigation';

import HomeScreen from "../screens/HomeScreen";
import TestScreen from "../screens/TestScreen";

export default class AppNavigator extends Component {
  render() {

    const DashboardTabNavigator = createBottomTabNavigator(
      {
          Home: HomeScreen,
          Test: TestScreen,
      }
  );

    const DashboardStackNavigator = createStackNavigator({
      DashboardTabNavigator: DashboardTabNavigator
    },{
      defaultNavigationOptions: ({ navigation }) => {
        return {
          headerLeft: (
            <Icon
              style={{ paddingLeft: 10 }}
              onPress={() => navigation.openDrawer()}
              name="md-menu"
              size={30}
            />
          )
        };
      }
  }
    );

    const AppDrawerNavigator = createDrawerNavigator({
      Dashboard: {
        screen: DashboardStackNavigator
      }
    });

    const AppSwitchNavigator = createSwitchNavigator({
      Dashboard: { screen: AppDrawerNavigator }
    });

    const AppContainer = createAppContainer(AppSwitchNavigator);
    return <AppContainer />;
  }
}