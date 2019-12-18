import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo
} from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Animated,
  PanResponder
} from "react-native";

const { height: screenHeight, width: screenWidth } = Dimensions.get("window");

const CLOSE_CIRCLE_RADIUS = 36;
const CLOSE_BORDER_WIDTH = 6;
const BUBBLE_RADIUS = 36;
const TOP_BOT_OFFSET = 100;

const isDroppingDropzoneStyles = {
  backgroundColor: "transparent",
  borderWidth: CLOSE_BORDER_WIDTH,
  borderColor: "#d6d7da",
  borderRadius: CLOSE_CIRCLE_RADIUS + CLOSE_BORDER_WIDTH * 2,
  height: CLOSE_CIRCLE_RADIUS * 2 + CLOSE_BORDER_WIDTH * 2,
  width: CLOSE_CIRCLE_RADIUS * 2 + CLOSE_BORDER_WIDTH * 2
};

const defaultDropzoneStyles = {
  backgroundColor: "#2c3e50"
  // backgroundColor: "transparent"
  // backgroundColor: "transparent"
};

/**
 * PanResponder & native event descriptions
 * NATIVE_EVENT
 * - changedTouches - Array of all touch events that have changed since the last event
 * - identifier - The ID of the touch
 * - locationX - The X position of the touch, relative to the element
 * - locationY - The Y position of the touch, relative to the element
 * - pageX - The X position of the touch, relative to the root element
 * - pageY - The Y position of the touch, relative to the root element
 * - target - The node id of the element receiving the touch event
 * - timestamp - A time identifier for the touch, useful for velocity calculation
 * - touches - Array of all current touches on the screen
 *
 * GESTURE_STATE
 * - stateID - ID of the gestureState- persisted as long as there at least one touch on screen
 * - moveX - the latest screen coordinates of the recently-moved touch
 * - moveY - the latest screen coordinates of the recently-moved touch
 * - x0 - the screen coordinates of the responder grant
 * - y0 - the screen coordinates of the responder grant
 * - dx - accumulated distance of the gesture since the touch started
 * - dy - accumulated distance of the gesture since the touch started
 * - vx - current velocity of the gesture
 * - vy - current velocity of the gesture
 * - numberActiveTouches - Number of touches currently on screen
 */

const initialCoordinates = {
  x: screenWidth / 2 - BUBBLE_RADIUS,
  y: screenHeight / 2 - BUBBLE_RADIUS
};
export default function Drag() {
  const dropZoneValues = useRef(null);
  const animateVal = useRef(new Animated.ValueXY(initialCoordinates));
  let isSnapped = false;
  let _value = initialCoordinates;
  const updateLastAnimateVal = useCallback(val => {
    _value = val;
  }, []);

  const [dropStyles, setDropStyles] = useState(defaultDropzoneStyles);

  // if dragging element is touching the dropzone
  const isDropZone = useCallback(gesture => {
    const dz = dropZoneValues.current;
    const intersectingX = isIntersecting(gesture.moveX, dz.x, BUBBLE_RADIUS);
    const intersectingY = isIntersecting(gesture.moveY, dz.y, BUBBLE_RADIUS);
    return intersectingX && intersectingY;
  }, []);

  const isIntersecting = (moveCoord, coord, radius) => {
    const TOLERANCE = 10;
    if (
      moveCoord + TOLERANCE > coord &&
      moveCoord < coord + radius * 2 + TOLERANCE
    )
      return true;
    return false;
  };

  const onMove = useCallback((_, gesture) => {
    if (isDropZone(gesture)) {
      snapBubbleToClose();
    } else {
      setDropStyles(defaultDropzoneStyles);
      isSnapped = false;
    }
  }, []);

  /**
   * ToDo: handle this with an animation instead of hard setting it
   */
  const snapBubbleToClose = () => {
    const dz = dropZoneValues.current;
    setDropStyles(isDroppingDropzoneStyles);
    if (!isSnapped) {
      animateVal.current.setOffset({
        x: dz.x + CLOSE_BORDER_WIDTH,
        y: dz.y
      });
      animateVal.current.setValue({ x: 0, y: 0 });
      isSnapped = true;
    }
  };

  const unsnapBubbleFromClose = gesture => {
    isSnapped = false;
    animateVal.current.setOffset({
      x: gesture.x0 - BUBBLE_RADIUS,
      y: gesture.y0 - BUBBLE_RADIUS
    });
    animateVal.current.setValue({ x: 0, y: 0 });
  };

  const setDropZoneValues = useCallback(event => {
    dropZoneValues.current = event.nativeEvent.layout;
  });

  const animatedMover = Animated.event(
    [
      null,
      {
        dx: animateVal.current.x,
        dy: animateVal.current.y
      }
    ],
    {
      listener: onMove
    }
  );

  const isBelowHalf = gesture => {
    if (gesture.moveY > screenHeight / 2) return true;
    return false;
  };

  const isCloseToTop = gesture => {
    if (TOP_BOT_OFFSET > gesture.moveY) return true;
    return false;
  };

  /**
   * This is wrong
   */
  const isCloseToBottom = gesture => {
    if (gesture.moveY > screenHeight - TOP_BOT_OFFSET) return true;
    return false;
  };

  const calculateYOnRelease = gesture => {
    if (isCloseToTop(gesture)) {
      return TOP_BOT_OFFSET;
    }
    if (isCloseToBottom(gesture)) {
      return -TOP_BOT_OFFSET;
    }
    return 0;
  };

  const isOnLeft = () => {};

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (e, gesture) => {
          if (!isDropZone(gesture) && isSnapped) {
            unsnapBubbleFromClose(gesture);
          }
          if (isSnapped) return;
          return animatedMover(e, gesture);
        },
        onPanResponderGrant: (e, gestureState) => {
          animateVal.current.setOffset({
            x: _value.x,
            y: _value.y
          });
          animateVal.current.setValue({ x: 0, y: 0 });
        },
        onPanResponderRelease: (e, gesture) => {
          if (!isDropZone(gesture)) {
            if (e.nativeEvent.pageX < screenWidth / 2) {
              animateVal.current.setOffset({
                x: gesture.moveX,
                y: gesture.moveY
              });
              animateVal.current.setValue({ x: 0, y: 0 });
              Animated.spring(animateVal.current, {
                toValue: {
                  // x: screenWidth - gesture.moveX - BUBBLE_RADIUS * 2,
                  x: -gesture.moveX,
                  y: calculateYOnRelease(gesture)
                }
              }).start();
            } else {
              animateVal.current.setOffset({
                x: gesture.moveX,
                y: gesture.moveY
              });
              animateVal.current.setValue({ x: 0, y: 0 });
              Animated.spring(animateVal.current, {
                toValue: {
                  x: screenWidth - gesture.moveX - BUBBLE_RADIUS * 2,
                  y: calculateYOnRelease(gesture)
                }
              }).start();
            }
          }
        }
      }),
    []
  );

  useEffect(() => {
    // add a listner for when panResponder changes val
    animateVal.current.addListener(val => {
      // update our panresponder values so we can use them to re-calc
      updateLastAnimateVal(val);
    });
  }, [animateVal.current]);

  const bubbleAnimatedStyles = [styles.bubble, animateVal.current.getLayout()];
  // const bubbleAnimatedStyles = [animateVal.current.getLayout(), styles.bubble];
  const dropZoneStyles = [styles.dropZone, dropStyles];
  return (
    <View style={styles.mainContainer} pointerEvents="box-none">
      <View onLayout={setDropZoneValues} style={dropZoneStyles}>
        <Text style={styles.text}>X</Text>
      </View>
      <Animated.View {...panResponder.panHandlers} style={bubbleAnimatedStyles}>
        <Text style={styles.text}>Drag me!</Text>
      </Animated.View>
    </View>
  );
}

let styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    position: "absolute",
    display: "flex",
    flexDirection: "column-reverse",
    left: 0,
    top: 0,
    opacity: 1,
    zIndex: 100,
    backgroundColor: "transparent",
    width: screenWidth,
    height: screenHeight,
    borderColor: "#d6d7da"
  },
  dropZone: {
    // height: 100,
    borderWidth: CLOSE_BORDER_WIDTH,
    height: CLOSE_CIRCLE_RADIUS * 2 + CLOSE_BORDER_WIDTH,
    width: CLOSE_CIRCLE_RADIUS * 2 + CLOSE_BORDER_WIDTH,
    borderRadius: CLOSE_CIRCLE_RADIUS + CLOSE_BORDER_WIDTH / 2,
    bottom: 100,
    // backgroundColor: "#2c3e50",
    position: "absolute",
    // zIndex: 120,
    left: screenWidth / 2 - CLOSE_CIRCLE_RADIUS
    // width: screenWidth
    // left: screenWidth / 2 - CLOSE_CIRCLE_RADIUS - CLOSE_BORDER_WIDTH * 2
  },
  text: {
    marginTop: 25,
    marginLeft: 5,
    marginRight: 5,
    textAlign: "center",
    color: "#fff"
  },
  bubble: {
    backgroundColor: "#1abc9c",
    width: BUBBLE_RADIUS * 2,
    height: BUBBLE_RADIUS * 2,
    borderRadius: BUBBLE_RADIUS,
    zIndex: 90000,
    position: "absolute"
  }
});
