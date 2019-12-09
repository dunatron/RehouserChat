// import React, { useState } from "react";
// import { AsyncStorage } from "react-native";
// import { Container, Text, Button, Content, View } from "native-base";

// const HomeScreen = props => {
//   const _showMoreApp = () => {
//     props.navigation.navigate("Other");
//   };

//   const _signOutAsync = async () => {
//     await AsyncStorage.clear();
//     props.navigation.navigate("Auth");
//   };
//   return (
//     <View>
//       <Button title="Show me more of the app" onPress={_showMoreApp} />
//       <Button title="Actually, sign me out :)" onPress={_signOutAsync} />
//     </View>
//   );
// };

// HomeScreen.navigationOptions = {
//   title: "Welcome to the App"
// };

// export default HomeScreen;
import * as React from "react";
import { StyleSheet, View, Text } from "react-native";

import NewChat from "../components/NewChat";
import ChatsList from "../components/ChatsList";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1
  }
});

const HomeScreen = () => (
  <View style={styles.container}>
    <NewChat />
    <ChatsList />
  </View>
);

HomeScreen.navigationOptions = {
  title: "Home"
};

export default HomeScreen;
