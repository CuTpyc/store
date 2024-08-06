import { Card, IndexTable, Link } from "@shopify/polaris";
import { FC, useMemo } from "react";
import type { TUserDto } from "~/.server/admin/dto/user.dto";
import type { NonEmptyArray } from "@shopify/polaris/build/ts/src/types";
import { IndexTableHeading } from "@shopify/polaris/build/ts/src/components/IndexTable/IndexTable";
import { EAdminNavigation } from "~/admin/constants/navigation.constant";
import { UserRoleBadge } from "~/admin/components/UsersTable/UserRoleBadge";
import type { TAdminUsersLoaderData } from "~/.server/admin/loaders/users.loader";
import { IOffsetPaginationInfoDto } from "~/.server/shared/dto/offset-pagination-info.dto";
import { AdminUsersTableFilters } from "~/admin/components/UsersTable/UsersTableFilters";
import { usePagination } from "~/admin/hooks/usePagination";
import { TCustomerDto } from "~/.server/admin/dto/customer.dto";
import { TAdminCustomersLoaderData } from "~/.server/admin/loaders/admin.customers.loader";
import { AdminCustomersTableFilters } from "./CustomersTableFilters";

export interface CustomersTableProps {
  customers: TCustomerDto[];
  query?: TAdminCustomersLoaderData["query"];
  pagination: IOffsetPaginationInfoDto;
}

export const AdminCustomersTable: FC<CustomersTableProps> = ({
  customers,
  query,
  pagination,
}) => {
  const paginationProps = usePagination(pagination);
  const resourceName = useMemo(
    () => ({
      singular: "customer",
      plural: "customers",
    }),
    []
  );

  const headings: NonEmptyArray<IndexTableHeading> = useMemo(
    () => [
      { title: "Email" },
      { title: "Full name" },
      { title: "Location" },
      { title: "Created at" },
      { title: "Updated at" },
      { title: "Deleted at" },
    ],
    []
  );

  const rowMarkup = customers.map(
    ({ id, email, firstName, lastName, createdAt, updatedAt, deletedAt, addresses }, index) => (
      <IndexTable.Row id={id} key={id} position={index}>
        <IndexTable.Cell>
          <Link url={`${EAdminNavigation.customers}/${id}`}>{email}</Link>
        </IndexTable.Cell>
        <IndexTable.Cell>{firstName + " " + lastName}</IndexTable.Cell>
        <IndexTable.Cell>{addresses.country}</IndexTable.Cell>
        <IndexTable.Cell>{createdAt}</IndexTable.Cell>
        <IndexTable.Cell>{updatedAt}</IndexTable.Cell>
        <IndexTable.Cell>{deletedAt}</IndexTable.Cell>
      </IndexTable.Row>
    )
  );

  return (
    <Card padding="0">
      <AdminCustomersTableFilters query={query} />
      <IndexTable
        resourceName={resourceName}
        itemCount={customers.length}
        selectable={false}
        headings={headings}
        pagination={paginationProps}
      >
        {rowMarkup}
      </IndexTable>
    </Card>
  );
};
