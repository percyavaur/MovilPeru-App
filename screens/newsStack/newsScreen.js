import React from 'react';
import { StyleSheet, View, ScrollView, Dimensions, Image, RefreshControl, FlatList, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import { Card, CardItem, Body, Text } from "native-base";
import { NavigationOptions } from "../../navigation/NavigationOptions";
import { BlurView } from 'expo';
import { sortBy } from "lodash";
import { fetchCollection } from "../../firebase";
const { width, height } = Dimensions.get('window');
import RF from "react-native-responsive-fontsize";

export default class HomeScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return NavigationOptions(navigation);
  };

  state = {
    news: [{}, {}, {}, {}],
    refreshing: false,
    loading: false
  }

  componentDidMount() {
    this.setState({loading: true})
    this.fetchGetNews();
  }

  fetchGetNews() {
    fetchCollection("news", (news) => {
      var newsSorted = sortBy(news, 'created').reverse();
      this.setState({ news: newsSorted, loading: false });
    });
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.fetchGetNews().then(() => {
      this.setState({ refreshing: false });
    });
  }

  redirectNews(titulo, subtitulo, contenido, imagen) {
    this.props.dispatch({ type: 'SAVETITULO', titulo });
    this.props.dispatch({ type: 'SAVESUBTITULO', subtitulo });
    this.props.dispatch({ type: 'SAVECONTENIDO', contenido });
    this.props.dispatch({ type: 'SAVEIMAGEN', imagen });
    this.props.navigation.navigate("selectNewsScreen");
  }

  render() {

    const { news } = this.state;

    return (
      <View style={{ backgroundColor: "#f7fafc" }}>
        <ScrollView
          style={{ marginHorizontal: width * 0.05 }}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
        >
          <FlatList
            inset={true}
            data={news}
            extraData={this.state}
            renderItem={({ item, index }) => (
              <Card key={index}>
                <CardItem header>
                  <Text style={[styles.text, { fontWeight: "bold", fontSize: RF(3) }]}>
                    {item.titulo}
                  </Text>
                </CardItem>
                <CardItem cardBody>
                  <Image source={{ uri: item.imagen }} style={{ height: 200, width: null, flex: 1 }} />
                </CardItem>
                <CardItem style={{ backgroundColor: "#F0F2F9" }} footer bordered>
                  <TouchableWithoutFeedback onPress={() => { this.redirectNews(item.titulo, item.subtitulo, item.contenido, item.imagen) }}>
                    <Text style={[styles.text, { flex: 1, fontSize: RF(2.2) }]}>
                      {item.subtitulo}
                    </Text>
                  </TouchableWithoutFeedback>
                </CardItem>
              </Card>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
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
    fontFamily: "NeoSans",
    color: "black"
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
