import {Card, IndexTable, Link,} from '@shopify/polaris';
import React, {FC, useMemo} from 'react';
import type {NonEmptyArray} from '@shopify/polaris/build/ts/src/types';
import {IndexTableHeading} from '@shopify/polaris/build/ts/src/components/IndexTable/IndexTable';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {IOffsetPaginationInfoDto} from '~/.server/shared/dto/offset-pagination-info.dto';
import {usePagination} from '~/admin/hooks/usePagination';
import {TCategoryDto} from '~/.server/admin/dto/category.dto';
import type {TAdminCategoriesLoaderData} from '~/.server/admin/loaders/categories/index/loader';
import {Filters} from './Filters';
import { useTranslation } from 'react-i18next';

export interface ListProps {
  categories: TCategoryDto[];
  query?: TAdminCategoriesLoaderData['query'];
  pagination: IOffsetPaginationInfoDto;
}


export const Index: FC<ListProps> = ({categories, query, pagination}) => {
  const paginationProps = usePagination(pagination);
  const { t, i18n } = useTranslation()
  const resourceName = useMemo(() => ({
    singular: t('category.table.index.singularTitle'),
    plural: t('category.table.index.pluralTitle'),
  }), []);

  const headings: NonEmptyArray<IndexTableHeading> = useMemo(() => ([
    {title: t('category.table.index.headings.name')},
    {title: t('category.table.index.headings.description')},
    {title: t('category.table.index.headings.created')},
    {title: t('category.table.index.headings.updated')},
    {title: t('category.table.index.headings.deleted')},
  ]), [t, i18n.language]);

  const rowMarkup = categories.map(
    (
      {id, title, description, createdAt, updatedAt, deletedAt},
      index,
    ) => (
      <IndexTable.Row
        id={id}
        key={id}
        position={index}
      >
        <IndexTable.Cell>
          <Link url={`${EAdminNavigation.categories}/${id}`}>{title}</Link>
        </IndexTable.Cell>
        <IndexTable.Cell>{description}</IndexTable.Cell>
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
        itemCount={categories.length}
        selectable={false}
        headings={headings}
        pagination={paginationProps}
      >
        {rowMarkup}
      </IndexTable>
    </Card>
  );
};
