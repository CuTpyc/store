import {json, LoaderFunctionArgs, redirect} from '@remix-run/node';
import {prisma} from '~/.server/shared/services/prisma.service';
import type {SerializeFrom} from '@remix-run/server-runtime';
import {queryToSearch, requestToSearchParams} from '~/.server/admin/utils/query.util';
import {containsInsensitive} from '~/.server/shared/utils/prisma.util';
import {apiCategoryMapper} from '~/.server/admin/mappers/api/category.mapper';
import {authenticator} from '~/.server/admin/services/auth.service';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
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

  const categories = await prisma.category.findMany({
    take: 10,
    skip: 0,
    where: {
      deletedAt: null,
      ...searchQuery,
    },
    orderBy: {
      title: 'asc',
    }
  });


  return json({categories: categories.map(apiCategoryMapper)});
}

export type TAdminApiCategoriesLoader = typeof loader;
export type TAdminApiCategoriesLoaderData = SerializeFrom<typeof loader>;
