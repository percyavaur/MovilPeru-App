import React, { Component } from 'react';
import { Container, Content, Button, ListItem, Text, Icon, Left, Body, Right, Switch, View, Input, Item } from 'native-base';
import { Header } from "react-navigation"
import { getStatusBarHeight } from 'react-native-status-bar-height';

const drawerHeaderHeight = getStatusBarHeight() + Header.HEIGHT;

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
                    <ListItem>
                        <Left><Text>{getStatusBarHeight()}</Text></Left>
                        <Body><Text>{Header.HEIGHT}</Text></Body>
                        <Right><Text>{drawerHeaderHeight}</Text></Right>
                    </ListItem>
                </Content>
            </Container>
        );
    }
}