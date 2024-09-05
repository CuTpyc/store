import {ActionFunctionArgs, redirect} from '@remix-run/node';
import {authenticator, getAuthUser} from '~/.server/admin/services/auth.service';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {validationError} from 'remix-validated-form';
import {prisma} from '~/.server/shared/services/prisma.service';
import {usersPrimaryInfoFormValidator} from '~/admin/components/UsersPrimaryInfoForm/UsersPrimaryInfoForm.validator';
import {joinFirstName} from '~/admin/utils/user.util';
import { $Enums } from '@prisma/client';
import { hasAdminRoleOrRedirect } from '../utils/auth.util';
import i18nServer from '~/.server/admin/services/i18next.service';

export async function adminUsersPrimaryAction({request, params}: ActionFunctionArgs) {
  const authUser = await getAuthUser(request);
  hasAdminRoleOrRedirect(authUser);
  let t = await i18nServer.getFixedT(request);
  const {id} = params;
  if (!id) {
    return redirect(EAdminNavigation.users);
  }

  // get user
  const user = await prisma.user.findFirst({
    where: {id: Number(id)}
  });

  // if not exist
  if (!user) {
    return redirect(EAdminNavigation.users);
  }

  // validate form data
  const data = await usersPrimaryInfoFormValidator.validate(
    await request.formData()
  );

  if (data.error) {
    return validationError(data.error);
  }

  const {email, lastName, firstName} = data.data;
  const userError = t("user.create.error")
  // check unique email
  const exist = await prisma.user.findFirst({where: {email}});
  if (exist && exist.id !== user.id) {
    return validationError({
      fieldErrors: {
        email: userError
      }
    });
  }

  // update user
  await prisma.user.update({
    where: {id: user.id},
    data: {
      email,
      fullName: joinFirstName(firstName, lastName)
    }
  });

  // redirect to user page
  return redirect(`${EAdminNavigation.users}/${user.id}`);
}
