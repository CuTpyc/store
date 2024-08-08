import { Customer, CustomerAddress } from '@prisma/client';

export type CustomerWithAddresses = Customer & {
  addresses: CustomerAddress[];
};

type ExcludedField = 'id' | 'createdAt' | 'updatedAt' | 'deletedAt';

export type TCustomerDto = Omit<Customer, ExcludedField> & {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  addresses: TCustomerAddressDto[];
};

export type TCustomerAddressDto = Omit<CustomerAddress, ExcludedField> & {
  id: string;
  createdAt: string;
  updatedAt: string;
};
