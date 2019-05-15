import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ListItem, List, Item, Input, Icon } from 'native-base';
import { NavigationOptions2 } from "../../../navigation/NavigationOptions";

export default class DestinosScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return NavigationOptions2(navigation, "Origen");
  };

  render() {
    return (
      <View>
        <ListItem>
          <Item style={{ borderBottomColor: "red" }}>
            <Input placeholder='Ingresa una ciudad o destino' />
            <Icon name='close-circle' color={"grey"} />
          </Item>
        </ListItem>
        <List>
          <ListItem>
            <Text>Machu Picchu</Text>
          </ListItem>
          <ListItem >
            <Text>Ollantaytambo</Text>
          </ListItem>
          <ListItem >
            <Text>Cusco</Text>
          </ListItem>
          <ListItem>
            <Text>Puno</Text>
          </ListItem>
          <ListItem>
            <Text>Urubamba</Text>
          </ListItem>
          <ListItem>
            <Text>Arequipa</Text>
          </ListItem>
        </List>
      </View>
    );

  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: "100%"
  },
});