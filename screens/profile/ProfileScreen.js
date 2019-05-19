import React from "react";
import { View, Dimensions, ScrollView, Text, StyleSheet, TextInput } from "react-native";
import { Button } from "native-base"
import RF from "react-native-responsive-fontsize";
import UserProfile from "../../components/screens/profile/UserProfile";
import InputText from "../../components/utils/InputText";
const { width, height } = Dimensions.get('window');

export default class ProfileScreen extends React.Component {

    state = {
        id: "",
        tipo: "",
        firstname: "",
        lastname: "",
        username: "",
        editable: false,
    }

    componentDidMount() {
        this.props.currentUser._55 ? this.propsToState(this.props.currentUser._55) : null;
    }

    propsToState(data) {
        this.setState({
            id: data.id,
            tipo: data.tipo,
            firstname: data.firstname,
            lastname: data.lastname,
            username: data.username
        });
    }

    handleChange(name, value) {
        this.setState({ [name]: value })
    }

    stateToFetch() {

    }

    fetchRegisterValidation = async (firstName, lastName, username, password) => {
        await fetch('http://35.236.27.209/php_api_jwt/api/controller/create_user.php', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ firstname: firstName, lastname: lastName, username: username, password: password })
        }).then(response => { return response.json() })
            .then(data => {
                if (data.success) {
                    this.refs.accept.show(data.message, 1000, () => {
                        this.setState({ loading: false });
                        this.props.navigation.navigate("LoginModal");
                    });
                } else {
                    this.refs.warning.show(data.message, 3000);
                    this.setState({ loading: false });
                }
            });
    }

    render() {

        const { id, tipo, firstname, lastname, username, editable } = this.state;

        return (
            <ScrollView style={{ backgroundColor: "#F0F2F9" }}>
                <UserProfile
                    firstname={firstname}
                    lastname={lastname}
                />
                <View style={styles.container}>
                    <View style={styles.containerHeader}>
                        <View style={{
                            marginTop: width * 0.07,
                            display: "flex",
                            flexDirection: "row",
                            position: "relative",
                        }}>
                            <Text style={styles.tittleContainerHeader}>My Account</Text>
                            <Button style={styles.buttonContainerHeader}
                                onPress={() => {
                                    this.setState({ editable: !editable })
                                }}>
                                <Text style={{ color: "white" }}>Edit</Text>
                            </Button>
                        </View>
                    </View>
                    <View style={{ display: "flex", flexDirection: "column" }}>
                        <Text style={{
                            color: "#b9bbd1",
                            fontFamily: "NeoSans",
                            marginLeft: width * 0.06,
                            fontWeight: "bold",
                            marginTop: width * 0.06,
                        }}>USER INFORMATION</Text>
                        <InputText
                            label={"Username"}
                            placeholder={"Username"}
                            value={username}
                            editable={editable}
                            onChange={(value) => { this.handleChange("username", value) }}
                        />
                        <InputText
                            label={"Email address"}
                            placeholder={"Email address"}
                            value={""}
                            editable={editable}
                            onChange={(value) => { this.handleChange("email", value) }}
                        />
                        <InputText
                            label={"First Name"}
                            placeholder={"First Name"}
                            value={firstname}
                            editable={editable}
                            onChange={(value) => { this.handleChange("firstname", value) }}
                        />
                        <InputText
                            label={"Last Name"}
                            placeholder={"Last Name"}
                            value={lastname}
                            editable={editable}
                            onChange={(value) => { this.handleChange("lastname", value) }}
                        />
                        <View style={styles.separator} />
                        <Text style={{
                            color: "#b9bbd1",
                            fontFamily: "NeoSans",
                            marginLeft: width * 0.06,
                            fontWeight: "bold",
                        }}>CONTACT INFORMATION</Text>
                        <InputText
                            label={"Address"}
                            placeholder={"Address"}
                            value={""}
                            editable={editable}
                            onChange={(value) => { this.handleChange("address", value) }}
                        />
                        <InputText
                            label={"City"}
                            placeholder={"City"}
                            value={""}
                            editable={editable}
                            onChange={(value) => { this.handleChange("city", value) }}
                        />
                        <InputText
                            label={"Country"}
                            placeholder={"Country"}
                            value={""}
                            editable={editable}
                            onChange={(value) => { this.handleChange("country", value) }}
                        />
                        <InputText
                            label={"Postal Code"}
                            placeholder={"Postal Code"}
                            value={""}
                            editable={editable}
                            onChange={(value) => { this.handleChange("postalCode", value) }}
                        />
                        <View style={styles.separator} />
                        <Text style={{
                            color: "#b9bbd1",
                            fontFamily: "NeoSans",
                            marginLeft: width * 0.06,
                            fontWeight: "bold",
                        }}>ABOUT ME</Text>
                        <InputText
                            label={"About Me"}
                            placeholder={"About Me"}
                            value={""}
                            editable={editable}
                            onChange={(value) => { this.handleChange("aboutMe", value) }}
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
    },
    container: {
        marginVertical: width * 0.1,
        backgroundColor: "#f7fafc",
        borderRadius: 15,
        marginHorizontal: "5%",
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
    },
    containerHeader: {
        display: "flex",
        flexDirection: "column",
        backgroundColor: "white",
        height: width * 0.23,
        borderTopStartRadius: 15,
        borderTopEndRadius: 15
    },
    tittleContainerHeader: {
        position: "absolute",
        left: width * 0.07,
        fontFamily: "NeoSans",
        fontSize: RF(3),
        fontWeight: "bold",
        marginTop: RF(0.8)
    },
    buttonContainerHeader: {
        backgroundColor: "#11cdef",
        position: "absolute",
        right: width * 0.07,
        width: width * 0.25,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 7,
        height: width * 0.1,
    }
});