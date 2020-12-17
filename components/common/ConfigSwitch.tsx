import {
  Badge,
  FormControl,
  FormLabel,
  HStack,
  Switch,
} from '@chakra-ui/react';
import { useI18n } from 'next-localization';
import React, { FC, useEffect, useState } from 'react';

interface ConfigSwitchProps {
  id: string;
  label: string;
  disabled: boolean;
  onToggle: () => void;
  newConfig?: boolean;
}

const ConfigSwitch: FC<ConfigSwitchProps> = ({
  id,
  label,
  disabled,
  onToggle,
  newConfig,
}) => {
  const { t } = useI18n();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(!disabled);
  }, [disabled]);
  return (
    <FormControl mb={2}>
      <HStack>
        <Switch id={id} isChecked={checked} onChange={onToggle} />
        <FormLabel htmlFor={id} fontSize="sm" m={0} fontWeight={400}>
          {label}
        </FormLabel>
        {newConfig && (
          <Badge ml="1" colorScheme="green">
            {t('calculator.new-badge')}
          </Badge>
        )}
      </HStack>
    </FormControl>
  );
};

export default ConfigSwitch;
