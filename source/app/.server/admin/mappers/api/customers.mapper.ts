import { Customer, Product } from "@prisma/client";
import { TApiCustomerDto } from "../../dto/api/customer.dto";

export const apiCustomerMapper = (customer: Customer): TApiCustomerDto => {
  return {
    id: String(customer.id),
    firstName: customer.firstName,
    lastName: customer.lastName,
    email: customer.email,
  };
};
