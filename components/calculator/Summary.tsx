import { ExtraIngredients, Settings } from '@/types/calculator';
import { FC } from 'react';
import en from '@/locales/en';
import hu from '@/locales/hu';
import { useRouter } from 'next/router';
import {
  Box,
  Flex,
  IconButton,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  useToast,
} from '@chakra-ui/react';
import EditableNumericText from '../common/EditableNumericText';
import { InfoOutlineIcon, LinkIcon, RepeatClockIcon } from '@chakra-ui/icons';
import { calcHydration } from '@/service/calculator';

interface SummaryProps {
  settings: Settings;
  extras: ExtraIngredients;
  dough: number;
  liquids: number;
  onDoughGoalSubmit: (goal: number) => void;
  onResetSettings: () => void;
}

const Summary: FC<SummaryProps> = ({
  settings,
  extras,
  dough,
  liquids,
  onDoughGoalSubmit,
  onResetSettings,
}) => {
  const { locale } = useRouter();
  const t = locale === 'en' ? en : hu;
  const toast = useToast();
  const unitText = settings.imperialUnits
    ? t.calculator.imperialText
    : t.calculator.metricText;
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
          title: t.calculator.shareSuccessToastTitle,
          description: t.calculator.shareSuccessToastDescription,
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
      },
      () => {
        toast({
          title: t.calculator.shareFailedToastTitle,
          description: t.calculator.shareFailedToastDescription,
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      },
    );
  };

  const onResetClick = () => {
    onResetSettings();

    toast({
      title: t.calculator.resetSuccessToastTitle,
      description: t.calculator.resetSuccessToastDescription,
      status: 'success',
      duration: 9000,
      isClosable: true,
    });
  };
  return (
    <Flex justify="space-between" mb={5} data-testid="summary">
      <Stat flex={2}>
        <StatLabel>{t.calculator.doughWeightText}</StatLabel>
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
          {`${t.calculator.hydrationText} ${calcHydration(settings, liquids)}%`}
          &nbsp;
          <span
            style={{ verticalAlign: 'text-bottom' }}
            title={t.calculator.hydratationTooltip}
            aria-label="Hydratation tooltip"
          >
            <InfoOutlineIcon />
          </span>
        </StatHelpText>
      </Stat>
      <Box flex={1} textAlign="right">
        <IconButton
          onClick={onShareClick}
          variant="ghost"
          aria-label="Share"
          icon={<LinkIcon />}
          data-testid="share"
        />
        <IconButton
          ml={1}
          onClick={onResetClick}
          variant="ghost"
          aria-label="Reset settings"
          icon={<RepeatClockIcon />}
          data-testid="reset"
        />
      </Box>
    </Flex>
  );
};

export default Summary;
