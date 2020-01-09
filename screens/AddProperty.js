import * as React from "react";
import { StyleSheet, View, Text, Button } from "react-native";

const AddProperty = props => {
  return (
    <View style={styles.container}>
      <Text>Add Property Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1
  }
});

AddProperty.navigationOptions = {
  title: "Add Property",
  navigationOptions: {
    tabBarLabel: "Adding Properties"
  }
};

export default AddProperty;
