import { createCookie } from "@remix-run/node"; // or cloudflare/deno

export const languageCookie = createCookie("language", {
  path: '/',
  httpOnly: true,
  sameSite: 'lax',
});
