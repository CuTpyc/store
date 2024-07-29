import { TextField, TextFieldProps } from "@shopify/polaris";
import { useCallback, useState } from "react";
import { useField } from "remix-validated-form";

export type TValidatedTextField = TextFieldProps &{
  name: string
} 

export const ValidatedTextField = (props: TValidatedTextField) => {
  const {name, type, ...rest } = props
  const { error, getInputProps } = useField(name);
  const { onChange: inputPropsOnChange, ...restInputProps} = getInputProps()
  const [value, setValue] = useState<string>('')

  const onChange = useCallback((val: string) => {
    setValue(val)
    inputPropsOnChange?.(val)
  }, [setValue, inputPropsOnChange])

  return (
    <TextField
      value={value}
      onChange={onChange}
      {... rest}
      {...restInputProps}
      type={type}
      error={error}
    />
  );
};

// import { useField } from "remix-validated-form";

// type MyInputProps = {
//   name: string;
//   label: string;
// };

// export const MyInput = ({ name, label }: MyInputProps) => {
//   const { error, getInputProps } = useField(name);
//   return (
//     <div>
//       <label htmlFor={name}>{label}</label>
//       <input {...getInputProps({ id: name })} />
//       {error && (
//         <span className="my-error-class">{error}</span>
//       )}
//     </div>
//   );
// };