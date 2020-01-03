import React from 'react';
import { StyleSheet, Text, View, FlatList, KeyboardAvoidingView, ScrollView, TextInput, Dimensions, ActivityIndicator } from 'react-native';
import { Card, CardItem, Body, Picker, Button } from "native-base";
import { NavigationOptions2 } from "../../../navigation/NavigationOptions";
import { _GetAsyncStorage } from "../../../utils/asyncStorage/getAsyncStorage";
import { BlurView } from 'expo';
import InputText from "../../../components/utils/InputText";
import RF from "react-native-responsive-fontsize";
const { width, height } = Dimensions.get('window');

export default class RegisterPassangers extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return NavigationOptions2(navigation, "Registrar pasajeros");
    };

    state = {
        passangersData: [{}],
        correo: "",
        ticket: ""
    }

    componentDidMount() {
        const { descPasajeros } = this.props.currentTrip;
        const passangersData = [];
        var data = {};

        for (let i = 0; i < descPasajeros.adultos; i++) {
            data = { nombres: "", apellidos: "", tipoDocumento: null, numDocumento: "", idTipoPasaje: 1 }
            passangersData.push(data);
        }
        for (let i = 0; i < descPasajeros.niños; i++) {
            data = { nombres: "", apellidos: "", tipoDocumento: null, numDocumento: "", idTipoPasaje: 2 }
            passangersData.push(data);
        }
        for (let i = 0; i < descPasajeros.bebes; i++) {
            data = { nombres: "", apellidos: "", tipoDocumento: null, numDocumento: "", idTipoPasaje: 3 }
            passangersData.push(data);
        }
        this.setState({ passangersData: passangersData });
    }

    handleChange(index, name, value) {
        const { passangersData } = this.state;
        var newPassangersData = passangersData;
        name == 'nombres' ? newPassangersData[index].nombres = value : null;
        name == 'apellidos' ? newPassangersData[index].apellidos = value : null;
        name == 'tipoDocumento' ? newPassangersData[index].tipoDocumento = value : null;
        name == 'numDocumento' ? newPassangersData[index].numDocumento = value : null;
        this.setState({ passangersData: newPassangersData })
    }

    handleChange2(name, value) {
        this.setState({ [name]: value })
    }

    fetchRegisterVenta = async () => {
        this.setState({ loading: true });
        const { passangersData, correo } = this.state;
        const { descPasajeros, idIda, idVuelta, tripType } = this.props.currentTrip;
        const jwt = await _GetAsyncStorage("jwt");

        await fetch('http://35.236.27.209/movilPeru/api/controller/register_venta.php', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idViajeIda: idIda,
                idViajeVuelta: tripType == 0 ? idVuelta : 0,
                cantAdultos: descPasajeros.adultos,
                cantNinos: descPasajeros.niños,
                cantBebes: descPasajeros.bebes,
                passangersData: passangersData,
                jwt: jwt
            })
        }).then(response => { return response.json() })
            .then(data => {
                if (data.success) {
                    this.props.dispatch({ type: 'DELETEALL' });
                    this.props.navigation.navigate("Trips");
                    this.setState({ ticket: data.idVenta });
                    this.setState({ loading: false });
                    this.fetchSendEmail();
                    alert("Este es tu id de reserva: " + data.idVenta);
                } else {
                    alert("Algo salió mal");
                }
            });
    }

    fetchSendEmail = async () => {
        const { correo, ticket } = this.state;

        await fetch('http://35.236.27.209/movilPeru/api/controller/send_email.php', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ticket: ticket,
                destinatario: correo
            })
        })
    }

    render() {
        const { passangersData, correo } = this.state;

        return (
            <KeyboardAvoidingView style={{ flex: 1, backgroundColor: "#f7fafc" }} behavior="padding" enabled>
                <ScrollView style={{ marginHorizontal: width * 0.05 }}>
                    <View style={{ flex: 1 }} >
                        {
                            passangersData.map((item, index) => {
                                return (
                                    <Card key={index} >
                                        <CardItem header>
                                            <Text style={{
                                                fontWeight: "bold",
                                                fontFamily: "NeoSans",
                                                fontSize: RF(3.5),
                                                color: "#525f7f"
                                            }}>
                                                {item.idTipoPasaje == 1 ? ("Adulto") : null}
                                                {item.idTipoPasaje == 2 ? ("Niño") : null}
                                                {item.idTipoPasaje == 3 ? ("Bebe") : null}
                                            </Text>

                                        </CardItem>
                                        <CardItem style={{ backgroundColor: "#F0F2F9" }}>
                                            <Body style={{
                                                display: "flex", flexDirection: "column",
                                                alignItems: "center",
                                                justifyContent: "center",
                                            }}>
                                                <InputText
                                                    label={"Nombres"}
                                                    placeholder={"Nombre"}
                                                    style={{ fontFamily: "NeoSans", borderColor: "black" }}
                                                    onChange={(value) => { this.handleChange(index, "nombres", value) }}
                                                    value={item.nombres}
                                                    keyboardType={"visible-password"}
                                                />
                                                <InputText
                                                    label={"Apellidos"}
                                                    placeholder={"Apellido"}
                                                    style={{ fontFamily: "NeoSans", borderColor: "black" }}
                                                    onChange={(value) => { this.handleChange(index, "apellidos", value) }}
                                                    value={item.apellidos}
                                                    keyboardType={"visible-password"}
                                                />
                                                <View style={styles.inputContainer}>
                                                    <Text style={styles.inputLabel}>Tipo de documento</Text>
                                                    <Picker
                                                        note
                                                        mode="dropdown"
                                                        style={styles.input}
                                                        itemTextStyle={{ fontFamily: "NeoSans", color: "black" }}
                                                        textStyle={{ fontFamily: "NeoSans", color: "black" }}
                                                        selectedValue={item.tipoDocumento}
                                                        onValueChange={(value) => { this.handleChange(index, "tipoDocumento", value) }}
                                                    >
                                                        <Picker.Item label="Selecciona el tipo documento" value={null} />
                                                        <Picker.Item label="DNI" value="DNI" />
                                                        <Picker.Item label="Pasaporte" value="Pasaporte" />
                                                    </Picker>
                                                </View>
                                                <InputText
                                                    label={"Numero de documento"}
                                                    placeholder={"Numero de documento"}
                                                    style={{ fontFamily: "NeoSans", borderColor: "black" }}
                                                    onChange={(value) => { this.handleChange(index, "numDocumento", value) }}
                                                    value={item.numDocumento}
                                                    keyboardType="number-pad"
                                                    maxLength={10}
                                                />
                                            </Body>
                                        </CardItem>
                                    </Card>
                                )
                            })
                        }
                    </View>
                    <Card>
                        <CardItem header>
                            <Text style={{
                                fontWeight: "bold",
                                fontFamily: "NeoSans",
                                fontSize: RF(3.5),
                                color: "#525f7f"
                            }}>
                                Contacto
                            </Text>

                        </CardItem>
                        <CardItem style={{ backgroundColor: "#F0F2F9" }}>
                            <Body style={{
                                display: "flex", flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                            }}>
                                <InputText
                                    label={"Correo Electronico"}
                                    placeholder={"Correo Electronico"}
                                    style={{ fontFamily: "NeoSans", borderColor: "black" }}
                                    value={correo}
                                    onChange={(value) => { this.handleChange2("correo", value) }}
                                    keyboardType={"visible-password"}
                                />
                            </Body>
                        </CardItem>
                    </Card>
                    <View style={{ marginVertical: width * 0.05 }}>
                        <View style={{
                            marginLeft: width * 0.39,
                        }}>
                            <Button
                                onPress={() => {
                                    this.fetchRegisterVenta()
                                }}
                                style={styles.Button}>
                                <Text style={styles.buttonLoginText}>Reservar Pasajes</Text>
                            </Button>
                        </View>
                    </View>
                </ScrollView>
                {this.state.loading &&
                    <BlurView tint="light" intensity={50} style={StyleSheet.absoluteFill}>
                        <ActivityIndicator size='large' style={styles.loading} />
                    </BlurView>
                }
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: "center",
        justifyContent: "center",
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
    inputContainer: {
        height: height * 0.1,
        marginHorizontal: " 7%",
        marginTop: width * 0.03,
        marginBottom: width * 0.06
    },
    inputLabel: {
        fontWeight: "bold",
        fontFamily: "NeoSans",
        fontSize: RF(2.5),
        color: "#525f7f",
        marginBottom: 7
    },
    Button: {
        width: width * 0.5,
        height: height * 0.065,
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "NeoSans",
        backgroundColor: "#ED1650"
    },
    buttonLoginText: {
        color: "white",
        fontSize: RF(2.8),
        bottom: "1%"
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
