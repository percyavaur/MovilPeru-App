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
import { NativeViewGestureHandler } from "react-native-gesture-handler";

const Home2Redux = connect(state => ({ count: state.count }))(screen.Home2);
const Home3Redux = connect(state => ({ count: state.count }))(screen.Home3);
const LoginRedux = connect(state => ({ currentUser: state.currentUser }))(screen.LoginModal);
const RegisterRedux = connect(state => ({ currentUser: state.currentUser }))(screen.RegisterModal);
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
          color={focused ? "#52606D" : "#855425"}
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
          color={focused ? "#52606D" : "#855425"}
          size={30}
          name="ios-apps"
        />
      )
    }

    const TripsStack = createStackNavigator({
      Trips: { screen: screen.TripsScreen },
      TripScreen1: { screen: screen.TripScreen1,navigationOptions: NavigationOptions2 },
      DestinoScreen2:{screen: screen.DestinoScreen2,navigationOptions: NavigationOptions2},
      PasajerosScreen:{screen: screen.PasajerosScreen,navigationOptions: NavigationOptions2},
      CalendarScreen1:{screen: screen.CalendarScreen1,navigationOptions: NavigationOptions2},
      CalendarScreen2:{screen: screen.CalendarScreen2,navigationOptions: NavigationOptions2}
    });

    TripsStack.navigationOptions = {
      tabBarLabel: "Trips",
      tabBarIcon: ({ focused }) => (
        <Icon
          color={focused ? "#52606D" : "#855425"}
          size={30}
          name="ios-airplane"
        />
      )
    }

    const DashboardTabNavigator = createBottomTabNavigator(
      {
        Trips: TripsStack,
        Home: HomeStack,
        Test: TestStack,
      }, {
        initialRouteName: "Trips",
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
          activeTintColor: "#52606D",
          inactiveTintColor: "#855425",
        },
      },
    );

    const DashboardStackNavigator = createStackNavigator(
      {
        DashboardTabNavigator: DashboardTabNavigator,
        LoginModal: { screen: LoginRedux },
        RegisterModal: { screen: RegisterRedux }
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