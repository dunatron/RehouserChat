import React from "react";
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
  Text
} from "react-native";
import { getAuthToken } from "../utils/userAuth";
import { useCookies } from "react-cookie";
import { useCurrentUser } from "../components/User";

/**
 * This screen is to fetch a userToken from localStorage. If one is found we navigate to the appScreen
 * 1. if token found and expired. go to login.
 * 2. if token found and not expired go to main app
 * 3. if no token go to register screen
 */

const isLoggedIn = data => {
  if (!data) return false;
  if (!data.me) return false;
  if (data.me.id) return true;
  return false;
};

const AuthLoadingScreen = props => {
  const [cookies, setCookie] = useCookies(["token"]);
  const { data, error, loading } = useCurrentUser();

  const _bootstrapAsync = async () => {
    const userToken = await getAuthToken();

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    // const isLoggedIn = true;
    props.navigation.navigate(userToken ? "App" : "Auth");
    // props.navigation.navigate(isLoggedIn(data) ? "App" : "Auth");
    // props.navigation.navigate(userToken ? "App" : "Auth");
    // props.navigation.navigate(isLoggedIn ? "App" : "Auth");
    // if (!loading && !error) {
    //   // const isLoggedIn = true;
    //   // // props.navigation.navigate(userToken ? "App" : "Auth");
    //   // props.navigation.navigate(isLoggedIn ? "App" : "Auth");
    //   props.navigation.navigate(isLoggedIn(data) ? "App" : "Auth");
    // }
  };
  _bootstrapAsync();
  // Render any loading content that you like here
  return (
    <View>
      <ActivityIndicator />
      <StatusBar barStyle="default" />
      {/* {_bootstrapAsync()} */}
      <Text>Checking credentials</Text>
    </View>
  );
};

export default AuthLoadingScreen;
