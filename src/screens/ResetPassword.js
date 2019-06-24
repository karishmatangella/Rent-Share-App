import React, { Component } from "react";
import {
  Container,
  Form,
  Item,
  Icon,
  Input,
  Content,
  Button,
  Text
} from "native-base";
import { View, Image, TouchableOpacity } from "react-native";
import Toast, { DURATION } from "react-native-easy-toast";
import { db, auth } from "../config/firebaseConfig";

export default class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ""
    };
  }

  handleResetPassword = () => {
    let email = this.state.email;
    auth
      .sendPasswordResetEmail(email)
      .then(response => {
        console.log(response);
        alert("Please check your email to Reset your password");
        this.props.navigation.navigate("LoginStack");
      })
      .catch(err => {
        console.log(err);
        this.toast.show("ERROR! Please enter a valid email");
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
            <Button
              primary
              full
              onPress={() => this.handleResetPassword()}
              style={{ marginTop: 30, marginBottom: 20 }}
            >
              <Text>Send Email</Text>
            </Button>
          </Form>
          <TouchableOpacity>
            <Text
              style={{ color: "green", textAlign: "center" }}
              onPress={() => {
                this.props.navigation.goBack();
              }}
            >
              Back to Login
            </Text>
          </TouchableOpacity>
        </Content>
      </Container>
    );
  }
}
