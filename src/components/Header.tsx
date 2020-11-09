import { Image, Box, Flex, Heading, Text } from '@chakra-ui/core';
import React from 'react';
import logo from '../assets/logo.svg';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="5"
      bg="cyan.800"
      color="white"
      mb="10"
    >
      <Flex align="center" mr={5} justifyContent="space-between">
        <Link to="/">
          <Flex alignItems="center" direction="row">
            <Image height="60px" src={logo} alt="logo" />
            <Heading as="h1" size="lg" letterSpacing={'-.1rem'} mx="2">
              Bread toolkit
            </Heading>
          </Flex>
        </Link>
      </Flex>

      <Box alignItems="center">
        <Text mr={6} display="block">
          <Link to="/calculator">Calculator</Link>
        </Text>
      </Box>
    </Flex>
  );
};

export default Header;
