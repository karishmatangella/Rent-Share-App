import React, { Component } from "react";
import {
  Container,
  Header,
  Title,
  Content,
  List,
  ListItem,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Text,
  Badge,
  Footer,
  FooterTab,
  View
} from "native-base";
import { db, auth } from "../config/firebaseConfig";

export default class Logout extends Component {
  constructor(props) {
    super(props);
  }

  logOut = () => {
    auth
      .signOut()
      .then(function() {
        console.log("logout success");
        this.props.navigation.navigate("LoginStack");
      })
      .catch(function(error) {
        console.log("logout failed");
      });
  };

  render() {
    return (
      <Container>
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
            <Title>Logout</Title>
          </Body>
          <Right />
        </Header>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 10
          }}
        >
          <Text>Are you sure, you want to logout?</Text>
          <Button
            full
            danger
            style={{ marginVertical: 20 }}
            onPress={() => {
              this.logOut();
            }}
          >
            <Text>Yes, Logout</Text>
          </Button>
          <Button
            full
            onPress={() => {
              this.props.navigation.goBack();
            }}
          >
            <Text>No, Go Back</Text>
          </Button>
        </View>
      </Container>
    );
  }
}
