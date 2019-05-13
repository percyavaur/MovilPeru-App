import React from 'react';
import { StyleSheet, View, Text,Button } from 'react-native';
import { NavigationOptions } from "../../navigation/NavigationOptions";
import SegmentedControlTab from "react-native-segmented-control-tab";

export default class TripsScreen extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return NavigationOptions(navigation);
    };

    state = {
        selectedIndex: 0
    };

    handleIndexChange = index => {
        this.setState({
            selectedIndex: index
        });
    };
    render() {
        return (
            <View style={styles.container}>
                <SegmentedControlTab
                    values={["First", "Second"]}
                    selectedIndex={this.state.selectedIndex}
                    onTabPress={this.handleIndexChange}
                />
                {this.state.selectedIndex === 0 ?
                    <View><Text>Viaje 1</Text></View>
                    : null
                }
                {this.state.selectedIndex === 1 ?
                    <Button
                    title="Go to List of Trips"
                    onPress={() => this.props.navigation.navigate('TripScreen1')}
                    ><Text>Viaje 2</Text></Button>
                    : null
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        height: '80%'
    }
});
