import { withZod } from '@rvf/zod';
import { z } from 'zod';
import { roleRule } from '../../../admin/components/UsersNewForm/UsersNewForm.validator';

export const usersRoleFormValidator = withZod(
  z.object({
    role: roleRule,
  })
);
