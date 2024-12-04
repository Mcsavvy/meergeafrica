// Unprotected routes
export const UNPROTECTED_ROUTES = [
  // metadata routes
  "^/$",
  "/favicon.ico",
  "/sitemap.xml",
  "/robots.txt",
  "/_next/.*",
  "_assets/.*",
  ".*.(png|jpg|jpeg|gif|svg|ico|webp)",
];

export const AUTHENTICATION_ROUTES = [
  "/login",
  "/signup",
  "/password",
  "/social",
  "/activate",
];

// When an authenticated user tries to access an authentication view
// redirect the to the url specified by LOGIN_REDIRECT
export const REDIRECT_AUTHENTICATED_USER = true;

// The view to redirect authenticated users to
export const LOGIN_REDIRECT = "/dashboard";

// The name of the query parameter for redirect
export const REDIRECT_PARAM = "redirect";

// Access token and refresh token cookie names
export const ACCESS_TOKEN_COOKIE = "ACCESS_TOKEN";
export const REFRESH_TOKEN_COOKIE = "REFRESH_TOKEN";

// Access token and refresh token expiry keys for localStorage
export const ACCESS_TOKEN_EXPIRY_KEY = "ACCESS_TOKEN_EXPIRY";
export const REFRESH_TOKEN_EXPIRY_KEY = "REFRESH_TOKEN_EXPIRY";

// Backend URL
export const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

if (!BACKEND_URL) {
  throw new Error(
    "Please define the NEXT_PUBLIC_API_URL environment variable."
  );
}