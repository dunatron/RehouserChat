import gql from "graphql-tag";
import {
  CHAT_QUERY,
  MESSAGES_QUERY,
  MESSAGES_CONNECTION_QUERY
} from "../graphql/queries/index";

import {
  MESSAGES_CONNECTION_ORDER_BY,
  MESSAGES_CONNECTION_FIRST,
  MESSAGES_CONNECTION_SKIP
} from "../constants";

export const writeMessage = async (client, message) => {
  // Might be better to write a writeOwnMessage
  // first figure out why its doing this though...

  if (!client.query) {
    // do write for InDbCahce
    if (client.readQuery) {
      // const cahcedData = await client.readQuery({
      //   query: MESSAGES_CONNECTION_QUERY,
      //   variables: variables,
      // });
      // console.log("cahcedData => ", cahcedData)
    }
    return;
  }

  // if(client.__proto__ === 'ApolloCache') {
  //   alert("AN in memory cahce yea?")
  // }
  // return

  // message connection variables
  const variables = {
    orderBy: MESSAGES_CONNECTION_ORDER_BY,
    first: MESSAGES_CONNECTION_FIRST,
    skip: MESSAGES_CONNECTION_SKIP,
    where: {
      chat: {
        id: message.chat.id
      }
    }
  };

  // message connection messages
  const { data, loading, error } = await client.query({
    query: MESSAGES_CONNECTION_QUERY,
    variables: variables
  });

  // const {data, loading, error} = client.query ? await query.query({
  //   query: MESSAGES_CONNECTION_QUERY,
  //   variables: variables,
  // })
  //  : await readQuery.query({
  //   query: MESSAGES_CONNECTION_QUERY,
  //   variables: variables,
  // });

  // new message to write
  const pagedMesssage = {
    cursor: message.id,
    node: {
      ...message
    },
    __typename: "MessageEdge"
  };

  // write the query to the cache
  client.writeQuery({
    query: MESSAGES_CONNECTION_QUERY,
    variables: variables,
    data: {
      messagesConnection: {
        ...data.messagesConnection,
        edges: data.messagesConnection.edges.concat(pagedMesssage)
      }
    }
  });
};
