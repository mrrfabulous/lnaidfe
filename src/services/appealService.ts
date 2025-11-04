import client from "../lib/api/client";
import { API_ENDPOINTS } from "../lib/api/endpoints";
import { getAuthHeaders } from "../lib/utils/authHeader";

export const getAppeals = async () => {
  try {
    const response = await client.get(API_ENDPOINTS.STUDENTS.APPEAL.GET_ALL, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error: any) {
    console.error("error:", error);
    const errorMessage =
      error.response?.data?.message || error.message || "failed";
    throw new Error(errorMessage);
  }
};

export const createAppeal = async (appealData: any) => {
  try {
    const response = await client.post(
      `${API_ENDPOINTS.STUDENTS.APPEAL.CREATE}`,
      appealData,
      {
        headers: getAuthHeaders(true),
      }
    );
    return response.data;
  } catch (error: any) {
    console.error("error:", error);
    const errorMessage =
      error.response?.data?.message || error.message || "failed";
    throw new Error(errorMessage);
  }
};

export const deleteAppeal = async (appealId: string) => {
  try {
    const response = await client.delete(
      API_ENDPOINTS.STUDENTS.APPEAL.DELETE + "/" + appealId
    );
    return response.data;
  } catch (error: any) {
    console.error("error:", error);
    const errorMessage =
      error.response?.data?.message || error.message || "failed";
    throw new Error(errorMessage);
  }
};

export const updateAppeal = async (appealId: string, appealData: any) => {
  try {
    const response = await client.put(
      API_ENDPOINTS.STUDENTS.APPEAL.UPDATE + "/" + appealId,
      appealData
    );
    return response.data;
  } catch (error: any) {
    console.error("error:", error);
    const errorMessage =
      error.response?.data?.message || error.message || "failed";
    throw new Error(errorMessage);
  }
};
