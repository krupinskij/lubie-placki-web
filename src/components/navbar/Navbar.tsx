import NavbarHeader from './NavbarHeader';
import { NavbarTopLinks, NavbarBottomLinks } from './NavbarLinks';
import { NavbarLink } from './NavbarLink';

import { AppBar, makeStyles } from '@material-ui/core';
import { UserPanel } from '../user-panel/UserPanel';

const useStyles = makeStyles({
  navbarStyles: {
    backgroundColor: 'white',
    color: 'black',
  },
});

export function Navbar() {
  const { navbarStyles } = useStyles();

  return (
    <AppBar className={navbarStyles} position="fixed">
      <UserPanel />

      <NavbarHeader title="Lubię Placki" />

      <NavbarTopLinks>
        <NavbarLink to="/" title="Przepisy" />
        <NavbarLink to="/random" title="Losuj" />
        <NavbarLink to="/create" title="Dodaj" privateLink={true} />
        <NavbarLink to="/top" title="Topka" />
      </NavbarTopLinks>

      <NavbarBottomLinks>
        <NavbarLink to="/type/makowiec" title="Makowce" />
        <NavbarLink to="/type/sernik" title="Serniki" />
        <NavbarLink to="/type/piernik" title="Pierniki" />
      </NavbarBottomLinks>
    </AppBar>
  );
}
