import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { EAdminNavigation } from "~/admin/constants/navigation.constant";
import { validationError } from "remix-validated-form";
import { prisma } from "~/.server/shared/utils/prisma.util";
import { authenticator } from "~/.server/admin/services/auth.service";

import { customersNewFormValidator } from "~/admin/components/CustomersNewForm/CustomersNewForm.validator";
import { customersAddressesNewFormValidator } from "~/admin/components/CustomersNewForm/CustomersAddressNewForm.validator";

export async function adminCustomersNewAction({ request }: ActionFunctionArgs) {
  await authenticator.isAuthenticated(request, {
    failureRedirect: EAdminNavigation.authLogin,
  });

  // validate form data
  const data = await customersNewFormValidator.validate(await request.formData());
  if (data.error) {
    return validationError(data.error);
  }

  const addressesData = await customersAddressesNewFormValidator.validate(await request.formData());
  if (addressesData.error) {
    return validationError(addressesData.error);
  }

  const { email, password, lastName, firstName, phone, note,} = data.data;

  const { country, city, postalCode, phoneForAddress } = addressesData.data

  // check unique email
  const exist = await prisma.customer.findFirst({ where: { email } });
  if (exist) {
    return validationError({
      fieldErrors: {
        email: "Customer already exists",
      },
    });
  }
  console.log(prisma.customer)
  // create new User
  const newCustomer = await prisma.customer.create({
    data: {
      email,
      password,
      firstName,
      lastName,
      phone,
      note
    },
  });

  const newCustomerAddresse = await prisma.customerAddress.create({
    data: {
      country,
      city,
      postalCode,
      phoneForAddress,
    }
  })

  return redirect(`${EAdminNavigation.customers}/${newCustomer.id}`);
}
