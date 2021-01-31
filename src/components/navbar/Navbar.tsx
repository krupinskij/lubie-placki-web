import NavbarHeader from './NavbarHeader';
import { NavbarLinks, NavbarLink } from './NavbarLinks';

import './Navbar.scss'

export default function Navbar() {
  return (
		<nav className="navbar">
      <NavbarHeader title="Lubię Placki"/>

      <NavbarLinks position="top">
        <NavbarLink to="/" title="Przepisy"/>
        <NavbarLink to="/random" title="Losuj"/>
        <NavbarLink to="/create" title="Dodaj" privateLink={ true }/>
        <NavbarLink to="/top" title="Topka"/>
      </NavbarLinks>

      <NavbarLinks position="bottom">
        <NavbarLink to="/type/makowiec" title="Makowce"/>
        <NavbarLink to="/type/sernik" title="Serniki"/>
        <NavbarLink to="/type/piernik" title="Pierniki"/>
      </NavbarLinks>
		</nav>
	)
}