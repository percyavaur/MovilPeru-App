import React from 'react';
import { Image, StyleSheet, Text, View, Button, } from 'react-native';
import {ListItem,Input} from 'native-base';
import { Header } from 'react-navigation';

export default class DestinoScreen2 extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.props.count}</Text>
               <Input title="Buscar Destino"
                  placeholder="" />
       <ListItem>
            <Text>Cuzco</Text>
          </ListItem>
          <ListItem last>
            <Text>Arequipa</Text>
          </ListItem>
          <ListItem>
            <Text>Caroline Aaron</Text>
          </ListItem>
          <ListItem last>
            <Text>Lee Allen</Text>
          </ListItem>
          <ListItem>
            <Text>Caroline Aaron</Text>
          </ListItem>
          <ListItem last>
            <Text>Lee Allen</Text>
          </ListItem>
          <ListItem>
            <Text>Caroline Aaron</Text>
          </ListItem>
          <ListItem last>
            <Text>Lee Allen</Text>
          </ListItem>
          <ListItem>
            <Text>Caroline Aaron</Text>
          </ListItem>
          <ListItem last>
            <Text>Lee Allen</Text>
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