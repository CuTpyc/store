import {ChoiceList, IndexFilters, IndexFiltersProps, useSetIndexFiltersMode,} from '@shopify/polaris';
import React, {FC, useCallback, useState} from 'react';
import {useSearchParams} from '@remix-run/react';
import type {TAdminProductsLoaderData} from '~/.server/admin/loaders/products/index/loader';
import {reqSortToSort, sortArrToReqSort} from '~/admin/utils/filter.util';
import {ESoftDeleteStatus} from '~/admin/constants/entries.constant';

export enum EProductsSortVariant {
  createdAt_asc = 'createdAt_asc',
  createdAt_desc = 'createdAt_desc',
  updatedAt_asc = 'updatedAt_asc',
  updatedAt_desc = 'updatedAt_desc',
  title_asc = 'title_asc',
  title_desc = 'title_desc',
  quantity_asc = 'quantity_asc',
  quantity_desc = 'quantity_desc',
  softDeleteStatus_asc = 'softDeleteStatus_asc',
  softDeleteStatus_desc = 'softDeleteStatus_desc',
}

export interface FiltersProps {
  query?: TAdminProductsLoaderData['query'];
}

export const Filters: FC<FiltersProps> = ({query}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();


  /* SORT START */
  const sortOptions: IndexFiltersProps['sortOptions'] = [
    {
      label: 'Title',
      value: reqSortToSort(EProductsSortVariant.title_asc),
      directionLabel: 'A-Z'
    },
    {
      label: 'Title',
      value: reqSortToSort(EProductsSortVariant.title_desc),
      directionLabel: 'Z-A'
    },
    {
      label: 'Quantity',
      value: reqSortToSort(EProductsSortVariant.quantity_asc),
      directionLabel: 'Low to high'
    },
    {
      label: 'Quantity',
      value: reqSortToSort(EProductsSortVariant.quantity_desc),
      directionLabel: 'High to low'
    },
    {
      label: 'Status',
      value: reqSortToSort(EProductsSortVariant.softDeleteStatus_asc),
      directionLabel: 'A-Z'
    },
    {
      label: 'Status',
      value: reqSortToSort(EProductsSortVariant.softDeleteStatus_desc),
      directionLabel: 'Z-A'
    },
    {
      label: 'Created',
      value: reqSortToSort(EProductsSortVariant.createdAt_asc),
      directionLabel: 'Oldest to newest'
    },
    {
      label: 'Created',
      value: reqSortToSort(EProductsSortVariant.createdAt_desc),
      directionLabel: 'Newest to oldest'
    },
    {
      label: 'Updated',
      value: reqSortToSort(EProductsSortVariant.updatedAt_asc),
      directionLabel: 'Oldest to newest'
    },
    {
      label: 'Updated',
      value: reqSortToSort(EProductsSortVariant.updatedAt_desc),
      directionLabel: 'Newest to oldest'
    },
  ];

  const sortOrder = query?.sort || EProductsSortVariant.createdAt_desc;
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
      label: 'Account Status',
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
      queryPlaceholder="Search products"
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
