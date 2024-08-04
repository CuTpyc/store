import { BlockStack, Layout } from "@shopify/polaris";
import { PrimaryInfoCard } from "./PrimaryInfoCard";
import { FC } from "react";
import { IUser } from "~/.server/shared/interfaces/user.interface";

interface IUserInfoFormProps {
  user: IUser;
}

export const UserInfoForm: FC<IUserInfoFormProps> = ({ user }) => {
  return (
    <Layout>
      <Layout.Section>
        <BlockStack gap="500">
          <PrimaryInfoCard user={user} />
        </BlockStack>
      </Layout.Section>
    </Layout>
  );
};
