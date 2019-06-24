import React, { Component } from "react";
import { Container, View, Text } from "native-base";
import { Image } from "react-native";

export default class ThankyouScreen extends Component {
  componentDidMount = () => {
    setTimeout(() => {
      this.props.navigation.navigate("Members");
    }, 10000);
  };

  render() {
    return (
      <Container>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Image
            style={{ width: "100%", height: 300, marginBottom: 30 }}
            source={require("../images/thankyou.png")}
          />
          <Text>Your transaction completed successfully!</Text>
        </View>
      </Container>
    );
  }
}
