import React from "react"
import { Content, Form, Input, Item, Label, Icon } from "native-base";
import { TouchableOpacity } from "react-native"
// import Icon from '@expo/vector-icons';

export default class SoloIda extends React.Component {
    render() {
        return (
            <Content>
                <Form>
                    <Item floatingLabel>
                        <Icon name='ios-pin' />
                        <Label >Destination</Label>
                        <Input value="Destination"/>
                    </Item>
                </Form>
            </Content>
        )
    }
}