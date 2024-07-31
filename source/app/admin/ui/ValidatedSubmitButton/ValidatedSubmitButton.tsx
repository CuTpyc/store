import {useIsSubmitting} from 'remix-validated-form';
import {Button, ButtonProps} from '@shopify/polaris';

export interface IValidatedSubmitButtonProps extends ButtonProps {
  text: string;
}

export const ValidatedSubmitButton = (props: IValidatedSubmitButtonProps) => {
  const {text, ...rest} = props;
  const isSubmitting = useIsSubmitting();

  return (
    <Button
      {...rest}
      submit={true}
      loading={isSubmitting}
    >{text}</Button>
  );
};
