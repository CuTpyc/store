import { ActionFunctionArgs,redirect } from "@remix-run/node";
import { languageCookie } from "~/resources/cookies/language.cookie";
import { EAdminNavigation } from "~/admin/constants/navigation.constant";
import { getAuthUser } from "../../services/auth.service";
import { prisma } from "~/.server/shared/services/prisma.service";

export const changeUserLanguage = async ({ request, params}: ActionFunctionArgs) => {
  const user = await getAuthUser(request);

  const data = await request.formData()
  const language = data.get('language')?.toString() ?? '';
  const currentLocation = `${data.get('originUrl') ?? EAdminNavigation.dashboard}`

  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: { setedLanguage: language },
  });

  return redirect(currentLocation, {
    headers: {
      "Set-Cookie": await languageCookie.serialize(language),
    },
  });
};
