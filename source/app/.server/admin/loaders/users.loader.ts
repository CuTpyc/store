import {json, LoaderFunctionArgs} from '@remix-run/node';
import {prisma} from '~/.server/shared/utils/prisma.util';
import {userMapper} from '~/.server/admin/mappers/user.mapper';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function adminUsersLoader({request}: LoaderFunctionArgs) {
  const users = await prisma.user.findMany();

  return json({users: users.map(userMapper)});
}
