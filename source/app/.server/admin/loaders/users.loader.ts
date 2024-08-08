import { json, LoaderFunctionArgs } from '@remix-run/node';
import { prisma } from '~/.server/shared/utils/prisma.util';
import { userMapper } from '~/.server/admin/mappers/user.mapper';
import { withZod } from '@rvf/zod';
import { z } from 'zod';
import { $Enums, Prisma } from '@prisma/client';
import type { SerializeFrom } from '@remix-run/server-runtime';
import { IOffsetPaginationInfoDto } from '~/.server/shared/dto/offset-pagination-info.dto';

type UserOrderByWithRelationInput = Prisma.UserOrderByWithRelationInput;

//http://localhost:3000/admin/users?take=1&skip=0&q=ecomcms&role=ADMIN,STUFF&accountStatus=active

export enum EAccountStatus {
  active = 'active',
  disabled = 'disabled',
}

export enum EUsersSortVariant {
  id_asc = 'id_asc',
  id_desc = 'id_desc',
  fullName_asc = 'fullName_asc',
  fullName_desc = 'fullName_desc',
  email_asc = 'email_asc',
  email_desc = 'email_desc',
  role_asc = 'role_asc',
  role_desc = 'role_desc',
  createdAt_asc = 'createdAt_asc',
  createdAt_desc = 'createdAt_desc',
  updatedAt_asc = 'updatedAt_asc',
  updatedAt_desc = 'updatedAt_desc',
  deletedAt_asc = 'deletedAt_asc',
  deletedAt_desc = 'deletedAt_desc',
}

export const sortValueToField = <O extends object>(value: string) => {
  const [field, order] = value.split('_');
  return {
    [field]: order,
  } as O;
};

export const usersSortValueToFieldValue = (sortValue: EUsersSortVariant) => {
  switch (sortValue) {
    case EUsersSortVariant.id_asc:
      return { id: 'asc' };
    case EUsersSortVariant.id_desc:
      return { id: 'desc' };
    case EUsersSortVariant.fullName_asc:
      return { fullName: 'asc' };
    case EUsersSortVariant.fullName_desc:
      return { fullName: 'desc' };
    case EUsersSortVariant.email_asc:
      return { email: 'asc' };
    case EUsersSortVariant.email_desc:
      return { email: 'desc' };
    case EUsersSortVariant.role_asc:
      return { role: 'asc' };
    case EUsersSortVariant.role_desc:
      return { role: 'desc' };
    case EUsersSortVariant.createdAt_asc:
      return { createdAt: 'asc' };
    case EUsersSortVariant.createdAt_desc:
      return { createdAt: 'desc' };
    case EUsersSortVariant.updatedAt_asc:
      return { updatedAt: 'asc' };
    case EUsersSortVariant.updatedAt_desc:
      return { updatedAt: 'desc' };
    case EUsersSortVariant.deletedAt_asc:
      return { deletedAt: 'asc' };
    case EUsersSortVariant.deletedAt_desc:
      return { deletedAt: 'desc' };
  }
};

export const userQueryValidator = withZod(
  z.object({
    take: z.coerce.number().int().positive().optional(),
    skip: z.coerce.number().int().nonnegative().optional(),
    q: z.string().optional(),
    role: z
      .preprocess(
        (val) => String(val).split(','),
        z.nativeEnum($Enums.AdminRole).array()
      )
      .optional(),
    accountStatus: z.nativeEnum(EAccountStatus).optional(),
    sort: z.nativeEnum(EUsersSortVariant).optional(),
  })
);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function adminUsersLoader({ request }: LoaderFunctionArgs) {
  const { searchParams } = new URL(request.url);
  const { data } = await userQueryValidator.validate(searchParams);

  let take = 2;
  let skip = 0;
  let searchQuery;
  let filterRoleQuery;
  let filterAccountStatusQuery;
  let orderBy: UserOrderByWithRelationInput = { id: 'desc' as const };

  if (data?.take) {
    take = data.take;
  }

  if (data?.skip) {
    skip = data.skip;
  }

  if (data?.q) {
    searchQuery = {
      OR: [
        { email: { contains: data?.q, mode: 'insensitive' as const } },
        { fullName: { contains: data?.q, mode: 'insensitive' as const } },
      ],
    };
  }

  if (data?.role) {
    filterRoleQuery = {
      role: {
        in: data?.role,
      },
    };
  }

  if (data?.accountStatus === EAccountStatus.disabled) {
    filterAccountStatusQuery = {
      deletedAt: {
        not: null,
      },
    };
  }

  if (data?.accountStatus === EAccountStatus.active) {
    filterAccountStatusQuery = {
      deletedAt: null,
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const sortExample = data?.sort
    ? usersSortValueToFieldValue(data.sort)
    : { id: 'desc' };

  if (data?.sort) {
    orderBy = sortValueToField<UserOrderByWithRelationInput>(data.sort);
  }

  const pagination: IOffsetPaginationInfoDto = {
    take,
    skip,
    hasNext: false,
    hasPrevious: skip > 0,
    total: 0,
    count: 0,
  };

  const users = await prisma.user.findMany({
    take,
    skip,
    where: {
      ...searchQuery,
      ...filterRoleQuery,
      ...filterAccountStatusQuery,
    },
    orderBy,
  });

  pagination.count = users.length;
  pagination.total = await prisma.user.count({
    where: {
      ...searchQuery,
      ...filterRoleQuery,
      ...filterAccountStatusQuery,
    },
  });

  pagination.hasNext = skip + take < pagination.total;

  return json({ users: users.map(userMapper), query: data, pagination });
}

export type TAdminUsersLoaderData = SerializeFrom<typeof adminUsersLoader>;
