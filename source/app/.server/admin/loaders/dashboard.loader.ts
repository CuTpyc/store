import {json, LoaderFunctionArgs} from '@remix-run/node';
import {getAuthUser} from '~/.server/admin/services/auth.service';
import {userMapper} from '~/.server/admin/mappers/user.mapper';
import i18nServer from '../services/i18next.service';

export async function adminDashboardLoader({request}: LoaderFunctionArgs) {
  const user = await getAuthUser(request);

  const t = await i18nServer.getFixedT(request);
  const title = t('page.dashboard.meta.title');

  return json({user: userMapper(user), meta: {title}});
}
