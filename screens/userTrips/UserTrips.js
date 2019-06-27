import React from 'react';
import { StyleSheet, ScrollView, Dimensions, Image , RefreshControl, FlatList} from 'react-native';
import { Card, CardItem, Body, Text, View } from "native-base";
import { NavigationOptions2 } from "../../navigation/NavigationOptions";
import { _GetAsyncStorage } from "./../../utils/asyncStorage/getAsyncStorage";
const { width, height } = Dimensions.get('window');
import RF from "react-native-responsive-fontsize";

export default class UserTrips extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return NavigationOptions2(navigation);
    };

    state={
        pasajes:[{}]
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

    render() {

        const {pasajes} = this.state;

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
        color: "black"
    },
});
