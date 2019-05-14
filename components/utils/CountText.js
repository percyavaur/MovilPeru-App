import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Icon from '@expo/vector-icons';
import RF from "react-native-responsive-fontsize";

export default class CountText extends React.Component {

    handleValue = (name, value) => {
        this.props.onChange(name, value);
    }

    render() {

        const { value, name } = this.props;

        return (
            <View style={{ width: "100%", marginVertical: "10%" }}>
                <View style={{ display: "flex", flexDirection: "row", position: "relative", marginVertical: "2%" }}>
                    <View style={{ display: "flex", flexDirection: "column", position: "absolute", left: "7%" }}>
                        <Text style={{ fontSize: RF(2.7) }}>{this.props.title}</Text>
                        <Text style={{ fontSize: RF(2.4) }}>{this.props.info}</Text>
                    </View>
                    <View style={{
                        display: "flex",
                        flexDirection: "row",
                        position: "absolute",
                        right: "20%",
                        marginTop: "3%",
                    }}>
                        <TouchableOpacity
                            onPress={() => { this.handleValue(name, value - 1) }}
                            style={{ height: "60%", width: "30%", marginHorizontal: 20, marginTop: "5%" }} >
                            <Icon.Entypo name={"minus"} size={RF(2.5)} style={{ marginTop: RF(1) }} />
                        </TouchableOpacity>
                        <Text style={{ fontSize: RF(4) }}>{value}</Text>
                        <TouchableOpacity
                            onPress={() => { this.handleValue(name, value + 1) }}
                            style={{
                                height: "60%",
                                width: "30%",
                                marginHorizontal: 20,
                                marginTop: "5%",
                                marginLeft: RF(5)
                            }}>
                            <Icon.Entypo name={"plus"} size={RF(2.5)} style={{ marginTop: RF(1) }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}