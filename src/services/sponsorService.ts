import client from '../lib/api/client';
import { API_ENDPOINTS } from '../lib/api/endpoints';
import { getAuthHeaders } from '../lib/utils/authHeader';

export const getSponsorProfile = async () => {
  try {
    const response = await client.get(API_ENDPOINTS.SPONSORS.ACCOUNT.PROFILE, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error: any) {
    console.error('error:', error);
    const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch sponsor profile';
    throw new Error(errorMessage);
  }
};

export const updateSponsorProfile = async (profileData: FormData | any) => {
  try {
    const isFormData = profileData instanceof FormData;
    const response = await client.put(
      API_ENDPOINTS.SPONSORS.ACCOUNT.EDIT,
      profileData,
      {
        headers: getAuthHeaders(isFormData),
      }
    );
    return response.data;
  } catch (error: any) {
    console.error('error:', error);
    const errorMessage = error.response?.data?.message || error.message || 'Failed to update sponsor profile';
    throw new Error(errorMessage);
  }
};

export const uploadSponsorDocument = async (
  documentType: string,
  file: File
) => {
  try {
    const formData = new FormData();
    formData.append('document', file);
    formData.append('type', documentType);

    const response = await client.post(
      API_ENDPOINTS.SPONSORS.ACCOUNT.UPLOAD_DOCUMENT,
      formData,
      {
        headers: getAuthHeaders(true),
      }
    );
    return response.data;
  } catch (error: any) {
    console.error('error:', error);
    const errorMessage = error.response?.data?.message || error.message || 'Failed to upload document';
    throw new Error(errorMessage);
  }
};
