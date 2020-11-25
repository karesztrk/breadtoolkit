import React, { FC, ReactNode, useState, useEffect, ChangeEvent } from 'react';
import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons';
import { ButtonGroup, IconButton, Input, Stack } from '@chakra-ui/core';

interface EditableTextProps {
  value: string;
  onSubmit: (value: string) => void;
  onCancel?: () => void;
  children: ReactNode[] | ReactNode;
  numeric?: boolean;
  parser?: (value: string) => number;
}

const EditableText: FC<EditableTextProps> = ({
  value,
  onSubmit,
  children,
  numeric = true,
  parser,
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

  const onInputValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (numeric && parser) {
      const parsed = parser(e.target.value);
      if (!isNaN(parsed)) {
        setInputValue(e.target.value);
      }
    } else {
      setInputValue(e.target.value);
    }
  };

  const onSubmitClick = () => {
    onSubmit(inputValue);
    toggleEditing();
  };
  return editing ? (
    <>
      <Stack direction={['column', 'row']} align="center">
        <Input value={inputValue} onChange={onInputValueChange} />
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

export default EditableText;
