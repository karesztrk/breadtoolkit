import React from 'react';
import './App.css';
import {
  ThemeProvider,
  theme,
  CSSReset,
  Container,
  Flex,
} from '@chakra-ui/core';
import BreadCalculator from './components/BreadCalculator';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <Flex height="100vh" direction="column">
        <Header />
        <Container as="main" flexGrow="1">
          <BreadCalculator />
        </Container>
        <Footer />
      </Flex>
    </ThemeProvider>
  );
};

export default App;
