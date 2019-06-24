import React, { Component } from "react";
import {
  Container,
  View,
  Header,
  Form,
  Item,
  Label,
  Input,
  Content,
  Button,
  Text,
  Left,
  Body,
  Right,
  Title,
  Icon
} from "native-base";
import { db, auth } from "../config/firebaseConfig";
import Toast from "react-native-easy-toast";
import { TouchableOpacity } from "react-native";
export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      email: "",
      pass: "",
      secureTextEntry: true
    };
  }
  //validate email

  validate = email => {
    console.log(email);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(email) === false) {
      console.log("Email is Not Correct");
      // this.toast.show('please put valid email');
      // this.toast.show('email');
      this.setState({ email: email });
      return false;
    } else {
      this.setState({ email: email });
      console.log("Email is Correct");
    }
  };

  handleForm = () => {
    let data = {
      name: this.state.fullName,
      email: this.state.email
    };
    if (data.name == "") {
      this.toast.show("Please fill the name field");
      return false;
    } else {
      auth
        .createUserWithEmailAndPassword(data.email, this.state.pass)
        .then(() => {
          db.collection("Members")
            .add(data)
            .then(response => {
              console.log("success");
              this.toast.show(`${response}`),
                this.props.navigation.navigate("MainDrawerNavigator");
            })
            .catch(err => {
              // dispatch({ type: SIGNUP_ERROR });
              console.log(err + "error");
              this.toast.show(`${err}`);
            });
        })
        .catch(err => {
          console.log(err);
          this.toast.show(`${err}`);
          // dispatch({ type: SIGNUP_ERROR });
        });
    }
  };
  render() {
    return (
      <Container>
        <Toast
          ref={toast => {
            this.toast = toast;
          }}
          style={{ backgroundColor: "red" }}
          position="bottom"
          positionValue={200}
          fadeInDuration={750}
          fadeOutDuration={3000}
          opacity={0.7}
          textStyle={{ color: "white" }}
        />
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => {
                this.props.navigation.goBack();
              }}
            >
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Sign Up</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <Form>
            <Item>
              <Icon type="MaterialIcons" name="person" />
              <Input
                ref={el => {
                  this.fullName = el;
                }}
                onChangeText={fullName => this.setState({ fullName })}
                value={this.state.fullName}
                placeholder="Full Name"
              />
            </Item>
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
                  this.emapassil = el;
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
              success
              full
              onPress={() => this.handleForm()}
              style={{ marginTop: 30 }}
            >
              <Text>Register</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}
