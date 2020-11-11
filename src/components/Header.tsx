import { Flex } from '@chakra-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Menu from './Menu';
import Brand from './Brand';

const Header = () => {
  const [t] = useTranslation();
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
          <Brand />
        </Link>
      </Flex>
      <Menu />
    </Flex>
  );
};

export default Header;
