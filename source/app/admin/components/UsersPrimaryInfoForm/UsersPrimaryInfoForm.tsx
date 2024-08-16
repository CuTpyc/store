import {BlockStack, Card, FormLayout, Text} from '@shopify/polaris';
import React, {FC} from 'react';
import {ValidatedTextField} from '~/admin/ui/ValidatedTextField/ValidatedTextField';
import {TUserDto} from '~/.server/admin/dto/user.dto';
import {splitFirstName} from '~/admin/utils/user.util';

export type UsersPrimaryInfoFormProps = {
  user: Pick<TUserDto, 'fullName' | 'email'>;
};

export const UsersPrimaryInfoForm: FC<UsersPrimaryInfoFormProps> = (props) => {
  const {user: {fullName, email}} = props;
  const [firstName, lastName] = splitFirstName(fullName || '');

  return (
    <Card>
      <BlockStack gap="200">
        <Text as="h2" variant="headingSm">
          Primary info
        </Text>
        <FormLayout>
          <FormLayout.Group>
            <ValidatedTextField
              label="First Name"
              type="text"
              name="firstName"
              autoComplete="given-name"
              defaultValue={firstName}
            />
            <ValidatedTextField
              label="Last Name"
              type="text"
              name="lastName"
              autoComplete="family-name"
              defaultValue={lastName}
            />
          </FormLayout.Group>
          <ValidatedTextField
            label="Email"
            type="email"
            name="email"
            autoComplete="email"
            defaultValue={email}
          />
        </FormLayout>
      </BlockStack>
    </Card>
  );
};
