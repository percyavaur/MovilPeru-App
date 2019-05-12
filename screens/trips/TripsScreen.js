import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
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
                    <View><Text>View 1</Text></View>
                    : null
                }
                {this.state.selectedIndex === 1 ?
                    <View><Text>View 2</Text></View>
                    : null
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    }
});
