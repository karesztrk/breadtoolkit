import { Container, Flex } from '@chakra-ui/core';
import React from 'react';
import Link from 'next/link';
import Menu from '@/components/common/Menu';
import Brand from '@/components/icons/BrandIcon';

const Header = () => {
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
          <Link href="/">
            <Brand w={9} h={9} cursor="pointer" />
          </Link>
          <Menu />
        </Flex>
      </Container>
    </Flex>
  );
};

export default Header;
