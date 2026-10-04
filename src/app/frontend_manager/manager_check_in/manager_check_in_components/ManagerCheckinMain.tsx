// @ts-nocheck
'use client';

import React, { useState } from 'react';
import { 
  LogOut, LogIn, Search, CheckCircle2, FileText, Key, Bed, 
  IndianRupee, Box, UserCheck, ShieldAlert, AlertTriangle, XCircle, ArrowRight
} from 'lucide-react';

type TabType = 'checkin' | 'checkout';
type ProcessStep = 1 | 2 | 3 | 4 | 5;

interface StudentData {
  id: string;
  name: string;
  room: string;
  bed: string;
  status: string;
}

const CHECKIN_LIST: StudentData[] = [
  { id: 'ADM-201', name: 'Rohan Gupta', room: '102', bed: 'B', status: 'Approved Admission' },
  { id: 'ADM-202', name: 'Suraj Verma', room: '205', bed: 'A', status: 'Approved Admission' },
];

const CHECKOUT_LIST: StudentData[] = [
  { id: 'ST-045', name: 'Vikas Singh', room: '304', bed: 'A', status: 'Notice Period' },
  { id: 'ST-046', name: 'Amit Kumar', room: '105', bed: 'B', status: 'Check-out Requested' },
];

export default function ManagerCheckInMain() {
  const [activeTab, setActiveTab] = useState<TabType>('checkin');
  
  // Check-in State
  const [selectedIn, setSelectedIn] = useState<StudentData>(CHECKIN_LIST[0]);
  const [stepIn, setStepIn] = useState<ProcessStep>(1);
  const [inChecks, setInChecks] = useState<Record<number, boolean>>({});

  // Check-out State
  const [selectedOut, setSelectedOut] = useState<StudentData>(CHECKOUT_LIST[0]);
  const [stepOut, setStepOut] = useState<ProcessStep>(1);
  const [outChecks, setOutChecks] = useState<Record<number, boolean>>({});

  const handleNextIn = () => { if (stepIn < 5) setStepIn((s) => (s + 1) as ProcessStep); };
  const handlePrevIn = () => { if (stepIn > 1) setStepIn((s) => (s - 1) as ProcessStep); };
  
  const handleNextOut = () => { if (stepOut < 5) setStepOut((s) => (s + 1) as ProcessStep); };
  const handlePrevOut = () => { if (stepOut > 1) setStepOut((s) => (s - 1) as ProcessStep); };

  const handleCompleteCheckIn = () => {
    alert('Check-in Complete! Student is now Active.');
  };

  const handleCompleteCheckOut = () => {
    alert('Check-out Complete! Settlement forwarded to Owner. Bed is now released.');
  };

  return (
    <div className="p-4 md:p-8 space-y-6 animate-in fade-in duration-500 w-full h-[calc(100vh-4rem)] flex flex-col">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-black text-primary flex items-center gap-3">
            <div className="p-2 bg-indigo-100 rounded-xl text-indigo-600">
              <LogIn className="w-6 h-6"/>
            </div>
            Check-In / Check-Out Operations
          </h1>
          <p className="text-[var(--text-disabled)] text-sm mt-1 font-medium">Manage student onboarding (Check-in) and offboarding (Check-out) flows.</p>
        </div>
      </div>

      <div className="bg-card border border-border/60 rounded-2xl shadow-sm flex flex-col flex-1 min-h-0 overflow-hidden">
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 p-2 border-b border-border/50 bg-page/30 shrink-0">
          <button 
            onClick={() => setActiveTab('checkin')}
            className={`px-4 py-2.5 rounded-lg text-sm font-bold transition-colors whitespace-nowrap flex items-center gap-2 ${activeTab === 'checkin' ? 'bg-card text-indigo-600 shadow-sm border border-border/50' : 'text-secondary hover:bg-page hover:text-primary'}`}
          >
            <LogIn className="w-4 h-4" /> Check-In Flow
          </button>
          <button 
            onClick={() => setActiveTab('checkout')}
            className={`px-4 py-2.5 rounded-lg text-sm font-bold transition-colors whitespace-nowrap flex items-center gap-2 ${activeTab === 'checkout' ? 'bg-card text-indigo-600 shadow-sm border border-border/50' : 'text-secondary hover:bg-page hover:text-primary'}`}
          >
            <LogOut className="w-4 h-4" /> Check-Out Flow
          </button>
        </div>

        {/* Tab Content Container */}
        <div className="flex flex-col lg:flex-row flex-1 min-h-0 overflow-hidden">
          
          {/* Left Side: List */}
          <div className="lg:w-1/3 border-r border-border/50 flex flex-col min-h-0">
            <div className="p-4 border-b border-border/50 bg-page/10 shrink-0">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
                <input 
                  type="text" 
                  placeholder={`Search ${activeTab === 'checkin' ? 'approved admissions' : 'check-out requests'}...`} 
                  className="w-full pl-9 pr-4 py-2 bg-input border border-border rounded-lg text-sm font-medium focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {(activeTab === 'checkin' ? CHECKIN_LIST : CHECKOUT_LIST).map(item => (
                <div 
                  key={item.id}
                  onClick={() => {
                    if(activeTab === 'checkin') { setSelectedIn(item); setStepIn(1); setInChecks({}); }
                    else { setSelectedOut(item); setStepOut(1); setOutChecks({}); }
                  }}
                  className={`p-3 rounded-xl cursor-pointer transition-all ${
                    (activeTab === 'checkin' ? selectedIn.id : selectedOut.id) === item.id 
                      ? 'bg-indigo-50 border border-indigo-200 shadow-sm' 
                      : 'bg-transparent border border-transparent hover:bg-page/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-bold text-primary truncate">{item.name}</h4>
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider border ${
                      activeTab === 'checkin' ? 'bg-blue-100 text-blue-700 border-blue-200' : 'bg-orange-100 text-orange-700 border-orange-200'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                  <p className="text-xs text-secondary">Rm {item.room} • Bed {item.bed}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Process Flow */}
          <div className="flex-1 flex flex-col min-h-0 bg-gray-50/30 overflow-y-auto">
            
            {/* CHECK-IN FLOW */}
            {activeTab === 'checkin' && (
              <div className="flex flex-col h-full">
                
                <div className="p-6 border-b border-border/50 bg-card shrink-0">
                  <h2 className="text-xl font-black text-primary leading-tight">{selectedIn.name} <span className="text-sm font-bold text-secondary ml-2 bg-page px-2 py-1 rounded border border-border">Admission ID: {selectedIn.id}</span></h2>
                  <p className="text-sm font-bold text-secondary mt-1">Assigned: Room {selectedIn.room} • Bed {selectedIn.bed}</p>
                </div>

                <div className="p-6 flex-1 space-y-6">
                  
                  {/* Step Tracker */}
                  <div className="flex items-center justify-between relative before:absolute before:inset-0 before:top-1/2 before:-translate-y-1/2 before:h-1 before:bg-border/60 before:-z-10">
                    {[1,2,3,4,5].map(step => (
                      <div key={step} className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-sm transition-all ${
                        stepIn === step ? 'bg-indigo-600 text-white ring-4 ring-indigo-100 dark:ring-indigo-950/50' : 
                        step < stepIn ? 'bg-green-500 text-white' : 'bg-card text-secondary border border-border'
                      }`}>
                        {step < stepIn ? <CheckCircle2 className="w-4 h-4"/> : step}
                      </div>
                    ))}
                  </div>

                  {/* Check-in Forms based on Step */}
                  <div className="bg-card p-6 rounded-2xl border border-border shadow-sm min-h-[300px]">
                    
                    {stepIn === 1 && (
                      <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
                        <h3 className="font-bold text-primary flex items-center gap-2 text-lg"><UserCheck className="w-5 h-5 text-indigo-600"/> 1. Student Verification</h3>
                        <p className="text-sm text-secondary">Verify the student's identity against the approved admission documents.</p>
                        <label className="flex items-center gap-3 p-4 border border-border rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                          <input type="checkbox" checked={inChecks[1]} onChange={(e) => setInChecks(p => ({...p, 1: e.target.checked}))} className="w-5 h-5 rounded border-gray-300 text-indigo-600" />
                          <span className="font-bold text-primary text-sm">I have physically verified the student and ID proofs.</span>
                        </label>
                      </div>
                    )}

                    {stepIn === 2 && (
                      <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
                        <h3 className="font-bold text-primary flex items-center gap-2 text-lg"><Bed className="w-5 h-5 text-indigo-600"/> 2. Room & Bed Confirmation</h3>
                        <p className="text-sm text-secondary">Confirm that the assigned room and bed are ready for check-in.</p>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 bg-page border border-border rounded-xl">
                            <p className="text-xs font-bold text-secondary uppercase">Assigned Room</p>
                            <p className="font-black text-xl text-primary mt-1">{selectedIn.room}</p>
                          </div>
                          <div className="p-4 bg-page border border-border rounded-xl">
                            <p className="text-xs font-bold text-secondary uppercase">Assigned Bed</p>
                            <p className="font-black text-xl text-primary mt-1">{selectedIn.bed}</p>
                          </div>
                        </div>
                        <label className="flex items-center gap-3 p-4 border border-border rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                          <input type="checkbox" checked={inChecks[2]} onChange={(e) => setInChecks(p => ({...p, 2: e.target.checked}))} className="w-5 h-5 rounded border-gray-300 text-indigo-600" />
                          <span className="font-bold text-primary text-sm">Room and Bed are clean, ready, and confirmed.</span>
                        </label>
                      </div>
                    )}

                    {stepIn === 3 && (
                      <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
                        <h3 className="font-bold text-primary flex items-center gap-2 text-lg"><IndianRupee className="w-5 h-5 text-indigo-600"/> 3. Payment & Deposit Verification</h3>
                        <div className="p-4 bg-green-50 border border-green-200 rounded-xl flex items-center justify-between">
                          <div>
                            <p className="font-bold text-green-900">Security Deposit: ₹ 10,000</p>
                            <p className="text-xs text-green-700 mt-0.5">Status: Paid Online</p>
                          </div>
                          <CheckCircle2 className="w-6 h-6 text-green-600" />
                        </div>
                        <div className="p-4 bg-green-50 border border-green-200 rounded-xl flex items-center justify-between">
                          <div>
                            <p className="font-bold text-green-900">First Month Rent: ₹ 8,000</p>
                            <p className="text-xs text-green-700 mt-0.5">Status: Paid Online</p>
                          </div>
                          <CheckCircle2 className="w-6 h-6 text-green-600" />
                        </div>
                        <label className="flex items-center gap-3 p-4 border border-border rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                          <input type="checkbox" checked={inChecks[3]} onChange={(e) => setInChecks(p => ({...p, 3: e.target.checked}))} className="w-5 h-5 rounded border-gray-300 text-indigo-600" />
                          <span className="font-bold text-primary text-sm">Financial clearance verified.</span>
                        </label>
                      </div>
                    )}

                    {stepIn === 4 && (
                      <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
                        <h3 className="font-bold text-primary flex items-center gap-2 text-lg"><Box className="w-5 h-5 text-indigo-600"/> 4. Inventory Handover</h3>
                        <p className="text-sm text-secondary">Assign items to the student from the inventory.</p>
                        <div className="grid grid-cols-2 gap-3">
                          <label className="flex items-center gap-2 p-3 bg-page border border-border rounded-lg"><input type="checkbox" defaultChecked className="rounded text-indigo-600" /><span className="text-sm font-bold">1x Mattress</span></label>
                          <label className="flex items-center gap-2 p-3 bg-page border border-border rounded-lg"><input type="checkbox" defaultChecked className="rounded text-indigo-600" /><span className="text-sm font-bold">1x Pillow</span></label>
                          <label className="flex items-center gap-2 p-3 bg-page border border-border rounded-lg"><input type="checkbox" defaultChecked className="rounded text-indigo-600" /><span className="text-sm font-bold">1x Almirah</span></label>
                          <label className="flex items-center gap-2 p-3 bg-page border border-border rounded-lg"><input type="checkbox" defaultChecked className="rounded text-indigo-600" /><span className="text-sm font-bold">1x Bucket & Mug</span></label>
                        </div>
                        <label className="flex items-center gap-3 p-4 border border-border rounded-xl cursor-pointer hover:bg-gray-50 transition-colors mt-4">
                          <input type="checkbox" checked={inChecks[4]} onChange={(e) => setInChecks(p => ({...p, 4: e.target.checked}))} className="w-5 h-5 rounded border-gray-300 text-indigo-600" />
                          <span className="font-bold text-primary text-sm">All selected inventory items handed over successfully.</span>
                        </label>
                      </div>
                    )}

                    {stepIn === 5 && (
                      <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
                        <h3 className="font-bold text-primary flex items-center gap-2 text-lg"><Key className="w-5 h-5 text-indigo-600"/> 5. Final Handover</h3>
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-bold text-secondary">Room/Cupboard Key Number</label>
                            <input type="text" placeholder="e.g. K-102-B" className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:border-indigo-500" />
                          </div>
                          <div>
                            <label className="text-sm font-bold text-secondary">Sub-meter Reading (Optional)</label>
                            <input type="number" placeholder="Current electricity meter reading" className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:border-indigo-500" />
                          </div>
                          <div>
                            <label className="text-sm font-bold text-secondary">Check-in Remarks</label>
                            <textarea rows={2} placeholder="Any notes..." className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:border-indigo-500 resize-none"></textarea>
                          </div>
                        </div>
                        <label className="flex items-center gap-3 p-4 border border-border rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                          <input type="checkbox" checked={inChecks[5]} onChange={(e) => setInChecks(p => ({...p, 5: e.target.checked}))} className="w-5 h-5 rounded border-gray-300 text-indigo-600" />
                          <span className="font-bold text-primary text-sm">Student has physically moved in. Check-in process complete.</span>
                        </label>
                      </div>
                    )}

                  </div>
                </div>

                {/* Footer Navigation */}
                <div className="p-4 border-t border-border/50 bg-page/30 flex items-center justify-between shrink-0">
                  <button 
                    onClick={handlePrevIn}
                    disabled={stepIn === 1}
                    className="px-6 py-2.5 bg-card border border-border/60 text-secondary hover:text-primary rounded-xl text-sm font-bold shadow-sm transition-all disabled:opacity-50"
                  >
                    Previous
                  </button>
                  
                  {stepIn < 5 ? (
                    <button 
                      onClick={handleNextIn}
                      disabled={!inChecks[stepIn]}
                      className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold shadow-md transition-all flex items-center gap-2 disabled:opacity-50"
                    >
                      Next Step <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button 
                      onClick={handleCompleteCheckIn}
                      disabled={!inChecks[5]}
                      className="px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl text-sm font-bold shadow-md transition-all flex items-center gap-2 disabled:opacity-50"
                    >
                      <CheckCircle2 className="w-4 h-4" /> Complete Check-in (Mark Active)
                    </button>
                  )}
                </div>

              </div>
            )}

            {/* CHECK-OUT FLOW */}
            {activeTab === 'checkout' && (
              <div className="flex flex-col h-full">
                
                <div className="p-6 border-b border-border/50 bg-card shrink-0 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <LogOut className="w-24 h-24 text-orange-600" />
                  </div>
                  <h2 className="text-xl font-black text-primary leading-tight relative z-10">{selectedOut.name} <span className="text-sm font-bold text-secondary ml-2 bg-page px-2 py-1 rounded border border-border">Student ID: {selectedOut.id}</span></h2>
                  <p className="text-sm font-bold text-secondary mt-1 relative z-10">Checking out from: Room {selectedOut.room} • Bed {selectedOut.bed}</p>
                </div>

                <div className="p-6 flex-1 space-y-6">
                  
                  {/* Step Tracker */}
                  <div className="flex items-center justify-between relative before:absolute before:inset-0 before:top-1/2 before:-translate-y-1/2 before:h-1 before:bg-border/60 before:-z-10">
                    {[1,2,3,4,5].map(step => (
                      <div key={step} className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-sm transition-all ${
                        stepOut === step ? 'bg-orange-600 text-white ring-4 ring-orange-100 dark:ring-orange-950/50' : 
                        step < stepOut ? 'bg-green-500 text-white' : 'bg-card text-secondary border border-border'
                      }`}>
                        {step < stepOut ? <CheckCircle2 className="w-4 h-4"/> : step}
                      </div>
                    ))}
                  </div>

                  {/* Check-out Forms */}
                  <div className="bg-card p-6 rounded-2xl border border-border shadow-sm min-h-[300px]">
                    
                    {stepOut === 1 && (
                      <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
                        <h3 className="font-bold text-primary flex items-center gap-2 text-lg"><IndianRupee className="w-5 h-5 text-orange-600"/> 1. Pending Dues Check</h3>
                        <p className="text-sm text-secondary">Check if there are any outstanding operational dues before proceeding.</p>
                        
                        <div className="p-4 bg-green-50 border border-green-200 rounded-xl flex items-center justify-between">
                          <div>
                            <p className="font-bold text-green-900">Current Balance: ₹ 0</p>
                            <p className="text-xs text-green-700 mt-0.5">All regular fees are cleared.</p>
                          </div>
                          <CheckCircle2 className="w-6 h-6 text-green-600" />
                        </div>

                        <label className="flex items-center gap-3 p-4 border border-border rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                          <input type="checkbox" checked={outChecks[1]} onChange={(e) => setOutChecks(p => ({...p, 1: e.target.checked}))} className="w-5 h-5 rounded border-gray-300 text-orange-600" />
                          <span className="font-bold text-primary text-sm">I verify there are no pending operational dues.</span>
                        </label>
                      </div>
                    )}

                    {stepOut === 2 && (
                      <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
                        <h3 className="font-bold text-primary flex items-center gap-2 text-lg"><Search className="w-5 h-5 text-orange-600"/> 2. Room & Meter Inspection</h3>
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-bold text-secondary">Final Sub-meter Reading (Optional)</label>
                            <input type="number" placeholder="Reading at the time of exit" className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:border-orange-500" />
                          </div>
                          <div>
                            <label className="text-sm font-bold text-secondary">Room Condition Note</label>
                            <textarea rows={2} placeholder="e.g. Needs deep cleaning, Wall painted dirty..." className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:border-orange-500 resize-none"></textarea>
                          </div>
                        </div>
                        <label className="flex items-center gap-3 p-4 border border-border rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                          <input type="checkbox" checked={outChecks[2]} onChange={(e) => setOutChecks(p => ({...p, 2: e.target.checked}))} className="w-5 h-5 rounded border-gray-300 text-orange-600" />
                          <span className="font-bold text-primary text-sm">Physical room inspection completed.</span>
                        </label>
                      </div>
                    )}

                    {stepOut === 3 && (
                      <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
                        <h3 className="font-bold text-primary flex items-center gap-2 text-lg"><Box className="w-5 h-5 text-orange-600"/> 3. Inventory & Keys Collection</h3>
                        <p className="text-sm text-secondary">Collect all items assigned to the student.</p>
                        
                        <div className="grid grid-cols-2 gap-3">
                          <label className="flex items-center gap-2 p-3 bg-page border border-border rounded-lg"><input type="checkbox" className="rounded text-orange-600" /><span className="text-sm font-bold line-through text-secondary">1x Mattress (Returned)</span></label>
                          <label className="flex items-center gap-2 p-3 bg-page border border-border rounded-lg"><input type="checkbox" className="rounded text-orange-600" /><span className="text-sm font-bold line-through text-secondary">1x Pillow (Returned)</span></label>
                          <label className="flex items-center gap-2 p-3 bg-page border border-border rounded-lg"><input type="checkbox" className="rounded text-orange-600" /><span className="text-sm font-bold line-through text-secondary">1x Almirah Key (Returned)</span></label>
                          <label className="flex items-center gap-2 p-3 bg-page border border-border rounded-lg"><input type="checkbox" className="rounded text-orange-600" /><span className="text-sm font-bold line-through text-secondary">Room Key (Returned)</span></label>
                        </div>
                        
                        <div className="mt-4">
                          <label className="text-sm font-bold text-red-600">Report Damage / Lost Items (₹)</label>
                          <input type="text" placeholder="e.g. Pillow lost (₹200)" className="w-full px-4 py-2 mt-1 border border-red-200 bg-red-50 rounded-lg focus:outline-none focus:border-red-500" />
                        </div>

                        <label className="flex items-center gap-3 p-4 border border-border rounded-xl cursor-pointer hover:bg-gray-50 transition-colors mt-4">
                          <input type="checkbox" checked={outChecks[3]} onChange={(e) => setOutChecks(p => ({...p, 3: e.target.checked}))} className="w-5 h-5 rounded border-gray-300 text-orange-600" />
                          <span className="font-bold text-primary text-sm">Inventory and Keys collected. Damages recorded.</span>
                        </label>
                      </div>
                    )}

                    {stepOut === 4 && (
                      <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
                        <h3 className="font-bold text-primary flex items-center gap-2 text-lg"><FileText className="w-5 h-5 text-orange-600"/> 4. Prepare Settlement</h3>
                        
                        <div className="bg-gray-50 p-4 rounded-xl border border-border space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-secondary font-medium">Security Deposit</span>
                            <span className="font-bold">₹ 10,000</span>
                          </div>
                          <div className="flex justify-between text-sm text-red-600">
                            <span className="font-medium">Damage Charges (Step 3)</span>
                            <span className="font-bold">- ₹ 0</span>
                          </div>
                          <div className="flex justify-between text-sm text-red-600">
                            <span className="font-medium">Final Electricity Bill</span>
                            <span className="font-bold">- ₹ 450</span>
                          </div>
                          <div className="flex justify-between text-lg font-black border-t border-border pt-2 mt-2">
                            <span>Estimated Refund</span>
                            <span className="text-green-600">₹ 9,550</span>
                          </div>
                        </div>

                        <label className="flex items-center gap-3 p-4 border border-border rounded-xl cursor-pointer hover:bg-gray-50 transition-colors mt-4">
                          <input type="checkbox" checked={outChecks[4]} onChange={(e) => setOutChecks(p => ({...p, 4: e.target.checked}))} className="w-5 h-5 rounded border-gray-300 text-orange-600" />
                          <span className="font-bold text-primary text-sm">Settlement calculation is ready to be sent to Owner.</span>
                        </label>
                      </div>
                    )}

                    {stepOut === 5 && (
                      <div className="space-y-4 animate-in slide-in-from-right-4 duration-300">
                        <h3 className="font-bold text-primary flex items-center gap-2 text-lg"><ShieldAlert className="w-5 h-5 text-orange-600"/> 5. Final Approval & Release</h3>
                        
                        <div className="p-4 bg-orange-50 border border-orange-200 rounded-xl flex items-start gap-3">
                          <ShieldAlert className="w-6 h-6 text-orange-600 shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-bold text-orange-900">Owner Authorization Required for Refund</h4>
                            <p className="text-sm text-orange-800 mt-1">As a manager, you have completed the operational check-out. The final settlement of ₹9,550 will be authorized and disbursed by the Owner.</p>
                          </div>
                        </div>

                        <label className="flex items-center gap-3 p-4 border border-border rounded-xl cursor-pointer hover:bg-gray-50 transition-colors mt-4">
                          <input type="checkbox" checked={outChecks[5]} onChange={(e) => setOutChecks(p => ({...p, 5: e.target.checked}))} className="w-5 h-5 rounded border-gray-300 text-orange-600" />
                          <span className="font-bold text-primary text-sm">Release the bed immediately (make it available for new booking).</span>
                        </label>
                      </div>
                    )}

                  </div>
                </div>

                {/* Footer Navigation */}
                <div className="p-4 border-t border-border/50 bg-page/30 flex items-center justify-between shrink-0">
                  <button 
                    onClick={handlePrevOut}
                    disabled={stepOut === 1}
                    className="px-6 py-2.5 bg-card border border-border/60 text-secondary hover:text-primary rounded-xl text-sm font-bold shadow-sm transition-all disabled:opacity-50"
                  >
                    Previous
                  </button>
                  
                  {stepOut < 5 ? (
                    <button 
                      onClick={handleNextOut}
                      disabled={!outChecks[stepOut]}
                      className="px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-sm font-bold shadow-md transition-all flex items-center gap-2 disabled:opacity-50"
                    >
                      Next Step <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button 
                      onClick={handleCompleteCheckOut}
                      disabled={!outChecks[5]}
                      className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-bold shadow-md transition-all flex items-center gap-2 disabled:opacity-50"
                    >
                      <LogOut className="w-4 h-4" /> Complete Check-out & Send to Owner
                    </button>
                  )}
                </div>

              </div>
            )}
            
          </div>
        </div>
      </div>

    </div>
  );
}