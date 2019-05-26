import React, { Component } from 'react';
import { ApolloProvider } from "react-apollo-hooks";

import { AppContext } from "./context/application";
import { Bootstrap } from "./scenes/Bootstrap";
import { client } from "./services/apollo/Client";

class App extends Component {
  state = {
    user: null,
  };

  handleAuthorizeUser = (user: any): void => {
    this.setState({ user })
  };

  render() {
    const context = {
      user: this.state.user
    };

    return (
      <ApolloProvider client={client}>
        <AppContext.Provider value={context}>
          <Bootstrap onUserAuthorize={this.handleAuthorizeUser} />
        </AppContext.Provider>
      </ApolloProvider>
    )
  }
}

export default App;
