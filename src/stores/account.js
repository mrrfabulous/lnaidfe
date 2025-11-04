import { defineStore } from "pinia";
import { getAuthUser } from "../lib/cookies";

import { getStudentStats as getStudentStatsService } from "@/services/accountService";
import { getSponsorStats as getSponsorStatsService } from "@/services/accountService";
import { getProfile as getProfileService } from "@/services/accountService";
import { editStudentProfile as editStudentProfileService } from "@/services/accountService";

export const useAccountStore = defineStore("account", () => {
  const user = getAuthUser();
  const userId = user?.id || null;

  const getStudentStats = async () => {
    try {
      const result = await getStudentStatsService();

      if (result.success) {
        return {
          success: true,
          message: result.message,
          stats: result.stats,
          result: result,
        };
      } else {
        console.error("getStudentStats error:", result.message);
        return { success: false, message: result.message };
      }
    } catch (error) {
      console.log("getStudentStats error:", error);
      throw new Error(error.message);
    }
  };

  const getProfile = async () => {
    try {
      const result = await getProfileService(userId);
      // console.log("Bio result from the store", result);

      if (result.success) {
        return result.data;
      } else {
        console.error("getProfile error:", result.message);
        return null;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getSponsorStats = async () => {
    try {
      const result = await getSponsorStatsService();

      if (result.success) {
        return {
          success: true,
          message: result.message,
          stats: result.stats,
          result: result,
        };
      } else {
        console.error("getSponsorStats error:", result.message);
        return { success: false, message: result.message };
      }
    } catch (error) {
      console.log("getSponsorStats error:", error);
      throw new Error(error.message);
    }
  };

  const editStudentProfile = async (profileData) => {
    try {
      const isFormData = profileData instanceof FormData;
      console.log("==auth store debugging for header:");
      console.log("Is FormData:", isFormData);
      console.log("Profile data type:", typeof profileData);

      if (isFormData) {
        console.log("Sending FormData...");
        // Log FormData contents
        for (let [key, value] of profileData.entries()) {
          console.log(`FormData - ${key}:`, value);
        }
      } else {
        console.log("Sending JSON:", profileData);
      }

      const result = await editStudentProfileService(profileData);
      console.log("Edit profile result from the store", result);

      if (result.success) {
        return result;
      } else {
        console.error("editStudentProfile error:", result.message);
        return null;
      }
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
      return null;
    }
  };

  return {
    getStudentStats,
    getSponsorStats,
    getProfile,
    editStudentProfile,
  };
});
