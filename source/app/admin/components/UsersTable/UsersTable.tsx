import {Badge, Card, IndexTable, LegacyCard, Link, Text, useIndexResourceState,} from '@shopify/polaris';
import React, {FC, useMemo} from 'react';
import {TUserDto} from '~/.server/admin/dto/user.dto';
import type {NonEmptyArray} from '@shopify/polaris/build/ts/src/types';
import {IndexTableHeading} from '@shopify/polaris/build/ts/src/components/IndexTable/IndexTable';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';

const setRoleStatusColor = (role: string) => {
  if (role === "ADMIN") {
    return 'success';
  } 
  if (role === "STAFF") {
    return 'attention'
  }
}


export const AdminUsersTable: FC<{ users: TUserDto[] }> = ({users}) => {
  const resourceName = useMemo(() => ({
    singular: 'user',
    plural: 'users',
  }), []);

  const headings: NonEmptyArray<IndexTableHeading> = useMemo(() => ([
    {title: 'Email'},
    {title: 'Full Name'},
    {title: 'Role'},
    {title: 'Created at'},
    {title: 'Updated at'},
    {title: 'Deleted at'},
  ]), []);

  const rowMarkup = users.map(
    (
      {id, email, role, fullName, createdAt, updatedAt, deletedAt},
      index,
    ) => (
      <IndexTable.Row
        id={id}
        key={id}
        position={index}
      >
        <IndexTable.Cell>
          <Link url={`${EAdminNavigation.users}/${id}`}>{email}</Link>
        </IndexTable.Cell>
        <IndexTable.Cell>{fullName}</IndexTable.Cell>
        <IndexTable.Cell><Badge tone={setRoleStatusColor(role)}>{role}</Badge></IndexTable.Cell>
        <IndexTable.Cell>{createdAt}</IndexTable.Cell>
        <IndexTable.Cell>{updatedAt}</IndexTable.Cell>
        <IndexTable.Cell>{deletedAt}</IndexTable.Cell>
      </IndexTable.Row>
    ),
  );

  return (
    <Card padding="0">
      <IndexTable
        resourceName={resourceName}
        itemCount={users.length}
        selectable={false}
        headings={headings}
      >
        {rowMarkup}
      </IndexTable>
    </Card>
  );
};

function SimpleIndexTableExample() {
  const orders = [
    {
      id: '1020',
      order: '#1020',
      date: 'Jul 20 at 4:34pm',
      customer: 'Jaydon Stanton',
      total: '$969.44',
      paymentStatus: <Badge progress="complete">Paid</Badge>,
      fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
    },
    {
      id: '1019',
      order: '#1019',
      date: 'Jul 20 at 3:46pm',
      customer: 'Ruben Westerfelt',
      total: '$701.19',
      paymentStatus: <Badge progress="partiallyComplete">Partially paid</Badge>,
      fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
    },
    {
      id: '1018',
      order: '#1018',
      date: 'Jul 20 at 3.44pm',
      customer: 'Leo Carder',
      total: '$798.24',
      paymentStatus: <Badge progress="complete">Paid</Badge>,
      fulfillmentStatus: <Badge progress="incomplete">Unfulfilled</Badge>,
    },
  ];
  const resourceName = {
    singular: 'order',
    plural: 'orders',
  };

  const {selectedResources, allResourcesSelected, handleSelectionChange} =
    useIndexResourceState(orders);

  const rowMarkup = orders.map(
    (
      {id, order, date, customer, total, paymentStatus, fulfillmentStatus},
      index,
    ) => (
      <IndexTable.Row
        id={id}
        key={id}
        selected={selectedResources.includes(id)}
        position={index}
      >
        <IndexTable.Cell>
          <Text variant="bodyMd" fontWeight="bold" as="span">
            {order}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>{date}</IndexTable.Cell>
        <IndexTable.Cell>{customer}</IndexTable.Cell>
        <IndexTable.Cell>
          <Text as="span" alignment="end" numeric>
            {total}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>{paymentStatus}</IndexTable.Cell>
        <IndexTable.Cell>{fulfillmentStatus}</IndexTable.Cell>
      </IndexTable.Row>
    ),
  );

  return (
    <LegacyCard>
      <IndexTable
        resourceName={resourceName}
        itemCount={orders.length}
        selectedItemsCount={
          allResourcesSelected ? 'All' : selectedResources.length
        }
        onSelectionChange={handleSelectionChange}
        headings={[
          {title: 'Order'},
          {title: 'Date'},
          {title: 'Customer'},
          {title: 'Total', alignment: 'end'},
          {title: 'Payment status'},
          {title: 'Fulfillment status'},
        ]}
      >
        {rowMarkup}
      </IndexTable>
    </LegacyCard>
  );
}
