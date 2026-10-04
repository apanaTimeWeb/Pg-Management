// @ts-nocheck
'use client';

import React, { useState } from 'react';
import { Search, Filter, Plus, MoreVertical, FileText, Download, Eye, Edit3, Trash2, Users, MapPin, Bed, Phone } from 'lucide-react';

const MOCK_STUDENTS = [
  { id: 'STU-1001', name: 'Aman Singh', mobile: '+91 9876543210', pg: 'PG Varanasi Main', room: '101', bed: 'Bed A', joinDate: '01 Jan 2026', status: 'Active' },
  { id: 'STU-1002', name: 'Rahul Sharma', mobile: '+91 9123456789', pg: 'PG Varanasi Main', room: '304', bed: 'Bed B', joinDate: '15 Mar 2026', status: 'Notice Period' },
  { id: 'STU-1003', name: 'Vikram Patel', mobile: '+91 9988776655', pg: 'PG Lanka Branch', room: '205', bed: 'Bed A', joinDate: '10 Feb 2026', status: 'Pending' },
  { id: 'STU-1004', name: 'Neha Gupta', mobile: '+91 8888777766', pg: 'PG Lanka Branch', room: '105', bed: 'Bed C', joinDate: '20 Aug 2025', status: 'Checked Out' },
];

export default function PendingPage() {
  const [students, setStudents] = useState(MOCK_STUDENTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Pending');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const filteredStudents = students.filter(student => {
    if (statusFilter !== 'All' && student.status !== statusFilter) return false;
    if (searchTerm && !student.name.toLowerCase().includes(searchTerm.toLowerCase()) && !student.id.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const getStatusBadge = (status: string) => {
    if (status === 'Active') return 'bg-green-100 text-green-700 border-green-200';
    if (status === 'Notice Period') return 'bg-orange-100 text-orange-700 border-orange-200';
    if (status === 'Pending') return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    if (status === 'Checked Out') return 'bg-gray-100 text-gray-700 border-gray-200';
    return 'bg-blue-100 text-blue-700 border-blue-200';
  };

  return (
    <div className="w-full space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary flex items-center gap-2"><Users className="w-6 h-6 text-blue-500"/> Pending Students</h1>
          <p className="text-[var(--text-disabled)] text-sm mt-1">Manage all pending students across properties.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-card hover:bg-page border border-border text-primary px-4 py-2 rounded-xl text-sm font-bold shadow-sm transition-colors">
            <Download className="w-4 h-4" /> Export
          </button>
          <button onClick={() => setIsAddModalOpen(true)} className="flex items-center gap-2 bg-[#1A3A5C] hover:bg-[#122a42] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-colors">
            <Plus className="w-4 h-4" /> Add Student
          </button>
        </div>
      </div>

      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-5 border-b border-border/50 flex items-center justify-between bg-[#1A3A5C] text-white">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Plus className="w-5 h-5 text-[#F5A623]" /> Add New Student
              </h2>
              <button onClick={() => setIsAddModalOpen(false)} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors">X</button>
            </div>
            <div className="p-6 space-y-4 bg-page/50">
              <div>
                <label className="block text-xs font-bold text-secondary uppercase mb-2">Student Name</label>
                <input type="text" placeholder="e.g. Rahul Sharma" className="w-full px-4 py-2 bg-card border border-border rounded-xl focus:outline-none focus:border-[#F5A623] text-sm font-bold" />
              </div>
              <div>
                <label className="block text-xs font-bold text-secondary uppercase mb-2">Mobile Number</label>
                <input type="text" placeholder="e.g. +91 9876543210" className="w-full px-4 py-2 bg-card border border-border rounded-xl focus:outline-none focus:border-[#F5A623] text-sm font-bold" />
              </div>
            </div>
            <div className="p-5 border-t border-border/50 bg-card flex justify-end gap-3">
              <button onClick={() => setIsAddModalOpen(false)} className="px-5 py-2 bg-[var(--bg-overlay)] text-secondary rounded-xl font-bold hover:bg-gray-200 transition-colors">Cancel</button>
              <button onClick={() => { 
                setStudents([...students, {
                  id: `STU-100${students.length + 1}`, name: 'New Student', mobile: '+91 0000000000', pg: 'Main', room: '100', bed: 'Bed A', joinDate: '01 Oct 2026', status: 'Pending'
                }]);
                setIsAddModalOpen(false); 
              }} className="px-5 py-2 bg-[#1A3A5C] text-white rounded-xl font-bold">Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Card */}
      <div className="bg-card border border-border/50 rounded-2xl shadow-sm overflow-hidden">
        
        {/* Toolbar */}
        <div className="p-4 border-b border-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-page/50">
          <div className="relative max-w-md w-full">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
            <input 
              type="text" 
              placeholder="Search by name or ID..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-input border border-border rounded-xl text-sm focus:outline-none focus:border-[#F5A623] text-primary transition-colors"
            />
          </div>
          <div className="flex items-center gap-2">
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 bg-input border border-border rounded-xl text-sm font-semibold text-secondary focus:outline-none focus:border-[#F5A623]"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Notice Period">Notice Period</option>
              <option value="Checked Out">Checked Out</option>
            </select>
          </div>
        </div>

        {/* Table View */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border/50 bg-page/30 text-[10px] uppercase tracking-wider text-secondary">
                <th className="p-4 font-bold">Student Profile</th>
                <th className="p-4 font-bold">Contact</th>
                <th className="p-4 font-bold">Accommodation</th>
                <th className="p-4 font-bold">Join Date</th>
                <th className="p-4 font-bold">Status</th>
                <th className="p-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {filteredStudents.map((student, idx) => (
                <tr key={idx} className="hover:bg-page/30 transition-colors group">
                  <td className="p-4">
                    <p className="text-sm font-bold text-primary">{student.name}</p>
                    <p className="text-xs font-semibold text-secondary mt-0.5">{student.id}</p>
                  </td>
                  <td className="p-4 text-sm text-secondary font-medium">
                    <p className="flex items-center gap-1"><Phone className="w-3.5 h-3.5"/> {student.mobile}</p>
                  </td>
                  <td className="p-4 text-sm font-medium text-secondary">
                    <p className="flex items-center gap-1 text-primary font-bold"><Bed className="w-3.5 h-3.5 text-[#F5A623]"/> Rm {student.room} ({student.bed})</p>
                    <p className="flex items-center gap-1 mt-0.5 text-xs"><MapPin className="w-3 h-3"/> {student.pg}</p>
                  </td>
                  <td className="p-4 text-sm text-secondary font-medium">{student.joinDate}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 border rounded-md text-[10px] font-bold uppercase tracking-wide ${getStatusBadge(student.status)}`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-secondary hover:text-blue-600 bg-page rounded-lg border border-border"><Eye className="w-4 h-4" /></button>
                      <button className="p-1.5 text-secondary hover:text-orange-600 bg-page rounded-lg border border-border"><Edit3 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredStudents.length === 0 && (
                <tr><td colSpan="6" className="p-8 text-center text-secondary font-medium">No records found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
        
      </div>
    </div>
  );
}
