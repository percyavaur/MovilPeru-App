import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationOptions2 } from "../../../navigation/NavigationOptions";

export default class RegisterPassangers extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return NavigationOptions2(navigation, "Registrar pasajeros");
    };

    render() {
        return (
            <View style={styles.container}>
                <Text>ayy :c y yo que quiera conversar mas tiempo contigo</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        top: 250,
        alignItems: "center",
        justifyContent: "center",
    }
});
