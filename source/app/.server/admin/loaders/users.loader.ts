import {json, LoaderFunctionArgs, redirect} from '@remix-run/node';
import {prisma} from '~/.server/shared/services/prisma.service';
import {userMapper} from '~/.server/admin/mappers/user.mapper';
import {withZod} from '@rvf/zod';
import {z} from 'zod';
import {$Enums, Prisma} from '@prisma/client';
import type {SerializeFrom} from '@remix-run/server-runtime';
import {
  hasNextCalculate,
  makeQuery,
  queryToPagination,
  queryToSearch,
  queryToSort,
  requestToSearchParams,
  sortValueToField
} from '~/.server/admin/utils/query.util';
import {containsInsensitive} from '~/.server/shared/utils/prisma.util';
import {EUsersSortVariant} from '~/admin/components/UsersTable/UsersTableFilters';
import {ESoftDeleteStatus} from '~/admin/constants/entries.constant';
import { authenticator } from '../services/auth.service';
import { EAdminNavigation } from '~/admin/constants/navigation.constant';

type UserOrderByWithRelationInput = Prisma.UserOrderByWithRelationInput;

export const userQueryValidator = withZod(
  z.object({
    role: z.preprocess((val) => String(val).split(','), z.nativeEnum($Enums.AdminRole).array()).optional(),
    softDeleteStatus: z.nativeEnum(ESoftDeleteStatus).optional(),
  })
);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function adminUsersLoader({request}: LoaderFunctionArgs) {
  const userAdmin = await authenticator.isAuthenticated(request, {
    failureRedirect: EAdminNavigation.authLogin,
  });

  if(userAdmin?.role === $Enums.AdminRole.STUFF) {
    return redirect(EAdminNavigation.dashboard)
  }
  const searchParams = requestToSearchParams(request);
  const {data} = await userQueryValidator.validate(
    searchParams
  );
  const search = await queryToSearch(searchParams);
  const pagination = await queryToPagination(searchParams);
  const sort = await queryToSort(searchParams, EUsersSortVariant, EUsersSortVariant.id_desc);
  const orderBy = sortValueToField<UserOrderByWithRelationInput>(sort);

  let searchQuery;
  let filterRoleQuery;
  let filterAccountStatusQuery;

  if (search) {
    searchQuery = {
      OR: [
        {email: containsInsensitive(search)},
        {fullName: containsInsensitive(search)}
      ]
    };
  }

  if (data?.role) {
    filterRoleQuery = {
      role: {
        in: data?.role
      }
    };
  }

  if (data?.softDeleteStatus === ESoftDeleteStatus.deleted) {
    filterAccountStatusQuery = {
      deletedAt: {
        not: null
      }
    };
  }

  if (data?.softDeleteStatus === ESoftDeleteStatus.active) {
    filterAccountStatusQuery = {
      deletedAt: null
    };
  }

  const users = await prisma.user.findMany({
    take: pagination.take,
    skip: pagination.skip,
    where: {
      ...searchQuery,
      ...filterRoleQuery,
      ...filterAccountStatusQuery,
    },
    orderBy
  });

  pagination.count = users.length;
  pagination.total = await prisma.user.count({
    where: {
      ...searchQuery,
      ...filterRoleQuery,
      ...filterAccountStatusQuery,
    }
  });

  pagination.hasNext = hasNextCalculate(pagination);

  return json({users: users.map(userMapper), query: makeQuery(search, sort, data), pagination});
}

export type TAdminUsersLoaderData = SerializeFrom<typeof adminUsersLoader>;
