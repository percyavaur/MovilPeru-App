import React from 'react';
import { StyleSheet, ScrollView, Dimensions, Image } from 'react-native';
import { Card, CardItem, Body, Text, View } from "native-base";
import { NavigationOptions2 } from "../../navigation/NavigationOptions";
const { width, height } = Dimensions.get('window');
import RF from "react-native-responsive-fontsize";

export default class SelectNewScreen extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return NavigationOptions2(navigation);
    };

    componentDidMount() {
    }

    render() {
        const { titulo, subtitulo, contenido, imagen } = this.props.currentNews;
        return (
            <View style={{ backgroundColor: "#f7fafc" }}>
                <ScrollView
                    style={{ marginHorizontal: width * 0.05 }}
                >
                    <Text style={[styles.text, { fontWeight: "bold", fontSize: RF(3.5), marginVertical: width * 0.05, textAlign: "center" }]}>
                        {titulo}
                    </Text>
                    <Text style={[styles.text, { flex: 1, marginVertical: width * 0.05, textAlign: "center" }]}>
                        {subtitulo}
                    </Text>
                    <Card>
                        <CardItem cardBody>
                            <Image source={{ uri: imagen }} style={{ height: 200, width: null, flex: 1 }} />
                        </CardItem>
                        <CardItem style={{ backgroundColor: "#F0F2F9" }} footer bordered>
                            <Text style={{ fontStyle: "italic", color: "black", fontSize: RF(2) }}>Fuente: Movil Peru</Text>
                        </CardItem>
                    </Card>
                    <Text style={[styles.text, { textAlign: "justify", marginVertical: width * 0.05 }]}>
                        {contenido}
                    </Text>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    text: {
        color: "black"
    },
});
