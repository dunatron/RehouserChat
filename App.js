import React, { useState } from "react";
// import { StackNavigator } from "react-navigation"; // 1.0.0-beta.19
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
// import { ApolloProvider } from "react-apollo";
// import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
// import client from "./apollo/client";
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  gql,
  useQuery,
  ApolloProvider
} from "@apollo/client";

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

const AppNavigator = createSwitchNavigator({
  /*
   * Rather than being rendered by a screen component, the
   * AuthenticationNavigator is a screen component
   */
  Auth: AuthenticationNavigatorStack,
  Home: ProfileScreen
});

const AppContainer = createAppContainer(AppNavigator);

/**
 * ToDo: move to own file
 */
const client = new ApolloClient({
  link: new HttpLink({
    uri: "http://localhost:4000/"
  }),
  cache: new InMemoryCache()
});

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  handleChangeLoginState = value => {
    setLoggedIn(value);
  };

  return (
    <ApolloProvider client={client}>
      <AppContainer
        loggedIn={loggedIn}
        changeLoginState={v => handleChangeLoginState(v)}
      />
    </ApolloProvider>
  );
};

// export default createAppContainer(AuthStack);

export default App;
