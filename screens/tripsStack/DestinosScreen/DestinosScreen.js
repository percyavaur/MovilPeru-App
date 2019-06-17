import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { ListItem, List, Item, Input, Icon } from 'native-base';
import { NavigationOptions2 } from "../../../navigation/NavigationOptions";
const { width, height } = Dimensions.get('window');

const cities = [
  { id: "1", departamento: "Lima", distrito: "los olivos" },
  { id: "2", departamento: "Lima", distrito: "lima" },
  { id: "3", departamento: "lima", distrito: "churin" },
  { id: "4", departamento: "Lima", distrito: "trujillo" },
  { id: "5", departamento: "Ica", distrito: "trujillo" },
  { id: "6", departamento: "Tacna", distrito: "trujillo" },
  { id: "7", departamento: "Arequipa", distrito: "trujillo" },
  { id: "8", departamento: "Puerto Maldonado", distrito: "trujillo" },
  { id: "9", departamento: "Piura", distrito: "Mancora" },
  { id: "10", departamento: "tUMBES", distrito: "trujillo" },
  { id: "11", departamento: "Madre de Dios", distrito: "trujillo" },
  { id: "12", departamento: "Loreto", distrito: "trujillo" },
  { id: "2", departamento: "Lima", distrito: "lima" },
  { id: "3", departamento: "lima", distrito: "churin" },
  { id: "4", departamento: "Lima", distrito: "trujillo" },
  { id: "5", departamento: "Ica", distrito: "trujillo" },
  { id: "6", departamento: "Tacna", distrito: "trujillo" },
  { id: "7", departamento: "Arequipa", distrito: "trujillo" },
  { id: "8", departamento: "Puerto Maldonado", distrito: "trujillo" },
  { id: "9", departamento: "Piura", distrito: "Mancora" },
  { id: "10", departamento: "tUMBES", distrito: "trujillo" },
  { id: "11", departamento: "Madre de Dios", distrito: "trujillo" },
  { id: "12", departamento: "Loreto", distrito: "trujillo" },
  { id: "2", departamento: "Lima", distrito: "lima" },
  { id: "3", departamento: "lima", distrito: "churin" },
  { id: "4", departamento: "Lima", distrito: "trujillo" },
  { id: "5", departamento: "Ica", distrito: "trujillo" },
  { id: "6", departamento: "Tacna", distrito: "trujillo" },
  { id: "7", departamento: "Arequipa", distrito: "trujillo" },
  { id: "8", departamento: "Puerto Maldonado", distrito: "trujillo" },
  { id: "9", departamento: "Piura", distrito: "Mancora" },
  { id: "10", departamento: "tUMBES", distrito: "trujillo" },
  { id: "11", departamento: "Madre de Dios", distrito: "trujillo" },
  { id: "12", departamento: "Loreto", distrito: "trujillo" },
  { id: "2", departamento: "Lima", distrito: "lima" },
  { id: "3", departamento: "lima", distrito: "churin" },
  { id: "4", departamento: "Lima", distrito: "trujillo" },
  { id: "5", departamento: "Ica", distrito: "trujillo" },
  { id: "6", departamento: "Tacna", distrito: "trujillo" },
  { id: "7", departamento: "Arequipa", distrito: "trujillo" },
  { id: "8", departamento: "Puerto Maldonado", distrito: "trujillo" },
  { id: "9", departamento: "Piura", distrito: "Mancora" },
  { id: "10", departamento: "tUMBES", distrito: "trujillo" },
  { id: "11", departamento: "Madre de Dios", distrito: "trujillo" },
  { id: "12", departamento: "Loreto", distrito: "trujillo" }
]

export default class DestinosScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return NavigationOptions2(navigation, "Destino");
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

  saveStorage(idDestino, departamento, distrito) {
    const destino = departamento + ", " + distrito;
    this.props.dispatch({ type: 'SAVEIDDESTINO', idDestino });
    this.props.dispatch({ type: 'SAVEDESTINO', destino });
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
          data={dataSource}
          vertical={true}
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