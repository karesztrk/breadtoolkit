import { Container, Flex } from '@chakra-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Menu from '@app/components/common/Menu';
import Brand from '@app/components/common/Brand';

const Header = () => {
  const [t] = useTranslation();
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="3"
      bg="brand.400"
      color="gray.200"
    >
      <Container maxW="xl">
        <Flex align="center" mr={5} justifyContent="space-between">
          <Link to="/">
            <Brand />
          </Link>
          <Menu />
        </Flex>
      </Container>
    </Flex>
  );
};

export default Header;
