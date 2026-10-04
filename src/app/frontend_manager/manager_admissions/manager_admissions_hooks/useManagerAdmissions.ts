import { useState, useEffect, useCallback } from 'react';
import { api } from '@/app/frontend_manager/manager_lib/manager_api/ManagerApi';
import type { EnquiryStatus, Enquiry } from '@/app/frontend_manager/manager_lib/manager_api/managerEnquiries';

export type AdmissionStage = 'Enquiry' | 'Application' | 'Verification' | 'Approved' | 'Waiting List' | 'Rejected';

export interface AdmissionCandidate {
  id: string;
  name: string;
  mobile: string;
  email: string;
  date: string;
  preferredRoomType: string;
  stage: AdmissionStage;
  documentsStatus: 'Pending' | 'Uploaded' | 'Verified';
  assignedRoom?: string;
  assignedBed?: string;
  ownerApprovalRequired?: boolean;
}

export function useManagerAdmissions(selectedPropertyId: string | null, ctxLoading: boolean) {
  const [candidates, setCandidates] = useState<AdmissionCandidate[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAdmissions = useCallback(() => {
    if (ctxLoading) return;
    if (!selectedPropertyId) {
      setCandidates([]);
      setLoading(false);
      return;
    }
    
    setLoading(true);
    try {
      const enquiries = api.enquiries.listByProperty(selectedPropertyId);
      
      const mapped: AdmissionCandidate[] = enquiries.map((enq) => {
        let stage: AdmissionStage = 'Enquiry';
        if (enq.status === 'contacted' || enq.status === 'interested') stage = 'Application';
        else if (enq.status === 'visited') stage = 'Verification';
        else if (enq.status === 'booked' || enq.status === 'converted') stage = 'Approved';
        else if (enq.status === 'lost') stage = 'Rejected';

        return {
          id: enq.id,
          name: enq.name,
          mobile: enq.phone || 'N/A',
          email: enq.email || 'N/A',
          date: new Date(enq.createdAt).toLocaleDateString(),
          preferredRoomType: 'Unknown',
          stage: stage,
          documentsStatus: stage === 'Approved' ? 'Verified' : 'Pending',
        };
      });
      setCandidates(mapped);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }, [ctxLoading, selectedPropertyId]);

  useEffect(() => {
    fetchAdmissions();
  }, [fetchAdmissions]);

  return { candidates, loading, fetchAdmissions };
}
