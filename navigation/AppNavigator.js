import React, { Component } from "react";
import { connect } from 'react-redux';
import Icon from '@expo/vector-icons';
import {
  createSwitchNavigator,
  createAppContainer,
  createDrawerNavigator,
  createBottomTabNavigator,
  createStackNavigator
} from 'react-navigation';
import DrawerContent from "../components/DrawerContent";
import * as screen from "../screens";
import { NativeViewGestureHandler } from "react-native-gesture-handler";

const LoginRedux = connect(state => ({ currentUser: state.currentUser }))(screen.LoginModal);
const RegisterRedux = connect(state => ({ currentUser: state.currentUser }))(screen.RegisterModal);
const DrawerRedux = connect(state => ({ currentUser: state.currentUser }))(DrawerContent);
const ProfileRedux = connect(state => ({ currentUser: state.currentUser }))(screen.ProfileScreen);
const TripsRedux = connect( state => ({ currentTrip: state.currentTrip }))(screen.TripsScreen);
const DestinosRedux = connect( state => ({ currentTrip: state.currentTrip }))(screen.DestinosScreen);
const PasajerosRedux = connect( state => ({ currentTrip: state.currentTrip }))(screen.PasajerosScreen);
const IdaCalendarRedux = connect( state => ({ currentTrip: state.currentTrip }))(screen.IdaCalendarScreen);
const VueltaCalendarRedux = connect( state => ({ currentTrip: state.currentTrip }))(screen.VueltaCalendarScreen);
const OrigenRedux = connect( state => ({ currentTrip: state.currentTrip }))(screen.OrigenScreen);
export default class AppNavigator extends Component {

  render() {

    const TripsStack = createStackNavigator({
      Trips: { screen: TripsRedux },
      OrigenScreen: { screen: OrigenRedux},
      DestinosScreen: { screen: DestinosRedux},
      PasajerosScreen: { screen: PasajerosRedux },
      IdaCalendarScreen: { screen: IdaCalendarRedux },
      VueltaCalendarScreen: { screen: VueltaCalendarRedux }
    });

    TripsStack.navigationOptions = {
      tabBarLabel: "Trips",
      tabBarIcon: ({ focused }) => (
        <Icon.Ionicons
          color={focused ? "#ED1650" : "white"}
          size={25}
          name="md-bus"
        />
      )
    }

    const HomeStack = createStackNavigator({
      Home: { screen: screen.HomeScreen },
    });

    HomeStack.navigationOptions = {
      tabBarLabel: "Home",
      tabBarIcon: ({ focused }) => (
        <Icon.Ionicons
          color={focused ? "#ED1650" : "white"}
          size={25}
          name="md-home"
        />
      )
    }

    const GraphStack = createStackNavigator({
      Graph: { screen: screen.GraphScreen }
    });

    GraphStack.navigationOptions = {
      tabBarLabel: "Graph",
      tabBarIcon: ({ focused }) => (
        <Icon.Foundation
          color={focused ? "#ED1650" : "white"}
          size={25}
          name="graph-pie"
        />
      )
    }

    const ModalStack = createStackNavigator({
      LoginModal: { screen: LoginRedux },
      RegisterModal: { screen: RegisterRedux },
    },
      {
        mode: 'modal',
        headerMode: 'none',
      });

    ModalStack.navigationOptions = {
      header: null
    }

    const ProfileStack = createStackNavigator({
      Profile: { screen: ProfileRedux }
    }, {
        headerMode: 'none',
      });

    ProfileStack.navigationOptions = {
      headerStyle: {
        backgroundColor: "#1B0088",
        textAlign: 'center',
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
      },
      headerTintColor: 'white',
    }


    const DashboardTabNavigator = createBottomTabNavigator(
      {
        Graph: GraphStack,
        Trips: TripsStack,
        Home: HomeStack,
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
        ModalStack: ModalStack,
        ProfileStack: ProfileStack
      });

    const AppDrawerNavigator = createDrawerNavigator({
      Dashboard: {
        screen: DashboardStackNavigator
      },
      Profile: { screen: screen.ProfileScreen }
      ,
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