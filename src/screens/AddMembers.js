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
  Header,
  Left,
  Body,
  Right,
  Icon,
  Title
} from "native-base";
import { View, Image, TouchableOpacity } from "react-native";
import Toast, { DURATION } from "react-native-easy-toast";
import { db, auth } from "../config/firebaseConfig";

export default class AddMembers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      memberName: "",
      venmoId: ""
    };
  }

  // VenmoFunction
  handleVenmo = venmoId => {
    this.setState({ venmoId });
  };

  //addMembers in database
  handleMember = () => {
    let newMember = {
      memberName: this.state.memberName,
      venmoId: this.state.venmoId,
      userId: ""
    };
    auth.onAuthStateChanged(user => {
      if (user) {
        // check if member has already added
        newMember.userId = user.uid;
        db.collection("AddMembers")
          .where("venmoId", "==", newMember.venmoId)
          .get()
          .then(members => {
            let data = members.docs;
            console.log(newMember.venmoId.length);
            console.log(data);
            if (!data.length) {
              //check if venmo id is wrong
              if (newMember.venmoId.length === 11) {
                db.collection("AddMembers")
                  .add(newMember)
                  .then(response => {
                    this.toast.show("Succesfuly Added");
                    this.props.navigation.goBack();
                  })
                  .catch(err => {
                    console.log("error while adding member");
                    this.toast.show(`${err}`);
                  });
              } else {
                this.toast.show("Enter a valid VenmoId");
              }
            } else {
              console.log("member already");
              this.toast.show("This memeber is already added");
              return false;
            }
          })
          .catch(err => {
            console.log(err + "err");
          });
      } else {
        console.log("user not logged in to add member");
      }
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
            <Title>Add Member</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <Toast
            ref={toast => {
              this.toast = toast;
            }}
            style={{ backgroundColor: "red" }}
            position="top"
            positionValue={200}
            fadeInDuration={750}
            fadeOutDuration={10000}
            opacity={0.7}
            textStyle={{ color: "white" }}
          />
          <View>
            <Image
              style={{ width: "100%", height: 400 }}
              source={require("../images/logos.png")}
            />
          </View>
          <Form>
            <Item>
              <Icon type="MaterialIcons" name="person" />
              <Input
                ref={el => {
                  this.memberName = el;
                }}
                onChangeText={memberName => this.setState({ memberName })}
                value={this.state.memberName}
                placeholder="Member Name"
              />
            </Item>
            <Item>
              <Icon type="MaterialCommunityIcons" name="venmo" />
              <Input
                ref={el => {
                  this.venmoId = el;
                }}
                onChangeText={venmoId => this.handleVenmo(venmoId)}
                value={this.state.venmoId}
                keyboardType="phone-pad"
                placeholder="Mobile Number"
              />
            </Item>

            <Button
              primary
              full
              onPress={() => this.handleMember()}
              style={{ marginTop: 30, marginBottom: 20 }}
            >
              <Text>Add Member</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}
