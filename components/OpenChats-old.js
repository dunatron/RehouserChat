import React, { useState } from "react";
import _ from "lodash";
import { presets, spring, StaggeredMotion } from "react-motion";
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
  // const [bubbles, setBubbles] = useState([
  //   {
  //     x: 0,
  //     y: 0
  //   }
  // ]);
  const [bubbles, setBubbles] = useState(
    _.range(2).map(() => ({ x: 0, y: 0 }))
  );
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
  console.log("The bubbles => ", bubbles);
  return (
    <View
      pointerEvents="box-none"
      {...panResponder.panHandlers}
      style={styles.container}
    >
      <Button title="ADD BUBBLE" onPress={() => {}}>
        <Text>PUSH ME</Text>
      </Button>
      <StaggeredMotion
        // styles={prevStyles => {
        //   console.log("Prev styles bubblw => ", prevStyles);
        //   return [{ x: 0, y: 0 }];
        // }}
        // defaultStyles={_.range(6).map(() => ({ x: 0, y: 0 }))}
        defaultStyles={bubbles}
        styles={prevStyles =>
          prevStyles.map((a, i) => {
            return i === 0
              ? { x: 0, y: y }
              : {
                  x: spring(prevStyles[i - 1].x, presets.gentle),
                  y: spring(prevStyles[i - 1].y, presets.gentle)
                };
          })
        }
        // defaultStyles={bubbles}
        // styles={prevStyles =>
        //   prevStyles.map((a, i) => {
        //     return i === 0
        //       ? { x: x, y: y }
        //       : {
        //           x: spring(prevStyles[i - 1].x, presets.gentle),
        //           y: spring(prevStyles[i - 1].y, presets.gentle)
        //         };
        //   })
        // }
      >
        {styles => (
          <TouchableWithoutFeedback
            onPress={() => {
              //   alert("Pressed!");
            }}
            onPressIn={() => {
              //   alert("onPressIn");
              //   setCanMoveBubbles(true);
            }}
            onPressOut={() => {
              //   alert("onPressOut");
            }}
            onLongPress={() => {
              alert("A long press");
            }}
          >
            <View>
              {styles
                .slice()
                .reverse()
                .map(({ x, y }, i) => {
                  const index = styles.length - i - 1;
                  return (
                    <ChatBubble
                      key={index}
                      index={index}
                      x={x}
                      y={y}
                      add={() =>
                        setBubbles(_.range(6).map(() => ({ x: 0, y: 0 })))
                      }
                    />
                  );
                })}
            </View>
          </TouchableWithoutFeedback>
        )}
      </StaggeredMotion>
    </View>
  );
};

const ChatBubble = ({ index, x, y, add }) => {
  return (
    <View
      key={index}
      onPress={() => alert("Cool i got a press")}
      style={{
        width: 70,
        borderRadius: 35,
        height: 70,
        position: "absolute",
        zIndex: 99999,
        left: x + 3 * index,
        top: y + 3 * index,
        // backgroundColor: colors[index]
        backgroundColor: "red"
      }}
    >
      <Button title="Press me" onPress={() => add()} />
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
