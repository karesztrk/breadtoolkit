import React, { FC, useEffect, useState } from 'react';
import {
  FormControl,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Switch,
} from '@chakra-ui/react';
import { StringOrNumber } from '@chakra-ui/utils';

interface NumberInputSwitchProps {
  id: string;
  label: string;
  value: StringOrNumber;
  onToggle: () => void;
  disabled: boolean;
  onChangeValue: (value: any) => void;
}

const NumberInputSwitch: FC<NumberInputSwitchProps> = ({
  id,
  label,
  value,
  onToggle,
  disabled,
  onChangeValue,
}) => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(!disabled);
  }, [disabled]);

  return (
    <FormControl mb={2} isDisabled={!checked}>
      <Switch
        aria-label={`Enable ${id}`}
        isChecked={checked}
        onChange={onToggle}
      />
      <FormLabel htmlFor={id} display="inline-block" ml={2}>
        {label}
      </FormLabel>
      <NumberInput
        id={id}
        isDisabled={!checked}
        value={value}
        min={0}
        step={1}
        onChange={onChangeValue}
        pattern=".*"
        allowMouseWheel
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </FormControl>
  );
};

export default NumberInputSwitch;
