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
  usePrevious,
} from '@chakra-ui/core';
import { RepeatClockIcon } from '@chakra-ui/icons';
import {
  loadCalculatorSettings,
  saveCalculatorSettings,
  defaultSettings,
  Settings,
  calcFlourPercent,
  calcIngredientPercent,
  calcHydration,
  calcSourDoughLiquid,
  deriveIngredientsFromGoal,
  ExtraIngredient,
  ExtraIngredients,
  supportedIngredients,
  calcDoughWeight,
  convertToImperialUnits,
} from '@/service/calculator';
import EditableNumericText from '@/components/common/EditableNumericText';
import { useI18n } from 'next-localization';
import Meta from '@/components/layout/Meta';

const BreadCalculator = () => {
  const { t } = useI18n();
  const { colorMode } = useColorMode();

  const [settings, setSettings] = useState<Settings>(loadCalculatorSettings());
  // Switches need separate state to correctly load the initial value
  const [imperialUnits, setImperialUnits] = useState(false);
  const [bakersMath, setBakersMath] = useState(false);
  const previousUnit = usePrevious(imperialUnits);
  const [dough, setDough] = useState(0);
  const [liquids, setLiquids] = useState(0);
  const [extras, setExtras] = useState<ExtraIngredients>({});

  const flourPercent = Math.floor(
    calcFlourPercent(settings.bakersMath, settings.flour, dough),
  );
  const waterPercent = Math.floor(
    calcIngredientPercent(
      settings.bakersMath,
      settings.flour,
      settings.water,
      dough,
    ),
  );
  const saltPercent = Math.floor(
    calcIngredientPercent(
      settings.bakersMath,
      settings.flour,
      settings.salt,
      dough,
    ),
  );
  const sourDoughPercent = Math.floor(
    calcIngredientPercent(
      settings.bakersMath,
      settings.flour,
      settings.sourdough,
      dough,
    ),
  );

  // Configs
  useEffect(() => {
    setImperialUnits(settings.imperialUnits);
    setBakersMath(settings.bakersMath);
  }, [settings.imperialUnits, settings.bakersMath]);

  // Unit convertion
  useEffect(() => {
    if (previousUnit !== undefined && previousUnit !== settings.imperialUnits) {
      const derivedIngredients = convertToImperialUnits(
        settings,
        extras,
        settings.imperialUnits,
      );
      setSettings({
        ...settings,
        flour: derivedIngredients.flour,
        water: derivedIngredients.water,
        salt: derivedIngredients.salt,
        sourdough: derivedIngredients.sourdough,
      });
      setExtras(derivedIngredients.extras);
    }
  }, [settings.imperialUnits]);

  // Saving
  useEffect(() => {
    saveCalculatorSettings(settings);
  }, [settings]);

  // Dough
  useEffect(() => {
    const dough = calcDoughWeight(settings, extras);
    setDough(dough);
  }, [settings, extras]);

  // Liquid
  useEffect(() => {
    const { bakersMath, sourdough, sourdoughRatio, water } = settings;
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
  }, [settings, extras]);

  const onResetClick = () => {
    const { bakersMath, imperialUnits } = settings;
    if (imperialUnits) {
      const { flour, water, salt, sourdough } = convertToImperialUnits(
        defaultSettings,
        {},
        imperialUnits,
      );
      setSettings({
        ...defaultSettings,
        bakersMath,
        imperialUnits,
        flour,
        water,
        salt,
        sourdough,
      });
    } else {
      setSettings(defaultSettings);
    }
  };

  const onDoughGoalSubmit = (goal: number) => {
    const {
      flour,
      water,
      sourdough,
      salt,
      extras: newExtras,
    } = deriveIngredientsFromGoal(goal, settings, extras);
    setSettings({
      ...settings,
      flour,
      water,
      sourdough,
      salt,
    });
    setExtras(newExtras);
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
    `calculator.${settings.imperialUnits ? 'imperial' : 'metric'}-text`,
  );
  const format = (val: number): string => `${val} ${unitText}`;
  const parse = (val: string): number =>
    Number(val.replace(` ${unitText}`, ''));
  const inputPattern = '.*';

  const setSetting = (key: string, value: any) => {
    setSettings({
      ...settings,
      [key]: value,
    });
  };

  const onSwitchBakersMath = (value: boolean) => {
    setSettings({
      ...settings,
      bakersMath: value,
    });
    setBakersMath(value);
  };

  const onSwitchImperialUnits = (value: boolean) => {
    setSettings({
      ...settings,
      imperialUnits: value,
    });
    setImperialUnits(value);
  };

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

              <StatHelpText>{`${t('calculator.hydration-text')} ${calcHydration(
                settings.flour,
                liquids,
              )}%`}</StatHelpText>
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
                value={format(settings.flour)}
                min={1}
                step={1}
                onChange={(value) => setSetting('flour', parse(value))}
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
                value={format(settings.water)}
                min={1}
                step={1}
                onChange={(value) => setSetting('water', parse(value))}
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
                value={format(settings.salt)}
                min={1}
                step={1}
                onChange={(value) => setSetting('salt', parse(value))}
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
                  value={format(settings.sourdough)}
                  min={1}
                  step={1}
                  onChange={(value) => setSetting('sourdough', parse(value))}
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
                  value={settings.sourdoughRatio}
                  onChange={(value) => setSetting('sourdoughRatio', value)}
                >
                  <SliderTrack>
                    <SliderFilledTrack />
                  </SliderTrack>
                  <SliderThumb fontSize="sm" boxSize="32px">
                    <Text color="brand.400">{settings.sourdoughRatio}%</Text>
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
                calcIngredientPercent(
                  settings.bakersMath,
                  settings.flour,
                  amount,
                  dough,
                ),
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
                  onChange={(e) => onSwitchBakersMath(e.target.checked)}
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
                  onChange={(e) => onSwitchImperialUnits(e.target.checked)}
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
