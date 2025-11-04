import { defineStore } from 'pinia';
import { mockWallet } from '../lib/data/mockWallet';
import type { Wallet, WalletTransaction } from '../lib/data/mockWallet';

interface WalletState {
  wallet: Wallet | null;
  loading: boolean;
  error: string | null;
}

export const useWalletStore = defineStore('wallet', {
  state: (): WalletState => ({
    wallet: null,
    loading: false,
    error: null,
  }),

  getters: {
    balance: (state) => state.wallet?.balance ?? 0,
    currency: (state) => state.wallet?.currency ?? 'USD',
    recentTransactions: (state) => state.wallet?.transactions.slice(0, 5) ?? [],
    allTransactions: (state) => state.wallet?.transactions ?? [],
  },

  actions: {
    async fetchWallet() {
      this.loading = true;
      try {
        // In a real app, this would be an API call
        this.wallet = mockWallet;
      } catch (error: any) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },

    async fundWallet(amount: number) {
      this.loading = true;
      try {
        if (!this.wallet) throw new Error('Wallet not initialized');
        
        // In a real app, this would initiate a payment flow
        const transaction: WalletTransaction = {
          id: Math.max(...this.wallet.transactions.map(t => t.id)) + 1,
          type: 'credit',
          amount: amount,
          description: 'Wallet funding via bank transfer',
          status: 'completed',
          reference: `WF-${Date.now()}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        this.wallet.transactions.unshift(transaction);
        this.wallet.balance += amount;
        this.wallet.lastFunded = new Date().toISOString();

        return transaction;
      } catch (error: any) {
        this.error = error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async transferToBeneficiary(amount: number, disbursementId: number, beneficiaryId: number, description: string, metadata: any) {
      this.loading = true;
      try {
        if (!this.wallet) throw new Error('Wallet not initialized');
        if (this.wallet.balance < amount) throw new Error('Insufficient funds');

        // In a real app, this would make an API call to transfer funds
        const transaction: WalletTransaction = {
          id: Math.max(...this.wallet.transactions.map(t => t.id)) + 1,
          type: 'debit',
          amount: amount,
          description: description,
          status: 'completed',
          reference: `DS-${Date.now()}`,
          metadata: {
            disbursementId,
            beneficiaryId,
            ...metadata
          },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        this.wallet.transactions.unshift(transaction);
        this.wallet.balance -= amount;

        return transaction;
      } catch (error: any) {
        this.error = error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    }
  }
});
