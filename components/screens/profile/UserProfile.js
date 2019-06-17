import React from "react";
import { View, Dimensions, Image, ScrollView, Text, StyleSheet } from "react-native";
import { Button } from "native-base"
import RF from "react-native-responsive-fontsize";
const { width, height } = Dimensions.get('window');

export default class UserProfile extends React.Component {

    render() {
        return (
            <View style={{ width: "100%" }}>
                <View style={{
                    width: width * 0.5,
                    height: width * 0.5,
                    borderRadius: width * 0.5 / 2,
                    backgroundColor: 'white',
                    zIndex: 2,
                    marginTop: -width * 0.25,
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
                    borderRadius: 15,
                    marginHorizontal: "5%",
                    shadowColor: '#000',
                    shadowOffset: { width: 2, height: 2 },
                    shadowOpacity: 0.8,
                    shadowRadius: 2,
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
                                height: width * 0.1,
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
                                height: width * 0.1,
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
                                <Text
                                    style={{
                                        color: "#525f8b",
                                        fontFamily: "NeoSans",
                                        fontSize: RF(2.5),
                                    }}>22</Text>
                                <Text
                                    style={{
                                        color: "#b9bbd1",
                                        fontFamily: "NeoSans",
                                        fontSize: RF(2.5),
                                    }}>Friends</Text>
                            </View>
                            <View style={{
                                display: "flex", flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                position: "relative",
                                left: width * 0.38,
                            }}>
                                <Text style={{
                                    color: "#525f8b",
                                    fontFamily: "NeoSans",
                                    fontSize: RF(2.5),
                                }}>100</Text>
                                <Text style={{
                                    color: "#b9bbd1",
                                    fontFamily: "NeoSans",
                                    fontSize: RF(2.5),
                                }}>Photos</Text>
                            </View>
                            <View style={{
                                display: "flex", flexDirection: "column",
                                right: width * 0.08,
                                alignItems: "center",
                                position: "absolute"
                            }}>
                                <Text style={{
                                    color: "#525f8b",
                                    fontFamily: "NeoSans",
                                    fontSize: RF(2.5),
                                }}>89</Text>
                                <Text style={{
                                    color: "#b9bbd1",
                                    fontFamily: "NeoSans",
                                    fontSize: RF(2.5),
                                }}>Comments</Text>
                            </View>
                        </View>
                        <View style={{ alignItems: "center", justifyContent: "center", flexDirection: "column", marginTop: RF(2) }}>
                            <Text style={{
                                color: "#38325d",
                                fontFamily: "NeoSans",
                                fontSize: RF(2.7),
                                marginVertical: RF(2),
                                fontWeight: "bold"
                            }}>{this.props.firstname} {this.props.lastname}</Text>
                            <Text style={{
                                color: "#38325d",
                                fontFamily: "NeoSans",
                                fontSize: RF(2.7),
                                marginVertical: RF(2)
                            }}>Software Developer</Text>
                            <Text style={{
                                color: "#38325d",
                                fontFamily: "NeoSans",
                                fontSize: RF(2.7),
                                marginVertical: RF(2)
                            }}>Universidad Ricardo Palma</Text>
                            <View style={{ borderBottomWidth: 1, borderBottomColor: "#b9bbd1", width: width * 0.8, }} />
                            <Text style={{
                                color: "#5e8cf2",
                                fontFamily: "NeoSans",
                                fontSize: RF(3),
                                marginVertical: RF(2)
                            }}>Show More</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}
