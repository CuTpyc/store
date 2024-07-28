import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Form, json, useLoaderData } from "@remix-run/react";
import React from "react"
import { ADMIN_AUTH_STRATEGY, authenticator } from "~/.server/admin/services/auth.service";
import { commitSession, getSession } from "~/.server/admin/utils/session.util";


export async function action({ request }: ActionFunctionArgs) {
    return await authenticator.authenticate(ADMIN_AUTH_STRATEGY, request, {
      successRedirect: "/admin/dashboard",
      failureRedirect: "/admin/auth/login",
    });
};

export async function loader({ request }: LoaderFunctionArgs) {
    await authenticator.isAuthenticated(request, {
      successRedirect: "/admin/dashboard",
    });
    let session = await getSession(request.headers.get("cookie"));
    let error = session.get(authenticator.sessionErrorKey);
    return json({ error }, {
      headers:{
        'Set-Cookie': await commitSession(session) // You must commit the session whenever you read a flash
      }
    });
  };

export default function Index() {
    const data = useLoaderData<typeof loader>()
    return (
    <div className="h-full justify-center items-center flex flex-col gap-y-4">
         <h2 className="text-5xl font-extrabold text-yellow-300">Welcome to Kudos!</h2>
         <p className="font-semibold text-slate-300">Log In To Give Some Praise!</p>

        <Form method="post" className="rounded-2xl bg-gray-200 p-6 w-96">
            {data.error && (
                <p className="text-red-600">{data.error?.message}</p>
            )}
            <label htmlFor="email" className="text-blue-600 font-semibold">
                Email
            </label>
            <input name="email" id="email" type="text" className="w-full p-2 rounded-xl my-2" />
            <label htmlFor="password" className="text-blue-600 font-semibold">
            Password
            </label>
            <input name="password" id="password" type="password" className="w-full p-2 rounded-xl my-2" />
            <div className="w-full text-center">
            <input
              type="submit"
              className="rounded-xl mt-2 bg-yellow-300 px-3 py-2 text-blue-600 font-semibold transition duration-300 ease-in-out hover:bg-yellow-400 hover:-translate-y-1"
              value="Sign In"
            />
          </div>
        </Form>
      </div>
    )
  }