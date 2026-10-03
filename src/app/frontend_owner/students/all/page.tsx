// @ts-nocheck
'use client';

import React, { useState } from 'react';
import { Users, Search, Filter, MapPin, Bed, IndianRupee, MoreVertical, ShieldCheck, AlertTriangle, FileText, User, Phone, Mail, GraduationCap, Building2, Wallet, CalendarCheck, Coffee, Settings, Archive, X, ArrowRightLeft, AlertOctagon, BellRing } from 'lucide-react';

const MOCK_STUDENTS = [
  { id: 'STU-1001', name: 'Aman Singh', mobile: '+91 9876543210', email: 'aman@email.com', pg: 'PG Varanasi Main', room: '101', bed: 'Bed A', joinDate: '01 Jan 2026', rent: 8000, due: 0, status: 'Active' },
  { id: 'STU-1002', name: 'Rahul Sharma', mobile: '+91 9123456789', email: 'rahul@email.com', pg: 'PG Varanasi Main', room: '304', bed: 'Bed B', joinDate: '15 Mar 2026', rent: 8000, due: 2000, status: 'Notice Period' },
  { id: 'STU-1003', name: 'Vikram Patel', mobile: '+91 9988776655', email: 'vikram@email.com', pg: 'PG Lanka Branch', room: '205', bed: 'Bed A', joinDate: '10 Feb 2026', rent: 9000, due: 0, status: 'Suspended' },
  { id: 'STU-1004', name: 'Neha Gupta', mobile: '+91 8888777766', email: 'neha@email.com', pg: 'PG Lanka Branch', room: '105', bed: 'Bed C', joinDate: '20 Aug 2025', rent: 9000, due: 0, status: 'Checked Out' },
];

export default function StudentManagementPage() {
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [profileTab, setProfileTab] = useState<'bio' | 'finance' | 'ops' | 'docs'>('bio');

  const openProfile = (student: any) => {
    setSelectedStudent(student);
    setProfileTab('bio');
    setIsProfileModalOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'Active': return <span className="px-2.5 py-1 bg-green-100 text-green-700 rounded-md text-[10px] font-bold uppercase tracking-wider border border-green-200">Active</span>;
      case 'Notice Period': return <span className="px-2.5 py-1 bg-orange-100 text-orange-700 rounded-md text-[10px] font-bold uppercase tracking-wider border border-orange-200">Notice Period</span>;
      case 'Suspended': return <span className="px-2.5 py-1 bg-red-100 text-red-700 rounded-md text-[10px] font-bold uppercase tracking-wider border border-red-200">Suspended</span>;
      case 'Checked Out': return <span className="px-2.5 py-1 bg-[var(--bg-overlay)] text-secondary rounded-md text-[10px] font-bold uppercase tracking-wider border border-border">Checked Out</span>;
      default: return <span className="px-2.5 py-1 bg-blue-100 text-blue-700 rounded-md text-[10px] font-bold uppercase tracking-wider border border-blue-200">{status}</span>;
    }
  };

  const filteredStudents = MOCK_STUDENTS.filter(s => {
    if (filterStatus !== 'All' && s.status !== filterStatus) return false;
    if (searchTerm && !s.name.toLowerCase().includes(searchTerm.toLowerCase()) && !s.id.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* 360 Profile Modal */}
      {isProfileModalOpen && selectedStudent && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl shadow-xl w-full max-w-5xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col h-[90vh]">
            
            {/* Modal Header */}
            <div className="p-5 border-b border-border/50 flex items-start justify-between bg-gradient-to-r from-[#1A3A5C] to-[#2a5a8c] text-white shrink-0">
              <div className="flex gap-4 items-center">
                <div className="w-16 h-16 rounded-2xl bg-card/20 flex items-center justify-center text-2xl font-black backdrop-blur-sm border border-white/30 shadow-inner">
                  {selectedStudent.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-2xl font-bold flex items-center gap-3">
                    {selectedStudent.name} {getStatusBadge(selectedStudent.status)}
                  </h2>
                  <p className="text-blue-100 text-sm mt-1 flex items-center gap-3">
                    <span className="flex items-center gap-1 font-semibold text-white bg-card/10 px-2 py-0.5 rounded-md"><User className="w-3.5 h-3.5"/> {selectedStudent.id}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5"/> {selectedStudent.pg}</span>
                    <span className="flex items-center gap-1"><Bed className="w-3.5 h-3.5"/> Rm {selectedStudent.room} ({selectedStudent.bed})</span>
                  </p>
                </div>
              </div>
              <button onClick={() => setIsProfileModalOpen(false)} className="p-1.5 hover:bg-card/20 rounded-lg transition-colors bg-black/10"><X className="w-5 h-5" /></button>
            </div>
            
            {/* Modal Navigation */}
            <div className="flex bg-page border-b border-border shrink-0 overflow-x-auto">
              <button onClick={() => setProfileTab('bio')} className={`flex items-center gap-2 px-6 py-3 text-sm font-bold transition-all whitespace-nowrap ${profileTab === 'bio' ? 'bg-card text-[#F5A623] border-b-2 border-[#F5A623]' : 'text-[var(--text-disabled)] hover:text-secondary hover:bg-[var(--bg-overlay)]'}`}>
                <User className="w-4 h-4" /> Bio & Contacts
              </button>
              <button onClick={() => setProfileTab('finance')} className={`flex items-center gap-2 px-6 py-3 text-sm font-bold transition-all whitespace-nowrap ${profileTab === 'finance' ? 'bg-card text-green-600 border-b-2 border-green-600' : 'text-[var(--text-disabled)] hover:text-secondary hover:bg-[var(--bg-overlay)]'}`}>
                <Wallet className="w-4 h-4" /> Financial Ledger
              </button>
              <button onClick={() => setProfileTab('ops')} className={`flex items-center gap-2 px-6 py-3 text-sm font-bold transition-all whitespace-nowrap ${profileTab === 'ops' ? 'bg-card text-blue-600 border-b-2 border-blue-600' : 'text-[var(--text-disabled)] hover:text-secondary hover:bg-[var(--bg-overlay)]'}`}>
                <Activity className="w-4 h-4" /> Operations (Logs)
              </button>
              <button onClick={() => setProfileTab('docs')} className={`flex items-center gap-2 px-6 py-3 text-sm font-bold transition-all whitespace-nowrap ${profileTab === 'docs' ? 'bg-card text-purple-600 border-b-2 border-purple-600' : 'text-[var(--text-disabled)] hover:text-secondary hover:bg-[var(--bg-overlay)]'}`}>
                <FileText className="w-4 h-4" /> Documents
              </button>
            </div>

            {/* Modal Content Body */}
            <div className="p-6 overflow-y-auto bg-page/50 flex-1">
              
              {profileTab === 'bio' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in">
                  <div className="bg-card border border-border rounded-xl p-5 shadow-sm space-y-4">
                    <h3 className="text-sm font-bold text-primary border-b border-border/50 pb-2 flex items-center gap-2"><User className="w-4 h-4 text-blue-500" /> Personal & Contact Info</h3>
                    <div className="grid grid-cols-2 gap-y-4 text-sm">
                      <div><p className="text-xs font-bold text-gray-400 uppercase">Mobile</p><p className="font-semibold text-primary flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-gray-400"/> {selectedStudent.mobile}</p></div>
                      <div><p className="text-xs font-bold text-gray-400 uppercase">Email</p><p className="font-semibold text-primary flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-gray-400"/> {selectedStudent.email}</p></div>
                      <div className="col-span-2"><p className="text-xs font-bold text-gray-400 uppercase">Permanent Address</p><p className="font-semibold text-primary">123 Civil Lines, Near Station, Prayagraj, UP 211001</p></div>
                    </div>
                  </div>

                  <div className="bg-card border border-border rounded-xl p-5 shadow-sm space-y-4">
                    <h3 className="text-sm font-bold text-primary border-b border-border/50 pb-2 flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-red-500" /> Guardian & Emergency</h3>
                    <div className="grid grid-cols-1 gap-y-4 text-sm">
                      <div><p className="text-xs font-bold text-gray-400 uppercase">Father / Guardian Name</p><p className="font-semibold text-primary">R.K. Singh</p></div>
                      <div><p className="text-xs font-bold text-gray-400 uppercase">Emergency Contact</p><p className="font-semibold text-red-600 flex items-center gap-1.5"><Phone className="w-3.5 h-3.5"/> +91 9898989898</p></div>
                    </div>
                  </div>

                  <div className="bg-card border border-border rounded-xl p-5 shadow-sm space-y-4">
                    <h3 className="text-sm font-bold text-primary border-b border-border/50 pb-2 flex items-center gap-2"><GraduationCap className="w-4 h-4 text-purple-500" /> Academic / College Info</h3>
                    <div className="grid grid-cols-2 gap-y-4 text-sm">
                      <div><p className="text-xs font-bold text-gray-400 uppercase">College/Institute</p><p className="font-semibold text-primary">BHU Varanasi</p></div>
                      <div><p className="text-xs font-bold text-gray-400 uppercase">Course</p><p className="font-semibold text-primary">B.Tech 3rd Year</p></div>
                    </div>
                  </div>
                </div>
              )}

              {profileTab === 'finance' && (
                <div className="space-y-6 animate-in fade-in">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-card border border-border rounded-xl p-4 shadow-sm">
                      <p className="text-xs font-bold text-gray-400 uppercase">Monthly Rent Fixed</p>
                      <h3 className="text-xl font-black text-primary mt-1">₹{selectedStudent.rent}</h3>
                    </div>
                    <div className="bg-card border border-border rounded-xl p-4 shadow-sm border-l-4 border-green-500">
                      <p className="text-xs font-bold text-gray-400 uppercase">Security Deposit Held</p>
                      <h3 className="text-xl font-black text-green-600 mt-1">₹10,000</h3>
                    </div>
                    <div className={`bg-card border border-border rounded-xl p-4 shadow-sm border-l-4 ${selectedStudent.due > 0 ? 'border-red-500' : 'border-border'}`}>
                      <p className="text-xs font-bold text-gray-400 uppercase">Current Dues</p>
                      <h3 className={`text-xl font-black mt-1 ${selectedStudent.due > 0 ? 'text-red-600' : 'text-primary'}`}>₹{selectedStudent.due}</h3>
                    </div>
                  </div>

                  <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
                    <div className="bg-page px-4 py-3 border-b border-border flex justify-between items-center">
                      <h3 className="text-sm font-bold text-primary flex items-center gap-2"><Wallet className="w-4 h-4 text-green-500" /> Payment History Ledger</h3>
                    </div>
                    <table className="w-full text-left text-sm">
                      <thead className="bg-page text-xs font-bold text-[var(--text-disabled)] uppercase">
                        <tr><th className="p-3">Date</th><th className="p-3">Amount</th><th className="p-3">Mode</th><th className="p-3">Receipt</th></tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 font-semibold text-secondary">
                        <tr><td className="p-3">01 Oct 2026</td><td className="p-3 text-green-600">₹8,000</td><td className="p-3">UPI</td><td className="p-3 text-blue-600 underline cursor-pointer">REC-104</td></tr>
                        <tr><td className="p-3">01 Sep 2026</td><td className="p-3 text-green-600">₹8,000</td><td className="p-3">Cash</td><td className="p-3 text-blue-600 underline cursor-pointer">REC-098</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {profileTab === 'ops' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in fade-in">
                  <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
                    <div className="bg-page px-4 py-3 border-b border-border">
                      <h3 className="text-sm font-bold text-primary flex items-center gap-2"><CalendarCheck className="w-4 h-4 text-blue-500" /> Recent Leave & Outings</h3>
                    </div>
                    <div className="p-4 space-y-3">
                      <div className="flex justify-between items-center border-b border-border/50 pb-3">
                        <div>
                          <p className="text-sm font-bold text-primary">Going Home (Diwali)</p>
                          <p className="text-xs text-[var(--text-disabled)]">20 Oct - 25 Oct 2026</p>
                        </div>
                        <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs font-bold">Approved</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
                    <div className="bg-page px-4 py-3 border-b border-border">
                      <h3 className="text-sm font-bold text-primary flex items-center gap-2"><Settings className="w-4 h-4 text-orange-500" /> Maintenance Complaints</h3>
                    </div>
                    <div className="p-4 space-y-3">
                      <div className="flex justify-between items-center border-b border-border/50 pb-3">
                        <div>
                          <p className="text-sm font-bold text-primary">Fan not working</p>
                          <p className="text-xs text-[var(--text-disabled)]">Filed on 15 Sep 2026</p>
                        </div>
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">Resolved</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {profileTab === 'docs' && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 animate-in fade-in">
                  <div className="border border-border bg-card rounded-xl p-4 flex flex-col items-center justify-center gap-2 hover:border-blue-300 cursor-pointer shadow-sm">
                    <FileText className="w-8 h-8 text-blue-500" />
                    <span className="text-sm font-bold text-primary">Aadhar Card</span>
                    <span className="text-[10px] bg-green-100 text-green-700 px-2 rounded-full font-bold">Verified</span>
                  </div>
                  <div className="border border-border bg-card rounded-xl p-4 flex flex-col items-center justify-center gap-2 hover:border-blue-300 cursor-pointer shadow-sm">
                    <FileText className="w-8 h-8 text-[#F5A623]" />
                    <span className="text-sm font-bold text-primary">Agreement.pdf</span>
                    <span className="text-[10px] bg-green-100 text-green-700 px-2 rounded-full font-bold">Signed</span>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions Bar */}
            <div className="p-4 border-t border-border bg-[var(--bg-overlay)] shrink-0 overflow-x-auto">
              <div className="flex items-center gap-2 min-w-max">
                <span className="text-xs font-bold text-[var(--text-disabled)] uppercase mr-2">Quick Actions:</span>
                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-card border border-border text-secondary rounded-lg text-xs font-bold hover:bg-page shadow-sm"><IndianRupee className="w-3.5 h-3.5 text-green-600"/> Collect Payment</button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-card border border-border text-secondary rounded-lg text-xs font-bold hover:bg-page shadow-sm"><ArrowRightLeft className="w-3.5 h-3.5 text-blue-600"/> Transfer Room</button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-card border border-border text-secondary rounded-lg text-xs font-bold hover:bg-page shadow-sm"><BellRing className="w-3.5 h-3.5 text-yellow-500"/> Send Notice</button>
                <div className="w-px h-5 bg-gray-300 mx-1"></div>
                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 border border-red-200 text-red-700 rounded-lg text-xs font-bold hover:bg-red-100 shadow-sm"><AlertOctagon className="w-3.5 h-3.5"/> Suspend</button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 border border-orange-200 text-orange-700 rounded-lg text-xs font-bold hover:bg-orange-100 shadow-sm"><Archive className="w-3.5 h-3.5"/> Initiate Check-out</button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
            <Users className="w-7 h-7 text-[#F5A623]" />
            Student Management
          </h1>
          <p className="text-[var(--text-disabled)] text-sm mt-1">Unified database of all active students, leavers, and 360° profiles.</p>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card p-4 border border-border/50 rounded-2xl shadow-sm flex items-center gap-4 border-l-4 border-green-500">
          <div className="p-3 bg-green-50 text-green-600 rounded-xl"><User className="w-6 h-6" /></div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">Active Students</p>
            <h3 className="text-2xl font-black text-primary">210</h3>
          </div>
        </div>
        <div className="bg-card p-4 border border-border/50 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-orange-50 text-orange-600 rounded-xl"><AlertTriangle className="w-6 h-6" /></div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">On Notice Period</p>
            <h3 className="text-2xl font-black text-primary">12</h3>
          </div>
        </div>
        <div className="bg-card p-4 border border-border/50 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-red-50 text-red-600 rounded-xl"><IndianRupee className="w-6 h-6" /></div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">Rent Defaulters</p>
            <h3 className="text-2xl font-black text-red-600">8</h3>
          </div>
        </div>
        <div className="bg-card p-4 border border-border/50 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-[var(--bg-overlay)] text-secondary rounded-xl"><Archive className="w-6 h-6" /></div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">Checked Out YTD</p>
            <h3 className="text-2xl font-black text-primary">45</h3>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-card rounded-2xl shadow-sm border border-border/50 overflow-hidden min-h-[500px] flex flex-col">
        
        {/* Top Bar: Tabs & Filters */}
        <div className="p-4 border-b border-border/50 bg-page/50 flex flex-col lg:flex-row justify-between gap-4 shrink-0">
          <div className="flex bg-[var(--bg-overlay)] p-1 rounded-xl w-full md:w-max overflow-x-auto">
            {['All', 'Active', 'Notice Period', 'Suspended', 'Checked Out'].map(status => (
              <button 
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${filterStatus === status ? 'bg-card text-[#1A3A5C] shadow-sm' : 'text-[var(--text-disabled)] hover:text-secondary'}`}
              >
                {status}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-3 w-full lg:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search by Name or ID..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 border border-border rounded-xl text-sm focus:outline-none focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623] bg-card"
              />
            </div>
          </div>
        </div>

        {/* Dynamic Table Content */}
        <div className="flex-1 overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-page border-b border-border/50 text-[var(--text-disabled)] text-xs uppercase tracking-wider font-bold">
                <th className="p-5">Student Info</th>
                <th className="p-5">Assigned PG & Room</th>
                <th className="p-5">Joining Date</th>
                <th className="p-5">Rent & Dues</th>
                <th className="p-5 text-center">Status</th>
                <th className="p-5 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-page/50 transition-colors">
                  <td className="p-5">
                    <div className="flex gap-4 items-center">
                      <div className="w-10 h-10 rounded-xl bg-[var(--bg-overlay)] text-secondary font-black flex items-center justify-center border border-border shrink-0">
                        {student.name.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-primary text-sm flex items-center gap-2">
                          {student.name}
                        </span>
                        <span className="text-[10px] text-gray-400 font-bold border border-border px-1 rounded bg-page mt-1 w-max">{student.id}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-5">
                    <div className="flex flex-col gap-1.5">
                      <span className="flex items-center gap-1.5 text-sm font-bold text-secondary"><MapPin className="w-4 h-4 text-blue-500" /> {student.pg}</span>
                      <span className="flex items-center gap-1.5 text-xs font-semibold text-[var(--text-disabled)] ml-5"><Bed className="w-3.5 h-3.5" /> Rm {student.room} ({student.bed})</span>
                    </div>
                  </td>
                  <td className="p-5">
                    <span className="text-sm font-semibold text-secondary">{student.joinDate}</span>
                  </td>
                  <td className="p-5">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-bold text-primary flex items-center gap-1"><IndianRupee className="w-3.5 h-3.5 text-gray-400"/> {student.rent}/mo</span>
                      {student.due > 0 ? (
                        <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-100 w-max mt-0.5">Due: ₹{student.due}</span>
                      ) : (
                        <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded border border-green-100 w-max mt-0.5">Cleared</span>
                      )}
                    </div>
                  </td>
                  <td className="p-5 text-center">
                    <div className="flex justify-center">
                      {getStatusBadge(student.status)}
                    </div>
                  </td>
                  <td className="p-5 text-center">
                    <button onClick={() => openProfile(student)} className="px-4 py-2 bg-card border border-border hover:border-[#1A3A5C] hover:text-[#1A3A5C] text-secondary rounded-xl text-sm font-bold shadow-sm transition-colors flex items-center justify-center gap-2 mx-auto w-max">
                      View Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredStudents.length === 0 && (
            <div className="p-16 flex flex-col items-center justify-center text-center">
              <User className="w-12 h-12 text-gray-200 mb-4" />
              <h3 className="text-lg font-bold text-primary mb-1">No students found</h3>
              <p className="text-[var(--text-disabled)] text-sm">No records match your selected status or search term.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
// 94>thought
// CRITICAL INSTRUCTION 1: ...
// CRITICAL INSTRUCTION 2: ...
function Activity(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>;
}
