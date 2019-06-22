import React from "react";
import { View, Dimensions, ScrollView, Text, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { Button, Picker, DatePicker } from "native-base"
import RF from "react-native-responsive-fontsize";
import { BlurView } from 'expo';
import TestAlert from "../../components/alerts/TestAlert";
import UserProfile from "../../components/screens/profile/UserProfile";
import InputText from "../../components/utils/InputText";
import { _GetAsyncStorage } from "../../utils/asyncStorage/getAsyncStorage";
import { _SetAsyncStorage } from "../../utils/asyncStorage/setAsyncStorage";
import { _RemoveStorage } from "../../utils/asyncStorage/removeAsyncStorage";

const { width, height } = Dimensions.get('window');

export default class ProfileScreen extends React.Component {

    state = {
        username: "",
        password: "",
        nombres: "",
        apellidos: "",
        genero: "",
        fecNac: "",
        estadoCivil: "",
        tipoDocumento: "",
        numDocumento: "",
        correoElectronico: "",
        direccion: "",
        telefono: "",
        imagen: "",

        editable: false,
        loading: false,
        alertShow: false,
        alertTheme: "danger",
        alertTitle: "",
        alertContent: "",
    }

    componentDidMount = async () => {
        const currentUser = await this.props.currentUser
        currentUser ? this.propsToState(currentUser) : null;
    }

    propsToState(data) {
        this.setState({
            username: data.username,
            nombres: data.nombres,
            apellidos: data.apellidos,
            genero: data.genero,
            fecNac: data.fecNac,
            estadoCivil: data.estadoCivil,
            tipoDocumento: data.tipoDocumento,
            numDocumento: data.numDocumento,
            correoElectronico: data.correoElectronico,
            telefono: data.telefono,
            direccion: data.direccion,
            imagen: data.imagen
        });
    }

    handleChange(name, value) {
        this.setState({ [name]: value })
    }

    handleImage(imageUri) {
        this.setState({ imagen: imageUri });
        this.dataToFetch();
    }

    updateUser() {
        this.setState({ loading: true });
        Alert.alert(
            'Guardar Datos',
            '¿Estas seguro de querer guardar estos datos?',
            [
                {
                    text: 'Cancel',
                    onPress: () => {
                        this.setState({ loading: false });
                    },
                    style: 'cancel',
                },
                {
                    text: 'OK', onPress: () => {
                        this.dataToFetch();
                    }
                },
            ],
            { cancelable: false },
        );
    }

    dataToFetch = async () => {
        const { username, nombres, apellidos, genero, fecNac, estadoCivil, tipoDocumento, numDocumento, correoElectronico, telefono, direccion, imagen } = this.state;
        const jwt = await _GetAsyncStorage("jwt");
        this.fetchUpdateUser(username, nombres, apellidos, genero, fecNac, estadoCivil, tipoDocumento, numDocumento, correoElectronico, telefono, direccion, imagen, jwt);
    }

    fetchUpdateUser = async (username, nombres, apellidos, genero, fecNac, estadoCivil, tipoDocumento, numDocumento, correoElectronico, telefono, direccion, imagen, jwt) => {
        await fetch('http://35.236.27.209/movilPeru/api/controller/update_user.php', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                nombres: nombres,
                apellidos: apellidos,
                genero: genero,
                fecNac: fecNac,
                estadoCivil: estadoCivil,
                tipoDocumento: tipoDocumento,
                numDocumento: numDocumento,
                correoElectronico: correoElectronico,
                telefono: telefono,
                direccion: direccion,
                imagen: imagen,
                jwt: jwt
            })
        }).then(response => { return response.json() })
            .then(data => {
                data.success
                    ? this.updateJWT(data.jwt, data.message)
                    : this.deniedUpdate(data.message)
            });
    }

    updateJWT(jwt, message) {
        _RemoveStorage("jwt");
        _SetAsyncStorage("jwt", jwt)
            .then(this.props.dispatch({ type: 'UPDATE' }))
            .then(this.setState({
                loading: false,
                editable: false,
                alertShow: true,
                alertTheme: "success",
                alertTitle: "Correcto",
                alertContent: message
            }));
    }

    deniedUpdate(message) {
        this.setState({
            loading: false,
            alertShow: true,
            alertTheme: "danger",
            alertTitle: "Incorrecto",
            alertContent: message
        });
        this.setState({ loading: false })
    }

    onCancelUpdate = async () => {
        const currentUser = await this.props.currentUser
        this.setState({ editable: false });
        currentUser ? this.propsToState(currentUser) : null;
    }

    alertEdit() {
        Alert.alert(
            'Editar Datos',
            '¿Estas seguro de querer editar tus datos?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'OK', onPress: () => {
                        this.setState({ editable: true })
                    }
                },
            ],
            { cancelable: false },
        );
    }

    render() {

        const { username, nombres, apellidos, genero, fecNac, tipoDocumento, numDocumento, correoElectronico, direccion, telefono, imagen } = this.state;
        const { alertShow, alertTheme, alertTitle, alertContent, editable } = this.state;

        return (
            <View>
                <ScrollView style={{ backgroundColor: "#F0F2F9" }}>
                    <UserProfile
                        firstname={nombres}
                        lastname={apellidos}
                        image={imagen}
                        uploading={(value)=>{this.handleChange("loading",value)}}
                        handleImage={(value)=>{this.handleImage(value)}}
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
                                {
                                    !editable
                                        ?
                                        <Button style={styles.buttonContainerHeader}
                                            onPress={() => {
                                                this.alertEdit()
                                            }}>
                                            <Text style={{ color: "white" }}>Edit</Text>
                                        </Button>
                                        :
                                        <View style={styles.containerUpdate}>
                                            <Button
                                                style={styles.saveButton}
                                                onPress={() => {
                                                    this.updateUser();
                                                }}>
                                                <Text style={{ color: "white" }}>Save</Text>
                                            </Button>

                                            <Button
                                                style={styles.cancelButton}
                                                onPress={() => {
                                                    this.onCancelUpdate();
                                                }}>
                                                <Text style={{ color: "white" }}>Cancel</Text>
                                            </Button>
                                        </View>
                                }


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
                                label={"Nombres"}
                                placeholder={"Nombres"}
                                value={nombres}
                                editable={editable}
                                onChange={(value) => { this.handleChange("nombres", value) }}
                            />
                            <InputText
                                label={"Apellidos"}
                                placeholder={"Apellidos"}
                                value={apellidos}
                                editable={editable}
                                onChange={(value) => { this.handleChange("apellidos", value) }}
                            />
                            <View style={styles.inputContainer}>
                                <Text style={styles.inputLabel}>Genero</Text>
                                <Picker
                                    enabled={editable}
                                    note
                                    mode="dropdown"
                                    style={styles.input}
                                    itemTextStyle={{ fontFamily: "NeoSans", color: "black" }}
                                    textStyle={{ fontFamily: "NeoSans", color: "black" }}
                                    selectedValue={genero}
                                    onValueChange={(value) => { this.handleChange("genero", value) }}
                                >
                                    <Picker.Item label="Masculino" value="Masculino" />
                                    <Picker.Item label="Femenino" value="Femenino" />
                                    <Picker.Item label="Indefinido" value="Indefinido" />
                                </Picker>
                            </View>
                            {
                                editable
                                    ? <View style={styles.inputContainer}>
                                        <Text style={styles.inputLabel}>Fecha de nacimiento</Text>
                                        <View style={[styles.input, { paddingTop: RF(1), paddingLeft: -RF(1) }]}>
                                            <DatePicker
                                                placeHolderText={fecNac}
                                                disabled={!editable}
                                                locale={"en"}
                                                timeZoneOffsetInMinutes={undefined}
                                                modalTransparent={false}
                                                animationType={"fade"}
                                                androidMode={"default"}
                                                textStyle={{ color: "black" }}
                                                placeHolderTextStyle={{ color: "grey" }}
                                                onDateChange={(value) => { this.handleChange("fecNac", value) }}
                                            />
                                        </View>
                                    </View>
                                    : <InputText
                                        label={"Fecha de nacimiento"}
                                        placeholder={"Fecha de nacimiento"}
                                        value={fecNac}
                                        editable={editable}
                                        onChange={(value) => { this.handleChange("fecNac", value) }}
                                    />
                            }
                            <View style={styles.inputContainer}>
                                <Text style={styles.inputLabel}>Tipo Documento</Text>
                                <Picker
                                    enabled={editable}
                                    note
                                    mode="dropdown"
                                    style={styles.input}
                                    itemTextStyle={{ fontFamily: "NeoSans", color: "black" }}
                                    textStyle={{ fontFamily: "NeoSans", color: "black" }}
                                    selectedValue={tipoDocumento}
                                    onValueChange={(value) => { this.handleChange("tipoDocumento", value) }}
                                >
                                    <Picker.Item label="DNI" value="DNI" />
                                    <Picker.Item label="Pasaporte" value="Pasaporte" />
                                </Picker>
                            </View>
                            <InputText
                                label={"Numero documento"}
                                placeholder={"Numero documento"}
                                value={numDocumento}
                                editable={editable}
                                onChange={(value) => { this.handleChange("numDocumento", value) }}
                            />
                            <View style={styles.separator} />
                            <Text style={{
                                color: "#b9bbd1",
                                fontFamily: "NeoSans",
                                marginLeft: width * 0.06,
                                fontWeight: "bold",
                            }}>CONTACT INFORMATION</Text>
                            <InputText
                                label={"Email address"}
                                placeholder={"Email address"}
                                value={correoElectronico}
                                editable={editable}
                                onChange={(value) => { this.handleChange("correoElectronico", value) }}
                                keyboardType={}
                            />
                            <InputText
                                label={"Numero de telefono"}
                                placeholder={"Numero de telefono"}
                                value={telefono}
                                editable={editable}
                                onChange={(value) => { this.handleChange("telefono", value) }}
                            />
                            <InputText
                                label={"Direccion"}
                                placeholder={"Direccion"}
                                value={direccion}
                                editable={editable}
                                onChange={(value) => { this.handleChange("direccion", value) }}
                            />
                        </View>
                    </View>
                </ScrollView >
                {this.state.loading &&
                    <BlurView tint="light" intensity={50} style={StyleSheet.absoluteFill}>
                        <ActivityIndicator size='large' style={styles.loading} />
                    </BlurView>
                }
                <TestAlert
                    theme={alertTheme}
                    show={alertShow}
                    title={alertTitle}
                    content={alertContent}
                    onClose={() => { this.handleChange("alertShow", false) }}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    inputContainer: {
        marginHorizontal: " 7%",
        marginVertical: width * 0.04
    },
    inputLabel: {
        fontWeight: "bold",
        fontFamily: "NeoSans",
        fontSize: RF(2.5),
        color: "#525f7f",
        marginBottom: 7
    },
    input: {
        backgroundColor: "white",
        height: width * 0.15,
        borderRadius: 7,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
        paddingLeft: RF(1.5),
        width: width * 0.775
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
    },
    containerUpdate: {
        display: "flex",
        flexDirection: "row",
        position: "absolute",
        right: width * 0.07,
        height: width * 0.1,
    },
    saveButton: {
        backgroundColor: "#11cdef",
        right: width * 0.07,
        width: width * 0.15,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 7,
        left: 0
    },
    cancelButton: {
        backgroundColor: "#172b4d",
        right: width * 0.07,
        width: width * 0.15,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 7,
        marginLeft: 5,
        right: 0
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
});