import React from 'react'
import { View } from 'react-native';
import { Calendar } from 'react-native-calendars';
export default class CalendarScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: ""
        };
        this.onDayPress = this.onDayPress.bind(this);
    }
    onDayPress(date) {
        this.setState({
            selected: date.dateString
        });
        this.props.onChange(date);
    }
    render() {
        const { selected } = this.state;

        return (
            <View style={{ flex: 1}}>
                <Calendar
                    horizontal
                    pagingEnabled
                    // Collection of dates that have to be marked. Default = {}
                    theme={{
                        monthTextColor: '#165c96',
                        arrowColor: '#165c96',
                        todayTextColor: '#33a8e2',
                        selectedDayTextColor: 'white',
                        selectedDayBackgroundColor: '#ED1650',
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
                        [selected]: { selected: true, disableTouchEvent: true, selectedDotColor: 'blue' },
                        '2019-05-17': { marked: true },
                        '2019-05-18': { marked: true, dotColor: 'red', activeOpacity: 0 },
                        '2019-05-19': { disabled: true, disableTouchEvent: true },
                    }}
                />
            </View>
        );

    }
}