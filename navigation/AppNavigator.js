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
          color={focused ? "#ED1650" : "white"}
          size={25}
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
          color={focused ? "#ED1650" : "white"}
          size={25}
          name="ios-apps"
        />
      )
    }

    const TripsStack = createStackNavigator({
      Trips: { screen: screen.TripsScreen },
      DestinosScreen:{screen: screen.DestinosScreen},
      PasajerosScreen:{screen: screen.PasajerosScreen},
      IdaCalendarScreen:{screen: screen.IdaCalendarScreen},
      VueltaCalendarScreen:{screen: screen.VueltaCalendarScreen}
    });

    TripsStack.navigationOptions = {
      tabBarLabel: "Trips",
      tabBarIcon: ({ focused }) => (
        <Icon
          color={focused ? "#ED1650" : "white"}
          size={25}
          name="md-bus"
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
            backgroundColor: "#1B0088",
          },
          activeTintColor: "#ED1650",
          inactiveTintColor: "white",
        },
      },
    );

    const DashboardStackNavigator = createStackNavigator(
      {
        DashboardTabNavigator: DashboardTabNavigator,
        LoginModal: { screen: LoginRedux },
        RegisterModal: { screen: RegisterRedux },
        Profile: {screen: screen.ProfileScreen}
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
      });

    const AppSwitchNavigator = createSwitchNavigator({
      Dashboard: { screen: AppDrawerNavigator }
    });

    const AppContainer = createAppContainer(AppSwitchNavigator);
    return <AppContainer />;
  }
}