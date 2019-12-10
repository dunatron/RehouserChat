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

/**
 * This screen is to fetch a userToken from localStorage. If one is found we navigate to the appScreen
 * 1. if token found and expired. go to login.
 * 2. if token found and not expired go to main app
 * 3. if no token go to register screen
 */
// class AuthLoadingScreen extends React.Component {
//   componentDidMount() {
//     this._bootstrapAsync();
//   }

//   // Fetch the token from storage then navigate to our appropriate place
//   _bootstrapAsync = async () => {
//     const userToken = await AsyncStorage.getItem("userToken");

//     // This will switch to the App screen or Auth screen and this loading
//     // screen will be unmounted and thrown away.
//     this.props.navigation.navigate(userToken ? "App" : "Auth");
//   };

//   // Render any loading content that you like here
//   render() {
//     return (
//       <View>
//         <ActivityIndicator />
//         <StatusBar barStyle="default" />
//       </View>
//     );
//   }
// }

// export default AuthLoadingScreen;

const AuthLoadingScreen = props => {
  // Fetch the token from storage then navigate to our appropriate place
  const _bootstrapAsync = async () => {
    const userToken = await getAuthToken();

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    props.navigation.navigate(userToken ? "App" : "Auth");
  };
  _bootstrapAsync();
  // Render any loading content that you like here
  return (
    <View>
      <ActivityIndicator />
      <StatusBar barStyle="default" />
      {/* {_bootstrapAsync()} */}
      <Text>Auth loader</Text>
    </View>
  );
};

export default AuthLoadingScreen;
