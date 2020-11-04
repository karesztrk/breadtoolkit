import React, { useState } from 'react';
import './App.css';
import {
  ThemeProvider,
  theme,
  CSSReset,
  Button,
  Heading,
  Container,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/core';

const App = () => {
  const [flour, setFlour] = useState(500);
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <Container>
        <Heading as="h1" size="2xl" mb="2">
          I just consumed some ⚡️Chakra!
        </Heading>
        {flour}gram
        <Button onClick={() => setFlour((prevState) => prevState - 1)}>
          -
        </Button>
        <Button onClick={() => setFlour((prevState) => prevState + 1)}>
          +
        </Button>
        <NumberInput defaultValue={500} min={1} step={1}>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </Container>
    </ThemeProvider>
  );
};

export default App;
