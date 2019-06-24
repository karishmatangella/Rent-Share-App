import React, { Component } from "react";
import { Footer, FooterTab, Button, Icon, Text, Badge } from "native-base";

export default class FooterComponent extends Component {
  render() {
    return (
      <Footer>
        <FooterTab>
          <Button vertical>
            <Icon name="home" />
            <Text>Home</Text>
          </Button>
          <Button vertical>
            <Icon type="MaterialIcons" name="call-split" />
            <Text>Split</Text>
          </Button>
          <Button badge vertical>
            <Badge>
              <Text>2</Text>
            </Badge>
            <Icon type="AntDesign" name="bars" />
            <Text>Requests</Text>
          </Button>
          <Button vertical>
            <Icon name="person" />
            <Text>Settings</Text>
          </Button>
        </FooterTab>
      </Footer>
    );
  }
}
