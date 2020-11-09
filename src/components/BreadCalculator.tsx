import React, { useEffect, useState } from 'react';
import {
  Box,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Text,
  Stack,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Heading,
} from '@chakra-ui/core';

const BreadCalculator = () => {
  const format = (val: number): string => `${val} gram`;
  const parse = (val: string): number => Number(val.replace(' gram', ''));
  const [flour, setFlour] = useState(500);
  const [water, setWater] = useState(325);
  const [salt, setSalt] = useState(10);
  const [sourdough, setSourdough] = useState(100);
  const [sourdoughRatio, setSourdoughRatio] = useState(50);
  const dough = flour + water + salt + sourdough;
  const [liquids, setLiquids] = useState(water);
  const inputPattern = '[0-9]*(.[0-9]+)? gram';
  useEffect(() => {
    const sourDoughLiquid = (sourdough * sourdoughRatio) / 100;
    const sourDoughFlour = sourdough - sourDoughLiquid;
    setLiquids(water + sourDoughLiquid);
  }, [water, sourdoughRatio, sourdough]);
  return (
    <Box
      border="1px"
      boxShadow="md"
      borderColor="gray.200"
      p="6"
      rounded="md"
      bg="white"
    >
      <Stack mb="2">
        <Text fontSize="xl" fontWeight="bold">
          Dough will weight {dough} gram
        </Text>
        <Text>Hydratation is {((liquids / flour) * 100).toPrecision(3)}%</Text>
      </Stack>

      <Stack>
        <Text fontSize="xl">Flour ({Math.floor((flour / dough) * 100)}%)</Text>
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
        <Text fontSize="xl">Water ({Math.floor((water / dough) * 100)}%)</Text>
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
        <Text fontSize="xl">Salt ({Math.floor((salt / dough) * 100)}%)</Text>
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
        <Slider flex="1" value={sourdoughRatio} onChange={setSourdoughRatio}>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb fontSize="sm" boxSize="32px">
            {sourdoughRatio}%
          </SliderThumb>
        </Slider>
      </Stack>
    </Box>
  );
};

export default BreadCalculator;
