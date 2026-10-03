'use client';

import React, { useState } from 'react';
import { 
  UserPlus, FileText, CheckCircle2, XCircle, 
  Search, PhoneCall, Bed, Wallet, MapPin, 
  ArrowRight, ShieldCheck, FileCheck, Mail,
  ListOrdered, Plus, AlertTriangle, User, X
} from 'lucide-react';

const MOCK_PIPELINE = [
  { id: 'APP-1001', name: 'Rohan Gupta', phone: '+91 9876543210', property: 'PG Varanasi Main', stage: 'Application', date: '03 Oct 2026', nextAction: 'Verify Docs' },
  { id: 'APP-1002', name: 'Neha Sharma', phone: '+91 9123456789', property: 'PG Lanka Branch', stage: 'Enquiry', date: '02 Oct 2026', nextAction: 'Schedule Visit' },
  { id: 'APP-1003', name: 'Vikas Patel', phone: '+91 9988776655', property: 'PG Varanasi Main', stage: 'Docs Verified', date: '01 Oct 2026', nextAction: 'Assign Bed & Fees' },
  { id: 'APP-1004', name: 'Anjali Singh', phone: '+91 8888777766', property: 'PG Lanka Branch', stage: 'Approved', date: '30 Sep 2026', nextAction: 'Ready for Check-in' },
];

const MOCK_WAITLIST = [
  { id: 'WL-001', name: 'Suresh Kumar', phone: '+91 7777888899', property: 'PG Lanka Branch', prefRoomType: 'Single Room', waitDate: '25 Sep 2026' }
];

export default function AdmissionsPage() {
  const [activeTab, setActiveTab] = useState<'pipeline' | 'waitlist'>('pipeline');
  const [searchTerm, setSearchTerm] = useState('');
  
  const [isProcessModalOpen, setIsProcessModalOpen] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState<any>(null);

  const openProcessModal = (app: any) => {
    setSelectedApplicant(app);
    setIsProcessModalOpen(true);
  };

  const getStageBadge = (stage: string) => {
    switch(stage) {
      case 'Enquiry': return <span className="px-2.5 py-1 bg-[var(--bg-overlay)] text-secondary rounded-md text-[10px] font-bold uppercase border border-border">Enquiry</span>;
      case 'Application': return <span className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-md text-[10px] font-bold uppercase border border-blue-200">Application</span>;
      case 'Docs Verified': return <span className="px-2.5 py-1 bg-purple-50 text-purple-700 rounded-md text-[10px] font-bold uppercase border border-purple-200">Docs Verified</span>;
      case 'Approved': return <span className="px-2.5 py-1 bg-green-100 text-green-700 rounded-md text-[10px] font-bold uppercase border border-green-200">Approved</span>;
      case 'Rejected': return <span className="px-2.5 py-1 bg-red-50 text-red-700 rounded-md text-[10px] font-bold uppercase border border-red-200">Rejected</span>;
      default: return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* Process Application Modal */}
      {isProcessModalOpen && selectedApplicant && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl shadow-xl w-full max-w-4xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
            <div className="p-5 border-b border-border/50 flex items-center justify-between bg-[#1A3A5C] text-white shrink-0">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-[#F5A623]" /> Process Admission
              </h2>
              <button onClick={() => setIsProcessModalOpen(false)} className="p-1.5 hover:bg-card/10 rounded-lg transition-colors"><X className="w-5 h-5" /></button>
            </div>
            
            <div className="p-6 space-y-8 overflow-y-auto bg-page/50 flex-1">
              
              {/* Applicant Header */}
              <div className="flex justify-between items-center bg-card p-4 rounded-xl border border-border shadow-sm">
                <div>
                  <h3 className="font-bold text-primary text-lg flex items-center gap-2">
                    {selectedApplicant.name} {getStageBadge(selectedApplicant.stage)}
                  </h3>
                  <p className="text-sm text-[var(--text-disabled)] mt-1 flex items-center gap-3">
                    <span className="flex items-center gap-1"><PhoneCall className="w-3.5 h-3.5"/> {selectedApplicant.phone}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5"/> {selectedApplicant.property}</span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Application ID</p>
                  <p className="text-sm font-black text-primary">{selectedApplicant.id}</p>
                </div>
              </div>

              {/* Workflow Engine Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* 1. Document Verification */}
                <div className="bg-card p-5 rounded-xl border border-border shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
                  <h3 className="text-sm font-bold text-primary border-b border-border/50 pb-2 mb-4 flex items-center justify-between">
                    <span className="flex items-center gap-2"><FileCheck className="w-4 h-4 text-blue-500" /> 1. Document Collection</span>
                    <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-1 rounded-md font-bold">Action Required</span>
                  </h3>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 p-2 hover:bg-page rounded-lg cursor-pointer transition-colors">
                      <input type="checkbox" className="w-4 h-4 text-blue-600 rounded border-border focus:ring-blue-500" />
                      <span className="text-sm font-semibold text-secondary">Aadhar Card / ID Proof Uploaded</span>
                    </label>
                    <label className="flex items-center gap-3 p-2 hover:bg-page rounded-lg cursor-pointer transition-colors">
                      <input type="checkbox" className="w-4 h-4 text-blue-600 rounded border-border focus:ring-blue-500" />
                      <span className="text-sm font-semibold text-secondary">Student Photo Collected</span>
                    </label>
                    <label className="flex items-center gap-3 p-2 hover:bg-page rounded-lg cursor-pointer transition-colors">
                      <input type="checkbox" className="w-4 h-4 text-blue-600 rounded border-border focus:ring-blue-500" />
                      <span className="text-sm font-semibold text-secondary">Guardian Documents Uploaded</span>
                    </label>
                    <button className="w-full mt-2 py-2 border-2 border-dashed border-border rounded-xl text-xs font-bold text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-colors">
                      + Upload Document Manually
                    </button>
                  </div>
                </div>

                {/* 2. Room & Bed Allocation */}
                <div className="bg-card p-5 rounded-xl border border-border shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-purple-500"></div>
                  <h3 className="text-sm font-bold text-primary border-b border-border/50 pb-2 mb-4 flex items-center justify-between">
                    <span className="flex items-center gap-2"><Bed className="w-4 h-4 text-purple-500" /> 2. Room & Bed Allocation</span>
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-secondary uppercase mb-2">Select Preferred Room Type</label>
                      <select className="w-full px-4 py-2 bg-page border border-border rounded-xl text-sm focus:outline-none focus:border-purple-500">
                        <option>Double Sharing</option>
                        <option>Single Room</option>
                        <option>Triple Sharing</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-secondary uppercase mb-2">Assign Specific Bed</label>
                      <select className="w-full px-4 py-2 bg-page border border-border rounded-xl text-sm font-bold focus:outline-none focus:border-purple-500">
                        <option>Room 101 - Bed B (Available)</option>
                        <option>Room 205 - Bed A (Available)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* 3. Fee & Deposit */}
                <div className="bg-card p-5 rounded-xl border border-border shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-green-500"></div>
                  <h3 className="text-sm font-bold text-primary border-b border-border/50 pb-2 mb-4 flex items-center justify-between">
                    <span className="flex items-center gap-2"><Wallet className="w-4 h-4 text-green-500" /> 3. Fee & Security Deposit</span>
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[var(--text-disabled)] uppercase">Admission Fee</span>
                      <div className="relative w-32">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-disabled)] text-sm font-bold">₹</span>
                        <input type="number" defaultValue={1000} className="w-full pl-7 pr-2 py-1.5 bg-page border border-border rounded-lg text-sm font-bold text-right outline-none focus:border-green-500" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[var(--text-disabled)] uppercase">Security Deposit</span>
                      <div className="relative w-32">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-disabled)] text-sm font-bold">₹</span>
                        <input type="number" defaultValue={10000} className="w-full pl-7 pr-2 py-1.5 bg-page border border-border rounded-lg text-sm font-bold text-right outline-none focus:border-green-500" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between border-t border-border/50 pt-3 mt-1">
                      <span className="text-sm font-black text-primary">Total to Collect</span>
                      <span className="text-lg font-black text-green-600">₹11,000</span>
                    </div>
                    <label className="flex items-center gap-2 cursor-pointer mt-2 bg-green-50 p-2 rounded-lg border border-green-100">
                      <input type="checkbox" className="w-4 h-4 text-green-600 rounded border-border focus:ring-green-500" />
                      <span className="text-xs font-bold text-green-800">Payment Received & Verified</span>
                    </label>
                  </div>
                </div>

                {/* 4. Agreement */}
                <div className="bg-card p-5 rounded-xl border border-border shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-[#F5A623]"></div>
                  <h3 className="text-sm font-bold text-primary border-b border-border/50 pb-2 mb-4 flex items-center justify-between">
                    <span className="flex items-center gap-2"><FileText className="w-4 h-4 text-[#F5A623]" /> 4. Digital Agreement</span>
                  </h3>
                  <div className="space-y-4">
                    <button className="w-full py-2.5 bg-orange-50 text-orange-700 border border-orange-200 rounded-xl text-sm font-bold hover:bg-orange-100 transition-colors flex items-center justify-center gap-2">
                      <Mail className="w-4 h-4" /> Send Agreement to Student App
                    </button>
                    <label className="flex items-start gap-3 p-3 bg-page border border-border rounded-xl cursor-pointer hover:bg-[var(--bg-overlay)] transition-colors">
                      <input type="checkbox" className="w-5 h-5 rounded border-border text-orange-600 focus:ring-orange-500 mt-0.5" />
                      <div>
                        <span className="text-sm font-bold text-primary">Agreement Digitally Signed</span>
                        <p className="text-[10px] text-[var(--text-disabled)] mt-1">Student has accepted all House Rules and PG policies.</p>
                      </div>
                    </label>
                  </div>
                </div>

              </div>

            </div>
            
            <div className="p-5 border-t border-border/50 bg-card flex justify-between items-center shrink-0">
              <button className="text-sm font-bold text-red-600 hover:bg-red-50 px-4 py-2 rounded-xl transition-colors">Reject Application</button>
              <div className="flex gap-3">
                <button onClick={() => setIsProcessModalOpen(false)} className="px-6 py-2.5 bg-[var(--bg-overlay)] text-secondary rounded-xl font-bold hover:bg-gray-200 transition-colors">Save Progress</button>
                <button onClick={() => { alert('Admission Approved! Student pushed to Check-in Queue and Welcome Notification sent.'); setIsProcessModalOpen(false); }} className="px-6 py-2.5 bg-[#1A3A5C] hover:bg-[#122a42] text-white rounded-xl font-bold flex items-center gap-2 transition-colors shadow-sm">
                  <ShieldCheck className="w-4 h-4" /> Approve Admission
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
            <UserPlus className="w-7 h-7 text-[#F5A623]" />
            Admissions Pipeline
          </h1>
          <p className="text-[var(--text-disabled)] text-sm mt-1">Manage new enquiries, application verifications, and onboarding flows.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-card border border-border text-secondary hover:bg-page px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-colors">
            <User className="w-4 h-4" /> Add Walk-in Enquiry
          </button>
          <button className="flex items-center gap-2 bg-[#F5A623] hover:bg-[#e09612] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-colors">
            <Plus className="w-4 h-4" /> Direct Admission
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card p-4 border border-border/50 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><UserPlus className="w-6 h-6" /></div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">Total Enquiries (Oct)</p>
            <h3 className="text-2xl font-black text-primary">45</h3>
          </div>
        </div>
        <div className="bg-card p-4 border border-border/50 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-xl"><FileText className="w-6 h-6" /></div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">Applications Pending</p>
            <h3 className="text-2xl font-black text-purple-600">8</h3>
          </div>
        </div>
        <div className="bg-card p-4 border border-border/50 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-green-50 text-green-600 rounded-xl"><CheckCircle2 className="w-6 h-6" /></div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">Approved (Check-in Ready)</p>
            <h3 className="text-2xl font-black text-primary">4</h3>
          </div>
        </div>
        <div className="bg-card p-4 border border-border/50 rounded-2xl shadow-sm flex items-center gap-4 border-l-4 border-orange-400">
          <div className="p-3 bg-orange-50 text-orange-600 rounded-xl"><ListOrdered className="w-6 h-6" /></div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">Waiting List</p>
            <h3 className="text-2xl font-black text-primary">12</h3>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-card rounded-2xl shadow-sm border border-border/50 overflow-hidden min-h-[500px] flex flex-col">
        
        {/* Top Bar: Tabs & Filters */}
        <div className="p-4 border-b border-border/50 bg-page/50 flex flex-col lg:flex-row justify-between gap-4 shrink-0">
          <div className="flex bg-[var(--bg-overlay)] p-1 rounded-xl w-full md:w-max">
            <button 
              onClick={() => setActiveTab('pipeline')}
              className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'pipeline' ? 'bg-card text-[#F5A623] shadow-sm' : 'text-[var(--text-disabled)] hover:text-secondary'}`}
            >
              <UserPlus className="w-4 h-4" /> Enquiries & Pipeline
            </button>
            <button 
              onClick={() => setActiveTab('waitlist')}
              className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'waitlist' ? 'bg-card text-orange-600 shadow-sm' : 'text-[var(--text-disabled)] hover:text-secondary'}`}
            >
              <ListOrdered className="w-4 h-4" /> Waiting List
            </button>
          </div>
          
          <div className="relative w-full lg:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search applicant name or phone..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-border rounded-xl text-sm focus:outline-none focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623] bg-card"
            />
          </div>
        </div>

        {/* Dynamic Table Content */}
        <div className="flex-1 overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-page border-b border-border/50 text-[var(--text-disabled)] text-xs uppercase tracking-wider font-bold">
                <th className="p-5">Applicant Details</th>
                <th className="p-5">Assigned Property</th>
                {activeTab === 'pipeline' ? (
                  <>
                    <th className="p-5">Current Stage</th>
                    <th className="p-5">Next Required Action</th>
                    <th className="p-5 text-center">Process</th>
                  </>
                ) : (
                  <>
                    <th className="p-5">Preferred Room</th>
                    <th className="p-5">Waitlisted Since</th>
                    <th className="p-5 text-center">Action</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              
              {/* PIPELINE */}
              {activeTab === 'pipeline' && MOCK_PIPELINE.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase())).map((record) => (
                <tr key={record.id} className="hover:bg-page/50 transition-colors">
                  <td className="p-5">
                    <div className="flex flex-col">
                      <span className="font-bold text-primary text-sm flex items-center gap-2">
                        {record.name}
                      </span>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs font-semibold text-[var(--text-disabled)]">{record.phone}</span>
                        <span className="text-[10px] text-gray-400 font-bold border border-border px-1 rounded bg-page">{record.id}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-5">
                    <span className="flex items-center gap-1.5 text-sm font-bold text-secondary"><MapPin className="w-4 h-4 text-[#F5A623]" /> {record.property}</span>
                  </td>
                  <td className="p-5">
                    {getStageBadge(record.stage)}
                  </td>
                  <td className="p-5">
                    <span className="text-sm font-semibold text-blue-600 flex items-center gap-1.5"><ArrowRight className="w-4 h-4"/> {record.nextAction}</span>
                  </td>
                  <td className="p-5 text-center">
                    {record.stage === 'Approved' ? (
                      <span className="text-xs font-bold text-green-600 flex items-center justify-center gap-1"><CheckCircle2 className="w-4 h-4"/> Sent to Check-in</span>
                    ) : (
                      <button onClick={() => openProcessModal(record)} className="px-4 py-2 bg-[#1A3A5C] hover:bg-[#122a42] text-white rounded-xl text-sm font-bold shadow-sm transition-colors flex items-center justify-center gap-2 mx-auto w-max">
                        Process <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}

              {/* WAITING LIST */}
              {activeTab === 'waitlist' && MOCK_WAITLIST.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase())).map((record) => (
                <tr key={record.id} className="hover:bg-page/50 transition-colors">
                  <td className="p-5">
                    <div className="flex flex-col">
                      <span className="font-bold text-primary text-sm flex items-center gap-2">{record.name}</span>
                      <span className="text-xs font-semibold text-[var(--text-disabled)] mt-0.5">{record.phone}</span>
                    </div>
                  </td>
                  <td className="p-5">
                    <span className="flex items-center gap-1.5 text-sm font-bold text-secondary"><MapPin className="w-4 h-4 text-orange-500" /> {record.property}</span>
                  </td>
                  <td className="p-5">
                    <span className="flex items-center gap-1.5 text-sm font-bold text-secondary"><Bed className="w-4 h-4 text-purple-500" /> {record.prefRoomType}</span>
                  </td>
                  <td className="p-5">
                    <span className="text-sm font-semibold text-secondary">{record.waitDate}</span>
                  </td>
                  <td className="p-5 text-center">
                    <button className="px-4 py-2 bg-card border border-border hover:border-[#F5A623] hover:text-[#F5A623] text-secondary rounded-xl text-sm font-bold shadow-sm transition-colors flex items-center justify-center mx-auto w-max">
                      Start Admission
                    </button>
                  </td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
