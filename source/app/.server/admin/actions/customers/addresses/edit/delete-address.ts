import {redirect} from '@remix-run/node';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {prisma} from '~/.server/shared/services/prisma.service';
import {CustomerAddress} from '@prisma/client';

type Args = {
  customerAddress: Pick<CustomerAddress, 'customerId' | 'id'>;
}

export async function deleteAddress({customerAddress: {id, customerId}}: Args) {

  // update user
  await prisma.customerAddress.deleteMany({
    where: {id, customerId},
  });

  // redirect to user page
  return redirect(`${EAdminNavigation.customers}/${customerId}`);
}
