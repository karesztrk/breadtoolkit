import React, { useCallback, useEffect, useState } from 'react';
import {
  Divider,
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
  IconButton,
  Flex,
  usePrevious,
  useToast,
  Tooltip,
} from '@chakra-ui/react';
import { RepeatClockIcon, LinkIcon, InfoOutlineIcon } from '@chakra-ui/icons';
import {
  loadCalculatorSettings,
  saveCalculatorSettings,
  defaultSettings,
  calcFlourPercent,
  calcIngredientPercent,
  calcHydration,
  calcSourDoughLiquid,
  calcExtrasLiquid,
  deriveIngredientsFromGoal,
  supportedIngredients,
  calcDoughWeight,
  convertToImperialUnits,
  convertToYeast,
  convertToSourdough,
} from '@/service/calculator';
import {
  Settings,
  ExtraIngredients,
  ExtraIngredient,
  SettingName,
  StarterName,
} from '@/types/calculator';
import EditableNumericText from '@/components/common/EditableNumericText';
import EditableSelectText from '@/components/common/EditableSelectText';
import NumberInputSwitch from '@/components/common/NumberInputSwitch';
import { useI18n } from 'next-localization';
import Meta from '@/components/layout/Meta';
import { useRouter } from 'next/router';
import PageContainer from '@/components/layout/PageContainer';
import ConfigSwitch from '@/components/common/ConfigSwitch';

const BreadCalculator = () => {
  const { t } = useI18n();
  const { asPath } = useRouter();
  const { colorMode } = useColorMode();
  const toast = useToast();

  const [settings, setSettings] = useState<Settings>(() => {
    // Router query object is populated later
    if (asPath && asPath.includes('?')) {
      const queryParams = new URLSearchParams(asPath.split('?')[1]);
      const settings = loadCalculatorSettings();
      const flour = Number(queryParams.get('flour'));
      const water = Number(queryParams.get('water'));
      const salt = Number(queryParams.get('salt'));
      const yeast = Number(queryParams.get('yeast'));
      const sourdough = Number(queryParams.get('sourdough'));
      const sourdoughRatio = Number(queryParams.get('sourdoughRatio'));
      return {
        ...settings,
        ...(flour && { flour }),
        ...(water && { water }),
        ...(salt && { salt }),
        ...(yeast && { yeast }),
        ...(sourdough && { sourdough }),
        ...(sourdoughRatio && { sourdoughRatio }),
      };
    }
    return loadCalculatorSettings();
  });
  const previousUnit = usePrevious(settings.imperialUnits);
  const [dough, setDough] = useState(0);
  const [liquids, setLiquids] = useState(0);
  const [extras, setExtras] = useState<ExtraIngredients>(() => {
    // Router query object is populated later
    const extras: ExtraIngredients = {};
    if (asPath && asPath.includes('?')) {
      const queryParams = new URLSearchParams(asPath.split('?')[1]);
      supportedIngredients.forEach(({ key, water }) => {
        const param = Number(queryParams.get(key));
        if (param) {
          extras[key] = {
            disabled: false,
            amount: param,
            liquid: (water / 100) * param,
          };
        }
      });
    }
    return extras;
  });

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
    const extraLiquid: number = calcExtrasLiquid(extras);
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

    toast({
      title: t('calculator.reset-success-toast-title'),
      description: t('calculator.reset-success-toast-description'),
      status: 'success',
      duration: 9000,
      isClosable: true,
    });
  };

  const onShareClick = () => {
    const url = new URL(window.location.href);
    const extraSettings = Object.entries(extras).reduce((acc, [key, value]) => {
      if (!value.disabled && value.amount > 0) {
        acc[key] = value.amount;
      }
      return acc;
    }, {} as Record<string, number>);
    const mergedSettings: Record<string, any> = {
      ...settings,
      ...extraSettings,
    };
    delete mergedSettings.bakersMath;
    delete mergedSettings.imperialUnits;
    const searchParams = new URLSearchParams(mergedSettings);
    url.search = searchParams.toString();

    copyToClipboard(url.toString());
  };

  const copyToClipboard = async (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        toast({
          title: t('calculator.share-success-toast-title'),
          description: t('calculator.share-success-toast-description'),
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
      },
      () => {
        toast({
          title: t('calculator.share-failed-toast-title'),
          description: t('calculator.share-failed-toast-description'),
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      },
    );
  };

  const onDoughGoalSubmit = (goal: number) => {
    const {
      flour,
      water,
      sourdough,
      yeast,
      salt,
      extras: newExtras,
    } = deriveIngredientsFromGoal(goal, settings, extras);
    setSettings({
      ...settings,
      flour,
      water,
      sourdough,
      salt,
      yeast,
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
  const usingYeast = settings.yeast !== 0;
  const setSetting = (key: SettingName, value: any) => {
    setSettings({
      ...settings,
      [key]: value,
    });
  };

  const onSwitchBakersMath = () => {
    setSettings({
      ...settings,
      bakersMath: !settings.bakersMath,
    });
  };

  const onSwitchImperialUnits = () => {
    setSettings({
      ...settings,
      imperialUnits: !settings.imperialUnits,
    });
  };

  const onStarterTypeChange = (starter: StarterName) => {
    switch (starter) {
      case 'yeast':
        setSettings(convertToYeast(settings));
        break;
      case 'sourdough':
        setSettings(convertToSourdough(settings));
        break;
      default:
        break;
    }
  };

  const starterValue = usingYeast ? 'yeast' : 'sourdough';
  const starterLabel = t(
    usingYeast ? 'calculator.yeast-label' : 'calculator.sourdough-label',
  );
  const starterPercent = Math.floor(
    calcIngredientPercent(
      settings.bakersMath,
      settings.flour,
      usingYeast ? settings.yeast : settings.sourdough,
      dough,
    ),
  );
  const starterValues: StarterName[] = ['sourdough', 'yeast'];
  const starterLabels: string[] = [
    t('calculator.sourdough-label'),
    t('calculator.yeast-label'),
  ];

  const onStarterChange = useCallback(
    (value) => setSetting(usingYeast ? 'yeast' : 'sourdough', parse(value)),
    [usingYeast],
  );

  return (
    <>
      <Meta subtitle={t('calculator.title')} />
      <PageContainer>
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

              <StatHelpText>
                {`${t('calculator.hydration-text')} ${calcHydration(
                  settings,
                  liquids,
                )}%`}
                &nbsp;
                <Tooltip
                  label={t('calculator.hydratation-tooltip')}
                  aria-label="Hydratation tooltip"
                  placement="right"
                >
                  <InfoOutlineIcon verticalAlign="sub" />
                </Tooltip>
              </StatHelpText>
            </Stat>
            <Box flex={1} textAlign="right">
              <IconButton
                onClick={onShareClick}
                variant="ghost"
                aria-label="Share"
                icon={<LinkIcon />}
              />
              <IconButton
                ml={1}
                onClick={onResetClick}
                variant="ghost"
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
                pattern={inputPattern}
                allowMouseWheel
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
                pattern={inputPattern}
                allowMouseWheel
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
                pattern={inputPattern}
                allowMouseWheel
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>

            <FormControl mb={5}>
              <EditableSelectText
                value={starterValue}
                values={starterValues}
                labels={starterLabels}
                onSubmit={onStarterTypeChange}
              >
                <FormLabel htmlFor="starter" display="inline">
                  {`${starterLabel} (${starterPercent}%)`}
                </FormLabel>
              </EditableSelectText>

              <Stack direction={['column', 'row']} spacing={5}>
                <NumberInput
                  id="starter"
                  flex={1}
                  value={format(
                    usingYeast ? settings.yeast : settings.sourdough,
                  )}
                  min={1}
                  step={1}
                  onChange={onStarterChange}
                  pattern={inputPattern}
                  allowMouseWheel
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                {!usingYeast && (
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
                )}
              </Stack>
              {!usingYeast && (
                <FormHelperText>
                  {t('calculator.sourdough-hint')}
                </FormHelperText>
              )}
            </FormControl>

            <Divider mb={2} />
            <Text mb={5}>{t('calculator.extras-text')}</Text>
            {supportedIngredients.map(({ key, name, water }) => {
              const extra = extras[key];
              const amount = extra ? extra.amount : 0;
              const isDisabled = extra ? extra.disabled : true;
              const percent = Math.floor(
                calcIngredientPercent(
                  settings.bakersMath,
                  settings.flour,
                  amount,
                  dough,
                ),
              );
              return (
                <React.Fragment key={key}>
                  <NumberInputSwitch
                    id={key}
                    disabled={isDisabled}
                    label={`${t(name)} (${percent}%)`}
                    value={format(amount)}
                    onChangeValue={(value) =>
                      onChangeExtras(key, parse(value), water)
                    }
                    onToggle={() => toggleExtra(key)}
                  />
                </React.Fragment>
              );
            })}

            <Divider mb={2} />
            <ConfigSwitch
              id="bakersMath"
              label={t('calculator.settings-bakersMath-label')}
              disabled={!settings.bakersMath}
              onToggle={onSwitchBakersMath}
            />

            <ConfigSwitch
              id="imperialUnits"
              label={t('calculator.settings-imperial-label')}
              disabled={!settings.imperialUnits}
              onToggle={onSwitchImperialUnits}
              newConfig
            />
          </Stack>
        </Box>
      </PageContainer>
    </>
  );
};

export default BreadCalculator;
