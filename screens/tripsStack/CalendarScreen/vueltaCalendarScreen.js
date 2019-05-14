import React from 'react'
import { Image, StyleSheet, Text, View, Button, } from 'react-native';
import {ListItem,Input} from 'native-base';
import { Header } from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
export default class VueltaCalendarScreen extends React.Component {
  render() {
    return (
      <View >
        <Text>{this.props.count}</Text>
        <CalendarList
           // Callback which gets executed when visible months change in scroll view. Default = undefined
           onVisibleMonthsChange={(months) => {console.log('now these months are visible', months);}}
           // Max amount of months allowed to scroll to the past. Default = 50
           pastScrollRange={50}
           // Max amount of months allowed to scroll to the future. Default = 50
           futureScrollRange={50}
           // Enable or disable scrolling of calendar list
           scrollEnabled={true}
           // Enable or disable vertical scroll indicator. Default = false
           showScrollIndicator={true}
           minDate={'2019-05-13'}
      />
      <Calendar
      // Collection of dates that have to be marked. Default = {}
      markedDates={{
      '2019-05-16': {selected: true, marked: true, selectedColor: 'blue'},
      '2019-05-17': {marked: true},
      '2019-05-18': {marked: true, dotColor: 'red', activeOpacity: 0},
      '2019-05-19': {disabled: true, disableTouchEvent: true}
  }}
/>
      </View>
    );

  }
}