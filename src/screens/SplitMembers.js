import React, { Component } from "react";
import {
  Container,
  CheckBox,
  Header,
  Title,
  Content,
  ListItem,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Text,
  View,
  Footer,
  FooterTab,
  Spinner,
  ImageBackground
} from "native-base";
import { ScrollView } from "react-native";
import { db, auth } from "../config/firebaseConfig";
import Communications from "react-native-communications";
import Toast from "react-native-easy-toast";

export default class SplitMembers extends Component {
  constructor(props) {
    super(props);
    const totalAmount = this.props.navigation.getParam("amount", 0);
    this.state = {
      members: [],
      totalAmount: totalAmount,
      loading: true
    };
  }
  componentDidMount = () => {
    auth.onAuthStateChanged(user => {
      if (user) {
        console.log(user.uid);
        db.collection("AddMembers")
          .where("userId", "==", user.uid)
          .onSnapshot(querySnapshot => {
            let data = querySnapshot.docs;
            data.forEach(obj => {
              let member = obj.data();
              member.checked = false;
              //SetState
              this.setState({
                members: [...this.state.members, member],
                loading: false
              });
            });
          });
      } else {
        console.log("user not logged in to add member");
        this.setState({ loading: false });
      }
    });
  };

  //selectMembers
  checkMember = member => {
    const { members } = this.state;
    let newMembers = members.map(singleMember => {
      if (singleMember != member) {
        return singleMember;
      } else {
        member.checked = !member.checked;
      }
      return member;
    });

    this.setState({
      members: newMembers
    });
  };

  //Split Amoutn Function
  amountSplit = () => {
    const checkedMembers = this.state.members.filter(member => {
      return member.checked === true;
    });
    if (checkedMembers.length !== 0) {
      let totalAmount = this.state.totalAmount;
      totalAmount = Number(totalAmount.replace("$", ""));
      console.log("total", totalAmount);
      let memberLength = checkedMembers.length;
      memberLength = memberLength + 1;
      const amountPerPerson = totalAmount / memberLength;
      console.log("per", amountPerPerson);
      let memberVenmoId = checkedMembers.map(({ venmoId }) => venmoId);
      console.log(memberVenmoId);

      //function for request to venmo
      Communications.web(
        `https://venmo.com/?txn=charge&amount=${amountPerPerson}&note=for+dinner&recipients=${memberVenmoId}`
      );
      this.props.navigation.navigate("Split");
      let data = {
        checkedMembers,
        totalAmount,
        amountPerPerson
      };

      auth.onAuthStateChanged(user => {
        if (user) {
          data.userId = user.uid;
          db.collection("Transactions")
            .add(data)
            .then(response => {})
            .catch(err => {
              console.log("error while adding member");
              this.toast.show(`${err}`);
            });
        } else {
          console.log("user not logged in to add member");
        }
      });
    } else {
      // this.toast.show('Please select members and then try again');
      alert("please select member and try again");
    }
  };
  render() {
    return (
      <Container>
        <Header>
          <View>
            <Toast
              ref={toast => {
                this.toast = toast;
              }}
              style={{ backgroundColor: "red" }}
              position="top"
              positionValue={200}
              fadeInDuration={750}
              fadeOutDuration={10000}
              // opacity={0.8}
              textStyle={{ color: "black" }}
            />
          </View>
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
            <Title>Split Members</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          {this.state.loading == true ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Spinner color="black" />
            </View>
          ) : (
            <ScrollView>
              <Text style={{ color: "teal", textAlign: "center" }}>
                Please select the members, you want to share the amount.
              </Text>
              {this.state.members.length !== 0 ? (
                this.state.members.map((member, i) => {
                  return (
                    <ListItem key={i}>
                      <CheckBox
                        color="teal"
                        checked={member.checked}
                        onPress={() => this.checkMember(member)}
                      />
                      <Body style={{ marginStart: 15 }}>
                        <View style={{ flexDirection: "row" }}>
                          <Text>Name: </Text>
                          <Text style={{ fontSize: 18, color: "green" }}>
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
                    </ListItem>
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
          )}
        </Content>
        <Footer>
          <FooterTab>
            <Button active success onPress={() => this.amountSplit()}>
              <Text>Split</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
