import React, { FC, ReactNode, useState, useEffect, ChangeEvent } from 'react';
import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons';
import { ButtonGroup, IconButton, Stack, Select } from '@chakra-ui/react';

interface EditableSelectTextProps<T> {
  value: T;
  values: T[];
  labels: string[];
  onSubmit: (value: T) => void;
  onCancel?: () => void;
  children: ReactNode[] | ReactNode;
}

const EditableSelectText = <V extends string>({
  value,
  values,
  labels,
  onSubmit,
  children,
}: EditableSelectTextProps<V>) => {
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

  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) =>
    setInputValue(e.target.value as V);

  const toggleEditing = () => setEditing((prevState) => !prevState);

  const onSubmitClick = () => {
    onSubmit(inputValue);
    toggleEditing();
  };
  return editing ? (
    <>
      <Stack direction={['column', 'row']} align={['start', 'center']} mb={1}>
        <Select
          value={inputValue}
          aria-label="Starter"
          onChange={onSelectChange}
          width="auto"
        >
          {values.map((value, index) => (
            <option key={value} value={value}>
              {labels[index]}
            </option>
          ))}
        </Select>
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

export default EditableSelectText;
