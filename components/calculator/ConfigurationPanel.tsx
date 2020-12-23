import { Settings } from '@/types/calculator';
import { Divider } from '@chakra-ui/react';
import { useI18n } from 'next-localization';
import React, { FC } from 'react';
import ConfigSwitch from '../common/ConfigSwitch';

interface ConfigurationProps {
  settings: Settings;
  onSwitchBakersMath: () => void;
  onSwitchImperialUnits: () => void;
}

const ConfigurationPanel: FC<ConfigurationPanelProps> = ({
  settings,
  onSwitchBakersMath,
  onSwitchImperialUnits,
}) => {
  const { t } = useI18n();
  return (
    <>
      <Divider mb={2} />
      <ConfigSwitch
        id="bakersMath"
        label={t('calculator.settings-bakersMath-label')}
        disabled={!settings.bakersMath}
        onToggle={onSwitchBakersMath}
      />

      <ConfigSwitch
        id="imperialUnits"
        label={t('calculator.settings-imperial-label')}
        disabled={!settings.imperialUnits}
        onToggle={onSwitchImperialUnits}
        newConfig
      />
    </>
  );
};

export default ConfigurationPanel;
