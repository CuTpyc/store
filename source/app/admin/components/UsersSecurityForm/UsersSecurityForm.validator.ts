import { withZod } from "@rvf/zod";
import { z } from "zod";
import {
  passwordConfirmRule,
  passwordRule,
} from "~/admin/components/UsersNewForm/UsersNewForm.validator";

export const usersSecurityFormValidator = withZod(
  z
    .object({
      password: passwordRule,
      passwordConfirm: passwordConfirmRule,
    })
    .refine((data) => data.password === data.passwordConfirm, {
      message: "Passwords don't match",
      path: ["passwordConfirm"], // path of error
    })
);
