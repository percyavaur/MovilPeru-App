import React from "react";
import { View, Dimensions, ScrollView, Text, StyleSheet, TextInput } from "react-native";
import { Button } from "native-base"
import RF from "react-native-responsive-fontsize";
import UserProfile from "../../components/screens/profile/UserProfile";
import InputText from "../../components/utils/InputText";
const { width, height } = Dimensions.get('window');

export default class ProfileScreen extends React.Component {

    render() {
        return (
            <ScrollView style={{ backgroundColor: "#F0F2F9" }}>
                <UserProfile />
                <View style={{
                    marginVertical: width * 0.1,
                    backgroundColor: "#f7fafc",
                    borderRadius: 15,
                    marginHorizontal: "5%",
                    shadowColor: '#000',
                    shadowOffset: { width: 2, height: 2 },
                    shadowOpacity: 0.8,
                    shadowRadius: 2,
                    elevation: 1,
                }}>
                    <View style={{
                        display: "flex",
                        flexDirection: "column",
                        backgroundColor: "white",
                        height: width * 0.23,
                        borderTopStartRadius: 15,
                        borderTopEndRadius: 15
                    }}>
                        <View style={{
                            marginTop: width * 0.07,
                            display: "flex",
                            flexDirection: "row",
                            position: "relative",
                        }}>
                            <Text style={{
                                position: "absolute",
                                left: width * 0.07,
                                fontFamily: "NeoSans",
                                fontSize: RF(3),
                                fontWeight: "bold",
                                marginTop: RF(0.8)
                            }}>My Account</Text>
                            <Button style={{
                                backgroundColor: "#11cdef",
                                position: "absolute",
                                right: width * 0.07,
                                width: width * 0.25,
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: 7,
                                height: width * 0.1,
                            }}>
                                <Text style={{ color: "white" }}>Edit</Text>
                            </Button>
                        </View>
                    </View>
                    <View style={{ display: "flex", flexDirection: "column" }}>
                        <Text style={{
                            color: "#b9bbd1",
                            fontFamily: "NeoSans",
                            marginLeft: width*0.06,
                            fontWeight: "bold",
                            marginTop: width*0.06,
                        }}>USER INFORMATION</Text>
                        <InputText
                            label={"Username"}
                            placeholder={"Username"}
                            value={""}
                            onChange={() => { }}
                        />
                        <InputText
                            label={"Email address"}
                            placeholder={"Email address"}
                            value={""}
                            onChange={() => { }}
                        />
                        <InputText
                            label={"First Name"}
                            placeholder={"First Name"}
                            value={""}
                            onChange={() => { }}
                        />
                        <InputText
                            label={"Last Name"}
                            placeholder={"Last Name"}
                            value={""}
                            onChange={() => { }}
                        />
                        <View style={styles.separator} />
                        <Text style={{
                            color: "#b9bbd1",
                            fontFamily: "NeoSans",
                            marginLeft: width*0.06,
                            fontWeight: "bold",
                        }}>CONTACT INFORMATION</Text>
                        <InputText
                            label={"Address"}
                            placeholder={"Address"}
                            value={""}
                            onChange={() => { }}
                        />
                        <InputText
                            label={"City"}
                            placeholder={"City"}
                            value={""}
                            onChange={() => { }}
                        />
                        <InputText
                            label={"Country"}
                            placeholder={"Country"}
                            value={""}
                            onChange={() => { }}
                        />
                        <InputText
                            label={"Postal Code"}
                            placeholder={"Postal Code"}
                            value={""}
                            onChange={() => { }}
                        />
                        <View style={styles.separator} />
                        <Text style={{
                            color: "#b9bbd1",
                            fontFamily: "NeoSans",
                            marginLeft: width*0.06,
                            fontWeight: "bold",
                        }}>ABOUT ME</Text>
                        <InputText
                            label={"About Me"}
                            placeholder={"About Me"}
                            value={""}
                            onChange={() => { }}
                        />
                    </View>
                </View>
            </ScrollView >
        )
    }
}

const styles = StyleSheet.create({
    inputContainer: {
        marginHorizontal: " 7%",
    },
    inputLabel: {
        fontWeight: "bold",
        fontFamily: "NeoSans",
        fontSize: RF(2.5),
        color: "#525f7f",
        marginVertical: RF(1)
    },
    input: {
        backgroundColor: "white",
        height: width * 0.15,
        borderRadius: 7,
        shadowColor: '#000',
        shadowOffset: { width: 10, height: 10 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
        fontSize: RF(2.5),
        paddingLeft: RF(1.5)
    },
    separator: {
        borderBottomWidth: 1,
        borderBottomColor: "#b9bbd1",
        marginHorizontal: width * 0.07,
        marginVertical: width * 0.1
    }
});