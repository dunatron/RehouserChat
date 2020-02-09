import React, { Component } from "react";
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Image
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator, DrawerItems } from "react-navigation-drawer";
import { Icon } from "native-base";
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
import BrowseScreen from "../screens/BrowseScreen";

// Navigators
import DashBoardStackNavigator from "./DashBoardStackNavigator";
import ChatsStackNavigator from "./ChatsStackNavigator";

const AuthenticationNavigatorStack = createStackNavigator({
  Register: {
    screen: RegisterScreen,
    navigationOptions: { headerTitle: "Register" }
  },
  Login: { screen: LoginScreen, navigationOptions: { headerTitle: "Login" } }
});

const CustomDrawerNavigation = props => {
  // console.log("CustomDrawNavigation props => ", props);
  console.log("CustomDrawNavigation props.screenProps? => ", props.screenProps);
  const { screenProps } = props;
  const { me, activeRouteName } = screenProps;
  console.log("draw me => ", activeRouteName);
  console.log("draw me => ", me);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <View
        style={{
          height: 40,
          width: 40,
          backgroundColor: "red",
          position: "absolute",
          right: -40
        }}
      ></View> */}
      <View style={{ height: 250, backgroundColor: "#d2d2d2", opacity: 0.9 }}>
        <View
          style={{
            height: 200,
            backgroundColor: "Green",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          {me && (
            <Image
              source={{ uri: me.profilePhoto ? me.profilePhoto.url : null }}
              style={{ height: 150, width: 150, borderRadius: 60 }}
            />
          )}
        </View>
        <View
          style={{
            height: 50,
            backgroundColor: "Green",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Text>{me ? `${me.firstName} ${me.lastName}` : ""}</Text>
        </View>
      </View>
      <ScrollView>
        <DrawerItems {...props} />
      </ScrollView>
      <View style={{ alignItems: "center", bottom: 20 }}>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flexDirection: "column", marginRight: 15 }}>
            <Icon
              name="flask"
              style={{ fontSize: 24 }}
              onPress={() => console.log("Tıkladın")}
            />
          </View>
          <View style={{ flexDirection: "column" }}>
            <Icon
              name="call"
              style={{ fontSize: 24 }}
              onPress={() => console.log("Tıkladın")}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const MainAppNagivationStack = createDrawerNavigator(
  {
    Home: {
      path: "test-home",
      screen: HomeScreen,
      // https://reactnavigation.org/docs/en/drawer-navigator.html
      // https://reactnavigation.org/docs/en/stack-navigator.html#navigationoptions-for-screens-inside-of-the-navigator
      navigationOptions: {
        title: "Home Tit",
        drawerLabel: "Home Label"
      }
    },
    Browse: {
      path: "browse",
      screen: BrowseScreen
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
  },
  {
    //https://reactnavigation.org/docs/en/drawer-navigator.html
    drawerPosition: "left",
    hideStatusBar: true,
    drawerType: "slide", // slide, front, back
    contentComponent: CustomDrawerNavigation,
    drawerOpenRoute: "DrawerOpen",
    drawerCloseRoute: "DrawerClose",
    drawerToggleRoute: "DrawerToggle",
    navigationOptions: {
      tabBarLabel: "Home Page",
      title: "Home",
      drawerLabel: "drawerLabel",
      headerTitle: "headerTitle"
    }
    // drawerWidth: (300 / 3) * 2
  }
);

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
    App: MainAppNagivationStack
  },
  { initialRouteName: "AuthLoading" }
);

export default createAppContainer(AppNavigator);
