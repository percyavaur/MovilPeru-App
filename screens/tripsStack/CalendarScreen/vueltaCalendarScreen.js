import React from 'react'
import { Image, StyleSheet, Text, Dimensions } from 'react-native';
import { Content, View, Button } from "native-base";
import { Header } from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import RF from "react-native-responsive-fontsize";
const { width, height } = Dimensions.get('window');
export default class VueltaCalendarScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.onDayPress = this.onDayPress.bind(this);
  }
  onDayPress(day) {
    this.setState({
      selected: day.dateString
    });
  }
  render() {
    return (
      <View style={{  flex: 1 }}>
        <Text>{this.props.count}</Text>
      <CalendarList
      horizontal
      pagingEnabled
      // Collection of dates that have to be marked. Default = {}
      theme={{
        monthTextColor: '#165c96',
        arrowColor: '#165c96',
        todayTextColor: '#33a8e2',
        selectedDayTextColor: 'white',
        selectedDayBackgroundColor: '#165c96',
        }}
        // Max amount of months allowed to scroll to the past. Default = 50
        pastScrollRange={30}
        // Max amount of months allowed to scroll to the future. Default = 50
        futureScrollRange={30}
        // Enable or disable scrolling of calendar list
        scrollEnabled={true}
        // Enable or disable vertical scroll indicator. Default = false
        showScrollIndicator={true}
        minDate={new Date()}

        onDayPress={this.onDayPress}
       
        markedDates={{
        [this.state.selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'blue'},
         '2019-05-17': {marked: true},
         '2019-05-18': {marked: true, dotColor: 'red', activeOpacity: 0},
         '2019-05-19': {disabled: true, disableTouchEvent: true},
         
        }}
        />
        <Button style={styles.Button}>
                    <Text style={styles.buttonLoginText}>Continuar</Text>
                </Button>
      </View>
    );

  }
}
const styles = StyleSheet.create({
  Button: {
      backgroundColor: "#69A3AF",
      width: "50%",
      height: height * 0.065,
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