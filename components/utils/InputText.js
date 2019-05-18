import React, { Component } from 'react';
import { View, Dimensions, Text, StyleSheet, TextInput } from "react-native";
import RF from "react-native-responsive-fontsize";
const { width, height } = Dimensions.get('window');


export default class InputText extends Component {

    handleChange(value) {
        this.props.onChange(value);
    }

    render() {
        return (
            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>{this.props.label}</Text>
                <TextInput
                    placeholder={this.props.placeholder}
                    style={styles.input}
                    value={this.props.value}
                    onChangeText={(value) => { this.handleChange(value) }}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    inputContainer: {
        marginHorizontal: " 7%",
        marginVertical: width*0.04
    },
    inputLabel: {
        fontWeight: "bold",
        fontFamily: "NeoSans",
        fontSize: RF(2.5),
        color: "#525f7f",
        marginBottom: 7
    },
    input: {
        backgroundColor: "white",
        height: width * 0.15,
        borderRadius: 7,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
        fontSize: RF(2.5),
        paddingLeft: RF(1.5)
    }
});