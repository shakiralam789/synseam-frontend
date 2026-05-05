import Cookies from "js-cookie";

export const AUTH_TOKEN_KEY = "synseam_auth_token";

export function setAuthToken(token: string) {
  Cookies.set(AUTH_TOKEN_KEY, token, { expires: 1 }); // 1 day
}

export function getAuthToken() {
  return Cookies.get(AUTH_TOKEN_KEY);
}

export function removeAuthToken() {
  Cookies.remove(AUTH_TOKEN_KEY);
}

export function isAuthenticated() {
  return !!getAuthToken();
}
