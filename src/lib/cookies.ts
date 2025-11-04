import Cookies from "js-cookie";

const TOKEN_KEY = "edufund_token";
const USER_KEY = "edufund_user";
const TOKEN_EXPIRY_KEY = "edufund_token_expiry";

// Set token and data in cookies and localStorage
export const setAuthToken = (
  token: string,
  userData: any,
  rememberMe: boolean = true
): void => {
  const cookieOptions = {
    expires: rememberMe ? 7 : undefined, // 7 days if remember me, session cookie if not
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
  };

  const expiryTime = Date.now() + 60 * 60 * 1000; // 1 hour in milliseconds

  // Store in cookies
  Cookies.set(USER_KEY, JSON.stringify(userData), cookieOptions);
  Cookies.set(TOKEN_KEY, token, cookieOptions);
  Cookies.set(TOKEN_EXPIRY_KEY, expiryTime.toString(), cookieOptions);

  // Also store in localStorage for consistency
  localStorage.setItem(USER_KEY, JSON.stringify(userData));
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(TOKEN_EXPIRY_KEY, expiryTime.toString());
};

export const isTokenExpired = (): boolean => {
  const expiryTime =
    Cookies.get(TOKEN_EXPIRY_KEY) || localStorage.getItem(TOKEN_EXPIRY_KEY);

  if (!expiryTime) {
    return true; // If no expiry time found, consider it expired
  }

  return Date.now() > parseInt(expiryTime, 10);
};

// Get token from cookies or localStorage
export const getAuthToken = (): string | null => {
  if (isTokenExpired()) {
    clearAuth(); // Auto-clear expired token
    return null;
  }
  // Get from cookies first
  const cookieToken = Cookies.get(TOKEN_KEY);
  if (cookieToken) return cookieToken;

  // Fallback to localStorage
  return localStorage.getItem(TOKEN_KEY);
};

// Get user data from cookies or localStorage
export const getAuthUser = (): any | null => {
  // Get from cookies first
  const cookieUser = Cookies.get(USER_KEY);
  if (cookieUser) {
    try {
      return JSON.parse(cookieUser);
    } catch {
      return null;
    }
  }

  // Fallback to localStorage
  const localUser = localStorage.getItem(USER_KEY);
  if (localUser) {
    try {
      return JSON.parse(localUser);
    } catch {
      return null;
    }
  }

  return null;
};

export const clearAuth = () => {
  // Remove cookies
  Cookies.remove(USER_KEY);
  Cookies.remove(TOKEN_KEY);

  // Remove from localStorage
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(TOKEN_KEY);
};

// Check if authenticated or token exists
export const isAuthenticated = (): boolean => {
  return !!getAuthToken();
};

// store appeals in local storage and cookies
export const storeAppeals = (appeals: any[]) => {
  const cookieOptions = {
    expires: 7, // 7 days
    path: "/",
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
  };

  // Store in cookies
  Cookies.set("edufund_appeals", JSON.stringify(appeals), cookieOptions);

  // Also store in localStorage
  localStorage.setItem("edufund_appeals", JSON.stringify(appeals));
};
