import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { UserSession } from '../../utils/user-session';

const useStyles = makeStyles({
  userPanelStyles: {
    position: 'fixed',
    top: 10,
    right: 10,
  },
  loggedUserPanelStyles: {
    display: 'flex',
    gap: 5,
  },
});

export function UserPanel() {
  const { userPanelStyles } = useStyles();

  return <div className={userPanelStyles}>{UserSession.isActive ? <LoggedUserPanel /> : <UnloggedUserPanel />}</div>;
}

function UnloggedUserPanel() {
  const { loggedUserPanelStyles } = useStyles();

  return (
    <div className={loggedUserPanelStyles}>
      <Button variant="outlined" component={Link} to="/login">
        Zaloguj się
      </Button>
      <Button variant="outlined" component={Link} to="/register">
        Zarejestruj się
      </Button>
    </div>
  );
}

function LoggedUserPanel() {
  const { loggedUserPanelStyles } = useStyles();

  return (
    <div className={loggedUserPanelStyles}>
      <Button variant="outlined" component={Link} to={`/profile/${UserSession.userId}`}>
        Moje konto
      </Button>
      <Button variant="outlined" onClick={UserSession.removeToken}>
        Wyloguj się
      </Button>
    </div>
  );
}
