import { useCallback } from 'react';
import { Page } from '@shopify/polaris';
import { EAdminNavigation } from '~/admin/constants/navigation.constant';
import { ProductsNewForm } from '~/admin/components/ProductsNewForm/ProductsNewForm';
import { productsNewFormValidator } from '~/admin/components/ProductsNewForm/ProductsNewForm.validator';
import { ValidatedForm } from 'remix-validated-form';
import { ValidatedSubmitButton } from '~/admin/ui/ValidatedSubmitButton/ValidatedSubmitButton';
import { adminProductsNewAction } from '~/.server/admin/actions/product.new.action';

export const action = adminProductsNewAction;

export default function AdminProductsNew() {
  const primaryAction = useCallback(
    () => <ValidatedSubmitButton text='save' variant='primary' />,
    []
  );

  return (
    <ValidatedForm validator={productsNewFormValidator} method='post'>
      <Page
        title='Create new product'
        backAction={{
          url: EAdminNavigation.products,
        }}
        primaryAction={primaryAction()}
      >
        <ProductsNewForm />
      </Page>
    </ValidatedForm>
  );
}
