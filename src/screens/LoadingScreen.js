import React from "react";
import { db, auth } from "../config/firebaseConfig";
import {
  ActivityIndicator,
  StatusBar,
  ImageBackground,
  View
} from "react-native";
import { Spinner } from "native-base";

export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    // this._bootstrapAsync();
  }
  componentDidMount = () => {
    auth.onAuthStateChanged(user => {
      this.props.navigation.navigate(
        user ? "MainDrawerNavigator" : "LoginStack"
      );
      // this.props.navigation.dispatch(
      //   StackActions.reset({
      //     index: 0,
      //     actions: [NavigationActions.navigate({ routeName: 'Drawer' })],
      //   })
      // );
    });
  };
  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    // this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <ImageBackground
        source={require("../images/loading.png")}
        style={{ width: null, height: null, flex: 1 }}
      >
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          {/* <ActivityIndicator />
          <StatusBar /> */}
          <Spinner color="#FF3366" size={215} />
        </View>
      </ImageBackground>
    );
  }
}
