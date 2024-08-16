import {withZod} from '@rvf/zod';
import {z} from 'zod';
import {
  emailRule,
  firstNameRule,
  lastNameRule,
  phoneRule
} from '~/admin/components/customers/NewForm/NewForm.validator';


export const editPrimaryFormValidator = withZod(
  z.object({
    email: emailRule,
    firstName: firstNameRule,
    lastName: lastNameRule,
    phone: phoneRule,
  })
);
