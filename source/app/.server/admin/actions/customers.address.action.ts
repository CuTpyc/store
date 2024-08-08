// customers.address.action.ts
import { ActionFunctionArgs, redirect } from '@remix-run/node';
import { authenticator } from '~/.server/admin/services/auth.service';
import { EAdminNavigation } from '~/admin/constants/navigation.constant';
import { validationError } from 'remix-validated-form';
import { prisma } from '~/.server/shared/utils/prisma.util';
import { addressFormValidator } from '~/admin/components/CustomersAddressForm/CustomersAddressForm.validator';

export async function customersAddressAction({
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
    include: { addresses: true },
  });

  // if not exist
  if (!customer) {
    return redirect(EAdminNavigation.customers);
  }

  // validate form data
  const data = await addressFormValidator.validate(await request.formData());

  if (data.error) {
    return validationError(data.error);
  }

  const { company, country, city, address, apartment, postalCode } = data.data;

  // update customer address
  const updatedAddress = await prisma.customerAddress.updateMany({
    where: { customerId: Number(id) },
    data: {
      company,
      country,
      city,
      address,
      apartment,
      postalCode,
    },
  });

  if (!updatedAddress) {
    return redirect(EAdminNavigation.customers);
  }

  // redirect to customer page
  return redirect(`${EAdminNavigation.customers}/${customer.id}`);
}
