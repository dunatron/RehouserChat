import gql from "graphql-tag";
import * as fragments from "../fragments";

// REMEMBER to use a fragment with a subscription, the subscriptions needs to be named
// export { MESSAGE_CREATED_SUBSCRIPTION };
const MESSAGE_CREATED_SUBSCRIPTION = gql`
  subscription NEW_MESSAGE_SUB($where: MessageSubscriptionWhereInput) {
    messageSub(where: $where) {
      mutation
      node {
        ...Message
      }
    }
  }
  ${fragments.message}
`;

export { MESSAGE_CREATED_SUBSCRIPTION };
