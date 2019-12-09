import { ApolloClient, HttpLink } from "@apollo/client";
import cache from "./cache";

const client = new ApolloClient({
  cache: cache,
  link: new HttpLink({
    uri: "http://10.110.6.22:4444"
  })
});

export default client;
