import { NextResponse } from "next/server";
import { MiddlewareFactory } from "./stackhandler";
import {
  AUTHENTICATION_ROUTES,
  LOGIN_REDIRECT,
  REDIRECT_AUTHENTICATED_USER,
  REDIRECT_PARAM,
} from "@/config";
import { getAccessToken } from "@/lib/utils/server/auth";

import {sanitizeUrl} from "@braintree/sanitize-url"

export const AuthMiddleware: MiddlewareFactory = (next) => (req, event) => {
  // clone the url object so we can modify it later
  const url = req.nextUrl.clone();
  /* extract the path and query from the url object
  the path is the part of the url after the domain name
  e.g /dashboard, /login, /signup */
  const path = url.pathname;
  const query = url.searchParams.toString();
  // check if the path is an authentication route
  const isAuthRoute = AUTHENTICATION_ROUTES.some((route) =>
    new RegExp(route).test(path)
  );
  // at this point, the user is trying to access a protected route
  // or an authentication route, so we need to check if they are authenticated
  const accessToken = getAccessToken();
  if (isAuthRoute) {
    // if the user is authenticated and tries to access an authentication route
    // we redirect them to the login redirect route
    // this is useful for cases where a user is already authenticated
    // and tries to access the login or signup page
    console.debug(`[auth] ${path}`);
    if (accessToken && REDIRECT_AUTHENTICATED_USER) {
      url.pathname = LOGIN_REDIRECT;
      url.searchParams.forEach((v, k, p) => {
        p.delete(k);
      });
      return NextResponse.redirect(url);
    } else {
      return next(req, event);
    }
  }
  if (accessToken) {
    // if the user is authenticated, we serve the request
    console.log(`[protected] ${path}`);
    return next(req, event)
  }
  // if the user is not authenticated, we redirect them to the login page
  // and store the path they were trying to access in the query string
  // so we can redirect them back to that path after they login
  console.debug(`[redirect] ${path}`);
  const redirectTo = sanitizeUrl(path + (query ? `?${query}` : ""));
  url.pathname = "/login";
  url.searchParams.forEach((v, k, p) => {
    p.delete(k);
  });
  url.searchParams.set(REDIRECT_PARAM, redirectTo);
  return NextResponse.redirect(url);
};
