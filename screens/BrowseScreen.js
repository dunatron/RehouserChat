import React from "react";
import { StyleSheet } from "react-native";
import { View } from "native-base";
import HeaderBar from "../components/HeaderBar";
import PropertySearch from "../components/Algolia/PropertySearch";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1
  }
});

const BrowseScreen = props => {
  return (
    <View style={styles.container}>
      <HeaderBar {...props} />
      <PropertySearch />
    </View>
  );
};

BrowseScreen.navigationOptions = {
  title: "Browse",
  navigationOptions: {
    tabBarLabel: "Browse!"
  }
};

export default BrowseScreen;
