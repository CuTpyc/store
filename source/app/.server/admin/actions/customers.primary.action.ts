import { ActionFunctionArgs, redirect } from '@remix-run/node';
import { authenticator } from '~/.server/admin/services/auth.service';
import { EAdminNavigation } from '~/admin/constants/navigation.constant';
import { validationError } from 'remix-validated-form';
import { prisma } from '~/.server/shared/utils/prisma.util';
import { customersPrimaryInfoFormValidator } from '~/admin/components/CustomersPrimaryInfoForm/CustomersPrimaryInfoForm.validator';

export async function adminCustomersPrimaryAction({
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

  // get user
  const customer = await prisma.customer.findFirst({
    where: { id: Number(id) },
  });

  // if not exist
  if (!customer) {
    return redirect(EAdminNavigation.customers);
  }

  // validate form data
  const data = await customersPrimaryInfoFormValidator.validate(
    await request.formData()
  );

  if (data.error) {
    return validationError(data.error);
  }

  const { email, lastName, firstName } = data.data;

  // check unique email
  const exist = await prisma.user.findFirst({ where: { email } });
  if (exist && exist.id !== customer.id) {
    return validationError({
      fieldErrors: {
        email: 'Customer already exists',
      },
    });
  }

  // update customer
  await prisma.customer.update({
    where: { id: customer.id },
    data: {
      email,
      firstName,
      lastName,
    },
  });

  // redirect to user page
  return redirect(`${EAdminNavigation.customers}/${customer.id}`);
}
