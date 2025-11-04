import { getAuthToken } from "../cookies";

export const getAuthHeaders = (isFormData = false) => {
  const token = getAuthToken();
  const headers: Record<string, string> = {};

  // Only add Content-Type for non-FormData requests
  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }

  // Add Authorization header if token exists
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
};
