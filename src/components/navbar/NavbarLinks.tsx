import React from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    navbarLink: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '5px',
    },
    navbarTopLinks: {
      color: 'white',
      backgroundColor: theme.palette.primary.main,
    },
    navbarBottomLinks: {
      color: 'black',
      backgroundColor: 'white',
    },
  }),
);

interface NavbarLinksProps {
  children: React.ReactNode;
}

export function NavbarTopLinks({ children }: NavbarLinksProps) {
  const { navbarLink, navbarTopLinks } = useStyles();
  return <div className={`${navbarLink} ${navbarTopLinks}`}>{children}</div>;
}

export function NavbarBottomLinks({ children }: NavbarLinksProps) {
  const { navbarLink, navbarBottomLinks } = useStyles();
  return <div className={`${navbarLink} ${navbarBottomLinks}`}>{children}</div>;
}
