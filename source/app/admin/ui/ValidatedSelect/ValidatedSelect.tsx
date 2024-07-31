import {useField} from 'remix-validated-form';
import {Select, SelectProps} from '@shopify/polaris';
import {useCallback, useState} from 'react';

export type ValidatedTextFieldProps = SelectProps & {
  name: string;
  options: SelectProps['options']
}

export const ValidatedSelect = (props: ValidatedTextFieldProps) => {
  const {name, ...rest} = props;
  const {error, getInputProps} = useField(name);
  const {onChange: inputPropsOnChange, ...restInputProps} = getInputProps();
  const [value, setValue] = useState<string>('');

  const onChange = useCallback((val: string) => {
    setValue(val);
    inputPropsOnChange?.(val);
  }, [setValue, inputPropsOnChange]);

  return (
    <Select
      value={value}
      onChange={onChange}
      {...rest}
      {...restInputProps}
      error={error}
    />
  );
};
