import { Box, Input } from '@chakra-ui/core';
import React from 'react';

const SuggestionCard = () => {
  return (
    <Box
      bg="white"
      borderWidth="1px"
      rounded="xl"
      p={[5, 8, 10]}
      boxShadow="md"
      borderColor="gray.200"
    >
      <Input placeholder="Basic usage" />
    </Box>
  );
};

export default SuggestionCard;
