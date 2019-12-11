import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";

const SingleChatScreen = props => {
  const [messages, setMessages] = useState([]);
  const sendMessageHandler = sentMessages => {
    setMessages(currentMessages => [...currentMessages, ...sentMessages]);
  };
  return (
    <GiftedChat
      messages={messages}
      onSend={sendMessageHandler}
      user={{
        _id: 1
      }}
    />
  );
};

SingleChatScreen.navigationOptions = props => {
  const idParam = props.navigation.getParam("id");
  return {
    title: `Chat ${idParam}`
  };
};

export default SingleChatScreen;

// const SingleChatScreen = () => (
//   <View style={styles.container}>
//     <Text>I woill hold details and messages for a single chat instance</Text>
//   </View>
// );

// /**
//  * Navigation options
//  */
// SingleChatScreen.navigationOptions = props => {
//   console.log("Single chat navigation props => ", props);
//   const idParam = props.navigation.getParam("id");
//   return {
//     title: `Chat ${idParam}`
//   };
// };

// /**
//  * Styles for screen
//  */
// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "#fff",
//     flex: 1
//   }
// });

// export default SingleChatScreen;
