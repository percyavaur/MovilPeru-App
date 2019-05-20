import React from 'react';
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Button } from "native-base";
import Calendar from "../../../components/screens/tripsStack/calendarScreen/Calendar";
import RF from "react-native-responsive-fontsize";
import { NavigationOptions2 } from "../../../navigation/NavigationOptions";

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

  render() {
    const { date } = this.state;
    const ts = date.timestamp ? new Date(date.timestamp) : null;
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
        <View style={{ height: 365 }}>
          <Calendar
            onChange={(date) => { this.handleChange("date", date) }}
          />
        </View>
        <View>
          <Button style={styles.Button}>
            <Text style={styles.buttonLoginText}>Continuar</Text>
          </Button>
        </View>
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
