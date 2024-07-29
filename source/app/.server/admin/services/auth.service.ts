import { FormStrategy } from "remix-auth-form";
import { Authenticator } from "remix-auth";
import { sessionStorage } from "~/.server/admin/utils/session.util";
import {invariant} from "@remix-run/router/history"
import { hashPassword, comparePassword } from "~/.server/shared/utils/auth.util";
import type { User } from "@prisma/client";
import { prisma } from "~/.server/shared/utils/prisma.utils";
import { validator } from "~/routes/admin._auth.auth.login";
import { validationError } from "remix-validated-form";
import { ValidatorErrorWrapper } from "~/.server/shared/errors/validation-error-wrapper.";

export const ADMIN_AUTH_STRATEGY = 'admin-pass'

export const authenticator = new Authenticator<User>(sessionStorage);

const findUser = async (email: string, password: string): Promise<User> => {
  const user = await prisma.user.findUniqueOrThrow({where: {email: email}});

  invariant(await comparePassword(password, user.password), 'Wrong password');

  return user;
}

authenticator.use(
  new FormStrategy(async (form) => {

    const data = await validator.validate(
      form
    );

    if (data.error) {
      throw new ValidatorErrorWrapper(data.error)
    }

    const { email, password } = data.data

    return await findUser(email, password);
  }),
  ADMIN_AUTH_STRATEGY
);