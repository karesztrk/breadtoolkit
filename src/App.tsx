import React, { useState } from 'react';
import './App.css';
import {
  ThemeProvider,
  theme,
  CSSReset,
  Flex,
  Box,
  Heading,
  Container,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Text,
  Stack,
} from '@chakra-ui/core';

const App = () => {
  const format = (val: number): string => `${val} gram`;
  const parse = (val: string): number => Number(val.replace(' gram', ''));
  const [flour, setFlour] = useState(500);
  const [water, setWater] = useState(330);
  const [salt, setSalt] = useState(10);
  const [sourdough, setSourdough] = useState(100);
  const dough = flour + water + salt + sourdough;
  const inputPattern = '[0-9]*(.[0-9]+)? gram';
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <Container>
        <Heading as="h1" size="2xl" mb="2">
          Baking delicious 🍞 using BreadTookit
        </Heading>
        <Box
          border="1px"
          boxShadow="md"
          borderColor="gray.200"
          p="6"
          rounded="md"
          bg="white"
        >
          <Text>Dough weight: {dough} gram</Text>

          <Stack>
            <Text fontSize="xl">
              Flour ({Math.floor((flour / dough) * 100)}%)
            </Text>
            <NumberInput
              value={format(flour)}
              min={1}
              step={1}
              onChange={(value) => setFlour(parse(value))}
              allowMouseWheel
              pattern={inputPattern}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <Text fontSize="xl">
              Water ({Math.floor((water / dough) * 100)}%)
            </Text>
            <NumberInput
              value={format(water)}
              min={1}
              step={1}
              onChange={(value) => setWater(parse(value))}
              allowMouseWheel
              pattern={inputPattern}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <Text fontSize="xl">
              Salt ({Math.floor((salt / dough) * 100)}%)
            </Text>
            <NumberInput
              value={format(salt)}
              min={1}
              step={1}
              onChange={(value) => setSalt(parse(value))}
              allowMouseWheel
              pattern={inputPattern}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <Text fontSize="xl">
              Sourdough ({Math.floor((sourdough / dough) * 100)}%)
            </Text>
            <NumberInput
              value={format(sourdough)}
              min={1}
              step={1}
              onChange={(value) => setSourdough(parse(value))}
              allowMouseWheel
              pattern={inputPattern}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Stack>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default App;
