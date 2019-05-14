import React from "react"
import { Content, View, Button } from "native-base";
import LabelText from "../../utils/LabelText";
import { TouchableOpacity, Text, StyleSheet, Dimensions } from "react-native";
import RF from "react-native-responsive-fontsize";
const { width, height } = Dimensions.get('window');
// import Icon from '@expo/vector-icons'
export default class IdaVuelta extends React.Component {
    render() {
        return (
            <Content>
                <TouchableOpacity onPress={()=>{
                    this.props.navigation.navigate("TripScreen1");
                }}>
                    <LabelText
                        icon="md-pin"
                        label="Destino"
                        value={"Ingresa una ciudad o terminal"}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <LabelText
                        icon="md-people"
                        label="Pasajeros"
                        value={"0 Adulto, 0 Niños"}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <LabelText
                        icon="md-bus"
                        label="Ruta"
                        value={"Ingresar una ruta"}
                    />
                </TouchableOpacity>
                <View style={{ display: "flex", flexDirection: "row", width: "100%", marginLeft: "4%" }}>
                    <TouchableOpacity>
                        <LabelText
                            icon="ios-calendar"
                            label="Ida"
                            value={"DD/MM/AA"}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <LabelText
                            icon="ios-calendar"
                            label="Vuelta"
                            value={"DD/MM/AA"}
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
        backgroundColor: "#69A3AF",
        width: "50%",
        height: height * 0.065,
        marginTop: "10%",
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: "25%"
    },
    buttonLoginText: {
        color: "white",
        fontSize: RF(2.8),
        bottom: "1%"
    }
});