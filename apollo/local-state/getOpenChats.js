import gql from "graphql-tag";

const GET_OPEN_CHATS = gql`
  {
    openChats @client {
      id
      type
      participants {
        id
        firstName
        lastName
        __typename
        profilePhoto {
          filename
          url
        }
      }
      __typename
    }
  }
`;

export { GET_OPEN_CHATS };
export default GET_OPEN_CHATS;
