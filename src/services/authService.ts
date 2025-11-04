import client from "../lib/api/client";
import { API_ENDPOINTS } from "../lib/api/endpoints";
import { LoginData } from "../types";

// Login
export const login = async (loginDetails: LoginData) => {
  try {
    const response = await client.post(API_ENDPOINTS.AUTH.LOGIN, loginDetails);
    console.log("Login successful:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Login error:", error);

    // return server error data
    if (error.response && error.response.data) {
      console.log("Server error response:", error.response.data);
      return {
        success: false,
        message: error.response.data.message || "Login failed",
        ...error.response.data,
      };
    }

    // network errors or other issues, throw the error
    const errorMessage = error.message || "Network error occurred";
    throw new Error(errorMessage);
  }
};

// Register Student
export const register = async (userData: any) => {
  try {
    const response = await client.post(
      API_ENDPOINTS.STUDENTS.AUTH.SIGNUP,
      userData
    );
    return response.data;
  } catch (error: any) {
    console.error("Register error:", error);
    const errorMessage =
      error.response?.data?.message || error.message || "Registration failed";
    throw new Error(errorMessage);
  }
};

// Register Sponsor
export const registerSponsor = async (userData: any) => {
  try {
    const response = await client.post(
      API_ENDPOINTS.SPONSORS.AUTH.SIGNUP,
      userData
    );
    return response.data;
  } catch (error: any) {
    console.error("Register error:", error);
    const errorMessage =
      error.response?.data?.message || error.message || "Registration failed";
    throw new Error(errorMessage);
  }
};

// Logout
export const logout = () => {
  console.log("User logged out.");
  return Promise.resolve();
};

// Verify Email
export const verifyEmail = async (userData: any) => {
  try {
    console.log("Verify email request data:", userData);
    console.log(
      "Verify email endpoint:",
      API_ENDPOINTS.STUDENTS.AUTH.VERIFY_EMAIL
    );

    const response = await client.post(
      API_ENDPOINTS.STUDENTS.AUTH.VERIFY_EMAIL,
      userData
    );
    console.log("Verify email successful:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Verify email error:", error);

    // If we have a response from the server, return the server's error data
    if (error.response && error.response.data) {
      console.log("Server error response:", error.response.data);
      return {
        success: false,
        message: error.response.data.message || "Verification failed",
        ...error.response.data,
      };
    }

    // For network errors or other issues, throw the error
    const errorMessage = error.message || "Network error occurred";
    throw new Error(errorMessage);
  }
};

// Verify Sponsor Email
export const verifySponsorEmail = async (userData: any) => {
  try {
    const response = await client.post(
      API_ENDPOINTS.SPONSORS.AUTH.VERIFY_EMAIL,
      userData
    );
    return response.data;
  } catch (error: any) {
    console.error("Verify sponsor email error:", error);
    const errorMessage =
      error.response?.data?.message || error.message || "Verification failed";
    throw new Error(errorMessage);
  }
};

// Resend Verification Code
export const resendVerificationCode = async (userData: any) => {
  try {
    const response = await client.post(
      API_ENDPOINTS.STUDENTS.AUTH.REQUEST_NEW_OTP,
      userData
    );
    return response.data;
  } catch (error: any) {
    console.error("Resend verification code error:", error);
    const errorMessage =
      error.response?.data?.message || error.message || "Resend failed";
    throw new Error(errorMessage);
  }
};

// Resend Sponsor Verification Code
export const resendSponsorVerificationCode = async (userData: any) => {
  try {
    const response = await client.post(
      API_ENDPOINTS.SPONSORS.AUTH.REQUEST_NEW_OTP,
      userData
    );
    return response.data;
  } catch (error: any) {
    console.error("Resend sponsor verification code error:", error);
    const errorMessage =
      error.response?.data?.message || error.message || "Resend failed";
    throw new Error(errorMessage);
  }
};

// Forgot Password
export const forgotPassword = async (email: string) => {
  try {
    const response = await client.post(
      API_ENDPOINTS.STUDENTS.AUTH.FORGOT_PASSWORD,
      email
    );
    return response.data;
  } catch (error: any) {
    console.error("Forgot password error:", error);
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Forgot password failed";
    throw new Error(errorMessage);
  }
};

// Forgot Password
export const forgotSponsorPassword = async (email: string) => {
  try {
    const response = await client.post(
      API_ENDPOINTS.SPONSORS.AUTH.FORGOT_PASSWORD,
      email
    );
    return response.data;
  } catch (error: any) {
    console.error("Forgot password error:", error);
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Forgot password failed";
    throw new Error(errorMessage);
  }
};

// Reset Password
export const resetPassword = async (id: string, password: string) => {
  try {
    const response = await client.post(
      API_ENDPOINTS.STUDENTS.AUTH.RESET_PASSWORD + "/" + id,
      password
    );
    return response.data;
  } catch (error: any) {
    console.error("Reset password error:", error);
    const errorMessage =
      error.response?.data?.message || error.message || "Reset password failed";
    throw new Error(errorMessage);
  }
};

// Reset Sponsor Password
export const resetSponsorPassword = async (id: string, password: string) => {
  try {
    const response = await client.post(
      API_ENDPOINTS.SPONSORS.AUTH.RESET_PASSWORD + "/" + id,
      password
    );
    return response.data;
  } catch (error: any) {
    console.error("Reset sponsor password error:", error);
    const errorMessage =
      error.response?.data?.message || error.message || "Reset password failed";
    throw new Error(errorMessage);
  }
};
