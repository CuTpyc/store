import { withZod } from "@rvf/zod";
import { z } from "zod";
import { $Enums } from "@prisma/client";

const ROLE_VALUES = Object.values($Enums.AdminRole) as [string, ...string[]];

export const emailRule = z
  .string()
  .trim()
  .min(1, { message: "Email is required" })
  .email("Must be a valid email");

export const firstNameRule = z
  .string()
  .trim()
  .min(1, { message: "First Name is required" });
export const lastNameRule = z
  .string()
  .trim()
  .min(1, { message: "Last Name is required" });
export const passwordRule = z
  .string()
  .trim()
  .min(8, { message: "Password must be greater than 8" });
export const passwordConfirmRule = z.string();
export const roleRule = z.enum(ROLE_VALUES, { message: "Wrong role value" });

export const usersNewFormValidator = withZod(
  z
    .object({
      email: emailRule,
      firstName: firstNameRule,
      lastName: lastNameRule,
      password: passwordRule,
      passwordConfirm: passwordConfirmRule,
      role: roleRule,
    })
    .refine((data) => data.password === data.passwordConfirm, {
      message: "Passwords don't match",
      path: ["passwordConfirm"], // path of error
    })
);
