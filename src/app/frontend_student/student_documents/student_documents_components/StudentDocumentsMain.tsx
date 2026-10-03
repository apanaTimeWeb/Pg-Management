'use client';

import React, { useState } from 'react';
import { 
  FileText, Upload, Download, Eye, AlertCircle, CheckCircle2, 
  XCircle, Clock, FileBadge, ShieldAlert, FileImage, User, Home, Info
} from 'lucide-react';
import { toast } from 'sonner';

type DocStatus = 'Pending' | 'Uploaded' | 'Under Review' | 'Verified' | 'Rejected' | 'Expired';
type DocCategory = 'ID Proof' | 'Address Proof' | 'Photo' | 'Admission Form' | 'Agreement' | 'Guardian Document' | 'Other';

interface DocumentItem {
  id: string;
  category: DocCategory;
  name: string;
  status: DocStatus;
  uploadedDate?: string;
  verificationDate?: string;
  expiryDate?: string;
  remarks?: string;
}

const INITIAL_DOCUMENTS: DocumentItem[] = [
  {
    id: 'doc-1',
    category: 'ID Proof',
    name: 'Aadhaar Card',
    status: 'Verified',
    uploadedDate: '01 Sep 2026',
    verificationDate: '02 Sep 2026',
  },
  {
    id: 'doc-2',
    category: 'Address Proof',
    name: 'Voter ID',
    status: 'Under Review',
    uploadedDate: '02 Oct 2026',
  },
  {
    id: 'doc-3',
    category: 'Photo',
    name: 'Passport Size Photo',
    status: 'Verified',
    uploadedDate: '01 Sep 2026',
    verificationDate: '02 Sep 2026',
  },
  {
    id: 'doc-4',
    category: 'Admission Form',
    name: 'Signed Application',
    status: 'Rejected',
    uploadedDate: '28 Sep 2026',
    remarks: 'Signature missing on page 2. Please re-sign and upload.',
  },
  {
    id: 'doc-5',
    category: 'Agreement',
    name: 'Rent Agreement',
    status: 'Pending',
  },
  {
    id: 'doc-6',
    category: 'Guardian Document',
    name: 'Guardian ID Proof',
    status: 'Expired',
    uploadedDate: '15 Jan 2025',
    expiryDate: '15 Jan 2026',
    remarks: 'Document validity expired. Please provide latest.',
  }
];

const getStatusConfig = (status: DocStatus) => {
  switch (status) {
    case 'Pending': return { color: 'text-warning', bg: 'bg-warning/10', border: 'border-warning/20', icon: AlertCircle };
    case 'Uploaded': return { color: 'text-info', bg: 'bg-info/10', border: 'border-info/20', icon: Upload };
    case 'Under Review': return { color: 'text-primary', bg: 'bg-primary/10', border: 'border-primary/20', icon: Clock };
    case 'Verified': return { color: 'text-success', bg: 'bg-success/10', border: 'border-success/20', icon: CheckCircle2 };
    case 'Rejected': return { color: 'text-danger', bg: 'bg-danger/10', border: 'border-danger/20', icon: XCircle };
    case 'Expired': return { color: 'text-danger', bg: 'bg-danger/10', border: 'border-danger/20', icon: ShieldAlert };
    default: return { color: 'text-secondary', bg: 'bg-input', border: 'border-border', icon: FileText };
  }
};

const getCategoryIcon = (category: DocCategory) => {
  switch (category) {
    case 'ID Proof': return FileBadge;
    case 'Address Proof': return Home;
    case 'Photo': return FileImage;
    case 'Admission Form': return FileText;
    case 'Agreement': return FileText;
    case 'Guardian Document': return User;
    default: return FileText;
  }
};

export function StudentDocumentsMain() {
  const [documents, setDocuments] = useState<DocumentItem[]>(INITIAL_DOCUMENTS);
  const [selectedDoc, setSelectedDoc] = useState<DocumentItem | null>(null);

  const handleUpload = (id: string) => {
    toast.success('File upload window opened');
  };

  const handleDownload = () => {
    toast.success('Document downloading...');
  };

  const handleView = (doc: DocumentItem) => {
    setSelectedDoc(doc);
  };

  return (
    <div className="w-full max-w-6xl mx-auto pb-12 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="mb-6 md:mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-primary flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            My Documents
          </h1>
          <p className="text-sm text-secondary mt-2 font-medium">
            Manage your KYC, agreements, and other important documents.
          </p>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-info/10 border border-info/20 rounded-2xl p-4 mb-8 flex items-start gap-3">
        <Info className="w-5 h-5 text-info shrink-0 mt-0.5" />
        <div className="text-sm text-info/90">
          <p className="font-bold mb-1">Important Instructions</p>
          <p>Only PDF, JPG, and PNG files under 5MB are allowed. Deletion of verified documents is restricted. Contact manager for modifications.</p>
        </div>
      </div>

      {/* Document Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {documents.map((doc) => {
          const statusConfig = getStatusConfig(doc.status);
          const StatusIcon = statusConfig.icon;
          const CategoryIcon = getCategoryIcon(doc.category);

          const isActionable = doc.status === 'Pending' || doc.status === 'Rejected' || doc.status === 'Expired';

          return (
            <div key={doc.id} className="bg-card border border-border rounded-2xl p-5 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
              {/* Background gradient blob for verified/rejected */}
              {doc.status === 'Verified' && <div className="absolute top-0 right-0 w-32 h-32 bg-success/5 rounded-full blur-2xl -z-10 translate-x-1/2 -translate-y-1/2"></div>}
              {doc.status === 'Rejected' && <div className="absolute top-0 right-0 w-32 h-32 bg-danger/5 rounded-full blur-2xl -z-10 translate-x-1/2 -translate-y-1/2"></div>}
              
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-input flex items-center justify-center">
                    <CategoryIcon className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-primary text-sm line-clamp-1">{doc.name}</h3>
                    <p className="text-xs text-secondary">{doc.category}</p>
                  </div>
                </div>
                <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-[10px] font-black uppercase tracking-wider ${statusConfig.bg} ${statusConfig.color} ${statusConfig.border}`}>
                  <StatusIcon className="w-3 h-3" />
                  {doc.status}
                </div>
              </div>

              <div className="space-y-2 mb-5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-secondary font-medium">Uploaded</span>
                  <span className="text-primary font-bold">{doc.uploadedDate || '-'}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-secondary font-medium">Verified</span>
                  <span className="text-primary font-bold">{doc.verificationDate || (doc.status === 'Verified' ? '-' : 'Pending')}</span>
                </div>
                {doc.expiryDate && (
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-secondary font-medium text-danger">Expires</span>
                    <span className="text-danger font-bold">{doc.expiryDate}</span>
                  </div>
                )}
              </div>

              {doc.remarks && (
                <div className="bg-danger/5 border border-danger/20 rounded-lg p-3 mb-5 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-danger shrink-0 mt-0.5" />
                  <p className="text-xs font-medium text-danger/90">{doc.remarks}</p>
                </div>
              )}

              <div className="flex items-center gap-2 mt-auto pt-4 border-t border-border">
                {doc.status !== 'Pending' && (
                  <>
                    <button 
                      onClick={() => handleView(doc)}
                      className="flex-1 bg-input/50 text-secondary hover:text-primary hover:bg-input font-bold text-xs py-2 rounded-lg flex items-center justify-center gap-2 transition-colors border border-border"
                    >
                      <Eye className="w-3.5 h-3.5" /> View
                    </button>
                    <button 
                      onClick={handleDownload}
                      className="w-10 h-8 flex-shrink-0 bg-input/50 text-secondary hover:text-primary hover:bg-input font-bold rounded-lg flex items-center justify-center transition-colors border border-border"
                      title="Download"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </>
                )}
                
                {isActionable && (
                  <button 
                    onClick={() => handleUpload(doc.id)}
                    className="flex-1 bg-primary text-white font-bold text-xs py-2 rounded-lg flex items-center justify-center gap-2 transition-colors hover:bg-primary/90 shadow-sm"
                  >
                    <Upload className="w-3.5 h-3.5" /> 
                    {doc.status === 'Pending' ? 'Upload' : 'Resubmit'}
                  </button>
                )}
                
                {(!isActionable && doc.status !== 'Pending') && (
                  <button 
                    onClick={() => handleUpload(doc.id)}
                    className="flex-1 text-primary hover:bg-primary/10 font-bold text-xs py-2 rounded-lg flex items-center justify-center gap-2 transition-colors border border-primary/20"
                  >
                    <Upload className="w-3.5 h-3.5" /> Replace
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* View Document Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-card border border-border rounded-2xl w-full max-w-2xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-4 border-b border-border flex items-center justify-between bg-input/30">
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-primary" />
                <div>
                  <h3 className="font-bold text-primary">{selectedDoc.name}</h3>
                  <p className="text-xs text-secondary">{selectedDoc.category}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedDoc(null)}
                className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-input text-secondary hover:text-danger transition-colors"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 p-6 bg-input/10 flex items-center justify-center overflow-auto">
              <div className="w-full max-w-sm aspect-[3/4] bg-white border border-border rounded-xl shadow-sm flex flex-col items-center justify-center text-center p-6">
                <FileImage className="w-16 h-16 text-border mb-4" />
                <p className="text-sm font-bold text-secondary mb-1">Document Preview</p>
                <p className="text-xs text-secondary/60">In a real app, the PDF or Image would render here.</p>
              </div>
            </div>
            
            <div className="p-4 border-t border-border bg-card flex justify-end gap-3">
              <button 
                onClick={handleDownload}
                className="bg-input text-primary font-bold text-sm px-6 py-2 rounded-xl hover:bg-input/80 transition-colors flex items-center gap-2"
              >
                <Download className="w-4 h-4" /> Download
              </button>
              <button 
                onClick={() => setSelectedDoc(null)}
                className="bg-primary text-white font-bold text-sm px-6 py-2 rounded-xl shadow-md hover:bg-primary/90 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
