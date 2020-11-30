import React, { useEffect, useState } from 'react';
import {
  Divider,
  Badge,
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
  FormControl,
  FormLabel,
  FormHelperText,
  Text,
  useColorMode,
  Kbd,
  Switch,
  HStack,
  IconButton,
  Flex,
} from '@chakra-ui/core';
import { RepeatClockIcon } from '@chakra-ui/icons';
import { useTranslation } from 'react-i18next';
import {
  loadCalculatorSettings,
  saveCalculatorSettings,
  defaultSettings,
  Settings,
  calcFlourPercent,
  calcWaterPercent,
  calcSaltPercent,
  calcSourDoughPercent,
  calcHydratation,
  calcSourDoughLiquid,
  deriveIngredientsFromGoal,
} from '@/util/calculatorUtil';
import EditableNumericText from '@/components/common/EditableNumericText';
import Head from 'next/head';

const BreadCalculator = () => {
  const [t] = useTranslation();
  const { colorMode } = useColorMode();

  const [bakersMath, setBakersMath] = useState(true);
  const [flour, setFlour] = useState(0);
  const [water, setWater] = useState(0);
  const [salt, setSalt] = useState(0);
  const [sourdough, setSourdough] = useState(0);
  const [sourdoughRatio, setSourdoughRatio] = useState(0);
  const dough = flour + water + salt + sourdough;
  const [liquids, setLiquids] = useState(water);

  const flourPercent = Math.floor(calcFlourPercent(bakersMath, flour, dough));
  const waterPercent = Math.floor(
    calcWaterPercent(bakersMath, flour, water, dough),
  );
  const saltPercent = Math.floor(
    calcSaltPercent(bakersMath, flour, salt, dough),
  );
  const sourDoughPercent = Math.floor(
    calcSourDoughPercent(bakersMath, flour, sourdough, dough),
  );

  useEffect(() => {
    const settings = loadCalculatorSettings();
    loadSettings(settings);
  }, []);

  useEffect(() => {
    saveCalculatorSettings({
      bakersMath,
      flour,
      water,
      salt,
      sourdough,
      sourdoughRatio,
    });
  }, [bakersMath, flour, water, salt, sourdough, sourdoughRatio]);

  useEffect(() => {
    const sourDoughLiquid = calcSourDoughLiquid(
      bakersMath,
      sourdough,
      sourdoughRatio,
    );
    setLiquids(water + sourDoughLiquid);
  }, [water, sourdoughRatio, sourdough, bakersMath]);

  const onResetClick = () => loadSettings(defaultSettings);

  const getSettings = (): Settings => {
    return { bakersMath, flour, water, sourdough, salt, sourdoughRatio };
  };

  const onDoughGoalSubmit = (goal: number) => {
    const { flour, water, sourdough, salt } = deriveIngredientsFromGoal(
      bakersMath,
      goal,
      dough,
      getSettings(),
    );
    setFlour(flour);
    setWater(water);
    setSourdough(sourdough);
    setSalt(salt);
  };

  const loadSettings = ({
    bakersMath,
    flour,
    water,
    salt,
    sourdough,
    sourdoughRatio,
  }: Settings) => {
    setBakersMath(bakersMath);
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
    <>
      <Head>
        <title>Bread Toolkit - Calculator</title>
      </Head>
      <Container maxW="xl">
        <Heading
          fontFamily="hero"
          fontSize={['3rem', '4rem', '5rem']}
          textTransform="uppercase"
          color={colorMode === 'light' ? 'brand.300' : 'brand.100'}
          opacity={colorMode === 'light' ? 0.3 : 0.8}
          my={10}
          lineHeight={1}
          whiteSpace="nowrap"
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
            <Stat flex={2}>
              <StatLabel>{t('calculator.doughWeight.text')}</StatLabel>
              <StatNumber>
                <EditableNumericText
                  value={dough}
                  onSubmit={onDoughGoalSubmit}
                  parser={parse}
                  formatter={format}
                  pattern={inputPattern}
                >
                  {dough}&nbsp;{gramText}
                </EditableNumericText>
              </StatNumber>

              <StatHelpText>{`${t(
                'calculator.hydratation.text',
              )} ${calcHydratation(flour, liquids)}%`}</StatHelpText>
            </Stat>
            <Box flex={1} position="relative">
              <IconButton
                position="absolute"
                right={0}
                onClick={onResetClick}
                variant="outline"
                aria-label="Reset settings"
                icon={<RepeatClockIcon />}
              />
            </Box>
          </Flex>
          <Stack>
            <FormControl mb={2}>
              <FormLabel>{`${t(
                'calculator.flour.label',
              )} (${flourPercent}%)`}</FormLabel>
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
              <Text as="span" display={['none', 'none', 'none', 'inline']}>
                (<Kbd>{t('calculator.flour.hint')}</Kbd> + ) <Kbd>&uarr;</Kbd>
                &nbsp;{t('calculator.flour.hint.separator')}&nbsp;
                <Kbd>&darr;</Kbd>
              </Text>
            </FormControl>

            <FormControl mb={2}>
              <FormLabel>{`${t(
                'calculator.water.label',
              )} (${waterPercent}%)`}</FormLabel>
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
              <FormLabel>{`${t(
                'calculator.salt.label',
              )} (${saltPercent}%)`}</FormLabel>
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

            <FormControl mb={5}>
              <FormLabel>{`${t(
                'calculator.sourdough.label',
              )} (${sourDoughPercent}%)`}</FormLabel>

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
            <Divider mb={2} />
            <HStack>
              <Switch
                isChecked={bakersMath}
                onChange={(e) => setBakersMath(e.target.checked)}
              />
              <Text fontSize="sm">
                {t('calculator.settings.bakersMath.label')}
              </Text>
              <Badge ml="1" colorScheme="green">
                {t('calculator.new.badge')}
              </Badge>
            </HStack>
          </Stack>
        </Box>
      </Container>
    </>
  );
};

export default BreadCalculator;
