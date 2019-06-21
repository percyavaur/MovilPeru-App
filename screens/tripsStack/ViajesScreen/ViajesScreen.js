import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Container, Header, Content, Card, CardItem, Body, Left, Right } from 'native-base';
import { AntDesign } from '@expo/vector-icons';
import RF from "react-native-responsive-fontsize";
import { NavigationOptions2 } from "../../../navigation/NavigationOptions";
import Accordion from 'react-native-collapsible/Accordion';

export default class ViajesScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        return NavigationOptions2(navigation, "Viaje de Ida");
    };

    state = {
        activeSections: [],
        tripsData: [],
        loading: false
    };

    componentDidMount() {
        const { idOrigen, idDestino, cantPasajeros, fechaIda, fechaVuelta } = this.props.currentTrip;
        this.fetchGetViajes(idOrigen, idDestino, cantPasajeros, fechaIda, fechaVuelta);
    }

    fetchGetViajes = async (idOrigen, idDestino, cantPasajeros, fechaIda, fechaVuelta) => {
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
                    console.log(data.data)
                    this.setState({ tripsData: data.data });
                });
    }

    _renderSectionTitle = section => {
        return (
            <View>
                <Text>Section</Text>
            </View>
        );
    };

    _renderHeader = section => {
        return (
            <View>
                <Card>
                    <CardItem>
                        <Left>
                            <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                <View style={{ display: "flex", flexDirection: "column" }}>
                                    <Text>{section.depOrigen}, {section.disOrigen}</Text>
                                    <Text>{section.horaSalida}</Text>
                                </View>
                                <AntDesign name={"right"} color={"#ED1650"} size={RF(5)} />
                                <Text>{section.depDestino}, {section.disDestino}</Text>
                            </View>
                        </Left>
                        <Right>
                            <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                <View
                                    style={{
                                        height: RF(5),
                                        borderLeftWidth: 1,
                                        borderLeftColor: 'gray',
                                        right: RF(7)
                                    }}
                                />
                                <View style={{ display: "flex", flexDirection: "column", alignContent: "center" }}>
                                    <Text>Precio</Text>
                                    <Text>S/ {section.precio}</Text>
                                </View>
                            </View>
                        </Right>
                    </CardItem>
                </Card>
            </View>
        );
    };

    _renderContent = section => {
        return (
            <View style={{ display: "flex", flexDirection: "column" }}>
                <Text>{section.horaSalida}</Text>
                <Text>{section.precio}</Text>
            </View>
        );
    };

    _updateSections = activeSections => {
        this.setState({ activeSections });
    };

    render() {

        const { tripsData } = this.state;

        return (
            <Accordion
                underlayColor={"grey"}
                sections={tripsData}
                activeSections={this.state.activeSections}
                renderHeader={this._renderHeader}
                renderContent={this._renderContent}
                onChange={this._updateSections}
            />
        );
    }
}