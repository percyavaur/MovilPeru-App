import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Button } from "native-base";
import { NavigationOptions } from "../../navigation/NavigationOptions";

export default class HomeScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return NavigationOptions(navigation);
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>ayy :c y yo que quiera conversar mas tiempo contigo</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    top: 250,
    alignItems: "center",
    justifyContent: "center",
  }
});
