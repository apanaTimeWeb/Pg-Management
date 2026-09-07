// DATA FLOW: [AI_TODO: Document data flow direction for ManagerUseManagerCheckinData.ts]
// [DATA HOOK] ManagerUseManagerCheckinData
// Responsibility: Provides wizard step-dependent data (vacant beds, compatibility score, enquiry prefill).
// Data Flow: step + selectedPropertyId + formData → api.managerCheckin → local state → ManagerCheckinMain

import { useState, useEffect } from 'react';

import { authApi as api } from '@/app/manager/manager_lib/manager_api/ManagerAuth';

export function ManagerUseManagerCheckinData(selectedPropertyId: string | null, step: number, enquiryId: string, formDataRoomBedId: string, compatibility: unknown) {
  const [vacantBeds, setVacantBeds] = useState<any[]>([]);
  const [compatibilityScore, setCompatibilityScore] = useState<number | null>(null);
  const [enquiryData, setEnquiryData] = useState<any>(null);

  // Fetch enquiry data only once when enquiryId and property are both available.
  useEffect(() => {
    if (enquiryId && selectedPropertyId) {
// @ts-expect-error
      const enq = api.managerEnquiries.getById(enquiryId);
      if (enq && enq.propertyId === selectedPropertyId) {
        setEnquiryData(enq);
      }
    }
  }, [enquiryId, selectedPropertyId]);

  // Fetch vacant beds only at step 4 (room selection step).
  useEffect(() => {
    if (step === 4 && selectedPropertyId) {
// @ts-expect-error
      const beds = api.managerCheckin.getVacantBeds(selectedPropertyId);
      setVacantBeds(beds);
    }
  }, [step, selectedPropertyId]);

  // Calculate compatibility score only at step 5 when a bed has been selected.
  useEffect(() => {
    if (step === 5 && formDataRoomBedId) {
      const bed = vacantBeds.find(b => b.id === formDataRoomBedId);
      if (bed) {
// @ts-expect-error
        const score = api.managerCheckin.getCompatibilityScore(bed.roomId, null, compatibility);
        setCompatibilityScore(score);
      }
    }
  }, [step, formDataRoomBedId, compatibility, vacantBeds]);

  return { vacantBeds, compatibilityScore, enquiryData };
}
