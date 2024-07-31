import {withZod} from '@rvf/zod';
import {z} from 'zod';
import {$Enums} from '@prisma/client';

const ROLE_VALUES = Object.values($Enums.AdminRole) as [string, ...string[]];

export const usersNewFormValidator = withZod(
  z.object({
    email: z
      .string()
      .trim()
      .min(1, {message: 'Email is required'})
      .email('Must be a valid email'),
    firstName: z
      .string()
      .trim()
      .min(1, {message: 'First Name is required'}),
    lastName: z
      .string()
      .trim()
      .min(1, {message: 'Last Name is required'}),
    password: z
      .string()
      .trim()
      .min(8, {message: 'Password must be greater than 8'}),
    passwordConfirm: z.string(),
    role: z.enum(ROLE_VALUES, {message: 'Wrong role value'})
  })
    .refine((data) => data.password === data.passwordConfirm, {
      message: 'Passwords don\'t match',
      path: ['passwordConfirm'], // path of error
    })
);
