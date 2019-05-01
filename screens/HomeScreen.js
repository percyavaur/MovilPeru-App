import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';

export default class HomeScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: (
        <Icon
          style={{ paddingRight: 10 }}
          onPress={() => navigation.openDrawer()}
          name="md-menu"
          size={30}
        />
      ),
      headerTitle: "Movil Peru",
      headerStyle: {
        backgroundColor: "rgb(66, 179, 244)",
      }
    };
  };

  render() {
    return (
      <View style={styles.container}>
        <Image source={require("../assets/images/robot-prod.png")} />
        <Text> HOME Screen </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -50,
    marginLeft: -50,
  }
});
