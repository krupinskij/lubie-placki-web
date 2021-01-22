import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import { UserPanel } from './components/user-panel/UserPanel';
import { Page } from './templates/Page';

function App() {
  return (
    <BrowserRouter>
      <Page>
        <Navbar/>
        <UserPanel/>
      </Page>
    </BrowserRouter>
  );
}

export default App;
