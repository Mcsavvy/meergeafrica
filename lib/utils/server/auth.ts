import { getCookie, setCookie, deleteCookie } from "./cookies";
import { ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE } from "@/config"

export function saveTokens({
  accessToken,
  accessTokenExpiresAt,
  refreshToken,
  refreshTokenExpiresAt,
}: {
  accessToken?: string;
  accessTokenExpiresAt?: number;
  refreshToken?: string;
  refreshTokenExpiresAt?: number;
}) {
  if (accessToken) {
    setCookie(ACCESS_TOKEN_COOKIE, accessToken, {
      expires: accessTokenExpiresAt ? new Date(accessTokenExpiresAt * 1000) : 0,
    });
  }
  if (refreshToken) {
    setCookie(REFRESH_TOKEN_COOKIE, refreshToken, {
      expires: refreshTokenExpiresAt
        ? new Date(refreshTokenExpiresAt * 1000)
        : 0,
    });
  }
}

export function deleteTokens() {
  deleteCookie(ACCESS_TOKEN_COOKIE);
  deleteCookie(REFRESH_TOKEN_COOKIE);
}

export function getAccessToken() {
  return getCookie(ACCESS_TOKEN_COOKIE)?.value;
}

export function getRefreshToken() {
  return getCookie(REFRESH_TOKEN_COOKIE)?.value;
}
