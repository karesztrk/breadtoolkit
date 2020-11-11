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
} from '@chakra-ui/core';
import { useTranslation } from 'react-i18next';

const BreadCalculator = () => {
  const [t] = useTranslation();
  const gramText = t('calculator.gram.text');
  const format = (val: number): string => `${val} ${gramText}`;
  const parse = (val: string): number =>
    Number(val.replace(` ${gramText}`, ''));
  const [flour, setFlour] = useState(500);
  const [water, setWater] = useState(325);
  const [salt, setSalt] = useState(10);
  const [sourdough, setSourdough] = useState(100);
  const [sourdoughRatio, setSourdoughRatio] = useState(50);
  const dough = flour + water + salt + sourdough;
  const [liquids, setLiquids] = useState(water);
  const inputPattern = `[0-9]*(.[0-9]+)? ${gramText}`;
  let hydratation: string;
  if (flour < 1) {
    hydratation = '100';
  } else if (liquids > flour) {
    hydratation = '100+';
  } else {
    hydratation = ((liquids / flour) * 100).toPrecision(3);
  }
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
          {t('calculator.doughWeight.text')}
          &nbsp;{dough}&nbsp;
          {gramText}
        </Text>
        <Text>{`${t('calculator.hydratation.text')} ${hydratation}%`}</Text>
      </Stack>

      <Stack>
        <Text fontSize="xl">{`${t('calculator.flour.label')} (${Math.floor(
          (flour / dough) * 100,
        )}%)`}</Text>
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
        <Text fontSize="xl">{`${t('calculator.water.label')} (${Math.floor(
          (water / dough) * 100,
        )}%)`}</Text>
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
        <Text fontSize="xl">{`${t('calculator.salt.label')} (${Math.floor(
          (salt / dough) * 100,
        )}%)`}</Text>
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
        <Text fontSize="xl">{`${t('calculator.sourdough.label')} (${Math.floor(
          (sourdough / dough) * 100,
        )}%)`}</Text>
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
