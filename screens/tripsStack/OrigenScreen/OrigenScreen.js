import React from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, ActivityIndicator } from 'react-native';
import { ListItem, Item, Input, Icon } from 'native-base';
import { BlurView } from 'expo';
import { NavigationOptions2 } from "../../../navigation/NavigationOptions";
const { width, height } = Dimensions.get('window');
import * as Animatable from 'react-native-animatable';

export default class OrigenScreen extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return NavigationOptions2(navigation, "Origen");
    };

    state = {
        searchText: "",
        dataSource: "",
        origenes: "",
        loading: false
    }

    componentWillMount() {
        this.fetchGetOrigenes();
    }
    fetchGetOrigenes = async () => {
        this.setState({ loading: true });

        await fetch('http://35.236.27.209/movilPeru/api/controller/get_origenes.php', {
            method: "GET"
        }).then(response => { return response.json() })
            .then(
                (data) => {
                    data.success
                        ? this.setState({ origenes: data.data, dataSource: data.data, loading: false })
                        : this.setState({ loading: false });
                })
            .catch(function (e) {
                alert("Algo ha salido mal");
            });
    }

    filterSearch(text) {
        const { origenes } = this.state;

        const newData = origenes.filter((item) => {
            const departamentoData = item.departamento.toUpperCase();
            const distritoData = item.distrito.toUpperCase();
            const direccionData = item.direccion.toUpperCase();
            const textData = text.toUpperCase();
            return departamentoData.indexOf(textData) > -1 || distritoData.indexOf(textData) > -1 || direccionData.indexOf(textData) > -1;
        })
        this.setState({
            dataSource: newData,
            searchText: text
        })
    }

    saveStorage(idOrigen, departamento, distrito, direccion) {

        var { idDestino } = this.props.currentTrip;
        const origen = departamento + ", " + distrito + ", " + direccion;

        this.props.dispatch({ type: 'SAVEIDORIGEN', idOrigen });
        this.props.dispatch({ type: 'SAVEORIGEN', origen });

        if (idOrigen == idDestino) {

            var idDestino = "";
            var destino = "";
            this.props.dispatch({ type: 'SAVEIDDESTINO', idDestino });
            this.props.dispatch({ type: 'SAVEDESTINO', destino });
        }
        this.props.navigation.navigate("Trips");
    }

    render() {
        const { dataSource } = this.state;

        return (
            <View style={{ flex: 1 }}>
                <View style={{
                    height: 70, backgroundColor: '#ED1650', justifyContent: 'center',
                    paddingHorizontal: 5
                }}>
                    <View style={{ height: 50, backgroundColor: 'white', flexDirection: 'row', padding: 5, alignItems: 'center' }}>
                        <Icon name='ios-search' style={{ fontSize: 24 }} />
                        <Input style={{ marginLeft: 15 }} placeholder='Buscar' onChangeText={(text) => { this.filterSearch(text) }} />
                    </View>
                </View>
                <FlatList
                    inset={true}
                    data={dataSource}
                    renderItem={({ item }) => (
                        <ListItem onPress={() => { this.saveStorage(item.idOrigen, item.departamento, item.distrito, item.direccion) }}>
                            <Text>{item.departamento} , {item.distrito}, {item.direccion}</Text>
                        </ListItem>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
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
    container: {
        backgroundColor: '#fff',
        width: "100%"
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