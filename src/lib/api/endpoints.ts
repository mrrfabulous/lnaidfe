export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
  },

  // Student Endpoints
  STUDENTS: {
    AUTH: {
      SIGNUP: "/students/sign-up",
      RESET_PASSWORD: "/students/reset-password",
      VERIFY_EMAIL: "/students/verify-email",
      FORGOT_PASSWORD: "/students/forgot-password",
      REQUEST_NEW_OTP: "/students/request-new-otp",
    },
    ACCOUNT: {
      PROFILE: "/students/profile",
      STATS: "/students/student-stats",
      INFO: "/additional-info",
      DETAILS: "/details",
      EDIT: "/students/edit-profile",
    },
    APPEAL: {
      CREATE: "/students/create-request",
      GET_ALL: "/students/get-all-request",
      GET_ONE: "/students/get-request",
      UPDATE: "/students/update-request",
      DELETE: "/students/delete-request",
    },
    CHAT: {
      GET_MESSAGES: "/students/chat/:chatId/messages",
      CREATE_CHAT: "/chat/create-chat",
      CHAT_DETAILS: "/chat/details",
    },
    CONNECT: {
      REQUEST_CONNECT: "/connect/request",
      ACCEPT_REQUEST: "/connect/accept",
      GET_CONNECT: "/connect/get-connections",
      CONNECT_COUNT: "/connect/count",
      GET_STATUS: "/connect/status",
      REJECT_REQUEST: "/connect/reject",
    },
    // Scholarship Endpoints
    SCHOLARSHIPS: {
      CREATE: "/scholarships/create",
      GET_ALL: "/scholarships",
      GET_ONE: "/scholarships",
      UPDATE: "/scholarships/update",
      DELETE: "/scholarships/delete",
      APPLY: "/scholarships/apply",
    },
  },

  // Sponsor Endpoints
  SPONSORS: {
    AUTH: {
      SIGNUP: "/sponsor/sign-up",
      RESET_PASSWORD: "/sponsor/reset-password",
      VERIFY_EMAIL: "/sponsor/verify-email",
      FORGOT_PASSWORD: "/sponsor/forgot-password",
      REQUEST_NEW_OTP: "/sponsor/request-new-otp",
    },
    ACCOUNT: {
      PROFILE: "/sponsor/profile",
      STATS: "/sponsor/sponsor-stats",
      INFO: "/additional-info",
      DETAILS: "/details",
      EDIT: "/sponsor/edit-profile",
      UPLOAD_DOCUMENT: "/sponsor/upload-document",
      REQUEST_NEW_OTP: "/sponsor/request-new-otp",
    },
    SCHOLARSHIPS: {
      CREATE: "/sponsor/create-scholarship",
      GET_ALL: "/sponsor/get-scholarships",
      GET_ONE: "/sponsor/get-scholarship",
      UPDATE: "/sponsor/update-scholarship",
      UPDATE_STATUS: "/sponsor/update-scholarship-status",
      DELETE: "/sponsor/delete-scholarship",
      APPLY: "/sponsor/apply-scholarship",
    },
    APPEAL: {
      CREATE: "/sponsor/create-appeal",
      GET_ALL: "/sponsor/get-appeals",
      GET_ONE: "/sponsor/get-appeal",
      UPDATE: "/sponsor/update-appeal",
      UPDATE_STATUS: "/sponsor/update-appeal-status",
      DELETE: "/sponsor/delete-appeal",
      APPLY: "/sponsor/apply-appeal",
    },
    PAYMENTS: {
      // payment endpoints
    },

    OFFER: {
      CREATE: "/sponsor/create-offer",
      GET_ALL: "/sponsor/get-all-offers",
      GET_ONE: "/sponsor/get-offer",
      // offers endpoint
    },
    // Sponsor Payments/Billing
  }
}


