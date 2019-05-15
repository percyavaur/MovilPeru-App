import React from "react"
import { Content, View, Button } from "native-base";
import LabelText from "../../utils/LabelText";
import { TouchableOpacity, Text, StyleSheet, Dimensions, TouchableWithoutFeedback} from "react-native";
import RF from "react-native-responsive-fontsize";
const { width, height } = Dimensions.get('window');
// import Icon from '@expo/vector-icons'

export default class SoloIda extends React.Component {
    render() {
        return (
            <Content style={{ marginTop: "2%" }}>
                <TouchableOpacity onPress={()=>{
                    this.props.navigation.navigate("DestinosScreen");
                }}>
                    <LabelText
                        icon="md-pin"
                        label="Destino"
                        value={"Ingresa una ciudad o terminal"}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{
                    this.props.navigation.navigate("PasajerosScreen");
                }}>
                    <LabelText
                        icon="md-people"
                        label="Pasajeros"
                        value={"0 Adulto, 0 Niños"}
                    />
                </TouchableOpacity>
                <TouchableOpacity  onPress={()=>{
                    this.props.navigation.navigate("DestinoScreen2");
                }}>
                    <LabelText
                        icon="md-bus"
                        label="Ruta"
                        value={"Ingresar una ruta"}
                    />
                </TouchableOpacity>
                <View style={{ display: "flex", flexDirection: "row", width: "100%", marginLeft: "5%" }}>
                    <TouchableOpacity  onPress={()=>{
                    this.props.navigation.navigate("IdaCalendarScreen");
                }}>
                        <LabelText
                            icon="ios-calendar"
                            label="Ida"
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