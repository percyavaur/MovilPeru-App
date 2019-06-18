import React from "react"
import { Content, View, Button } from "native-base";
import LabelText from "../../utils/LabelText";
import { TouchableOpacity, Text, StyleSheet, Dimensions, TouchableWithoutFeedback } from "react-native";
import RF from "react-native-responsive-fontsize";
const { width, height } = Dimensions.get('window');
// import Icon from '@expo/vector-icons'
export default class IdaVuelta extends React.Component {

    fetchGetViajes = async (idOrigen, idDestino, cantPasajeros, fechaIda, fechaSalida) => {
        await fetch('http://35.236.27.209/movilPeru/api/controller/get_viajes.php', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idOrigen: idOrigen,
                idDestino: idDestino,
                cantPasajeros: cantPasajeros,
                fechaSalida: fechaIda
            })
        }).then(response => { return response.json() })
            .then(
                (data) => {
                    alert(JSON.stringify(data.data))
                });
    }

    render() {
        const { currentTrip } = this.props;

        return (
            <Content style={{ marginTop: "2%" }}>
                <TouchableOpacity onPress={() => {
                    this.props.navigation.navigate("OrigenScreen");
                }}>
                    <LabelText
                        icon="md-pin"
                        label="Origen"
                        value={currentTrip.origen ? currentTrip.origen : "Ingresa una ciudad de origen"}
                        style={currentTrip.origen ? { color: "blue", fontFamily: "NeoSans" } : null}

                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    this.props.navigation.navigate("DestinosScreen");
                }}>
                    <LabelText
                        icon="md-pin"
                        label="Destino"
                        value={currentTrip.destino ? currentTrip.destino : "Ingresa una ciudad o terminal"}
                        style={currentTrip.destino ? { color: "blue" } : null}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    this.props.navigation.navigate("PasajerosScreen");
                }}>
                    <LabelText
                        icon="md-people"
                        label="Pasajeros"
                        value={currentTrip.cantPasajeros ? currentTrip.cantPasajeros + " Pasajeros" : "1 Adulto, 0 Niños, 0 bebes"}
                        style={currentTrip.cantPasajeros ? { color: "blue" } : null}
                    />
                </TouchableOpacity>

                <View style={{ display: "flex", flexDirection: "row", width: "100%", marginLeft: "5%" }}>
                    <TouchableOpacity onPress={() => {
                        this.props.navigation.navigate("IdaCalendarScreen");
                    }}>
                        <LabelText
                            icon="ios-calendar"
                            label="Ida"
                            value={currentTrip.fechaIda ? currentTrip.fechaIda : "aaaa-mm-dd"}
                            style={currentTrip.fechaIda ? { color: "blue" } : null}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        this.props.navigation.navigate("VueltaCalendarScreen");
                    }}>
                        <LabelText
                            icon="ios-calendar"
                            label="Vuelta"
                            value={currentTrip.fechaVuelta ? currentTrip.fechaVuelta : "aaaa-mm-dd"}
                            style={currentTrip.fechaVuelta ? { color: "blue" } : null}
                        />
                    </TouchableOpacity>
                </View>
                <Button style={styles.Button} onPress={() => { this.fetchGetViajes(currentTrip.idOrigen, currentTrip.idDestino, currentTrip.cantPasajeros, currentTrip.fechaIda, currentTrip.fechaSalida) }}>
                    <Text style={styles.buttonLoginText}>Busca tu viaje</Text>
                </Button>
            </Content>
        )
    }
}


const styles = StyleSheet.create({
    Button: {
        backgroundColor: "#ED1650",
        width: "50%",
        height: height * 0.065,
        marginTop: "10%",
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: "25%",
        fontFamily: "NeoSans"
    },
    buttonLoginText: {
        color: "white",
        fontSize: RF(2.8),
        bottom: "1%"
    }
});