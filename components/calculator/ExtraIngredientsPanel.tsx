import {
  calcIngredientPercent,
  supportedIngredients,
} from '@/service/calculator';
import { ExtraIngredients, Settings } from '@/types/calculator';
import { Divider, Text } from '@chakra-ui/react';
import { useI18n } from 'next-localization';
import React, { FC } from 'react';
import NumberInputSwitch from '../common/NumberInputSwitch';

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
  const { t } = useI18n();
  const unitText = t(
    `calculator.${settings.imperialUnits ? 'imperial' : 'metric'}-text`,
  );
  const format = (val: number): string => `${val} ${unitText}`;
  const parse = (val: string): number =>
    Number(val.replace(` ${unitText}`, ''));
  return (
    <>
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
    </>
  );
};

export default ExtraIngredientsPanel;
