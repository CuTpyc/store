import type {Customer, CustomerAddress} from '@prisma/client';

type ExcludedField = 'id' | 'password' | 'createdAt' | 'updatedAt' | 'deletedAt'
export type TCustomerDto = Omit<Customer, ExcludedField> & {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  addresses?: TCustomerAddressDto[];
}

type ExcludedAddressField = 'id' | 'customerId' | 'createdAt' | 'updatedAt'
export type TCustomerAddressDto = Omit<CustomerAddress, ExcludedAddressField> & {
  id: string;
  customerId: string;
  createdAt: string;
  updatedAt: string;
}
