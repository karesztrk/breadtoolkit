import {
  calcIngredientPercent,
  supportedIngredients,
} from '@/service/calculator';
import { ExtraIngredients, Settings } from '@/types/calculator';
import { Divider, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import NumberInputSwitch from '../common/NumberInputSwitch';
import en from '@/locales/en';
import hu from '@/locales/hu';

interface ExtraIngredientsPanelProps {
  settings: Settings;
  extras: ExtraIngredients;
  dough: number;
  onChangeExtras: (key: string, amount: number, water: number) => void;
  toggleExtra: (key: string) => void;
}

const ExtraIngredientsPanel: FC<ExtraIngredientsPanelProps> = ({
  settings,
  extras,
  dough,
  onChangeExtras,
  toggleExtra,
}) => {
  const { locale } = useRouter();
  const t = locale === 'en' ? en : hu;
  const unitText = settings.imperialUnits
    ? t.calculator.imperialText
    : t.calculator.metricText;
  const format = (val: number): string => `${val} ${unitText}`;
  const parse = (val: string): number =>
    Number(val.replace(` ${unitText}`, ''));
  return (
    <>
      <Divider mb={2} />
      <Text mb={5} data-testid="extra-ingredients">
        {t.calculator.extrasText}
      </Text>
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
        const label = (t.calculator as any)[name];
        return (
          <React.Fragment key={key}>
            <NumberInputSwitch
              id={key}
              disabled={isDisabled}
              label={`${label} (${percent}%)`}
              value={format(amount)}
              onChangeValue={(value) =>
                onChangeExtras(key, parse(value), water)
              }
              onToggle={() => toggleExtra(key)}
            />
          </React.Fragment>
        );
      })}
    </>
  );
};

export default ExtraIngredientsPanel;
