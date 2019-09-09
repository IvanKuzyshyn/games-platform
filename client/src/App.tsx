import React from 'react';
import { ApolloProvider } from "react-apollo-hooks";

import { Bootstrap } from "./scenes/Bootstrap";
import { client } from "./services/apollo/Client";

const App = () => (
    <ApolloProvider client={client}>
      <Bootstrap />
    </ApolloProvider>
);

export default App;
