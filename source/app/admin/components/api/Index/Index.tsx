import {Card, IndexTable, Link,} from '@shopify/polaris';
import React, {FC, useMemo} from 'react';
import type {NonEmptyArray} from '@shopify/polaris/build/ts/src/types';
import {IndexTableHeading} from '@shopify/polaris/build/ts/src/components/IndexTable/IndexTable';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import {TCategoryDto} from '~/.server/admin/dto/category.dto';

export interface ListProps {
  categories: TCategoryDto[];
}



export const Index: FC<ListProps> = ({categories}) => {
  const resourceName = useMemo(() => ({
    singular: 'category',
    plural: 'categories',
  }), []);

  const headings: NonEmptyArray<IndexTableHeading> = useMemo(() => ([
    {title: 'Category Name'},
    {title: 'ID'},
  ]), []);

  const rowMarkup = categories.map(
    (
      {id, title},
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
        <IndexTable.Cell>{id}</IndexTable.Cell>
      </IndexTable.Row>
    ),
  );
  console.log("rowMarkup------------------------",rowMarkup)
  return (
    <Card padding="0">
      <IndexTable
        resourceName={resourceName}
        itemCount={categories.length}
        selectable={false}
        headings={headings}
      >
        {rowMarkup}
      </IndexTable>
    </Card>
  );
};
