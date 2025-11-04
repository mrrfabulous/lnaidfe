import { defineStore } from 'pinia';
import { mockDisbursements } from '../lib/data/mockDisbursements';
import type { Disbursement } from '../lib/data/mockDisbursements';

interface DisbursementsState {
  disbursements: Disbursement[];
  loading: boolean;
  error: string | null;
}

export const useDisbursementsStore = defineStore('disbursements', {
  state: (): DisbursementsState => ({
    disbursements: [],
    loading: false,
    error: null,
  }),

  getters: {
    getDisbursementsByOfferId: (state) => (offerId: number) => {
      return state.disbursements.filter(d => d.offerId === offerId);
    },
    getDisbursementsByScholarshipId: (state) => (scholarshipId: number) => {
      return state.disbursements.filter(d => d.scholarshipId === scholarshipId);
    },
    getDisbursementsByBeneficiary: (state) => (beneficiaryId: number) => {
      return state.disbursements.filter(d => d.beneficiaryId === beneficiaryId);
    },
    getPendingDisbursements: (state) => {
      return state.disbursements.filter(d => d.status === 'pending');
    }
  },

  actions: {
    async fetchDisbursements() {
      this.loading = true;
      try {
        // In a real app, this would be an API call
        this.disbursements = mockDisbursements;
      } catch (error: any) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },

    async createDisbursement(disbursement: Omit<Disbursement, 'id' | 'createdAt' | 'updatedAt'>) {
      this.loading = true;
      try {
        // In a real app, this would be an API call
        const newDisbursement: Disbursement = {
          ...disbursement,
          id: Math.max(...this.disbursements.map(d => d.id)) + 1,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        this.disbursements.push(newDisbursement);
        return newDisbursement;
      } catch (error: any) {
        this.error = error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async updateDisbursement(id: number, update: Partial<Disbursement>) {
      this.loading = true;
      try {
        // In a real app, this would be an API call
        const index = this.disbursements.findIndex(d => d.id === id);
        if (index === -1) throw new Error('Disbursement not found');
        
        this.disbursements[index] = {
          ...this.disbursements[index],
          ...update,
          updatedAt: new Date().toISOString()
        };
        return this.disbursements[index];
      } catch (error: any) {
        this.error = error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async deleteDisbursement(id: number) {
      this.loading = true;
      try {
        // In a real app, this would be an API call
        const index = this.disbursements.findIndex(d => d.id === id);
        if (index === -1) throw new Error('Disbursement not found');
        this.disbursements.splice(index, 1);
      } catch (error: any) {
        this.error = error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    }
  }
});
