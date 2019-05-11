import React, { Component } from 'react';
import { View, Dimensions, StyleSheet, Text, TouchableOpacity, StatusBar, Platform, ActivityIndicator, KeyboardAvoidingView } from "react-native"
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

export default class RegisterModal extends Component {

  state = {
    loading: false,
    firstName: "",
    firstNameError: false,
    lastName: "",
    lastNameError: false,
    username: "",
    usernameError: false,
    password: "",
    passwordError: false,
    confirmPassword: "",
    confirmPasswordError: false,
  }

  handleChange(firstName, value) {
    this.setState({ [firstName]: value })
  }

  registerValidation() {
    const { firstName, lastName, username, password, confirmPassword } = this.state;
    this.setState({
      firstNameError: !firstName ? true : false,
      lastNameError: !lastName ? true : false,
      usernameError: !username ? true : false,
      passwordError: !password ? true : false,
      confirmPasswordError: !confirmPassword ? true : false,
    });

    if (!firstName || !lastName || !username || !password || !confirmPassword) {
      this.refs.danger.show('¡Por favor, completa los campos!', 1000);
    } else {
      this.setState({ loading: true });
      if (password === confirmPassword) {
        this.fetchRegisterValidation(firstName, lastName, username, password);
      } else {
        this.refs.danger.show('¡Las contraseñas no coinciden!', 1000);
        this.setState({
          passwordError: true,
          confirmPasswordError: true,
          loading: false
        });
      }
    }
  }

  fetchRegisterValidation = async (firstName, lastName, username, password) => {
    await fetch('http://35.236.27.209/php_api_jwt/api/create_user.php', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ firstname: firstName, lastname: lastName, username: username, password: password })
    }).then(response => { return response.json() })
      .then(data => {
        if (data.message === "User was created.") {
          this.refs.accept.show(data.message, 1000, ()=>{
            this.setState({ loading: false });
            this.props.navigation.navigate("LoginModal");
          });
        } else {
          this.refs.warning.show(data.message, 1000);
          this.setState({ loading: false });
        }
      });
    
  }

  render() {

    const {
      firstName, firstNameError,
      lastName, lastNameError,
      username, usernameError,
      password, passwordError,
      confirmPassword, confirmPasswordError
    } = this.state;

    return (
      <KeyboardAvoidingView style={{ flex: 1, backgroundColor: "white" }} behavior="padding" enabled>
        <TouchableOpacity
          style={{ top: headerHeight, height: "8%", width: "17%" }}
          onPress={() => { this.props.navigation.goBack() }}
        >
          <Icon active name="md-arrow-round-back" style={{ left: "20%" }} />
        </TouchableOpacity>
        <Content style={{ top: "10%", marginHorizontal: "10%", flex: 1 }}>
          <Form>
            <Item floatingLabel error={firstNameError} >
              <Icon active name='ios-person' />
              <Label >First firstName</Label>
              <Input
                onChangeText={(value) => { this.handleChange("firstName", value) }}
                value={firstName} />
            </Item>
            <Item floatingLabel error={lastNameError}>
              <Icon active name='ios-person' />
              <Label >Last firstName</Label>
              <Input
                onChangeText={(value) => { this.handleChange("lastName", value) }}
                value={lastName} />
            </Item>
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
            <Item floatingLabel error={confirmPasswordError}>
              <Icon active name='md-lock' />
              <Label >Confirm Password</Label>
              <Input
                onChangeText={(value) => { this.handleChange("confirmPassword", value) }}
                value={confirmPassword}
                secureTextEntry={true} />
            </Item>
            <Button style={styles.Button} onPress={() => { this.registerValidation() }}>
              <Text style={styles.buttonRegisterText}>Registrarse</Text>
            </Button>
          </Form>
          <View><Text></Text></View>
        </Content>
        <Toast
          ref="danger"
          style={[styles.toast, { backgroundColor: "red" }]}
          position='top'
          opacity={0.8}
        />
        <Toast
          ref="accept"
          style={[styles.toast, { backgroundColor: "green" }]}
          position='top'
          opacity={0.8}
        />
        <Toast
          ref="warning"
          style={[styles.toast, { backgroundColor: "orange" }]}
          position='top'
          opacity={0.8}
        />
        {this.state.loading &&
          <BlurView tint="light" intensity={50} style={StyleSheet.absoluteFill}>
            <ActivityIndicator size='large' style={styles.loading} />
          </BlurView>
        }
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
  buttonRegisterText: {
    color: "white",
    fontSize: RF(2.8),
    top: "1%"
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }, toast: {
    backgroundColor: 'red',
    width: "70%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    bottom: "60%",
  }
});