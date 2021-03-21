import React from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';

interface StylesProps {
  backgroundColor: string;
  color: string;
}

const useStyles = makeStyles({
  navbarLinkStyles: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    backgroundColor: (props: StylesProps) => props.backgroundColor,
    color: (props: StylesProps) => props.color,
  },
});

interface NavbarLinksProps {
  children: React.ReactNode;
}

export function NavbarTopLinks({ children }: NavbarLinksProps) {
  const { palette } = useTheme();
  const { navbarLinkStyles } = useStyles({
    backgroundColor: palette.primary.main,
    color: 'white',
  });
  return <div className={navbarLinkStyles}>{children}</div>;
}

export function NavbarBottomLinks({ children }: NavbarLinksProps) {
  const { navbarLinkStyles } = useStyles({
    backgroundColor: 'white',
    color: 'black',
  });
  return <div className={navbarLinkStyles}>{children}</div>;
}
