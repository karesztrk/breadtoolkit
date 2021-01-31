import { Search2Icon } from '@chakra-ui/icons';
import {
  Input,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
} from '@chakra-ui/react';
import React, { ChangeEvent, FC } from 'react';

interface SearchInputProps {
  placeholder?: string;
  onChange: (value: string) => void;
}

const SearchInput: FC<SearchInputProps> = ({ placeholder, onChange }) => {
  const onSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value.toLowerCase());
  };
  const searchBackground = useColorModeValue('bg.light', 'bg.dark');
  const searchFocusBackground = useColorModeValue(
    { background: 'bg.light' },
    { background: 'bg.dark' },
  );

  return (
    <InputGroup maxWidth="md">
      <InputLeftElement
        pointerEvents="none"
        children={<Search2Icon color="brand.100" />}
      />
      <Input
        id="search-input"
        background={searchBackground}
        _focusWithin={searchFocusBackground}
        placeholder={placeholder}
        onChange={onSearchInput}
      />
    </InputGroup>
  );
};

export default SearchInput;
