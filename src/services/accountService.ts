import client from "../lib/api/client";
import { API_ENDPOINTS } from "../lib/api/endpoints";
import { getAuthHeaders } from "../lib/utils/authHeader";

// student stat
export const getStudentStats = async () => {
  try {
    const response = await client.get(API_ENDPOINTS.STUDENTS.ACCOUNT.STATS, {
      headers: getAuthHeaders(),
    });
    // console.log("response of stat from service:", response);
    return response.data;
  } catch (error: any) {
    console.error("error:", error);
    const errorMessage =
      error.response?.data?.message || error.message || "failed";
    throw new Error(errorMessage);
  }
};

//bio
export const getProfile = async () => {
  try {
    // console.log("headers:", getAuthHeaders());
    const response = await client.get(API_ENDPOINTS.STUDENTS.ACCOUNT.PROFILE, {
      headers: getAuthHeaders(),
    });
    // console.log("response", response);
    return response.data;
  } catch (error: any) {
    console.error("error:", error);
    const errorMessage =
      error.response?.data?.message || error.message || "failed";
    throw new Error(errorMessage);
  }
};

// edit profile
export const editStudentProfile = async (profileData: any) => {
  try {
    const response = await client.put(
      API_ENDPOINTS.STUDENTS.ACCOUNT.EDIT,
      profileData,
      {
        headers: getAuthHeaders(true),
      }
    );
    // console.log("response", response);
    return response.data;
  } catch (error: any) {
    console.error("error:", error);
    const errorMessage =
      error.response?.data?.message || error.message || "failed";
    throw new Error(errorMessage);
  }
};

// Upload profile pic
export const addStudentAdditionalDetails = async (
  id: string,
  additionalData: any
) => {
  try {
    const response = await client.post(
      `students/${id}${API_ENDPOINTS.STUDENTS.ACCOUNT.INFO}`,
      additionalData
    );
    console.log("response", response);
    return response.data;
  } catch (error: any) {
    console.error("error:", error);
    const errorMessage =
      error.response?.data?.message || error.message || "failed";
    throw new Error(errorMessage);
  }
};

// sponsor stats
export const getSponsorStats = async () => {
  try {
    const response = await client.get(API_ENDPOINTS.SPONSORS.ACCOUNT.STATS, {
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
