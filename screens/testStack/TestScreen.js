import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { NavigationOptions } from "../../navigation/NavigationOptions";
import TestAlert from "../../components/alerts/TestAlert";

export default class HomeScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return NavigationOptions(navigation);
  };


  render() {
    return (
      <View style={styles.container}>
        <TestAlert></TestAlert>
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
