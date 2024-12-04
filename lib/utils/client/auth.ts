import { getCookie, setCookie, deleteCookie } from "./cookies";
import {
  ACCESS_TOKEN_COOKIE,
  ACCESS_TOKEN_EXPIRY_KEY,
  REFRESH_TOKEN_COOKIE,
  REFRESH_TOKEN_EXPIRY_KEY,
} from "@/config";

function saveTokens({
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
    localStorage.setItem(
      ACCESS_TOKEN_EXPIRY_KEY,
      accessTokenExpiresAt!.toString()
    );
  }
  if (refreshToken) {
    setCookie(REFRESH_TOKEN_COOKIE, refreshToken, {
      expires: refreshTokenExpiresAt
        ? new Date(refreshTokenExpiresAt * 1000)
        : 0,
    });
    localStorage.setItem(
      REFRESH_TOKEN_EXPIRY_KEY,
      refreshTokenExpiresAt!.toString()
    );
  }
}

function deleteTokens() {
  deleteCookie(ACCESS_TOKEN_COOKIE);
  deleteCookie(REFRESH_TOKEN_COOKIE);
}

function getAccessToken() {
  return getCookie(ACCESS_TOKEN_COOKIE);
}

function getRefreshToken() {
  return getCookie(REFRESH_TOKEN_COOKIE);
}

function getAccessTokenExpiry() {
  const expiry = localStorage.getItem(ACCESS_TOKEN_EXPIRY_KEY);
  if (!expiry) return null;
  return parseInt(expiry);
}

function getRefreshTokenExpiry() {
  const expiry = localStorage.getItem(REFRESH_TOKEN_EXPIRY_KEY);
  if (!expiry) return null;
  return parseInt(expiry);
}

export {
  saveTokens,
  deleteTokens,
  getAccessToken,
  getRefreshToken,
  getAccessTokenExpiry,
  getRefreshTokenExpiry,
};
