import React from 'react';
import { Link } from 'react-router-dom';

import { UserSession } from '../../utils/user-session';

import classnames from 'classnames';

import './NavbarLinks.scss'

interface NavbarLinksProps {
  position: "top" | "bottom",
  children: React.ReactNode
}

export function NavbarLinks({ position, children }: NavbarLinksProps) {
  return (
			<div className={ classnames('navbar-links', { 'navbar-links--top': position==="top" }, { 'navbar-links--bottom': position==="bottom" }) }>
        {children}
      </div>
	)
}

interface NavbarLinkProps {
  to: string,
  title: string,
  privateLink?: boolean
}

export function NavbarLink({ to, title, privateLink }: NavbarLinkProps) {
  return (
    <div className="navbar-item">
      <Link className={ classnames('navbar-link', { disabled: privateLink && !UserSession.isActive }) } to={to}>
        {title}
      </Link>
    </div>
	)
}