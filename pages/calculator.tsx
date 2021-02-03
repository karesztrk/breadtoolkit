import React, { useEffect, useReducer } from 'react';
import { Stack } from '@chakra-ui/react';
import {
  loadCalculatorSettings,
  saveCalculatorSettings,
  supportedIngredients,
} from '@/service/calculator';
import { Settings, ExtraIngredients, SettingName } from '@/types/calculator';
import { useRouter } from 'next/router';
import ConfigurationPanel from '@/components/calculator/ConfigurationPanel';
import ExtraIngredientsPanel from '@/components/calculator/ExtraIngredientsPanel';
import BaseIngredientsPanel from '@/components/calculator/BaseIngredientsPanel';
import Summary from '@/components/calculator/Summary';
import en from '@/locales/en';
import hu from '@/locales/hu';
import PageContainer from '@/components/layout/PageContainer';
import PageCard from '@/components/layout/PageCard';
import reducer, { initialState } from '@/context/calculator/reducer';

const BreadCalculator = () => {
  const { locale } = useRouter();
  const t = locale === 'en' ? en : hu;
  const { asPath } = useRouter();
  const [{ settings, extras, dough, liquids }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  useEffect(() => {
    let settings = loadCalculatorSettings();
    const extras: ExtraIngredients = {};
    // Router query object is populated later
    if (asPath && asPath.includes('?')) {
      const queryParams = new URLSearchParams(asPath.split('?')[1]);
      const flour = Number(queryParams.get('flour'));
      const water = Number(queryParams.get('water'));
      const salt = Number(queryParams.get('salt'));
      const yeast = Number(queryParams.get('yeast'));
      const sourdough = Number(queryParams.get('sourdough'));
      const sourdoughRatio = Number(queryParams.get('sourdoughRatio'));
      settings = {
        ...settings,
        ...(flour && { flour }),
        ...(water && { water }),
        ...(salt && { salt }),
        ...(yeast && { yeast }),
        ...(sourdough && { sourdough }),
        ...(sourdoughRatio && { sourdoughRatio }),
      };
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
    dispatch({ type: 'initialize', settings, extras });
  }, [asPath]);

  // Saving
  useEffect(() => {
    saveCalculatorSettings(settings);
  }, [settings]);

  return (
    <PageContainer title={t.calculator.title}>
      <PageCard>
        <Summary
          settings={settings}
          extras={extras}
          dough={dough}
          liquids={liquids}
          onDoughGoalSubmit={(goal: number) => {
            dispatch({
              type: 'submitDoughGoal',
              goal,
            });
          }}
          onResetSettings={() => {
            dispatch({
              type: 'resetSettings',
            });
          }}
        />
        <Stack>
          <BaseIngredientsPanel
            settings={settings}
            dough={dough}
            onSettingChange={(key: SettingName, value: number) => {
              dispatch({
                type: 'setSetting',
                key,
                value,
              });
            }}
            onSettingsChange={(settings: Settings) => {
              dispatch({
                type: 'setSettings',
                settings,
              });
            }}
          />
          <ExtraIngredientsPanel
            bakersMath={settings.bakersMath}
            imperialUnits={settings.imperialUnits}
            flour={settings.flour}
            extras={extras}
            dough={dough}
            onChangeExtras={(key: string, amount: number, water: number) => {
              dispatch({
                type: 'changeExtra',
                key,
                amount,
                water,
              });
            }}
            toggleExtra={(key: string) => {
              dispatch({
                type: 'toggleExtra',
                key,
              });
            }}
          />
          <ConfigurationPanel
            bakersMath={settings.bakersMath}
            imperialUnits={settings.imperialUnits}
            onSwitchBakersMath={() => {
              dispatch({
                type: 'switchBakersMath',
              });
            }}
            onSwitchImperialUnits={() => {
              dispatch({
                type: 'switchImperialUnits',
              });
            }}
          />
        </Stack>
      </PageCard>
    </PageContainer>
  );
};

export default BreadCalculator;
