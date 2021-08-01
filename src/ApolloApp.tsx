import App from './App';

import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink, fromPromise } from 'apollo-link';
import { setContext } from 'apollo-link-context';
import { createUploadLink } from 'apollo-upload-client';
import { ApolloProvider } from 'react-apollo';
import { onError } from 'apollo-link-error';

import { REFRESH_TOKEN_QUERY } from './graphql/refresh-token.query';
import config from './config';
import { UserSession } from './utils/user-session';

let client: ApolloClient<NormalizedCacheObject>;

const authLink = setContext((request, { headers }) => {
  const token = UserSession.getToken();
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

const getNewToken = () => {
  return client
    .query({
      query: REFRESH_TOKEN_QUERY,
      variables: {
        refreshToken: UserSession.getRefreshToken(),
      },
    })
    .then((response) => {
      return response.data?.refreshToken?.token;
    });
};

const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    for (let err of graphQLErrors) {
      switch (err?.message) {
        case 'Unauthorized':
          return fromPromise(
            getNewToken().catch((error) => {
              UserSession.removeToken();
              return;
            }),
          )
            .filter((value) => Boolean(value))
            .flatMap((accessToken) => {
              const oldHeaders = operation.getContext().headers;
              UserSession.saveToken(accessToken);
              operation.setContext({
                headers: {
                  ...oldHeaders,
                  authorization: `Bearer ${accessToken}`,
                },
              });

              return forward(operation);
            });
      }
    }
  }
});

client = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, httpLink]),
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
