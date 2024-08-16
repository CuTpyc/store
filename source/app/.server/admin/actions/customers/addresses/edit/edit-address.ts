import {redirect} from '@remix-run/node';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {prisma} from '~/.server/shared/services/prisma.service';
import {validationError} from 'remix-validated-form';
import {editFormValidator} from '~/admin/components/customers/addresses/EditForm/EditForm.validator';
import {CustomerAddress} from '@prisma/client';

type Args = {
  customerAddress: Pick<CustomerAddress, 'customerId' | 'id'>;
  formData: FormData;
}

export async function editAddress({customerAddress: {id, customerId}, formData}: Args) {

  // validate form data
  const data = await editFormValidator.validate(
    formData
  );

  if (data.error) {
    return validationError(data.error);
  }

  const {address} = data.data;

  // create new Address
  await prisma.customerAddress.update({
    where: {
      id
    },
    data: {
      ...address,
    }
  });

  return redirect(`${EAdminNavigation.customers}/${customerId}`);
}
