import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import ApolloClient from 'apollo-client';
import { HttpLink, InMemoryCache } from 'apollo-client-preset';
import { ApolloProvider, graphql } from 'react-apollo';
import gql from 'graphql-tag';

// import { ApolloClient } from 'apollo-client-preset';
// import { graphql, ApolloProvider } from 'react-apollo';
// import gql from 'graphql-tag';

const client = new ApolloClient({
  link: new HttpLink(),
  cache: new InMemoryCache()
});

const ChannelsList = ({ data: { loading, error, channels } }) => {
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  return <ul>{channels.map((ch) => <li key={ch.id}>{ch.name}</li>)}</ul>;
};

const channelsListQuery = gql`
  query ChannelsListQuery {
    channels {
      id
      name
    }
  }
`;

const ChannelsListWithData = graphql(channelsListQuery)(ChannelsList);

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to Apollo</h1>
          </header>
          <ChannelsListWithData />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
