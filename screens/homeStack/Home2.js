import React from 'react';
import { Image, StyleSheet, Text, View, Button } from 'react-native';
import { NavigationOptions2 } from "../../navigation/NavigationOptions";

export default class Home2 extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return NavigationOptions2(navigation, "¿Quienes Iran?");
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.props.count}</Text>
        <Button
          title="Increment"
          onPress={() => { this.props.dispatch({ type: 'INCREMENT' }) }}
        />
        <Button
          title="Decrement"
          onPress={() => this.props.dispatch({ type: 'DECREMENT' })}
        />
        <Button
          title="Go to static count screen"
          onPress={() => this.props.navigation.navigate('Home3')}
        />
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
  },
});
