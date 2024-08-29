import {ActionFunctionArgs, redirect} from '@remix-run/node';
import {authenticator, getAuthUser} from '~/.server/admin/services/auth.service';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {validationError} from 'remix-validated-form';
import {prisma} from '~/.server/shared/services/prisma.service';
import {newFormValidator} from '~/admin/components/categories/NewForm/NewForm.validator';
import { $Enums } from '@prisma/client';
import { hasAdminRoleOrRedirect } from '~/.server/admin/utils/auth.util';

export async function action({request}: ActionFunctionArgs) {
  const authUser = await getAuthUser(request);
  hasAdminRoleOrRedirect(authUser);

  // validate form data
  const data = await newFormValidator.validate(
    await request.formData()
  );

  if (data.error) {
    return validationError(data.error);
  }

  const {title, slug, description} = data.data;

  // check unique slug
  const exist = await prisma.category.findFirst({where: {slug}});
  if (exist) {
    return validationError({
      fieldErrors: {
        slug: 'Category with this slug already exist'
      }
    });
  }

  // create new Category
  const newCategory = await prisma.category.create({
    data: {
      slug,
      title,
      description
    }
  });

  return redirect(`${EAdminNavigation.categories}/${newCategory.id}`);
}
