import React from "react";
import { View, Text } from "react-native"
import { Ionicons } from '@expo/vector-icons';
import RF from "react-native-responsive-fontsize";
const Icon = Ionicons;

export default class LabelText extends React.Component {
    render() {
        return (
            <View style={{ width: "100%", marginTop: RF(3) }}>
                <View style={{
                    display: "flex",
                    flexDirection: "column",
                    marginHorizontal: "7%",
                    borderBottomWidth: 1,
                    borderBottomColor: "grey",
                }}>
                    <View style={{ display: "flex", flexDirection: "row" }}>
                        <Icon name={this.props.icon} color={"#ED1650"} size={RF(2.8)} />
                        <Text
                            style={{
                                color: "#52606D",
                                fontSize: RF(2.4),
                                marginLeft: RF(1),
                                fontFamily: "NeoSans"
                            }}
                        >{this.props.label}</Text>
                    </View>
                    <View style={{ marginTop: RF(1) }}>
                        <Text style={{
                            color: "grey",
                            fontSize: RF(2.3),
                            fontFamily: "NeoSans"
                        }}>{this.props.value}</Text>
                    </View>
                </View>
            </View>
        )
    }
}