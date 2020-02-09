import React from "react";
import { ApolloProvider } from "react-apollo";
import { CookiesProvider } from "react-cookie";
import client from "./apollo/client";
import AppContainer from "./AppContainer";
import { Root } from "native-base";

const App = props => {
  return (
    <ApolloProvider client={client}>
      <CookiesProvider>
        <Root>
          <AppContainer />
        </Root>
      </CookiesProvider>
    </ApolloProvider>
  );
};

export default App;
