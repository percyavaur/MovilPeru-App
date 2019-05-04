import React, { Component } from "react";
import Icon from '@expo/vector-icons/Ionicons';
import {
  createSwitchNavigator,
  createAppContainer,
  createDrawerNavigator,
  createBottomTabNavigator,
  createStackNavigator
} from 'react-navigation';
import { connect } from 'react-redux';
import HomeScreen from "../screens/homeStack/HomeScreen";
import TestScreen from "../screens/testStack/TestScreen";
import DrawerContent from "../components/DrawerContent";
import Home2 from "../screens/homeStack/Home2"
import Home3 from "../screens/homeStack/Home3"
import { NavigationOptions2 } from "./NavigationOptions";

const Home2Redux = connect(state => ({ count: state.count }))(Home2);
const Home3Redux = connect(state => ({ count: state.count }))(Home3);

export default class AppNavigator extends Component {

  render() {
    const HomeStack = createStackNavigator({
      Home: { screen: HomeScreen },
      Home2: { screen: Home2Redux, navigationOptions: NavigationOptions2 },
      Home3: { screen: Home3Redux, navigationOptions: NavigationOptions2 }
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