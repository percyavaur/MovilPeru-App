import React, { Component } from 'react';
import { View, Dimensions, StyleSheet, Text, TouchableOpacity, StatusBar, Platform, ActivityIndicator, Keyboard } from "react-native"
import { Input, Label, Content, Form, Item, Icon, Button } from "native-base";
import { Header } from "react-navigation";
import RF from "react-native-responsive-fontsize";
import { _SetAsyncStorage } from "../../utils/asyncStorage/setAsyncStorage";
import { _GetAsyncStorage } from "../../utils/asyncStorage/getAsyncStorage";
import { BlurView } from 'expo';
import Toast from 'react-native-easy-toast';
const { width, height } = Dimensions.get('window');

const headerHeight =
  Platform.OS === 'android'
    ? StatusBar.currentHeight
    : Header.HEIGHT / 2;

export default class LoginModal extends Component {

  state = {
    loading: false,
  }

  handleChange(name, value) {
    this.setState({ [name]: value })
  }

  loginValidation() {
    const { username, password } = this.state;
    if (!username || !password) {
      this.refs.toast.show('¡Completa los campos!', 1000);
    } else {
      this.setState({ loading: true });
      this.fetchLoginValidation(username, password);
    }
  }

  fetchLoginValidation = async (username, password) => {
    await fetch('http://35.236.27.209/php_api_jwt/api/login.php', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: username, password: password })
    }).then(response => { return response.json() })
      .then(data => { data.jwt ? _SetAsyncStorage("jwt", data.jwt) : null });
    this.confirmAccess();
  }

  confirmAccess() {
    _GetAsyncStorage("jwt").then(jwt => {
      if (jwt) {
        this.props.dispatch({ type: 'LOGIN', jwt });
        this.props.navigation.navigate("Home");
      } else {
        this.refs.toast.show('¡Usuario o contraseña incorrecto!', 1000);
      }
    }).then(() => {
      this.setState({ loading: false });
    });
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <TouchableOpacity
          style={{ top: headerHeight, left: "5%", height: "10%", width: "10%" }}
          onPress={() => { this.props.navigation.goBack() }}
        >
          <Icon active name="md-arrow-round-back" />
        </TouchableOpacity>
        <Content style={{ top: "25%", marginHorizontal: "10%" }}>
          <Form>
            <Item floatingLabel>
              <Icon active name='ios-person' />
              <Label >Username</Label>
              <Input
                onChangeText={(value) => { this.handleChange("username", value) }}
                value={this.state.username} />
            </Item>
            <Item floatingLabel >
              <Icon active name='md-lock' />
              <Label >Password</Label>
              <Input
                onChangeText={(value) => { this.handleChange("password", value) }}
                value={this.state.password}
                secureTextEntry={true} />
            </Item>
            <Button style={styles.Button}
              onPress={() => {
                Keyboard.dismiss();
                this.loginValidation()
              }}
            >
              <Text style={styles.buttonLoginText}>Iniciar Sesion</Text>
            </Button>
            <TouchableOpacity>
              <Text style={styles.newAccountText}>Crear Cuenta</Text>
            </TouchableOpacity>
          </Form>
        </Content>
        <Toast
          ref="toast"
          style={{ backgroundColor: 'red', width: "70%", display: "flex", alignItems: "center", justifyContent: "center" }}
          position='top'
          opacity={0.8}
        />
        {this.state.loading &&
          <BlurView tint="light" intensity={50} style={StyleSheet.absoluteFill}>
            <ActivityIndicator size='large' style={styles.loading} />
          </BlurView>
        }
      </View >
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: width * 0.7,
    height: height * 0.2,
    marginLeft: "6%"
  },
  Button: {
    backgroundColor: "#3483fa",
    borderRadius: height * 0.5,
    width: "100%",
    height: height * 0.065,
    marginTop: "10%",
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  newAccountText: {
    color: "#3483fa",
    fontSize: RF(2.8),
    marginTop: "5%",
    alignSelf: "center"
  },
  buttonLoginText: {
    color: "white",
    fontSize: RF(2.8),
    bottom: "1%"
  },
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