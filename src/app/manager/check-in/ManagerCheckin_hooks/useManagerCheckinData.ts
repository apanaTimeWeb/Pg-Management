// [DATA HOOK] useManagerCheckinData
// Responsibility: Provides wizard step-dependent data (vacant beds, compatibility score, enquiry prefill).
// Data Flow: step + selectedPropertyId + formData → api.managerCheckin → local state → ManagerCheckinMain

import { useState, useEffect } from 'react';
import { api } from '@/lib/api';

export function useManagerCheckinData(selectedPropertyId: string | null, step: number, enquiryId: string, formDataRoomBedId: string, compatibility: any) {
  const [vacantBeds, setVacantBeds] = useState<any[]>([]);
  const [compatibilityScore, setCompatibilityScore] = useState<number | null>(null);
  const [enquiryData, setEnquiryData] = useState<any>(null);

  // Fetch enquiry data only once when enquiryId and property are both available.
  useEffect(() => {
    if (enquiryId && selectedPropertyId) {
      const enq = api.managerEnquiries.getById(enquiryId);
      if (enq && enq.propertyId === selectedPropertyId) {
        setEnquiryData(enq);
      }
    }
  }, [enquiryId, selectedPropertyId]);

  // Fetch vacant beds only at step 4 (room selection step).
  useEffect(() => {
    if (step === 4 && selectedPropertyId) {
      const beds = api.managerCheckin.getVacantBeds(selectedPropertyId);
      setVacantBeds(beds);
    }
  }, [step, selectedPropertyId]);

  // Calculate compatibility score only at step 5 when a bed has been selected.
  useEffect(() => {
    if (step === 5 && formDataRoomBedId) {
      const bed = vacantBeds.find(b => b.id === formDataRoomBedId);
      if (bed) {
        const score = api.managerCheckin.getCompatibilityScore(bed.roomId, null, compatibility);
        setCompatibilityScore(score);
      }
    }
  }, [step, formDataRoomBedId, compatibility, vacantBeds]);

  return { vacantBeds, compatibilityScore, enquiryData };
}
