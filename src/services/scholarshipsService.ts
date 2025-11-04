import client from "../lib/api/client";
import { API_ENDPOINTS } from "../lib/api/endpoints";
import { getAuthHeaders } from "../lib/utils/authHeader";
import { ScholarshipData } from "../types";

// Create Scholarship
export const createScholarship = async (scholarshipData: ScholarshipData) => {
  try {
    console.log("Creating scholarship with data:", scholarshipData);

    const response = await client.post(
      API_ENDPOINTS.SPONSORS.SCHOLARSHIPS.CREATE,
      scholarshipData,
      {
        headers: getAuthHeaders(),
      }
    );

    console.log("Scholarship created successfully:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Create scholarship error:", error);

    // If we have a response from the server, return the server's error data
    if (error.response && error.response.data) {
      console.log("Server error response:", error.response.data);
      return {
        success: false,
        message: error.response.data.message || "Scholarship creation failed",
        ...error.response.data,
      };
    }

    // For network errors or other issues, throw the error
    const errorMessage = error.message || "Network error occurred";
    throw new Error(errorMessage);
  }
};

// Get All Scholarships
export const getScholarships = async () => {
  try {
    const response = await client.get(
      API_ENDPOINTS.SPONSORS.SCHOLARSHIPS.GET_ALL,
      {
        headers: getAuthHeaders(),
      }
    );
    console.log("Scholarships fetched successfully:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Get scholarships error:", error);

    if (error.response && error.response.data) {
      return {
        success: false,
        message: error.response.data.message || "Failed to fetch scholarships",
        ...error.response.data,
      };
    }

    const errorMessage = error.message || "Network error occurred";
    throw new Error(errorMessage);
  }
};

// Get Scholarship by ID
export const getScholarshipById = async (scholarshipId: string) => {
  try {
    const response = await client.get(
      `${API_ENDPOINTS.SPONSORS.SCHOLARSHIPS.GET_ONE}/${scholarshipId}`,
      {
        headers: getAuthHeaders(),
      }
    );
    return response.data;
  } catch (error: any) {
    console.error("Get scholarship by ID error:", error);

    if (error.response && error.response.data) {
      return {
        success: false,
        message: error.response.data.message || "Failed to fetch scholarship",
        ...error.response.data,
      };
    }

    const errorMessage = error.message || "Network error occurred";
    throw new Error(errorMessage);
  }
};
