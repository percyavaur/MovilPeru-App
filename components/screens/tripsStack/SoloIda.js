import React from "react"
import { Content, View, Button } from "native-base";
import LabelText from "../../utils/LabelText";
import { TouchableOpacity, Text, StyleSheet, Dimensions, TouchableWithoutFeedback } from "react-native";
import RF from "react-native-responsive-fontsize";
import { currentUser } from "../../../redux/reducer";
const { width, height } = Dimensions.get('window');
// import Icon from '@expo/vector-icons'

export default class SoloIda extends React.Component {
    render() {
        const {currentTrip} = this.props;
        return (
            <Content style={{ marginTop: "2%" }}>
                <TouchableOpacity onPress={() => {
                    this.props.navigation.navigate("DestinosScreen");
                }}>
                    <LabelText
                        icon="md-pin"
                        label="Origen"
                        value={currentTrip.origen ? currentTrip.origen :"Ingresa una ciudad de origen"}
                        style={currentTrip.origen ? { color: "blue" } : null}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    this.props.navigation.navigate("DestinosScreen");
                }}>
                    <LabelText
                        icon="md-pin"
                        label="Destino"
                        value={currentTrip.destino ? currentTrip.destino :"Ingresa una ciudad de destino"}
                        style={currentTrip.destino ? { color: "blue" } : null}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    this.props.navigation.navigate("PasajerosScreen");
                }}>
                    <LabelText
                        icon="md-people"
                        label="Pasajeros"
                        value={currentTrip.cantPasajeros ? currentTrip.cantPasajeros  + " Pasajeros" : "0 Adulto, 0 Niños"}
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
                            value={currentTrip.fechaIda ? currentTrip.fechaIda : "DD/MM/AA"}
                            style={currentTrip.fechaIda ? { color: "blue" } : null}
                        />
                    </TouchableOpacity>
                </View>
                <Button style={styles.Button}>
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