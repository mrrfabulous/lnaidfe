import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { login as loginService } from "@/services/authService";
import { register as registerService } from "@/services/authService";
import { verifyEmail as verifyEmailService } from "@/services/authService";
import { verifySponsorEmail as verifySponsorEmailService } from "@/services/authService";
import { resendVerificationCode as resendVerificationCodeService } from "@/services/authService";
import { forgotPassword as forgotPasswordService } from "@/services/authService";
import { forgotSponsorPassword as forgotSponsorPasswordService } from "@/services/authService";
import { resetPassword as resetPasswordService } from "@/services/authService";
import { resetSponsorPassword as resetSponsorPasswordService } from "@/services/authService";
import { registerSponsor as registerSponsorService } from "@/services/authService";
import { resendSponsorVerificationCode as resendSponsorVerificationCodeService } from "@/services/authService";

import {
  setAuthToken,
  getAuthToken,
  getAuthUser,
  clearAuth,
  isAuthenticated,
} from "../lib/cookies";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);
  const token = ref(null);

  const isAuthenticated = computed(() => !!token.value);

  const initializeAuth = () => {
    const savedUser = getAuthUser();
    const savedToken = getAuthToken();

    if (savedUser && savedToken) {
      user.value = savedUser;
      token.value = savedToken;
    }
  };

  const login = async (credentials, rememberMe = true) => {
    try {
      const result = await loginService(credentials);
      console.log("Auth store - service result:", result);

      if (result.success) {
        const userData = {
          id: result.userId,
          email: credentials.email,
          role: result.userType,
          createdAt: new Date().toISOString(),
        };

        user.value = userData;
        token.value = result.token;

        setAuthToken(result.token, userData, rememberMe);

        return {
          success: true,
          message: result.message,
          role: result.userType,
        };
      } else {
        const authStoreResult = {
          success: false,
          message: result.message,
          error: result.message,
        };
        console.log("Auth store - returning error result:", authStoreResult);
        return authStoreResult;
      }
    } catch (error) {
      return { success: false, message: error.message, error: error.message };
    }
  };

  const register = async (userData) => {
    try {
      const result = await registerService(userData);
      console.log("Registration service result:", result);

      if (result.success) {
        const newUser = {
          ...result.data.user,
          id: result.data.user.id,
        };

        user.value = newUser;

        console.log("user", user);

        console.log("User data:", newUser);

        console.log("resiltuserdata:", result.data.user);

        // no token received during registration - Tony is working on that

        return {
          success: true,
          message: result.message,
          otp: result.otp, // Include OTP for verification
          requiresEmailVerification: true,
        };
      } else {
        return {
          success: false,
          message:
            result.message || "Registration failed - no user data received",
        };
      }
    } catch (error) {
      console.error("Registration error from store:", error);
      return {
        success: false,
        message: error.message || "Registration failed",
      };
    }
  };

  const registerSponsor = async (userData) => {
    try {
      const result = await registerSponsorService(userData);
      console.log("Registration service result:", result);

      if (result.sponsor) {
        return {
          success: true,
          message: result.message,
          otp: result.otp,
        };
      } else {
        return {
          success: false,
          message:
            result.message || "Registration failed - no user data received",
        };
      }
    } catch (error) {
      console.error("Registration error:", error);
      return {
        success: false,
        message: error.message || "Registration failed",
      };
    }
  };

  const logout = () => {
    user.value = null;
    token.value = null;
    clearAuth();
  };

  const verifyEmail = async (userData) => {
    const { email, code, role } = userData;
    const verificationServiceMap = {
      student: verifyEmailService,
      sponsor: verifySponsorEmailService,
      // educator: verifyEducatorEmailService,
    };


    if (!role || !verificationServiceMap[role]) {
      console.error("Auth store - Invalid or unsupported role:", role);
      return {
        success: false,
        message: "Unsupported user role for verification.",
      };
    }

    const verificationService = verificationServiceMap[role];

    try {
      const result = await verificationService(userData);

      if (result.success) {
        // Email verification successful
        if (user.value) {
          user.value.isEmailVerified = true;
          // localStorage.setItem("edufund_user", JSON.stringify(user.value));
        }
        return {
          success: true,
          message: result.message || "Email verified successfully",
        };
      } else {
        return {
          success: false,
          message: result.message || "Email verification failed",
        };
      }
    } catch (error) {
      console.error("Auth store - verifyEmail error:", error);
      return {
        success: false,
        message: error.message || "Email verification failed",
      };
    }
  };


  const forgotPassword = async (email) => {
    const { role } = userData;
    const verificationServiceMap = {
      student: verifyEmailService,
      sponsor: verifySponsorEmailService,
      // educator: verifyEducatorEmailService,
    };


    if (!role || !verificationServiceMap[role]) {
      console.error("Auth store - Invalid or unsupported role:", role);
      return {
        success: false,
        message: "Unsupported user role for verification.",
      };
    }

    const verificationService = verificationServiceMap[role];
    try {
      const result = await forgotPasswordService(email);
      if (result.success) {
        return {
          success: true,
          message: result.message,
          userId: result.userId,
        };
      } else {
        return { success: false, error: result.message };
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const forgotSponsorPassword = async (email) => {
    try {
      const result = await forgotSponsorPasswordService(email);
      if (result.success) {
        return {
          success: true,
          message: result.message,
          userId: result.userId,
        };
      } else {
        return { success: false, error: result.message };
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const resendSponsorVerificationCode = async (userData) => {
    try {
      const result = await resendSponsorVerificationCodeService(userData);
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const resendVerificationCode = async (userData) => {
    try {
      const result = await resendVerificationCodeService(userData);
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const resetSponsorPassword = async (details) => {
    const id = details.id;
    const password = details.password;

    try {
      const result = await resetSponsorPasswordService(id, password);
      if (result.success) {
        return {
          success: true,
          message: result.message,
        };
      } else {
        return { success: false, error: result.message };
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const resetPassword = async (details) => {
    const id = details.id;
    const password = details.password;

    console.log("details", details);
    console.log("id", id);
    console.log("password", password);

    try {
      const result = await resetPasswordService(id, password);
      if (result.success) {
        return {
          success: true,
          message: result.message,
        };
      } else {
        return { success: false, error: result.message };
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return {
    user,
    token,
    isAuthenticated,
    initializeAuth,
    login,
    register,
    registerSponsor,
    logout,
    verifyEmail,
    // verifySponsorEmail,
    forgotPassword,
    forgotSponsorPassword,
    resendVerificationCode,
    resendSponsorVerificationCode,
    resetPassword,
    resetSponsorPassword,
  };
});
