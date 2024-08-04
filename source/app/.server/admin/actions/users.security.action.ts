import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { authenticator } from "~/.server/admin/services/auth.service";
import { EAdminNavigation } from "~/admin/constants/navigation.constant";
import { validationError } from "remix-validated-form";
import { prisma } from "~/.server/shared/utils/prisma.util";
import { hashPassword } from "~/.server/shared/utils/auth.util";
import { usersSecurityFormValidator } from "~/admin/components/UsersSecurityForm/UsersSecurityForm.validator";

export async function adminUsersSecurityAction({
  request,
  params,
}: ActionFunctionArgs) {
  await authenticator.isAuthenticated(request, {
    failureRedirect: EAdminNavigation.authLogin,
  });

  const { id } = params;
  if (!id) {
    return redirect(EAdminNavigation.users);
  }

  // get user
  const user = await prisma.user.findFirst({
    where: { id: Number(id) },
  });

  // if not exist
  if (!user) {
    return redirect(EAdminNavigation.users);
  }

  // validate form data
  const data = await usersSecurityFormValidator.validate(
    await request.formData()
  );

  if (data.error) {
    return validationError(data.error);
  }

  const { password } = data.data;

  // check unique email
  await prisma.user.update({
    where: { id: user.id },
    data: {
      password: await hashPassword(password),
    },
  });

  // redirect to user page
  return redirect(`${EAdminNavigation.users}/${user.id}`);
}
