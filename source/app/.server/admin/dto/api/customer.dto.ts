import type { Customer } from "@prisma/client";

export type TApiCustomerDto = Omit<
  Pick<Customer, "id" | "firstName" | "lastName">,"id"> & {
  id: string;
  firstName: string;
  lastName: string;
};
