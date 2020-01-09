import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import {
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
  BottomTabBar,
  MaterialTopTabBar
} from "react-navigation-tabs";

import HomeScreen from "../screens/HomeScreen";
import AuthLoadingScreen from "../screens/AuthLoadingScreen";
import RegisterScreen from "../screens/RegisterScreen";
import LoginScreen from "../screens/LoginScreen";
import ProfileScreen from "../screens/ProfileScreen";
import AddPropertyScreen from "../screens/AddProperty";
import AddPropertyStackNavigator from "./AddPropertyStackNavigator";

// Navigators
import ChatsStackNavigator from "./ChatsStackNavigator";

const AuthenticationNavigatorStack = createStackNavigator({
  Register: {
    screen: RegisterScreen,
    navigationOptions: { headerTitle: "Register" }
  },
  Login: { screen: LoginScreen, navigationOptions: { headerTitle: "Login" } }
});

// TABS WITH DRAW EXPERIMENT
const SimpleTabs = createBottomTabNavigator(
  {
    // Chat: {
    //   path: "chat",
    //   screen: MyChatScreen
    // },
    Home: {
      path: "",
      screen: HomeScreen
    },
    Profile: {
      path: "profile",
      screen: ProfileScreen
    },
    Chats: {
      path: "chat",
      screen: ChatsStackNavigator
    }
    // People: {
    //   path: "cart",
    //   screen: MyPeopleScreen
    // },
    // Settings: {
    //   path: "settings",
    //   screen: MySettingsScreen
    // }
  },
  {
    order: ["Home", "Profile", "Chats"],
    backBehavior: "history",
    tabBarOptions: {
      activeTintColor: "#e91e63"
    }
  }
);

const TabsInDrawer = createDrawerNavigator({
  SimpleTabs: {
    navigationOptions: {
      drawerIcon: ({ tintColor }) => (
        <MaterialIcons name="filter-1" size={24} style={{ color: tintColor }} />
      ),
      drawerLabel: "Simple tabs"
    },
    screen: SimpleTabs
  },
  Home: {
    screen: HomeScreen
  },
  Profile: {
    path: "profile",
    screen: ProfileScreen
  },
  Add_Property: {
    path: "add-property",
    screen: AddPropertyStackNavigator
  },
  Chats: {
    path: "chat",
    screen: ChatsStackNavigator
  }
  // StacksOverTabs: {
  //   navigationOptions: {
  //     drawerIcon: ({ tintColor }) => (
  //       <MaterialIcons name="filter-2" size={24} style={{ color: tintColor }} />
  //     ),
  //     drawerLabel: "Stacks Over Tabs"
  //   },
  //   screen: StacksOverTabs
  // }
});

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
    App: TabsInDrawer
  },
  { initialRouteName: "AuthLoading" }
);

export default createAppContainer(AppNavigator);
