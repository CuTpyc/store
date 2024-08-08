import { ActionFunctionArgs, redirect } from '@remix-run/node';
import { authenticator } from '~/.server/admin/services/auth.service';
import { EAdminNavigation } from '~/admin/constants/navigation.constant';
import { validationError } from 'remix-validated-form';
import { prisma } from '~/.server/shared/utils/prisma.util';
import { customersSecurityFormValidator } from '~/admin/components/CustomersSecurityForm/CustomersSecurityForm.validator';
import { hashPassword } from '~/.server/shared/utils/auth.util';

export async function adminCustomersSecurityAction({
  request,
  params,
}: ActionFunctionArgs) {
  await authenticator.isAuthenticated(request, {
    failureRedirect: EAdminNavigation.authLogin,
  });

  const { id } = params;
  if (!id) {
    return redirect(EAdminNavigation.customers);
  }

  // get customer
  const customer = await prisma.customer.findFirst({
    where: { id: Number(id) },
  });

  // if not exist
  if (!customer) {
    return redirect(EAdminNavigation.customers);
  }

  // validate form data
  const data = await customersSecurityFormValidator.validate(
    await request.formData()
  );

  if (data.error) {
    return validationError(data.error);
  }

  const { password } = data.data;

  // check unique email
  await prisma.customer.update({
    where: { id: customer.id },
    data: {
      password: await hashPassword(password),
    },
  });

  // redirect to customer page
  return redirect(`${EAdminNavigation.customers}/${customer.id}`);
}
