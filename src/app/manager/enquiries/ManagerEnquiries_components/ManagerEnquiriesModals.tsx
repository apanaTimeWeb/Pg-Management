// RESPONSIBILITY: Renders the ManagerEnquiriesModals component.
import { MessageCircle, Home, Tag } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect } from 'react';

import type { Enquiry, EnquiryStatus } from '@/app/manager/manager_lib/manager_api/managerEnquiries';
import type { EnquiryFormData } from '@/app/manager/enquiries/ManagerEnquiries_types/ManagerEnquiries.types';

const enquirySchema = z.object({
  name: z.string().min(2, 'Name is required'),
  phone: z.string().min(10, 'Valid phone is required').max(15),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  expectedMoveIn: z.string().optional(),
  budget: z.string().optional(),
  notes: z.string().optional()
});

interface ManagerEnquiriesModalsProps {
  waMenuEnquiry: Enquiry | null;
  setWaMenuEnquiry: (enq: Enquiry | null) => void;
  showAddModal: boolean;
  setShowAddModal: (show: boolean) => void;
  handleCreateEnquiry: (data: EnquiryFormData) => void;
  handleRoomAvailable: () => void;
  handleRentOffer: () => void;
  lossPromptEnquiryId: string | null;
  setLossPromptEnquiryId: (id: string | null) => void;
  handleStatusChange: (id: string, status: EnquiryStatus, lossReason?: string) => void;
}

export function ManagerEnquiriesModals({
  waMenuEnquiry, setWaMenuEnquiry, showAddModal, setShowAddModal,
  handleCreateEnquiry, handleRoomAvailable, handleRentOffer,
  lossPromptEnquiryId, setLossPromptEnquiryId, handleStatusChange
}: ManagerEnquiriesModalsProps) {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<EnquiryFormData>({
    resolver: zodResolver(enquirySchema),
    defaultValues: { name: '', phone: '', email: '', expectedMoveIn: '', budget: '', notes: '' }
  });

  useEffect(() => {
    if (showAddModal) {
      reset();
    }
  }, [showAddModal, reset]);

  const onSubmit = (data: EnquiryFormData) => {
    handleCreateEnquiry(data);
  };

  return (
    <>
      {/* Loss Reason Modal */}
      {lossPromptEnquiryId && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-[var(--radius-lg,12px)] w-full max-w-sm overflow-hidden shadow-2xl animate-in fade-in zoom-in-95">
            <div className="p-4 border-b border-border flex justify-between items-center bg-[rgba(99,102,241,0.02)]">
              <h2 className="text-lg font-bold text-primary flex items-center gap-2">
                Mark as Lost
              </h2>
              <button onClick={() => setLossPromptEnquiryId(null)} className="text-secondary hover:text-primary">
                &times;
              </button>
            </div>
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                const reason = fd.get('reason') as string;
                if (reason.trim()) {
                  handleStatusChange(lossPromptEnquiryId, 'lost', reason.trim());
                }
              }}
              className="p-4 space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-secondary mb-1">Reason for loss *</label>
                <input 
                  autoFocus
                  required 
                  name="reason"
                  placeholder="e.g. Budget, No Beds, Location" 
                  className="w-full bg-input border border-border rounded-[var(--radius-md,8px)] px-3 py-2 text-sm text-primary focus:border-primary outline-none" 
                />
              </div>
              <div className="flex gap-3">
                <button type="button" onClick={() => setLossPromptEnquiryId(null)} className="flex-1 px-4 py-2 bg-input text-primary rounded-[var(--radius-md,8px)] text-sm font-medium hover:bg-border motion-safe:transition-colors">
                  Cancel
                </button>
                <button type="submit" className="flex-1 px-4 py-2 bg-danger text-white rounded-[var(--radius-md,8px)] text-sm font-medium hover:bg-red-600 motion-safe:transition-colors">
                  Confirm Loss
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* WhatsApp Action Menu Modal */}
      {waMenuEnquiry && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-[var(--radius-lg,12px)] w-full max-w-sm overflow-hidden shadow-2xl animate-in fade-in zoom-in-95">
            <div className="p-4 border-b border-border flex justify-between items-center bg-[rgba(99,102,241,0.02)]">
              <h2 className="text-lg font-bold text-primary flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-[#25D366]" />
                WhatsApp Message
              </h2>
              <button onClick={() => setWaMenuEnquiry(null)} className="text-secondary hover:text-primary">
                &times;
              </button>
            </div>
            <div className="p-4 space-y-3">
              <p className="text-sm text-secondary mb-2">Select a smart message to send to <span className="font-bold text-primary">{waMenuEnquiry.name}</span>:</p>
              <button 
                onClick={handleRoomAvailable}
                className="w-full flex items-start gap-3 p-3 bg-input hover:bg-primary-bg border border-border hover:border-primary rounded-xl motion-safe:transition-all text-left group"
              >
                <div className="p-2 bg-card rounded-lg group-hover:text-primary text-secondary">
                  <Home className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-primary">Room Available</h4>
                  <p className="text-xs text-secondary mt-0.5 line-clamp-2">"Hello, a bed matching your requirements is now available..."</p>
                </div>
              </button>
              <button 
                onClick={handleRentOffer}
                className="w-full flex items-start gap-3 p-3 bg-input hover:bg-[rgba(16,185,129,0.05)] border border-border hover:border-success rounded-xl motion-safe:transition-all text-left group"
              >
                <div className="p-2 bg-card rounded-lg group-hover:text-success text-secondary">
                  <Tag className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-primary">Rent Offer</h4>
                  <p className="text-xs text-secondary mt-0.5 line-clamp-2">"Hello, we are running a special discount offer..."</p>
                </div>
              </button>
            </div>
            <div className="p-4 border-t border-border bg-input">
              <button onClick={() => setWaMenuEnquiry(null)} className="w-full px-4 py-2 bg-card border border-border text-primary rounded-[var(--radius-md,8px)] text-sm font-medium hover:bg-border motion-safe:transition-colors">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Add New Lead Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-[var(--radius-lg,12px)] w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in-95">
            <div className="p-4 border-b border-border flex justify-between items-center bg-[rgba(99,102,241,0.02)]">
              <h2 className="text-lg font-bold text-primary">Add New Enquiry</h2>
              <button onClick={() => setShowAddModal(false)} className="text-secondary hover:text-primary">
                &times;
              </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto scrollbar-thin">
              <div>
                <label className="block text-sm font-medium text-secondary mb-1">Full Name *</label>
                <input {...register('name')} className="w-full bg-input border border-border rounded-[var(--radius-md,8px)] px-3 py-2 text-sm text-primary focus:border-primary outline-none" />
                {errors.name && <p className="text-danger text-xs mt-1">{errors.name.message}</p>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-secondary mb-1">WhatsApp / Phone *</label>
                  <input {...register('phone')} type="tel" className="w-full bg-input border border-border rounded-[var(--radius-md,8px)] px-3 py-2 text-sm text-primary focus:border-primary outline-none" placeholder="10 digit number" />
                  {errors.phone && <p className="text-danger text-xs mt-1">{errors.phone.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary mb-1">Email Address</label>
                  <input {...register('email')} type="email" className="w-full bg-input border border-border rounded-[var(--radius-md,8px)] px-3 py-2 text-sm text-primary focus:border-primary outline-none" placeholder="optional" />
                  {errors.email && <p className="text-danger text-xs mt-1">{errors.email.message}</p>}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-secondary mb-1">Move-in Date</label>
                  <input {...register('expectedMoveIn')} type="date" className="w-full bg-input border border-border rounded-[var(--radius-md,8px)] px-3 py-2 text-sm text-primary focus:border-primary outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-secondary mb-1">Budget (₹)</label>
                  <input {...register('budget')} type="number" min="0" className="w-full bg-input border border-border rounded-[var(--radius-md,8px)] px-3 py-2 text-sm text-primary focus:border-primary outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary mb-1">Student Requirements</label>
                <textarea 
                  {...register('notes')} 
                  className="w-full bg-input border border-border rounded-[var(--radius-md,8px)] px-3 py-2 text-sm text-primary focus:border-primary outline-none resize-none h-24"
                  placeholder="e.g. Single room needed, location too far, budget issue..."
                ></textarea>
              </div>
              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 px-4 py-2 bg-input text-primary rounded-[var(--radius-md,8px)] text-sm font-medium hover:bg-border motion-safe:transition-colors">Cancel</button>
                <button disabled={isSubmitting} type="submit" className="flex-1 px-4 py-2 bg-primary text-white rounded-[var(--radius-md,8px)] text-sm font-medium hover:bg-primary-hover disabled:opacity-50 motion-safe:transition-colors">
                  {isSubmitting ? 'Saving...' : 'Save Lead'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}