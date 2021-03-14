import React from 'react';
import Nav from './Nav';
import Footer from './Footer';
import 'normalize.css';
import GlobalStyles from '../styles/GlobalStyles';
import Typography from '../styles/Typography';

function Layout({ children }) {
  return (
    <>
      <GlobalStyles />
      <Typography />
      <Nav />
      {children}
      <Footer />
    </>
  );
}

export default Layout;
