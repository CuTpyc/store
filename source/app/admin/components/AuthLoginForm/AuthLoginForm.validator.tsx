import { withZod } from "@rvf/zod";
import { z } from "zod";

export const authLoginFormValidator = withZod(
  z.object({
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email("Must be a valid email"),
    password: z.string().min(1, { message: "password must not be empty" }),
  })
);
