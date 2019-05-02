import React, { Component } from 'react';
import { Platform, StatusBar } from "react-native"
import { Container, Content, Button, ListItem, Text, Icon, Left, Body, Right, Switch, View, Footer } from 'native-base';
import { Header } from "react-navigation"

const drawerHeaderHeight =
    Platform.OS === 'android'
        ? StatusBar.currentHeight + Header.HEIGHT
        : Header.HEIGHT;

export default class DrawerContent extends Component {

    render() {
        return (
            <Container>
                <View style={{ backgroundColor: "#fecc00", height: drawerHeaderHeight }}>
                </View>
                <Content>
                    <ListItem icon>
                        <Left>
                            <Button style={{ backgroundColor: "#FF9501" }}>
                                <Icon active name="airplane" />
                            </Button>
                        </Left>
                        <Body>
                            <Text>Airplane Mode</Text>
                        </Body>
                        <Right>
                            <Switch value={false} />
                        </Right>
                    </ListItem>
                    <ListItem icon>
                        <Left>
                            <Button style={{ backgroundColor: "#007AFF" }}>
                                <Icon active name="wifi" />
                            </Button>
                        </Left>
                        <Body>
                            <Text>Wi-Fi</Text>
                        </Body>
                        <Right>
                            <Text>GeekyAnts</Text>
                            <Icon active name="arrow-forward" />
                        </Right>
                    </ListItem>
                    <ListItem icon>
                        <Left>
                            <Button style={{ backgroundColor: "#007AFF" }}>
                                <Icon active name="bluetooth" />
                            </Button>
                        </Left>
                        <Body>
                            <Text>Bluetooth</Text>
                        </Body>
                        <Right>
                            <Text>On</Text>
                            <Icon active name="arrow-forward" />
                        </Right>
                    </ListItem>
                </Content>
                <Footer style={{ backgroundColor: "white" }}>
                    <ListItem icon>
                        <Left>
                            <Button style={{ backgroundColor: Platform.OS === 'android' ? "#a4c639" : "black" }}>
                                {Platform.OS === 'android'
                                    ? <Icon active name="logo-android" />
                                    : <Icon active name="logo-apple" />}
                            </Button>
                        </Left>
                    </ListItem>
                </Footer>
            </Container>
        );
    }
}