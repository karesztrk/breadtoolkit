import { Divider } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import ConfigSwitch from '../common/ConfigSwitch';
import en from '@/locales/en';
import hu from '@/locales/hu';

interface ConfigurationPanelProps {
  bakersMath: boolean;
  imperialUnits: boolean;
  onSwitchBakersMath: () => void;
  onSwitchImperialUnits: () => void;
}

const ConfigurationPanel: FC<ConfigurationPanelProps> = ({
  bakersMath,
  imperialUnits,
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
        disabled={!bakersMath}
        onToggle={onSwitchBakersMath}
      />

      <ConfigSwitch
        id="imperialUnits"
        label={t.calculator.settingsImperialLabel}
        disabled={!imperialUnits}
        onToggle={onSwitchImperialUnits}
        newConfig
      />
    </>
  );
};

export default ConfigurationPanel;
