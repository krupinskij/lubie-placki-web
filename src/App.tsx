import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import { ApolloProvider } from 'react-apollo';
import { createUploadLink } from 'apollo-upload-client';
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory';

import Navbar from './components/navbar/Navbar';
import { UserPanel } from './components/user-panel/UserPanel';
import { Page } from './templates/Page';
import { LoginPage } from './views/login/LoginPage';
import { RegisterPage } from './views/register/RegisterPage';

const link = createUploadLink({
  uri: 'http://localhost:3030/graphql',
  credentials: 'include'
});

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Page>
          <Navbar/>
          <UserPanel/>
          <Route path='/login' component={LoginPage} />
          <Route path='/register' component={RegisterPage} />
        </Page>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
