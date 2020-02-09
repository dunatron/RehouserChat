// import * as React from "react";
// import { StyleSheet } from "react-native";
// import {
//   Container,
//   Header,
//   Content,
//   Footer,
//   View,
//   Button,
//   List,
//   Text,
//   Root,
//   DatePicker
// } from "native-base";
// import OpenChats from "../components/OpenChats";
// import { gql, useQuery } from "@apollo/client";
// import { MY_CHATS_QUERY } from "../graphql/queries";
// import ChatsList from "../components/ChatsList";

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "#fff",
//     flex: 1
//   }
// });

// const HomeScreen = props => {
//   // const { data, loading, error } = useQuery(MY_CHATS_QUERY);
//   return (
//     // <View style={styles.container}>
//     //   {/* <OpenChats /> */}
//     //   {/* <ChatsList /> */}
//     //   <Text>
//     //     I am the home screen. I sould probably be the guy who looks for
//     //     properties??
//     //   </Text>
//     // </View>
//     <Root>
//       <Container>
//         <Header>
//           <Text>Home Screen</Text>
//         </Header>
//         <Content>
//           <Text>Home Screen Content</Text>
//         </Content>
//         <Footer>
//           <Text>Home Footer</Text>
//         </Footer>
//       </Container>
//     </Root>
//   );
// };

// HomeScreen.navigationOptions = {
//   title: "Home, but what if this was really really large?",
//   navigationOptions: {
//     tabBarLabel: "Home Page"
//   }
// };

// export default HomeScreen;

import React, { useState, useEffect } from "react";
import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Button,
  Left,
  Right,
  Body,
  Input,
  Item,
  Icon,
  Text,
  Accordion,
  ActionSheet
} from "native-base";
import HeaderBar from "../components/HeaderBar";
const AnatomyExample = props => {
  // props.navigation.navigate("Chat", {
  //   id: 86,
  //   otherParam: "anything you want here"
  // });
  const dataArray = [
    { title: "First Element", content: "Lorem ipsum dolor sit amet" },
    { title: "Second Element", content: "Lorem ipsum dolor sit amet" },
    { title: "Third Element", content: "Lorem ipsum dolor sit amet" }
  ];
  var BUTTONS = ["Option 0", "Option 1", "Option 2", "Delete", "Cancel"];
  var DESTRUCTIVE_INDEX = 3;
  var CANCEL_INDEX = 4;
  // https://reactnavigation.org/docs/en/drawer-navigator.html
  console.log("props.navigation => ", props.navigation);
  // useEffect(() => {
  //   const unsubscribe = props.navigation.addListener("drawerClose", e => {[]
  //     // Do something
  //   });

  //   return unsubscribe;
  // }, [props.navigation]);
  return (
    <Container>
      <HeaderBar {...props} />
      <Content padder>
        <Accordion dataArray={dataArray} expanded={0} />
        <Button
          onPress={() =>
            ActionSheet.show(
              {
                options: BUTTONS,
                cancelButtonIndex: CANCEL_INDEX,
                destructiveButtonIndex: DESTRUCTIVE_INDEX,
                title: "Testing ActionSheet"
              },
              buttonIndex => {
                console.log("Button index => ", buttonIndex);
                // this.setState({ clicked: BUTTONS[buttonIndex] });
              }
            )
          }
        >
          <Text>Actionsheet</Text>
        </Button>
      </Content>
      <Footer>
        <FooterTab>
          <Button full>
            <Text>Footer</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
};

AnatomyExample.navigationOptions = {
  title: "Home/Anatomy Example",
  navigationOptions: {
    tabBarLabel: "Home Page"
  }
};

export default AnatomyExample;
