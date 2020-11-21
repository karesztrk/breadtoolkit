import React from 'react';
import '@app/App.css';
import '@app/fonts.css';
import { ChakraProvider } from '@chakra-ui/core';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Meta from '@app/components/layout/Meta';
import theme from '@app/theme';
import Layout from './components/layout/Layout';

const App = () => {
  return (
    <Router>
      <ChakraProvider theme={theme}>
        <Meta />
        <Layout />
      </ChakraProvider>
    </Router>
  );
};

export default App;
