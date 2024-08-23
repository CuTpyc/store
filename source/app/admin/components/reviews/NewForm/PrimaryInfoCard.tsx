import {BlockStack, Card, FormLayout, Text} from '@shopify/polaris';
import {FC} from 'react';
import {ValidatedTextField} from '~/admin/ui/ValidatedTextField/ValidatedTextField';
import { ValidatedSelect } from '~/admin/ui/ValidatedSelect/ValidatedSelect';
import { TAdminApiProductsLoader, TAdminApiProductsLoaderData } from '~/.server/admin/loaders/api/products/index/loader';
import { ValidatedLazyAutocomplete } from '~/admin/ui/ValidatedLazyAutocomplete/ValidatedLazyAutocomplete';
import { EAdminNavigation } from '~/admin/constants/navigation.constant';
import { TAdminApiCustomersLoader, TAdminApiCustomersLoaderData } from '~/.server/admin/loaders/api/customers/index/loader';
import { TProductDto } from '~/.server/admin/dto/product.dto';
import { TCustomerDto } from '~/.server/admin/dto/customer.dto';
import { TReviewDto } from '~/.server/admin/dto/review.dto';

type Props = {
  review?: TReviewDto
}



export const PrimaryInfoCard: FC<Props> = (props) => {
  const {review} = props;

  return (
    <Card>
      <BlockStack gap="200">
        <Text as="h2" variant="headingSm">
          Primary info
        </Text>
        <FormLayout>
          <ValidatedSelect
            label="Rate"
            name="rate"
            options={["0", "1", "2", "3", "4", "5"]}
            defaultValue={String(review?.rate)}
          />
          <ValidatedTextField
            label="Review"
            type="text"
            name="review"
            autoComplete="off"
            defaultValue={review?.review || ''}
            multiline={5}
          />
        </FormLayout>
      </BlockStack>
    </Card>
  );
};
