import App from './App';

import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { createUploadLink } from 'apollo-upload-client';
import { ApolloProvider } from 'react-apollo';

import config from './config';

const authLink = setContext((request, { headers }) => {
  console.log(request);
  const token = localStorage.getItem(config.TOKEN_KEY);
  return token
    ? {
        headers: {
          ...headers,
          authorization: `Bearer ${token}`,
        },
      }
    : {
        headers,
      };
});

const httpLink = createUploadLink({
  uri: `${config.API_URL}/graphql`,
});

const client = new ApolloClient({
  link: ApolloLink.from([authLink, httpLink]),
  cache: new InMemoryCache(),
});

function ApolloApp() {
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
}

export default ApolloApp;
