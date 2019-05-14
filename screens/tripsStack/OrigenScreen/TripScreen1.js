import React from 'react';
import { Image, StyleSheet, Text, View, Button, } from 'react-native';
import {ListItem,Input,Label} from 'native-base';

export default class TripScreen1 extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.props.count}</Text>
           <Label>Buscar Destino</Label>
           <Input title="Buscar Destino"
                  placeholder=""   />
       <ListItem>
            <Text>Arequipa </Text>
          </ListItem>
          <ListItem last>
            <Text>Cusco</Text>
          </ListItem>
          <ListItem>
            <Text>Manchay</Text>
          </ListItem>
          <ListItem>
            <Text>Arequipa </Text>
          </ListItem>
          <ListItem last>
            <Text>Cusco</Text>
          </ListItem>
          <ListItem>
            <Text>Manchay</Text>
          </ListItem>
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