import {ActionFunctionArgs, redirect} from '@remix-run/node';
import {authenticator, getAuthUser} from '~/.server/admin/services/auth.service';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {validationError} from 'remix-validated-form';
import {usersNewFormValidator} from '~/admin/components/UsersNewForm/UsersNewForm.validator';
import {prisma} from '~/.server/shared/services/prisma.service';
import {$Enums} from '@prisma/client';
import {hashPassword} from '~/.server/shared/utils/auth.util';
import {joinFirstName} from '~/admin/utils/user.util';
import { hasAdminRoleOrRedirect } from '../utils/auth.util';
import i18nServer from '~/.server/admin/services/i18next.service';

export async function adminUsersNewAction({request}: ActionFunctionArgs) {
  const authUser = await getAuthUser(request);
  hasAdminRoleOrRedirect(authUser);
  let t = await i18nServer.getFixedT(request);
  // validate form data
  const data = await usersNewFormValidator.validate(
    await request.formData()
  );



  if (data.error) {
    return validationError(data.error);
  }

  const {email, password, lastName, firstName, role} = data.data;
  const userError = t("user.create.error")
  // check unique email
  const exist = await prisma.user.findFirst({where: {email}});
  if (exist) {
    return validationError({
      fieldErrors: {
        email: userError
      }
    });
  }

  // create new User
  const newUser = await prisma.user.create({
    data: {
      email,
      password: await hashPassword(password),
      fullName: joinFirstName(firstName, lastName),
      role: role as $Enums.AdminRole
    }
  });

  return redirect(`${EAdminNavigation.users}/${newUser.id}`);
}
