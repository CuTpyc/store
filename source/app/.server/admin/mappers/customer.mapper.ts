import { Customer, CustomerAddress } from "@prisma/client";
import { TCustomerDto, FullCustomer } from "../dto/customer.dto";



export const customersMapper = (customer: FullCustomer): TCustomerDto => {
  return {

    id: String(customer.id),
    firstName: customer.firstName,
    lastName: customer.lastName,
    email: customer.email,
    phone: customer.phone ? customer.phone : null,
    note: customer.note ? customer.note : null,
    createdAt: customer.createdAt,
    updatedAt: customer.updatedAt,
    deletedAt: customer.deletedAt ? customer.deletedAt : null,
    addresses: {
        id: String(customer.addresses.id),
        customerId: String(customer.id),
        country: customer.addresses.country,
        firstName: null,
        lastName: null,
        company: customer.addresses.company ? customer.addresses.company : null,
        address: customer.addresses.address,
        apartment: customer.addresses.apartment ? customer.addresses.apartment : null,
        city: customer.addresses.city,
        postalCode: customer.addresses.postalCode,
        phone: customer.addresses.phone ? customer.addresses.phone : null,
        createdAt: customer.addresses.createdAt,
        updatedAt: customer.addresses.updatedAt,
    }
  };
};
