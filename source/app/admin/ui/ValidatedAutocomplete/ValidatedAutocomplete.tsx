import {useField} from 'remix-validated-form';
import {Autocomplete} from '@shopify/polaris';
import React, {useCallback, useEffect, useState} from 'react';

export type TAutocompleteOption = {
  value: string; label: string
}

export type ValidatedAutocompleteProps = {
  name: string;
  label?: string;
  listTitle?: string;
  placeholder?: string;
  autoComplete?: string;
  defaultValue?: TAutocompleteOption;
  onChangeSearchQuery: (searchQuery: string) => void;
  options: TAutocompleteOption[];
  onSelect?: (selected: string[]) => void;
  isFetching?: boolean;
}

export const ValidatedAutocomplete = (props: ValidatedAutocompleteProps) => {
  const {
    name, label, listTitle, placeholder, autoComplete, defaultValue, onChangeSearchQuery,
    options, onSelect, isFetching
  } = props;
  const {error, getInputProps} = useField(name);
  const {onChange: inputPropsOnChange} = getInputProps();

  const [value, setValue] = useState<string>(defaultValue?.value ?? '');
  const [search, setSearch] = useState<string>(defaultValue?.label ?? '');
  const defaultSelected = defaultValue ? [defaultValue.value] : [];
  const [selectedOptions, setSelectedOptions] = useState<string[]>(defaultSelected);

  const timerRef = React.useRef<number | null>(null);

  const handleSelect = useCallback((selected: string[]) => {
    const selectedOption = options.find((option) => option.value === selected[0]);

    if (!selectedOption) {
      return;
    }
    setValue(selectedOption.value);
    setSearch(selectedOption.label);
    setSelectedOptions([selectedOption.value]);
    inputPropsOnChange?.();
    onSelect?.([selectedOption.value]);
    onChangeSearchQuery(selectedOption.label)
  }, [inputPropsOnChange, setValue, onSelect, options]);

  const handleSearch = useCallback(
    (value: string) => {
      setSearch(value);
      onChangeSearchQuery(value);
    },
    [onChangeSearchQuery],
  );

  const textField = (
    <Autocomplete.TextField
      onChange={handleSearch}
      label={label}
      value={search}
      placeholder={placeholder}
      autoComplete={autoComplete || 'off'}
      error={error}
    />
  );
  useEffect(() => {
    if (defaultValue?.label) {
      handleSearch(defaultValue.label)
    }
  },[defaultValue?.label])
  return (
    <>
      <Autocomplete
        listTitle={listTitle}
        options={options}
        selected={selectedOptions}
        textField={textField}
        onSelect={handleSelect}
        loading={isFetching}
        willLoadMoreResults={false}
      />
      <input type="hidden" name={name} value={value}/>
    </>
  );
};

