import React from 'react';
import { Text, StyleSheet, TouchableHighlight, ImageBackground, ActivityIndicator, Dimensions } from "react-native";
import { View } from "native-base"
import { NavigationOptions } from "../../navigation/NavigationOptions";
import TripForm from "../../components/screens/tripsStack/TripForm";
import Toast from 'react-native-easy-toast';
import { BlurView } from 'expo';

const { width, height } = Dimensions.get('window');

export default class TripsScreen extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return NavigationOptions(navigation);
    };

    componentDidMount() {
        let index = 0;
        this.props.dispatch({ type: 'TRIPTYPE', index });
    }

    state = {
        selectedTab: 0,
        loading: false
    };

    handleTabChange = (index) => {
        this.setState({ selectedTab: index });
        this.props.dispatch({ type: 'TRIPTYPE', index });
    };

    onActivateToast(value) {
        this.refs.toast.show(value, 1000);
    }

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
                                <TouchableHighlight
                                    underlayColor="white"
                                    onPress={() => { this.handleTabChange(0) }}
                                    style={
                                        [styles.activeTabButton, {
                                            backgroundColor: selectedTab === 0 ? "#FFFFFF" : "#FFFFFF80",
                                            borderStartColor: selectedTab === 0 ? "#ED1650" : "#FFFFFF80",
                                        }]
                                    }
                                ><Text style={{
                                    color: "#52606D",
                                    fontFamily: "NeoSans"
                                }}>Ida y Vuelta</Text>
                                </TouchableHighlight>
                                <TouchableHighlight
                                    underlayColor="white"
                                    onPress={() => { this.handleTabChange(1) }}
                                    style={
                                        [styles.activeTabButton, {
                                            backgroundColor: selectedTab === 1 ? "#FFFFFF" : "#FFFFFF80",
                                            borderStartColor: selectedTab === 1 ? "#ED1650" : "#FFFFFF80",
                                        }]
                                    }
                                ><Text style={{
                                    color: "#52606D",
                                    fontFamily: "NeoSans"
                                }}>Solo Ida</Text>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>
                    <View style={{ backgroundColor: "white", height: "100%" }}>
                        <TripForm
                            navigation={this.props.navigation}
                            currentTrip={this.props.currentTrip}
                            onActivateToast={(value) => { this.onActivateToast(value) }}
                            selectedTab={selectedTab}
                            loading={(value) => {
                                this.setState({ loading: value })
                            }} />
                    </View>
                    <Toast
                        ref="toast"
                        style={styles.toast}
                        position='bottom'
                        opacity={0.8}
                    />
                </ImageBackground>
                {this.state.loading &&
                    <BlurView tint="light" intensity={50} style={StyleSheet.absoluteFill}>
                        <ActivityIndicator size='large' style={styles.loading} />
                    </BlurView>
                }
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
    },
    toast: {
        backgroundColor: '#ED1650',
        width: "70%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bottom: width * 0.2
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
});
