import React from 'react';
import { Image, Flex, Heading } from '@chakra-ui/core';
import logo from '@app/assets/icons/logo.svg';

const Brand = () => {
  return (
    <Flex alignItems="center" direction="row">
      <Image height="60px" src={logo} alt="logo" />
      <Heading as="h1" size="lg" letterSpacing={'-.1rem'} mx="2">
        Bread Toolkit
      </Heading>
    </Flex>
  );
};

export default Brand;
