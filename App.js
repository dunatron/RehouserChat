import React from "react";
import { ApolloProvider } from "react-apollo";
import client from "./apollo/client";
import AppContainer from "./AppContainer";
import { Root } from "native-base";


const App = props => {
  return (
    <ApolloProvider client={client}>
      <Root>
        <AppContainer />
      </Root>
    </ApolloProvider>
  );
};

export default App;
