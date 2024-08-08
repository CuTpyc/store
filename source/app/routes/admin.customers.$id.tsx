// import { useLoaderData, Link, Form } from '@remix-run/react';
// import { customersSingleLoader } from '../.server/admin/loaders/customers.single.loader';
// import { customersDeleteAction } from '../.server/admin/actions/customers.delete.action';
// import { ActionFunction, LoaderFunction } from '@remix-run/node';

// export const loader: LoaderFunction = async (args) => {
//   return customersSingleLoader(args);
// };

// export const action: ActionFunction = async (args) => {
//   return customersDeleteAction(args);
// };

// export default function CustomerDetails() {
//   // const { customer } = useLoaderData();
//   const customer = useLoaderData<typeof loader>();

//   return (
//     <div>
//       <h1>
//         {customer.firstName} {customer.lastName}
//       </h1>
//       <p>Email: {customer.email}</p>
//       <p>Phone: {customer.phone}</p>
//       <p>Note: {customer.note}</p>
//       <h2>Addresses</h2>
//       <ul>
//         {customer.addresses.map((address) => (
//           <li key={address.id}>
//             {address.address}, {address.city}, {address.country}
//           </li>
//         ))}
//       </ul>
//       <Link to={`/admin/customers/${customer.id}/edit`}>Edit</Link>
//       <Form method='post'>
//         <input type='hidden' name='_method' value='delete' />
//         <button type='submit'>Delete</button>
//       </Form>
//     </div>
//   );
// }

// routes/admin/customers/$id.tsx
// import { LoaderFunction, ActionFunction } from '@remix-run/node';
// import { customersSingleLoader } from '../.server/admin/loaders/customers.single.loader';
// import { customersDeleteAction } from '../.server/admin/actions/customers.delete.action';
// import CustomerDetails from '../admin/components/CustomersTable/CustomerDetails';

// export const loader: LoaderFunction = async (args) => {
//   return customersSingleLoader(args);
// };

// export const action: ActionFunction = async (args) => {
//   return customersDeleteAction(args);
// };

// export default CustomerDetails;

import { useState, useCallback } from 'react';
import { useLoaderData, useActionData, useSubmit } from '@remix-run/react';
import { Page, Banner } from '@shopify/polaris';
import { customersSingleLoader } from '~/.server/admin/loaders/customers.single.loader';
// import { adminUsersRoleAction } from '~/.server/admin/actions/users.role.action';
import { customersDeleteAction } from '~/.server/admin/actions/customers.delete.action';
import { EAdminNavigation } from '~/admin/constants/navigation.constant';
import { CustomersSingle } from '~/admin/components/CustomersSingle/CustomersSingle';
// import { LoaderFunctionArgs } from '@remix-run/node';
import { TCustomerDto } from '~/.server/admin/dto/customer.dto';
import DeleteCustomerModal from '~/admin/components/CustomersSingle/DeleteCustomerModal';

export const loader = customersSingleLoader;

export const action = customersDeleteAction;

export default function AdminUsersSingle() {
  const data = useLoaderData<{ customer: TCustomerDto }>();
  const actionData = useActionData();
  const [active, setActive] = useState(false);
  const submit = useSubmit();

  const toggleActive = useCallback(() => setActive((active) => !active), []);

  if (!data || !data.customer) {
    return <div>Loading...</div>;
  }

  const { customer } = data;

  const handleDelete = () => {
    setActive(false);
    submit(
      { deletedAt: customer.deletedAt },
      {
        method: 'post',
        action: `/admin/customers/${customer.id}?_method=delete`,
      }
    );
  };

  const secondaryActions = [];

  if (!customer.deletedAt) {
    secondaryActions.push({
      content: 'Remove',
      onAction: toggleActive,
      destructive: true,
      accessibilityLabel: 'Delete Customer',
    });
  }

  secondaryActions.push({
    content: 'Security',
    accessibilityLabel: 'Security',
    url: `${EAdminNavigation.customers}/${customer.id}/security`,
  });

  return (
    <Page
      title={customer.firstName + ' ' + customer.lastName || ''}
      backAction={{
        url: EAdminNavigation.customers,
      }}
      secondaryActions={secondaryActions}
    >
      {actionData?.error && (
        <Banner status='critical'>
          <p>{actionData.error}</p>
        </Banner>
      )}
      <CustomersSingle customer={customer} />
      <DeleteCustomerModal
        active={active}
        toggleActive={toggleActive}
        handleDelete={handleDelete}
        error={actionData?.error}
      />
    </Page>
  );
}
