import React, { useState } from "react";
// import { StackNavigator } from "react-navigation"; // 1.0.0-beta.19
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
// import { ApolloProvider } from "react-apollo";
// import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
// import client from "./apollo/client";
// import {
//   ApolloClient,
//   InMemoryCache,
//   HttpLink,
//   gql,
//   useQuery,
//   ApolloProvider,
//   ApolloLink
// } from "@apollo/client";
import gql from "graphql-tag";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";

import AuthLoadingScreen from "./screens/AuthLoadingScreen";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import ProfileScreen from "./screens/ProfileScreen";

const AuthenticationNavigatorStack = createStackNavigator({
  Register: {
    screen: RegisterScreen,
    navigationOptions: { headerTitle: "Register" }
  },
  Login: { screen: LoginScreen, navigationOptions: { headerTitle: "Login" } }
});

const AppNavigatorStack = createStackNavigator({
  Home: ProfileScreen
});

const AppNavigator = createSwitchNavigator(
  {
    /*
     * Rather than being rendered by a screen component, the
     * AuthenticationNavigator is a screen component
     */
    AuthLoading: AuthLoadingScreen,
    Auth: AuthenticationNavigatorStack,
    App: AppNavigatorStack
  },
  { initialRouteName: "AuthLoading" }
);

const AppContainer = createAppContainer(AppNavigator);

/**
 * ToDo: move to own file
 * 1. this needs to get the token. So we can forward to server for auth requests
 */
// const authLink = new ApolloLink((operation, forward) => {
//   operation.setContext({
//     fetchOptions: {
//       credentials: "include"
//     },
//     // headers: headers
//     headers: {
//       authorization: `Bearer your-personal-access-token`
//     }
//   });
//   return forward(operation);
// });

const client = new ApolloClient({
  link: new HttpLink({
    // uri: "http://localhost:4444/"
    uri: "http://10.110.6.22:4444"
    // uri: "https://rehouser-yoga-prod.herokuapp.com"
  }),
  credentials: "include",
  uri: "http://10.110.6.22:4444",
  cache: new InMemoryCache()
  // we should setup Links for differet operations. ie sub or not. wss vs https
  // request: operation => {
  //   operation.setContext({
  //     headers: {
  //       authorization: `Bearer your-personal-access-token`
  //     }
  //   });
  // }
});

client
  .query({
    query: gql`
      {
        chats {
          id
          name
          participants {
            id
            firstName
          }
        }
      }
    `
  })
  .then(result => console.log(result));

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  handleChangeLoginState = value => {
    setLoggedIn(value);
  };

  return (
    <ApolloProvider client={client}>
      <LoginScreen client={client} />
    </ApolloProvider>
  );

  // return (
  //   <ApolloProvider client={client}>
  //     <AppContainer
  //       screenProps={{
  //         changeLoginState: handleChangeLoginState,
  //         loggedIn: loggedIn
  //       }}
  //     />
  //   </ApolloProvider>
  // );
};

// export default createAppContainer(AuthStack);

export default App;
