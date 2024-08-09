// customers.loader.ts
import { json, LoaderFunctionArgs, SerializeFrom } from '@remix-run/node';
import { prisma } from '~/.server/shared/utils/prisma.util';
import { customerMapper } from '~/.server/admin/mappers/customer.mapper';
import { withZod } from '@rvf/zod';
import { z } from 'zod';
import { $Enums, Prisma } from '@prisma/client';
import { userQueryValidator } from './users.loader';
import { IOffsetPaginationInfoDto } from '~/.server/shared/dto/offset-pagination-info.dto';

type CustomerOrderByWithRelationInput = Prisma.CustomerOrderByWithRelationInput;

//http://localhost:3000/admin/users?take=1&skip=0&q=ecomcms&role=ADMIN,STUFF&accountStatus=active

export enum EAccountStatus {
  active = 'active',
  disabled = 'disabled',
}

export enum ECustomersSortVariant {
  id_asc = 'id_asc',
  id_desc = 'id_desc',
  email_asc = 'email_asc',
  email_desc = 'email_desc',
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

export const customersSortValueToFieldValue = (sortValue: ECustomersSortVariant) => {
  switch (sortValue) {
    case ECustomersSortVariant.id_asc:
      return { id: 'asc' };
    case ECustomersSortVariant.id_desc:
      return { id: 'desc' };
    case ECustomersSortVariant.email_asc:
      return { email: 'asc' };
    case ECustomersSortVariant.email_desc:
      return { email: 'desc' };
    case ECustomersSortVariant.createdAt_asc:
      return { createdAt: 'asc' };
    case ECustomersSortVariant.createdAt_desc:
      return { createdAt: 'desc' };
    case ECustomersSortVariant.updatedAt_asc:
      return { updatedAt: 'asc' };
    case ECustomersSortVariant.updatedAt_desc:
      return { updatedAt: 'desc' };
    case ECustomersSortVariant.deletedAt_asc:
      return { deletedAt: 'asc' };
    case ECustomersSortVariant.deletedAt_desc:
      return { deletedAt: 'desc' };
  }
};

export const customersQueryValidator = withZod(
  z.object({
    take: z.coerce.number().int().positive().optional(),
    skip: z.coerce.number().int().nonnegative().optional(),
    q: z.string().optional(),
    accountStatus: z.nativeEnum(EAccountStatus).optional(),
    sort: z.nativeEnum(ECustomersSortVariant).optional(),
  })
);


export const adminCustomersLoader = async ( {request}: LoaderFunctionArgs ) => {
  const { searchParams } = new URL(request.url);
  const { data } = await customersQueryValidator.validate(searchParams);

  let take = 2;
  let skip = 0;
  let searchQuery;
  let filterAccountStatusQuery;
  let orderBy: CustomerOrderByWithRelationInput = { id: 'desc' as const };

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
        { firstName: { contains: data?.q, mode: 'insensitive' as const } },
      ],
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
    ? customersSortValueToFieldValue(data.sort)
    : { id: 'desc' };

  if (data?.sort) {
    orderBy = sortValueToField<CustomerOrderByWithRelationInput>(data.sort);
  }

  const pagination: IOffsetPaginationInfoDto = {
    take,
    skip,
    hasNext: false,
    hasPrevious: skip > 0,
    total: 0,
    count: 0,
  };

  const customers = await prisma.customer.findMany({
    take,
    skip,
    where: {
      ...searchQuery,
      ...filterAccountStatusQuery,
    },
    orderBy,
    include: {
      addresses: true
    }
  });

  pagination.count = customers.length;
  pagination.total = await prisma.customer.count({
    where: {
      ...searchQuery,
      ...filterAccountStatusQuery,
    },
  });

  pagination.hasNext = skip + take < pagination.total;

  const customerDtos = customers.map(customerMapper)

  return json({ customers: customerDtos, query: data, pagination });

};

export type TAdminCustomersLoaderData = SerializeFrom<typeof adminCustomersLoader>
