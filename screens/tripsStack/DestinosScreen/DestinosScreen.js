import React from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, ActivityIndicator } from 'react-native';
import { ListItem, Item, Input, Icon } from 'native-base';
import { BlurView } from 'expo';
import { NavigationOptions2 } from "../../../navigation/NavigationOptions";
const { width, height } = Dimensions.get('window');

export default class DestinosScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return NavigationOptions2(navigation, "Destino");
  };

  state = {
    searchText: "",
    dataSource: "",
    destinos: ""
  }

  componentWillMount() {
    this.fetchDestinos();
  }

  fetchDestinos = async () => {
    this.setState({ loading: true });
    await fetch('http://35.236.27.209/movilPeru/api/controller/get_destinos.php', {
      method: "GET"
    }).then(response => { return response.json() })
      .then(
        (data) => {
          data.success
            ? this.setState({ destinos: data.data, dataSource: data.data, loading: false })
            : this.setState({ loading: false });
        });
  }

  filterSearch(text) {
    const { destinos } = this.state;

    const newData = destinos.filter((item) => {
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

  saveStorage(idDestino, departamento, distrito, direccion) {
    const destino = departamento + ", " + distrito + ", " + direccion;
    this.props.dispatch({ type: 'SAVEIDDESTINO', idDestino });
    this.props.dispatch({ type: 'SAVEDESTINO', destino });
    this.props.navigation.navigate("Trips");
  }


  render() {

    const { dataSource } = this.state;
    const { origen } = this.props.currentTrip;

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
          renderItem={({ item }) => {
            const destino = item.departamento + ", " + item.distrito + ", " + item.direccion;
            if (destino.toUpperCase() != origen.toUpperCase()) {
              return (
                <ListItem onPress={() => { this.saveStorage(item.idDestino, item.departamento, item.distrito, item.direccion) }}>
                  <Text>{item.departamento} , {item.distrito}, {item.direccion}</Text>
                </ListItem>
              )
            }
          }}
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