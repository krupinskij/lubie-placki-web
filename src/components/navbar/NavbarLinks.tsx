import React from 'react';

import { createStyles, makeStyles, Theme, Typography } from '@material-ui/core';

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
  return <Typography className={`${navbarLink} ${navbarTopLinks}`}>{children}</Typography>;
}

export function NavbarBottomLinks({ children }: NavbarLinksProps) {
  const { navbarLink, navbarBottomLinks } = useStyles();
  return <Typography className={`${navbarLink} ${navbarBottomLinks}`}>{children}</Typography>;
}
