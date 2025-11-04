import { defineStore } from 'pinia';
import { mockSponsorProfile } from '../lib/data/mockSponsorProfile';
import type { SponsorProfile } from '../lib/data/mockSponsorProfile';

interface ProfileState {
  profile: SponsorProfile | null;
  loading: boolean;
  error: string | null;
  saving: boolean;
}

export const useSponsorProfileStore = defineStore('sponsorProfile', {
  state: (): ProfileState => ({
    profile: null,
    loading: false,
    error: null,
    saving: false
  }),

  getters: {
    organizationName: (state) => state.profile?.organizationName,
    logo: (state) => state.profile?.logo,
    stats: (state) => state.profile?.stats
  },

  actions: {
    async fetchProfile() {
      this.loading = true;
      try {
        // In a real app, this would be an API call
        this.profile = mockSponsorProfile;
      } catch (error: any) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },

    async updateProfile(updates: Partial<SponsorProfile>) {
      this.saving = true;
      try {
        // In a real app, this would be an API call
        if (!this.profile) throw new Error('Profile not loaded');
        
        this.profile = {
          ...this.profile,
          ...updates,
          updatedAt: new Date().toISOString()
        };

        return this.profile;
      } catch (error: any) {
        this.error = error.message;
        throw error;
      } finally {
        this.saving = false;
      }
    },

    async uploadDocument(type: 'logo' | 'registrationCertificate' | 'taxDocument' | 'other', file: File) {
      this.saving = true;
      try {
        // In a real app, this would upload to a storage service
        const fileName = `${type}-${Date.now()}-${file.name}`;
        
        if (!this.profile) throw new Error('Profile not loaded');

        if (type === 'logo') {
          this.profile.logo = fileName;
        } else if (type === 'other') {
          if (!this.profile.documents) {
            this.profile.documents = {};
          }
          if (!this.profile.documents.otherDocuments) {
            this.profile.documents.otherDocuments = [];
          }
          this.profile.documents.otherDocuments.push(fileName);
        } else {
          if (!this.profile.documents) {
            this.profile.documents = {};
          }
          this.profile.documents[type] = fileName;
        }

        return fileName;
      } catch (error: any) {
        this.error = error.message;
        throw error;
      } finally {
        this.saving = false;
      }
    },

    async deleteDocument(type: 'registrationCertificate' | 'taxDocument', fileName: string) {
      this.saving = true;
      try {
        // In a real app, this would delete from storage service
        if (!this.profile?.documents) throw new Error('No documents found');
        
        if (type === 'registrationCertificate') {
          this.profile.documents.registrationCertificate = undefined;
        } else if (type === 'taxDocument') {
          this.profile.documents.taxDocument = undefined;
        }
      } catch (error: any) {
        this.error = error.message;
        throw error;
      } finally {
        this.saving = false;
      }
    },

    async deleteOtherDocument(fileName: string) {
      this.saving = true;
      try {
        // In a real app, this would delete from storage service
        if (!this.profile?.documents?.otherDocuments) throw new Error('No documents found');
        
        this.profile.documents.otherDocuments = this.profile.documents.otherDocuments.filter(
          name => name !== fileName
        );
      } catch (error: any) {
        this.error = error.message;
        throw error;
      } finally {
        this.saving = false;
      }
    }
  }
});
