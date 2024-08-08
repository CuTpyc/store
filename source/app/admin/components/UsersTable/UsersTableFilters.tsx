import {
  ChoiceList,
  IndexFilters,
  IndexFiltersProps,
  useSetIndexFiltersMode,
} from '@shopify/polaris';
import React, { FC, useCallback, useState } from 'react';
import type {
  EAccountStatus,
  TAdminUsersLoaderData,
} from '~/.server/admin/loaders/users.loader';
import { useSearchParams } from '@remix-run/react';
import { $Enums } from '@prisma/client';

export interface UsersTableFiltersProps {
  query?: TAdminUsersLoaderData['query'];
}

export const AdminUsersTableFilters: FC<UsersTableFiltersProps> = ({
  query,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();

  /* SORT START */
  const sortOptions: IndexFiltersProps['sortOptions'] = [
    { label: 'ID', value: 'id asc', directionLabel: 'Oldest to newest' },
    { label: 'ID', value: 'id desc', directionLabel: 'Newest to oldest' },
    { label: 'Email', value: 'email asc', directionLabel: 'A-Z' },
    { label: 'Email', value: 'email desc', directionLabel: 'Z-A' },
    { label: 'Full Name', value: 'fullName asc', directionLabel: 'A-Z' },
    { label: 'Full Name', value: 'fullName desc', directionLabel: 'Z-A' },
    { label: 'Role', value: 'role asc', directionLabel: 'A-Z' },
    { label: 'Role', value: 'role desc', directionLabel: 'Z-A' },
    {
      label: 'Created',
      value: 'createdAt asc',
      directionLabel: 'Oldest to newest',
    },
    {
      label: 'Created',
      value: 'createdAt desc',
      directionLabel: 'Newest to oldest',
    },
    {
      label: 'Updated',
      value: 'updatedAt asc',
      directionLabel: 'Oldest to newest',
    },
    {
      label: 'Updated',
      value: 'updatedAt desc',
      directionLabel: 'Newest to oldest',
    },
    {
      label: 'Deleted',
      value: 'deletedAt asc',
      directionLabel: 'Oldest to newest',
    },
    {
      label: 'Deleted',
      value: 'deletedAt desc',
      directionLabel: 'Newest to oldest',
    },
  ];

  const sortOrder = query?.sort || 'id_desc';
  const sortSelected = [sortOrder.replace('_', ' ')];

  const setSortSelected = (value: string[]) => {
    setSearchParams((prev) => {
      prev.set('sort', value[0].replace(' ', '_'));
      return prev;
    });
  };

  /* SORT END */

  /* FILTERS START */
  const serverQueryValue = query?.q || '';
  const [queryValue, setQueryValue] = useState(serverQueryValue);

  const timerRef = React.useRef<number | null>(null);

  const handleFiltersQueryChange = useCallback(
    (value: string) => {
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
    },
    [setSearchParams]
  );

  const [role, setRole] = useState<string[] | undefined>(query?.role);

  const [accountStatus, setAccountStatus] = useState<
    EAccountStatus | undefined
  >(query?.accountStatus);

  const { mode, setMode } = useSetIndexFiltersMode();

  const handleRoleFilterChange = useCallback(
    (value: string[]) => {
      setRole(value);
      setSearchParams((prev) => {
        prev.delete('skip');
        prev.delete('take');

        if (value.length === 0) {
          prev.delete('role');
          return prev;
        }

        prev.set('role', value.join(','));
        return prev;
      });
    },
    [setSearchParams]
  );

  const handleAccountStatusChange = useCallback(
    (value: EAccountStatus[]) => {
      setAccountStatus(value?.[0]);
      setSearchParams((prev) => {
        prev.delete('skip');
        prev.delete('take');

        if (value.length === 0) {
          prev.delete('accountStatus');
          return prev;
        }

        prev.set('accountStatus', value[0]);
        return prev;
      });
    },
    [setSearchParams]
  );

  const handleFiltersClearAll = useCallback(() => {
    setQueryValue('');
    setRole(undefined);
    setAccountStatus(undefined);

    setSearchParams((prev) => {
      prev.delete('q');
      prev.delete('role');
      prev.delete('accountStatus');
      prev.delete('skip');
      prev.delete('take');
      return prev;
    });
  }, [setSearchParams, setAccountStatus]);

  const filters = [
    {
      key: 'role',
      label: 'Role',
      filter: (
        <ChoiceList
          title="Role"
          titleHidden
          choices={Object.values($Enums.AdminRole).map((role) => ({
            label: role,
            value: role,
          }))}
          selected={role || []}
          onChange={handleRoleFilterChange}
          allowMultiple
        />
      ),
      shortcut: true,
    },
    {
      key: 'accountStatus',
      label: 'Account Status',
      filter: (
        <ChoiceList
          title="Role"
          titleHidden
          choices={[
            {
              label: 'Active',
              value: 'active' as const,
            },
            {
              label: 'Inactive',
              value: 'disabled' as const,
            },
          ]}
          selected={accountStatus ? [accountStatus] : []}
          onChange={handleAccountStatusChange}
          allowMultiple={false}
        />
      ),
      shortcut: true,
    },
  ];

  const appliedFilters: IndexFiltersProps['appliedFilters'] = [];
  if (role && !isEmpty(role)) {
    const key = 'role';
    appliedFilters.push({
      key,
      label: `Users with role ${role.join(', ')}`,
      onRemove: handleRoleFilterChange.bind(null, []),
    });
  }
  if (accountStatus && !isEmpty(accountStatus)) {
    const key = 'accountStatus';
    appliedFilters.push({
      key,
      label: `Account status ${accountStatus}`,
      onRemove: handleAccountStatusChange.bind(null, []),
    });
  }
  /* FILTERS END */

  return (
    <IndexFilters
      sortOptions={sortOptions}
      sortSelected={sortSelected}
      queryValue={queryValue}
      queryPlaceholder="Search users"
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
