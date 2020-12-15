import React, { useEffect, useState, useMemo } from 'react';
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
import {
  loadCalculatorSettings,
  saveCalculatorSettings,
  defaultSettings,
  Settings,
  calcFlourPercent,
  calcIngredientPercent,
  calcHydratation,
  calcSourDoughLiquid,
  deriveIngredientsFromGoal,
  ExtraIngredient,
  ExtraIngredients,
  supportedIngredients,
  calcDoughWeight,
  toggleImperialUnits,
} from '@/service/calculator';
import EditableNumericText from '@/components/common/EditableNumericText';
import { useI18n } from 'next-localization';
import Meta from '@/components/layout/Meta';

const BreadCalculator = () => {
  const { t } = useI18n();
  const { colorMode } = useColorMode();

  const settings = useMemo(() => loadCalculatorSettings(), []);
  const [bakersMath, setBakersMath] = useState(settings.bakersMath);
  const [imperialUnits, setImperialUnits] = useState(false);
  const [dough, setDough] = useState(0);
  const [flour, setFlour] = useState(settings.flour);
  const [water, setWater] = useState(settings.water);
  const [salt, setSalt] = useState(settings.salt);
  const [sourdough, setSourdough] = useState(settings.sourdough);
  const [sourdoughRatio, setSourdoughRatio] = useState(settings.sourdoughRatio);
  const [liquids, setLiquids] = useState(water);
  // Extra ingredients
  const [extras, setExtras] = useState<ExtraIngredients>({});

  const flourPercent = Math.floor(calcFlourPercent(bakersMath, flour, dough));
  const waterPercent = Math.floor(
    calcIngredientPercent(bakersMath, flour, water, dough),
  );
  const saltPercent = Math.floor(
    calcIngredientPercent(bakersMath, flour, salt, dough),
  );
  const sourDoughPercent = Math.floor(
    calcIngredientPercent(bakersMath, flour, sourdough, dough),
  );

  // Unit convertion
  useEffect(() => {
    const derivedIngredients = toggleImperialUnits(
      getSettings(),
      extras,
      imperialUnits,
    );
    setFlour(derivedIngredients.flour);
    setWater(derivedIngredients.water);
    setSalt(derivedIngredients.salt);
    setSourdough(derivedIngredients.sourdough);
    setExtras(derivedIngredients.extras);
  }, [imperialUnits]);

  // Loading
  useEffect(() => {
    const settings = loadCalculatorSettings();
    loadSettings(settings);
  }, []);

  // Saving
  useEffect(() => {
    saveCalculatorSettings({
      bakersMath,
      flour,
      water,
      salt,
      sourdough,
      sourdoughRatio,
      imperialUnits,
    });
  }, [
    bakersMath,
    imperialUnits,
    flour,
    water,
    salt,
    sourdough,
    sourdoughRatio,
  ]);

  // Dough
  useEffect(() => {
    const dough = calcDoughWeight(
      {
        flour,
        water,
        salt,
        sourdough,
      } as Settings,
      extras,
    );
    setDough(dough);
  }, [flour, water, salt, sourdough, extras]);

  // Liquid
  useEffect(() => {
    const sourDoughLiquid = calcSourDoughLiquid(
      bakersMath,
      sourdough,
      sourdoughRatio,
    );
    const extraLiquid: number = Object.values(extras).reduce(
      (accumulator, { disabled, liquid }) => {
        return accumulator + (disabled ? 0 : liquid);
      },
      0,
    );
    setLiquids(water + sourDoughLiquid + extraLiquid);
  }, [water, sourdoughRatio, sourdough, bakersMath, extras]);

  const onResetClick = () => {
    if (imperialUnits) {
      const { flour, water, salt, sourdough } = toggleImperialUnits(
        defaultSettings,
        {},
        imperialUnits,
      );
      loadSettings({
        ...defaultSettings,
        bakersMath,
        imperialUnits,
        flour,
        water,
        salt,
        sourdough,
      });
    } else {
      loadSettings(defaultSettings);
    }
  };

  const getSettings = (): Settings => {
    return {
      bakersMath,
      flour,
      water,
      sourdough,
      salt,
      sourdoughRatio,
      imperialUnits,
    };
  };

  const onDoughGoalSubmit = (goal: number) => {
    const {
      flour,
      water,
      sourdough,
      salt,
      extras: newExtras,
    } = deriveIngredientsFromGoal(goal, getSettings(), extras);
    setFlour(flour);
    setWater(water);
    setSourdough(sourdough);
    setSalt(salt);
    setExtras(newExtras);
  };

  const loadSettings = ({
    bakersMath,
    flour,
    water,
    salt,
    sourdough,
    sourdoughRatio,
    imperialUnits,
  }: Settings) => {
    setBakersMath(bakersMath);
    setImperialUnits(imperialUnits);
    setFlour(flour);
    setWater(water);
    setSalt(salt);
    setSourdough(sourdough);
    setSourdoughRatio(sourdoughRatio);
    setExtras({});
  };

  const toggleExtra = (key: string) => {
    const newState = {
      ...extras,
    };
    if (newState[key]) {
      newState[key].disabled = !newState[key].disabled;
    } else {
      newState[key] = {
        disabled: false,
        amount: 0,
        liquid: 0,
        percent: 0,
      } as ExtraIngredient;
    }
    setExtras(newState);
  };

  const onChangeExtras = (key: string, amount: number, water: number) => {
    const newState = {
      ...extras,
    };
    const liquid = (water / 100) * amount;
    if (newState[key]) {
      newState[key].amount = amount;
      newState[key].liquid = liquid;
    } else {
      newState[key] = {
        amount,
        liquid,
      } as ExtraIngredient;
    }
    setExtras(newState);
  };

  const unitText = t(
    `calculator.${imperialUnits ? 'imperial' : 'metric'}-text`,
  );
  const format = (val: number): string => `${val} ${unitText}`;
  const parse = (val: string): number =>
    Number(val.replace(` ${unitText}`, ''));
  const inputPattern = '.*';
  return (
    <>
      <Meta subtitle={t('calculator.title')} />
      <Container maxW="xl" mb={16}>
        <Heading
          as="h1"
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
              <StatLabel>{t('calculator.doughWeight-text')}</StatLabel>
              <StatNumber>
                <EditableNumericText
                  value={dough}
                  onSubmit={onDoughGoalSubmit}
                  parser={parse}
                  formatter={format}
                  pattern={inputPattern}
                >
                  {format(dough)}
                </EditableNumericText>
              </StatNumber>

              <StatHelpText>{`${t(
                'calculator.hydratation-text',
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
              <FormLabel htmlFor="flour">{`${t(
                'calculator.flour-label',
              )} (${flourPercent}%)`}</FormLabel>
              <NumberInput
                id="flour"
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
                (<Kbd>{t('calculator.flour-hint')}</Kbd> + ) <Kbd>&uarr;</Kbd>
                &nbsp;{t('calculator.flour-hint-separator')}&nbsp;
                <Kbd>&darr;</Kbd>
              </Text>
            </FormControl>

            <FormControl mb={2}>
              <FormLabel htmlFor="water">{`${t(
                'calculator.water-label',
              )} (${waterPercent}%)`}</FormLabel>
              <NumberInput
                id="water"
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
              <FormLabel htmlFor="salt">{`${t(
                'calculator.salt-label',
              )} (${saltPercent}%)`}</FormLabel>
              <NumberInput
                id="salt"
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
              <FormLabel htmlFor="sourdough">{`${t(
                'calculator.sourdough-label',
              )} (${sourDoughPercent}%)`}</FormLabel>

              <Stack direction={['column', 'row']} spacing={5}>
                <NumberInput
                  id="sourdough"
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
                  aria-label="Sourdough ratio"
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
              <FormHelperText>{t('calculator.sourdough-hint')}</FormHelperText>
            </FormControl>

            <Divider mb={2} />
            <Text mb={5}>{t('calculator.extras-text')}</Text>
            {supportedIngredients.map(({ key, name, water }) => {
              const extra = extras[key];
              const isDisabled = extra ? extra.disabled : true;
              const amount = extra ? extra.amount : 0;
              const percent = Math.floor(
                calcIngredientPercent(bakersMath, flour, amount, dough),
              );
              return (
                <FormControl key={key} mb={2} isDisabled={isDisabled}>
                  <Switch
                    isChecked={!isDisabled}
                    onChange={() => toggleExtra(key)}
                  />
                  <FormLabel htmlFor={key} display="inline-block" ml={2}>
                    {`${t(name)} (${percent}%)`}
                  </FormLabel>
                  <NumberInput
                    id={key}
                    isDisabled={isDisabled}
                    value={format(amount)}
                    min={0}
                    step={1}
                    onChange={(value) =>
                      onChangeExtras(key, parse(value), water)
                    }
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
              );
            })}

            <Divider mb={2} />

            <FormControl mb={2}>
              <HStack>
                <Switch
                  id="bakersMath"
                  isChecked={bakersMath}
                  onChange={(e) => setBakersMath(e.target.checked)}
                />
                <FormLabel
                  htmlFor="bakersMath"
                  fontSize="sm"
                  m={0}
                  fontWeight={400}
                >
                  {t('calculator.settings-bakersMath-label')}
                </FormLabel>
              </HStack>
            </FormControl>

            <FormControl mb={2}>
              <HStack>
                <Switch
                  id="imperialUnits"
                  isChecked={imperialUnits}
                  onChange={(e) => setImperialUnits(e.target.checked)}
                />
                <FormLabel
                  htmlFor="bakersMath"
                  fontSize="sm"
                  m={0}
                  fontWeight={400}
                >
                  {t('calculator.settings-imperial-label')}
                </FormLabel>
                <Badge ml="1" colorScheme="green">
                  {t('calculator.new-badge')}
                </Badge>
              </HStack>
            </FormControl>
          </Stack>
        </Box>
      </Container>
    </>
  );
};

export default BreadCalculator;
