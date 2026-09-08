// DATA FLOW: ManagerPropertyContext → api.managerEnquiries → local state → ManagerEnquiriesMain
// [DATA HOOK] useManagerEnquiries
// Responsibility: Manages enquiry Kanban board state, form state, and status transitions.
import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { toast } from 'sonner';

import { useManagerUrlPagination } from '@/app/manager/manager_components/manager_hooks/useManagerUrlPagination';
import { api } from '@/app/manager/manager_lib/manager_api/ManagerApi';
import { ManagerCheckInUrls } from '@/app/manager/check-in/ManagerCheckIn_url_config';

import type { Enquiry, EnquiryStatus } from '@/app/manager/manager_lib/manager_api/managerEnquiries';
import type { EnquiryFormData, EnquiriesTab } from '@/app/manager/enquiries/ManagerEnquiries_types/ManagerEnquiries.types';

export function useManagerEnquiries(selectedPropertyId: string | null, ctxLoading: boolean, userId: string | undefined) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);
  const [activeTab, setActiveTab] = useState<EnquiriesTab>((searchParams.get('tab') as EnquiriesTab) || 'pipeline');
  const [waMenuEnquiry, setWaMenuEnquiry] = useState<Enquiry | null>(null);
  const [lossPromptEnquiryId, setLossPromptEnquiryId] = useState<string | null>(null);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Sync to URL
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (debouncedSearch) params.set('q', debouncedSearch);
    else params.delete('q');
    
    if (activeTab !== 'pipeline') params.set('tab', activeTab);
    else params.delete('tab');
    
    router.replace(`${pathname}?${params.toString()}`);
  }, [debouncedSearch, activeTab, pathname, router, searchParams]);

  // Fetches enquiry list for the selected property.
  const loadData = useCallback(() => {
    if (ctxLoading || !selectedPropertyId) return;
    setLoading(true);
    const data = api.managerEnquiries.fetchEnquiries(selectedPropertyId);
    setEnquiries(data);
    setLoading(false);
  }, [ctxLoading, selectedPropertyId]);

  // Re-fetch enquiries when property changes or context loading completes.
  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleCreateEnquiry = (data: EnquiryFormData) => {
    if (!userId || !selectedPropertyId) return;
    api.managerEnquiries.createEnquiry({
      ...data,
      propertyId: selectedPropertyId,
      assignedManagerId: userId,
      budget: parseInt(data.budget || '0') || 0
    });
    setShowAddModal(false);
    loadData();
  };

  const handleStatusChange = (id: string, status: EnquiryStatus, lossReason?: string) => {
    if (!userId) return;
    if (status === 'lost' && !lossReason) {
      setLossPromptEnquiryId(id);
      return;
    }
    api.managerEnquiries.updateEnquiryStatus(id, status, userId, lossReason);
    setLossPromptEnquiryId(null);
    loadData();
  };

  const handleConvertToCheckin = (enquiryId: string) => {
    router.push(`${ManagerCheckInUrls.index}?enquiryId=${enquiryId}`);
  };

  const openWhatsAppMsg = (phone: string, text: string) => {
    const encoded = encodeURIComponent(text);
    const formattedPhone = phone.replace(/\D/g, '');
    const finalPhone = formattedPhone.length === 10 ? `91${formattedPhone}` : formattedPhone;
    window.open(`https://wa.me/${finalPhone}?text=${encoded}`, '_blank');
  };

  const handleRoomAvailable = () => {
    if (!waMenuEnquiry) return;
    const msg = `Hello ${waMenuEnquiry.name}, a bed matching your requirements is now available at our PG. Let us know if you are still looking to book!`;
    openWhatsAppMsg(waMenuEnquiry.phone, msg);
    setWaMenuEnquiry(null);
  };

  const handleRentOffer = () => {
    if (!waMenuEnquiry) return;
    const msg = `Hello ${waMenuEnquiry.name}, we are running a special discount offer on rent right now! Check out the attached image for details. Let us know if you're interested.`;
    toast.info("WhatsApp will now open. Please manually attach your Offer Image in the chat window!");
    openWhatsAppMsg(waMenuEnquiry.phone, msg);
    setWaMenuEnquiry(null);
  };

  // Pagination for Lost Enquiries
  const { currentPage, setCurrentPage } = useManagerUrlPagination(1);
  const itemsPerPage = 12;

  // Reset to page 1 whenever search query, property, or active tab changes to avoid empty pages.
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, selectedPropertyId, activeTab, setCurrentPage]);

  const filteredEnquiries = enquiries.filter(e => 
    e.name.toLowerCase().includes(debouncedSearch.toLowerCase()) || 
    e.phone.includes(debouncedSearch)
  );
  const activeEnquiries = filteredEnquiries.filter(e => e.status !== 'lost' && e.status !== 'converted');
  const lostEnquiries = filteredEnquiries.filter(e => e.status === 'lost');

  return {
    enquiries, loading, showAddModal, setShowAddModal, searchQuery, setSearchQuery,
    activeTab, setActiveTab, waMenuEnquiry, setWaMenuEnquiry,
    currentPage, setCurrentPage, itemsPerPage,
    activeEnquiries, lostEnquiries, lossPromptEnquiryId, setLossPromptEnquiryId,
    handleCreateEnquiry, handleStatusChange, handleConvertToCheckin, handleRoomAvailable, handleRentOffer
  };
}