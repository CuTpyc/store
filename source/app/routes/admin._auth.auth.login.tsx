
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import { adminAuthLoader } from "~/.server/admin/loaders/auth.login.loader";
import { adminAuthAction } from "~/.server/admin/actions/auth.login.action";
import { Button, Card, FormLayout, TextField, Text, Box, Banner, TextContainer } from "@shopify/polaris";
import { useState } from "react";
import { withZod } from "@rvf/zod";
import { z } from "zod";
import { ValidatedForm } from "remix-validated-form";
import { ValidatedTextField } from "~/admin/ui/ValidatedTextField/ValidatedTextField";
import { ValidatedSubmitButton } from "~/admin/ui/ValidatedSubmitButton/ValidatedSubmitButton";


export const action = adminAuthAction

export const loader = adminAuthLoader


export const validator = withZod(
  z.object({
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email("Must be a valid email"),
    password: z
      .string()
      .min(1, { message: "Password must not be empty" })
  })
);

export default function Index() {
  const actionData = useActionData<typeof action>();
  // const data = useLoaderData<typeof loader>()

  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()

  return (

    <Card>
      <Text as="h2" variant="bodyMd">
        Admin CMS
      </Text>
      {actionData?.error && (
        <Box paddingBlockStart="200">
          <Banner tone="warning">
            <p>
              {actionData?.error?.message}
            </p>
          </Banner>
        </Box>
      )}

      <Box paddingBlockStart="200">
        <ValidatedForm validator={validator} method="post" className="rounded-2xl bg-gray-200 p-6 w-96">
          <FormLayout>
            <ValidatedTextField
              label="email"
              type="email"
              name="email"
              autoComplete="email"
            />
            <ValidatedTextField
              label="password"
              type="password"
              name="password"
              autoComplete="on"
            />

            <ValidatedSubmitButton text="Submit"/>
          </FormLayout>

        </ValidatedForm>
      </Box>

    </Card>
  )
}