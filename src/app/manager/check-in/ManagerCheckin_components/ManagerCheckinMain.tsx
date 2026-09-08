// RESPONSIBILITY: Renders the ManagerCheckinMain component.
'use client';
import { useSearchParams } from 'next/navigation';
import { Lock } from 'lucide-react';

import { useManagerSession } from '@/app/manager/manager_components/manager_hooks/useManagerSession';
import { useManagerPropertyContext } from '@/app/manager/manager_components/ManagerPropertyContext';
import { useManagerCheckinData } from '@/app/manager/check-in/ManagerCheckin_hooks/useManagerCheckinData';
import { useManagerCheckinForm } from '@/app/manager/check-in/ManagerCheckin_hooks/useManagerCheckinForm';
import { ManagerCheckinProgress } from '@/app/manager/check-in/ManagerCheckin_components/ManagerCheckinProgress';
import { ManagerCheckinForm } from '@/app/manager/check-in/ManagerCheckin_components/ManagerCheckinForm';
export function ManagerCheckinMain() {
  const searchParams = useSearchParams();
  const enquiryId = searchParams?.get('enquiryId') || '';
  const user = useManagerSession();
  const { selectedPropertyId, loading: ctxLoading } = useManagerPropertyContext();
  const { 
    step, setStep, formData, setFormData, errors, setErrors, isSubmitting, 
    handleNext, handlePrev, handleCommit, router 
  } = useManagerCheckinForm(enquiryId, null, selectedPropertyId, user?.id);
  const { vacantBeds, compatibilityScore, enquiryData } = useManagerCheckinData(    selectedPropertyId, step, enquiryId, formData.room.bedId, formData.compatibility
  );
  // Sync initial enquiry data if fetched
  if (enquiryData && formData.personal.name === '') {
    setFormData(prev => ({
      ...prev,
      personal: { ...prev.personal, name: (enquiryData as any).name, phone: (enquiryData as any).phone, email: (enquiryData as any).email || '' },
      deposit: { ...prev.deposit, rentAmount: (enquiryData as any).budget ? (enquiryData as any).budget.toString() : '' }
    }));
  }

  if (ctxLoading) return <div className="p-6 text-secondary">Loading wizard...</div>;
  if (!selectedPropertyId) {

    return (
      <div className="h-[80vh] flex flex-col items-center justify-center text-center max-w-md mx-auto">
        <div className="w-20 h-20 rounded-full bg-card flex items-center justify-center mb-6 border border">
          <Lock className="w-10 h-10 text-secondary" />
        </div>
        <h2 className="text-2xl font-bold text-primary mb-2">Property Required</h2>
        <p className="text-secondary">Please assign or select a property before performing a check-in.</p>
      </div>
    );
  }
  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20">
      <div className="mb-8">
        <h1 className="text-[24px] font-bold text-primary">Check-in Wizard</h1>
        <p className="text-sm text-secondary mt-1">Onboard a new student to your property.</p>
      </div>
      <ManagerCheckinProgress step={step} />
      <ManagerCheckinForm 
        step={step}
        formData={formData}
        setFormData={setFormData}
        errors={errors}
        setErrors={setErrors}
        vacantBeds={vacantBeds}
        compatibilityScore={compatibilityScore}
        router={router}
        isSubmitting={isSubmitting}
        handlePrev={handlePrev}
        handleNext={handleNext}
        handleCommit={handleCommit}
      />
    </div>
  );
}