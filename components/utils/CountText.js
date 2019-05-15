import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Icon from '@expo/vector-icons';
import RF from "react-native-responsive-fontsize";

export default class CountText extends React.Component {

    handleChange = (name, value) => {
        this.props.onChange(name, value);
    }

    render() {

        const { value, name } = this.props;

        return (
            <View style={{ width: "100%", marginVertical: "8%" }}>
                <View style={{ display: "flex", flexDirection: "row", position: "relative" }}>
                    {/* Seccion para el titulo y la informacion */}
                    <View style={{ display: "flex", flexDirection: "column", position: "absolute", left: "7%" }}>
                        <Text style={{ fontSize: RF(2.7), color: "#52606D" }}>{this.props.title}</Text>
                        <Text style={{ fontSize: RF(2.4), color: "grey" }}>{this.props.info}</Text>
                    </View>
                    {/* Seccion para  los botones y el contador */}
                    <View style={{
                        display: "flex",
                        flexDirection: "row",
                        position: "absolute",
                        right: "10%",
                    }}>
                        <TouchableOpacity
                            onPress={() => { this.handleChange(name, value - 1) }}
                            style={{
                                height: "60%",
                                width: "30%",
                                marginHorizontal: 20,
                                marginTop: "5%",
                            }} >
                            <Icon.Entypo name={"minus"} size={RF(2.5)} style={{ marginLeft:RF(2), marginTop:RF(0.5) }} />
                        </TouchableOpacity>
                        <Text style={{ fontSize: RF(4), color: "#52606D" }}>{value}</Text>
                        <TouchableOpacity
                            onPress={() => { this.handleChange(name, value + 1) }}
                            style={{
                                height: "60%",
                                width: "30%",
                                marginHorizontal: 20,
                                marginTop: "5%",
                            }}>
                            <Icon.Entypo name={"plus"} size={RF(2.5)} style={{marginLeft:RF(2), marginTop:RF(0.5) }} color={"#f7c600"} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}