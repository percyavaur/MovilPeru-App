import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from "native-base";
import CountText from "../../../components/utils/CountText";
import RF from "react-native-responsive-fontsize";
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
          onChange={(name, value) => { this.handleChange(name, value) }}
        />
        <View style={{ borderBottomColor: "#d3d3d3", borderBottomWidth: 1, marginTop: "10%", marginHorizontal: "6%" }} />
        <CountText
          name={"niños"}
          title={"Niños"}
          info={"2 a 11 años"}
          value={this.state.niños}
          onChange={(name, value) => { this.handleChange(name, value) }}
        />
        <View style={{ borderBottomColor: "#d3d3d3", borderBottomWidth: 1, marginTop: "10%", marginHorizontal: "6%" }} />
        <CountText
          name={"bebes"}
          title={"Bebes"}
          info={"0 a 23 meses"}
          value={this.state.bebes}
          onChange={(name, value) => { this.handleChange(name, value) }}
        />
        <Button style={styles.Button}>
          <Text style={styles.buttonLoginText}>Listo</Text>
        </Button>
      </View>
    );

  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    top: "10%"
  }, Button: {
    backgroundColor: "#ED1650",
    width: "50%",
    marginTop: "15%",
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: "25%",
    fontFamily: "NeoSans"
  },
  buttonLoginText: {
    color: "white",
    fontSize: RF(2.8),
    bottom: "1%"
  }
});