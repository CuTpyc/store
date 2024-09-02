import { ActionFunctionArgs,json,LoaderFunctionArgs,redirect } from "@remix-run/node";
import { languageCookie } from "~/resources/cookies/language.cookie";
import { EAdminNavigation } from "~/admin/constants/navigation.constant";
import { getAuthUser } from "../../services/auth.service";
import { prisma } from "~/.server/shared/services/prisma.service";
import i18next from "~/localization/i18n.server";

export const changeUserLanguageLoader = async function loader({ request }: LoaderFunctionArgs) {
  const user = await getAuthUser(request);
  const cookieHeader = request.headers.get('Cookie');
  const cookie = (await languageCookie.parse(cookieHeader)) ?? null;

  if(user.setedLanguage) {
    return json({locale: user.setedLanguage})
  }

  if(cookie) {
    return json({locale: cookie})
  }


  return json({locale: await i18next.getLocale(request)})


}
