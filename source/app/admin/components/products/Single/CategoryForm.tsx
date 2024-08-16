import {Autocomplete, Box, Button, Divider, FormLayout, InlineStack, SelectProps} from '@shopify/polaris';
import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import {ValidatedForm, useField} from 'remix-validated-form';
import {ValidatedSubmitButton} from '~/admin/ui/ValidatedSubmitButton/ValidatedSubmitButton';
import {ValidatedAction} from '~/admin/ui/ValidatedAction/ValidatedAction';
import {EAdminProductAction} from '~/admin/constants/action.constant';
import {TProductDto} from '~/.server/admin/dto/product.dto';
import {categoryFormValidator} from '~/admin/components/products/Single/CategoryForm.validator';
import {TCategoryDto} from '~/.server/admin/dto/category.dto';
import {useFetcher} from '@remix-run/react';
import {EAdminNavigation} from '~/admin/constants/navigation.constant';
import type {TAdminCategoriesLoader} from '~/.server/admin/loaders/categories/index/loader';

type Props = {
  categoryId: TProductDto['categoryId'];
  categories: TCategoryDto[];
  toggleActive: () => void;
}

export const CategoryForm: FC<Props> = (props) => {
  const {categoryId, categories, toggleActive} = props;
  const fetcher = useFetcher<TAdminCategoriesLoader>();

  const roleOptions: SelectProps['options'] = useMemo(() => (
    [
      {
        label: 'Select category',
        value: '',
      },
      ...categories.map((category) => ({
        label: category.title,
        value: category.id,
      }))
    ]
  ), [categories]);

  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState(roleOptions.slice(0, 5));
  const [allOptions] = useState(roleOptions);

  useEffect(() => {
    setOptions(roleOptions.slice(0, 5));
  }, [roleOptions]);

  const updateText = useCallback(
    (value: string) => {
      setInputValue(value);

      if (value === '') {
        setOptions(roleOptions.slice(0, 5));
        return;
      }

      const filterRegex = new RegExp(value, 'i');
      const resultOptions = allOptions.filter((option) =>
        option.label.match(filterRegex),
      );
      setOptions(resultOptions);
    },
    [allOptions, roleOptions],
  );

  const updateSelection = useCallback(
    (selected: string[]) => {
      const selectedValue = selected.map((selectedItem) => {
        const matchedOption = options.find((option) => option.value === selectedItem);
        return matchedOption && matchedOption.label;
      });

      setSelectedOptions(selected);
      setInputValue(selectedValue[0] || '');
    },
    [options],
  );

  const textField = (
    <Autocomplete.TextField
      onChange={updateText}
      label="Category"
      value={inputValue}
      placeholder="Search"
      autoComplete="off"
    />
  );

  return (
    <ValidatedForm validator={categoryFormValidator} method="post" onSubmit={toggleActive}>
      <Box padding="200" paddingBlockEnd="0">
        <ValidatedAction action={EAdminProductAction.updateCategory}/>
      </Box>

      <Box padding="400" paddingBlockStart="200">
        <FormLayout>
          <Autocomplete
            options={options}
            selected={selectedOptions}
            onSelect={updateSelection}
            textField={textField}
          />
          <input type="hidden" name="categoryId" value={selectedOptions[0] || ''} />
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
