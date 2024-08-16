import {withZod} from '@rvf/zod';
import {z} from 'zod';

export const deleteFormValidator = withZod(
  z.object({})
);
