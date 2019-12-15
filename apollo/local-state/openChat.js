import gql from "graphql-tag";

const OPEN_CHAT_LOCAL_MUTATION = gql`
  mutation OPEN_CHAT_LOCAL_MUTATION($chat: Chat) {
    openChat(chat: $chat) @client
  }
`;

export { OPEN_CHAT_LOCAL_MUTATION };
export default OPEN_CHAT_LOCAL_MUTATION;
