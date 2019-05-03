import React from "react";
import Icon from '@expo/vector-icons/Ionicons';
import { View } from "react-native";


export const NavigationOptions = (navigation) => {
  return {
    headerRight: (
      <Icon
        style={{ paddingRight: 10 }}
        onPress={() => navigation.openDrawer()}
        name="md-menu"
        color="#16161E"
        size={30}
      />
    ),
    headerTitle: "Movil Peru",
    headerLeft: (<View />),
    headerTitleStyle: {
      textAlign: "center",
      flex: 1
    },
    headerStyle: {
      backgroundColor: "#fecc00",
    }
  };
};

export const NavigationOptionsSecundary = (navigation) => {
  return {
    headerRight: (
      <Icon
        style={{ paddingRight: 10 }}
        onPress={() => navigation.openDrawer()}
        name="md-menu"
        color="#16161E"
        size={30}
      />
    ),
    headerTitle: "Movil Peru",
    headerTitleStyle: {
      textAlign: "center",
      flex: 1
    },
    headerStyle: {
      backgroundColor: "#fecc00",
      textAlign: 'center',
    }
  };
};