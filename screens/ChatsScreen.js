import * as React from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import { useCookies } from "react-cookie";

import NewChat from "../components/NewChat";
import ChatsList from "../components/ChatsList";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1
  }
});

const ChatsScreen = props => {
  const [cookies, setCookie] = useCookies(["token"]);
  return (
    <View style={styles.container}>
      <Button
        title="Test single chat"
        onPress={() => {
          props.navigation.navigate("Chat", {
            id: 86,
            otherParam: "anything you want here"
          });
          //   console.log("Why do u no navigate");
          //   props.navigation.navigate("Chat");
        }}
      />
      <NewChat />
      <ChatsList navigation={props.navigation} />
    </View>
  );
};

ChatsScreen.navigationOptions = {
  title: "Chats",
  navigationOptions: {
    tabBarLabel: "Chats!"
  }
};

export default ChatsScreen;
