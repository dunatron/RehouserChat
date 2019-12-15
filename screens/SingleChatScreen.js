import React, { useState, useCallback } from "react";
import { useQuery, useApolloClient, useMutation } from "@apollo/react-hooks";
import { StyleSheet, View, Text } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { MESSAGES_CONNECTION_QUERY } from "../graphql/queries";
import { CREATE_MESSAGE_MUTATION } from "../graphql/mutations";
import {
  MESSAGES_CONNECTION_ORDER_BY,
  MESSAGES_CONNECTION_FIRST,
  MESSAGES_CONNECTION_SKIP
} from "../constants";
import { writeMessage } from "../services/writeMessage";
import { Button } from "native-base";
import { getChatName } from "../utils/getChatName";

//https://github.com/FaridSafi/react-native-gifted-chat/issues/211
// to determine if toFetchMore

const SingleChatScreen = ({ navigation, screenProps }) => {
  const client = useApolloClient();
  const chat = navigation.getParam("chat");
  const chatId = chat.id;
  const { me } = screenProps;
  // const sendMessageHandler = sentMessages => {
  //   // setMessages(currentMessages => [...currentMessages, ...sentMessages]);
  // };

  const [createMessage, sendMessageProps] = useMutation(
    CREATE_MESSAGE_MUTATION
  );

  const [isFetchingMore, setIsFetchingMore] = useState(false);

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

  const sendMessageHandler = useCallback(
    content => {
      for (const c of content) {
        console.log("c in Content => ", c);
        sendMessage(c);
      }
    },
    [data]
  );

  const sendMessage = ({ _id, createdAt, text, user }) => {
    createMessage({
      variables: {
        data: {
          content: text,
          isMine: true,
          lastMessageRel: {
            connect: {
              id: chatId
            }
          },
          chat: {
            connect: {
              id: chatId
            }
          },
          sender: {
            connect: {
              id: me.id
              // id: user._id
            }
          }
        }
      },
      // optimisticResponse: {
      //   __typename: 'Mutation',
      //   updateComment: {
      //     id: commentId,
      //     __typename: 'Comment',
      //     content: commentContent,
      //   },
      // },
      update: (proxy, { data }) => {
        if (data && data.createMessage) {
          // writeMessage(client, data.createMessage);
          writeMessage(client, data.createMessage);
        }
      }
    });
  };

  const fetchMoreHandler = () => {
    setIsFetchingMore(true);
    if (isFetchingMore) return null;
    if (!data) return null;
    if (!data.messagesConnection) return null;
    try {
      fetchMore({
        variables: {
          query: MESSAGES_CONNECTION_QUERY,
          cursor: data.messagesConnection.pageInfo.endCursor,
          skip: data.messagesConnection.edges.length
        },
        updateQuery: (prevResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) return;
          if (!prevResult) return;
          const newEdges = fetchMoreResult.messagesConnection.edges;
          const pageInfo = fetchMoreResult.messagesConnection.pageInfo;
          setIsFetchingMore(false); // no longer fetching when performing the update
          return newEdges.length
            ? {
                messagesConnection: {
                  __typename: "MessageConnection",
                  edges: [
                    ...prevResult.messagesConnection.edges,
                    ...fetchMoreResult.messagesConnection.edges
                  ],
                  pageInfo: {
                    ...fetchMoreResult.messagesConnection.pageInfo
                  },
                  aggregate: {
                    ...fetchMoreResult.messagesConnection.aggregate
                  }
                }
              }
            : prevResult;
        }
      });
    } catch (e) {
      setIsFetchingMore(false); // stop telling app we are fetching if error
    } finally {
    }
  };

  // gifted chat has no auto detection for load more. just a button to load more. sooooo
  // giftedChat onScroll get the native event handlers and do some measurements to decide if we are close to the top
  const isCloseToTop = ({ layoutMeasurement, contentOffset, contentSize }) => {
    if (loading) return false;
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
  const pageInfo = data.messagesConnection.pageInfo;
  const { startCursor, endCursor, hasNextPage } = pageInfo;
  const giftedMessages = transformMessagesToGifted(edges);
  console.log("Total messages => ", edges.length);
  console.log("Messages Connection DATA => ", data);
  return (
    <GiftedChat
      listViewProps={{
        scrollEventThrottle: 400,
        onScroll: ({ nativeEvent }) => {
          if (isCloseToTop(nativeEvent)) {
            fetchMoreHandler();
          }
        }
      }}
      loadEarlier={hasNextPage}
      onLoadEarlier={fetchMoreHandler}
      isLoadingEarlier={loading || isFetchingMore}
      messages={giftedMessages}
      onSend={sendMessageHandler}
      showAvatarForEveryMessage={false}
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
  console.log("Message edges => ", edges);
  return edges.map((edge, i) => ({
    _id: edge.node.id,
    text: edge.node.content,
    createdAt: edge.node.content.createdAt,
    user: {
      _id: edge.node.sender.id,
      name: edge.node.sender.firstName + edge.node.sender.lastName,
      avatar: edge.node.sender.profilePhoto
        ? edge.node.sender.profilePhoto.url
        : null
    }
  }));
};

// profilePhoto {
//   id
//   filename
//   url
// }
/**
 * Little bit of work to do here. we need to pass Chat in as navigation params aswel as me
 * we can do this with subscriptions as the chat is sent along. and from the ChatsList we also have the Chat object
 * pass the chat in via navigation params
 */
SingleChatScreen.navigationOptions = props => {
  const idParam = props.navigation.getParam("id");
  const chat = props.navigation.getParam("chat");
  const { me } = props.screenProps;
  console.log("idParam => ", idParam);
  console.log("chat Param => ", chat);
  console.log("me => ", me);
  return {
    title: `Chat ${getChatName(chat, me)}`
  };
};

export default SingleChatScreen;
