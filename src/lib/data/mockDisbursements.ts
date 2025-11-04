export interface Disbursement {
  id: number;
  beneficiaryId: number;
  beneficiaryName: string;
  offerId?: number;
  offerTitle?: string;
  scholarshipId?: number;
  scholarshipTitle?: string;
  amount?: number;
  disbursementType: 'monetary' | 'non-monetary';
  description: string;
  status: 'pending' | 'completed' | 'cancelled';
  disbursementDate: string;
  proofOfDisbursement?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export const mockDisbursements: Disbursement[] = [
  {
    id: 1,
    beneficiaryId: 101,
    beneficiaryName: "John Smith",
    offerId: 1,
    offerTitle: "Summer Internship Grant",
    amount: 5000,
    disbursementType: "monetary",
    description: "First installment of internship grant",
    status: "completed",
    disbursementDate: "2025-06-15",
    proofOfDisbursement: "transfer-receipt-123.pdf",
    notes: "Transferred via bank wire",
    createdAt: "2025-06-15T10:00:00Z",
    updatedAt: "2025-06-15T10:30:00Z"
  },
  {
    id: 2,
    beneficiaryId: 102,
    beneficiaryName: "Sarah Johnson",
    scholarshipId: 3,
    scholarshipTitle: "Tech Leaders Scholarship",
    amount: 10000,
    disbursementType: "monetary",
    description: "Full scholarship payment",
    status: "pending",
    disbursementDate: "2025-09-20",
    notes: "Awaiting final documentation",
    createdAt: "2025-09-14T15:00:00Z",
    updatedAt: "2025-09-14T15:00:00Z"
  },
  {
    id: 3,
    beneficiaryId: 103,
    beneficiaryName: "Maria Garcia",
    offerId: 5,
    offerTitle: "Professional Mentorship Program",
    disbursementType: "non-monetary",
    description: "Monthly mentorship session completed",
    status: "completed",
    disbursementDate: "2025-09-10",
    proofOfDisbursement: "session-report-sep.pdf",
    notes: "2-hour session covering career development",
    createdAt: "2025-09-10T14:00:00Z",
    updatedAt: "2025-09-10T16:30:00Z"
  }
];
