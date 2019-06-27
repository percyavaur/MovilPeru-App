import React from 'react';
import { StyleSheet, ScrollView, Dimensions, Image, RefreshControl, FlatList } from 'react-native';
import { Card, CardItem, Body, Text, View } from "native-base";
import { NavigationOptions2 } from "../../navigation/NavigationOptions";
import { _GetAsyncStorage } from "./../../utils/asyncStorage/getAsyncStorage";
const { width, height } = Dimensions.get('window');
import RF from "react-native-responsive-fontsize";

export default class UserTrips extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return NavigationOptions2(navigation);
    };

    state = {
        pasajes: [{}]
    }

    componentDidMount() {
        this.fetchGetPasajes()
    }

    fetchGetPasajes = async () => {
        const jwt = await _GetAsyncStorage("jwt");

        await fetch('http://35.236.27.209/movilPeru/api/controller/get_pasajes.php', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ jwt: jwt })
        }).then(response => { return response.json() })
            .then(
                (data) => {
                    this.setState({ pasajes: data.data });
                });
    }
    timeStampToDate(timestamp) {
        var t = timestamp.split(/[- :]/);
        var d = t[0]+"-"+(t[1] - 1)+"-"+t[2]
        return d;
    }

    render() {

        const { pasajes } = this.state;

        return (
            <View style={{ backgroundColor: "#f7fafc" }}>
                <ScrollView
                    style={{ marginHorizontal: width * 0.05 }}
                >
                    <FlatList
                        inset={true}
                        data={pasajes}
                        extraData={this.state}
                        renderItem={({ item, index }) => (
                            <Card key={index}>
                                <CardItem header bordered>

                                    <Text>{item.fechaCompra ? this.timeStampToDate(item.fechaCompra) : null}</Text>
                                </CardItem>
                                <CardItem header bordered>
                                    <Text>
                                        Ida
                                        </Text>
                                </CardItem>
                                <CardItem bordered>
                                    <Body>
                                        <View style={{ flex: 1, flexDirection: 'column' }}>
                                            <Text style={[styles.text, { fontWeight: "bold" }]}>
                                                Origen
                                            </Text>
                                            <Text style={[styles.text, { marginLeft: 10, marginVertical: 5 }]}>
                                                {item.idaOrigen}
                                            </Text>
                                            <Text style={[styles.text, { fontWeight: "bold" }]}>
                                                Destino
                                            </Text>
                                            <Text style={[styles.text, { marginLeft: 10, marginVertical: 5 }]}>
                                                {item.idaDestino}
                                            </Text>
                                        </View>
                                    </Body>
                                </CardItem>
                                {
                                    item.vueltaOrigen ?
                                        <CardItem header bordered>
                                            <Text style={[styles.text]}>
                                                Vuelta
                                            </Text>
                                        </CardItem>
                                        : null
                                }
                                {item.vueltaDestino ?

                                    <CardItem bordered>
                                        <View style={{ flex: 1, flexDirection: 'column' }}>
                                            <Text style={[styles.text, { fontWeight: "bold" }]}>
                                                Origen
                                        </Text>
                                            <Text style={[styles.text, { marginLeft: 10, marginVertical: 5 }]}>
                                                {item.vueltaOrigen}
                                            </Text>
                                            <Text style={[styles.text, { fontWeight: "bold" }]}>
                                                Destino
                                        </Text>
                                            <Text style={[styles.text, { marginLeft: 10, marginVertical: 5 }]}>
                                                {item.vueltaDestino}
                                            </Text>
                                        </View>
                                    </CardItem>
                                    : null
                                }
                                <CardItem header bordered>
                                    <Text>
                                        Pasajero
                                    </Text>
                                </CardItem>
                                <CardItem bordered>
                                    <Text style={[styles.text]}>
                                        {item.apellidos} , {item.nombres}
                                    </Text>
                                </CardItem>
                            </Card>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    text: {
        fontFamily: 'NeoSans'
    },
});
