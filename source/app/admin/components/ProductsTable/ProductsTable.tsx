import { Card, IndexTable, Link } from '@shopify/polaris';
import { FC, useMemo } from 'react';
import type { TProductDto } from '~/.server/admin/dto/product.dto'; // Import the TProductsDto type
import type { NonEmptyArray } from '@shopify/polaris/build/ts/src/types';
import { IndexTableHeading } from '@shopify/polaris/build/ts/src/components/IndexTable/IndexTable';
import { EAdminNavigation } from '~/admin/constants/navigation.constant';
// import { UserRoleBadge } from '~/admin/components/UsersTable/UserRoleBadge';
// import type { TAdminUsersLoaderData } from '~/.server/admin/loaders/users.loader';
// import { AdminUsersTableFilters } from '~/admin/components/UsersTable/UsersTableFilters';
// import { IOffsetPaginationInfoDto } from '~/.server/shared/dto/offset-pagination-info.dto';
// import { usePagination } from '~/admin/hooks/usePagination';

export interface ProductsTableProps {
  products: TProductDto[];
  // query?: TAdminUsersLoaderData['query'];
  // pagination: IOffsetPaginationInfoDto;
}

export const ProductsTable: FC<ProductsTableProps> = ({
  products,
}) => {
  const resourceName = useMemo(
    () => ({
      singular: 'product',
      plural: 'products',
    }),
    []
  );

  const headings: NonEmptyArray<IndexTableHeading> = useMemo(
    () => [
      { title: 'Title' },
      { title: 'Price' },
      { title: 'Quantity' },
      { title: 'Created at' },
      { title: 'Updated at' },
    ],
    []
  );

  const rowMarkup = products.map(
    (
      { title, price, quantity, createdAt, updatedAt },
      index
    ) => (
      <IndexTable.Row id={index.toString()} key={index} position={index}>
        <IndexTable.Cell>{title}</IndexTable.Cell>
        <IndexTable.Cell>{price}</IndexTable.Cell>
        <IndexTable.Cell>{quantity}</IndexTable.Cell>
        <IndexTable.Cell>{createdAt.toString()}</IndexTable.Cell>
        <IndexTable.Cell>{updatedAt.toString()}</IndexTable.Cell>
      </IndexTable.Row>
    )
  );

  return (
    <Card padding='0'>
      <IndexTable
        resourceName={resourceName}
        itemCount={products.length}
        selectable={false}
        headings={headings}
      >
        {rowMarkup}
      </IndexTable>
    </Card>
  );
};
