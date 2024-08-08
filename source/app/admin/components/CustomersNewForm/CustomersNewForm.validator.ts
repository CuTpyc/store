// CustomersNewForm.validator.ts
import { withZod } from '@rvf/zod';
import { z } from 'zod';

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

export const emailRule = z
  .string()
  .trim()
  .min(1, { message: 'Email is required' })
  .email('Must be a valid email');

export const firstNameRule = z
  .string()
  .trim()
  .min(1, { message: 'First Name is required' });
export const lastNameRule = z
  .string()
  .trim()
  .min(1, { message: 'Last Name is required' });
export const passwordRule = z
  .string()
  .trim()
  .min(8, { message: 'Password must be greater than 8' });
export const phoneRule = z
  .string()
  .regex(phoneRegex, 'Must be a valid phone number');
export const noteRule = z
  .string()
  .trim()
  .max(250, { message: 'Note must be less than 250 characters' });
export const passwordConfirmRule = z.string();

export const addressRule = z.object({
  company: z.string().optional(),
  country: z.string().optional(),
  city: z.string().optional(),
  address: z.string().optional(),
  apartment: z.string().optional(),
  postalCode: z.string().optional(),
  phone: z.string().optional(),
});

export const customersNewFormValidator = withZod(
  z
    .object({
      email: emailRule,
      firstName: firstNameRule,
      lastName: lastNameRule,
      password: passwordRule,
      passwordConfirm: passwordConfirmRule,
      phone: phoneRule,
      note: noteRule,
      address: addressRule,
    })
    .refine((data) => data.password === data.passwordConfirm, {
      message: "Passwords don't match",
      path: ['passwordConfirm'], // path of error
    })
);
