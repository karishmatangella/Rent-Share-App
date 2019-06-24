import Login from "../screens/Login";
import SignUp from "../screens/SignUp";
import Split from "../screens/Split";
import Logout from "../screens/Logout";
import AuthLoadingScreen from "../screens/LoadingScreen";
import Home from "../screens/Home";
import ResetPassword from "../screens/ResetPassword";
import AddMembers from "../screens/AddMembers";
import SplitToken from "../screens/SplitToken";
import SplitMembers from "../screens/SplitMembers";
import ThankyouScreen from "../screens/ThankyouScreen";

import {
  createStackNavigator,
  createDrawerNavigator,
  createAppContainer,
  createSwitchNavigator
} from "react-navigation";

const LoginStack = createStackNavigator(
  {
    Login,
    SignUp,
    ResetPassword
  },
  {
    initialRouteName: "Login",
    headerMode: "none"
  }
);

const SplitStack = createStackNavigator(
  {
    Split,
    SplitToken,
    SplitMembers,
    ThankyouScreen
  },
  {
    initialRouteName: "Split",
    headerMode: "none"
  }
);

const HomeStack = createStackNavigator(
  {
    Members: Home,
    AddMembers
  },
  {
    initialRouteName: "Members",
    headerMode: "none"
  }
);

const MainDrawerNavigator = createDrawerNavigator(
  {
    Members: HomeStack,
    "Rent Share": SplitStack,
    Logout
  },
  {
    initialRouteName: "Members"
  }
);

const AppNavigator = createAppContainer(
  createSwitchNavigator(
    {
      Auth: AuthLoadingScreen,
      LoginStack: LoginStack,
      MainDrawerNavigator: MainDrawerNavigator
    },
    {
      initialRouteName: "Auth"
    }
  )
);

export default AppNavigator;
