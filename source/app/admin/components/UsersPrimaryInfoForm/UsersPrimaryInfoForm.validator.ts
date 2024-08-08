import {withZod} from '@rvf/zod';
import {z} from 'zod';
import {emailRule, firstNameRule, lastNameRule} from '~/admin/components/UsersNewForm/UsersNewForm.validator';

export const usersPrimaryInfoFormValidator = withZod(
  z.object({
    email: emailRule,
    firstName: firstNameRule,
    lastName: lastNameRule,
  })
);
