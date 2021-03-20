import { Redirect, Route } from 'react-router';
import { UserSession } from '../../utils/user-session';

export function PrivateRoute({ component: Component, ...rest }: any) {
  return <Route {...rest} render={(props) => (true ? <Component {...props} /> : <Redirect to="/" />)} />;
}
