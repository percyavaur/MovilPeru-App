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
        loading: false
    }

    logout = () => {
        this.setState({ loading: true })
        Alert.alert(
            'Log Out',
            'Are you sure you want to log out?',
            [
                {
                    text: 'Cancel',
                    onPress: () => {
                        this.setState({ loading: false });
                    },
                    style: 'cancel',
                },
                {
                    text: 'OK', onPress: () => {
                        this.props.dispatch({ type: 'LOGOUT' });
                        this.setState({ loading: false });
                        this.props.navigation.closeDrawer();
                    }
                },
            ],
            { cancelable: false },
        );
    }

    render() {
        const currentUser = this.props.currentUser._55 === null ? null : this.props.currentUser._55.username;
        return (
            <Container>
                <View style={{ backgroundColor: "#1B0088", height: drawerHeaderHeight }}>
                </View>
                <Content style={{ flex: 1, height: "100%" }}>
                    {currentUser ? null :
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
                    }
                    {currentUser ?
                        <ListItem icon>
                            <Left>
                                <Button style={{ backgroundColor: "#25d366" }}
                                    onPress={() => { this.props.navigation.navigate("Profile") }}>
                                    <Icon active name="ios-contact" />
                                </Button>
                            </Left>
                            <Body>
                                <TouchableOpacity
                                    onPress={() => { this.props.navigation.navigate("Profile") }}>
                                    <Text>{currentUser}</Text>
                                </TouchableOpacity>
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
                            <TouchableOpacity>
                                <Text>About Us</Text>
                            </TouchableOpacity>
                        </Body>
                    </ListItem>
                    {currentUser ?
                        <ListItem icon>
                            <Left>
                                <Button style={{ backgroundColor: "red" }}>
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