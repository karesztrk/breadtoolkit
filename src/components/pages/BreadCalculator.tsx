import React, { useEffect, useState } from 'react';
import {
  Container,
  Heading,
  Box,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Stack,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  IconButton,
  Flex,
  FormControl,
  FormLabel,
  FormHelperText,
  Text,
  useColorMode,
  Kbd,
} from '@chakra-ui/core';
import { RepeatClockIcon } from '@chakra-ui/icons';
import { useTranslation } from 'react-i18next';
import {
  loadCalculatorSettings,
  saveCalculatorSettings,
  defaultSettings,
  Settings,
} from '@app/util/calculatorUtil';

const BreadCalculator = () => {
  const [t] = useTranslation();
  const { colorMode } = useColorMode();

  const [flour, setFlour] = useState(0);
  const [water, setWater] = useState(0);
  const [salt, setSalt] = useState(0);
  const [sourdough, setSourdough] = useState(0);
  const [sourdoughRatio, setSourdoughRatio] = useState(0);
  const dough = flour + water + salt + sourdough;
  const [liquids, setLiquids] = useState(water);

  let hydratation: string;
  if (flour < 1) {
    hydratation = '100';
  } else if (liquids > flour) {
    hydratation = '100+';
  } else {
    hydratation = ((liquids / flour) * 100).toPrecision(3);
  }

  useEffect(() => {
    const settings = loadCalculatorSettings();
    loadSettings(settings);
  }, []);

  useEffect(() => {
    saveCalculatorSettings({
      flour,
      water,
      salt,
      sourdough,
      sourdoughRatio,
    });
  }, [flour, water, salt, sourdough, sourdoughRatio]);

  useEffect(() => {
    const sourDoughLiquid = (sourdough * sourdoughRatio) / 100;
    const sourDoughFlour = sourdough - sourDoughLiquid;
    setLiquids(water + sourDoughLiquid);
  }, [water, sourdoughRatio, sourdough]);

  const onResetClick = () => loadSettings(defaultSettings);

  const loadSettings = ({
    flour,
    water,
    salt,
    sourdough,
    sourdoughRatio,
  }: Settings) => {
    setFlour(flour);
    setWater(water);
    setSalt(salt);
    setSourdough(sourdough);
    setSourdoughRatio(sourdoughRatio);
  };

  const gramText = t('calculator.gram.text');
  const format = (val: number): string => `${val} ${gramText}`;
  const parse = (val: string): number =>
    Number(val.replace(` ${gramText}`, ''));
  const inputPattern = `[0-9]*(.[0-9]+)? ${gramText}`;
  return (
    <Container maxW="xl">
      <Heading
        fontFamily="hero"
        fontSize={['3rem', '4rem', '5rem']}
        textTransform="uppercase"
        color={colorMode === 'light' ? 'brand.300' : 'brand.100'}
        opacity={colorMode === 'light' ? 0.3 : 0.8}
        my={10}
        lineHeight={1}
      >
        {t('calculator.title')}
      </Heading>
      <Box
        boxShadow="2xl"
        p="6"
        rounded="xl"
        bg={colorMode === 'light' ? 'white' : '#393432'}
        color={colorMode === 'light' ? 'brand.400' : 'brand.100'}
        maxWidth="md"
        margin="0 auto"
      >
        <Flex justify="space-between" mb={5}>
          <Stat>
            <StatLabel>{t('calculator.doughWeight.text')}</StatLabel>
            <StatNumber>
              {dough}&nbsp;{gramText}
            </StatNumber>
            <StatHelpText>{`${t(
              'calculator.hydratation.text',
            )} ${hydratation}%`}</StatHelpText>
          </Stat>
          <IconButton
            onClick={onResetClick}
            variant="outline"
            aria-label="Reset settings"
            icon={<RepeatClockIcon />}
          />
        </Flex>

        <Stack>
          <FormControl mb={2}>
            <FormLabel>{`${t('calculator.flour.label')} (${Math.floor(
              (flour / dough) * 100,
            )}%)`}</FormLabel>
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
            <span>
              (<Kbd>{t('calculator.flour.hint')}</Kbd> + ) <Kbd>&uarr;</Kbd>
              &nbsp;or&nbsp;
              <Kbd>&darr;</Kbd>
            </span>
          </FormControl>

          <FormControl mb={2}>
            <FormLabel>{`${t('calculator.water.label')} (${Math.floor(
              (water / dough) * 100,
            )}%)`}</FormLabel>
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
          </FormControl>

          <FormControl mb={2}>
            <FormLabel>{`${t('calculator.salt.label')} (${Math.floor(
              (salt / dough) * 100,
            )}%)`}</FormLabel>
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
          </FormControl>

          <FormControl mb={2}>
            <FormLabel>{`${t('calculator.sourdough.label')} (${Math.floor(
              (sourdough / dough) * 100,
            )}%)`}</FormLabel>

            <Stack direction={['column', 'row']} spacing={5}>
              <NumberInput
                flex={1}
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
              <Slider
                flex={1}
                colorScheme="orange"
                value={sourdoughRatio}
                onChange={setSourdoughRatio}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb fontSize="sm" boxSize="32px">
                  <Text color="brand.400">{sourdoughRatio}%</Text>
                </SliderThumb>
              </Slider>
            </Stack>
            <FormHelperText>{t('calculator.sourdough.hint')}</FormHelperText>
          </FormControl>
        </Stack>
      </Box>
    </Container>
  );
};

export default BreadCalculator;
