import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Container, Header, Content, Card, CardItem, Body, Left, Right, Button } from 'native-base';
import { AntDesign } from '@expo/vector-icons';
import RF from "react-native-responsive-fontsize";
import { NavigationOptions2 } from "../../../navigation/NavigationOptions";
import Accordion from 'react-native-collapsible/Accordion';
const { width, height } = Dimensions.get('window');


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
        this.setState({ loading: true });
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
                    this.setState({ tripsData: data.data });
                })
            .catch(function (e) {
                alert("Algo ha salido mal");
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

        var hour = section.horaSalida.split(":");

        return (
            <View style={{ marginHorizontal: width * 0.025 }}>
                <Card>
                    <CardItem>
                        <Left>
                            <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                                <View style={{ display: "flex", flexDirection: "column", width: width * 0.25, alignItems: "center" }}>
                                    <Text style={styles.texto}>{section.depOrigen}, {section.disOrigen}</Text>
                                    <Text style={styles.texto}>{hour[0]}:{hour[1]}</Text>
                                </View>
                                <AntDesign name={"right"} color={"#ED1650"} size={RF(5)} />
                                <View style={{ width: width * 0.25 }}>
                                    <Text style={styles.texto}>{section.depDestino}, {section.disDestino}</Text>
                                </View>
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
                                    <Text style={[styles.texto, { color: 'blue', fontWeight: "bold" }]} >Precio</Text>
                                    <Text style={styles.texto}>S/ {section.precio}</Text>
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
            <View style={{ display: "flex", flexDirection: "column", marginHorizontal: width * 0.05 }}>
                <Card>
                    <CardItem>
                        <Body>
                            <Text>{section.horaSalida}</Text>
                            <Text>{section.precio}</Text>
                        </Body>
                    </CardItem>
                    <CardItem>
                        <Right>
                            <View style={{ marginLeft: width * 0.5, }}>
                                <Button style={{
                                    backgroundColor: "#ED1650", width: width * 0.3,
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Text style={[styles.texto, { color: "white" }]}>Continuar</Text>
                                </Button>
                            </View>
                        </Right>
                    </CardItem>
                </Card>
            </View>
        );
    };

    _updateSections = activeSections => {
        this.setState({ activeSections });
    };

    render() {

        const { tripsData } = this.state;

        return (
            <View style={{ backgroundColor: "#F0F2F9", height: height }}>
                <Accordion
                    underlayColor={"grey"}
                    sections={tripsData}
                    activeSections={this.state.activeSections}
                    renderHeader={this._renderHeader}
                    renderContent={this._renderContent}
                    onChange={this._updateSections}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    texto: {
        fontFamily: "NeoSans",
        fontSize: RF(2)
    }
});