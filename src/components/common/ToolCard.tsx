import { Box, Flex, Heading, HStack, Stack, Text } from '@chakra-ui/core';
import React, { FC } from 'react';
import CalculatorIcon from '../icons/CalculatorIcon';

const ToolCard: FC<{ title: string; description: string }> = ({
  title,
  description,
}) => {
  return (
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
      // _hover={{
      //   boxShadow: 'md',
      //   transform: 'scale(1.05)',
      // }}
      transition="all 0.1s ease-in-out"
    >
      <CalculatorIcon
        fontSize="5rem"
        width="100%"
        // position="relative"
        // zIndex={1}
      />
      <Heading
        as="h3"
        size="2xl"
        color="brand.300"
        opacity={0.3}
        // position="absolute"
        // bottom="3rem"
        // left={0}
        // right={0}
        // zIndex={0}
        lineHeight={0.3}
        textAlign="center"
      >
        {title}
      </Heading>
      {/* <Text>{description}</Text> */}
    </Box>
  );
};

export default ToolCard;
