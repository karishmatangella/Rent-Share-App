import React, { Component } from "react";
import {
  Container,
  Form,
  Item,
  Label,
  Input,
  Content,
  Button,
  Text
} from "native-base";
import { View, Image, TouchableOpacity } from "react-native";
import Toast, { DURATION } from "react-native-easy-toast";
import { db, auth } from "../config/firebaseConfig";

export default class SplitToken extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let amount = this.props.navigation.getParam("amount", 0);
    return (
      <Container>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 10
          }}
        >
          <Text>Is this correct amount?</Text>
          <Text style={{ fontSize: 22 }}>Amount : {amount}</Text>
          <Button
            warning
            full
            onPress={() =>
              this.props.navigation.navigate("SplitMembers", { amount: amount })
            }
            style={{ marginVertical: 20 }}
          >
            <Text>Yes</Text>
          </Button>
          <Button full light onPress={() => this.props.navigation.goBack()}>
            <Text>No, Go Back</Text>
          </Button>
        </View>
      </Container>
    );
  }
}
