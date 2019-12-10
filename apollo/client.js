import {
  ApolloClient,
  HttpLink,
  createHttpLink,
  split,
  ApolloLink,
  getMainDefinition
} from "@apollo/client";
import { setContext } from "apollo-link-context";
import cache from "./cache";
import { getAuthToken } from "../utils/userAuth";

const httpLink = createHttpLink({
  uri: "http://10.110.6.22:4444",
  credentials: "include"
});

const authLink = setContext((_, { headers, cookies }) => {
  /**
   * Auth isnt working like this. could not seem to retrieve cookies, making it hard to see if we have a token
   * While our app depends on these cookies being there(which they are). We send the token back via the mutation aswel as being set in the cookie.
   * This way we can check AsyncStorage to see if the token is there.
   * Even do things like validate token on the server for time, expiry etc
   */
  const token = getAuthToken();
  return {
    headers: {
      // ...headers
      authorization: token ? `Bearer ${token}` : ""
    }
  };
});

const client = new ApolloClient({
  cache: cache,
  link: authLink.concat(httpLink)
});

export default client;
