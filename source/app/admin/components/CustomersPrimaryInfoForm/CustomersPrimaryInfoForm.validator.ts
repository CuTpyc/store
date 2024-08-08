import { withZod } from '@rvf/zod';
import { z } from 'zod';
import {
  emailRule,
  firstNameRule,
  lastNameRule,
} from '~/admin/components/CustomersNewForm/CustomersNewForm.validator';

export const customersPrimaryInfoFormValidator = withZod(
  z.object({
    email: emailRule,
    firstName: firstNameRule,
    lastName: lastNameRule,
  })
);
