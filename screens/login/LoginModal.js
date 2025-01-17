import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, StatusBar, Platform, ActivityIndicator, Keyboard, KeyboardAvoidingView } from "react-native"
import { Input, Label, Content, Form, Item, Icon, Button } from "native-base";
import { Header } from "react-navigation";
import RF from "react-native-responsive-fontsize";
import { _SetAsyncStorage } from "../../utils/asyncStorage/setAsyncStorage";
import { _GetAsyncStorage } from "../../utils/asyncStorage/getAsyncStorage";
import { GetTokenNotifications } from "../../utils/GetTokenNotification";
import { BlurView } from 'expo';
import TestAlert from "../../components/alerts/TestAlert";
import Toast from 'react-native-easy-toast'
const { width, height } = Dimensions.get('window');

const headerHeight =
  Platform.OS === 'android'
    ? StatusBar.currentHeight
    : Header.HEIGHT / 2;

export default class LoginModal extends Component {

  static navigationOptions = {
    header: {
      visible: false,
    }
  };

  state = {
    username: "",
    usernameError: false,
    password: "",
    passwordError: false,
    loading: false,
    alertShow: false,
    alertTheme: "danger",
    alertTitle: "",
    alertContent: "",
  }

  handleChange(name, value) {
    this.setState({ [name]: value })
  }

  loginValidation() {
    const { username, password } = this.state;
    this.setState({
      usernameError: !username ? true : false,
      passwordError: !password ? true : false
    });

    if (!username || !password) {
      this.setState({
        loading: false,
        alertShow: true,
        alertTheme: "danger",
        alertTitle: "Incorrecto",
        alertContent: "¡Complete todos los campos!"
      });
    } else {
      this.setState({ loading: true });
      this.fetchLoginValidation(username, password);
    }
  }

  fetchLoginValidation = async (username, password) => {
    await fetch('http://35.236.27.209/movilPeru/api/controller/login.php', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: username, password: password })
    }).then(response => { return response.json() })
      .then(
        (data) => {
          data.success
            ? this.confirmAccess(data.jwt)
            : this.deniedAccess(data.message);
        });
  }

  async confirmAccess(jwt) {
    _SetAsyncStorage("jwt", jwt).then(() => {
      this.props.dispatch({ type: 'LOGIN', jwt });
    });

    const token = await GetTokenNotifications();
    this.setExpoToken(jwt, token)
      .then(() => {
        this.props.navigation.navigate("Trips");
        this.setState({ loading: false });
      });
  }

  async setExpoToken(jwt, token) {
    await fetch('http://35.236.27.209/movilPeru/api/controller/update_Token.php', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ jwt: jwt, expoToken: token, action: "login" })
    })
  }

  deniedAccess(message) {
    this.setState({
      loading: false,
      alertShow: true,
      alertTheme: "danger",
      alertTitle: "Incorrecto",
      alertContent: message
    });
  }

  render() {

    const { usernameError, passwordError, username, password } = this.state;
    const { alertShow, alertTheme, alertTitle, alertContent } = this.state;

    return (
      <KeyboardAvoidingView style={{ flex: 1, backgroundColor: "white" }} behavior="padding" enabled>
        <StatusBar
          barStyle="dark-content"
        />
        <TouchableOpacity
          style={{ top: headerHeight, height: "8%", width: "17%" }}
          onPress={() => { this.props.navigation.popToTop(); }}
        >
          <Icon active name="md-arrow-round-back" style={{ left: "20%" }} />
        </TouchableOpacity>
        <Content style={{ top: "22.5%", marginHorizontal: "10%" }}>
          <Form>
            <Item floatingLabel error={usernameError}>
              <Icon active name='ios-person' />
              <Label >Username</Label>
              <Input
                onChangeText={(value) => { this.handleChange("username", value) }}
                value={username} />
            </Item>
            <Item floatingLabel error={passwordError}>
              <Icon active name='md-lock' />
              <Label >Password</Label>
              <Input
                onChangeText={(value) => { this.handleChange("password", value) }}
                value={password}
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
            <TouchableOpacity
              onPress={() => { this.props.navigation.navigate("RegisterModal"); }}>
              <Text style={styles.newAccountText}> Crear Cuenta </Text>
            </TouchableOpacity>
          </Form>
        </Content>
        <Toast
          ref="toast"
          style={styles.toast}
          position='top'
          opacity={0.8}
        />
        {this.state.loading &&
          <BlurView tint="light" intensity={50} style={StyleSheet.absoluteFill}>
            <ActivityIndicator size='large' style={styles.loading} />
          </BlurView>
        }
        <TestAlert
          theme={alertTheme}
          show={alertShow}
          title={alertTitle}
          content={alertContent}
          onClose={() => { this.handleChange("alertShow", false) }}
        />
      </KeyboardAvoidingView >
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
  },
  toast: {
    backgroundColor: 'red',
    width: "70%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
});