import {withZod} from '@rvf/zod';
import {z} from 'zod';

export const customerDeleteFormValidator = withZod(
  z.object({})
);
