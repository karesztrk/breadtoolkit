import React from 'react';
import './App.css';
import './fonts.css';
import { ThemeProvider, CSSReset, Box, Flex } from '@chakra-ui/core';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import BreadCalculator from '@app/components/pages/BreadCalculator';
import Header from '@app/components/layout/Header';
import Footer from '@app/components/layout/Footer';
import Home from '@app/components/pages/Home';
import Meta from '@app/components/layout/Meta';
import Divider from '@app/components/common/Divider';
import background4K from '@app/assets/images/bg/light/4k.jpg';
import backgroundFHD from '@app/assets/images/bg/light/fhd.jpg';
import backgroundHD from '@app/assets/images/bg/light/hd.jpg';
import theme from './theme';

const App = () => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CSSReset />
        <Meta />
        <Flex
          height="100vh"
          direction="column"
          backgroundImage={[
            `url(${backgroundHD})`,
            `url(${backgroundFHD})`,
            `url(${background4K})`,
          ]}
          backgroundSize="cover"
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
        >
          <Header />
          <Box as="main" flexGrow={1}>
            <Route path="/" component={Home} exact />
            <Route path="/calculator" component={BreadCalculator} />
          </Box>
          <Divider color="white" />
          <Footer />
        </Flex>
      </ThemeProvider>
    </Router>
  );
};

export default App;
