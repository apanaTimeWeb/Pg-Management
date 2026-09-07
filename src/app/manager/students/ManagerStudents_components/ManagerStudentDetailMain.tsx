// RESPONSIBILITY: Renders the ManagerStudentDetailMain component.
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, User, MapPin, Calendar, IndianRupee, LogOut, Utensils, Clock } from 'lucide-react';
import Link from 'next/link';

import { authApi as api } from '@/app/manager/manager_lib/manager_api/ManagerAuth';
import { getSession } from '@/app/manager/manager_lib/manager_auth/ManagerSession';
import { studentOperationsApi } from '@/app/student/student_lib/student_api/StudentOperations';
import { ManagerBillUploadModal } from '@/app/manager/students/ManagerStudents_components/ManagerBillUploadModal';
import { financeApi } from '@/app/owner/owner_lib/owner_api/OwnerFinance';

export default function ManagerStudentDetailMain() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const user = typeof window !== 'undefined' ? getSession() : null;
  const [student, setStudent] = useState<any>(null);
  const [invoices, setInvoices] = useState<any[]>([]);
  
  // Bill upload state
  const [isBillModalOpen, setIsBillModalOpen] = useState(false);
  const [selectedInvoiceForBill, setSelectedInvoiceForBill] = useState<any>(null);

  const loadData = () => {
    if (id) {
// @ts-expect-error
      const t = (api as any).students.getById ? (api as any).students.getById(id) : (api as any).students.listByProperty('all').find((t: unknown) => t.profile.id === id || t.user.id === id);
      setStudent(t);
      if (t) {
        if (t.user) {
          setInvoices(studentOperationsApi.getInvoices(t.user.id));
        }
      }
    }
  };

  useEffect(() => {
    loadData();
  }, [id]);

  const handleCheckout = () => {
    if (confirm('Are you sure you want to checkout this student? This will revoke their access and free their bed.')) {
      (api as any).students.checkoutStudent(student.profile.id, user?.id || '');
      router.push('/manager/students');
    }
  };

  const handleSaveElectricityBill = (amount: number, imageUrl: string) => {
    if (selectedInvoiceForBill && user) {
      financeApi.updateElectricityBill(selectedInvoiceForBill.id, amount, imageUrl, user.id);
      loadData(); // Reload invoices
    }
  };

  if (!student) return <div className="p-6 text-secondary">Loading...</div>;

  return (
    <div className="space-y-6 pb-20 max-w-4xl mx-auto">
      <ManagerBillUploadModal
        isOpen={isBillModalOpen}
        onClose={() => {
          setIsBillModalOpen(false);
          setSelectedInvoiceForBill(null);
        }}
        onSubmit={handleSaveElectricityBill}
        invoiceTitle={selectedInvoiceForBill?.month || 'Invoice'}
      />
      <Link href="/manager/students" className="inline-flex items-center gap-2 text-secondary hover:text-primary text-sm font-medium motion-safe:transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Students
      </Link>

      <div className="bg-card border border rounded-[var(--radius-xl,16px)] overflow-hidden shadow-sm">
        <div className="p-8 bg-[rgba(99,102,241,0.02)] border-b border flex items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-primary-subtle border-2 border-primary flex items-center justify-center text-primary text-2xl font-bold">
            {student.user?.name?.charAt(0) || 'U'}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-primary">{student.user?.name || 'Unknown'}</h1>
            <div className="flex items-center gap-4 mt-2 text-sm text-secondary">
              <span className="flex items-center gap-1"><User className="w-4 h-4"/> ID: {student.profile?.userId?.slice(0,6)}</span>
              <span className="flex items-center gap-1"><MapPin className="w-4 h-4"/> Bed: {student.profile?.bedId || '-'}</span>
              <span className="flex items-center gap-1"><Calendar className="w-4 h-4"/> Joined: {new Date(student.profile?.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
          {student.profile?.status !== 'checked_out' && (
            <button 
              onClick={handleCheckout}
              className="ml-auto flex items-center gap-2 bg-danger-bg text-danger px-4 py-2 rounded-lg font-bold hover:bg-red-100 motion-safe:transition-colors border border-danger/20"
            >
              <LogOut className="w-4 h-4" /> Checkout Student
            </button>
          )}
        </div>
        
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="font-bold text-primary border-b border pb-2">Contact Info</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-secondary">Phone</div>
              <div className="font-medium text-primary">{student.user?.phone || '-'}</div>
              <div className="text-secondary">Email</div>
              <div className="font-medium text-primary">{student.user?.email || '-'}</div>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="font-bold text-primary border-b border pb-2">Parent Info</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-secondary">Parent Name</div>
              <div className="font-medium text-primary">{student.profile.parentName || '-'}</div>
              <div className="text-secondary">Parent Phone</div>
              <div className="font-medium text-primary">{student.profile.parentPhone || '-'}</div>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="font-bold text-primary border-b border pb-2">Financials</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-secondary">Monthly Rent</div>
              <div className="font-medium text-primary flex items-center gap-1"><IndianRupee className="w-3.5 h-3.5"/> {student.profile.rentAmount || 0}</div>
              <div className="text-secondary">Current Dues</div>
              <div className={`font-medium flex items-center gap-1 ${student.profile.duesAmount > 0 ? 'text-danger' : 'text-success'}`}>
                <IndianRupee className="w-3.5 h-3.5"/> {student.profile.duesAmount || 0}
              </div>
              <div className="text-secondary">Mess Facility</div>
              <div className="font-medium text-primary flex items-center gap-1">
                <Utensils className="w-3.5 h-3.5"/> {student.profile.hasMessFacility ? 'Yes (Included)' : 'No'}
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="font-bold text-primary border-b border pb-2">Behavior & Scoring</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-secondary">PG Score</div>
              <div className={`font-bold ${student.profile.pgScore >= 80 ? 'text-success' : 'text-warning'}`}>{student.profile.pgScore}/100</div>
            </div>
          </div>
        </div>
        
        {/* Rent Schedule Section */}
        <div className="p-8 border-t border">
          <h3 className="text-lg font-bold text-primary mb-6 flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            Stay Duration & Rent Schedule
          </h3>
          {student.profile.stayStartDate && student.profile.stayEndDate ? (
            <div className="space-y-4">
              <div className="flex gap-4 text-sm text-secondary mb-6 bg-input p-4 rounded-lg">
                <div><strong>Start Date:</strong> {new Date(student.profile.stayStartDate).toLocaleDateString()}</div>
                <div><strong>End Date:</strong> {new Date(student.profile.stayEndDate).toLocaleDateString()}</div>
                <div><strong>Duration:</strong> {Math.round((new Date(student.profile.stayEndDate).getTime() - new Date(student.profile.stayStartDate).getTime()) / (1000 * 3600 * 24 * 30))} Months</div>
              </div>
              <div className="relative border-l-2 border ml-3 space-y-6">
                {invoices.filter(i => i.type === 'Rent' || !i.type).sort((a,b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()).map((invoice: unknown, idx: number) => {
// @ts-expect-error
                  const dueTime = new Date(invoice.dueDate).getTime();
                  const nowTime = new Date().getTime();
                  const diffDays = (dueTime - nowTime) / (1000 * 3600 * 24);
                  const isDueSoon = diffDays <= 3;
// @ts-expect-error
                  const showAsDue = invoice.status === 'Pending' && isDueSoon;
// @ts-expect-error
                  const displayStatus = invoice.status === 'Paid' ? 'Paid' : (showAsDue ? 'DUE' : 'PENDING');

                  return (
// @ts-expect-error
                  <div key={invoice.id} className="relative pl-6">
// @ts-expect-error
                    <div className={`absolute w-4 h-4 rounded-full -left-[9px] top-1 ${(invoice as any).status === 'Paid' ? 'bg-success' : (showAsDue ? 'bg-danger' : 'bg-warning border-2 border-card')}`}></div>
                    <div className={`bg-input p-4 rounded-lg border ${showAsDue ? 'border-danger/50 shadow-sm' : 'border'}`}>
                      <div className="flex justify-between items-start mb-2">
                        <div>
// @ts-expect-error
                          <h4 className={`font-bold ${showAsDue ? 'text-danger' : 'text-primary'}`}>{(invoice as any).title || (invoice as any).description || 'Monthly Rent'}</h4>
// @ts-expect-error
                          <p className={`text-xs ${showAsDue ? 'text-danger font-medium' : 'text-secondary'}`}>Due: {new Date((invoice as any).dueDate).toLocaleDateString()}</p>
                        </div>
// @ts-expect-error
                        <div className={`text-xs font-bold px-2 py-1 rounded ${(invoice as any).status === 'Paid' ? 'bg-success-bg text-success' : (showAsDue ? 'bg-danger-bg text-danger' : 'bg-warning-bg text-warning')}`}>
                          {displayStatus}
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-1 mt-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-secondary font-medium">Rent</span>
// @ts-expect-error
                          <span className={`font-black ${showAsDue ? 'text-danger' : 'text-primary'}`}>₹{(invoice as any).amount}</span>
                        </div>
// @ts-expect-error
                        {(invoice as any).electricityBillAmount !== undefined ? (
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-secondary font-medium">Electricity Bill</span>
// @ts-expect-error
                            <span className="font-bold text-primary">₹{(invoice as any).electricityBillAmount}</span>
                          </div>
                        ) : null}
// @ts-expect-error
                        {(invoice as any).electricityBillAmount !== undefined && (
                          <div className="flex justify-between items-center mt-2 border-t border pt-2">
                            <span className="text-sm font-bold text-primary">Total</span>
// @ts-expect-error
                            <span className={`font-black ${showAsDue ? 'text-danger' : 'text-primary'}`}>₹{(invoice as any).amount + (invoice as any).electricityBillAmount}</span>
                          </div>
                        )}
                      </div>

                      <div className="mt-4 flex gap-2">
// @ts-expect-error
                        {!(invoice as any).electricityBillAmount && (
                          <button
                            onClick={() => {
                              setSelectedInvoiceForBill(invoice);
                              setIsBillModalOpen(true);
                            }}
                            className="text-xs font-bold text-primary bg-primary-subtle hover:bg-primary hover:text-white motion-safe:transition-colors px-3 py-1.5 rounded"
                          >
                            Add Electricity Bill
                          </button>
                        )}
// @ts-expect-error
                        {(invoice as any).electricityBillImage && (
                          <a
// @ts-expect-error
                            href={invoice.electricityBillImage}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-bold text-secondary bg-page border border hover:text-primary motion-safe:transition-colors px-3 py-1.5 rounded inline-flex items-center gap-1"
                          >
                            View Bill Receipt
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                )})}
              </div>
            </div>
          ) : (
            <div className="text-sm text-secondary bg-input p-4 rounded-lg">
              No stay duration was recorded during onboarding. Monthly rent is tracked manually.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
