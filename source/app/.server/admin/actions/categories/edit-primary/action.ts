import {ActionFunctionArgs, redirect} from '@remix-run/node';
import {authenticator} from '~/.server/admin/services/auth.service';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {prisma} from '~/.server/shared/services/prisma.service';
import {validationError} from 'remix-validated-form';
import {editPrimaryFormValidator} from '~/admin/components/categories/EditPrimaryForm/EditPrimaryForm.validator';
import { $Enums } from '@prisma/client';

export async function action({request, params}: ActionFunctionArgs) {
  const userAdmin = await authenticator.isAuthenticated(request, {
    failureRedirect: EAdminNavigation.authLogin,
  });

  if(userAdmin?.role === $Enums.AdminRole.STUFF) {
    return redirect(EAdminNavigation.dashboard)
  }

  const {id} = params;
  if (!id) {
    return redirect(EAdminNavigation.categories);
  }

  // get category
  const category = await prisma.category.findFirst({
    where: {id: Number(id)}
  });

  // if not exist
  if (!category) {
    return redirect(EAdminNavigation.categories);
  }

  // validate form data
  const data = await editPrimaryFormValidator.validate(
    await request.formData()
  );

  if (data.error) {
    return validationError(data.error);
  }

  const {slug, title, description} = data.data;

  // check unique slug
  const exist = await prisma.category.findFirst({
    where: {
      slug,
      id: {
        not: Number(id)
      }
    }
  });

  if (exist) {
    return validationError({
      fieldErrors: {
        slug: 'Category with this slug already exist'
      }
    });
  }

  // update category
  await prisma.category.update({
    where: {id: Number(id)},
    data: {
      slug,
      title,
      description
    }
  });

  // redirect to user page
  return redirect(`${EAdminNavigation.categories}/${id}`);
}
