import * as React from "react";
import { StyleSheet, View, Text } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1
  }
});

const HomeScreen = () => (
  <View style={styles.container}>
    <Text>
      I am the home screen. I sould probably be the guy who looks for
      properties??
    </Text>
  </View>
);

HomeScreen.navigationOptions = {
  title: "Home"
};

export default HomeScreen;
