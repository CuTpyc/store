import {useField} from 'remix-validated-form';
import {TextField, TextFieldProps} from '@shopify/polaris';
import {useCallback, useEffect, useState} from 'react';

export type ValidatedTextFieldProps = TextFieldProps & {
  name: string;
  defaultValue?: string;
}

export const ValidatedTextField = (props: ValidatedTextFieldProps) => {
  const {name, type, defaultValue, ...rest} = props;
  const {error, getInputProps} = useField(name);
  const {onChange: inputPropsOnChange, ...restInputProps} = getInputProps();
  const [value, setValue] = useState<string>(defaultValue || '');

  const onChange = useCallback((val: string) => {
    setValue(val);
    inputPropsOnChange?.(val);
  }, [setValue, inputPropsOnChange]);

  useEffect(() => {
    if (defaultValue) {
      setValue(defaultValue);
    }
  }, [defaultValue]);

  return (
    <TextField
      value={value}
      onChange={onChange}
      {...rest}
      {...restInputProps}
      type={type}
      error={error}
    />
  );
};
