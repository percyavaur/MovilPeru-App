import React from 'react';
import { StyleSheet, Text, View, FlatList, KeyboardAvoidingView, ScrollView, TextInput } from 'react-native';
import { Card, CardItem, Body, Picker } from "native-base";
import { NavigationOptions2 } from "../../../navigation/NavigationOptions";

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
            data = { nombres: "", apellidos: "", tipoDocumento: "", numDocumento: "", idTipoPasaje: 1 }
            passangersData.push(data);
        }
        for (let i = 0; i < descPasajeros.niños; i++) {
            data = { nombres: "", apellidos: "", tipoDocumento: "", numDocumento: "", idTipoPasaje: 2 }
            passangersData.push(data);
        }
        for (let i = 0; i < descPasajeros.bebes; i++) {
            data = { nombres: "", apellidos: "", tipoDocumento: "", numDocumento: "", idTipoPasaje: 3 }
            passangersData.push(data);
        }
        this.setState({ passangersData: passangersData });
    }

    handleChange(index, name, value) {
        const { passangersData } = this.state;
        var newPassangersData = passangersData;
        name == 'nombres' ? newPassangersData[index].nombres = value : null;
        name == 'apellidos' ? newPassangersData[index].apellidos = value : null
        name == 'tipoDocumento' ? newPassangersData[index].tipoDocumento = value : null
        name == 'numDocumento' ? newPassangersData[index].numDocumento = value : null
        console.log("NEW ", newPassangersData)
        this.setState({ passangersData: newPassangersData })
    }

    render() {
        const { passangersData } = this.state;

        return (
            <View>
                <ScrollView>
                    <KeyboardAvoidingView style={{ flex: 1 }} behavior='position' enabled>
                        {
                            passangersData.map((item, index) => {
                                return (
                                    <Card key={index}>
                                        <CardItem>
                                            <Body>
                                                <TextInput
                                                    placeholder={"Nombres"}
                                                    style={{ fontFamily: "NeoSans", borderColor: "black" }}
                                                    onChangeText={(value) => { this.handleChange(index, "nombres", value) }}
                                                    value={item.nombres}
                                                />
                                                <TextInput
                                                    placeholder={"Apellidos"}
                                                    style={{ fontFamily: "NeoSans", borderColor: "black" }}
                                                    onChangeText={(value) => { this.handleChange(index, "apellidos", value) }}
                                                    value={item.apellidos}
                                                />
                                                <Picker
                                                    note
                                                    mode="dropdown"
                                                    style={{ width: "90%" }}
                                                    itemTextStyle={{ fontFamily: "NeoSans", color: "black" }}
                                                    textStyle={{ fontFamily: "NeoSans", color: "black" }}
                                                    selectedValue={item.tipoDocumento}
                                                    onValueChange={(value) => { this.handleChange(index, "tipoDocumento", value) }}
                                                >
                                                    <Picker.Item label="Selecciona tu documento" value={null} />
                                                    <Picker.Item label="DNI" value="DNI" />
                                                    <Picker.Item label="Pasaporte" value="Pasaporte" />
                                                </Picker>
                                                <TextInput
                                                    placeholder={"Numero de documento"}
                                                    style={{ fontFamily: "NeoSans", borderColor: "black" }}
                                                    onChangeText={(value) => { this.handleChange(index, "numDocumento", value) }}
                                                    value={item.numDocumento}
                                                />
                                            </Body>
                                        </CardItem>
                                    </Card>
                                )
                            })
                        }
                    </KeyboardAvoidingView>
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
    }
});
