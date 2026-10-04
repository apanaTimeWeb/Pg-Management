// @ts-nocheck
'use client';

import React, { useState } from 'react';
import { 
  FolderOpen, Search, Filter, CheckCircle2, AlertTriangle, 
  Eye, Upload, MessageSquare, Trash2, FileText, FileImage, 
  Lock, X, ChevronRight, User
} from 'lucide-react';

type DocStatus = 'Verified' | 'Pending' | 'Missing' | 'Correction Requested';

interface StudentDoc {
  type: string;
  name: string;
  status: DocStatus;
  date?: string;
  note?: string;
}

const DUMMY_STUDENTS = [
  { id: 'S001', name: 'Rahul Sharma', room: '101', status: 'Pending Verification', docsCount: '3/6 Verified' },
  { id: 'S002', name: 'Amit Kumar', room: '105', status: 'All Verified', docsCount: '6/6 Verified' },
  { id: 'S003', name: 'Vikas Singh', room: '204', status: 'Action Required', docsCount: '4/6 Verified (1 Missing)' },
  { id: 'S004', name: 'Suresh Patel', room: '302', status: 'Pending Verification', docsCount: '2/6 Verified' },
];

const INITIAL_DOCS: StudentDoc[] = [
  { type: 'Photo', name: 'Passport Size Photo', status: 'Verified', date: '01 Oct 2026' },
  { type: 'ID Proof', name: 'Aadhar Card Front & Back', status: 'Pending', date: '02 Oct 2026' },
  { type: 'Address Proof', name: 'Electricity Bill', status: 'Correction Requested', date: '02 Oct 2026', note: 'Image is too blurry, please upload a clear scanned copy.' },
  { type: 'Admission Form', name: 'Signed Admission Form', status: 'Verified', date: '01 Oct 2026' },
  { type: 'Agreement', name: 'Rent Agreement', status: 'Missing' },
  { type: 'Guardian Details', name: 'Guardian ID Proof', status: 'Pending', date: '03 Oct 2026' },
];

export default function ManagerDocumentsMain() {
  const [selectedStudent, setSelectedStudent] = useState(DUMMY_STUDENTS[0]);
  const [documents, setDocuments] = useState<StudentDoc[]>(INITIAL_DOCS);
  const [searchTerm, setSearchTerm] = useState('');

  // Modal State
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedDocToView, setSelectedDocToView] = useState<StudentDoc | null>(null);

  const handleVerify = (docName: string) => {
    setDocuments(docs => docs.map(d => d.name === docName ? { ...d, status: 'Verified' } : d));
  };

  const handleRequestCorrection = (docName: string) => {
    const note = window.prompt("Enter reason for correction:");
    if (note) {
      setDocuments(docs => docs.map(d => d.name === docName ? { ...d, status: 'Correction Requested', note } : d));
    }
  };

  const handleAddNote = (docName: string) => {
    const note = window.prompt("Enter note for this document:");
    if (note) {
      setDocuments(docs => docs.map(d => d.name === docName ? { ...d, note } : d));
    }
  };

  const openViewModal = (doc: StudentDoc) => {
    if (doc.status === 'Missing') return;
    setSelectedDocToView(doc);
    setViewModalOpen(true);
  };

  const getStatusBadge = (status: DocStatus) => {
    switch(status) {
      case 'Verified': return <span className="px-2.5 py-1 bg-green-100 text-green-700 rounded-md text-xs font-bold border border-green-200">Verified</span>;
      case 'Pending': return <span className="px-2.5 py-1 bg-orange-100 text-orange-700 rounded-md text-xs font-bold border border-orange-200">Pending Review</span>;
      case 'Missing': return <span className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-bold border border-gray-200">Missing</span>;
      case 'Correction Requested': return <span className="px-2.5 py-1 bg-red-100 text-red-700 rounded-md text-xs font-bold border border-red-200">Correction Req.</span>;
    }
  };

  return (
    <div className="p-4 md:p-8 space-y-6 animate-in fade-in duration-500 w-full h-[calc(100vh-4rem)] flex flex-col">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-black text-primary flex items-center gap-3">
            <div className="p-2 bg-indigo-100 rounded-xl text-indigo-600">
              <FolderOpen className="w-6 h-6"/>
            </div>
            Document Verification
          </h1>
          <p className="text-[var(--text-disabled)] text-sm mt-1 font-medium">Verify and manage operational documents for students.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1 min-h-0">
        
        {/* Student List Sidebar */}
        <div className="lg:col-span-1 bg-card border border-border/60 rounded-2xl shadow-sm flex flex-col min-h-0">
          <div className="p-4 border-b border-border/50 bg-page/30 shrink-0">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
              <input 
                type="text" 
                placeholder="Search student..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-input border border-border rounded-lg text-sm font-medium focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {DUMMY_STUDENTS.map(student => (
              <div 
                key={student.id}
                onClick={() => setSelectedStudent(student)}
                className={`p-3 rounded-xl cursor-pointer transition-all ${
                  selectedStudent.id === student.id 
                    ? 'bg-indigo-50 border border-indigo-200 shadow-sm' 
                    : 'bg-transparent border border-transparent hover:bg-page/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-primary">{student.name}</h4>
                  <span className="text-xs font-bold text-secondary bg-white px-2 py-0.5 rounded border border-border">Rm: {student.room}</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className={`text-[10px] font-black uppercase tracking-wider ${
                    student.status === 'All Verified' ? 'text-green-600' : 
                    student.status === 'Action Required' ? 'text-red-600' : 'text-orange-600'
                  }`}>
                    {student.status}
                  </span>
                  <span className="text-[11px] font-medium text-secondary">{student.docsCount}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Document View Area */}
        <div className="lg:col-span-3 bg-card border border-border/60 rounded-2xl shadow-sm flex flex-col min-h-0">
          
          {/* Header Info */}
          <div className="p-5 border-b border-border/50 bg-page/30 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 border border-indigo-200">
                <User className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-black text-primary">{selectedStudent.name} <span className="text-sm font-bold text-secondary ml-2">ID: {selectedStudent.id}</span></h2>
                <p className="text-sm text-secondary font-medium">Room {selectedStudent.room} • Documents for Verification</p>
              </div>
            </div>
            
            <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-md transition-all">
              <Upload className="w-4 h-4" /> Upload Other Doc
            </button>
          </div>

          {/* Documents Table */}
          <div className="flex-1 overflow-y-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-page/50 border-b border-border/50 sticky top-0 z-10">
                  <th className="py-3 px-6 text-xs font-black text-secondary uppercase tracking-wider">Document Type</th>
                  <th className="py-3 px-6 text-xs font-black text-secondary uppercase tracking-wider">Status</th>
                  <th className="py-3 px-6 text-xs font-black text-secondary uppercase tracking-wider">Last Updated / Notes</th>
                  <th className="py-3 px-6 text-xs font-black text-secondary uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {documents.map((doc, idx) => (
                  <tr key={idx} className="border-b border-border/30 hover:bg-page/40 transition-colors group">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${doc.type === 'Photo' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>
                          {doc.type === 'Photo' ? <FileImage className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                        </div>
                        <div>
                          <p className="font-bold text-primary">{doc.type}</p>
                          <p className="text-xs text-secondary mt-0.5">{doc.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      {getStatusBadge(doc.status)}
                    </td>
                    <td className="py-4 px-6 max-w-[200px]">
                      {doc.date && <p className="text-xs font-bold text-secondary mb-1">{doc.date}</p>}
                      {doc.note && (
                        <div className="flex items-start gap-1.5 p-2 bg-orange-50 border border-orange-100 rounded-lg text-xs text-orange-800 line-clamp-2" title={doc.note}>
                          <MessageSquare className="w-3 h-3 mt-0.5 shrink-0" />
                          <span>{doc.note}</span>
                        </div>
                      )}
                      {!doc.date && !doc.note && <span className="text-secondary/50 text-xs italic">No data</span>}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-end gap-2">
                        {/* View Action */}
                        <button 
                          onClick={() => openViewModal(doc)}
                          disabled={doc.status === 'Missing'}
                          className="p-2 bg-white border border-border/60 text-secondary hover:text-indigo-600 hover:border-indigo-200 rounded-lg shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                          title="View Document"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        
                        {/* Verify Action */}
                        <button 
                          onClick={() => handleVerify(doc.name)}
                          disabled={doc.status === 'Verified' || doc.status === 'Missing'}
                          className="p-2 bg-white border border-border/60 text-secondary hover:text-green-600 hover:border-green-200 rounded-lg shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Mark as Verified"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                        </button>
                        
                        {/* Request Correction Action */}
                        <button 
                          onClick={() => handleRequestCorrection(doc.name)}
                          disabled={doc.status === 'Missing'}
                          className="p-2 bg-white border border-border/60 text-secondary hover:text-orange-600 hover:border-orange-200 rounded-lg shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Request Correction"
                        >
                          <AlertTriangle className="w-4 h-4" />
                        </button>
                        
                        {/* Upload Missing Action */}
                        {doc.status === 'Missing' && (
                          <button 
                            className="p-2 bg-indigo-50 border border-indigo-200 text-indigo-600 hover:bg-indigo-100 rounded-lg shadow-sm transition-all"
                            title="Upload Document"
                          >
                            <Upload className="w-4 h-4" />
                          </button>
                        )}
                        
                        {/* Add Note Action */}
                        <button 
                          onClick={() => handleAddNote(doc.name)}
                          className="p-2 bg-white border border-border/60 text-secondary hover:text-primary rounded-lg shadow-sm transition-all"
                          title="Add Note"
                        >
                          <MessageSquare className="w-4 h-4" />
                        </button>
                        
                        {/* Delete Action (Restricted) */}
                        <button 
                          className="p-2 bg-gray-50 border border-gray-200 text-gray-400 rounded-lg cursor-not-allowed group relative"
                        >
                          <Trash2 className="w-4 h-4" />
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-800/80 rounded p-0.5">
                            <Lock className="w-3 h-3 text-white" />
                          </div>
                          
                          {/* Tooltip */}
                          <div className="absolute bottom-full right-0 mb-2 w-48 p-2 bg-gray-800 text-white text-xs font-medium rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20 shadow-xl pointer-events-none">
                            Deletion restricted to Admin/Owner only.
                          </div>
                        </button>

                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* View Document Modal */}
      {viewModalOpen && selectedDocToView && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 p-4">
          <div className="bg-card w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-4 border-b border-border/50 bg-page/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
                  {selectedDocToView.type === 'Photo' ? <FileImage className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
                </div>
                <div>
                  <h3 className="font-black text-primary">{selectedDocToView.type}</h3>
                  <p className="text-xs font-bold text-secondary">{selectedDocToView.name} • {selectedStudent.name}</p>
                </div>
                <div className="ml-4">
                  {getStatusBadge(selectedDocToView.status)}
                </div>
              </div>
              <button 
                onClick={() => setViewModalOpen(false)}
                className="p-2 text-secondary hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Modal Body - Document Viewer Placeholder */}
            <div className="flex-1 bg-gray-100/50 p-6 flex flex-col items-center justify-center min-h-[400px] overflow-y-auto relative">
              
              <div className="w-full max-w-2xl bg-white aspect-[1/1.4] rounded-lg shadow-sm border border-border flex items-center justify-center relative overflow-hidden">
                {/* Watermark / Placeholder styling */}
                <div className="absolute inset-0 opacity-5 flex items-center justify-center pointer-events-none">
                  <div className="rotate-[-45deg] text-6xl font-black whitespace-nowrap">SMART PG SECURE</div>
                </div>
                
                <div className="text-center p-8">
                  {selectedDocToView.type === 'Photo' ? (
                    <div className="w-48 h-48 bg-gray-200 rounded-full mx-auto mb-4 border-4 border-white shadow-md flex items-center justify-center overflow-hidden">
                      <User className="w-20 h-20 text-gray-400" />
                    </div>
                  ) : (
                    <FileText className="w-24 h-24 text-gray-300 mx-auto mb-4" />
                  )}
                  <h4 className="text-xl font-bold text-primary">Document Preview</h4>
                  <p className="text-secondary mt-2 max-w-sm mx-auto">This is a secure preview of the document. The original file is encrypted and stored securely.</p>
                </div>
              </div>

            </div>

            {/* Modal Footer - Actions */}
            <div className="p-4 border-t border-border/50 bg-white flex items-center justify-between shrink-0">
              <button 
                onClick={() => {
                  handleRequestCorrection(selectedDocToView.name);
                  setViewModalOpen(false);
                }}
                className="px-5 py-2.5 bg-orange-50 text-orange-600 hover:bg-orange-100 font-bold rounded-xl text-sm transition-colors"
              >
                Request Correction
              </button>
              
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setViewModalOpen(false)}
                  className="px-5 py-2.5 bg-page text-secondary border border-border/60 hover:text-primary hover:bg-page/80 font-bold rounded-xl text-sm transition-colors"
                >
                  Close
                </button>
                <button 
                  onClick={() => {
                    handleVerify(selectedDocToView.name);
                    setViewModalOpen(false);
                  }}
                  disabled={selectedDocToView.status === 'Verified'}
                  className="px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl text-sm shadow-md transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  <CheckCircle2 className="w-4 h-4" /> Verify Document
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}