import gql from "graphql-tag";
import { GET_OPEN_CHATS } from "./local-state";

export const OPEN_CHAT_LOCAL_MUTATION = gql`
  mutation OPEN_CHAT_LOCAL_MUTATION($chat: Chat) {
    openChat(chat: $chat) @client
  }
`;

export const CLOSE_CHAT_LOCAL_MUTATION = gql`
  mutation OPEN_CHAT_LOCAL_MUTATION($id: Int!) {
    closeChat(id: $id) @client
  }
`;

const resolvers = () => {
  return {
    Mutation: {
      openChat(_, variables, { cache }) {
        const { openChats } = cache.readQuery({
          query: GET_OPEN_CHATS
        });
        const foundChat = openChats.find(c => c.id === variables.chat.id);

        if (foundChat) {
          // alert("its cool already in bar, return  early")
          return;
        }
        const data = {
          data: {
            openChats: [
              ...openChats,
              {
                id: variables.chat.id,
                type: variables.chat.type,
                participants: variables.chat.participants,
                __typename: "OpenChat"
              }
            ]
          }
        };
        cache.writeData(data);
      },
      closeChat(_, variables, { cache }) {
        const { openChats } = cache.readQuery({
          query: GET_OPEN_CHATS
        });
        const filteredChats = openChats.filter(c => c.id !== variables.id);
        const data = {
          data: {
            openChats: [...filteredChats]
          }
        };
        cache.writeData(data);
      }
    }
  };
};

export default resolvers;
