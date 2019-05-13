import React from 'react';
import { Image, StyleSheet, Text, View, Button, } from 'react-native';

export default class TripScreen1 extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.props.count}</Text>
        <Button
          title="+"
          onPress={() => { this.props.dispatch({ type: 'INCREMENT' }) }}
        />
        <Button
          title="-"
          onPress={() => this.props.dispatch({ type: 'DECREMENT' })}
        />
        <Button
          title="Go to static count screen"
          onPress={() => this.props.navigation.navigate('TripsScreen')}
        success/>
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