import { EnquiryStatus } from '@/app/manager/lib/api/managerEnquiries';

export interface EnquiryFormData {
  name: string;
  phone: string;
  email: string;
  expectedMoveIn: string;
  budget: string;
  notes: string;
}

export type EnquiriesTab = 'pipeline' | 'lost';

export interface ManagerEnquiriesState {
  enquiries: any[];
  loading: boolean;
  showAddModal: boolean;
  searchQuery: string;
  activeTab: EnquiriesTab;
  waMenuEnquiry: any | null;
  formData: EnquiryFormData;
  currentPage: number;
}
