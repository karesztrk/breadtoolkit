import React, { FC, ReactNode, useState, useEffect } from 'react';
import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons';
import {
  ButtonGroup,
  IconButton,
  NumberInput,
  NumberInputField,
  Stack,
} from '@chakra-ui/core';

interface EditableNumericTextProps {
  value: number;
  onSubmit: (value: number) => void;
  onCancel?: () => void;
  children: ReactNode[] | ReactNode;
  numeric?: boolean;
  parser: (value: string) => number;
  formatter: (value: number) => string;
  pattern: string;
}

const EditableNumericText: FC<EditableNumericTextProps> = ({
  value,
  onSubmit,
  children,
  parser,
  formatter,
  pattern,
}) => {
  const [editing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    if (!editing) {
      setInputValue(value);
    }
  }, [editing]);

  const toggleEditing = () => setEditing((prevState) => !prevState);

  const onSubmitClick = () => {
    onSubmit(inputValue);
    toggleEditing();
  };
  return editing ? (
    <>
      <Stack direction={['column', 'row']} align={['start', 'center']}>
        <NumberInput
          value={formatter(inputValue)}
          min={1}
          step={1}
          onChange={(value) => setInputValue(parser(value))}
          allowMouseWheel
          pattern={pattern}
        >
          <NumberInputField />
        </NumberInput>
        <ButtonGroup>
          <IconButton
            aria-label="submit"
            size="sm"
            icon={<CheckIcon />}
            onClick={onSubmitClick}
          />
          <IconButton
            aria-label="close"
            size="sm"
            icon={<CloseIcon />}
            onClick={toggleEditing}
          />
        </ButtonGroup>
      </Stack>
    </>
  ) : (
    <>
      {children}
      <IconButton
        variant="unstyled"
        aria-label="edit"
        size="sm"
        icon={<EditIcon height="32px" />}
        onClick={toggleEditing}
      />
    </>
  );
};

export default EditableNumericText;
