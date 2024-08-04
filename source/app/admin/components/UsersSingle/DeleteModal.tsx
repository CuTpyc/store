import { Form } from "@remix-run/react";
import { Button, InlineStack, Modal, Text } from "@shopify/polaris";
import { FC } from "react";
import { TUserDto } from "~/.server/admin/dto/user.dto";

export type DeleteCardProps = {
  user: TUserDto;
  active: boolean;
  toggleActive: () => void;
};

export const DeleteModal: FC<DeleteCardProps> = ({
  user,
  active,
  toggleActive,
}) => {
  return (
    <Modal
      size="small"
      open={active}
      onClose={toggleActive}
      title="Delete user confirmation"
    >
      <Form method="post">
        <input type="hidden" name="actionType" value="deleteUser" />
        <Modal.Section>
          <Text as="p">
            Are you sure you want to delete user{" "}
            <strong>{user.fullName}</strong>?
          </Text>
        </Modal.Section>
        <Modal.Section>
          <InlineStack direction="row-reverse" align="end" gap="200">
            <Button variant="primary" tone="critical" submit>
              Delete
            </Button>
            <Button onClick={toggleActive}>Cancel</Button>
          </InlineStack>
        </Modal.Section>
      </Form>
    </Modal>
  );
};
