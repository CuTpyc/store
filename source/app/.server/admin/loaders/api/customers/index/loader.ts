import {json, LoaderFunctionArgs, redirect} from '@remix-run/node';
import {prisma} from '~/.server/shared/services/prisma.service';
import type {SerializeFrom} from '@remix-run/server-runtime';
import {queryToSearch, requestToSearchParams} from '~/.server/admin/utils/query.util';
import {containsInsensitive} from '~/.server/shared/utils/prisma.util';
import {authenticator} from '~/.server/admin/services/auth.service';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import { apiCustomerMapper } from '~/.server/admin/mappers/api/customers.mapper';
import { $Enums } from '@prisma/client';


// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function loader({request}: LoaderFunctionArgs) {
  const userAdmin = await authenticator.isAuthenticated(request, {
    failureRedirect: EAdminNavigation.authLogin,
  });

  if(userAdmin?.role === $Enums.AdminRole.STUFF) {
    return redirect(EAdminNavigation.dashboard)
  }

  const searchParams = requestToSearchParams(request);
  const search = await queryToSearch(searchParams);

  let searchQuery;
  if (search) {
    searchQuery = {
      OR: [
        {firstName: containsInsensitive(search)},
        {lastName: containsInsensitive(search)},
      ]
    };
  }

  const customers = await prisma.customer.findMany({
    take: 10,
    skip: 0,
    where: {
      deletedAt: null,
      ...searchQuery,
    },
    orderBy: {
      createdAt: 'asc',
    }
  });

  return json({customers: customers.map(apiCustomerMapper)});
}

export type TAdminApiCustomersLoader = typeof loader;
export type TAdminApiCustomersLoaderData = SerializeFrom<typeof loader>;
