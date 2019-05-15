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
        color="white"
        size={25}
      />
    ),
    headerTitle: "Movil Peru",
    headerTintColor: 'white',
    headerLeft: (<View />),
    headerTitleStyle: {
      textAlign: "center",
      flex: 1,
      color: "white",
      fontFamily: "NeoSans"
    },
    headerStyle: {
      backgroundColor: "#1B0088",
    }
  };
};

export const NavigationOptions2 = ({navigation}) => {
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
    headerTitle: "Movil Peru",
    headerTintColor: 'white',
    headerTitleStyle: {
      textAlign: "center",
      flex: 1,
      color: "white",
      fontFamily: "NeoSans"
    },
    headerStyle: {
      backgroundColor: "#1B0088",
      textAlign: 'center',
    }
  };
};