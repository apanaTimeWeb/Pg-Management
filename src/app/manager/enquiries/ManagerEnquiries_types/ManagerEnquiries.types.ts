import type { EnquiryStatus, Enquiry } from '@/app/manager/manager_lib/manager_api/managerEnquiries';
export interface EnquiryFormData {
  name: string;
  phone: string;
  email?: string;
  expectedMoveIn?: string;
  budget?: string;
  notes?: string;
}
export type EnquiriesTab = 'pipeline' | 'lost';
export interface ManagerEnquiriesState {
  enquiries: Enquiry[];
  loading: boolean;
  showAddModal: boolean;
  searchQuery: string;
  activeTab: EnquiriesTab;
  waMenuEnquiry: Enquiry | null;
  formData: EnquiryFormData;
  currentPage: number;
}