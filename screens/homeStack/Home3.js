import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class Home3 extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Image style={{height: 100, width: 100}} source={require("../../assets/images/icon.png")} />
        <Text>Home 3</Text>
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
