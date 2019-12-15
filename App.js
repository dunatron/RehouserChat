import React from "react";
import { ApolloProvider } from "react-apollo";
import client from "./apollo/client";
import AppContainer from "./AppContainer";

const App = props => {
  return (
    <ApolloProvider client={client}>
      <AppContainer />
    </ApolloProvider>
  );
};

export default App;
