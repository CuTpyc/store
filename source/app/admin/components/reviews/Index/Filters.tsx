import {ChoiceList, IndexFilters, IndexFiltersProps, useSetIndexFiltersMode,} from '@shopify/polaris';
import React, {FC, useCallback, useState} from 'react';
import {useSearchParams} from '@remix-run/react';
import type {TAdminCategoriesLoaderData} from '~/.server/admin/loaders/categories/index/loader';
import {reqSortToSort, sortArrToReqSort} from '~/admin/utils/filter.util';
import {ESoftDeleteStatus} from '~/admin/constants/entries.constant';
import { TAdminReviewsLoaderData } from '~/.server/admin/loaders/reviews/index/loader';

export enum EReviewsSortVariant {
  rate_asc = 'rate_asc',
  rate_desc = 'rate_desc',
  review_asc = 'review_asc',
  review_desc = 'review_desc',
  customerId_asc = 'customerId_asc',
  customerId_desc = 'customerId_desc',
  productId_asc = 'productId_asc',
  productId_desc = 'productId_desc',
  createdAt_asc = 'createdAt_asc',
  createdAt_desc = 'createdAt_desc',
  updatedAt_asc = 'updatedAt_asc',
  updatedAt_desc = 'updatedAt_desc',
  deletedAt_asc = 'deletedAt_asc',
  deletedAt_desc = 'deletedAt_desc',
}

export interface FiltersProps {
  query?: TAdminReviewsLoaderData['query'];
}

export const Filters: FC<FiltersProps> = ({query}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();

  /* SORT START */
  const sortOptions: IndexFiltersProps['sortOptions'] = [
    {label: 'Rate', value: reqSortToSort(EReviewsSortVariant.createdAt_asc), directionLabel: 'Oldest to newest'},
    {label: 'Rate', value: reqSortToSort(EReviewsSortVariant.createdAt_desc), directionLabel: 'Newest to oldest'},
    {label: 'Review', value: reqSortToSort(EReviewsSortVariant.createdAt_asc), directionLabel: 'Oldest to newest'},
    {label: 'Review', value: reqSortToSort(EReviewsSortVariant.createdAt_desc), directionLabel: 'Newest to oldest'},
    {label: 'Customer Id', value: reqSortToSort(EReviewsSortVariant.createdAt_asc), directionLabel: 'Oldest to newest'},
    {label: 'Customer Id', value: reqSortToSort(EReviewsSortVariant.createdAt_desc), directionLabel: 'Newest to oldest'},
    {label: 'Product Id', value: reqSortToSort(EReviewsSortVariant.createdAt_asc), directionLabel: 'Oldest to newest'},
    {label: 'Product Id', value: reqSortToSort(EReviewsSortVariant.createdAt_desc), directionLabel: 'Newest to oldest'},
    {label: 'Created', value: reqSortToSort(EReviewsSortVariant.createdAt_asc), directionLabel: 'Oldest to newest'},
    {label: 'Created', value: reqSortToSort(EReviewsSortVariant.createdAt_desc), directionLabel: 'Newest to oldest'},
    {label: 'Updated', value: reqSortToSort(EReviewsSortVariant.updatedAt_asc), directionLabel: 'Oldest to newest'},
    {label: 'Updated', value: reqSortToSort(EReviewsSortVariant.updatedAt_desc), directionLabel: 'Newest to oldest'},
    {label: 'Deleted', value: reqSortToSort(EReviewsSortVariant.deletedAt_asc), directionLabel: 'Oldest to newest'},
    {label: 'Deleted', value: reqSortToSort(EReviewsSortVariant.deletedAt_desc), directionLabel: 'Newest to oldest'},
  ];

  const sortOrder = query?.sort || EReviewsSortVariant.createdAt_desc;
  const sortSelected = [reqSortToSort(sortOrder)];

  const setSortSelected = (value: string[]) => {
    setSearchParams((prev) => {
      prev.set('sort', sortArrToReqSort(value));
      return prev;
    });
  };

  /* SORT END */

  /* FILTERS START */
  const serverQueryValue = query?.q || '';
  const [queryValue, setQueryValue] = useState(serverQueryValue);

  const timerRef = React.useRef<number | null>(null);

  const handleFiltersQueryChange = useCallback((value: string) => {
    setQueryValue(value);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = window.setTimeout(() => {
      setSearchParams((prev) => {
        prev.delete('skip');
        prev.delete('take');

        if (value === '') {
          prev.delete('q');
          return prev;
        }

        prev.set('q', value);
        return prev;
      });
    }, 300);
  }, [setSearchParams]);

  const [softDeleteStatus, setSoftDeleteStatus] = useState<ESoftDeleteStatus | undefined>(
    query?.filters?.softDeleteStatus,
  );

  const {mode, setMode} = useSetIndexFiltersMode();

  const handleAccountStatusChange = useCallback(
    (value: ESoftDeleteStatus[]) => {
      setSoftDeleteStatus(value?.[0]);
      setSearchParams((prev) => {
        prev.delete('skip');
        prev.delete('take');

        if (value.length === 0) {
          prev.delete('softDeleteStatus');
          return prev;
        }

        prev.set('softDeleteStatus', value[0]);
        return prev;
      });
    },
    [setSearchParams],
  );

  const handleFiltersClearAll = useCallback(() => {
    setQueryValue('');
    setSoftDeleteStatus(undefined);

    setSearchParams((prev) => {
      prev.delete('q');
      prev.delete('role');
      prev.delete('softDeleteStatus');
      prev.delete('skip');
      prev.delete('take');
      return prev;
    });
  }, [setSearchParams, setSoftDeleteStatus]);

  const filters = [
    {
      key: 'softDeleteStatus',
      label: 'Soft Delete Status',
      filter: (
        <ChoiceList
          title="Role"
          titleHidden
          choices={[
            {
              label: 'Active',
              value: ESoftDeleteStatus.active,
            },
            {
              label: 'Deleted',
              value: ESoftDeleteStatus.deleted,
            }
          ]}
          selected={softDeleteStatus ? [softDeleteStatus] : []}
          onChange={handleAccountStatusChange}
          allowMultiple={false}
        />
      ),
      shortcut: true,
    },
  ];

  const appliedFilters: IndexFiltersProps['appliedFilters'] = [];
  if (softDeleteStatus && !isEmpty(softDeleteStatus)) {
    const key = 'softDeleteStatus';
    appliedFilters.push({
      key,
      label: `Soft Delete Status ${softDeleteStatus}`,
      onRemove: handleAccountStatusChange.bind(null, []),
    });
  }
  /* FILTERS END */

  return (
    <IndexFilters
      sortOptions={sortOptions}
      sortSelected={sortSelected}
      queryValue={queryValue}
      queryPlaceholder="Search review"
      onQueryChange={handleFiltersQueryChange}
      onQueryClear={() => handleFiltersQueryChange('')}
      onSort={setSortSelected}
      filters={filters}
      appliedFilters={appliedFilters}
      onClearAll={handleFiltersClearAll}
      mode={mode}
      setMode={setMode}
      tabs={[]}
      selected={0}
    />
  );
};


function isEmpty(value: string | string[]): boolean {
  if (Array.isArray(value)) {
    return value.length === 0;
  } else {
    return value === '' || value == null;
  }
}
