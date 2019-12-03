import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
// import { InMemoryCache } from "apollo-cache-inmemory";
// import { HttpLink } from "";

// Instantiate required constructor fields
// const cache = new InMemoryCache();
// const link = new HttpLink({
//   uri: "http://localhost:4000/"
// });

// const client = new ApolloClient({
//   // Provide required constructor fields
//   cache: cache,
//   link: link,

//   // Provide some optional constructor fields
//   name: "react-web-client",
//   version: "1.3",
//   queryDeduplication: false,
//   defaultOptions: {
//     watchQuery: {
//       fetchPolicy: "cache-and-network"
//     }
//   }
// });

// export default client;

const client = new ApolloClient({
  link: new HttpLink({
    uri: "http://localhost:4000/",
    cache: new InMemoryCache()
  })
});

export default client;
