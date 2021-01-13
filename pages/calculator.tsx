import React, { useEffect, useState } from 'react';
import { Box, Stack, useColorModeValue, usePrevious } from '@chakra-ui/react';
import {
  loadCalculatorSettings,
  saveCalculatorSettings,
  calcSourDoughLiquid,
  calcExtrasLiquid,
  deriveIngredientsFromGoal,
  supportedIngredients,
  calcDoughWeight,
  convertToImperialUnits,
} from '@/service/calculator';
import {
  Settings,
  ExtraIngredients,
  ExtraIngredient,
  SettingName,
} from '@/types/calculator';
import { useRouter } from 'next/router';
import ConfigurationPanel from '@/components/calculator/ConfigurationPanel';
import ExtraIngredientsPanel from '@/components/calculator/ExtraIngredientsPanel';
import BaseIngredientsPanel from '@/components/calculator/BaseIngredientsPanel';
import Summary from '@/components/calculator/Summary';
import en from '@/locales/en';
import hu from '@/locales/hu';
import PageContainer from '@/components/layout/PageContainer';

const BreadCalculator = () => {
  const { locale } = useRouter();
  const t = locale === 'en' ? en : hu;
  const { asPath } = useRouter();

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

  return (
    <PageContainer title={t.calculator.title}>
      <Box
        p="6"
        rounded="xl"
        bg={useColorModeValue('white', '#393432')}
        color={useColorModeValue('brand.400', 'brand.100')}
        maxWidth="md"
        margin="0 auto"
        border={useColorModeValue('', '1px')}
        borderColor={useColorModeValue('', 'rgba(255, 255, 255, 0.15)')}
        boxShadow={useColorModeValue('0 0 10px rgba(59, 52, 55, 0.4)', '')}
      >
        <Summary
          settings={settings}
          extras={extras}
          dough={dough}
          liquids={liquids}
          onDoughGoalSubmit={onDoughGoalSubmit}
          onResetSettings={setSettings}
        />
        <Stack>
          <BaseIngredientsPanel
            settings={settings}
            dough={dough}
            onSettingChange={setSetting}
            onSettingsChange={setSettings}
          />
          <ExtraIngredientsPanel
            settings={settings}
            extras={extras}
            dough={dough}
            onChangeExtras={onChangeExtras}
            toggleExtra={toggleExtra}
          />
          <ConfigurationPanel
            settings={settings}
            onSwitchBakersMath={onSwitchBakersMath}
            onSwitchImperialUnits={onSwitchImperialUnits}
          />
        </Stack>
      </Box>
    </PageContainer>
  );
};

export default BreadCalculator;
