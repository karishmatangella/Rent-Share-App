import React, { Component } from "react";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Text,
  Footer,
  FooterTab,
  Badge,
  View
} from "native-base";
import { Image, TouchableOpacity } from "react-native";
import ImagePicker from "react-native-image-picker";
import axios from "axios";
import Spinner from "react-native-loading-spinner-overlay";

export default class Split extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: false
    };
  }

  imagePicker = () => {
    const options = {
      title: "Select Image",
      storageOptions: {
        skipBackup: false,
        path: "images"
      }
    };
    ImagePicker.showImagePicker(options, response => {
      console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        const source = { uri: response.uri };
        console.log("Image uri = " + response.uri);
        console.log("Image path = " + response.uri);
        this.sendToServer(response.uri);

        // this.props.navigation.navigate("SplitToken", { amount: 4 });
      }
    });
  };

  sendToServer = uri => {
    this.setState({ loader: true });
    let data = new FormData();
    data.append("filedata", {
      uri: uri,
      type: "image/jpeg",
      name: `img_${new Date().getTime()}.jpg`
    });

    axios
      .post(
        `https://flasktestingfinalwithgunicorn.herokuapp.com/get-receipt`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      )
      .then(res => {
        console.log("The Response", res.data);
        this.setState({ loader: false });
        let total = res.data;
        if (total == 0) {
          alert("Total not found, Please try again");
        } else {
          this.props.navigation.navigate("SplitToken", { amount: total });
        }
      })
      .catch(err => {
        this.setState({ loader: false });
        console.log("ERROR", err);
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
                this.props.navigation.openDrawer();
              }}
            >
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Grab Reciept</Title>
          </Body>
          <Right />
        </Header>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#fff"
          }}
        >
          <Text style={{ fontSize: 22, textAlign: "center" }}>
            Select an image from your image library to get started.
          </Text>
          <TouchableOpacity
            onPress={() => {
              this.imagePicker();
            }}
          >
            <Image
              style={{ width: 200, height: 200, marginTop: 30 }}
              source={require("../images/camera.png")}
            />
          </TouchableOpacity>
        </View>
        <Footer>
          <FooterTab>
            <Button
              vertical
              onPress={() => {
                this.props.navigation.navigate("Members");
              }}
            >
              <Icon type="FontAwesome5" name="users" />
              <Text>Members</Text>
            </Button>
            <Button active vertical>
              <Icon type="MaterialIcons" name="call-split" />
              <Text>RentShare</Text>
            </Button>
          </FooterTab>
        </Footer>
        <Spinner
          visible={this.state.loader}
          textContent={"Loading..."}
          textStyle={{ color: "#FFF" }}
        />
      </Container>
    );
  }
}
