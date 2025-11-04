export interface WalletTransaction {
  id: number;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  status: 'pending' | 'completed' | 'failed';
  reference: string;
  metadata?: {
    disbursementId?: number;
    beneficiaryId?: number;
    offerId?: number;
    scholarshipId?: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Wallet {
  id: number;
  balance: number;
  currency: string;
  lastFunded: string;
  status: 'active' | 'frozen';
  transactions: WalletTransaction[];
}

export const mockWallet: Wallet = {
  id: 1,
  balance: 50000.00,
  currency: 'USD',
  lastFunded: '2025-09-10T15:30:00Z',
  status: 'active',
  transactions: [
    {
      id: 1,
      type: 'credit',
      amount: 25000.00,
      description: 'Wallet funding via bank transfer',
      status: 'completed',
      reference: 'WF-2025091001',
      createdAt: '2025-09-10T15:30:00Z',
      updatedAt: '2025-09-10T15:35:00Z'
    },
    {
      id: 2,
      type: 'debit',
      amount: 5000.00,
      description: 'Scholarship disbursement to John Smith',
      status: 'completed',
      reference: 'DS-2025091002',
      metadata: {
        disbursementId: 1,
        beneficiaryId: 101,
        scholarshipId: 3
      },
      createdAt: '2025-09-11T10:00:00Z',
      updatedAt: '2025-09-11T10:05:00Z'
    },
    {
      id: 3,
      type: 'credit',
      amount: 30000.00,
      description: 'Wallet funding via bank transfer',
      status: 'completed',
      reference: 'WF-2025091003',
      createdAt: '2025-09-12T14:20:00Z',
      updatedAt: '2025-09-12T14:25:00Z'
    }
  ]
};
