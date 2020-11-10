import React from 'react';
import './App.css';
import {
  ThemeProvider,
  theme,
  CSSReset,
  Container,
  Flex,
} from '@chakra-ui/core';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import BreadCalculator from '@app/components/BreadCalculator';
import Header from '@app/components/Header';
import Footer from '@app/components/Footer';
import Home from '@app/components/Home';

const App = () => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CSSReset />
        <Flex height="100vh" direction="column">
          <Header />
          <Container as="main" flexGrow={1}>
            <Route path="/" component={Home} exact />
            <Route path="/calculator" component={BreadCalculator} />
          </Container>
          <Footer />
        </Flex>
      </ThemeProvider>
    </Router>
  );
};

export default App;
