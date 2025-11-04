import client from "../lib/api/client";
import { API_ENDPOINTS } from "../lib/api/endpoints";
import { getAuthHeaders } from "../lib/utils/authHeader";

export const getOffers = async () => {
  try {
    const response = await client.get(API_ENDPOINTS.SPONSORS.OFFER.GET_ALL, {
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

export const createOffer = async (offerData: any) => {
  try {
    const response = await client.post(
      API_ENDPOINTS.SPONSORS.OFFER.CREATE,
      offerData,
      {
        headers: getAuthHeaders(),
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

export const getSingleOffer = async (id: string) => {
  try {
    const response = await client.get(
      API_ENDPOINTS.SPONSORS.OFFER.GET_ONE + "/" + id
    );
    return response.data;
  } catch (error: any) {
    console.error("error:", error);
    const errorMessage =
      error.response?.data?.message || error.message || "failed";
    throw new Error(errorMessage);
  }
};
