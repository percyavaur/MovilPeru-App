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
import DrawerContent from "../components/DrawerContent"

export default class AppNavigator extends Component {
  render() {

    const HomeStack = createStackNavigator({
      Home: { screen: HomeScreen }
    });

    HomeStack.navigationOptions = {
      tabBarLabel: "Home",
      tabBarIcon: ({ focused }) => (
        <Icon
          color={focused ? "#848D70" : "#16161E"}
          size={30}
          name="md-home"
        />
      )
    }

    const TestStack = createStackNavigator({
      Test: { screen: TestScreen }
    });

    TestStack.navigationOptions = {
      tabBarLabel: "Test",
      tabBarIcon: ({ focused }) => (
        <Icon
          color={focused ? "#848D70" : "#16161E"}
          size={30}
          name="ios-apps"
        />
      )
    }

    const DashboardTabNavigator = createBottomTabNavigator(
      {
        Home: HomeStack,
        Test: TestStack,
      }, {
        navigationOptions: () => {
          return {
            header: null,
          };
        },
        tabBarOptions: {
          showIcon: true,
          style: {
            backgroundColor: "#fecc00",
          },
          activeTintColor: "#848D70",
          inactiveTintColor: "#16161E",
        },
      },
    );

    const DashboardStackNavigator = createStackNavigator({
      DashboardTabNavigator: DashboardTabNavigator
    });

    const AppDrawerNavigator = createDrawerNavigator({
      Dashboard: {
        screen: DashboardStackNavigator
      },
    }, {
        contentComponent: DrawerContent,
        drawerPosition: "right",
      });

    const AppSwitchNavigator = createSwitchNavigator({
      Dashboard: { screen: AppDrawerNavigator }
    });

    const AppContainer = createAppContainer(AppSwitchNavigator);
    return <AppContainer />;
  }
}