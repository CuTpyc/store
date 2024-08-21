import type { Customer } from "@prisma/client";

export type TApiCustomerDto = Omit<
  Pick<Customer, "id" | "firstName" | "lastName" | "email">,"id"> & {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};
