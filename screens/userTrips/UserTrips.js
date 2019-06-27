import React from 'react';
import { StyleSheet, ScrollView, Dimensions, Image, RefreshControl, FlatList, ActivityIndicator } from 'react-native';
import { Card, CardItem, Body, Text, View } from "native-base";
import { NavigationOptions2 } from "../../navigation/NavigationOptions";
import { _GetAsyncStorage } from "./../../utils/asyncStorage/getAsyncStorage";
import { BlurView } from 'expo';
const { width, height } = Dimensions.get('window');
import RF from "react-native-responsive-fontsize";

export default class UserTrips extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return NavigationOptions2(navigation);
    };

    state = {
        pasajes: [{}],
        loading: false
    }

    componentDidMount() {
        this.fetchGetPasajes()
    }

    fetchGetPasajes = async () => {

        this.setState({ loading: true });
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
                    this.setState({ loading: false });
                }, (error) => {
                    if (error) {
                        this.setState({ loading: false });
                    }
                });
    }

    timeStampToDate(timestamp) {
        var t = timestamp.split(/[- :]/);
        var d = t[0] + "-" + (t[1] - 1) + "-" + t[2]
        return d;
    }

    _onRefresh = () => {
        this.setState({ refreshing: true });
        this.fetchGetPasajes().then(() => {
            this.setState({ refreshing: false });
        });
    }

    render() {
        const { pasajes } = this.state;
        const { currentUser } = this.props;

        return (
            <View style={{ backgroundColor: "#f7fafc", height: height }}>
                <ScrollView
                    style={{ marginHorizontal: width * 0.05, height: height }}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh}
                        />
                    }
                >
                    {currentUser._55 ?
                        <FlatList
                            inset={true}
                            data={pasajes}
                            extraData={this.state}
                            renderItem={({ item, index }) => (
                                <Card key={index}>
                                    <CardItem style={{ backgroundColor: "#F0F2F9" }} header bordered>
                                        <Text>Fecha de compra: {item.fechaCompra ? this.timeStampToDate(item.fechaCompra) : null}</Text>
                                    </CardItem>
                                    <CardItem style={{ backgroundColor: "#F0F2F9" }} header bordered>
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
                                            <CardItem style={{ backgroundColor: "#F0F2F9" }} header bordered>
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
                                    <CardItem style={{ backgroundColor: "#F0F2F9" }} header bordered>
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
                        :
                        <View style={{
                            alignItems: "center",
                            justifyContent: "center",
                            marginTop: width*0.7
                        }}>
                            <Text>
                                Unete a nosotros, registrate y obten informacion sobre tus pasajes adquiridos
                            </Text>
                        </View>
                    }
                </ScrollView>
                {this.state.loading &&
                    <BlurView tint="light" intensity={50} style={StyleSheet.absoluteFill}>
                        <ActivityIndicator size='large' style={styles.loading} />
                    </BlurView>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    text: {
        fontFamily: 'NeoSans'
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
