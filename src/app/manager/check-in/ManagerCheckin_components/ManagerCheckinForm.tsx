import { ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';
import { ManagerCheckinFormSteps1to5 } from './ManagerCheckinFormSteps1to5';
import { ManagerCheckinFormSteps6to10 } from './ManagerCheckinFormSteps6to10';
import type { ManagerCheckinFormData } from '@/app/manager/check-in/ManagerCheckin_types/ManagerCheckin.types';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

interface Props {
  step: number;
  formData: ManagerCheckinFormData;
  setFormData: React.Dispatch<React.SetStateAction<ManagerCheckinFormData>>;
  errors: Record<string, string>;
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  vacantBeds: any[];
  compatibilityScore: number | null;
  router: AppRouterInstance;
  isSubmitting: boolean;
  handlePrev: () => void;
  handleNext: () => void;
  handleCommit: () => void;
}

export function ManagerCheckinForm({
  step, formData, setFormData, errors, setErrors, vacantBeds, compatibilityScore, router,
  isSubmitting, handlePrev, handleNext, handleCommit
}: Props) {
  return (
    <>
      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-xl,16px)] p-6 shadow-sm min-h-[400px]">
        <ManagerCheckinFormSteps1to5 
          step={step} 
          formData={formData} 
          setFormData={setFormData} 
          errors={errors} 
          setErrors={setErrors} 
          vacantBeds={vacantBeds} 
          compatibilityScore={compatibilityScore} 
        />
        <ManagerCheckinFormSteps6to10 
          step={step} 
          formData={formData} 
          setFormData={setFormData} 
          vacantBeds={vacantBeds} 
          router={router} 
        />
      </div>

      {step < 10 && (
        <div className="flex justify-between items-center pt-4 border-t border-[var(--border)] mt-6">
          <button 
            onClick={handlePrev}
            disabled={step === 1}
            className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors ${
              step === 1 ? 'opacity-50 cursor-not-allowed text-[var(--text-secondary)]' : 'bg-[var(--bg-input)] text-[var(--text-primary)] hover:bg-[var(--border)]'
            }`}
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          
          {step < 9 ? (
            <button 
              onClick={handleNext}
              disabled={(step === 4 && !formData.room.bedId) || (step === 7 && !formData.agreement.accepted)}
              className="px-6 py-2 bg-[var(--primary)] text-white rounded-lg font-medium hover:bg-[var(--primary-hover)] transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button 
              onClick={handleCommit}
              disabled={isSubmitting}
              className="px-8 py-2 bg-[var(--success)] text-white rounded-lg font-bold hover:bg-[var(--success-hover,green)] transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Committing...' : 'Complete Check-in'} <CheckCircle className="w-4 h-4" />
            </button>
          )}
        </div>
      )}
    </>
  );
}
