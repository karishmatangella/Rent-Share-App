import React, { Component } from "react";
import {
  Container,
  Form,
  Item,
  Label,
  Input,
  Content,
  Button,
  Text,
  Icon
} from "native-base";
import { View, Image, TouchableOpacity } from "react-native";
import Toast from "react-native-easy-toast";
import { db, auth } from "../config/firebaseConfig";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      pass: "",
      secureTextEntry: true
    };
  }

  handleLogin = () => {
    let email = this.state.email;
    let pass = this.state.pass;
    auth
      .signInWithEmailAndPassword(email, pass)
      .then(response => {
        this.props.navigation.navigate("MainDrawerNavigator");
      })
      .catch(err => {
        console.log(err);
        this.toast.show(`${err}`);
      });
  };

  render() {
    return (
      <Container>
        <Toast
          ref={toast => {
            this.toast = toast;
          }}
          style={{ backgroundColor: "red" }}
          position="top"
          positionValue={200}
          fadeInDuration={750}
          fadeOutDuration={3000}
          opacity={0.7}
          textStyle={{ color: "white" }}
        />
        <Content padder>
          <View>
            <Image
              style={{ width: "100%", height: 400 }}
              source={require("../images/logos.png")}
            />
          </View>
          <Form>
            <Item>
              <Icon type="MaterialIcons" name="email" />
              <Input
                ref={el => {
                  this.email = el;
                }}
                onChangeText={email => this.setState({ email })}
                value={this.state.email}
                placeholder="Email"
              />
            </Item>
            <Item>
              <Icon type="MaterialIcons" name="security" />
              <Input
                ref={el => {
                  this.pass = el;
                }}
                onChangeText={pass => this.setState({ pass })}
                value={this.state.pass}
                secureTextEntry={this.state.secureTextEntry}
                placeholder="Password"
              />
              {this.state.secureTextEntry == true ? (
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ secureTextEntry: false });
                  }}
                >
                  <Icon type="FontAwesome" name="eye" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ secureTextEntry: true });
                  }}
                >
                  <Icon type="FontAwesome" name="eye-slash" />
                </TouchableOpacity>
              )}
            </Item>
            <Button
              primary
              full
              onPress={() => this.handleLogin()}
              style={{ marginTop: 30, marginBottom: 20 }}
            >
              <Text>Login</Text>
            </Button>
          </Form>
          <TouchableOpacity
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <Text
              style={{ color: "green" }}
              onPress={() => this.props.navigation.navigate("SignUp")}
            >
              Not a user? REGISTER NOW
            </Text>
            <Text
              style={{ color: "gray", marginTop: 15 }}
              onPress={() => this.props.navigation.navigate("ResetPassword")}
            >
              Forgot Password
            </Text>
          </TouchableOpacity>
        </Content>
      </Container>
    );
  }
}
