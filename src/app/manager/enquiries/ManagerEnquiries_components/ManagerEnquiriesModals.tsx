import { MessageCircle, Home, Tag } from 'lucide-react';
import { Enquiry } from '@/app/manager/lib/api/managerEnquiries';
import type { EnquiryFormData } from '@/app/manager/enquiries/ManagerEnquiries_types/ManagerEnquiries.types';

interface Props {
  waMenuEnquiry: Enquiry | null;
  setWaMenuEnquiry: (enq: Enquiry | null) => void;
  showAddModal: boolean;
  setShowAddModal: (show: boolean) => void;
  formData: EnquiryFormData;
  setFormData: (data: EnquiryFormData) => void;
  handleAdd: (e: React.FormEvent) => void;
  handleRoomAvailable: () => void;
  handleRentOffer: () => void;
}

export function ManagerEnquiriesModals({
  waMenuEnquiry, setWaMenuEnquiry, showAddModal, setShowAddModal,
  formData, setFormData, handleAdd, handleRoomAvailable, handleRentOffer
}: Props) {
  return (
    <>
      {/* WhatsApp Action Menu Modal */}
      {waMenuEnquiry && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-lg,12px)] w-full max-w-sm overflow-hidden shadow-2xl animate-in fade-in zoom-in-95">
            <div className="p-4 border-b border-[var(--border)] flex justify-between items-center bg-[rgba(99,102,241,0.02)]">
              <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-emerald-500" />
                WhatsApp Message
              </h2>
              <button onClick={() => setWaMenuEnquiry(null)} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                &times;
              </button>
            </div>
            <div className="p-4 space-y-3">
              <p className="text-sm text-[var(--text-secondary)] mb-2">Select a smart message to send to <span className="font-bold text-[var(--text-primary)]">{waMenuEnquiry.name}</span>:</p>
              
              <button 
                onClick={handleRoomAvailable}
                className="w-full flex items-start gap-3 p-3 bg-[var(--bg-input)] hover:bg-[var(--primary-bg)] border border-[var(--border)] hover:border-[var(--primary)] rounded-xl transition-all text-left group"
              >
                <div className="p-2 bg-[var(--bg-card)] rounded-lg group-hover:text-[var(--primary)] text-[var(--text-secondary)]">
                  <Home className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[var(--text-primary)]">Room Available</h4>
                  <p className="text-xs text-[var(--text-secondary)] mt-0.5 line-clamp-2">"Hello, a bed matching your requirements is now available..."</p>
                </div>
              </button>

              <button 
                onClick={handleRentOffer}
                className="w-full flex items-start gap-3 p-3 bg-[var(--bg-input)] hover:bg-[rgba(16,185,129,0.05)] border border-[var(--border)] hover:border-[var(--success)] rounded-xl transition-all text-left group"
              >
                <div className="p-2 bg-[var(--bg-card)] rounded-lg group-hover:text-[var(--success)] text-[var(--text-secondary)]">
                  <Tag className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[var(--text-primary)]">Rent Offer</h4>
                  <p className="text-xs text-[var(--text-secondary)] mt-0.5 line-clamp-2">"Hello, we are running a special discount offer..."</p>
                </div>
              </button>
            </div>
            <div className="p-4 border-t border-[var(--border)] bg-[var(--bg-input)]">
              <button onClick={() => setWaMenuEnquiry(null)} className="w-full px-4 py-2 bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-primary)] rounded-[var(--radius-md,8px)] text-sm font-medium hover:bg-[var(--border)] transition-colors">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add New Lead Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-lg,12px)] w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in-95">
            <div className="p-4 border-b border-[var(--border)] flex justify-between items-center bg-[rgba(99,102,241,0.02)]">
              <h2 className="text-lg font-bold text-[var(--text-primary)]">Add New Enquiry</h2>
              <button onClick={() => setShowAddModal(false)} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                &times;
              </button>
            </div>
            <form onSubmit={handleAdd} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto scrollbar-thin">
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Full Name *</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-[var(--bg-input)] border border-[var(--border)] rounded-[var(--radius-md,8px)] px-3 py-2 text-sm text-[var(--text-primary)] focus:border-[var(--primary)] outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">WhatsApp / Phone *</label>
                  <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-[var(--bg-input)] border border-[var(--border)] rounded-[var(--radius-md,8px)] px-3 py-2 text-sm text-[var(--text-primary)] focus:border-[var(--primary)] outline-none" placeholder="10 digit number" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Email Address</label>
                  <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-[var(--bg-input)] border border-[var(--border)] rounded-[var(--radius-md,8px)] px-3 py-2 text-sm text-[var(--text-primary)] focus:border-[var(--primary)] outline-none" placeholder="optional" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Move-in Date</label>
                  <input type="date" value={formData.expectedMoveIn} onChange={e => setFormData({...formData, expectedMoveIn: e.target.value})} className="w-full bg-[var(--bg-input)] border border-[var(--border)] rounded-[var(--radius-md,8px)] px-3 py-2 text-sm text-[var(--text-primary)] focus:border-[var(--primary)] outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Budget (₹)</label>
                  <input type="number" value={formData.budget} onChange={e => setFormData({...formData, budget: e.target.value})} className="w-full bg-[var(--bg-input)] border border-[var(--border)] rounded-[var(--radius-md,8px)] px-3 py-2 text-sm text-[var(--text-primary)] focus:border-[var(--primary)] outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1">Student Requirements</label>
                <textarea 
                  value={formData.notes} 
                  onChange={e => setFormData({...formData, notes: e.target.value})} 
                  className="w-full bg-[var(--bg-input)] border border-[var(--border)] rounded-[var(--radius-md,8px)] px-3 py-2 text-sm text-[var(--text-primary)] focus:border-[var(--primary)] outline-none resize-none h-24"
                  placeholder="e.g. Single room needed, location too far, budget issue..."
                ></textarea>
              </div>
              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 px-4 py-2 bg-[var(--bg-input)] text-[var(--text-primary)] rounded-[var(--radius-md,8px)] text-sm font-medium hover:bg-[var(--border)] transition-colors">Cancel</button>
                <button type="submit" className="flex-1 px-4 py-2 bg-[var(--primary)] text-white rounded-[var(--radius-md,8px)] text-sm font-medium hover:bg-[var(--primary-hover)] transition-colors">Save Lead</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
