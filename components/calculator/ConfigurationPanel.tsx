import { Settings } from '@/types/calculator';
import { Divider } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import ConfigSwitch from '../common/ConfigSwitch';
import en from '@/locales/en';
import hu from '@/locales/hu';

interface ConfigurationPanelProps {
  settings: Settings;
  onSwitchBakersMath: () => void;
  onSwitchImperialUnits: () => void;
}

const ConfigurationPanel: FC<ConfigurationPanelProps> = ({
  settings,
  onSwitchBakersMath,
  onSwitchImperialUnits,
}) => {
  const { locale } = useRouter();
  const t = locale === 'en' ? en : hu;
  return (
    <>
      <Divider mb={2} />
      <ConfigSwitch
        id="bakersMath"
        label={t.calculator.settingsBakersMathLabel}
        disabled={!settings.bakersMath}
        onToggle={onSwitchBakersMath}
      />

      <ConfigSwitch
        id="imperialUnits"
        label={t.calculator.settingsImperialLabel}
        disabled={!settings.imperialUnits}
        onToggle={onSwitchImperialUnits}
        newConfig
      />
    </>
  );
};

export default ConfigurationPanel;
