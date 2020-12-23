import {
  calcHydration,
  convertToImperialUnits,
  defaultSettings,
} from '@/service/calculator';
import { ExtraIngredients, Settings } from '@/types/calculator';
import { InfoOutlineIcon, LinkIcon, RepeatClockIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  IconButton,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Tooltip,
  useToast,
} from '@chakra-ui/react';
import { useI18n } from 'next-localization';
import React, { FC } from 'react';
import EditableNumericText from '../common/EditableNumericText';

interface SummaryProps {
  settings: Settings;
  extras: ExtraIngredients;
  dough: number;
  liquids: number;
  onDoughGoalSubmit: (goal: number) => void;
  onResetSettings: (settings: Settings) => void;
}

const Summary: FC<SummaryProps> = ({
  settings,
  extras,
  dough,
  liquids,
  onDoughGoalSubmit,
  onResetSettings,
}) => {
  const { t } = useI18n();
  const toast = useToast();
  const unitText = t(
    `calculator.${settings.imperialUnits ? 'imperial' : 'metric'}-text`,
  );
  const format = (val: number): string => `${val} ${unitText}`;
  const parse = (val: string): number =>
    Number(val.replace(` ${unitText}`, ''));
  const inputPattern = '.*';

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

  const onResetClick = () => {
    const { bakersMath, imperialUnits } = settings;
    if (imperialUnits) {
      const { flour, water, salt, sourdough } = convertToImperialUnits(
        defaultSettings,
        {},
        imperialUnits,
      );
      onResetSettings({
        ...defaultSettings,
        bakersMath,
        imperialUnits,
        flour,
        water,
        salt,
        sourdough,
      });
    } else {
      onResetSettings(defaultSettings);
    }

    toast({
      title: t('calculator.reset-success-toast-title'),
      description: t('calculator.reset-success-toast-description'),
      status: 'success',
      duration: 9000,
      isClosable: true,
    });
  };

  return (
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
  );
};

export default Summary;
