import * as React from "react";
import { FlatList, Text } from "react-native";
import { useQuery } from "@apollo/react-hooks";

import graphqlTag from "graphql-tag";

const QUERY_CHATS = graphqlTag`
query queryChats {
  chats {
    id
    name
    participants {
      id
      firstName
    }
  }
}
`;

const ChatsList = () => {
  const { data, loading, error } = useQuery(QUERY_CHATS);
  if (loading) return <Text>Loading chats</Text>;
  if (error) return <Text>error retrieving chats list</Text>;
  return (
    <FlatList
      data={data.chats}
      keyExtractor={item => String(item.id)}
      renderItem={({ item }) => <Text>{item.name}</Text>}
    />
  );
};

export default ChatsList;
