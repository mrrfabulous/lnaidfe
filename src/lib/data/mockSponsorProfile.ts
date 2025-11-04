export interface SponsorProfile {
  id: number;
  organizationName: string;
  organizationType: 'corporate' | 'educational' | 'non-profit' | 'government' | 'other';
  registrationNumber?: string;
  yearEstablished: number;
  description: string;
  logo?: string;
  website: string;
  socialMedia?: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
  };
  contact: {
    primaryEmail: string;
    alternateEmail?: string;
    phone: string;
    address: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
    };
  };
  industry?: string;
  preferences: {
    emailNotifications: boolean;
    applicationAlerts: boolean;
    monthlyReports: boolean;
    newsletter: boolean;
    language: string;
    timezone: string;
  };
  documents?: {
    registrationCertificate?: string;
    taxDocument?: string;
    otherDocuments?: string[];
  };
  stats: {
    totalOffersCreated: number;
    totalScholarshipsCreated: number;
    totalBeneficiaries: number;
    totalDisbursed: number;
    memberSince: string;
  };
}

export const mockSponsorProfile: SponsorProfile = {
  id: 1,
  organizationName: "Tech Futures Foundation",
  organizationType: "non-profit",
  registrationNumber: "NP123456789",
  yearEstablished: 2020,
  description: "Tech Futures Foundation is dedicated to empowering the next generation of technology leaders through educational support and professional development opportunities.",
  logo: "/placeholder-logo.svg",
  website: "https://techfuturesfoundation.org",
  socialMedia: {
    linkedin: "https://linkedin.com/company/tech-futures-foundation",
    twitter: "https://twitter.com/techfutures",
    facebook: "https://facebook.com/techfuturesfoundation"
  },
  contact: {
    primaryEmail: "contact@techfuturesfoundation.org",
    alternateEmail: "grants@techfuturesfoundation.org",
    phone: "+1 (555) 123-4567",
    address: {
      street: "123 Innovation Drive",
      city: "San Francisco",
      state: "CA",
      zipCode: "94105",
      country: "United States"
    }
  },
  industry: "Technology & Education",
  preferences: {
    emailNotifications: true,
    applicationAlerts: true,
    monthlyReports: true,
    newsletter: true,
    language: "English",
    timezone: "America/Los_Angeles"
  },
  documents: {
    registrationCertificate: "registration-cert-2025.pdf",
    taxDocument: "tax-exempt-2025.pdf",
    otherDocuments: ["annual-report-2024.pdf", "impact-statement.pdf"]
  },
  stats: {
    totalOffersCreated: 15,
    totalScholarshipsCreated: 8,
    totalBeneficiaries: 45,
    totalDisbursed: 275000,
    memberSince: "2025-01-15"
  }
};
