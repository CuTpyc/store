import {Box, Button, Divider, FormLayout, InlineStack} from '@shopify/polaris';
import {FC} from 'react';
import {ValidatedForm} from 'remix-validated-form';
import {ValidatedSubmitButton} from '~/admin/ui/ValidatedSubmitButton/ValidatedSubmitButton';
import {ValidatedAction} from '~/admin/ui/ValidatedAction/ValidatedAction';
import {EAdminProductAction} from '~/admin/constants/action.constant';
import {categoryFormValidator} from '~/admin/components/products/Single/CategoryForm.validator';
import {TCategoryDto} from '~/.server/admin/dto/category.dto';
import { ValidatedAutocompleteWrapper } from './CategoryFormAutocompliteHOC';
import { useFetcher } from '@remix-run/react';
import { TAdminApiCategoriesLoader } from '~/.server/admin/loaders/api/categories/index/loader';
import { EAdminNavigation } from '~/admin/constants/navigation.constant';

type Props = {
  category: Pick<TCategoryDto, 'id' | 'title' | 'slug'> | null;
  categories: TCategoryDto[];
  toggleActive: () => void;
}

export const CategoryForm: FC<Props> = (props) => {
  const {category, toggleActive} = props;
  const defaultCategoryOption = category ? {
    label: `${category.title} (${category.slug})`,
    value: category.id,
  } : undefined;
  const fetcher = useFetcher<TAdminApiCategoriesLoader>();
  const fetchCategories = (query: string | undefined = '') => {
    if (query) {
      fetcher.load(`${EAdminNavigation.apiCategories}?q=${query}`);
    } else {
      fetcher.load(`${EAdminNavigation.apiCategories}`);
    }
  }

  const pickCategories = () => {
    const { categories = [] } = fetcher?.data ?? {}
    return categories.map((category) => ({
      value: category.id,
      label: `${category.title} (${category.slug})`,
    }));
  }

  return (
    <ValidatedForm validator={categoryFormValidator} method="post" onSubmit={toggleActive}>
      <Box padding="200" paddingBlockEnd="0">
        <ValidatedAction action={EAdminProductAction.updateCategory}/>
      </Box>

      <Box padding="400" paddingBlockStart="200">
        <FormLayout>
          <ValidatedAutocompleteWrapper
            label="Category"
            name="categoryId"
            fetcherData={fetcher.data}
            fetchOptions={fetchCategories}
            pickOptions={pickCategories}
            initialOption={defaultCategoryOption}
          />
        </FormLayout>
      </Box>
      <Divider/>
      <Box padding="400">
        <InlineStack direction="row-reverse" align="end" gap="200">
          <ValidatedSubmitButton text={'Save'} variant="primary"/>
          <Button onClick={toggleActive}>Cancel</Button>
        </InlineStack>
      </Box>
    </ValidatedForm>
  );
};
function setOptions(arg0: { value: string; label: string; }[]) {
  throw new Error('Function not implemented.');
}
