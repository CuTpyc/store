import { z } from 'zod';

export const userDeleteValidator = z.object({
  deletedAt: z.nullable(z.string()).refine((val) => val === null, {
    message: 'User has been already deleted',
  }),
});
