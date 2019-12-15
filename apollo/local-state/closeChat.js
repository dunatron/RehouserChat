import gql from "graphql-tag";

const CLOSE_CHAT_LOCAL_MUTATION = gql`
  mutation OPEN_CHAT_LOCAL_MUTATION($id: Int!) {
    closeChat(id: $id) @client
  }
`;

export { CLOSE_CHAT_LOCAL_MUTATION };
export default CLOSE_CHAT_LOCAL_MUTATION;
