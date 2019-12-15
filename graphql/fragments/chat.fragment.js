import gql from "graphql-tag";
import message from "./message.fragment";

export default gql`
  fragment Chat on Chat {
    id
    name
    picture
    type
    lastMessage {
      ...Message
    }
    participants {
      id
      firstName
      lastName
    }
    seenInfo {
      id
      lastSeen
      amountSeen
      seenUserId
    }
  }
  ${message}
`;
