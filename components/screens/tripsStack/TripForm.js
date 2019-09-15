import React from "react"
import { Content, View, Button } from "native-base";
import LabelText from "../../utils/LabelText";
import { TouchableOpacity, Text, StyleSheet, Dimensions, TouchableWithoutFeedback } from "react-native";
import RF from "react-native-responsive-fontsize";
const { width, height } = Dimensions.get('window');
// import Icon from '@expo/vector-icons'

export default class TripForm extends React.Component {

    state = {
        loading: false,
    }

    render() {
        const { currentTrip, selectedTab } = this.props;
        const buttonDisable
            = currentTrip.idOrigen
                && currentTrip.idDestino
                && currentTrip.cantPasajeros
                && currentTrip.fechaIda
                ? false
                : true;

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
                    currentTrip.idOrigen
                        ? this.props.navigation.navigate("DestinosScreen")
                        : this.props.onActivateToast('Por favor, elige primero un origen');
                }}>
                    <LabelText
                        icon="md-pin"
                        label="Destino"
                        value={currentTrip.destino ? currentTrip.destino : "Ingresa una ciudad o terminal"}
                        style={currentTrip.destino ? { color: "blue" } : null}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    currentTrip.idOrigen && currentTrip.idDestino
                        ? this.props.navigation.navigate("PasajerosScreen")
                        : this.props.onActivateToast('Por favor, elige primero un origen y destino');
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
                    {selectedTab == 0 ?
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
                        : null
                    }
                </View>
                {
                    selectedTab == 0
                        ? <Button
                            style={[styles.Button, { backgroundColor: !buttonDisable && currentTrip.fechaVuelta ? '#ED1650' : '#bababa' }]}
                            disabled={!buttonDisable && currentTrip.fechaVuelta ? false : true}
                            onPress={() => { this.props.navigation.navigate("IdaViajeScreen") }}>
                            <Text style={styles.buttonLoginText}>Busca tu viaje</Text>
                        </Button>
                        : <Button
                            style={[styles.Button, { backgroundColor: !buttonDisable ? '#ED1650' : '#bababa' }]}
                            disabled={buttonDisable}
                            onPress={() => { this.props.navigation.navigate("IdaViajeScreen") }}>
                            <Text style={styles.buttonLoginText}>Busca tu viaje</Text>
                        </Button>
                }
            </Content>
        )
    }
}


const styles = StyleSheet.create({
    Button: {
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