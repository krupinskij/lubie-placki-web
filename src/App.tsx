import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import { ApolloProvider } from 'react-apollo';
import { ApolloLink } from 'apollo-link';
import { createUploadLink } from 'apollo-upload-client';
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory';

import Navbar from './components/navbar/Navbar';
import { UserPanel } from './components/user-panel/UserPanel';
import { Page } from './templates/Page';
import { LoginPage } from './views/login-page/LoginPage';
import { RegisterPage } from './views/register-page/RegisterPage';

import config from './config';
import { HomePage } from './views/home-page/HomePage';
import { RecipePage } from './views/recipe-page/RecipePage';
import { RandomRoute } from './components/shared/RandomRoute';
import { PrivateRoute } from './components/shared/PrivateRoute';
import { CreateRecipePage } from './views/create-recipe-page/CreateRecipePage';

import { setContext } from 'apollo-link-context';

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(config.TOKEN_KEY);
  return token ? {
    headers: {
      ...headers,
      authorization: `Bearer ${token}`
    }
  } : {
    headers
  }
});

const httpLink = createUploadLink({
  uri: config.API_URL,
});

const client = new ApolloClient({
  link: ApolloLink.from([
    authLink,
    httpLink
  ]),
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Page>
          <Navbar/>
          <UserPanel/>
          <Route exact path='/' component={HomePage} />
          <RandomRoute path='/random' />
          <Route path='/recipe/:id' component={RecipePage} />
          <PrivateRoute path='/create' component={CreateRecipePage} />

          <Route path='/login' component={LoginPage} />
          <Route path='/register' component={RegisterPage} />
        </Page>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
