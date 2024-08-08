import { Card, IndexTable, Link } from '@shopify/polaris';
import { FC, useMemo } from 'react';
import type { TCustomerDto } from '~/.server/admin/dto/customer.dto';
import type { NonEmptyArray } from '@shopify/polaris/build/ts/src/types';
import { IndexTableHeading } from '@shopify/polaris/build/ts/src/components/IndexTable/IndexTable';
import { EAdminNavigation } from '~/admin/constants/navigation.constant';
// import { UserRoleBadge } from '~/admin/components/UsersTable/UserRoleBadge';
// import type { TAdminUsersLoaderData } from '~/.server/admin/loaders/users.loader';
// import { AdminUsersTableFilters } from '~/admin/components/UsersTable/UsersTableFilters';
// import { IOffsetPaginationInfoDto } from '~/.server/shared/dto/offset-pagination-info.dto';
// import { usePagination } from '~/admin/hooks/usePagination';

export interface CustomersTableProps {
  customers: TCustomerDto[];
  // query?: TAdminUsersLoaderData['query'];
  // pagination: IOffsetPaginationInfoDto;
}

export const AdminCustomersTable: FC<CustomersTableProps> = ({
  customers,
  // query,
  // pagination,
}) => {
  // const paginationProps = usePagination(pagination);
  const resourceName = useMemo(
    () => ({
      singular: 'customer',
      plural: 'customers',
    }),
    []
  );

  const headings: NonEmptyArray<IndexTableHeading> = useMemo(
    () => [
      { title: 'Email' },
      { title: 'First Name' },
      { title: 'Last Name' },
      { title: 'Created at' },
      { title: 'Updated at' },
      { title: 'Deleted at' },
    ],
    []
  );

  const rowMarkup = customers.map(
    (
      { firstName, lastName, id, email, createdAt, updatedAt, deletedAt },
      index
    ) => (
      <IndexTable.Row id={id} key={id} position={index}>
        <IndexTable.Cell>
          <Link url={`${EAdminNavigation.customers}/${id}`}>{email}</Link>
        </IndexTable.Cell>
        <IndexTable.Cell>{firstName}</IndexTable.Cell>
        <IndexTable.Cell>{lastName}</IndexTable.Cell>
        <IndexTable.Cell>{createdAt}</IndexTable.Cell>
        <IndexTable.Cell>{updatedAt}</IndexTable.Cell>
        <IndexTable.Cell>{deletedAt}</IndexTable.Cell>
      </IndexTable.Row>
    )
  );

  return (
    <Card padding='0'>
      {/* <AdminUsersTableFilters query={query} /> */}
      <IndexTable
        resourceName={resourceName}
        itemCount={customers.length}
        selectable={false}
        headings={headings}
        // pagination={paginationProps}
      >
        {rowMarkup}
      </IndexTable>
    </Card>
  );
};
