import { useField } from "remix-validated-form";
import { Select, SelectProps } from "@shopify/polaris";
import { useCallback, useEffect, useState } from "react";

export type ValidatedTextFieldProps = SelectProps & {
  name: string;
  options: SelectProps["options"];
  defaultValue?: string;
};

export const ValidatedSelect = (props: ValidatedTextFieldProps) => {
  const { name, defaultValue, ...rest } = props;
  const { error, getInputProps } = useField(name);
  const { onChange: inputPropsOnChange, ...restInputProps } = getInputProps();
  const [value, setValue] = useState<string>(defaultValue || "");

  const onChange = useCallback(
    (val: string) => {
      setValue(val);
      inputPropsOnChange?.(val);
    },
    [setValue, inputPropsOnChange]
  );

  useEffect(() => {
    if (defaultValue) {
      setValue(defaultValue);
    }
  }, [defaultValue]);

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
