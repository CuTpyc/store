import React, {useCallback, useEffect, useState} from 'react';
import {useFetcher} from '@remix-run/react';
import {
  TAutocompleteOption,
  ValidatedAutocomplete,
  ValidatedAutocompleteProps
} from '~/admin/ui/ValidatedAutocomplete/ValidatedAutocomplete';
import {SerializeFrom} from '@remix-run/server-runtime';


export type ValidatedLazyAutocompleteProps<TData> =
  Pick<ValidatedAutocompleteProps, 'name' | 'label' | 'listTitle' | 'placeholder' | 'autoComplete' | 'defaultValue'> &
  {
    url: string;
    responseToOptions: (data?: SerializeFrom<TData>) => ValidatedAutocompleteProps['options'];
  }

export const ValidatedLazyAutocomplete = <TData = unknown>(props: ValidatedLazyAutocompleteProps<TData>) => {
  const fetcher = useFetcher<TData>();

  const {name, label, defaultValue, listTitle, placeholder, autoComplete, url, responseToOptions} = props;

  const defaultOptions = defaultValue ? [{...defaultValue}] : [];
  const [options, setOptions] = useState<TAutocompleteOption[]>(defaultOptions);

  const timerRef = React.useRef<number | null>(null);

  const onChangeSearchQuery = useCallback(
    (value: string) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = window.setTimeout(() => {
        fetcher.load(`${url}?q=${value}`);
      }, 300);
    },
    [url],
  );


  useEffect(() => {
    if (!defaultValue?.value) {
      fetcher.load(url);
    }
    if (defaultValue?.label) {
      fetcher.load(`${url}?q=${defaultValue.label}`);
    }

  }, [defaultValue?.label, defaultValue?.value]);

  useEffect(() => {
    if (fetcher.state === 'idle') {
      if (fetcher.data) {
        setOptions(
          responseToOptions(fetcher.data),
        );
      }
    }
  }, [fetcher]);


  return (
    <ValidatedAutocomplete
      name={name}
      label={label}
      listTitle={listTitle}
      placeholder={placeholder}
      autoComplete={autoComplete}
      options={options}
      onChangeSearchQuery={onChangeSearchQuery}
      defaultValue={defaultValue}
    />
  );
};

