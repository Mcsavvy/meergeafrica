import Cookie from "js-cookie";

export function getCookie(name: string) {
  return Cookie.get(name);
}

export function setCookie(
  name: string,
  value: string,
  options: Cookies.CookieAttributes
) {
  return Cookie.set(name, value, {
    secure: process.env.NODE_ENV == "development",
    sameSite: "Strict",
    ...options,
  });
}

export function deleteCookie(name: string, options?: Cookies.CookieAttributes) {
  return Cookie.remove(name, options);
}
