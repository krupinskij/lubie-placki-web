import { Link } from 'react-router-dom';
import { UserSession } from '../../utils/user-session';

import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  navbarItem: {
    margin: '10px',
  },
  navbarLink: {
    textDecoration: 'none',
    margin: '10px',
    padding: '10px 0',
    color: (props: StylesProps) => (props.private ? 'gray' : 'inherit'),
    pointerEvents: (props: StylesProps) => (props.private ? 'none' : 'inherit'),
    userSelect: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
});

interface NavbarLinkProps {
  to: string;
  title: string;
  privateLink?: boolean;
}

interface StylesProps {
  private: boolean | undefined;
}

export function NavbarLink({ to, title, privateLink }: NavbarLinkProps) {
  const { navbarItem, navbarLink } = useStyles({
    private: privateLink && !UserSession.isActive,
  });

  return (
    <div className={navbarItem}>
      <Link className={navbarLink} to={to}>
        {title}
      </Link>
    </div>
  );
}
