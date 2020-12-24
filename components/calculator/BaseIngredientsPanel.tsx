import {
  calcFlourPercent,
  calcIngredientPercent,
  convertToSourdough,
  convertToYeast,
} from '@/service/calculator';
import { SettingName, Settings, StarterName } from '@/types/calculator';
import {
  FormControl,
  FormHelperText,
  FormLabel,
  Kbd,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useI18n } from 'next-localization';
import React, { FC, useCallback } from 'react';
import EditableSelectText from '../common/EditableSelectText';

interface BaseIngredientsProps {
  settings: Settings;
  dough: number;
  onSettingChange: (key: SettingName, value: any) => void;
  onSettingsChange: (settings: Settings) => void;
}

const BaseIngredientsPanel: FC<BaseIngredientsProps> = ({
  settings,
  dough,
  onSettingChange,
  onSettingsChange,
}) => {
  const { t } = useI18n();
  const inputPattern = '.*';
  const usingYeast = settings.yeast && settings.yeast !== 0;
  const unitText = t(
    `calculator.${settings.imperialUnits ? 'imperial' : 'metric'}-text`,
  );
  const format = (val: number): string => `${val} ${unitText}`;
  const parse = (val: string): number =>
    Number(val.replace(` ${unitText}`, ''));
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
    (value) =>
      onSettingChange(usingYeast ? 'yeast' : 'sourdough', parse(value)),
    [usingYeast],
  );

  const onStarterTypeChange = (starter: StarterName) => {
    switch (starter) {
      case 'yeast':
        onSettingsChange(convertToYeast(settings));
        break;
      case 'sourdough':
        onSettingsChange(convertToSourdough(settings));
        break;
      default:
        break;
    }
  };

  const onSourdoughRatioChangeEnd = (value: number) => {
    if (value !== settings.sourdoughRatio) {
      onSettingChange('sourdoughRatio', value);
    }
  };

  return (
    <>
      <FormControl mb={2}>
        <FormLabel htmlFor="flour">{`${t(
          'calculator.flour-label',
        )} (${flourPercent}%)`}</FormLabel>
        <NumberInput
          id="flour"
          value={format(settings.flour)}
          min={1}
          step={1}
          onChange={(value) => onSettingChange('flour', parse(value))}
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
          onChange={(value) => onSettingChange('water', parse(value))}
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
          onChange={(value) => onSettingChange('salt', parse(value))}
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
            value={format(usingYeast ? settings.yeast : settings.sourdough)}
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
              defaultValue={settings.sourdoughRatio}
              onChangeEnd={onSourdoughRatioChangeEnd}
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
          <FormHelperText>{t('calculator.sourdough-hint')}</FormHelperText>
        )}
      </FormControl>
    </>
  );
};

export default BaseIngredientsPanel;
