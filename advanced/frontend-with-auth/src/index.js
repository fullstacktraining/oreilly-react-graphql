import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Error from './Error';
import * as serviceWorker from './serviceWorker';
import ApolloClient from 'apollo-boost';
import { ApolloProvider, Query } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory'
import gql from 'graphql-tag';

const cache = new InMemoryCache();
export const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  onError: (({ operation, graphQLErrors, networkError }) => {
    console.log('Errors ===> ', graphQLErrors);
    console.log('Network error', networkError);
    const { cache } = operation.getContext();
    if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path }) => {
        cache.writeData({
          data: {
            error: message,
          },
        });
        console.log('error message', message);
        if (message === 'Unauthorized' || message === 'Context creation failed: Session expired') {
          localStorage.removeItem('token');
        }
        return message;
      });
    }
  }),
  cache,
  request: async operation => {
    const token = await localStorage.getItem('token');
    if (token) {
      operation.setContext({
        headers: {
          'x-auth-token': token
        }
      });
    } else {
      operation.setContext();
    }
  }
});

cache.writeData({
  data: {
    error: ''
  }
});

const ERROR_QUERY = gql`
query error {
  error @client
}
`;

ReactDOM.render(
  <ApolloProvider client={client}>
    <Query query={ERROR_QUERY}>
      {({ data }) => {
        console.log(data);
        return (data && data.error) ?
        <React.Fragment>
          <Error message={data.error} />
          <App />
        </React.Fragment> : 
          <App />;
        // return  <App />;
      }}
    </Query>
  </ApolloProvider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
