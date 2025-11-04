import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { createAppeal as createAppealService } from "../services/appealService";
import { getAppeals as getAppealsService } from "../services/appealService";
import { storeAppeals, getAuthUser } from "../lib/cookies";

export const useAppealsStore = defineStore("appeals", () => {
  const appeals = ref([]);
  const user = getAuthUser();
  const userId = user?.id || null;

  const getAppealById = computed(
    () => (id) => appeals.value.find((appeal) => appeal.id === parseInt(id))
  );

  const getUserAppeals = computed(
    () => (userId) =>
      appeals.value.filter((appeal) => appeal.userId === userId) || []
  );

  const saveAppeals = () => {
    storeAppeals(appeals.value);
  };

  const getAppeals = async () => {
    const result = await getAppealsService();
    console.log(result);
    if (result.success) {
      appeals.value = result.data;
      // console.log("Appeals", appeals.value);
      saveAppeals();
    } else {
      console.log("Failed to get appeals");
    }
  };

  const createAppeal = async (appealData) => {
    console.log("Creating appeal with data:", appealData);

    const result = await createAppealService(appealData);
    console.log(result);

    if (result.success) {
      const newAppeal = result.data;
      appeals.value.push(newAppeal);
    }
    saveAppeals();

    return result.data || null;
  };

  const updateAppeal = (id, updates) => {
    const index = appeals.value.findIndex((appeal) => appeal.id === id);
    if (index !== -1) {
      appeals.value[index] = {
        ...appeals.value[index],
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      saveAppeals();
      return appeals.value[index];
    }
    return null;
  };

  const deleteAppeal = (id) => {
    const index = appeals.value.findIndex((appeal) => appeal.id === id);
    if (index !== -1) {
      appeals.value.splice(index, 1);
      saveAppeals();
      return true;
    }
    return false;
  };

  const donateToAppeal = (appealId, donation) => {
    const appeal = appeals.value.find((a) => a.id === appealId);
    if (appeal) {
      appeal.donations.push({
        id: Date.now(),
        ...donation,
        date: new Date().toISOString(),
      });
      appeal.raisedAmount += donation.amount;
      appeal.updatedAt = new Date().toISOString();
      saveAppeals();
      return true;
    }
    return false;
  };

  const addAppeal = (appealData) => {
    return createAppeal(appealData);
  };

  const updateAppealStatus = (id, status) => {
    return updateAppeal(id, { status });
  };

  return {
    appeals,
    getAppeals,
    getAppealById,
    getUserAppeals,
    createAppeal,
    addAppeal,
    updateAppeal,
    updateAppealStatus,
    deleteAppeal,
    donateToAppeal,
  };
});
