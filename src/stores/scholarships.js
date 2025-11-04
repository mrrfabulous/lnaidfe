import { defineStore } from "pinia";
import { ref, computed } from "vue";
import {
  getScholarships as getScholarshipsService,
  getScholarshipById as getScholarshipByIdService,
  createScholarship as createScholarshipService,
} from "../services/scholarshipsService";

export const useScholarshipsStore = defineStore("scholarships", () => {
  const scholarships = ref([]);
  const loading = ref(false);
  const error = ref(null);

  // get all scholarships
  const getScholarships = async () => {
    try {
      const result = await getScholarshipsService();
      return result;
      console.log("schoolarship result:", result);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  // get sinfle scholarship
  const getScholarshipById = async (id) => {
    console.log("this is the ID I passed:", id);
    try {
      const result = await getScholarshipByIdService(id);
      return result;
      console.log("schoolarship result:", result);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  // get a particular sponsor scholarships
  const getSponsorScholarships = computed(
    () => (sponsorId) =>
      scholarships.value.filter(
        (scholarship) => scholarship.sponsorId === sponsorId
      )
  );

  // get scholarships matching a student profile
  const getMatchingScholarships = computed(
    () => (studentProfile) =>
      scholarships.value.filter((scholarship) => {
        if (scholarship.status !== "active") return false;

        const criteria = scholarship.criteria;
        const matchesCriteria =
          (!criteria.schools?.length ||
            criteria.schools.includes(studentProfile.school)) &&
          (!criteria.courses?.length ||
            criteria.courses.includes(studentProfile.course)) &&
          (!criteria.levels?.length ||
            criteria.levels.includes(studentProfile.level)) &&
          (!criteria.minGPA || studentProfile.gpa >= criteria.minGPA) &&
          (!criteria.gender ||
            criteria.gender === "any" ||
            studentProfile.gender === criteria.gender) &&
          (!criteria.financialNeed || studentProfile.financialNeed === true);

        return matchesCriteria;
      })
  );

  // API Functions
  const initializeScholarships = async () => {
    loading.value = true;
    error.value = null;

    try {
      console.log("Fetching scholarships from API...");
      const response = await getScholarshipsService();

      if (response.success !== false) {
        // API returned successful data
        scholarships.value = response.data || response || [];
        console.log("Scholarships loaded from API:", scholarships.value.length);

        // Cache the data in localStorage for offline access
        localStorage.setItem(
          "edufund_scholarships",
          JSON.stringify(scholarships.value)
        );
      } else {
        // API returned error, try to load from cache
        console.warn("API returned error:", response.message);
        error.value = response.message;
        await loadFromCache();
      }
    } catch (error) {
      console.error("Failed to fetch scholarships from API:", error);
      error.value = error.message;
      // Fallback to cached data
      await loadFromCache();
    } finally {
      loading.value = false;
    }
  };

  const loadFromCache = async () => {
    const savedScholarships = localStorage.getItem("edufund_scholarships");
    if (savedScholarships) {
      scholarships.value = JSON.parse(savedScholarships);
      console.log("Scholarships loaded from cache:", scholarships.value.length);
    } else {
      // If no cache and API failed, initialize with empty array
      scholarships.value = [];
      console.log("No scholarships available - starting with empty array");
    }
  };

  const refreshScholarships = async () => {
    await initializeScholarships();
  };

  // Utility functions
  const saveScholarships = () => {
    localStorage.setItem(
      "edufund_scholarships",
      JSON.stringify(scholarships.value)
    );
  };

  // Create a scholarship
  const createScholarship = async (scholarshipData) => {
    try {
      console.log("Creating scholarship with thtis data:", scholarshipData);
      const response = await createScholarshipService(scholarshipData);
      if (response.success !== false) {
        const newScholarship = response.data || response;
        scholarships.value.push(newScholarship);
        saveScholarships();
        return { success: true, data: newScholarship };
      } else {
        return { success: false, message: response.message };
      }

      console.log("Scholarship conditions was successfully:", response);
    } catch (error) {
      console.error("Failed to create scholarship:", error);
      return { success: false, message: error.message };
    }
  };

  const updateScholarship = (id, updates) => {
    const index = scholarships.value.findIndex(
      (scholarship) => scholarship.id === id
    );
    if (index !== -1) {
      scholarships.value[index] = { ...scholarships.value[index], ...updates };
      saveScholarships();
      return scholarships.value[index];
    }
    return null;
  };

  const deleteScholarship = (id) => {
    const index = scholarships.value.findIndex(
      (scholarship) => scholarship.id === id
    );
    if (index !== -1) {
      const deleted = scholarships.value.splice(index, 1)[0];
      saveScholarships();
      return deleted;
    }
    return null;
  };

  const applyToScholarship = (scholarshipId, applicationData) => {
    const scholarship = scholarships.value.find((s) => s.id === scholarshipId);
    if (scholarship) {
      if (!scholarship.applications) {
        scholarship.applications = [];
      }
      const application = {
        id: Date.now(),
        ...applicationData,
        status: "pending",
        submittedAt: new Date().toISOString(),
      };
      scholarship.applications.push(application);
      saveScholarships();
      return application;
    }
    return null;
  };

  const updateApplicationStep = (scholarshipId, applicationId, stepData) => {
    const scholarship = scholarships.value.find((s) => s.id === scholarshipId);
    if (scholarship && scholarship.applications) {
      const application = scholarship.applications.find(
        (app) => app.id === applicationId
      );
      if (application) {
        application.currentStep = stepData.step;
        application.stepData = { ...application.stepData, ...stepData.data };
        saveScholarships();
        return application;
      }
    }
    return null;
  };

  const updateApplicationStatus = (scholarshipId, applicationId, status) => {
    const scholarship = scholarships.value.find((s) => s.id === scholarshipId);
    if (scholarship && scholarship.applications) {
      const application = scholarship.applications.find(
        (app) => app.id === applicationId
      );
      if (application) {
        application.status = status;
        application.updatedAt = new Date().toISOString();
        saveScholarships();
        return application;
      }
    }
    return null;
  };

  return {
    scholarships,
    loading,
    error,
    getScholarships,
    getScholarshipById,
    getSponsorScholarships,
    getMatchingScholarships,
    initializeScholarships,
    loadFromCache,
    refreshScholarships,
    createScholarship,
    updateScholarship,
    applyToScholarship,
    updateApplicationStep,
    updateApplicationStatus,
    deleteScholarship,
  };
});
