import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

export default class Home3 extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Text>Number REDUX</Text>
        <Text>{this.props.count}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    top: "35%"
  }
});
