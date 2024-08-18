import React, {useEffect, useState} from 'react';
import { PureValidatedAutocomplete } from './ValidatedAutocomplete';

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
  fetcherData?: object;
  initialOption?: Option;
  options?: Option[];
  fetchOptions: (query: string) => void;
  pickOptions: () => Option[];
}

export const ValidatedAutocompleteWrapper = (props: ValidatedTextFieldProps) => {

  const {fetcherData, initialOption, options, fetchOptions = () => {}, pickOptions = () => [], ...autocompleteProps} = props;

  const [query, setQuery] = useState<string>(initialOption?.label || '');
  const [localOptions, setLocalOptions] = useState<Option[]>([]);
  const [selectedOption, setSelectedOption] = useState<Option | undefined>(initialOption);

  const fullAutocompleteProps = {
    ...autocompleteProps,
    setQuery,
    selectedOption,
    setSelectedOption
  }

  useEffect(() => {
    setQuery(selectedOption?.label ?? '')
  }, [selectedOption]);

  useEffect(() => {
    if (!options) {
      fetchOptions(query)
    } else {
      setLocalOptions(options)
    }
  }, [query]);

  useEffect(() => {
    setLocalOptions(pickOptions())
  }, [fetcherData]);

  return (
    <PureValidatedAutocomplete
      {...fullAutocompleteProps}
      options={localOptions}
    />
  );
};
