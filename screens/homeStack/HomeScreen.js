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
        <Button
          style={styles.Button}
          onPress={() => { this.props.navigation.navigate('Home2') }}
          success>
          <Text style={{ color: "white" }}>Home 2</Text>
        </Button>
        <Button
          style={styles.Button}
          onPress={() => { this.props.navigation.navigate('Home3') }}
          warning>
          <Text style={{ color: "white" }}>Home 3</Text>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    display: "flex",
    flexDirection: "row",
    marginTop: "70%",
    alignItems: "center",
    justifyContent: "center",
  },
  Button: {
    marginHorizontal: "3%"
  }
});
