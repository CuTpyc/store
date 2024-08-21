import {Card, IndexTable, Link,} from '@shopify/polaris';
import React, {FC, useMemo} from 'react';
import type {NonEmptyArray} from '@shopify/polaris/build/ts/src/types';
import {IndexTableHeading} from '@shopify/polaris/build/ts/src/components/IndexTable/IndexTable';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {IOffsetPaginationInfoDto} from '~/.server/shared/dto/offset-pagination-info.dto';
import {usePagination} from '~/admin/hooks/usePagination';
import {TCategoryDto} from '~/.server/admin/dto/category.dto';
import type {TAdminCategoriesLoaderData} from '~/.server/admin/loaders/categories/index/loader';
import { Filters } from './Filters';
import { TReviewDto } from '~/.server/admin/dto/review.dto';
import { TAdminReviewsLoaderData } from '~/.server/admin/loaders/reviews/index/loader';
import { TCustomerDto } from '~/.server/admin/dto/customer.dto';
import { TProductDto } from '~/.server/admin/dto/product.dto';

export type reviewsWithRelations = TReviewDto & {
  product: TProductDto
  customer: TCustomerDto
}

export interface ListProps {
  reviews: reviewsWithRelations[];
  query?: TAdminReviewsLoaderData['query'];
  pagination: IOffsetPaginationInfoDto;
}


export const Index: FC<ListProps> = ({reviews, query, pagination}) => {
  const paginationProps = usePagination(pagination);
  const resourceName = useMemo(() => ({
    singular: 'review',
    plural: 'reviews',
  }), []);

  const headings: NonEmptyArray<IndexTableHeading> = useMemo(() => ([
    {title: 'Rate'},
    {title: 'Review'},
    {title: 'Product title'},
    {title: 'Customer'},
    {title: 'Created at'},
    {title: 'Updated at'},
    {title: 'Deleted at'},
  ]), []);
  console.log("reviews", reviews)

  const rowMarkup = reviews.map(
    (
      {id ,rate, review, product, customer, createdAt, updatedAt, deletedAt},
      index,
    ) => (
      <IndexTable.Row
        id={id}
        key={id}
        position={index}
      >
        <IndexTable.Cell>{rate}</IndexTable.Cell>
        <IndexTable.Cell><Link url={`${EAdminNavigation.reviews}/${id}`}>{review}</Link></IndexTable.Cell>

        <IndexTable.Cell><Link url={`${EAdminNavigation.products}/${product.id}`}>{`${product.title} (${product.slug})`}</Link></IndexTable.Cell>
        <IndexTable.Cell><Link url={`${EAdminNavigation.customers}/${customer.id}`}>{`${customer.firstName} ${customer.lastName}`}</Link></IndexTable.Cell>
        <IndexTable.Cell>{createdAt}</IndexTable.Cell>
        <IndexTable.Cell>{updatedAt}</IndexTable.Cell>
        <IndexTable.Cell>{deletedAt}</IndexTable.Cell>
      </IndexTable.Row>
    ),
  );

  return (
    <Card padding="0">
      <Filters query={query}/>
      <IndexTable
        resourceName={resourceName}
        itemCount={reviews.length}
        selectable={false}
        headings={headings}
        pagination={paginationProps}
      >
        {rowMarkup}
      </IndexTable>
    </Card>
  );
};
