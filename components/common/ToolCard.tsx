import { Box, useColorMode } from '@chakra-ui/core';
import React, { FC, ReactNode } from 'react';
import Link from 'next/link';

const GridItem: FC<{ to: string; children: ReactNode[] | ReactNode }> = ({
  to,
  children,
}) => {
  const { colorMode } = useColorMode();
  return (
    <Link href={to}>
      <Box
        cursor="pointer"
        bg={colorMode === 'light' ? 'white' : '#393432'}
        borderWidth="1px"
        rounded="xl"
        p={[5, 8, 10]}
        boxShadow="md"
        role="group"
        position="relative"
        zIndex={1}
        transition="transform 0.25s ease-in-out"
        overflow="hidden"
      >
        {children}
      </Box>
    </Link>
  );
};

export default GridItem;
