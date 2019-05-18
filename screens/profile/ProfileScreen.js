import React from "react";
import { Card } from 'galio-framework';
import { View, Dimensions, Image, ScrollView, Text } from "react-native";
import { Button } from "native-base"
const { width, height } = Dimensions.get('window');

export default class ProfileScreen extends React.Component {

    render() {
        return (
            <ScrollView style={{ backgroundColor: "#F0F2F9" }}>
                <View style={{ width: "100%", backgroundColor: "#F0F2F9" }}>
                    <View style={{
                        width: width * 0.5,
                        height: width * 0.5,
                        borderRadius: width * 0.5 / 2,
                        backgroundColor: 'white',
                        zIndex: 1,
                        marginTop: -height * 0.1,
                        top: width * 0.3,
                        marginLeft: width * 0.25,
                    }} >
                        <Image
                            style={{ width: width * 0.5, height: width * 0.5, flex: 1, borderRadius: width * 0.5 / 2, }}
                            source={{ uri: 'https://demos.creative-tim.com/argon-dashboard-react/static/media/team-4-800x800.23007132.jpg' }}
                        />
                    </View>
                    <View style={{
                        backgroundColor: "white",
                        height: 400,
                        borderRadius: 15,
                        marginHorizontal: "5%",
                    }}>
                        <View style={{ display: "flex", flexDirection: "column", paddingTop: width * 0.35 }}>
                            <View style={{ display: "flex", flexDirection: "row", position: "relative" }}>
                                <Button style={{
                                    backgroundColor: "#11cdef",
                                    position: "absolute",
                                    left: width * 0.07,
                                    width: width * 0.25,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderRadius: 7,
                                }}>
                                    <Text style={{ color: "white" }}>Connect</Text>
                                </Button>
                                <Button style={{
                                    backgroundColor: "#172b4d",
                                    position: "absolute",
                                    right: width * 0.07,
                                    width: width * 0.25,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderRadius: 7,
                                }}>
                                    <Text style={{ color: "white" }}>Message</Text>
                                </Button>
                            </View>
                            <View style={{ display: "flex", flexDirection: "row", marginTop: width * 0.175, position: "relative" }}>
                                <View style={{
                                    display: "flex", flexDirection: "column",
                                    left: width * 0.08,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    position: "absolute",
                                }}>
                                    <Text>22</Text>
                                    <Text>Friends</Text>
                                </View>
                                <View style={{
                                    display: "flex", flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    position: "relative",
                                    left: width * 0.38,
                                }}>
                                    <Text>100</Text>
                                    <Text>Photos</Text>
                                </View>
                                <View style={{
                                    display: "flex", flexDirection: "column",
                                    right: width * 0.08,
                                    alignItems: "center",
                                    position: "absolute"
                                }}>
                                    <Text>89</Text>
                                    <Text>Comments</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{
                        backgroundColor: "white",
                        height: 400,
                        borderRadius: 15,
                        marginHorizontal: "5%",
                        marginTop: width * 0.1,
                    }}>
                    </View>
                </View>
            </ScrollView >
        )
    }
}