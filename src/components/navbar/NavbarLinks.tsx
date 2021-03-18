import React from 'react';
import { Link } from 'react-router-dom';
import { UserSession } from '../../utils/user-session';

import './NavbarLinks.scss';

interface NavbarLinksProps {
  position: 'top' | 'bottom';
  children: React.ReactNode;
}

export function NavbarLinks({ position, children }: NavbarLinksProps) {
  return <div className={`navbar-links navbar-links--${position}`}>{children}</div>;
}

interface NavbarLinkProps {
  to: string;
  title: string;
  privateLink?: boolean;
}

export function NavbarLink({ to, title, privateLink }: NavbarLinkProps) {
  return (
    <div className="navbar-item">
      <Link className={`navbar-link ${privateLink && !UserSession.isActive ? 'disabled' : ''}`} to={to}>
        {title}
      </Link>
    </div>
  );
}
