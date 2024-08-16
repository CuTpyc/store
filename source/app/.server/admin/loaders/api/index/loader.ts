import { json, LoaderFunctionArgs, SerializeFrom } from "@remix-run/node";
import { prisma } from "~/.server/shared/services/prisma.service";
import { categoryApiMapper } from "~/.server/admin/mappers/category.api.mapper";
import { queryToSearch, requestToSearchParams } from "~/.server/admin/utils/query.util";

export async function loader({ request }: LoaderFunctionArgs) {
  const searchParams = requestToSearchParams(request);
  const search = await queryToSearch(searchParams);

  const categories = await prisma.category.findMany({
    where: {
      deletedAt: null,
      title: {
        contains: search || "",
        mode: "insensitive",
      },
    },
    select: {
      id: true,
      title: true,
    },
    take: 10,
  });

  return json({
    categories: categories.map(categoryApiMapper),
  });
}

export type TApiAdminCategoriesLoader = typeof loader;
export type TApiAdminCategoriesLoaderData = SerializeFrom<typeof loader>;
