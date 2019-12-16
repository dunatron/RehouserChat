// import React from "react";
// import {
//   StyleSheet,
//   View,
//   Text,
//   Dimensions,
//   Animated,
//   PanResponder
// } from "react-native";

// const { height: screenHeight, width: screenWidth } = Dimensions.get("window");
// const CIRCLE_RADIUS = 36;
// const BORDER_RADIAN = 5;
// const Window = Dimensions.get("window");

// export default function Drag() {
//   const dropZoneValues = React.useRef(null);
//   const pan = React.useRef(new Animated.ValueXY());
//   // const [bgColor, setBgColor] = React.useState("#2c3e50");
//   const [dropStyles, setDropStyles] = React.useState({
//     backgroundColor: "#2c3e50"
//   });

//   const isDropZone = React.useCallback(gesture => {
//     const dz = dropZoneValues.current;
//     return gesture.moveY > dz.y && gesture.moveY < dz.y + dz.height;
//   }, []);

//   const onMove = React.useCallback(
//     (_, gesture) => {
//       // if (isDropZone(gesture)) setBgColor("red");
//       // else setBgColor("#2c3e50");
//       // if (isDropZone(gesture)) setBgColor("transparent");
//       // else setBgColor("#2c3e50");
//       if (isDropZone(gesture)) {
//         setDropStyles({
//           backgroundColor: "transparent",
//           // borderRadius: 4,
//           borderWidth: 6,
//           borderColor: "#d6d7da",
//           borderRadius: CIRCLE_RADIUS + BORDER_RADIAN,
//           height: CIRCLE_RADIUS * 2 + BORDER_RADIAN * 4,
//           width: CIRCLE_RADIUS * 2 + BORDER_RADIAN * 4,
//           left: screenWidth / 2 - CIRCLE_RADIUS - BORDER_RADIAN * 2
//         });
//       } else {
//         setDropStyles({
//           backgroundColor: "#2c3e50"
//         });
//       }
//       // need to rebind starting position...
//       // pan.setOffset(pan._getValue());
//       console.log("The pan => ", pan);
//     },
//     [isDropZone]
//   );

//   const setDropZoneValues = React.useCallback(event => {
//     dropZoneValues.current = event.nativeEvent.layout;
//   });

//   const panResponder = React.useMemo(
//     () =>
//       PanResponder.create({
//         onStartShouldSetPanResponder: () => true,

//         onPanResponderMove: Animated.event(
//           [
//             null,
//             {
//               dx: pan.current.x,
//               dy: pan.current.y
//             }
//           ],
//           {
//             listener: onMove
//           }
//         ),
//         onPanResponderGrant: (e, gestureState) => {
//           // this.animatedValue.setOffset({
//           //   x: this._value.x,
//           //   y: this._value.y
//           // });
//           // this.animatedValue.setValue({ x: 0, y: 0 });
//         },
//         onPanResponderRelease: (e, gesture) => {
//           if (!isDropZone(gesture)) {
//             // Animated.spring(pan.current, {
//             //   toValue: { x: 0, y: 0 }
//             // }).start();
//             Animated.spring(pan.current, {
//               toValue: { x: screenWidth / 2 - CIRCLE_RADIUS, y: 0 }
//             }).start();
//             console.log("Released now tell me the pan => ", pan);
//             // Animated.spring(pan.current, {
//             //   toValue: { x: 0, y: 0 }
//             // }).start();
//           }
//         }
//       }),
//     []
//   );

//   return (
//     <View style={styles.mainContainer}>
//       <View style={styles.draggableContainer}>
//         <Animated.View
//           {...panResponder.panHandlers}
//           style={[pan.current.getLayout(), styles.circle]}
//         >
//           <Text style={styles.text}>Drag me!</Text>
//         </Animated.View>
//       </View>
//       <View onLayout={setDropZoneValues} style={[styles.dropZone, dropStyles]}>
//         <Text style={styles.text}>X</Text>
//       </View>
//     </View>
//   );
// }

// let styles = StyleSheet.create({
//   mainContainer: {
//     // flex: 1,
//     position: "absolute",
//     left: 0,
//     top: 0,
//     opacity: 1,
//     zIndex: 100,
//     backgroundColor: "transparent",
//     width: screenWidth,
//     height: screenHeight
//   },
//   dropZone: {
//     // height: 100,
//     height: CIRCLE_RADIUS * 2,
//     width: CIRCLE_RADIUS * 2,
//     borderRadius: CIRCLE_RADIUS,
//     bottom: 100,
//     backgroundColor: "#2c3e50",
//     position: "absolute",
//     zIndex: 120,
//     left: screenWidth / 2 - CIRCLE_RADIUS
//     // width: screenWidth
//   },
//   text: {
//     marginTop: 25,
//     marginLeft: 5,
//     marginRight: 5,
//     textAlign: "center",
//     color: "#fff"
//   },
//   draggableContainer: {
//     position: "absolute",
//     top: Window.height / 2 - CIRCLE_RADIUS,
//     left: Window.width / 2 - CIRCLE_RADIUS,
//     // top: 0,
//     // left: 0,
//     zIndex: 150
//   },
//   circle: {
//     backgroundColor: "#1abc9c",
//     width: CIRCLE_RADIUS * 2,
//     height: CIRCLE_RADIUS * 2,
//     borderRadius: CIRCLE_RADIUS,

//     position: "absolute"
//   }
// });

// import React, { Component } from "react";
// import {
//   AppRegistry,
//   StyleSheet,
//   Text,
//   View,
//   Animated,
//   PanResponder
// } from "react-native";

// export default class animatedbasic extends Component {
//   componentWillMount() {
//     this.animatedValue = new Animated.ValueXY();
//     this._value = { x: 0, y: 0 };
//     this.animatedValue.addListener(value => (this._value = value));
//     this.panResponder = PanResponder.create({
//       onStartShouldSetPanResponder: (evt, gestureState) => true,
//       onMoveShouldSetPanResponder: (evt, gestureState) => true,
//       onPanResponderGrant: (e, gestureState) => {
//         this.animatedValue.setOffset({
//           x: this._value.x,
//           y: this._value.y
//         });
//         this.animatedValue.setValue({ x: 0, y: 0 });
//       },
//       onPanResponderMove: Animated.event([
//         null,
//         { dx: this.animatedValue.x, dy: this.animatedValue.y }
//       ]),
//       onPanResponderRelease: (e, gestureState) => {
//         this.animatedValue.flattenOffset();
//         Animated.decay(this.animatedValue, {
//           deceleration: 0.997,
//           velocity: { x: gestureState.vx, y: gestureState.vy }
//         }).start();
//       }
//     });
//   }

//   render() {
//     const animatedStyle = {
//       transform: this.animatedValue.getTranslateTransform()
//     };
//     return (
//       <View style={styles.container}>
//         <Animated.View
//           style={[styles.box, animatedStyle]}
//           {...this.panResponder.panHandlers}
//         >
//           <Text style={styles.text}>Drag Me</Text>
//         </Animated.View>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center"
//   },
//   box: {
//     width: 150,
//     height: 150,
//     backgroundColor: "#333",
//     alignItems: "center",
//     justifyContent: "center"
//   },
//   text: {
//     color: "#FFF",
//     fontSize: 20
//   }
// });

// import React from "react";
// import {
//   StyleSheet,
//   View,
//   Text,
//   Dimensions,
//   Animated,
//   PanResponder
// } from "react-native";

// export default function Drag() {
//   const dropZoneValues = React.useRef(null);
//   const pan = React.useRef(new Animated.ValueXY());
//   const [bgColor, setBgColor] = React.useState("#2c3e50");

//   const isDropZone = React.useCallback(gesture => {
//     const dz = dropZoneValues.current;
//     return gesture.moveY > dz.y && gesture.moveY < dz.y + dz.height;
//   }, []);

//   const onMove = React.useCallback(
//     (_, gesture) => {
//       // if (isDropZone(gesture)) setBgColor("red");
//       // else setBgColor("#2c3e50");
//       // console.log("The user gesture => ", gesture);
//       // // pan.current.setValue({ x: 0, y: 0 });
//       // pan.current.setValue({ x: gesture.dx, y: gesture.dy });
//     },
//     [isDropZone]
//   );

//   const setDropZoneValues = React.useCallback(event => {
//     dropZoneValues.current = event.nativeEvent.layout;
//   });

//   const panResponder = React.useMemo(
//     () =>
//       PanResponder.create({
//         onStartShouldSetPanResponder: () => true,

//         // onPanResponderMove: Animated.event(
//         //   [
//         //     null,
//         //     {
//         //       dx: pan.current.x,
//         //       dy: pan.current.y
//         //     }
//         //   ],
//         //   {
//         //     listener: onMove
//         //   }
//         // ),
//         // onPanResponderMove: (evt, gestureState) => {
//         //   // position.setValue({ x: gestureState.dx, y: gestureState.dy });
//         //   // pan.current.setValue({ x: 0, y: 0 });
//         //   Animated.event([null, { dx: pan.current.x, dy: pan.current.y }], {
//         //     listener: onMove
//         //   });
//         // },
//         onPanResponderMove: Animated.event(
//           [
//             null,
//             {
//               dx: pan.current.x,
//               dy: pan.current.y
//             }
//           ],
//           {
//             listener: onMove
//           }
//         ),
//         onPanResponderGrant: (e, gesture) => {
//           // this.state.drag.setOffset({
//           //   x: this.state.drag.x._value,
//           //   y: this.state.drag.y._value
//           // });
//           // this.state.drag.setValue({ x: 0, y: 0 });
//           console.log("onPanResponderGrant => ");
//           pan.current.setOffset({
//             x: 0,
//             y: 0
//           });
//           pan.current.setValue({ x: 0, y: 0 });
//           // pan.current.setValue({ x: gesture.dx, y: gesture.dy });
//           // pan.current.setOffset({ x: 0, y: 0 });
//           // pan.current.setOffset({
//           //   x: gestureState.dx,
//           //   y: gestureState.dy
//           // });
//           // pan.current.setValue({ x: 0, y: 0 });
//         },
//         onPanResponderRelease: (e, gesture) => {
//           console.log("onPanResponderRelease => ");
//           // console.log("onPanResponderRelease => ");

//           // pan.current.setOffset({ x: gesture.dx, y: gesture.dy });
//           // pan.current.setOffset({ x: 0, y: 0 });
//           // pan.current.flattenOffset();
//           // if (!isDropZone(gesture)) {
//           //   Animated.spring(pan.current, { toValue: { x: 0, y: 0 } }).start();
//           // }
//           // Animated.spring(pan.current, { toValue: { x: 0, y: 0 } }).start();
//           // Animated.spring(pan.current, { toValue: { x: 0, y: 0 } }).start();
//           // console.log("pan.current => ", pan.current);
//           // Animated.spring(pan.current, {
//           //   toValue: { x: pan.current.x, y: pan.current.y }
//           // }).start();
//           // pan.current.setValue({ x: gesture.dx, y: gesture.dy });
//           // pan.current.setOffset({ x: gesture.dx, y: gesture.dy });
//         }
//       }),
//     []
//   );

//   return (
//     <View style={styles.mainContainer}>
//       <View
//         onLayout={setDropZoneValues}
//         style={[styles.dropZone, { backgroundColor: bgColor }]}
//       >
//         <Text style={styles.text}>Drop me here!</Text>
//       </View>
//       <View style={styles.draggableContainer}>
//         <Animated.View
//           {...panResponder.panHandlers}
//           style={[pan.current.getLayout(), styles.circle]}
//         >
//           <Text style={styles.text}>Drag me!</Text>
//         </Animated.View>
//       </View>
//     </View>
//   );
// }

// let CIRCLE_RADIUS = 36;
// let Window = Dimensions.get("window");
// let styles = StyleSheet.create({
//   mainContainer: {
//     flex: 1
//   },
//   dropZone: {
//     height: 100,
//     backgroundColor: "#2c3e50"
//   },
//   text: {
//     marginTop: 25,
//     marginLeft: 5,
//     marginRight: 5,
//     textAlign: "center",
//     color: "#fff"
//   },
//   draggableContainer: {
//     position: "absolute",
//     top: Window.height / 2 - CIRCLE_RADIUS,
//     left: Window.width / 2 - CIRCLE_RADIUS
//   },
//   circle: {
//     backgroundColor: "#1abc9c",
//     width: CIRCLE_RADIUS * 2,
//     height: CIRCLE_RADIUS * 2,
//     borderRadius: CIRCLE_RADIUS
//   }
// });

/**
 * KIND OF WORKING IN A FUNCTIONAL COMPOENNT
 */

// import React from "react";
// import {
//   StyleSheet,
//   View,
//   Text,
//   Dimensions,
//   Animated,
//   PanResponder
// } from "react-native";

// export default function Drag() {
//   const dropZoneValues = React.useRef(null);
//   const pan = React.useRef(new Animated.ValueXY());
//   const [bgColor, setBgColor] = React.useState("#2c3e50");

//   const isDropZone = React.useCallback(gesture => {
//     const dz = dropZoneValues.current;
//     return gesture.moveY > dz.y && gesture.moveY < dz.y + dz.height;
//   }, []);

//   const onMove = React.useCallback(
//     (_, gesture) => {
//       if (isDropZone(gesture)) setBgColor("red");
//       else setBgColor("#2c3e50");
//     },
//     [isDropZone]
//   );

//   const setDropZoneValues = React.useCallback(event => {
//     dropZoneValues.current = event.nativeEvent.layout;
//   });

//   const panResponder = React.useMemo(
//     () =>
//       PanResponder.create({
//         onStartShouldSetPanResponder: () => true,

//         onPanResponderMove: Animated.event(
//           [
//             null,
//             {
//               dx: pan.current.x,
//               dy: pan.current.y
//             }
//           ],
//           {
//             listener: onMove
//           }
//         ),
//         onPanResponderGrant: (evt, gesture) => {
//           console.log("onPanResponderGrant")
//           console.log("gesture => ", gesture)          

//         },
//         // onPanResponderMove: (evt, gesture) => {
//         //   // Animated.event([{y: pan.current.y}])({y: gesture.moveY})
//         //   Animated.event([
//         //     null, {
//         //       dx: pan.current.x,
//         //       dy: pan.current.y
//         //     }
//         //   ], {
//         //     listener: onMove
//         //   })
//         // },
//         onPanResponderRelease: (e, gesture) => {
//           console.log("onPanResponderRelease")
//           console.log("gesture => ", gesture)
//           console.log("current pan")
//           console.log("gesture => ", pan.current) 
//           // if (!isDropZone(gesture)) {
//           //   Animated.spring(pan.current, { toValue: { x: 0, y: 0 } }).start();
//           // }
//           if (!isDropZone(gesture)) {
//             Animated.spring(pan.current, { toValue: { x: gesture.moveX, y: gesture.moveY } }).start();
//           }
//           //on Release we need to update the point. it has a new offset and values now
//         }
//       }),
//     []
//   );

//   return (
//     <View style={styles.mainContainer}>
//       <View
//         onLayout={setDropZoneValues}
//         style={[styles.dropZone, { backgroundColor: bgColor }]}
//       >
//         <Text style={styles.text}>Drop me here!</Text>
//       </View>
//       <View style={styles.draggableContainer}>
//         <Animated.View
//           {...panResponder.panHandlers}
//           style={[pan.current.getLayout(), styles.circle]}
//           // style={[ {top: pan.current.getLayout().top},styles.circle]}
//         >
//           <Text style={styles.text}>Drag me!</Text>
//         </Animated.View>
//       </View>
//     </View>
//   );
// }

// let CIRCLE_RADIUS = 36;
// let Window = Dimensions.get("window");
// let styles = StyleSheet.create({
//   mainContainer: {
//     flex: 1
//   },
//   dropZone: {
//     height: 100,
//     backgroundColor: "#2c3e50"
//   },
//   text: {
//     marginTop: 25,
//     marginLeft: 5,
//     marginRight: 5,
//     textAlign: "center",
//     color: "#fff"
//   },
//   draggableContainer: {
//     position: "absolute",
//     top: Window.height / 2 - CIRCLE_RADIUS,
//     left: Window.width / 2 - CIRCLE_RADIUS
//   },
//   circle: {
//     backgroundColor: "#1abc9c",
//     width: CIRCLE_RADIUS * 2,
//     height: CIRCLE_RADIUS * 2,
//     borderRadius: CIRCLE_RADIUS
//   }
// });


import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Animated,
  PanResponder
} from "react-native";

const  animatedbasic = () =>  {
  const animatedValue = new Animated.ValueXY();
    let _value = { x: 0, y: 0 };
    animatedValue.addListener(value => (_value = value));
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderGrant: (e, gestureState) => {
        animatedValue.setOffset({
          x: _value.x,
          y: _value.y
        });
        animatedValue.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: Animated.event([
        null,
        { dx: animatedValue.x, dy: animatedValue.y }
      ]),
      onPanResponderRelease: (e, gestureState) => {
        animatedValue.flattenOffset();
        Animated.decay(animatedValue, {
          deceleration: 0.997,
          velocity: { x: gestureState.vx, y: gestureState.vy }
        }).start();
      }
    });

    const animatedStyle = {
      transform: animatedValue.getTranslateTransform()
    };
    return (
      <View style={styles.container}>
        <Animated.View
          style={[styles.box, animatedStyle]}
          {...panResponder.panHandlers}
        >
          <Text style={styles.text}>Drag Me</Text>
        </Animated.View>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  box: {
    width: 150,
    height: 150,
    backgroundColor: "#333",
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    color: "#FFF",
    fontSize: 20
  }
});

export default animatedbasic