import {Card, IndexTable, Link, Text} from '@shopify/polaris';
import React, {FC, useMemo} from 'react';
import type {NonEmptyArray} from '@shopify/polaris/build/ts/src/types';
import {IndexTableHeading} from '@shopify/polaris/build/ts/src/components/IndexTable/IndexTable';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {IOffsetPaginationInfoDto} from '~/.server/shared/dto/offset-pagination-info.dto';
import {usePagination} from '~/admin/hooks/usePagination';
import {TProductDto} from '~/.server/admin/dto/product.dto';
import type {TAdminProductsLoaderData} from '~/.server/admin/loaders/products/index/loader';
import {Filters} from './Filters';
import {
  StarFilledIcon
} from '@shopify/polaris-icons';

export interface ListProps {
  products: TProductDto[];
  query?: TAdminProductsLoaderData['query'];
  pagination: IOffsetPaginationInfoDto;
}


export const Index: FC<ListProps> = ({products, query, pagination}) => {
  const paginationProps = usePagination(pagination);
  const resourceName = useMemo(() => ({
    singular: 'product',
    plural: 'products',
  }), []);

  const headings: NonEmptyArray<IndexTableHeading> = useMemo(() => ([
    {title: 'Title'},
    {title: 'Slug'},
    {title: 'Category'},
    {title: 'Total Reviews'},
    {title: 'Average Rate'},
    {title: 'SKU'},
    {title: 'Barcode'},
    {title: 'Status'},
    {title: 'Quantity'},
  ]), []);

  const rowMarkup = products.map(
    (
      {id, title, slug, totalReviews, avgRate, sku, barcode, status, quantity, category},
      index,
    ) => (
      <IndexTable.Row
        id={id}
        key={id}
        position={index}
      >
        <IndexTable.Cell>
          <Link url={`${EAdminNavigation.products}/${id}`}>{title}</Link>
        </IndexTable.Cell>
        <IndexTable.Cell>{slug}</IndexTable.Cell>
        <IndexTable.Cell>{category?.title || '-/-'}</IndexTable.Cell>
        <IndexTable.Cell>{totalReviews}</IndexTable.Cell>
        <IndexTable.Cell>{`★ ${avgRate}`}</IndexTable.Cell>
        <IndexTable.Cell>{sku}</IndexTable.Cell>
        <IndexTable.Cell>{barcode}</IndexTable.Cell>
        <IndexTable.Cell>{status}</IndexTable.Cell>
        <IndexTable.Cell>{quantity}</IndexTable.Cell>
      </IndexTable.Row>
    ),
  );

  return (
    <Card padding="0">
      <Filters query={query}/>
      <IndexTable
        resourceName={resourceName}
        itemCount={products.length}
        selectable={false}
        headings={headings}
        pagination={paginationProps}
      >
        {rowMarkup}
      </IndexTable>
    </Card>
  );
};
