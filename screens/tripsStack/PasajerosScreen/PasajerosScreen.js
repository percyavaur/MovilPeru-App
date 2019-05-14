import React from 'react';
import { StyleSheet, Button, View } from 'react-native';
import Icon from '@expo/vector-icons';
import CountText from "../../../components/utils/CountText";

export default class PasajerosScreen extends React.Component {

  state = {
    adultos: 1,
    niños: 0,
    bebes: 0
  }

  handleChange = (name, value) => {
    this.setState({ [name]: value })
  }

  render() {
    return (
      <View style={styles.container}>
        <CountText
          name={"adultos"}
          title={"Adultos"}
          info={"12 años a mas"}
          value={this.state.adultos}
          onChange={(name,value)=>{this.handleChange(name,value)}}
        />
        <CountText
          name={"niños"}
          title={"Niños"}
          info={"2 a 11 años"}
          value={this.state.niños}
          onChange={(name,value)=>{this.handleChange(name,value)}}
        />
        <CountText
          name={"bebes"}
          title={"bebes"}
          info={"0 a 23 meses"}
          value={this.state.bebes}
          onChange={(name,value)=>{this.handleChange(name,value)}}
        />
      </View>
    );

  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    top: "2%"
  },
});