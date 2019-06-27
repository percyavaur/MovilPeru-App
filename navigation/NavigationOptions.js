import React from "react";
import Icon from '@expo/vector-icons/Ionicons';
import { View } from "react-native";


export const NavigationOptions = (navigation, Title) => {
  return {
    headerRight: (
      <Icon
        style={{ paddingRight: 10 }}
        onPress={() => navigation.openDrawer()}
        name="md-menu"
        color="white"
        size={25}
      />
    ),
    headerTitle: Title ? Title : "Movil Peru",
    headerTintColor: 'white',
    headerLeft: (<View />),
    headerTitleStyle: {
      textAlign: "center",
      flex: 1,
      color: "white",
    },
    headerStyle: {
      backgroundColor: "#1B0088",
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 0,
    },
    headerBackTitle: null
  };
};

export const NavigationOptions2 = (navigation, Title) => {
  return {
    headerRight: (
      <Icon
        style={{ paddingRight: 10 }}
        onPress={() => navigation.openDrawer()}
        name="md-menu"
        color="white"
        size={25}
      />
    ),
    headerTitle: Title ? Title : "Movil Peru",
    headerTintColor: 'white',
    headerTitleStyle: {
      textAlign: "center",
      flex: 1,
      color: "white",
    },
    headerStyle: {
      backgroundColor: "#1B0088",
      textAlign: 'center',
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 0,
    },
    headerBackTitle: null,
  };
};