import { adminAuthLoader } from "~/.server/admin/loaders/auth.login.loader";
import { adminAuthLoginAction } from "~/.server/admin/actions/auth.login.action";
import { Box, Card, Text } from "@shopify/polaris";
import { AuthLoginForm } from "~/admin/components/AuthLoginForm/AuthLoginForm";

export const action = adminAuthLoginAction;

export const loader = adminAuthLoader;

export default function Index() {
  return (
    <Card>
      <Text as="h2" variant="headingSm">
        Admin CMS
      </Text>

      <Box paddingBlockStart="200">
        <AuthLoginForm />
      </Box>
    </Card>
  );
}
