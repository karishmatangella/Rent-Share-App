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
  View,
  Fab,
  Card,
  CardItem,
  Spinner
} from "native-base";
import { ScrollView } from "react-native";
import { db, auth } from "../config/firebaseConfig";
import material from "../../native-base-theme/variables/material";
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true
    };
  }

  componentDidMount = () => {
    auth.onAuthStateChanged(user => {
      if (user) {
        // User logged in already or has just logged in.
        // console.log(user);
        console.log(user.uid);
        // values.userId = user.uid
        db.collection("AddMembers")
          .where("userId", "==", user.uid)
          .onSnapshot(querySnapshot => {
            let data = querySnapshot.docs;
            console.log(data);
            this.setState({ data, loading: false });
          });
      } else {
        console.log("user not logged in to add member");
        this.setState({ loading: false });
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
                this.props.navigation.openDrawer();
              }}
            >
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Members</Title>
          </Body>
          <Right />
        </Header>

        {this.state.loading == true ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Spinner color="black" />
          </View>
        ) : (
          <View style={{ flex: 1 }}>
            <ScrollView>
              {this.state.data.length !== 0 ? (
                this.state.data.map((obj, i) => {
                  let member = obj.data();
                  return (
                    <Card key={i}>
                      <CardItem>
                        <Body>
                          <View style={{ flexDirection: "row" }}>
                            <Text>Name: </Text>
                            <Text style={{ fontSize: 18 }}>
                              {member.memberName}
                            </Text>
                          </View>
                          <View style={{ flexDirection: "row" }}>
                            <Text>Venmo ID: </Text>
                            <Text style={{ fontSize: 18, color: "green" }}>
                              {member.venmoId}
                            </Text>
                          </View>
                        </Body>
                      </CardItem>
                    </Card>
                  );
                })
              ) : (
                <View>
                  <Text
                    style={{
                      color: "red",
                      textAlign: "center",
                      fontSize: 24,
                      marginTop: 30
                    }}
                  >
                    NO MEMBERS FOUND
                  </Text>
                </View>
              )}
            </ScrollView>
            <Fab
              style={{ backgroundColor: material.brandSuccess }}
              position="bottomRight"
              onPress={() => this.props.navigation.navigate("AddMembers")}
            >
              <Icon name="add" />
            </Fab>
          </View>
        )}
        <Footer>
          <FooterTab>
            <Button active vertical>
              <Icon type="FontAwesome5" name="users" />
              <Text>Members</Text>
            </Button>
            <Button
              vertical
              onPress={() => {
                this.props.navigation.navigate("Split");
              }}
            >
              <Icon type="MaterialIcons" name="call-split" />
              <Text>RentShare</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
