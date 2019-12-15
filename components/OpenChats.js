import React, { useState } from "react";
import _ from "lodash";
import {
  presets,
  spring,
  StaggeredMotion,
  TransitionMotion
} from "react-motion";
import { useQuery } from "@apollo/react-hooks";
import { GET_OPEN_CHATS } from "../apollo/local-state";

import {
  Dimensions,
  PanResponder,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Button,
  Text
} from "react-native";
import NavigationService from "../services/navigationService";

const { height: screenHeight, width: screenWidth } = Dimensions.get("window");
const colors = [
  "#F44336",
  "#9C27B0",
  "#2196F3",
  "#009688",
  "#FF9800",
  "#607D8B"
];
const startY = 100;
const startOpacity = 0;
/**
 * https://blog.reactnativecoach.com/creating-facebook-chat-head-bubbles-in-react-native-bdbbe338bb99
 */
const OpenChats = props => {
  const { data, error, loading } = useQuery(GET_OPEN_CHATS);
  const [x, setX] = useState(100);
  const [y, setY] = useState(100);
  const panResponder = PanResponder.create({
    // onMoveShouldSetPanResponder: () => canMoveBubbles,
    onMoveShouldSetPanResponder: () => true, // dont need to toggle now due pointerEvents="box-none"
    onPanResponderMove: event => {
      setX(event.nativeEvent.pageX);
      setY(event.nativeEvent.pageY);
    }
  });
  if (loading) return null;
  if (error) return null;
  const { openChats } = data;

  console.log("All I care about are these => ", openChats);
  const willLeave = () => {
    // triggered when c's gone. Keeping c until its width/height reach 0.
    return { width: spring(0), height: spring(0) };
  };

  const openChatStyles = openChats.map((c, i) => ({
    key: c.id,
    style: {
      height: 100,
      width: 100
    },
    data: {
      chat: c
    }
  }));

  const openChatBubble = config => {
    // props.navigation.navigate("Chat", {
    //   id: 86,
    //   otherParam: "anything you want here"
    // });
    console.log("openChatBubble Bubble config => ", config);
    NavigationService.navigate("Chat", {
      chat: config.data.chat
    });
  };
  return (
    <View
      pointerEvents="box-none"
      {...panResponder.panHandlers}
      style={styles.container}
    >
      <TransitionMotion
        willLeave={willLeave}
        styles={prevStyles => {
          console.log("prevStyles => ", prevStyles);
          return openChatStyles;
        }}
      >
        {interpolatedStyles => (
          // first render: a, b, c. Second: still a, b, c! Only last one's a, b.
          <View>
            {interpolatedStyles.map((config, i) => {
              console.log("Config => ", config);
              return (
                <ChatBubble
                  key={config.key}
                  id={config.key}
                  index={i}
                  x={x}
                  y={y}
                  open={() => {
                    openChatBubble(config);
                  }}
                />
              );
            })}
          </View>
        )}
      </TransitionMotion>
    </View>
  );
};

const ChatBubble = ({ id, index, x, y, open }) => {
  console.log("WTF => ", id);
  return (
    <View
      key={id}
      onPress={() => alert("Cool i got a press")}
      style={{
        width: 70,
        borderRadius: 35,
        height: 70,
        position: "absolute",
        zIndex: 99999,
        left: x + 3 * parseInt(index),
        top: y + 3 * parseInt(index),
        backgroundColor: colors[index]
      }}
    >
      <Button title="Open chat" onPress={() => open()} />
    </View>
  );
};

const styles = StyleSheet.create({
  // Flex to fill, position absolute,
  // Fixed left/top, and the width set to the window width
  container: {
    flex: 1,
    position: "absolute",
    left: 0,
    top: 0,
    opacity: 1,
    zIndex: 99999,
    backgroundColor: "transparent",
    width: screenWidth,
    height: screenHeight
  }
});

export default OpenChats;
