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

export default function CheckedOutPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filterByTitle = title;
  
  const filteredStudents = MOCK_STUDENTS.filter(student => {
    if (filterByTitle !== 'All' && student.status !== filterByTitle) return false;
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
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary flex items-center gap-2"><Users className="w-6 h-6 text-blue-500"/> Checked Out Students</h1>
          <p className="text-[var(--text-disabled)] text-sm mt-1">Manage all checked out students across properties.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-card hover:bg-page border border-border text-primary px-4 py-2 rounded-xl text-sm font-bold shadow-sm transition-colors">
            <Download className="w-4 h-4" /> Export
          </button>
          <button className="flex items-center gap-2 bg-[#1A3A5C] hover:bg-[#122a42] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-colors">
            <Plus className="w-4 h-4" /> Add Student
          </button>
        </div>
      </div>

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
            <button className="flex items-center gap-2 px-3 py-2 bg-input border border-border rounded-xl text-sm font-semibold text-secondary hover:text-primary transition-colors">
              <Filter className="w-4 h-4" /> Filters
            </button>
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
