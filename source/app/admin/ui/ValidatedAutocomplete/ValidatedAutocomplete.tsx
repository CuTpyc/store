import {useField} from 'remix-validated-form';
import {Autocomplete} from '@shopify/polaris';
import React, {useCallback, useEffect, useState} from 'react';
import {useFetcher} from '@remix-run/react';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {TAdminApiCategoriesLoader} from '~/.server/admin/loaders/api/categories/index/loader';

type Option = {
  value: string; label: string
}

export type ValidatedTextFieldProps = {
  name: string;
  label?: string;
  listTitle?: string;
  placeholder?: string;
  autoComplete?: string;
  localValue?: Option;
  setLocalValue: (localValue: Option) => void;
}

export const ValidatedAutocomplete = (props: ValidatedTextFieldProps) => {
  const fetcher = useFetcher<TAdminApiCategoriesLoader>();

  const {name, label, localValue, listTitle, placeholder, autoComplete, setLocalValue} = props;
  const {error, getInputProps} = useField(name);
  const {onChange: inputPropsOnChange} = getInputProps();

  console.log("inputPropsOnChange", inputPropsOnChange)
  const defaultSelected = localValue ? [localValue.value] : [];
  const [selectedOptions, setSelectedOptions] = useState<string[]>(defaultSelected);
  const [options, setOptions] = useState<Option[]>([]);
  const [inputValue, setInputValue] = useState<string>(localValue?.label || '');
  const [value, setValue] = useState<string | undefined>(localValue?.value);

  const timerRef = React.useRef<number | null>(null);
  console.log("selectedOptions", selectedOptions)
  const updateText = useCallback(
    (value: string) => {
      setInputValue(value);

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = window.setTimeout(() => {
        fetcher.load(`${EAdminNavigation.apiCategories}?q=${value}`);
      }, 300);
    },
    [],
  );

  const handleSelect = useCallback((selected: string[]) => {
    const selectedOption = options.find((option) => option.value === selected[0]);

    if (!selectedOption) {
      return;
    }
    setLocalValue(selectedOption)
    setSelectedOptions([selectedOption.value]);
    setValue(selectedOption.value);
    setInputValue(selectedOption.label);
    inputPropsOnChange?.();
  }, [options, inputPropsOnChange]);

  useEffect(() => {
    if (inputValue) {
      fetcher.load(`${EAdminNavigation.apiCategories}?q=${inputValue}`);
    } else {
      fetcher.load(`${EAdminNavigation.apiCategories}`);
    }

  }, [inputValue]);

  useEffect(() => {
    console.log("fetcher.data?.categories", fetcher.data?.categories)
    setOptions(fetcher.data?.categories?.map((category) => ({
      value: category.id,
      label: `${category.title} (${category.slug})`,
    })) || []);
  }, [fetcher.data?.categories]);

  const textField = (
    <Autocomplete.TextField
      onChange={updateText}
      label={label}
      value={inputValue}
      placeholder={placeholder}
      autoComplete={autoComplete || 'off'}
      error={error}
    />
  );

  return (
    <>
      <Autocomplete
        listTitle={listTitle}
        options={options}
        selected={selectedOptions}
        textField={textField}
        onSelect={handleSelect}
        loading={false}
        willLoadMoreResults={false}
      />
      <input type="hidden" name={name} value={value}/>
    </>
  );
};

