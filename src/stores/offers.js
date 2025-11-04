import { defineStore } from "pinia";
import { ref, computed } from "vue";
import {
  createOffer as createOfferService,
  getOffers as getOffersService,
  getSingleOffer as getSingleOfferService,
} from "../services/offersService";
import { getAuthUser } from "../lib/cookies";

export const useOffersStore = defineStore("offers", () => {
  const offers = ref([]);

  const user = getAuthUser();
  const userId = user?.id || null;

  const getOffers = computed(() => offers.value);

  const fetchOffers = async () => {
    try {
      const result = await getOffersService();
      console.log("offer result from the store", result);
      if (result.success) {
        return {
          data: result.data,
          success: true,
          pagination: result.pagination,
        };
      } else {
        console.error("Error fetching offers");
        console.log("Error fetching offers");
      }

      // offers.value = result.data;
    } catch (error) {
      console.error("Error fetching offers:", error);
    }
  };

  const getSingleOffer = async (offerId) => {
    try {
      const result = await getSingleOfferService(offerId);
      if (result.success) {
        return {
          data: result.data,
          success: true,
        };
      } else {
        console.error("Error fetching offer");
        console.log("Error fetching offer");
      }
    } catch (error) {
      console.error("Error fetching offer:", error);
    }
  };

  const getSponsorOffers = computed(
    () => (sponsorId) =>
      offers.value.filter((offer) => offer.sponsorId === sponsorId)
  );

  const getMatchingOffers = computed(
    () => (studentProfile) =>
      offers.value.filter((offer) => {
        if (offer.status !== "active") return false;

        const criteria = offer.criteria;
        const matchesCriteria =
          (!criteria.schools?.length ||
            criteria.schools.includes(studentProfile.school)) &&
          (!criteria.courses?.length ||
            criteria.courses.includes(studentProfile.course)) &&
          (!criteria.levels?.length ||
            criteria.levels.includes(studentProfile.level)) &&
          (!criteria.minGPA || studentProfile.gpa >= criteria.minGPA) &&
          (!criteria.maxGPA || studentProfile.gpa <= criteria.maxGPA) &&
          (!criteria.gender ||
            criteria.gender === "any" ||
            studentProfile.gender === criteria.gender) &&
          (!criteria.states?.length ||
            criteria.states.includes(studentProfile.state)) &&
          (!criteria.ageRange ||
            (studentProfile.age >= criteria.ageRange.min &&
              studentProfile.age <= criteria.ageRange.max));

        return matchesCriteria;
      })
  );

  const initializeOffers = () => {
    try {
      const savedOffers = localStorage.getItem("edufund_offers");
      if (savedOffers) {
        offers.value = JSON.parse(savedOffers);
      } else {
        // Initialize with comprehensive mock data
        offers.value = [
          {
            id: 1,
            sponsorId: 1,
            sponsorName: "Tech Corp Foundation",
            sponsorAvatar: "/placeholder.svg?height=40&width=40",
            title: "Tech Innovation Grant",
            description:
              "Supporting innovative technology projects by computer science students",
            amount: 100000,
            totalBudget: 500000,
            remainingBudget: 300000,
            maxRecipients: 5,
            currentRecipients: 2,
            criteria: {
              schools: [
                "University of Lagos",
                "Obafemi Awolowo University",
                "University of Ibadan",
              ],
              courses: [
                "Computer Science",
                "Software Engineering",
                "Information Technology",
              ],
              levels: ["300 Level", "400 Level", "500 Level"],
              minGPA: 3.5,
              maxGPA: 5.0,
              gender: "any",
              states: [],
              ageRange: { min: 18, max: 30 },
              financialNeed: false,
            },
            requirements: [
              "Academic transcript showing minimum 3.5 GPA",
              "Project proposal (max 5 pages)",
              "Recommendation letter from academic supervisor",
              "Portfolio of previous projects (optional)",
            ],
            selectionProcess: "merit_based",
            status: "active",
            deadline: "2026-03-31T23:59:59Z",
            createdAt: "2025-07-01T00:00:00Z",
            applications: [
              {
                id: 1,
                studentId: 1,
                studentName: "John Doe",
                studentEmail: "john@example.com",
                school: "University of Lagos",
                course: "Computer Science",
                level: "400 Level",
                gpa: 4.2,
                status: "pending",
                appliedAt: "2024-01-15T10:00:00Z",
                documents: ["transcript.pdf", "proposal.pdf"],
                coverLetter:
                  "I am passionate about developing innovative solutions...",
              },
            ],
          },
          {
            id: 2,
            sponsorId: 2,
            sponsorName: "Women in STEM Foundation",
            sponsorAvatar: "/placeholder.svg?height=40&width=40",
            title: "Female STEM Excellence Award",
            description:
              "Empowering female students in Science, Technology, Engineering, and Mathematics",
            amount: 150000,
            totalBudget: 750000,
            remainingBudget: 600000,
            maxRecipients: 5,
            currentRecipients: 1,
            criteria: {
              schools: [],
              courses: [
                "Computer Science",
                "Engineering",
                "Mathematics",
                "Physics",
                "Chemistry",
              ],
              levels: ["300 Level", "400 Level", "500 Level"],
              minGPA: 3.7,
              maxGPA: 5.0,
              gender: "female",
              states: [],
              ageRange: { min: 18, max: 35 },
              financialNeed: true,
            },
            requirements: [
              "Academic transcript",
              "Personal statement (500 words)",
              "Proof of financial need",
              "Two recommendation letters",
            ],
            selectionProcess: "holistic",
            status: "active",
            deadline: "2024-04-15T23:59:59Z",
            createdAt: "2024-01-05T00:00:00Z",
            applications: [],
          },
          {
            id: 3,
            sponsorId: 3,
            sponsorName: "Green Energy Initiative",
            sponsorAvatar: "/placeholder.svg?height=40&width=40",
            title: "Renewable Energy Research Grants",
            description:
              "Supporting research and innovation in renewable energy technologies and sustainable development solutions.",
            amount: 200000,
            totalBudget: 1000000,
            remainingBudget: 800000,
            maxRecipients: 5,
            currentRecipients: 1,
            criteria: {
              schools: [
                "University of Lagos",
                "University of Ibadan",
                "Ahmadu Bello University",
              ],
              courses: [
                "Engineering",
                "Environmental Science",
                "Physics",
                "Chemistry",
              ],
              levels: ["400 Level", "500 Level", "Masters", "PhD"],
              minGPA: 3.8,
              maxGPA: 5.0,
              gender: "any",
              states: [],
              ageRange: { min: 20, max: 40 },
              financialNeed: false,
            },
            requirements: [
              "Research proposal on renewable energy",
              "Academic transcript with minimum 3.8 GPA",
              "Supervisor endorsement letter",
              "Environmental impact assessment",
              "Project timeline and budget",
            ],
            selectionProcess: "research_based",
            status: "active",
            deadline: "2025-09-30T23:59:59Z",
            createdAt: "2025-06-01T00:00:00Z",
            applications: [],
          },
          {
            id: 4,
            sponsorId: 4,
            sponsorName: "Medical Excellence Foundation",
            sponsorAvatar: "/placeholder.svg?height=40&width=40",
            title: "Future Doctors Scholarship",
            description:
              "Supporting outstanding medical students who demonstrate academic excellence and commitment to healthcare service.",
            amount: 300000,
            totalBudget: 1500000,
            remainingBudget: 1200000,
            maxRecipients: 5,
            currentRecipients: 1,
            criteria: {
              schools: [
                "University of Lagos",
                "University of Ibadan",
                "Obafemi Awolowo University",
              ],
              courses: ["Medicine", "Nursing", "Pharmacy", "Dentistry"],
              levels: ["300 Level", "400 Level", "500 Level", "600 Level"],
              minGPA: 4.0,
              maxGPA: 5.0,
              gender: "any",
              states: [],
              ageRange: { min: 18, max: 30 },
              financialNeed: true,
            },
            requirements: [
              "Medical school transcript",
              "Personal statement on healthcare vision",
              "Clinical experience documentation",
              "Two faculty recommendation letters",
              "Community service record",
            ],
            selectionProcess: "holistic",
            status: "active",
            deadline: "2025-08-15T23:59:59Z",
            createdAt: "2025-05-15T00:00:00Z",
            applications: [],
          },
          {
            id: 5,
            sponsorId: 5,
            sponsorName: "Business Innovation Hub",
            sponsorAvatar: "/placeholder.svg?height=40&width=40",
            title: "Entrepreneurship Development Grant",
            description:
              "Funding innovative business ideas and startups from business and entrepreneurship students.",
            amount: 250000,
            totalBudget: 1250000,
            remainingBudget: 1000000,
            maxRecipients: 5,
            currentRecipients: 1,
            criteria: {
              schools: [],
              courses: [
                "Business Administration",
                "Economics",
                "Marketing",
                "Finance",
                "Management",
              ],
              levels: ["300 Level", "400 Level", "500 Level", "Masters"],
              minGPA: 3.5,
              maxGPA: 5.0,
              gender: "any",
              states: [],
              ageRange: { min: 20, max: 35 },
              financialNeed: false,
            },
            requirements: [
              "Business plan (10-15 pages)",
              "Market research and analysis",
              "Financial projections",
              "Pitch deck presentation",
              "Team composition and roles",
            ],
            selectionProcess: "merit_based",
            status: "active",
            deadline: "2025-10-31T23:59:59Z",
            createdAt: "2025-07-01T00:00:00Z",
            applications: [],
          },
          {
            id: 6,
            sponsorId: 6,
            sponsorName: "Arts & Culture Foundation",
            sponsorAvatar: "/placeholder.svg?height=40&width=40",
            title: "Creative Arts Excellence Award",
            description:
              "Recognizing and supporting exceptional talent in creative arts, design, and cultural studies.",
            amount: 120000,
            totalBudget: 600000,
            remainingBudget: 480000,
            maxRecipients: 5,
            currentRecipients: 1,
            criteria: {
              schools: [],
              courses: [
                "Fine Arts",
                "Music",
                "Theatre Arts",
                "Creative Writing",
                "Film Studies",
                "Design",
              ],
              levels: ["200 Level", "300 Level", "400 Level", "500 Level"],
              minGPA: 3.0,
              maxGPA: 5.0,
              gender: "any",
              states: [],
              ageRange: { min: 18, max: 28 },
              financialNeed: true,
            },
            requirements: [
              "Portfolio of creative works",
              "Artist statement (500 words)",
              "Academic transcript",
              "Performance or exhibition record",
              "Mentor recommendation letter",
            ],
            selectionProcess: "portfolio_based",
            status: "active",
            deadline: "2025-11-30T23:59:59Z",
            createdAt: "2025-06-15T00:00:00Z",
            applications: [],
          },
          {
            id: 7,
            sponsorId: 7,
            sponsorName: "Agricultural Development Corp",
            sponsorAvatar: "/placeholder.svg?height=40&width=40",
            title: "Sustainable Agriculture Grant",
            description:
              "Supporting innovative approaches to sustainable farming and agricultural technology development.",
            amount: 180000,
            totalBudget: 900000,
            remainingBudget: 720000,
            maxRecipients: 5,
            currentRecipients: 1,
            criteria: {
              schools: [
                "University of Agriculture, Abeokuta",
                "Ahmadu Bello University",
                "University of Ibadan",
              ],
              courses: [
                "Agriculture",
                "Agricultural Engineering",
                "Crop Science",
                "Animal Science",
                "Soil Science",
              ],
              levels: ["300 Level", "400 Level", "500 Level", "Masters"],
              minGPA: 3.6,
              maxGPA: 5.0,
              gender: "any",
              states: ["Ogun", "Kaduna", "Oyo", "Kano", "Plateau"],
              ageRange: { min: 20, max: 35 },
              financialNeed: false,
            },
            requirements: [
              "Research proposal on sustainable agriculture",
              "Academic transcript",
              "Farm visit and assessment report",
              "Supervisor recommendation",
              "Implementation timeline",
            ],
            selectionProcess: "research_based",
            status: "active",
            deadline: "2025-12-15T23:59:59Z",
            createdAt: "2025-07-01T00:00:00Z",
            applications: [],
          },
        ];
        saveOffers();
      }
    } catch (error) {
      console.error("Failed to initialize offers:", error);
      offers.value = [];
    }
  };

  const saveOffers = () => {
    localStorage.setItem("edufund_offers", JSON.stringify(offers.value));
  };

  const createOffer = async (offerData) => {
    try {
      const result = await createOfferService(offerData);
      console.log("offerResult:", result);
    } catch (error) {
      console.log(error);
    }

    // const newOffer = {
    //   id: Date.now(),
    //   ...offerData,
    //   remainingBudget: offerData.totalBudget,
    //   currentRecipients: 0,
    //   status: "active",
    //   createdAt: new Date().toISOString(),
    //   applications: [],
    // };

    // offers.value.push(newOffer);
    // saveOffers();
    // return newOffer;
  };

  const updateOffer = (id, updates) => {
    const index = offers.value.findIndex((offer) => offer.id === id);
    if (index !== -1) {
      offers.value[index] = {
        ...offers.value[index],
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      saveOffers();
      return offers.value[index];
    }
    return null;
  };

  const applyToOffer = (offerId, application) => {
    const offer = offers.value.find((o) => o.id === offerId);
    if (offer && offer.currentRecipients < offer.maxRecipients) {
      offer.applications.push({
        id: Date.now(),
        ...application,
        status: "pending",
        appliedAt: new Date().toISOString(),
      });
      saveOffers();
      return true;
    }
    return false;
  };

  const updateApplicationStatus = (
    offerId,
    applicationId,
    status,
    feedback = ""
  ) => {
    const offer = offers.value.find((o) => o.id === offerId);
    if (offer) {
      const application = offer.applications.find(
        (a) => a.id === applicationId
      );
      if (application) {
        const previousStatus = application.status;
        application.status = status;
        application.updatedAt = new Date().toISOString();
        application.feedback = feedback;

        if (status === "approved" && previousStatus !== "approved") {
          offer.remainingBudget -= offer.amount;
          offer.currentRecipients += 1;
        } else if (status === "rejected" && previousStatus === "approved") {
          offer.remainingBudget += offer.amount;
          offer.currentRecipients -= 1;
        }

        saveOffers();
        return true;
      }
    }
    return false;
  };

  const deleteOffer = (id) => {
    const index = offers.value.findIndex((offer) => offer.id === id);
    if (index !== -1) {
      offers.value.splice(index, 1);
      saveOffers();
      return true;
    }
    return false;
  };

  return {
    offers,
    fetchOffers,
    getOffers,
    getSponsorOffers,
    getMatchingOffers,
    initializeOffers,
    createOffer,
    getSingleOffer,
    updateOffer,
    applyToOffer,
    updateApplicationStatus,
    deleteOffer,
  };
});
