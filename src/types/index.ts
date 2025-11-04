export interface LoginData {
  email: string;
  password: string;
}

// Application Process Step Interface
export interface ApplicationProcessStep {
  stepNumber: number;
  stepTitle: string;
  duration: string;
  description: string;
}

// Scholarship Creation Data Interface
export interface ScholarshipData {
  sponsorId: string;
  scholarshipTitle: string;
  scholarshipDescription: string;
  scholarshipAmountPerStudent: number;
  scholarshipDuration: string; // ISO date string
  scholarshipNumberOfAwards: number;
  scholarshipDeadline: string; // ISO date string
  scholarshipTargetSchool: string[];
  scholarshipTargetCourse: string[];
  scholarshipTargetLevel: string[];
  scholarshipTargetGPA: number;
  scholarshipRequiredDocuments: string[];
  scholarshipBenefits: string[];
  scholarshipObligations: string[];
  applicationProcess: ApplicationProcessStep[];
}

// API Response Interfaces
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}

export interface ScholarshipResponse extends ApiResponse {
  data?: {
    scholarship: ScholarshipData & {
      _id: string;
      createdAt: string;
      updatedAt: string;
    };
  };
}
