import gql from "graphql-tag";

const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATION {
    signout {
      message
    }
  }
`;

export { SIGN_OUT_MUTATION };
