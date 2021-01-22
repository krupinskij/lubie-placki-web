import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import { Page } from './templates/Page';

function App() {
  return (
    <BrowserRouter>
      <Page>
        <Navbar/>
      </Page>
    </BrowserRouter>
  );
}

export default App;
