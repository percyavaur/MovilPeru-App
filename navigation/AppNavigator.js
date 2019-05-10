import React, { Component } from "react";
import { connect } from 'react-redux';
import Icon from '@expo/vector-icons/Ionicons';
import {
  createSwitchNavigator,
  createAppContainer,
  createDrawerNavigator,
  createBottomTabNavigator,
  createStackNavigator
} from 'react-navigation';
import DrawerContent from "../components/DrawerContent";
import { NavigationOptions2 } from "./NavigationOptions";
import * as screen from "../screens";

const Home2Redux = connect(state => ({ count: state.count }))(screen.Home2);
const Home3Redux = connect(state => ({ count: state.count }))(screen.Home3);
const LoginRedux = connect(state => ({ currentUser: state.currentUser }))(screen.LoginModal);
const DrawerRedux = connect(state => ({ currentUser: state.currentUser }))(DrawerContent);

export default class AppNavigator extends Component {

  render() {
    const HomeStack = createStackNavigator({
      Home: { screen: screen.HomeScreen },
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
      Test: { screen: screen.TestScreen }
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
        initialRouteName: "Home",
        navigationOptions: () => {
          return {
            header: null,
          };
        },
        tabBarOptions: {
          showIcon: true,
          style: {
            backgroundColor: "#f7c600",
          },
          activeTintColor: "#848D70",
          inactiveTintColor: "#16161E",
        },
      },
    );

    const DashboardStackNavigator = createStackNavigator(
      {
        DashboardTabNavigator: DashboardTabNavigator,
        LoginModal: { screen: LoginRedux }
      },
      {
        mode: 'modal',
        headerMode: 'none',
      });

    const AppDrawerNavigator = createDrawerNavigator({
      Dashboard: {
        screen: DashboardStackNavigator
      },
    }, {
        contentComponent: DrawerRedux,
        drawerPosition: "right",
        navigationOptions: {
          drawerLockMode: 'locked-closed'
        }
      });

    const AppSwitchNavigator = createSwitchNavigator({
      Dashboard: { screen: AppDrawerNavigator }
    });

    const AppContainer = createAppContainer(AppSwitchNavigator);
    return <AppContainer />;
  }
}