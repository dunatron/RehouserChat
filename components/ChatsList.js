import * as React from "react";
import { FlatList, Text } from "react-native";
import { useQuery } from "@apollo/react-hooks";
import { MY_CHATS_QUERY } from "../graphql/queries";
import moment from "moment";

import graphqlTag from "graphql-tag";
import {
  Container,
  Content,
  View,
  Button,
  Icon,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail
} from "native-base";
import { StyleSheet } from "react-native";
import { trimString } from "../utils/trimString";

const QUERY_CHATS = graphqlTag`
query queryChats {
  chats {
    id
    name
    lastMessage {
      content
      createdAt
    }
    participants {
      id
      firstName
    }
  }
}
`;

const ChatItem = props => {
  const { item } = props;
  const handleItemPress = () => {
    props.navigation.navigate("Chat", {
      id: item.id,
      chat: item
    });
  };
  const lastMessageDate = item.lastMessage
    ? moment(item.lastMessage.createdAt).format("ddd, hA")
    : "";

  const lastMessageFull = item.lastMessage ? item.lastMessage.content : "";
  const lastMessageText = trimString(lastMessageFull, {
    maxLength: 50,
    truncate: true
  });

  return (
    <ListItem avatar style={styles.listItem} button onPress={handleItemPress}>
      <Left>
        <Thumbnail source={{ uri: "Image URL" }} />
      </Left>
      <Body style={styles.listItemBody}>
        <Text>{item.name}</Text>
        <Text note>{lastMessageText}</Text>
      </Body>
      <Right style={styles.listItemRight}>
        <Text note>{lastMessageDate}</Text>
      </Right>
    </ListItem>
  );
};

const ChatsList = props => {
  const { data, loading, error } = useQuery(MY_CHATS_QUERY);
  if (loading) return <Text>Loading chats</Text>;
  if (error) return <Text>error retrieving chats list</Text>;
  const chatsAggregate = data.chatsConnection.aggregate;
  const chatEdges = data.chatsConnection.edges;
  return (
    <Container>
      <Content>
        {/* https://docs.nativebase.io/Components.html#list-def-headref */}
        <List
          // dataArray={data.chats}
          dataArray={chatEdges}
          keyExtractor={item => String(item.node.id)}
          itemDivider={true}
          renderRow={item => (
            <ChatItem item={item.node} navigation={props.navigation} />
          )}
        />
      </Content>
    </Container>
  );
};

const itemHeight = 100;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1
  },
  listItem: {
    height: itemHeight
  },
  listItemLeft: {
    height: itemHeight
  },
  listItemBody: {
    height: itemHeight
  },
  listItemRight: {
    height: itemHeight
  }
});

export default ChatsList;
