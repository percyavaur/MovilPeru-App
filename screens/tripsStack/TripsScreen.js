import React from 'react';
import { Text, StyleSheet, TouchableOpacity, ImageBackground } from "react-native";
import { View } from "native-base"
import { NavigationOptions } from "../../navigation/NavigationOptions";
import IdaVuelta from "../../components/screens/TripStack/IdaVuelta"

export default class TripsScreen extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return NavigationOptions(navigation);
    };

    state = {
        selectedTab: 0
    };

    handleTabChange = (index) => {
        this.setState({ selectedTab: index });
    };
    render() {
        const { selectedTab } = this.state;
        return (
            <View style={styles.container}>
                <ImageBackground source={require("../../assets/images/back.jpg")} style={{ backgroundColor: "#52606D", height: "100%" }}>
                    <View style={{ height: "15%", position: "relative" }}>
                        <View
                            style={{
                                marginHorizontal: "10%",
                                position: "absolute",
                                bottom: 0,
                                height: "40%"
                            }}
                        >
                            <View style={{ display: "flex", flexDirection: "row", width: "100%", height: "100%" }}>
                                <TouchableOpacity
                                    onPress={() => { this.handleTabChange(0) }}
                                    style={
                                        [styles.activeTabButton, {
                                            backgroundColor: selectedTab === 0 ? "#FFFFFF" : "#FFFFFF80",
                                            borderStartColor: selectedTab === 0 ? "#f7c600" : "#FFFFFF80",
                                        }]
                                    }
                                ><Text style={{ color: "#52606D" }}>Ida y Vuelta</Text></TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => { this.handleTabChange(1) }}
                                    style={
                                        [styles.activeTabButton, {
                                            backgroundColor: selectedTab === 1 ? "#FFFFFF" : "#FFFFFF80",
                                            borderStartColor: selectedTab === 1 ? "#f7c600" : "#FFFFFF80",
                                        }]
                                    }
                                ><Text style={{ color: "#52606D" }}>Solo Ida</Text></TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={{ backgroundColor: "white", height: "100%" }}>
                        {this.state.selectedTab === 0 ?
                            <IdaVuelta />
                            : null
                        }
                        {this.state.selectedTab === 1 ?
                            <Text>Viaje 2</Text>
                            : null
                        }
                    </View>
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
    activeTabButton: {
        backgroundColor: '#fff',
        width: "50%",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        borderStartWidth: 5,
    }
});
