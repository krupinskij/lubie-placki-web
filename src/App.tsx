import { BrowserRouter, Route } from 'react-router-dom';

import { Navbar } from './components/navbar/Navbar';
import { RandomRoute } from './components/shared/RandomRoute';
import { PrivateRoute } from './components/shared/PrivateRoute';
import { UnloggedRoute } from './components/shared/UnloggedRoute';

import { CreateRecipePage } from './views/CreateRecipePage';
import { HomePage } from './views/HomePage';
import { LoginPage } from './views/LoginPage';
import { RecipePage } from './views/RecipePage';
import { RegisterPage } from './views/RegisterPage';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Route exact path="/" component={HomePage} />
      <RandomRoute path="/random" />
      <Route path="/recipe/:id" component={RecipePage} />
      <PrivateRoute path="/create" component={CreateRecipePage} />
      <UnloggedRoute path="/login" component={LoginPage} />
      <UnloggedRoute path="/register" component={RegisterPage} />
    </BrowserRouter>
  );
}

export default App;
