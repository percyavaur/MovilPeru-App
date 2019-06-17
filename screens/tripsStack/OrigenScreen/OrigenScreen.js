import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { ListItem, List, Item, Input, Icon } from 'native-base';
import { NavigationOptions2 } from "../../../navigation/NavigationOptions";
const { width, height } = Dimensions.get('window');

const cities = [
    { id: "1", departamento: "lima", distrito: "los olivos" },
    { id: "2", departamento: "lima", distrito: "lima" },
    { id: "3", departamento: "lima", distrito: "churin" },
    { id: "4", departamento: "trujillo", distrito: "trujillo" }
]

export default class OrigenScreen extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return NavigationOptions2(navigation, "Origen");
    };

    state = {
        searchText: "",
        dataSource: cities
    }

    filterSearch(text) {
        const newData = cities.filter((item) => {
            const departamentoData = item.departamento.toUpperCase();
            const distritoData = item.distrito.toUpperCase();
            const textData = text.toUpperCase();
            return departamentoData.indexOf(textData) > -1 || distritoData.indexOf(textData) > -1;
        })
        this.setState({
            dataSource: newData,
            searchText: text
        })
    }

    saveStorage(idOrigen, departamento, distrito) {
        const origen = departamento+", "+distrito;
        this.props.dispatch({ type: 'SAVEIDORIGEN', idOrigen });
        this.props.dispatch({ type: 'SAVEORIGEN', origen });
        this.props.navigation.navigate("Trips");
    }

    render() {

        const { dataSource } = this.state;
        return (
            <View style={{ flex: 1 }}>
                <ListItem>
                    <Item style={{ borderBottomColor: "red" }}>
                        <Input placeholder='Ingresa una ciudad o destino' onChangeText={(text) => { this.filterSearch(text) }} />
                        <Icon name='close-circle' color={"grey"} />
                    </Item>
                </ListItem>
                <FlatList
                    inset={true}
                    data={dataSource}
                    renderItem={({ item }) => (
                        <ListItem onPress={() => { this.saveStorage(item.id, item.departamento, item.distrito) }}>
                            <Text>{item.departamento} , {item.distrito}</Text>
                        </ListItem>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        );

    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        width: "100%"
    },
});