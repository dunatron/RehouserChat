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
