import { Redirect, Route } from 'react-router';

import { UserSession } from '../../utils/user-session';

export function UnloggedRoute({ component: Component, ...rest }: any) {
  return (
    <Route {...rest} render={(props) => (UserSession.isActive ? <Redirect to="/" /> : <Component {...props} />)} />
  );
}
