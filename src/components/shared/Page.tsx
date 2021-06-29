import React from 'react';

import { Navbar } from '../navbar/Navbar';
import { Footer } from '../footer/Footer';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  pageStyles: {
    marginTop: 200,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'calc(100vh - 200px)',
  },
});

export const Page: React.FC = ({ children }) => {
  const { pageStyles } = useStyles();

  return (
    <div className={pageStyles}>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};
