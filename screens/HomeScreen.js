import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import OpenChats from "../components/OpenChats";
import { gql, useQuery } from "@apollo/client";
import { MY_CHATS_QUERY } from "../graphql/queries";
import ChatsList from "../components/ChatsList";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1
  }
});

const HomeScreen = props => {
  // const { data, loading, error } = useQuery(MY_CHATS_QUERY);
  return (
    <View style={styles.container}>
      {/* <OpenChats /> */}
      {/* <ChatsList /> */}
      <Text>
        I am the home screen. I sould probably be the guy who looks for
        properties??
      </Text>
    </View>
  );
};

HomeScreen.navigationOptions = {
  title: "Home"
};

export default HomeScreen;
