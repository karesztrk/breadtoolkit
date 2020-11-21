import { Box } from '@chakra-ui/core';
import React, { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';

const GridItem: FC<{ children: ReactNode[] | ReactNode }> = ({ children }) => {
  return (
    <Link to="/calculator">
      <Box
        bg="white"
        borderWidth="1px"
        rounded="xl"
        p={[5, 8, 10]}
        boxShadow="md"
        borderColor="gray.200"
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
