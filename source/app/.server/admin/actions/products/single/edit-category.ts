import {validationError} from 'remix-validated-form';
import {prisma} from '~/.server/shared/services/prisma.service';
import {redirect} from '@remix-run/node';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {categoryFormValidator} from '~/admin/components/products/Single/CategoryForm.validator';

type Args = {
  id: number;
  formData: FormData;
}

export async function editCategory({id, formData}: Args) {

  // validate form data
  const data = await categoryFormValidator.validate(
    formData
  );

  if (data.error) {
    return validationError(data.error);
  }

  const {categoryId} = data.data;

  const category = await prisma.category.findFirst({
    where: {
      id: categoryId,
      deletedAt: null
    }
  });

  if (!category) {
    return validationError({
      fieldErrors: {
        categoryId: 'Category not found'
      }
    });
  }


  // create new Address
  await prisma.product.update({
    where: {
      id
    },
    data: {
      categoryId
    }
  });

  return redirect(`${EAdminNavigation.products}/${id}`);
}
