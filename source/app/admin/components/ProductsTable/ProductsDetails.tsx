// import { useLoaderData, Link, Form } from '@remix-run/react';
// import { customersSingleLoader } from '../../../.server/admin/loaders/customers.single.loader';
// import { customersDeleteAction } from '../../../.server/admin//actions/customers.delete.action';
// import { CustomerWithAddresses } from '../../../.server/admin/dto/customer.dto';

// export const loader = customersSingleLoader;

// export const action = customersDeleteAction;

// export default function CustomerDetails() {
//   const customer = useLoaderData<CustomerWithAddresses>();

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
