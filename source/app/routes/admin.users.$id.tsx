import React from "react";
import { Form, redirect, useLoaderData } from "@remix-run/react";
import { Layout, Page } from "@shopify/polaris";
import { DeleteIcon } from "@shopify/polaris-icons";
import { EAdminNavigation } from "~/admin/constants/navigation.constant";
import { UsersSingle } from "~/admin/components/UsersSingle/UsersSingle";
import { adminUsersSingleLoader } from "~/.server/admin/loaders/users.single.loader";
import { adminUsersRoleAction } from "~/.server/admin/actions/users.role.action";
import { DeleteModal } from "~/admin/components/UsersSingle/DeleteModal";
import { useCallback, useState } from "react";

export const loader = adminUsersSingleLoader;

export const action = adminUsersRoleAction;



export default function AdminUsersSingle() {
  const { user } = useLoaderData<typeof loader>();

  const [active, setActive] = useState(false);

  const toggleActive = useCallback(() => setActive((active) => !active), []);

  const handleDelete = () => {
    toggleActive();
    redirect(`${EAdminNavigation.users}/${user.id}/delete`);
  };

  return (

    <Page
      title={user.fullName || ''}
      backAction={{
        url: EAdminNavigation.users
      }}
      primaryAction={{
        content: 'Save',
      }}
      secondaryActions={[
        {
          content: "Delete user",
          accessibilityLabel: "Delete",
          icon: DeleteIcon,
          onAction: toggleActive,
          destructive: true,
        },
        {
          content: 'Security',
          accessibilityLabel: 'Security',
          url: `${EAdminNavigation.users}/${user.id}/security`
        },

      ]}

    >
      <UsersSingle user={user} />
      <Layout.Section variant="oneThird">
        <Form
          action={`${EAdminNavigation.users}/${user.id}/delete`}
          method="post"
        >
          <DeleteModal
            user={user}
            active={active}
            toggleActive={toggleActive}
            handleDelete={handleDelete}
          />
        </Form>
      </Layout.Section>
    </Page>
  );
}
