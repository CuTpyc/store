import {prisma} from '~/.server/shared/services/prisma.service';
import {redirect} from '@remix-run/node';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {$Enums} from '@prisma/client';

type Args = {
  id: number;
}

export async function deleteProduct({id}: Args) {

  // update product
  await prisma.product.update({
    where: {id: Number(id)},
    data: {
      status: $Enums.ProductStatus.ARCHIVED,
      deletedAt: new Date()
    }
  });

  // redirect to user page
  return redirect(`${EAdminNavigation.products}`);
}
