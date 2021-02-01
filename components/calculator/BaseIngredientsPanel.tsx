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
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import EditableSelectText from '@/components/common/EditableSelectText';
import en from '@/locales/en';
import hu from '@/locales/hu';

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
  const { locale } = useRouter();
  const t = locale === 'en' ? en : hu;
  const inputPattern = '.*';
  const usingYeast = settings.yeast && settings.yeast !== 0;
  const unitText = settings.imperialUnits
    ? t.calculator.imperialText
    : t.calculator.metricText;

  const format = (val: number): string => `${val} ${unitText}`;
  const parse = (val: string): number => {
    const numVal = Number(val.replace(` ${unitText}`, ''));
    return Number.isNaN(numVal) || numVal < 1 ? 1 : numVal;
  };
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
  const starterLabel = usingYeast
    ? t.calculator.yeastLabel
    : t.calculator.sourdoughLabel;

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
    t.calculator.sourdoughLabel,
    t.calculator.yeastLabel,
  ];

  const onStarterChange = (value: string) =>
    onSettingChange(usingYeast ? 'yeast' : 'sourdough', parse(value));

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

  return (
    <>
      <FormControl mb={2} data-testid="base-ingredients">
        <FormLabel htmlFor="flour">{`${t.calculator.flourLabel} (${flourPercent}%)`}</FormLabel>
        <NumberInput
          id="flour"
          value={format(settings.flour)}
          min={1}
          step={1}
          clampValueOnBlur={false}
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
          (<Kbd>{t.calculator.flourHint}</Kbd> + ) <Kbd>&uarr;</Kbd>
          &nbsp;{t.calculator.flourHintSeparator}&nbsp;
          <Kbd>&darr;</Kbd>
        </Text>
      </FormControl>

      <FormControl mb={2}>
        <FormLabel htmlFor="water">{`${t.calculator.waterLabel} (${waterPercent}%)`}</FormLabel>
        <NumberInput
          id="water"
          value={format(settings.water)}
          min={1}
          step={1}
          onChange={(value) => onSettingChange('water', parse(value))}
          pattern={inputPattern}
          allowMouseWheel
          clampValueOnBlur={false}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>

      <FormControl mb={2}>
        <FormLabel htmlFor="salt">{`${t.calculator.saltLabel} (${saltPercent}%)`}</FormLabel>
        <NumberInput
          id="salt"
          value={format(settings.salt)}
          min={1}
          step={1}
          onChange={(value) => onSettingChange('salt', parse(value))}
          pattern={inputPattern}
          allowMouseWheel
          clampValueOnBlur={false}
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
            clampValueOnBlur={false}
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
              value={settings.sourdoughRatio}
              onChange={(value) => onSettingChange('sourdoughRatio', value)}
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
          <FormHelperText>{t.calculator.sourdoughHint}</FormHelperText>
        )}
      </FormControl>
    </>
  );
};

export default BaseIngredientsPanel;
