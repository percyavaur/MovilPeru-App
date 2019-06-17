import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button } from "native-base";
import CountText from "../../../components/utils/CountText";
import RF from "react-native-responsive-fontsize";
import { NavigationOptions2 } from "../../../navigation/NavigationOptions";

export default class PasajerosScreen extends React.Component {

  componentDidMount() {
    var { currentTrip } = this.props;
    currentTrip.descPasajeros
      ? this.setState({
        adultos: currentTrip.descPasajeros.adultos,
        niños: currentTrip.descPasajeros.niños,
        bebes: currentTrip.descPasajeros.bebes
      })
      : null
  }

  static navigationOptions = ({ navigation }) => {
    return NavigationOptions2(navigation, "Pasajeros");
  };

  state = {
    adultos: 1,
    niños: 0,
    bebes: 0
  }

  validateTotal(name, value) {
    var totalPassengers = 0;
    const { adultos, niños, bebes } = this.state;

    if (name == "adultos") {
      totalPassengers = value + bebes + niños;
      totalPassengers <= 9 && value >= 1 ? this.handleChange(name, value) : null;
    }
    else if (name == "niños") {
      totalPassengers = value + bebes + adultos;
      totalPassengers <= 9 && value >= 0 ? this.handleChange(name, value) : null;
    }
    else if (name == "bebes") {
      totalPassengers = value + niños + adultos;
      totalPassengers <= 9 && value >= 0 ? this.handleChange(name, value) : null;
    }

  }

  handleChange(name, value) {
    this.setState({ [name]: value })
  }

  saveStorage() {
    const { adultos, niños, bebes } = this.state;
    const cantPasajeros = adultos + niños + bebes;
    const descPasajeros = { adultos, niños, bebes };

    this.props.dispatch({ type: 'CANTPASAJEROS', cantPasajeros });
    this.props.dispatch({ type: 'DESCPASAJEROS', descPasajeros });
    this.props.navigation.navigate("Trips");
  }

  render() {
    return (
      <View style={styles.container}>
        <CountText
          name={"adultos"}
          title={"Adultos"}
          info={"12 años a mas"}
          value={this.state.adultos}
          onChange={(name, value) => { this.validateTotal(name, value) }}
        />
        <View style={{ borderBottomColor: "#d3d3d3", borderBottomWidth: 1, marginTop: "10%", marginHorizontal: "6%" }} />
        <CountText
          name={"niños"}
          title={"Niños"}
          info={"2 a 11 años"}
          value={this.state.niños}
          onChange={(name, value) => { this.validateTotal(name, value) }}
        />
        <View style={{ borderBottomColor: "#d3d3d3", borderBottomWidth: 1, marginTop: "10%", marginHorizontal: "6%" }} />
        <CountText
          name={"bebes"}
          title={"Bebes"}
          info={"0 a 23 meses"}
          value={this.state.bebes}
          onChange={(name, value) => { this.validateTotal(name, value) }}
        />
        <Button style={styles.Button} onPress={() => { this.saveStorage() }}>
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