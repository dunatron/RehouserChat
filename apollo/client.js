import {
  ApolloClient,
  HttpLink,
  createHttpLink,
  split,
  ApolloLink,
  getMainDefinition
} from "@apollo/client";
import { WebSocketLink } from "apollo-link-ws";
import { setContext } from "apollo-link-context";
import cache from "./cache";
import resolvers from "./resolvers";
import { getAuthToken } from "../utils/userAuth";

// const httpLink = createHttpLink({
//   uri: "http://10.110.6.22:4444", // work mac
//   // uri: "http://192.168.20.2:4444", // home mac
//   credentials: "include" // this will automagically include sending cookies to the server
// });
const httpLink = new HttpLink({
  // uri: "http://10.110.6.22:4444", // work mac
  uri: "http://192.168.20.2:4444", // home windows

  // uri: "http://192.168.20.6:4444", // home mac
  credentials: "include" // this will automagically include sending cookies to the server
});

const wsLink = new WebSocketLink({
  // if you instantiate in the server, the error will be thrown
  // uri: `ws://192.168.20.6:4444`, //home mac
  // uri: `ws://10.110.6.22:4444`,
  uri: "ws://192.168.20.2:4444", // home windows
  // uri: websocketEndpoint,
  options: {
    reconnect: true
  }
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  httpLink
);

// const authLink = setContext((_, ctx) => {
//   console.log("Apollo ctx => ", ctx);
//   // console.log("Apollo headers => ", headers);
//   /**
//    * Auth isnt working like this. could not seem to retrieve cookies, making it hard to see if we have a token
//    * While our app depends on these cookies being there(which they are). We send the token back via the mutation aswel as being set in the cookie.
//    * This way we can check AsyncStorage to see if the token is there.
//    * Even do things like validate token on the server for time, expiry etc
//    */
//   const token = getAuthToken();
//   return {
//     headers: {
//       // ...headers
//       authorization: token ? `Bearer ${token}` : ""
//     }
//   };
// });

// const authLink = new ApolloLink((operation, forward) => {
//   operation.setContext({
//     fetchOptions: {
//       credentials: "include"
//     }
//     // headers: headers,
//   });
//   return forward(operation);
// });

const client = new ApolloClient({
  cache: cache,
  resolvers: resolvers(),
  // link: authLink.concat(httpLink)
  // link: httpLink
  link: link
});

export default client;
