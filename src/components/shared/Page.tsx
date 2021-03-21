import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  pageStyles: {
    marginTop: 200,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

export const Page: React.FC = ({ children }) => {
  const { pageStyles } = useStyles();

  return <div className={pageStyles}>{children}</div>;
};
