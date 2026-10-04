// @ts-nocheck
'use client';

import React, { useState } from 'react';
import { FolderOpen, FileText, UploadCloud, Eye, Download, RefreshCw, Archive, CheckCircle2, AlertCircle, Clock, ShieldCheck, Building2, Users, Search, Filter, MoreVertical, XCircle, FileImage, File } from 'lucide-react';

const PROPERTY_DOCS = [
  { id: 1, name: 'Trade License 2026', type: 'Licenses', uploadedDate: '15 Jan 2026', expiryDate: '31 Dec 2026', status: 'Verified', fileType: 'pdf' },
  { id: 2, name: 'Property Tax Receipt', type: 'Tax documents', uploadedDate: '10 Mar 2026', expiryDate: 'N/A', status: 'Verified', fileType: 'pdf' },
  { id: 3, name: 'Fire Safety NOC', type: 'Licenses', uploadedDate: '01 Apr 2025', expiryDate: '01 Apr 2026', status: 'Expired', fileType: 'pdf' },
  { id: 4, name: 'Building Insurance', type: 'Insurance', uploadedDate: '20 Sep 2026', expiryDate: '19 Sep 2027', status: 'Pending', fileType: 'img' },
  { id: 5, name: 'Rent Agreement (Landlord)', type: 'Agreement', uploadedDate: '01 Jan 2024', expiryDate: '31 Dec 2028', status: 'Verified', fileType: 'pdf' },
];

const STUDENT_DOCS = [
  { id: 101, studentName: 'Aman Singh (101)', name: 'Aadhar Card Front/Back', type: 'ID proof', uploadedDate: '02 Oct 2026', expiryDate: 'N/A', status: 'Verified', fileType: 'img' },
  { id: 102, studentName: 'Aman Singh (101)', name: 'Passport Size Photo', type: 'Photo', uploadedDate: '02 Oct 2026', expiryDate: 'N/A', status: 'Verified', fileType: 'img' },
  { id: 103, studentName: 'Vikram Patel (205)', name: 'Police Verification', type: 'Other', uploadedDate: '10 Aug 2026', expiryDate: '10 Feb 2027', status: 'Verified', fileType: 'pdf' },
  { id: 104, studentName: 'Rahul Kumar (302)', name: 'Student Agreement', type: 'Agreement', uploadedDate: '03 Oct 2026', expiryDate: '02 Oct 2027', status: 'Pending', fileType: 'pdf' },
  { id: 105, studentName: 'Suresh (401)', name: 'Father Aadhar Card', type: 'Guardian documents', uploadedDate: '15 Sep 2026', expiryDate: 'N/A', status: 'Verified', fileType: 'img' },
];

export default function DocumentsPage() {
  const [activeTab, setActiveTab] = useState<'property' | 'student'>('property');
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Verified':
        return <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full bg-green-100 text-green-700 border border-green-200 flex items-center gap-1 w-max"><CheckCircle2 className="w-3 h-3"/> Verified</span>;
      case 'Pending':
        return <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full bg-yellow-100 text-yellow-700 border border-yellow-200 flex items-center gap-1 w-max"><Clock className="w-3 h-3"/> Pending Approval</span>;
      case 'Expired':
        return <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full bg-red-100 text-red-700 border border-red-200 flex items-center gap-1 w-max"><AlertCircle className="w-3 h-3"/> Expired</span>;
      default:
        return <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full bg-[var(--bg-overlay)] text-secondary border border-border w-max">{status}</span>;
    }
  };

  const getFileIcon = (fileType: string) => {
    if (fileType === 'pdf') return <FileText className="w-8 h-8 text-red-500" />;
    if (fileType === 'img') return <FileImage className="w-8 h-8 text-blue-500" />;
    return <File className="w-8 h-8 text-[var(--text-disabled)]" />;
  };

  const filteredDocs = (activeTab === 'property' ? PROPERTY_DOCS : STUDENT_DOCS).filter((doc: any) => 
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (doc.studentName && doc.studentName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="w-full space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
            <FolderOpen className="w-7 h-7 text-[#F5A623]" />
            Document Vault
          </h1>
          <p className="text-[var(--text-disabled)] text-sm mt-1">Securely manage, verify, and track all PG and Student documents.</p>
        </div>
        
        <button className="flex items-center justify-center gap-2 bg-[#F5A623] hover:bg-[#e09612] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-colors">
          <UploadCloud className="w-5 h-5" /> Upload Document
        </button>
      </div>

      {/* Tabs and Filters */}
      <div className="bg-card p-2 rounded-2xl shadow-sm border border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex w-full md:w-auto bg-[var(--bg-overlay)] p-1 rounded-xl">
          <button 
            onClick={() => setActiveTab('property')}
            className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'property' ? 'bg-card text-blue-600 shadow-sm' : 'text-[var(--text-disabled)] hover:text-secondary'}`}
          >
            <Building2 className="w-4 h-4" /> Property Documents
          </button>
          <button 
            onClick={() => setActiveTab('student')}
            className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'student' ? 'bg-card text-purple-600 shadow-sm' : 'text-[var(--text-disabled)] hover:text-secondary'}`}
          >
            <Users className="w-4 h-4" /> Student Documents
          </button>
        </div>

        <div className="flex w-full md:w-auto items-center gap-3 px-2">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search documents..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-border rounded-xl text-sm focus:outline-none focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623] bg-page"
            />
          </div>
          <button className="p-2 border border-border rounded-xl hover:bg-page text-[var(--text-disabled)] transition-colors tooltip-trigger" title="Filter">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Document Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredDocs.map((doc: any) => (
          <div key={doc.id} className="bg-card rounded-2xl p-5 border border-border/50 shadow-sm hover:shadow-md transition-shadow flex flex-col relative group">
            
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-page rounded-xl border border-border/50">
                  {getFileIcon(doc.fileType)}
                </div>
                <div>
                  <h3 className="font-bold text-primary text-sm truncate max-w-[180px]">{doc.name}</h3>
                  <span className="text-xs font-semibold text-[#F5A623]">{doc.type}</span>
                </div>
              </div>
              <div className="relative">
                <button className="p-1 text-gray-400 hover:text-primary hover:bg-[var(--bg-overlay)] rounded-lg">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>

            {activeTab === 'student' && doc.studentName && (
              <div className="mb-3 px-3 py-2 bg-purple-50 rounded-lg border border-purple-100">
                <span className="text-xs font-semibold text-purple-600 flex items-center gap-1">
                  <Users className="w-3 h-3" /> {doc.studentName}
                </span>
              </div>
            )}

            <div className="grid grid-cols-2 gap-2 text-xs mb-5">
              <div className="flex flex-col">
                <span className="text-gray-400 font-semibold mb-0.5">Uploaded On</span>
                <span className="text-secondary font-bold">{doc.uploadedDate}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-400 font-semibold mb-0.5">Expiry Date</span>
                <span className={`font-bold ${doc.status === 'Expired' ? 'text-red-500' : 'text-secondary'}`}>{doc.expiryDate}</span>
              </div>
            </div>

            <div className="mt-auto flex items-center justify-between pt-4 border-t border-border/50">
              {getStatusBadge(doc.status)}
              
              <div className="flex items-center gap-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg tooltip-trigger" title="View">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg tooltip-trigger" title="Download">
                  <Download className="w-4 h-4" />
                </button>
                <button className="p-1.5 text-orange-600 hover:bg-orange-50 rounded-lg tooltip-trigger" title="Replace">
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button className="p-1.5 text-[var(--text-disabled)] hover:bg-[var(--bg-overlay)] rounded-lg tooltip-trigger" title="Archive">
                  <Archive className="w-4 h-4" />
                </button>
              </div>
            </div>
            
          </div>
        ))}
        
        {filteredDocs.length === 0 && (
          <div className="col-span-full py-16 flex flex-col items-center justify-center text-center bg-card rounded-2xl border border-border/50 border-dashed">
            <FolderOpen className="w-12 h-12 text-gray-300 mb-3" />
            <h3 className="font-bold text-primary text-lg">No documents found</h3>
            <p className="text-[var(--text-disabled)] text-sm">Try adjusting your search or upload a new document.</p>
          </div>
        )}
      </div>
    </div>
  );
}
