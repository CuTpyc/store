import {json, LoaderFunctionArgs, redirect} from '@remix-run/node';
import {prisma} from '~/.server/shared/services/prisma.service';
import type {SerializeFrom} from '@remix-run/server-runtime';
import {queryToSearch, requestToSearchParams} from '~/.server/admin/utils/query.util';
import {containsInsensitive} from '~/.server/shared/utils/prisma.util';
import {authenticator} from '~/.server/admin/services/auth.service';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import { apiProductMapper } from '~/.server/admin/mappers/api/products.mapper';
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
        {title: containsInsensitive(search)},
        {slug: containsInsensitive(search)},
      ]
    };
  }

  const products = await prisma.product.findMany({
    take: 10,
    skip: 0,
    where: {
      deletedAt: null,
      ...searchQuery,
    },
  });

  return json({products: products.map(apiProductMapper)});
}

export type TAdminApiProductsLoader = typeof loader;
export type TAdminApiProductsLoaderData = SerializeFrom<typeof loader>;
