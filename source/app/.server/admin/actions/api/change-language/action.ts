import {ActionFunctionArgs, redirect} from '@remix-run/node';
import {getAuthUser} from '~/.server/admin/services/auth.service';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {sessionStorage} from '~/.server/admin/utils/session.util';
import { LOCALE_SESSION_KEY } from '~/.server/admin/services/i18next.service';
import {EN_LANG, LANGUAGES} from '~/admin/locale/i18n.config';
import {prisma} from '~/.server/shared/services/prisma.service';
import {$Enums} from '@prisma/client';

export async function action({request}: ActionFunctionArgs) {
  const authUser = await getAuthUser(request);

  const formData = await request.formData();

  const lng = String(formData.get('language') || EN_LANG);

  const language = (LANGUAGES.includes(lng) ? lng : EN_LANG).toUpperCase();

  await prisma.user.update({
    where: {
      id: authUser.id,
    },
    data: {
      language: language as $Enums.Language,
    },
  });

  const session = await sessionStorage.getSession(
    request.headers.get('Cookie')
  );

  session.set(LOCALE_SESSION_KEY, language.toLowerCase());

  const refererUrl = request.headers.get('Referer') || EAdminNavigation.dashboard;
  return redirect(refererUrl, { headers: {'Set-Cookie': await sessionStorage.commitSession(session) },
  });
}
