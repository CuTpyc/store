import { FormStrategy } from "remix-auth-form";
import { Authenticator } from "remix-auth";
import { sessionStorage } from "~/.server/utils/session.util";
import {invariant} from "@remix-run/router/history"
import { hashPassword, comparePassword } from "../utils/auth.util";
import type { User } from "@prisma/client";
import { prisma } from "../utils/prisma.utils";

export const ADMIN_AUTH_STRATEGY = 'admin-pass'

export const authenticator = new Authenticator<User>(sessionStorage);

const findUser = async (email: string, password: string): Promise<User> => {
  const user = await prisma.user.findUniqueOrThrow({where: {email: email}});

  invariant(await comparePassword(password, user.password), 'Wrong password');

  return user;
}

authenticator.use(
  new FormStrategy(async ({form}) => {
    const email = form.get('email');
    const password = form.get('password');

    // You can validate the inputs however you want
    invariant(typeof email === 'string', 'email must be a string');
    invariant(email.length > 0, 'email must not be empty');

    invariant(typeof password === 'string', 'password must be a string');
    invariant(password.length > 0, 'password must not be empty');

    return await findUser(email, password);
  }),
  ADMIN_AUTH_STRATEGY
);