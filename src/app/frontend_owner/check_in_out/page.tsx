'use client';

import React, { useState } from 'react';
import { 
  LogOut, LogIn, ArrowRight, CheckCircle2, 
  XCircle, Clock, Search, MapPin, Key, 
  Bed, FileText, Zap, ShieldCheck, FileWarning,
  Wallet, AlertTriangle, UserCheck, X
} from 'lucide-react';

const MOCK_CHECKINS = [
  { id: 'ADM-099', name: 'Rohan Gupta', phone: '+91 9876543210', pg: 'PG Varanasi Main', expectedDate: '05 Oct 2026', docsVerified: true, paymentVerified: true, status: 'Ready for Check-in' },
  { id: 'ADM-102', name: 'Priya Sharma', phone: '+91 9123456789', pg: 'PG Lanka Branch', expectedDate: '06 Oct 2026', docsVerified: false, paymentVerified: true, status: 'Pending Docs' },
];

const MOCK_CHECKOUTS = [
  { id: 'CHK-045', name: 'Rahul Verma', room: '304', pg: 'PG Varanasi Main', noticeDate: '01 Sep 2026', checkoutDate: '01 Oct 2026', dues: 2000, inspection: 'Pending', status: 'Notice Period' },
  { id: 'CHK-044', name: 'Sneha Pandey', room: '105', pg: 'PG Lanka Branch', noticeDate: '15 Sep 2026', checkoutDate: '15 Oct 2026', dues: 0, inspection: 'Cleared', status: 'Ready to Leave' },
];

export default function CheckInOutPage() {
  const [activeTab, setActiveTab] = useState<'checkin' | 'checkout'>('checkin');
  const [searchTerm, setSearchTerm] = useState('');
  
  const [isCheckinModalOpen, setIsCheckinModalOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

  const openCheckin = (student: any) => {
    setSelectedStudent(student);
    setIsCheckinModalOpen(true);
  };

  const openCheckout = (student: any) => {
    setSelectedStudent(student);
    setIsCheckoutModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* Check-in Modal Overlay */}
      {isCheckinModalOpen && selectedStudent && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-blue-50 shrink-0">
              <h2 className="text-xl font-bold flex items-center gap-2 text-blue-800">
                <LogIn className="w-5 h-5 text-blue-600" /> Process Room Handover & Check-in
              </h2>
              <button onClick={() => setIsCheckinModalOpen(false)} className="p-1.5 hover:bg-white rounded-lg transition-colors"><X className="w-5 h-5" /></button>
            </div>
            
            <div className="p-6 space-y-8 overflow-y-auto bg-white">
              
              {/* Flow Visualizer */}
              <div className="flex items-center justify-between px-4 pb-2">
                <div className="flex flex-col items-center gap-2 w-1/4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${selectedStudent.docsVerified ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}><FileText className="w-4 h-4"/></div>
                  <span className="text-[10px] font-bold text-gray-500 uppercase text-center leading-tight">Docs<br/>Verified</span>
                </div>
                <div className={`flex-1 h-0.5 mx-2 ${selectedStudent.docsVerified ? 'bg-green-200' : 'bg-gray-200'}`}></div>
                <div className="flex flex-col items-center gap-2 w-1/4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${selectedStudent.paymentVerified ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}><Wallet className="w-4 h-4"/></div>
                  <span className="text-[10px] font-bold text-gray-500 uppercase text-center leading-tight">Payment<br/>Verified</span>
                </div>
                <div className={`flex-1 h-0.5 mx-2 ${selectedStudent.paymentVerified ? 'bg-blue-200' : 'bg-gray-200'}`}></div>
                <div className="flex flex-col items-center gap-2 w-1/4">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md border-2 border-blue-200"><Key className="w-4 h-4"/></div>
                  <span className="text-[10px] font-bold text-blue-600 uppercase text-center leading-tight">Room<br/>Handover</span>
                </div>
              </div>

              {!selectedStudent.docsVerified && (
                <div className="bg-red-50 border border-red-200 p-4 rounded-xl flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-red-800">Cannot Process Check-in</h4>
                    <p className="text-xs text-red-600 mt-1">Pending KYC Documents. Please verify student documents in the Admissions module before handing over the room.</p>
                  </div>
                </div>
              )}

              {selectedStudent.docsVerified && selectedStudent.paymentVerified && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-bold text-gray-800 border-b border-gray-100 pb-2 mb-4 flex items-center gap-2">
                        <Bed className="w-4 h-4 text-purple-500" /> Assignment & Keys
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Check-in Date & Time</label>
                          <input type="datetime-local" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold focus:outline-none focus:border-blue-500" />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Assign Bed / Room</label>
                          <select className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold focus:outline-none focus:border-blue-500">
                            <option>Room 101 - Bed A</option>
                            <option>Room 205 - Bed B</option>
                          </select>
                        </div>
                        <div className="pt-2">
                          <label className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
                            <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                            <span className="text-sm font-bold text-gray-800 flex items-center gap-2"><Key className="w-4 h-4 text-yellow-500" /> Physical Room/Cupboard Keys Handed Over</span>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-gray-800 border-b border-gray-100 pb-2 mb-4 flex items-center gap-2">
                        <Zap className="w-4 h-4 text-yellow-500" /> Inventory & Meters
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Initial Electricity Meter Reading</label>
                          <div className="relative">
                            <input type="number" placeholder="0" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold focus:outline-none focus:border-blue-500 pr-12" />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">kWh</span>
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Inventory Checked & Assigned</label>
                          <div className="grid grid-cols-2 gap-2">
                            {['Bed/Frame', 'Mattress', 'Study Table', 'Chair', 'Cupboard', 'Dustbin'].map(item => (
                              <label key={item} className="flex items-center gap-2 text-sm font-semibold text-gray-600 bg-gray-50 p-2 rounded-lg cursor-pointer hover:bg-gray-100 border border-transparent hover:border-gray-200 transition-colors">
                                <input type="checkbox" defaultChecked className="rounded text-blue-600 focus:ring-blue-500" /> {item}
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

            </div>
            
            <div className="p-5 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 shrink-0">
              <button onClick={() => setIsCheckinModalOpen(false)} className="px-6 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-100 transition-colors">Cancel</button>
              <button 
                disabled={!selectedStudent.docsVerified}
                onClick={() => { alert('Check-in Complete! Student Profile Activated.'); setIsCheckinModalOpen(false); }} 
                className={`px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-colors shadow-sm ${selectedStudent.docsVerified ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
              >
                <CheckCircle2 className="w-4 h-4" /> Confirm & Complete Check-in
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Check-out Modal Overlay */}
      {isCheckoutModalOpen && selectedStudent && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-orange-50 shrink-0">
              <h2 className="text-xl font-bold flex items-center gap-2 text-orange-800">
                <LogOut className="w-5 h-5 text-orange-600" /> Process Final Check-out
              </h2>
              <button onClick={() => setIsCheckoutModalOpen(false)} className="p-1.5 hover:bg-white rounded-lg transition-colors"><X className="w-5 h-5" /></button>
            </div>
            
            <div className="p-6 space-y-8 overflow-y-auto bg-white">
              
              {/* Checkout Flow Visualizer */}
              <div className="flex items-center justify-between px-4 pb-2">
                <div className="flex flex-col items-center gap-2 w-1/4">
                  <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center"><FileWarning className="w-4 h-4"/></div>
                  <span className="text-[10px] font-bold text-gray-500 uppercase text-center leading-tight">Notice<br/>Approved</span>
                </div>
                <div className="flex-1 h-0.5 mx-2 bg-green-200"></div>
                <div className="flex flex-col items-center gap-2 w-1/4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${selectedStudent.inspection === 'Cleared' ? 'bg-green-100 text-green-600' : 'bg-[#1A3A5C] text-white shadow-md'}`}><Search className="w-4 h-4"/></div>
                  <span className={`text-[10px] font-bold uppercase text-center leading-tight ${selectedStudent.inspection === 'Cleared' ? 'text-gray-500' : 'text-[#1A3A5C]'}`}>Room<br/>Inspection</span>
                </div>
                <div className={`flex-1 h-0.5 mx-2 ${selectedStudent.inspection === 'Cleared' ? 'bg-green-200' : 'bg-gray-200'}`}></div>
                <div className="flex flex-col items-center gap-2 w-1/4">
                  <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 text-gray-400 flex items-center justify-center"><ShieldCheck className="w-4 h-4"/></div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase text-center leading-tight">Deposit<br/>Settlement</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-bold text-gray-800 border-b border-gray-100 pb-2 mb-4 flex items-center gap-2">
                    <Search className="w-4 h-4 text-blue-500" /> Physical Inspection
                  </h3>
                  <div className="space-y-4">
                    <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input type="checkbox" className="w-5 h-5 mt-0.5 rounded border-gray-300 text-orange-600 focus:ring-orange-500" />
                        <div>
                          <span className="text-sm font-bold text-gray-800">Inventory Checked & Intact</span>
                          <p className="text-[10px] text-gray-500 leading-tight mt-1">Bed, Mattress, Chair, Table verified against initial handover list.</p>
                        </div>
                      </label>
                    </div>
                    <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input type="checkbox" className="w-5 h-5 mt-0.5 rounded border-gray-300 text-orange-600 focus:ring-orange-500" />
                        <div>
                          <span className="text-sm font-bold text-gray-800">Room Keys Returned</span>
                          <p className="text-[10px] text-gray-500 leading-tight mt-1">Physical keys for room and cupboard handed back to manager.</p>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-gray-800 border-b border-gray-100 pb-2 mb-4 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-500" /> Meter & Damages
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Final Electricity Meter Reading</label>
                      <div className="relative">
                        <input type="number" placeholder="Enter reading" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold focus:outline-none focus:border-orange-500 pr-12" />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">kWh</span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Damage Notes / Charges Needed?</label>
                      <textarea rows={2} placeholder="e.g. Broken mirror, charge ₹500 from deposit" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-orange-500 resize-none"></textarea>
                    </div>
                  </div>
                </div>
              </div>

              {selectedStudent.dues > 0 && (
                <div className="bg-red-50 border border-red-200 p-4 rounded-xl flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-red-800">Pending Rent/Dues Detected</h4>
                    <p className="text-xs text-red-600 mt-1">Student has outstanding dues of ₹{selectedStudent.dues}. This must be adjusted during the Security Deposit settlement.</p>
                  </div>
                </div>
              )}
              
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl text-center">
                <p className="text-sm font-bold text-gray-700">Next Step: Security Deposit Settlement</p>
                <p className="text-xs text-gray-500 mt-1">After confirming this physical check-out, you will need to process their security deposit refund.</p>
              </div>

            </div>
            
            <div className="p-5 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 shrink-0">
              <button onClick={() => setIsCheckoutModalOpen(false)} className="px-6 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-100 transition-colors">Cancel</button>
              <button 
                onClick={() => { alert('Check-out Logged! Redirecting to Security Deposit module for final refund settlement.'); setIsCheckoutModalOpen(false); }} 
                className="px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-bold flex items-center gap-2 transition-colors shadow-sm"
              >
                Confirm Physical Check-out <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <LogIn className="w-7 h-7 text-blue-600" />
            Check-in & Check-out Operations
          </h1>
          <p className="text-gray-500 text-sm mt-1">Manage physical room handovers, inventory checks, and notice periods.</p>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 border border-gray-100 rounded-2xl shadow-sm flex items-center gap-4 border-l-4 border-blue-500">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><LogIn className="w-6 h-6" /></div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">Pending Check-ins</p>
            <h3 className="text-2xl font-black text-gray-800">2</h3>
          </div>
        </div>
        <div className="bg-white p-4 border border-gray-100 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-orange-50 text-orange-600 rounded-xl"><LogOut className="w-6 h-6" /></div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">Pending Check-outs</p>
            <h3 className="text-xl font-black text-gray-800">2</h3>
          </div>
        </div>
        <div className="bg-white p-4 border border-gray-100 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-red-50 text-red-600 rounded-xl"><FileWarning className="w-6 h-6" /></div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">Active Notices</p>
            <h3 className="text-2xl font-black text-gray-800">2</h3>
          </div>
        </div>
        <div className="bg-white p-4 border border-gray-100 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-green-50 text-green-600 rounded-xl"><Bed className="w-6 h-6" /></div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">Ready to Handover</p>
            <h3 className="text-2xl font-black text-green-600">5 Beds</h3>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden min-h-[500px] flex flex-col">
        
        {/* Top Bar: Tabs & Filters */}
        <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex flex-col lg:flex-row justify-between gap-4 shrink-0">
          <div className="flex bg-gray-100 p-1 rounded-xl w-full md:w-max">
            <button 
              onClick={() => setActiveTab('checkin')}
              className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'checkin' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <LogIn className="w-4 h-4" /> Check-in Queue
            </button>
            <button 
              onClick={() => setActiveTab('checkout')}
              className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'checkout' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <LogOut className="w-4 h-4" /> Check-out & Notices
            </button>
          </div>
        </div>

        {/* Dynamic Table Content */}
        <div className="flex-1 overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-xs uppercase tracking-wider font-bold">
                {activeTab === 'checkout' && <th className="p-5 w-24 text-center">Room</th>}
                <th className="p-5">Student Info</th>
                <th className="p-5">Assigned Property</th>
                <th className="p-5 text-center">Status / Milestones</th>
                <th className="p-5 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              
              {/* CHECK-IN QUEUE */}
              {activeTab === 'checkin' && MOCK_CHECKINS.map((record) => (
                <tr key={record.id} className="hover:bg-blue-50/20 transition-colors">
                  <td className="p-5">
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-800 text-sm">{record.name}</span>
                      <span className="text-xs font-semibold text-gray-500 mt-0.5">{record.phone}</span>
                    </div>
                  </td>
                  <td className="p-5">
                    <span className="flex items-center gap-1.5 text-sm font-bold text-gray-700"><MapPin className="w-4 h-4 text-blue-500" /> {record.pg}</span>
                  </td>
                  <td className="p-5 text-center">
                    <div className="flex items-center justify-center gap-3">
                      <span className={`flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${record.docsVerified ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-red-100 text-red-700 border border-red-200'}`}>
                        <FileText className="w-3 h-3" /> Docs
                      </span>
                      <span className={`flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${record.paymentVerified ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-red-100 text-red-700 border border-red-200'}`}>
                        <Wallet className="w-3 h-3" /> Payment
                      </span>
                    </div>
                  </td>
                  <td className="p-5 text-center">
                    <button onClick={() => openCheckin(record)} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold shadow-sm transition-colors flex items-center justify-center gap-2 mx-auto w-max">
                      <LogIn className="w-4 h-4" /> Process Check-in
                    </button>
                  </td>
                </tr>
              ))}

              {/* CHECK-OUT QUEUE */}
              {activeTab === 'checkout' && MOCK_CHECKOUTS.map((record) => (
                <tr key={record.id} className="hover:bg-orange-50/20 transition-colors">
                  <td className="p-5 text-center"><span className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center font-black text-gray-800 mx-auto">{record.room}</span></td>
                  <td className="p-5">
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-800 text-sm">{record.name}</span>
                      <span className="text-xs font-semibold text-gray-500 mt-0.5">Notice: {record.noticeDate}</span>
                    </div>
                  </td>
                  <td className="p-5">
                    <span className="flex items-center gap-1.5 text-sm font-bold text-gray-700"><MapPin className="w-4 h-4 text-orange-500" /> {record.pg}</span>
                  </td>
                  <td className="p-5 text-center">
                    <div className="flex items-center justify-center gap-3">
                      <span className="flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-red-50 text-red-700 border border-red-200">
                        Exit: {record.checkoutDate}
                      </span>
                      {record.dues > 0 && (
                        <span className="flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-orange-100 text-orange-700 border border-orange-200">
                          <AlertTriangle className="w-3 h-3" /> Dues: ₹{record.dues}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-5 text-center">
                    <button onClick={() => openCheckout(record)} className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-sm font-bold shadow-sm transition-colors flex items-center justify-center gap-2 mx-auto w-max">
                      <LogOut className="w-4 h-4" /> Process Check-out
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
