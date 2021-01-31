import {
  Badge,
  FormControl,
  FormLabel,
  HStack,
  Switch,
} from '@chakra-ui/react';
import React, { FC, useEffect, useState } from 'react';
import en from '@/locales/en';
import hu from '@/locales/hu';
import { useRouter } from 'next/router';

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
  const { locale } = useRouter();
  const t = locale === 'en' ? en : hu;
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(!disabled);
  }, [disabled]);
  return (
    <FormControl mb={2}>
      <HStack>
        <Switch id={id} isChecked={checked} onChange={onToggle} />
        <FormLabel htmlFor={id} fontSize="sm" m={0}>
          {label}
        </FormLabel>
        {newConfig && (
          <Badge ml="1" colorScheme="green">
            {t.calculator.newBadge}
          </Badge>
        )}
      </HStack>
    </FormControl>
  );
};

export default ConfigSwitch;
