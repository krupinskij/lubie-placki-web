import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { UserSession } from '../../utils/user-session';

interface StylesProps {
  private: boolean | undefined;
}

const useStyles = makeStyles({
  navbarItemStyles: {
    margin: 10,
  },
  navbarLinkStyles: {
    textDecoration: 'none',
    margin: 10,
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

export function NavbarLink({ to, title, privateLink }: NavbarLinkProps) {
  const { navbarItemStyles, navbarLinkStyles } = useStyles({
    private: privateLink && !UserSession.isActive,
  });

  return (
    <Typography className={navbarItemStyles}>
      <Link className={navbarLinkStyles} to={to}>
        {title}
      </Link>
    </Typography>
  );
}
