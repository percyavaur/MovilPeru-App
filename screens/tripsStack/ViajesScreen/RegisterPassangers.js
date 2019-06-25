import React from 'react';
import { StyleSheet, Text, View, FlatList, KeyboardAvoidingView, ScrollView, TextInput, Dimensions } from 'react-native';
import { Card, CardItem, Body, Picker, Button } from "native-base";
import { NavigationOptions2 } from "../../../navigation/NavigationOptions";
import { _GetAsyncStorage } from "../../../utils/asyncStorage/getAsyncStorage";
import InputText from "../../../components/utils/InputText";
import RF from "react-native-responsive-fontsize";
const { width, height } = Dimensions.get('window');

export default class RegisterPassangers extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return NavigationOptions2(navigation, "Registrar pasajeros");
    };

    state = {
        passangersData: [{}]
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
        const { passangersData } = this.state;
        const { descPasajeros, idIda, idVuelta, tripType } = this.props.currentTrip;
        const jwt = await _GetAsyncStorage("jwt");

        console.log(JSON.stringify({
            idViajeIda: idIda,
            idViajeVuelta: tripType == 0 ? idVuelta : 0,
            cantAdultos: descPasajeros.adultos,
            cantNinos: descPasajeros.niños,
            cantBebes: descPasajeros.bebes,
            passangersData: passangersData,
            jwt: jwt
        }))

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
                    alert("Tu reserva ha sido realizada");
                } else {
                    alert("Algo salió mal");
                }
            });
    }

    render() {
        const { passangersData } = this.state;

        return (
            <View style={{ backgroundColor: "#f7fafc", flex: 1, height: height }}>
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
                                                    keyboardType={"visible-password"}
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
                                    label={"Numero de telefono"}
                                    placeholder={"Telefono"}
                                    style={{ fontFamily: "NeoSans", borderColor: "black" }}
                                    onChange={(value) => { this.handleChange2("telefono", value) }}
                                    value={""}
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
            </View>
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
    }
});
