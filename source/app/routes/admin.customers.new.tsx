import React, { useCallback } from "react";
import { Page } from "@shopify/polaris";
import { EAdminNavigation } from "~/admin/constants/navigation.constant";
import { UsersNewForm } from "~/admin/components/UsersNewForm/UsersNewForm";
import { usersNewFormValidator } from "~/admin/components/UsersNewForm/UsersNewForm.validator";
import { ValidatedForm } from "remix-validated-form";
import { ValidatedSubmitButton } from "~/admin/ui/ValidatedSubmitButton/ValidatedSubmitButton";
import { adminUsersNewAction } from "~/.server/admin/actions/users.new.action";
import { customersNewFormValidator } from "~/admin/components/CustomersNewForm/CustomersNewForm.validator";
import { adminCustomersNewAction } from "~/.server/admin/actions/customers.new.action";
import { CustomersNewForm } from "~/admin/components/CustomersNewForm/CustomerNewForm";

export const action = adminCustomersNewAction;

export default function AdminCustomersNew() {
  const primaryAction = useCallback(
    () => <ValidatedSubmitButton text="save" variant="primary" />,
    []
  );

  return (
    <ValidatedForm validator={customersNewFormValidator} method="post">
      <Page
        title="Create new customer"
        backAction={{
          url: EAdminNavigation.customers,
        }}
        primaryAction={primaryAction()}
      >
        <CustomersNewForm />
      </Page>
    </ValidatedForm>
  );
}