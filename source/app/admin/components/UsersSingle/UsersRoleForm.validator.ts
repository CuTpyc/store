import { withZod } from '@rvf/zod';
import { z } from 'zod';
import { roleRule } from '../UsersNewForm/UsersNewForm.validator';

export const usersRoleFormValidator = withZod(
  z.object({
    role: roleRule,
  })
);
