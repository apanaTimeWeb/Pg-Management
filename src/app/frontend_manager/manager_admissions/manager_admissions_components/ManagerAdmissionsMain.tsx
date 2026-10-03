// @ts-nocheck
'use client';

import React, { useState } from 'react';
import { 
  UserPlus, Search, Filter, Phone, Mail, FileText, CheckCircle2, 
  XCircle, Clock, MapPin, IndianRupee, ShieldAlert, ArrowRight,
  UserCheck, Bed, MessageSquare, Send
} from 'lucide-react';

type AdmissionStage = 'Enquiry' | 'Application' | 'Verification' | 'Approved' | 'Waiting List' | 'Rejected';

interface Candidate {
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

const INITIAL_CANDIDATES: Candidate[] = [
  {
    id: 'ENQ-001', name: 'Rohan Gupta', mobile: '+91 9876543210', email: 'rohan@example.com',
    date: '03 Oct 2026', preferredRoomType: '2 Sharing', stage: 'Enquiry', documentsStatus: 'Pending'
  },
  {
    id: 'APP-002', name: 'Suraj Verma', mobile: '+91 8765432109', email: 'suraj@example.com',
    date: '02 Oct 2026', preferredRoomType: '1 Sharing', stage: 'Application', documentsStatus: 'Uploaded'
  },
  {
    id: 'VER-003', name: 'Karan Singh', mobile: '+91 7654321098', email: 'karan@example.com',
    date: '01 Oct 2026', preferredRoomType: '3 Sharing', stage: 'Verification', documentsStatus: 'Verified',
    ownerApprovalRequired: true
  },
  {
    id: 'ADM-004', name: 'Rahul Joshi', mobile: '+91 6543210987', email: 'rahul@example.com',
    date: '30 Sep 2026', preferredRoomType: '2 Sharing', stage: 'Approved', documentsStatus: 'Verified',
    assignedRoom: '102', assignedBed: 'B'
  },
  {
    id: 'WL-005', name: 'Nitin Patel', mobile: '+91 5432109876', email: 'nitin@example.com',
    date: '28 Sep 2026', preferredRoomType: '1 Sharing', stage: 'Waiting List', documentsStatus: 'Verified'
  }
];

export default function ManagerAdmissionsMain() {
  const [candidates, setCandidates] = useState<Candidate[]>(INITIAL_CANDIDATES);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate>(INITIAL_CANDIDATES[0]);
  const [filterStage, setFilterStage] = useState<'All' | AdmissionStage>('All');
  const [searchTerm, setSearchTerm] = useState('');
  
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);

  const filteredCandidates = candidates.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.mobile.includes(searchTerm);
    const matchesStage = filterStage === 'All' || c.stage === filterStage;
    return matchesSearch && matchesStage;
  });

  const getStageColor = (stage: AdmissionStage) => {
    switch (stage) {
      case 'Enquiry': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Application': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Verification': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Approved': return 'bg-green-100 text-green-700 border-green-200';
      case 'Waiting List': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Rejected': return 'bg-red-100 text-red-700 border-red-200';
    }
  };

  const handleUpdateStage = (newStage: AdmissionStage) => {
    setCandidates(prev => prev.map(c => c.id === selectedCandidate.id ? { ...c, stage: newStage } : c));
    setSelectedCandidate(prev => ({ ...prev, stage: newStage }));
  };

  const handleDocumentVerify = () => {
    setCandidates(prev => prev.map(c => c.id === selectedCandidate.id ? { ...c, documentsStatus: 'Verified' } : c));
    setSelectedCandidate(prev => ({ ...prev, documentsStatus: 'Verified' }));
  };

  const handleAllocateRoom = () => {
    const rm = prompt("Enter Room Number (e.g. 102):");
    const bd = prompt("Enter Bed Number (e.g. A):");
    if(rm && bd) {
      setCandidates(prev => prev.map(c => c.id === selectedCandidate.id ? { ...c, assignedRoom: rm, assignedBed: bd } : c));
      setSelectedCandidate(prev => ({ ...prev, assignedRoom: rm, assignedBed: bd }));
    }
  };

  const handleNewEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setEnquiryModalOpen(false);
    alert('New enquiry recorded successfully!');
  };

  return (
    <div className="p-4 md:p-8 space-y-6 animate-in fade-in duration-500 max-w-7xl mx-auto h-[calc(100vh-4rem)] flex flex-col">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-black text-primary flex items-center gap-3">
            <div className="p-2 bg-indigo-100 rounded-xl text-indigo-600">
              <UserPlus className="w-6 h-6"/>
            </div>
            Admission Pipeline
          </h1>
          <p className="text-[var(--text-disabled)] text-sm mt-1 font-medium">Process enquiries to final admissions operationally.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setEnquiryModalOpen(true)}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md transition-all"
          >
            <UserPlus className="w-4 h-4" /> New Enquiry
          </button>
        </div>
      </div>

      <div className="bg-card border border-border/60 rounded-2xl shadow-sm flex flex-col flex-1 min-h-0 overflow-hidden">
        
        {/* Top Filters */}
        <div className="p-4 border-b border-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-page/30 shrink-0">
          <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-1 sm:pb-0">
            {['All', 'Enquiry', 'Application', 'Verification', 'Approved', 'Waiting List', 'Rejected'].map(stage => (
              <button 
                key={stage}
                onClick={() => setFilterStage(stage as any)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
                  filterStage === stage 
                    ? 'bg-indigo-600 text-white border-indigo-600' 
                    : 'bg-white text-secondary border-border/60 hover:border-indigo-300'
                }`}
              >
                {stage}
              </button>
            ))}
          </div>
          
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
            <input 
              type="text" 
              placeholder="Search candidate..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-input border border-border rounded-lg text-sm font-medium focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row flex-1 min-h-0 overflow-hidden">
          
          {/* Left Side: List */}
          <div className="lg:w-1/3 border-r border-border/50 flex flex-col min-h-0">
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {filteredCandidates.map(c => (
                <div 
                  key={c.id}
                  onClick={() => setSelectedCandidate(c)}
                  className={`p-3 rounded-xl cursor-pointer transition-all ${
                    selectedCandidate.id === c.id 
                      ? 'bg-indigo-50 border border-indigo-200 shadow-sm' 
                      : 'bg-transparent border border-transparent hover:bg-page/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-primary truncate">{c.name}</h4>
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider border ${getStageColor(c.stage)}`}>
                      {c.stage}
                    </span>
                  </div>
                  <p className="text-[11px] text-secondary truncate flex items-center gap-1.5"><Phone className="w-3 h-3"/> {c.mobile}</p>
                  <p className="text-[10px] text-secondary mt-1 flex items-center justify-between">
                    <span>Pref: {c.preferredRoomType}</span>
                    <span>{c.date}</span>
                  </p>
                </div>
              ))}
              {filteredCandidates.length === 0 && (
                <div className="text-center p-8 text-secondary text-sm">No candidates found in this stage.</div>
              )}
            </div>
          </div>

          {/* Right Side: Details & Action Flow */}
          <div className="flex-1 flex flex-col min-h-0 bg-gray-50/30 overflow-y-auto">
            
            {/* Header Info */}
            <div className="p-6 border-b border-border/50 bg-white shrink-0">
              <div className="flex items-center justify-between mb-3">
                <span className={`px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wider border ${getStageColor(selectedCandidate.stage)}`}>
                  Pipeline Stage: {selectedCandidate.stage}
                </span>
                <span className="text-sm font-bold text-secondary">ID: {selectedCandidate.id}</span>
              </div>
              
              <h2 className="text-2xl font-black text-primary leading-tight">{selectedCandidate.name}</h2>
              <div className="flex items-center gap-4 mt-2">
                <a href={`tel:${selectedCandidate.mobile}`} className="text-sm font-bold text-indigo-600 hover:underline flex items-center gap-1"><Phone className="w-4 h-4"/> {selectedCandidate.mobile}</a>
                <a href={`mailto:${selectedCandidate.email}`} className="text-sm font-bold text-indigo-600 hover:underline flex items-center gap-1"><Mail className="w-4 h-4"/> {selectedCandidate.email}</a>
              </div>
            </div>

            <div className="p-6 flex-1 space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl border border-border shadow-sm">
                  <p className="text-xs font-bold text-secondary uppercase tracking-wider mb-2">Requirements</p>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-primary"><span className="text-secondary">Pref Room Type:</span> {selectedCandidate.preferredRoomType}</p>
                    <p className="text-sm font-medium text-primary"><span className="text-secondary">Expected Join Date:</span> Immediate</p>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-xl border border-border shadow-sm">
                  <p className="text-xs font-bold text-secondary uppercase tracking-wider mb-2">Allocation & Docs</p>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-primary flex items-center justify-between">
                      <span className="text-secondary">Docs Status:</span> 
                      <span className={`font-bold ${selectedCandidate.documentsStatus === 'Verified' ? 'text-green-600' : 'text-orange-600'}`}>{selectedCandidate.documentsStatus}</span>
                    </p>
                    <p className="text-sm font-medium text-primary flex items-center justify-between">
                      <span className="text-secondary">Assigned Room:</span> 
                      {selectedCandidate.assignedRoom ? <span className="font-bold text-indigo-600">Rm {selectedCandidate.assignedRoom} - {selectedCandidate.assignedBed}</span> : <span className="italic text-gray-400">Not assigned</span>}
                    </p>
                  </div>
                </div>
              </div>

              {/* Pipeline Flow Visualization */}
              <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
                <h3 className="font-bold text-primary mb-6 flex items-center gap-2">
                  <ArrowRight className="w-5 h-5 text-indigo-600" /> Operational Pipeline
                </h3>
                
                <div className="flex flex-col md:flex-row items-center gap-2 w-full justify-between mb-8 overflow-x-auto hide-scrollbar">
                  
                  {['Enquiry', 'Application', 'Verification', 'Room/Bed', 'Approved'].map((step, idx, arr) => {
                    const stepMap: Record<string, number> = {'Enquiry': 1, 'Application': 2, 'Verification': 3, 'Room/Bed': 4, 'Approved': 5};
                    let currentStepVal = stepMap[selectedCandidate.stage] || 0;
                    if(selectedCandidate.stage === 'Waiting List') currentStepVal = 4.5;
                    if(selectedCandidate.stage === 'Rejected') currentStepVal = -1;

                    const thisStepVal = stepMap[step];
                    const isPassed = currentStepVal >= thisStepVal;
                    const isCurrent = currentStepVal === thisStepVal;

                    return (
                      <React.Fragment key={step}>
                        <div className="flex flex-col items-center gap-2 z-10">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                            isPassed && !isCurrent ? 'bg-green-500 text-white' :
                            isCurrent ? 'bg-indigo-100 text-indigo-600 border-2 border-indigo-200 ring-4 ring-indigo-50' : 
                            'bg-gray-100 text-gray-400 border-2 border-gray-200'
                          }`}>
                            {isPassed && !isCurrent ? <CheckCircle2 className="w-5 h-5" /> : <span className="text-sm font-bold">{idx+1}</span>}
                          </div>
                          <span className={`text-xs font-bold text-center ${isPassed || isCurrent ? 'text-primary' : 'text-secondary'}`}>{step}</span>
                        </div>
                        {idx < arr.length - 1 && (
                          <div className={`h-1 w-8 md:flex-1 md:w-auto ${currentStepVal > thisStepVal ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                        )}
                      </React.Fragment>
                    );
                  })}

                </div>

                {/* Contextual Actions Based on Stage */}
                <div className="bg-page/50 p-5 rounded-xl border border-border flex flex-col gap-3">
                  <h4 className="text-sm font-bold text-secondary uppercase tracking-wider mb-2">Manager Actions</h4>
                  
                  {selectedCandidate.stage === 'Enquiry' && (
                    <div className="flex flex-wrap gap-3">
                      <button className="bg-white border border-border text-primary hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-bold shadow-sm flex items-center gap-2"><MessageSquare className="w-4 h-4"/> Send Follow-up</button>
                      <button onClick={() => handleUpdateStage('Application')} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm flex items-center gap-2">Convert to Application <ArrowRight className="w-4 h-4"/></button>
                    </div>
                  )}

                  {selectedCandidate.stage === 'Application' && (
                    <div className="flex flex-wrap gap-3">
                      <button className="bg-white border border-border text-primary hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-bold shadow-sm flex items-center gap-2"><FileText className="w-4 h-4"/> Request Documents</button>
                      <button onClick={() => handleUpdateStage('Verification')} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm flex items-center gap-2">Move to Verification <ArrowRight className="w-4 h-4"/></button>
                    </div>
                  )}

                  {selectedCandidate.stage === 'Verification' && (
                    <div className="flex flex-wrap gap-3">
                      <button 
                        onClick={handleDocumentVerify} 
                        disabled={selectedCandidate.documentsStatus === 'Verified'}
                        className="bg-white border border-border text-green-600 hover:bg-green-50 disabled:opacity-50 px-4 py-2 rounded-lg text-sm font-bold shadow-sm flex items-center gap-2"
                      >
                        <UserCheck className="w-4 h-4"/> {selectedCandidate.documentsStatus === 'Verified' ? 'Docs Verified' : 'Verify Documents'}
                      </button>
                      
                      {!selectedCandidate.assignedRoom && (
                        <button onClick={handleAllocateRoom} className="bg-white border border-border text-primary hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-bold shadow-sm flex items-center gap-2"><Bed className="w-4 h-4"/> Allocate Room/Bed</button>
                      )}

                      {selectedCandidate.ownerApprovalRequired && (
                        <div className="w-full mt-2 p-3 bg-orange-50 border border-orange-200 rounded-lg flex items-start gap-2">
                          <ShieldAlert className="w-5 h-5 text-orange-600 shrink-0" />
                          <div>
                            <p className="text-sm font-bold text-orange-900">Owner Approval Required</p>
                            <p className="text-xs text-orange-800">Special discount or policy exception requested. You must send this to the Owner for final approval before admission.</p>
                            <button className="mt-2 bg-orange-600 text-white px-3 py-1.5 rounded text-xs font-bold shadow-sm flex items-center gap-1"><Send className="w-3 h-3"/> Request Owner Approval</button>
                          </div>
                        </div>
                      )}

                      {(!selectedCandidate.ownerApprovalRequired && selectedCandidate.documentsStatus === 'Verified' && selectedCandidate.assignedRoom) && (
                        <button onClick={() => handleUpdateStage('Approved')} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm flex items-center gap-2">Approve Admission <CheckCircle2 className="w-4 h-4"/></button>
                      )}
                    </div>
                  )}

                  {selectedCandidate.stage === 'Approved' && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-xl flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-green-900 flex items-center gap-2"><CheckCircle2 className="w-5 h-5"/> Admission Approved</h4>
                        <p className="text-sm text-green-800 mt-1">Student is ready for Check-In. Please proceed to the Check-In / Check-Out module.</p>
                      </div>
                      <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm">Schedule Check-In</button>
                    </div>
                  )}

                  {selectedCandidate.stage === 'Waiting List' && (
                    <div className="flex flex-wrap gap-3">
                      <button onClick={handleAllocateRoom} className="bg-white border border-border text-primary hover:bg-gray-50 px-4 py-2 rounded-lg text-sm font-bold shadow-sm flex items-center gap-2"><Bed className="w-4 h-4"/> Check Availability & Allocate</button>
                    </div>
                  )}

                  {(selectedCandidate.stage === 'Enquiry' || selectedCandidate.stage === 'Application' || selectedCandidate.stage === 'Verification') && (
                    <div className="w-full pt-3 mt-2 border-t border-border/50">
                      <button onClick={() => handleUpdateStage('Rejected')} className="text-xs font-bold text-red-600 hover:underline flex items-center gap-1"><XCircle className="w-3 h-3"/> Reject Application</button>
                    </div>
                  )}

                </div>

              </div>
            </div>

          </div>
        </div>
      </div>

      {/* New Enquiry Modal */}
      {enquiryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 p-4">
          <div className="bg-card w-full max-w-lg rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-border/50 bg-page/80 flex items-center justify-between">
              <h3 className="font-black text-primary flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-indigo-600" /> Record New Enquiry
              </h3>
              <button onClick={() => setEnquiryModalOpen(false)} className="text-secondary hover:text-red-500">
                <XCircle className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleNewEnquiry} className="p-6 space-y-4">
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-bold text-secondary">Full Name</label>
                  <input required type="text" className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:border-indigo-500" />
                </div>
                <div>
                  <label className="text-sm font-bold text-secondary">Mobile No.</label>
                  <input required type="text" className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:border-indigo-500" />
                </div>
              </div>

              <div>
                <label className="text-sm font-bold text-secondary">Email (Optional)</label>
                <input type="email" className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:border-indigo-500" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-bold text-secondary">Preferred Room Type</label>
                  <select required className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:border-indigo-500">
                    <option>1 Sharing</option>
                    <option>2 Sharing</option>
                    <option>3 Sharing</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-bold text-secondary">Expected Join Date</label>
                  <input required type="date" className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:border-indigo-500" />
                </div>
              </div>

              <div>
                <label className="text-sm font-bold text-secondary">Remarks / Source</label>
                <input type="text" placeholder="e.g. Walk-in, Google Ads, Reference" className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:border-indigo-500" />
              </div>

              <div className="p-4 border-t border-border/50 bg-gray-50 flex items-center justify-end gap-3 mt-4 -mx-6 -mb-6">
                <button type="button" onClick={() => setEnquiryModalOpen(false)} className="px-4 py-2 font-bold text-secondary hover:text-primary transition-colors">Cancel</button>
                <button type="submit" className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md transition-all">
                  Save Enquiry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
