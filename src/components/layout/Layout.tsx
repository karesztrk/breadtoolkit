import { Box, Flex, useColorMode } from '@chakra-ui/core';
import React from 'react';
import { Route } from 'react-router-dom';
import Divider from '@app/components/common/Divider';
import Header from '@app/components/layout/Header';
import Home from '@app/components/pages/Home';
import BreadCalculator from '@app/components/pages/BreadCalculator';
import Contact from '@app/components/pages/Contact';
import Footer from '@app/components/layout/Footer';
import lightBackground4K from '@app/assets/images/bg/light/4k.webp';
import lightBackgroundFHD from '@app/assets/images/bg/light/fhd.webp';
import lightBackgroundHD from '@app/assets/images/bg/light/hd.webp';
import darkBackground4K from '@app/assets/images/bg/dark/4k.webp';
import darkBackgroundFHD from '@app/assets/images/bg/dark/fhd.webp';
import darkBackgroundHD from '@app/assets/images/bg/dark/hd.webp';

const Layout = () => {
  const { colorMode } = useColorMode();
  const backgroundImage =
    colorMode === 'light'
      ? [
          `url(${lightBackgroundHD})`,
          `url(${lightBackgroundFHD})`,
          `url(${lightBackground4K})`,
        ]
      : [
          `url(${darkBackgroundHD})`,
          `url(${darkBackgroundFHD})`,
          `url(${darkBackground4K})`,
        ];
  return (
    <Flex
      minHeight="100vh"
      direction="column"
      backgroundImage={backgroundImage}
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
    >
      <Header />
      <Box as="main" flexGrow={1}>
        <Route path="/" component={Home} exact />
        <Route path="/calculator" component={BreadCalculator} />
        <Route path="/contact" component={Contact} />
      </Box>
      <Divider color={colorMode === 'light' ? 'white' : '#3B3437'} />
      <Footer />
    </Flex>
  );
};

export default Layout;
