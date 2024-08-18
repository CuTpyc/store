import {useField} from 'remix-validated-form';
import {Autocomplete} from '@shopify/polaris';
import React, {useCallback, useEffect, useState} from 'react';

type Option = {
  value: string;
  label: string;
}

export type ValidatedTextFieldProps = {
  name: string;
  label?: string;
  listTitle?: string;
  placeholder?: string;
  autoComplete?: string;
  selectedOption?: Option;
  setSelectedOption: (selectedOption: Option) => void;
  setQuery: (query: string) => void;
  options: Option[];
}

export const PureValidatedAutocomplete = (props: ValidatedTextFieldProps) => {
  const {selectedOption, setSelectedOption, setQuery, options, name, autoComplete, listTitle, label, placeholder} = props;

  const timerRef = React.useRef<number | null>(null);

  const {error, getInputProps} = useField(name);
  const {onChange: inputPropsOnChange} = getInputProps();

  const [textFieldValue, setTextFieldValue] = useState<string>('');
  const [selectedValue, setSelectedValue] = useState<string>(selectedOption?.value ?? '');
  const [selectedOptions, setSelectedOptions] = useState<string[]>(selectedOption ? [selectedOption.value] : []);

  useEffect(() => {
    const { value = '', label = '' } = selectedOption ?? {}
    setSelectedOptions(value ? [value] : []);
    setSelectedValue(value);
    setTextFieldValue(label)
  }, [selectedOption]);

  const updateText = useCallback(
    (value: string) => {
      setTextFieldValue(value)
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      timerRef.current = window.setTimeout(() => {
        setQuery(value)
      }, 300);
    },
    [],
  );

  const handleSelect = useCallback((selected: string[]) => {
    const selectedOption = options.find((option) => option.value === selected[0]);

    if (!selectedOption) {
      return;
    }

    setSelectedOption(selectedOption)

    inputPropsOnChange?.();
  }, [options, inputPropsOnChange]);

  const textField = (
    <Autocomplete.TextField
      label={label}
      value={textFieldValue}
      placeholder={placeholder}
      autoComplete={autoComplete ?? 'off'}
      error={error}
      onChange={updateText}
    />
  );

  return (
    <>
      <Autocomplete
        listTitle={listTitle}
        options={options}
        selected={selectedOptions}
        textField={textField}
        loading={false}
        willLoadMoreResults={false}
        onSelect={handleSelect}
      />
      <input type="hidden" name={name} value={selectedValue}/>
    </>
  );
};
