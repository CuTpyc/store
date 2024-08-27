import {json, LoaderFunctionArgs, redirect} from '@remix-run/node';
import {authenticator} from '~/.server/admin/services/auth.service';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {prisma} from '~/.server/shared/services/prisma.service';
import {customerMapper} from '~/.server/admin/mappers/customer.mapper';
import {SerializeFrom} from '@remix-run/server-runtime';
import { hasNextCalculate, queryToPagination, requestToSearchParams } from '~/.server/admin/utils/query.util';
import { reviewMapper } from '~/.server/admin/mappers/review.mapper';
import { $Enums } from '@prisma/client';

export async function loader({request, params}: LoaderFunctionArgs) {
  const userAdmin = await authenticator.isAuthenticated(request, {
    failureRedirect: EAdminNavigation.authLogin,
  });

  if(userAdmin?.role === $Enums.AdminRole.STUFF) {
    return redirect(EAdminNavigation.dashboard)
  }
  const searchParams = requestToSearchParams(request);
  const pagination = await queryToPagination(searchParams);


  const {id} = params;
  if (!id) {
    return redirect(EAdminNavigation.customers);
  }

  // get user
  const customer = await prisma.customer.findFirst({
    where: { id: Number(id) },
    include: {
      addresses: true,
    },
  });


  // if not exist
  if (!customer) {
    return redirect(EAdminNavigation.customers);
  }

  const reviews = await prisma.productReview.findMany({
    where: { customerId: customer.id, deletedAt: null },
    take: pagination.take,
    skip: pagination.skip,
  });

  pagination.count = reviews.length;
  pagination.total = await prisma.productReview.count({
    where: { customerId: customer.id, deletedAt: null },
  });
  pagination.hasNext = hasNextCalculate(pagination);

  return json({
    customer: customerMapper(customer),
    reviews: reviews.map(reviewMapper),
    pagination,
  });
}

export type TAdminCustomersSingleLoader = typeof loader;
export type TAdminCustomersSingleLoaderData = SerializeFrom<typeof loader>;
