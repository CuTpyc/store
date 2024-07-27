import { createCookieSessionStorage } from "@remix-run/node";
import { environment } from "../constant/environment.constant";

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "_session", 
    sameSite: "lax", 
    path: "/", 
    httpOnly: true, 
    secrets: [environment.cookie.secret], 
    secure: environment.environment.isProduction, 
  },
});

export const { getSession, commitSession, destroySession } = sessionStorage;