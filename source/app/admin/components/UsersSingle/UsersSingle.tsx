import { BlockStack, Layout } from '@shopify/polaris';
import { FC } from 'react';
import { TUserDto } from '~/.server/admin/dto/user.dto';
import { PrimaryInfoCard } from '~/admin/components/UsersSingle/PrimaryInfoCard';
import { RoleCard } from '~/admin/components/UsersSingle/RoleCard';

export type UsersSingleProps = {
  user: TUserDto;
};

export const UsersSingle: FC<UsersSingleProps> = ({ user }) => {
  return (
    <Layout>
      <Layout.Section>
        <BlockStack gap='500'>
          <PrimaryInfoCard user={user} />
        </BlockStack>
      </Layout.Section>

      <Layout.Section variant='oneThird'>
        <RoleCard user={user} />
      </Layout.Section>
    </Layout>
  );
};
