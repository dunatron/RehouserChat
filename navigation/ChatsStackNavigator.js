import { createStackNavigator } from "react-navigation-stack";

// screens
import ChatsScreen from "../screens/ChatsScreen";
import SingleChatScreen from "../screens/SingleChatScreen";

const ChatsStackNavigator = createStackNavigator({
  Chats: {
    path: "chats",
    screen: ChatsScreen
  },
  Chat: {
    path: "/chat/:id",
    screen: SingleChatScreen
  },
  Test: {
    path: "test",
    screen: SingleChatScreen
  }
});

export default ChatsStackNavigator;
