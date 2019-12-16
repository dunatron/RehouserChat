import gql from "graphql-tag";
import { isEmpty } from "ramda";
import { MESSAGES_CONNECTION_QUERY } from "../graphql/queries/index";

import {
  MESSAGES_CONNECTION_ORDER_BY,
  MESSAGES_CONNECTION_FIRST,
  MESSAGES_CONNECTION_SKIP
} from "../constants";

/**
 * If the main chat thread for the message has been opened and is in the cache,
 * we will write the new message into the messagesConnection cache
 */
export const writeMessage = async (client, message) => {
  if (!client.query) {
    return;
  }
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

  /**
   * Get the messages in the cache to concat them onto the new message,
   * if no connection in the store then do not add message
   */
  const { data, loading, error } = await client.query({
    query: MESSAGES_CONNECTION_QUERY,
    variables: variables,
    fetchPolicy: "cache-only"
  });

  if (isEmpty(data)) {
    return;
  }

  // new message to write
  const pagedMesssage = {
    cursor: message.id,
    node: {
      ...message
    },
    __typename: "MessageEdge"
  };

  const newEdges = [pagedMesssage].concat(data.messagesConnection.edges);

  // write the query to the cache
  client.writeQuery({
    query: MESSAGES_CONNECTION_QUERY,
    variables: variables,
    data: {
      messagesConnection: {
        ...data.messagesConnection,
        edges: newEdges
        // edges: data.messagesConnection.edges.concat(pagedMesssage)
      }
    }
  });
};
