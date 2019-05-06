import React, { Component } from 'react';
import { Platform, StatusBar, TouchableOpacity } from "react-native"
import { Container, Content, Button, ListItem, Text, Icon, Left, Body, Right, Switch, View, Footer } from 'native-base';
import { Header } from "react-navigation";
import { _RemoveStorage } from "../utils/asyncStorage/removeAsyncStorage";
import { _GetAsyncStorage } from "../utils/asyncStorage/getAsyncStorage";

const drawerHeaderHeight =
    Platform.OS === 'android'
        ? StatusBar.currentHeight + Header.HEIGHT
        : Header.HEIGHT;

export default class DrawerContent extends Component {

    state = {
        username: ""
    }

    logout = () => {
        this.props.dispatch({ type: 'LOGOUT' })
        _RemoveStorage("username");
        _RemoveStorage("password");
        this.props.navigation.closeDrawer();
    }

    getUserName = () => {
        _GetAsyncStorage("username").then(data => {
            this.setState({ "username": data })
        })
    }

    render() {
        const currentUser = this.props.currentUser._55;
        return (
            <Container>
                <View style={{ backgroundColor: "#f7c600", height: drawerHeaderHeight }}>
                </View>
                <Content style={{ flex: 1, height: "100%" }}>
                    {
                        currentUser === false && currentUser !== null
                            ? <ListItem icon>
                                <Left>
                                    <Button style={{ backgroundColor: "#25d366" }}
                                        onPress={() => { this.props.navigation.navigate('LoginModal') }}>
                                        <Icon active name="ios-contact" />
                                    </Button>
                                </Left>
                                <Body>
                                    <TouchableOpacity
                                        onPress={() => { this.props.navigation.navigate('LoginModal') }}>
                                        <Text>Login</Text>
                                    </TouchableOpacity>
                                </Body>
                            </ListItem>
                            : null
                    }
                    {currentUser === true && currentUser !== null
                        ? <ListItem icon>
                            <Left>
                                <Button style={{ backgroundColor: "#25d366" }}>
                                    <Icon active name="ios-contact" />
                                </Button>
                            </Left>
                            <Body>
                                {this.getUserName()}
                                <Text>{this.state.username}</Text>
                            </Body>
                        </ListItem>
                        : null
                    }
                    <ListItem icon>
                        <Left>
                            <Button style={{ backgroundColor: "blue" }}>
                                <Icon active name="ios-information-circle" />
                            </Button>
                        </Left>
                        <Body>
                            <TouchableOpacity
                                onPress={() => { this.props.navigation.navigate('LoginModal') }}>
                                <Text>About Us</Text>
                            </TouchableOpacity>
                        </Body>
                    </ListItem>
                    {
                        currentUser === true && currentUser !== null
                            ? <ListItem icon>
                                <Left>
                                    <Button style={{ backgroundColor: "red" }}
                                        onPress={() => { this.props.navigation.navigate('LoginModal') }}>
                                        <Icon active name="ios-power" />
                                    </Button>
                                </Left>
                                <Body>
                                    <TouchableOpacity
                                        onPress={() => { this.logout() }}>
                                        <Text>Logout</Text>
                                    </TouchableOpacity>
                                </Body>
                            </ListItem>
                            : null
                    }

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