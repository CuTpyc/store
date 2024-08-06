import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { EAdminNavigation } from "~/admin/constants/navigation.constant";
import { validationError } from "remix-validated-form";
import { prisma } from "~/.server/shared/utils/prisma.util";
import { $Enums } from "@prisma/client";
import { authenticator } from "~/.server/admin/services/auth.service";
import { usersNewFormValidator } from "~/admin/components/UsersNewForm/UsersNewForm.validator";
import { customersNewFormValidator } from "~/admin/components/CustomersNewForm/CustomersNewForm.validator";

export async function adminCustomersNewAction({ request }: ActionFunctionArgs) {
  await authenticator.isAuthenticated(request, {
    failureRedirect: EAdminNavigation.authLogin,
  });

  // validate form data
  const data = await customersNewFormValidator.validate(await request.formData());
  console.warn(data)
  if (data.error) {
    return validationError(data.error);
  }
  
  const { email, password, lastName, firstName, } = data.data;

  // check unique email
  const exist = await prisma.customer.findFirst({ where: { email } });
  if (exist) {
    return validationError({
      fieldErrors: {
        email: "Customer already exists",
      },
    });
  }

  // create new User
  const newCustomer = await prisma.customer.create({
    data: {
      email,
      password,
      firstName,
      lastName,
    },
  });

  return redirect(`${EAdminNavigation.customers}/${newCustomer.id}`);
}
