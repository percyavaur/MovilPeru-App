import React, { Component } from 'react';
import { Platform, StatusBar, TouchableOpacity, ActivityIndicator, StyleSheet, Alert } from "react-native"
import { Container, Content, Button, ListItem, Text, Icon, Left, Body, View, Footer } from 'native-base';
import { Header } from "react-navigation";
import { BlurView } from "expo"
import { _RemoveStorage } from "../utils/asyncStorage/removeAsyncStorage";
import { _GetAsyncStorage } from "../utils/asyncStorage/getAsyncStorage";

const drawerHeaderHeight =
    Platform.OS === 'android'
        ? StatusBar.currentHeight + Header.HEIGHT
        : Header.HEIGHT;

export default class DrawerContent extends Component {

    state = {
        username: "",
        loading: false
    }

    logout = () => {
        Alert.alert(
            'Log Out',
            'Are you sure you want to log out?',
            [
                {
                    text: 'Cancel',
                    onPress: () => null,
                    style: 'cancel',
                },
                {
                    text: 'OK', onPress: () => {

                        this.setState({ loading: true })
                        this.props.dispatch({ type: 'LOGOUT' })
                        _RemoveStorage("username");
                        _RemoveStorage("password");
                        this.setState({ loading: false })
                        this.props.navigation.closeDrawer();
                    }
                },
            ],
            { cancelable: false },
        );
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
                    <ListItem icon>
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
                    <ListItem style={{ display: "none" }} icon>
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
                    <ListItem icon>
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
                {this.state.loading &&
                    <BlurView tint="light" intensity={50} style={StyleSheet.absoluteFill}>
                        <ActivityIndicator size='large' style={styles.loading} />
                    </BlurView>
                }
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
});