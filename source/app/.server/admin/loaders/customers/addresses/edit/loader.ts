import {json, LoaderFunctionArgs, redirect} from '@remix-run/node';
import {authenticator} from '~/.server/admin/services/auth.service';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {prisma} from '~/.server/shared/services/prisma.service';
import {customerAddressMapper} from '~/.server/admin/mappers/customer.mapper';
import {SerializeFrom} from '@remix-run/server-runtime';
import { $Enums } from '@prisma/client';

export async function loader({request, params}: LoaderFunctionArgs) {
  const userAdmin = await authenticator.isAuthenticated(request, {
    failureRedirect: EAdminNavigation.authLogin,
  });

  if(userAdmin?.role === $Enums.AdminRole.STUFF) {
    return redirect(EAdminNavigation.dashboard)
  }

  const {id, addressId} = params;
  if (!id || !addressId) {
    return redirect(EAdminNavigation.customers);
  }

  // get customer address
  const customerAddress = await prisma.customerAddress.findFirst({
    where: {id: Number(addressId), customerId: Number(id)}
  });

  // if not exist
  if (!customerAddress) {
    return redirect(EAdminNavigation.customers);
  }

  return json({customerAddress: customerAddressMapper(customerAddress)});
}

export type TAdminCustomersAddressEditLoader = typeof loader;
export type TAdminCustomersAddressEditLoaderData = SerializeFrom<typeof loader>;
