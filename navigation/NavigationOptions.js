import React from "react";
import Icon from '@expo/vector-icons/Ionicons';

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
        headerStyle: {
          backgroundColor: "#fecc00",
        }
      };
};