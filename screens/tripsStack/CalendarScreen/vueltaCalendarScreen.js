import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import { Button } from "native-base";
import Calendar from "../../../components/screens/tripsStack/calendarScreen/Calendar";
import RF from "react-native-responsive-fontsize";
import { NavigationOptions2 } from "../../../navigation/NavigationOptions";
import * as Animatable from 'react-native-animatable';
const { width, height } = Dimensions.get('window');
const mySpanishDays = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
const mySpanishMonths = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

export default class VueltaCalendarScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return NavigationOptions2(navigation, "Fecha de Regreso");
  };

  state = {
    date: ""
  }

  handleChange(name, value) {
    this.setState({ [name]: value });
  }

  saveStorage() {
    const { date } = this.state;
    const fechaVuelta = date.year + "-" + date.month + "-" + date.day;
    this.props.dispatch({ type: 'FECHAVUELTA', fechaVuelta });
    this.props.dispatch({ type: 'DATEVUELTA', date });
    this.props.navigation.navigate("Trips");
  }

  render() {
    const { date } = this.state;
    const ts = date.timestamp ? new Date(date.timestamp) : null;
    const { dateIda } = this.props.currentTrip;

    return (
      <View style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {date
          ?
          <View style={{ backgroundColor: "#1B0088", height: "15%", display: "flex", flexDirection: "column" }}>
            <View style={{ marginTop: "3%" }}><Text style={styles.year}>{date.year}</Text></View>
            <View style={{ display: "flex", flexDirection: "row", marginLeft: "4%", marginTop: "3%" }}>
              <Text style={styles.text}>{mySpanishDays[ts.getDay()]}</Text>
              <Text style={styles.text}>{date.day}</Text>
              <Text style={styles.text}>{mySpanishMonths[ts.getMonth()]}</Text>
            </View>
          </View>
          : null
        }
        <ScrollView>
          <View style={{ height: 365 }}>
            <Calendar
              onChange={(date) => { this.handleChange("date", date) }}
              minDate={dateIda}
            />
          </View>
          <View style={{ marginBottom: 50 }}>
            <Button style={styles.Button} onPress={() => { this.saveStorage() }} disabled={!date ? true : false}>
              <Text style={styles.buttonLoginText}>Continuar</Text>
            </Button>
          </View>
        </ScrollView>
      </View>
    );

  }
}
const styles = StyleSheet.create({
  year: {
    color: "#d3d3d3",
    fontFamily: "NeoSans",
    marginHorizontal: "6%",
    fontSize: RF(3)
  },
  text: {
    fontFamily: "NeoSans",
    marginHorizontal: "2%",
    color: "white",
    fontSize: RF(4)
  },
  Button: {
    backgroundColor: "#ED1650",
    width: "50%",
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: "25%",
  },
  buttonLoginText: {
    color: "white",
    fontSize: RF(2.8),
    bottom: "1%"
  }
});
