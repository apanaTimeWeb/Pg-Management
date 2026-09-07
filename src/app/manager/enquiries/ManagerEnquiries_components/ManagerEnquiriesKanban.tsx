// RESPONSIBILITY: Renders the ManagerEnquiriesKanban component.
import { Phone, IndianRupee, MessageCircle, Mail, UserPlus } from 'lucide-react';
import { Enquiry, EnquiryStatus } from '@/app/manager/manager_lib/manager_api/managerEnquiries';

interface Props {
  activeEnquiries: Enquiry[];
  columns: { id: EnquiryStatus, label: string }[];
  setWaMenuEnquiry: (enq: Enquiry) => void;
  handleStatusChange: (id: string, status: EnquiryStatus) => void;
  handleConvertToCheckin: (enquiryId: string) => void;
}

export function ManagerEnquiriesKanban({ activeEnquiries, columns, setWaMenuEnquiry, handleStatusChange, handleConvertToCheckin }: Props) {
  const renderCardContactActions = (enq: Enquiry) => (
    <div className="flex items-center gap-2 mt-2 pt-2 border-t border-[var(--border)]">
      <button 
        onClick={() => setWaMenuEnquiry(enq)}
        className="flex-1 flex items-center justify-center gap-1.5 py-1.5 bg-emerald-500/10 text-emerald-600 rounded border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors text-xs font-bold"
      >
        <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
      </button>
      {enq.email && (
        <a 
          href={`mailto:${enq.email}`}
          className="flex-1 flex items-center justify-center gap-1.5 py-1.5 bg-[var(--primary-bg)] text-[var(--primary)] rounded border border-[var(--primary)]/20 hover:bg-[var(--primary)]/10 transition-colors text-xs font-bold"
        >
          <Mail className="w-3.5 h-3.5" /> Email
        </a>
      )}
    </div>
  );

  return (
    <div className="flex-1 overflow-x-auto pb-4">
      <div className="flex gap-4 h-full min-w-max">
        {columns.map(col => {
          const columnEnquiries = activeEnquiries.filter(e => e.status === col.id);
          return (
            <div key={col.id} className="w-80 flex flex-col bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-lg,12px)] shrink-0 max-h-full">
              <div className="p-4 border-b border-[var(--border)] bg-[rgba(99,102,241,0.02)] flex items-center justify-between shrink-0">
                <h3 className="font-semibold text-[var(--text-primary)]">{col.label}</h3>
                <span className="bg-[var(--bg-input)] text-[var(--text-secondary)] text-xs font-bold px-2 py-0.5 rounded-full">
                  {columnEnquiries.length}
                </span>
              </div>
              
              <div className="p-3 flex-1 overflow-y-auto space-y-3 scrollbar-thin scrollbar-thumb-[var(--border)]">
                {columnEnquiries.map(enq => (
                  <div key={enq.id} className="bg-[var(--bg-page)] border border-[var(--border)] p-4 rounded-xl shadow-sm hover:border-[var(--primary-subtle)] transition-all group flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-[var(--text-primary)] truncate pr-2">{enq.name}</h4>
                    </div>
                    
                    {enq.referredByStudentId && (
                      <div className="mb-2 inline-block px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full border border-emerald-200">
                        🎁 Referred by Student
                      </div>
                    )}

                    <div className="space-y-2 mb-3">
                      <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                        <Phone className="w-3.5 h-3.5" />
                        <span>{enq.phone}</span>
                      </div>
                      {(enq.budget || 0) > 0 && (
                        <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                          <IndianRupee className="w-3.5 h-3.5" />
                          <span>₹{(enq.budget || 0).toLocaleString()}</span>
                        </div>
                      )}
                    </div>

                    {enq.notes && (
                      <div className="bg-[rgba(245,158,11,0.05)] border border-[rgba(245,158,11,0.2)] p-2 rounded text-xs mb-3">
                        <span className="font-semibold text-[var(--warning)] block mb-0.5">Requirements:</span>
                        <span className="text-[var(--text-secondary)] leading-relaxed">{enq.notes}</span>
                      </div>
                    )}

                    {renderCardContactActions(enq)}

                    <div className="flex items-center gap-2 pt-3 mt-auto">
                      <select 
                        value={enq.status}
                        onChange={(e) => handleStatusChange(enq.id, e.target.value as EnquiryStatus)}
                        className="flex-1 bg-[var(--bg-input)] border border-[var(--border)] rounded px-2 py-1.5 text-xs text-[var(--text-primary)] focus:outline-none focus:border-[var(--primary)]"
                      >
                        {columns.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                        <option value="lost" className="text-[var(--danger)]">Mark as Lost</option>
                      </select>
                      <button 
                        onClick={() => handleConvertToCheckin(enq.id)}
                        title="Convert to Check-in"
                        className="p-1.5 bg-[var(--success-bg)] text-[var(--success)] rounded border border-[var(--success)] hover:bg-green-900 transition-colors shrink-0"
                      >
                        <UserPlus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
                {columnEnquiries.length === 0 && (
                  <div className="text-center text-xs text-[var(--text-secondary)] py-8 border-2 border-dashed border-[var(--border)] rounded-xl">
                    No leads
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
