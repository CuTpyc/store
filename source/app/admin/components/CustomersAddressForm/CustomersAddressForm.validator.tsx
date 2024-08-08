// CustomersAddressForm.validator.ts
import { withZod } from '@rvf/zod';
import { z } from 'zod';

export const addressFormValidator = withZod(
  z.object({
    company: z.string().min(1, { message: 'Company is required' }),
    country: z.string().min(1, { message: 'Country is required' }),
    city: z.string().min(1, { message: 'City is required' }),
    address: z.string().min(1, { message: 'Address is required' }),
    apartment: z.string().min(1, { message: 'Apartment is required' }),
    postalCode: z.string().min(1, { message: 'Postal code is required' }),
  })
);
