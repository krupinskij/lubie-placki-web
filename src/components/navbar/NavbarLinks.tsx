import React from 'react';
import { Link } from 'react-router-dom';

import './NavbarLinks.scss'

interface NavbarLinksProps {
  position: "top" | "bottom",
  children: React.ReactNode
}

export function NavbarLinks({ position, children }: NavbarLinksProps) {
  return (
			<div className={`navbar-links navbar-links--${position}`}>
        {children}
      </div>
	)
}

interface NavbarLinkProps {
  to: string,
  title: string
}

export function NavbarLink({ to, title }: NavbarLinkProps) {
  return (
    <div className="navbar-item">
      <Link className="navbar-link" to={to}>
        {title}
      </Link>
    </div>
	)
}