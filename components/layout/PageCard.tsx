import { Box, useColorModeValue, ChakraProps } from '@chakra-ui/react';
import React, { FC } from 'react';

interface PageProps extends ChakraProps {
  as?: any;
}

const Page: FC<PageProps> = ({ as = 'div', children, p = 6, ...rest }) => (
  <Box
    as={as}
    p={p}
    rounded="xl"
    bg={useColorModeValue('white', '#393432')}
    color={useColorModeValue('brand.400', 'brand.100')}
    maxWidth="md"
    margin="0 auto"
    border={useColorModeValue('', '1px')}
    borderColor={useColorModeValue('', 'rgba(255, 255, 255, 0.15)')}
    boxShadow={useColorModeValue('0 0 10px rgba(59, 52, 55, 0.4)', '')}
    {...rest}
  >
    {children}
  </Box>
);

export default Page;
