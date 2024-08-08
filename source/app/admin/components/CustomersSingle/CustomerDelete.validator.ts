import { z } from 'zod';

export const customerDeleteValidator = z.object({
  deletedAt: z.nullable(z.string()).refine((val) => val === null, {
    message: 'Customer has been already deleted',
  }),
});
