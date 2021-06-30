import { BrowserRouter, Route } from 'react-router-dom';

import { Page } from './components/shared/Page';
import { Navbar } from './components/navbar/Navbar';
import { Footer } from './components/footer/Footer';

import { RandomRoute } from './components/shared/RandomRoute';
import { PrivateRoute } from './components/shared/PrivateRoute';
import { UnloggedRoute } from './components/shared/UnloggedRoute';

import { CreateRecipePage } from './views/CreateRecipePage';
import { FavouritePage } from './views/FavouritePage';
import { HomePage } from './views/HomePage';
import { LoginPage } from './views/LoginPage';
import { RecipePage } from './views/RecipePage';
import { RegisterPage } from './views/RegisterPage';

function App() {
  return (
    <BrowserRouter>
      <Page>
        <Navbar />
        <Route exact path="/" component={HomePage} />
        <RandomRoute path="/random" />
        <Route path="/recipe/:id" component={RecipePage} />
        <PrivateRoute path="/create" component={CreateRecipePage} />
        <PrivateRoute path="/fav" component={FavouritePage} />
        <UnloggedRoute path="/login" component={LoginPage} />
        <UnloggedRoute path="/register" component={RegisterPage} />
        <Footer />
      </Page>
    </BrowserRouter>
  );
}

export default App;
