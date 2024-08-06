import { Customer, CustomerAddress } from "@prisma/client";

type ExcludedField =
  | "id"
  | "password"
  | "createdAt"
  | "updatedAt"
  | "deletedAt";

export type FullCustomer = {
    id: string;
    email: string;
    phone: string | null;
    note: string | null;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    firstName: string;
    lastName: string;
    addresses: {
      id: string;
      customerId: string;
      country: string;
      firstName: string | null;
      lastName: string | null;
      company: string | null;
      address: string;
      apartment: string | null;
      city: string;
      postalCode: string;
      phone: string | null;
      createdAt: Date;
      updatedAt: Date;
    }
} 


export type TCustomerDto = Omit<FullCustomer, ExcludedField> & {
    id: string;
    email: string;
    phone: string | null;
    note: string | null;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    firstName: string;
    lastName: string;
  addresses: {
    id: string;
    customerId: string;
    country: string;
    firstName: string | null;
    lastName: string | null;
    company: string | null;
    address: string;
    apartment: string | null;
    city: string;
    postalCode: string;
    phone: string | null;
    createdAt: Date;
    updatedAt: Date;
  }
};

