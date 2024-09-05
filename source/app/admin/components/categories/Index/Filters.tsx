import {ChoiceList, IndexFilters, IndexFiltersProps, useSetIndexFiltersMode,} from '@shopify/polaris';
import React, {FC, useCallback, useState} from 'react';
import {useSearchParams} from '@remix-run/react';
import type {TAdminCategoriesLoaderData} from '~/.server/admin/loaders/categories/index/loader';
import {reqSortToSort, sortArrToReqSort} from '~/admin/utils/filter.util';
import {ESoftDeleteStatus} from '~/admin/constants/entries.constant';
import { useTranslation } from 'react-i18next';

export enum ECategoriesSortVariant {
  title_asc = 'title_asc',
  title_desc = 'title_desc',
  description_asc = 'description_asc',
  description_desc = 'description_desc',
  createdAt_asc = 'createdAt_asc',
  createdAt_desc = 'createdAt_desc',
  updatedAt_asc = 'updatedAt_asc',
  updatedAt_desc = 'updatedAt_desc',
  deletedAt_asc = 'deletedAt_asc',
  deletedAt_desc = 'deletedAt_desc',
}

export interface FiltersProps {
  query?: TAdminCategoriesLoaderData['query'];
}

export const Filters: FC<FiltersProps> = ({query}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation()
  /* SORT START */
  const sortOptions: IndexFiltersProps['sortOptions'] = [
    {label: t("category.table.sortOptions.name"), value: reqSortToSort(ECategoriesSortVariant.title_asc), directionLabel: t("sortRules.a-z")},
    {label: t("category.table.sortOptions.name"), value: reqSortToSort(ECategoriesSortVariant.title_desc), directionLabel: t("sortRules.z-a")},
    {label: t("category.table.sortOptions.description"), value: reqSortToSort(ECategoriesSortVariant.description_asc), directionLabel: t("sortRules.a-z")},
    {label: t("category.table.sortOptions.description"), value: reqSortToSort(ECategoriesSortVariant.description_desc), directionLabel: t("sortRules.z-a")},
    {label: t("category.table.sortOptions.created"), value: reqSortToSort(ECategoriesSortVariant.createdAt_asc), directionLabel: t("sortRules.newest")},
    {label: t("category.table.sortOptions.created"), value: reqSortToSort(ECategoriesSortVariant.createdAt_desc), directionLabel: t("sortRules.oldest")},
    {label: t("category.table.sortOptions.updated"), value: reqSortToSort(ECategoriesSortVariant.updatedAt_asc), directionLabel: t("sortRules.newest")},
    {label: t("category.table.sortOptions.updated"), value: reqSortToSort(ECategoriesSortVariant.updatedAt_desc), directionLabel: t("sortRules.oldest")},
    {label: t("category.table.sortOptions.deleted"), value: reqSortToSort(ECategoriesSortVariant.deletedAt_asc), directionLabel: t("sortRules.newest")},
    {label: t("category.table.sortOptions.deleted"), value: reqSortToSort(ECategoriesSortVariant.deletedAt_desc), directionLabel: t("sortRules.oldest")},
  ];

  const sortOrder = query?.sort || ECategoriesSortVariant.createdAt_desc;
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
      label: t("search.label"),
      filter: (
        <ChoiceList
          title="Role"
          titleHidden
          choices={[
            {
              label: t("search.active"),
              value: ESoftDeleteStatus.active,
            },
            {
              label: t("search.deleted"),
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
  const softDeleteStatusLabel = t('search.softDeletedStatus', { softDeleteStatus: `${softDeleteStatus}` })
  const appliedFilters: IndexFiltersProps['appliedFilters'] = [];
  if (softDeleteStatus && !isEmpty(softDeleteStatus)) {
    const key = 'softDeleteStatus';
    appliedFilters.push({
      key,
      label: softDeleteStatusLabel,
      onRemove: handleAccountStatusChange.bind(null, []),
    });
  }
  /* FILTERS END */

  return (
    <IndexFilters
      sortOptions={sortOptions}
      sortSelected={sortSelected}
      queryValue={queryValue}
      queryPlaceholder={t('search.search')}
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
