import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";

import HomeScreen from "../screens/HomeScreen";
import AuthLoadingScreen from "../screens/AuthLoadingScreen";
import RegisterScreen from "../screens/RegisterScreen";
import LoginScreen from "../screens/LoginScreen";
import ProfileScreen from "../screens/ProfileScreen";

const AuthenticationNavigatorStack = createStackNavigator({
  Register: {
    screen: RegisterScreen,
    navigationOptions: { headerTitle: "Register" }
  },
  Login: { screen: LoginScreen, navigationOptions: { headerTitle: "Login" } }
});

// const AppNavigatorStack = createStackNavigator({
//   Home: HomeScreen
// });

const AppNavigatorStack = createDrawerNavigator({
  Home: {
    screen: HomeScreen
  },
  Profile: {
    screen: ProfileScreen
  }
});

// const AppNavigator = createStackNavigator({
//   Home: HomeScreen
// });

const AppNavigator = createSwitchNavigator(
  {
    /*
     * Rather than being rendered by a screen component, the
     * AuthenticationNavigator is a screen component
     */
    AuthLoading: AuthLoadingScreen,
    Auth: AuthenticationNavigatorStack,
    App: AppNavigatorStack
  },
  { initialRouteName: "AuthLoading" }
);

export default createAppContainer(AppNavigator);
