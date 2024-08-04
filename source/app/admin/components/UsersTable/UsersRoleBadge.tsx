import { Badge } from "@shopify/polaris";
import React, { FC } from "react";
import { TUserDto } from "~/.server/admin/dto/user.dto";
import { $Enums } from "@prisma/client";

export type UserRoleBadgeProps = Pick<TUserDto, "role">;

export const UserRoleBadge: FC<UserRoleBadgeProps> = ({ role }) => {
  return (
    <Badge
      size="small"
      tone={role === $Enums.AdminRole.ADMIN ? "success" : undefined}
    >
      {role}
    </Badge>
  );
};
