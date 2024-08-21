import {Customer, CustomerAddress, ProductReview} from '@prisma/client';
import {TCustomerAddressDto, TCustomerDto} from '~/.server/admin/dto/customer.dto';

export type CustomerWithRelations = Customer & {
  addresses?: CustomerAddress[];
};

export const customerMapper = (customer: CustomerWithRelations): TCustomerDto => {
  return {
    id: String(customer.id),
    firstName: customer.firstName,
    lastName: customer.lastName,
    phone: customer.phone,
    note: customer.note,
    email: customer.email,
    createdAt: customer.createdAt.toJSON(),
    updatedAt: customer.updatedAt.toJSON(),
    deletedAt: customer.deletedAt ? customer.deletedAt.toJSON() : null,
    addresses: customer.addresses?.map(customerAddressMapper),
  };
};

export const customerAddressMapper = (address: CustomerAddress): TCustomerAddressDto => {
  return {
    id: String(address.id),
    customerId: String(address.customerId),
    firstName: address.firstName,
    lastName: address.lastName,
    phone: address.phone,
    address: address.address,
    city: address.city,
    country: address.country,
    company: address.company,
    apartment: address.apartment,
    postalCode: address.postalCode,
    createdAt: address.createdAt.toJSON(),
    updatedAt: address.updatedAt.toJSON()
  };
};
