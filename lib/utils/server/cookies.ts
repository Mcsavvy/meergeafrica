import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

export function getCookie(name: string) {
  const cookieJar = cookies();
  return cookieJar.get(name);
}

export function setCookie(
  name: string,
  value: string,
  options: Partial<ResponseCookie>
) {
  const cookieJar = cookies();
  return cookieJar.set(name, value, options);
}

export function deleteCookie(name: string) {
  const cookieJar = cookies();
  return cookieJar.delete(name);
}

export function hasCookie(name: string) {
  const cookieJar = cookies();
  return cookieJar.has(name);
}
