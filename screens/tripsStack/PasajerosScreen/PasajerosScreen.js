import React from 'react';
import { Image, StyleSheet, Text, View, Button, } from 'react-native';
import {ListItem,Input} from 'native-base';

export default class PasajerosScreen extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.props.count}</Text>
           <Input title="Buscar Destino"
                  placeholder=""   />
       <ListItem>
            <Text>Adulto </Text>
          </ListItem>
          <ListItem last>
            <Text>Niños</Text>
          </ListItem>
          <ListItem>
            <Text>Bebes</Text>
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