import gql from 'graphql-tag';

// TBH this should just have message stuff.
// it would just take far longer to implement all the visuals nicely/inceremntally without this data al at once
const MESSAGE_CREATED_SUBSCRIPTION = gql`
  subscription($where: MessageSubscriptionWhereInput) {
    messageSub(where: $where) {
      mutation
      node {
        id
        createdAt
        content
        isMine
        chat {
          id
          type
          name
          participants {
            id
            firstName
            lastName
            profilePhoto {
              filename
              url
            }
          }
        }
        sender {
          id
          firstName
          lastName
        }
      }
    }
  }
`;

export { MESSAGE_CREATED_SUBSCRIPTION };