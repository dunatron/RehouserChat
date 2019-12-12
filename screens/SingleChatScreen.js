import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { StyleSheet, View, Text } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { MESSAGES_CONNECTION_QUERY } from "../graphql/queries";
import {
  MESSAGES_CONNECTION_ORDER_BY,
  MESSAGES_CONNECTION_FIRST,
  MESSAGES_CONNECTION_SKIP
} from "../constants";
import { Button } from "native-base";

//https://github.com/FaridSafi/react-native-gifted-chat/issues/211
// to determine if toFetchMore

const SingleChatScreen = ({ navigation }) => {
  const chatId = navigation.getParam("id");
  // we should do a useQuery to get specific chats etc
  const [messages, setMessages] = useState([]);
  const sendMessageHandler = sentMessages => {
    setMessages(currentMessages => [...currentMessages, ...sentMessages]);
  };
  const { data, loading, error, fetchMore } = useQuery(
    MESSAGES_CONNECTION_QUERY,
    {
      variables: {
        orderBy: MESSAGES_CONNECTION_ORDER_BY,
        first: MESSAGES_CONNECTION_FIRST,
        skip: MESSAGES_CONNECTION_SKIP,
        where: {
          chat: {
            id: chatId
          }
        }
      }
    }
  );

  const fetchMoreHandler = () => {
    if (!data) return null;
    if (!data.messagesConnection) return null;
    fetchMore({
      variables: {
        query: MESSAGES_CONNECTION_QUERY,
        cursor: data.messagesConnection.pageInfo.endCursor,
        skip: data.messagesConnection.edges.length
      },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        // if (!fetchMoreResult) return;
        // const newEdges = fetchMoreResult.messagesConnection.edges;
        // const pageInfo = fetchMoreResult.messagesConnection.pageInfo;
        // return newEdges.length
        //   ? {
        //       messagesConnection: {
        //         __typename: prevResult.messagesConnection.__typename,
        //         edges: [...newEdges, ...prevResult.messagesConnection.edges],
        //         pageInfo
        //       }
        //     }
        //   : prevResult;
      }
    });
  };

  // gifted chat has no auto detection for load more. just a button to load more. sooooo
  // giftedChat onScroll get the native event handlers and do some measurements to decide if we are close to the top
  const isCloseToTop = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToTop = 80;
    return (
      contentSize.height - layoutMeasurement.height - paddingToTop <=
      contentOffset.y
    );
  };

  if (loading) return <Text>Loading messages</Text>;
  if (error) return <Text>error loading messages</Text>;
  const aggregateData = data.messagesConnection.aggregate;
  const edges = data.messagesConnection.edges;
  const giftedMessages = transformMessagesToGifted(edges);
  console.log("Data from messages => ", data);
  return (
    <GiftedChat
      listViewProps={{
        scrollEventThrottle: 400,
        onScroll: ({ nativeEvent }) => {
          if (isCloseToTop(nativeEvent)) fetchMoreHandler();
        }
      }}
      messages={giftedMessages}
      onSend={sendMessageHandler}
      user={{
        _id: 1
      }}
      scrollToBottom={true}
      scrollToBottomComponent={() => <View>Scroll to bottom</View>}
    />
  );
};

/**
 *
 * This is kind of ok. I think they need to be transformed only once.
 * currently(before i even write it) when we fetchMore we pass the entire list into here to get transformed.
 * We should utilise the cahce to store these mutated messages?
 */
const transformMessagesToGifted = edges => {
  return edges.map((edge, i) => ({
    _id: edge.node.id,
    text: edge.node.content,
    createdAt: edge.node.content.createdAt,
    user: {
      _id: edge.node.sender.id,
      name: edge.node.sender.firstName + edge.node.sender.lastName
    }
  }));
};

SingleChatScreen.navigationOptions = props => {
  const idParam = props.navigation.getParam("id");
  return {
    title: `Chat ${idParam}`
  };
};

export default SingleChatScreen;
