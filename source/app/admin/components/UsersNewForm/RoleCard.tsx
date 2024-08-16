import {BlockStack, Card, FormLayout, SelectProps, Text} from '@shopify/polaris';
import React, {useMemo} from 'react';
import {ValidatedSelect} from '~/admin/ui/ValidatedSelect/ValidatedSelect';
import {$Enums} from '@prisma/client';

export const RoleCard = () => {

  const roleOptions: SelectProps['options'] = useMemo(() => ([
    {
      label: 'Select role',
      value: '',
    },
    {
      label: 'Admin',
      value: $Enums.AdminRole.ADMIN,
    },
    {
      label: 'Staff',
      value: $Enums.AdminRole.STUFF,
    }
  ]), []);


  return (
    <Card>
      <BlockStack gap="200">
        <Text as="h2" variant="headingSm">
          Role
        </Text>
        <FormLayout>
          <ValidatedSelect
            label={null}
            name="role"
            options={roleOptions}
          />
        </FormLayout>
      </BlockStack>
    </Card>
  );
};
