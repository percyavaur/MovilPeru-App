import React, { Component } from 'react';
import {
  View, Dimensions, StyleSheet, Text,
  TouchableOpacity, StatusBar, Platform,
  ActivityIndicator, KeyboardAvoidingView, Keyboard,
  ScrollView
} from "react-native"
import { Input, Label, Content, Form, Item, Icon, Button, Picker, DatePicker } from "native-base";
import { Header } from "react-navigation";
import RF from "react-native-responsive-fontsize";
import { BlurView } from 'expo';
import Toast from 'react-native-easy-toast';
import { FontAwesome } from '@expo/vector-icons';
const { width, height } = Dimensions.get('window');

const headerHeight =
  Platform.OS === 'android'
    ? StatusBar.currentHeight
    : Header.HEIGHT / 2;

export default class RegisterModal extends Component {

  state = {
    username: "",
    password: "",
    confirmPassword: "",
    nombres: "",
    apellidos: "",
    genero: null,
    fecNac: "",
    tipoDocumento: null,
    numDocumento: "",
    correoElectronico: "",
    telefono: "",

    loading: false,
    usernameError: false,
    passwordError: false,
    confirmPasswordError: false,
    nombresError: false,
    apellidosError: false,
    generoError: false,
    fecNacError: false,
    tipoDocumentoError: false,
    numDocumentoError: false,
    correoElectronicoError: false,
    telefonoError: false,
  }

  handleChange(name, value) {
    if (name == "fecNac") {
      const date = new Date(value);
      const fecNac = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
      this.setState({ [name]: fecNac })
    } else {
      this.setState({ [name]: value })
    }
  }

  registerValidation() {
    const { username, password, confirmPassword, nombres, apellidos, genero, fecNac, tipoDocumento, numDocumento, correoElectronico, telefono } = this.state;
    this.setState({
      usernameError: !username ? true : false,
      passwordError: !password ? true : false,
      confirmPasswordError: !confirmPassword ? true : false,
      nombresError: !nombres ? true : false,
      apellidosError: !apellidos ? true : false,
      generoError: !genero ? true : false,
      fecNacError: !fecNac ? true : false,
      tipoDocumentoError: !tipoDocumento ? true : false,
      numDocumentoError: !numDocumento ? true : false,
      correoElectronicoError: !correoElectronico ? true : false,
      telefonoError: !telefono ? true : false,
    });

    if (!username || !password || !confirmPassword || !nombres || !apellidos || !genero || !fecNac || !tipoDocumento || !numDocumento || !correoElectronico || !telefono) {
      this.refs.danger.show('¡Por favor, completa los campos!', 1000);
    } else {
      this.setState({ loading: true });
      if (password.length < 8) {
        this.refs.danger.show('La contraseña debe tener mas de 8 caracteres', 1000);
        this.setState({
          passwordError: true,
          confirmPasswordError: true,
          loading: false
        });
      } else if (password == confirmPassword) {
        this.fetchRegisterValidation(username, password, nombres, apellidos, genero, fecNac, tipoDocumento, numDocumento, correoElectronico, telefono);
      }
      else {
        this.refs.danger.show('¡Las contraseñas no coinciden!', 1000);
        this.setState({
          passwordError: true,
          confirmPasswordError: true,
          loading: false
        });
      }
    }
  }

  fetchRegisterValidation = async (username, password, nombres, apellidos, genero, fecNac, tipoDocumento, numDocumento, correoElectronico, telefono) => {
    await fetch('http://192.168.1.61/movilPeru/api/controller/create_user.php', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username:username, password:password, nombres:nombres, apellidos:apellidos, genero:genero, fecNac:fecNac, tipoDocumento:tipoDocumento, numDocumento:numDocumento, correoElectronico:correoElectronico, telefono:telefono })
    }).then(response => { return response.json() })
      .then(data => {
        if (data.success) {
          this.refs.accept.show(data.message, 1000, () => {
            this.setState({ loading: false });
            this.props.navigation.navigate("LoginModal");
          });
        } else {
          this.refs.warning.show(data.message, 3000);
          this.setState({ loading: false });
        }
      });

  }

  render() {

    const {
      username, usernameError,
      password, passwordError,
      confirmPassword, confirmPasswordError,
      nombres, nombresError,
      apellidos, apellidosError,
      genero, generoError,
      fecNac, fecNacError,
      tipoDocumento, tipoDocumentoError,
      numDocumento, numDocumentoError,
      correoElectronico, correoElectronicoError,
      telefono, telefonoError
    } = this.state;

    return (
      <KeyboardAvoidingView style={{ flex: 1, backgroundColor: "#F0F2F9" }} behavior="padding" enabled>
        <StatusBar
          barStyle="dark-content"
        />
        <TouchableOpacity
          style={{ top: headerHeight, height: "8%", width: "17%" }}
          onPress={() => { this.props.navigation.goBack() }}
        >
          <Icon active name="md-arrow-round-back" style={{ left: "20%" }} />
        </TouchableOpacity>
        <ScrollView>
          <View style={styles.container}>
            <View style={{ flexDirection: "column", marginHorizontal: width * 0.05, marginBottom: width * 0.1 }}>
              <Form>
                <Text style={styles.tittleContainerHeader}>Datos de la cuenta</Text>
                <Item floatingLabel error={usernameError}>
                  <Icon active name='ios-person' />
                  <Label style={{ fontFamily: "NeoSans" }}>Username</Label>
                  <Input
                    style={{ fontFamily: "NeoSans" }}
                    onChangeText={(value) => { this.handleChange("username", value) }}
                    value={username} />
                </Item>
                <Item floatingLabel error={passwordError}>
                  <Icon active name='md-lock' />
                  <Label style={{ fontFamily: "NeoSans" }}>Password</Label>
                  <Input
                    style={{ fontFamily: "NeoSans" }}
                    onChangeText={(value) => { this.handleChange("password", value) }}
                    value={password}
                    secureTextEntry={true} />
                </Item>
                <Item floatingLabel error={confirmPasswordError}>
                  <Icon active name='md-lock' />
                  <Label style={{ fontFamily: "NeoSans" }}>Confirm Password</Label>
                  <Input
                    style={{ fontFamily: "NeoSans" }}
                    onChangeText={(value) => { this.handleChange("confirmPassword", value) }}
                    value={confirmPassword}
                    secureTextEntry={true} />
                </Item>
              </Form>
            </View>
          </View>
          <View style={styles.container}>
            <View style={{ flexDirection: "column", marginHorizontal: width * 0.05, marginBottom: width * 0.1 }}>
              <Form>
                <Text style={styles.tittleContainerHeader}>Datos Personales</Text>
                <Item floatingLabel error={nombresError} >
                  <Icon active name='ios-person' />
                  <Label style={{ fontFamily: "NeoSans" }}>Nombres</Label>
                  <Input
                    style={{ fontFamily: "NeoSans" }}
                    onChangeText={(value) => { this.handleChange("nombres", value) }}
                    value={nombres} />
                </Item>
                <Item floatingLabel error={apellidosError}>
                  <Icon active name='ios-person' />
                  <Label style={{ fontFamily: "NeoSans" }}>Apellidos</Label>
                  <Input
                    style={{ fontFamily: "NeoSans" }}
                    onChangeText={(value) => { this.handleChange("apellidos", value) }}
                    value={apellidos} />
                </Item>
                <Item error={generoError}>
                  <View style={{ marginTop: RF(3), display: "flex", flexDirection: "row" }}>
                    <Icon active name='md-transgender' style={{ width: "10%", paddingTop: 15 }} />
                    <Picker
                      note
                      mode="dropdown"
                      style={{ width: "90%" }}
                      itemTextStyle={{ fontFamily: "NeoSans", color: "black" }}
                      textStyle={{ fontFamily: "NeoSans", color: "black" }}
                      selectedValue={genero}
                      onValueChange={(value) => { this.handleChange("genero", value) }}
                    >
                      <Picker.Item label="Selecciona tu sexo" value={null} />
                      <Picker.Item label="Masculino" value="Masculino" />
                      <Picker.Item label="Femenino" value="Femenino" />
                      <Picker.Item label="Indefinido" value="Indefinido" />
                    </Picker>
                  </View>
                </Item>
                <Item error={fecNacError}>
                  <View style={{ marginTop: RF(3), display: "flex", flexDirection: "row" }}>
                    <Icon active name='md-calendar' style={{ paddingTop: 10 }} />
                    <DatePicker
                      locale={"en"}
                      timeZoneOffsetInMinutes={undefined}
                      modalTransparent={false}
                      animationType={"fade"}
                      androidMode={"default"}
                      placeHolderText="Fecha de nacimiento"
                      textStyle={{ color: "black" }}
                      placeHolderTextStyle={{ color: "grey" }}
                      onDateChange={(value) => { this.handleChange("fecNac", value) }}
                      disabled={false}
                    />
                  </View>
                </Item>
                <Item error={tipoDocumentoError}>
                  <View style={{ marginTop: RF(3), display: "flex", flexDirection: "row" }}>
                    <FontAwesome name='id-card' size={RF(2.8)} style={{ width: "10%", paddingTop: 15 }} color={tipoDocumentoError ? "red" : "black"} />
                    <Picker
                      note
                      mode="dropdown"
                      style={{ width: "90%" }}
                      itemTextStyle={{ fontFamily: "NeoSans", color: "black" }}
                      textStyle={{ fontFamily: "NeoSans", color: "black" }}
                      selectedValue={tipoDocumento}
                      onValueChange={(value) => { this.handleChange("tipoDocumento", value) }}
                    >
                      <Picker.Item label="Selecciona tu documento" value={null} />
                      <Picker.Item label="DNI" value="DNI" />
                      <Picker.Item label="Pasaporte" value="Pasaporte" />
                    </Picker>
                  </View>
                </Item>
                <Item floatingLabel error={numDocumentoError}>
                  <Icon active name='md-document' />
                  <Label style={{ fontFamily: "NeoSans" }}>Numero documento</Label>
                  <Input
                    style={{ fontFamily: "NeoSans" }}
                    onChangeText={(value) => { this.handleChange("numDocumento", value) }}
                    value={numDocumento} />
                </Item>
              </Form>
            </View>
          </View>
          <View style={styles.container}>
            <View style={{ flexDirection: "column", marginHorizontal: width * 0.05, marginBottom: width * 0.1 }}>
              <Form>
                <Text style={styles.tittleContainerHeader}>Contacto</Text>
                <Item floatingLabel error={correoElectronicoError}>
                  <Icon active name='ios-mail' />
                  <Label style={{ fontFamily: "NeoSans" }}>Correo Electronico</Label>
                  <Input
                    style={{ fontFamily: "NeoSans" }}
                    onChangeText={(value) => { this.handleChange("correoElectronico", value) }}
                    value={correoElectronico} />
                </Item>
                <Item floatingLabel error={telefonoError}>
                  <Icon active name='ios-call' />
                  <Label style={{ fontFamily: "NeoSans" }}>Numero de telefono</Label>
                  <Input
                    style={{ fontFamily: "NeoSans" }}
                    onChangeText={(value) => { this.handleChange("telefono", value) }}
                    value={telefono} />
                </Item>
                <Button style={styles.Button} onPress={() => {
                  Keyboard.dismiss();
                  this.registerValidation()
                }}>
                  <Text style={styles.buttonRegisterText}>Registrarse</Text>
                </Button>
              </Form>
            </View>
          </View>
        </ScrollView>
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
  tittleContainerHeader: {
    left: width * 0.04,
    fontFamily: "NeoSans",
    fontSize: RF(3),
    marginTop: RF(3),
    color: "#1b0088"
  },
  container: {
    display: "flex",
    backgroundColor: "white",
    marginHorizontal: width * 0.05,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    marginBottom: width * 0.05
  },
  image: {
    width: width * 0.7,
    height: height * 0.2,
    marginLeft: "6%"
  },
  Button: {
    backgroundColor: "#ED1650",
    width: "100%",
    height: height * 0.065,
    marginTop: "10%",
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonRegisterText: {
    color: "white",
    fontSize: RF(2.8),
    fontFamily: "NeoSans",
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
    justifyContent: "center",
    bottom: "60%",
  }
});