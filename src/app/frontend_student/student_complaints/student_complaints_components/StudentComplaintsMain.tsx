'use client';

import React, { useState } from 'react';
import { 
  Wrench, Plus, Search, Filter, AlertTriangle, CheckCircle2, 
  Clock, Check, Camera, Video, XCircle, ArrowRight, UserCircle,
  AlertCircle, ThumbsUp, ThumbsDown
} from 'lucide-react';
import { toast } from 'sonner';

type ComplaintStatus = 'Submitted' | 'Received' | 'Under Review' | 'Assigned' | 'In Progress' | 'Resolved' | 'Closed';
type ComplaintCategory = 'Room' | 'Electrical' | 'Plumbing' | 'Water' | 'Furniture' | 'Cleaning' | 'Internet' | 'Food' | 'Laundry' | 'Common Area' | 'Other';
type Priority = 'Low' | 'Medium' | 'High' | 'Urgent';
type RequestMode = 'Complaint' | 'Maintenance';

interface Complaint {
  id: string;
  category: ComplaintCategory;
  room: string;
  description: string;
  priority: Priority;
  status: ComplaintStatus;
  date: string;
  lastUpdated: string;
  technician?: string;
  resolutionNotes?: string;
  attachments?: number;
  mode?: RequestMode;
}

const DUMMY_COMPLAINTS: Complaint[] = [
  {
    id: 'CMP-2041',
    category: 'Electrical',
    room: 'Room 204',
    description: 'Ceiling fan is making a loud noise and spinning very slowly. It is getting very hot in the room.',
    priority: 'Urgent',
    status: 'Assigned',
    date: 'Today, 09:30 AM',
    lastUpdated: '2 hours ago',
    technician: 'Ramesh (Electrician)',
    attachments: 1,
    mode: 'Maintenance'
  },
  {
    id: 'CMP-2038',
    category: 'Water',
    room: 'Room 204',
    description: 'Hot water is not coming in the morning. Cold water only throughout the day.',
    priority: 'High',
    status: 'In Progress',
    date: 'Today, 07:00 AM',
    lastUpdated: '1 hour ago',
    technician: 'Suresh (Plumber)',
    mode: 'Maintenance'
  },
  {
    id: 'CMP-2035',
    category: 'Plumbing',
    room: 'Room 204',
    description: 'Bathroom tap is leaking continuously. Wasting a lot of water.',
    priority: 'Medium',
    status: 'Resolved',
    date: 'Yesterday, 02:15 PM',
    lastUpdated: 'Today, 10:00 AM',
    technician: 'Suresh (Plumber)',
    resolutionNotes: 'Changed the tap washer and sealed the pipe joint.',
    attachments: 2
  },
  {
    id: 'CMP-1988',
    category: 'Internet',
    room: 'Room 204',
    description: 'Wi-Fi keeps disconnecting every 5 minutes. Cannot attend online classes.',
    priority: 'Urgent',
    status: 'Closed',
    date: '25 Sep 2026, 11:00 AM',
    lastUpdated: '26 Sep 2026, 09:00 AM',
    technician: 'IT Support Team'
  }
];

const getStatusConfig = (status: ComplaintStatus) => {
  switch (status) {
    case 'Submitted': 
    case 'Received': return { color: 'text-secondary', bg: 'bg-input', border: 'border-border', icon: Clock, progress: 15 };
    case 'Under Review': return { color: 'text-warning', bg: 'bg-warning/10', border: 'border-warning/20', icon: Search, progress: 30 };
    case 'Assigned': return { color: 'text-info', bg: 'bg-info/10', border: 'border-info/20', icon: UserCircle, progress: 50 };
    case 'In Progress': return { color: 'text-primary', bg: 'bg-primary/10', border: 'border-primary/20', icon: Wrench, progress: 75 };
    case 'Resolved': return { color: 'text-success', bg: 'bg-success/10', border: 'border-success/20', icon: CheckCircle2, progress: 90 };
    case 'Closed': return { color: 'text-success', bg: 'bg-success/10', border: 'border-success/20', icon: Check, progress: 100 };
    default: return { color: 'text-secondary', bg: 'bg-input', border: 'border-border', icon: Clock, progress: 0 };
  }
};

const getPriorityColor = (priority: Priority) => {
  switch (priority) {
    case 'Low': return 'bg-input text-secondary border-border';
    case 'Medium': return 'bg-info/10 text-info border-info/20';
    case 'High': return 'bg-warning/10 text-warning border-warning/20';
    case 'Urgent': return 'bg-danger text-white border-danger shadow-sm animate-pulse';
    default: return 'bg-input text-secondary border-border';
  }
};

export function StudentComplaintsMain() {
  const [complaints, setComplaints] = useState<Complaint[]>(DUMMY_COMPLAINTS);
  const [activeTab, setActiveTab] = useState<'All' | 'Active' | 'Resolved' | 'Closed'>('All');
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);

  const filteredComplaints = complaints.filter(cmp => {
    if (activeTab === 'Active' && (cmp.status === 'Resolved' || cmp.status === 'Closed')) return false;
    if (activeTab === 'Resolved' && cmp.status !== 'Resolved') return false;
    if (activeTab === 'Closed' && cmp.status !== 'Closed') return false;
    return true;
  });

  const handleConfirmResolution = (id: string) => {
    setComplaints(prev => prev.map(c => c.id === id ? { ...c, status: 'Closed' } : c));
    toast.success('Complaint closed successfully');
    setSelectedComplaint(null);
  };

  const handleReopen = (id: string) => {
    setComplaints(prev => prev.map(c => c.id === id ? { ...c, status: 'Under Review' } : c));
    toast.success('Complaint reopened and sent for review');
    setSelectedComplaint(null);
  };

  return (
    <div className="w-full max-w-6xl mx-auto pb-12 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="mb-6 md:mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-primary flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Wrench className="w-6 h-6 text-primary" />
            </div>
            Complaints & Maintenance
          </h1>
          <p className="text-sm text-secondary mt-2 font-medium">
            Report issues, track repairs, and manage your room maintenance requests.
          </p>
        </div>
        <button 
          onClick={() => setIsNewModalOpen(true)}
          className="bg-primary text-white font-bold text-sm px-6 py-2.5 rounded-xl shadow-md hover:bg-primary/90 transition-colors whitespace-nowrap flex items-center gap-2 justify-center"
        >
          <Plus className="w-4 h-4" /> Raise Complaint
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
        
        {/* Left Sidebar (Filters) */}
        <div className="w-full lg:w-64 shrink-0 space-y-4">
          <div className="bg-card border border-border rounded-2xl p-2 shadow-sm flex flex-row lg:flex-col overflow-x-auto hide-scrollbar gap-1">
            {[
              { id: 'All', label: 'All Complaints' },
              { id: 'Active', label: 'Active / Pending' },
              { id: 'Resolved', label: 'Require Confirmation' },
              { id: 'Closed', label: 'History / Closed' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 lg:w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                  activeTab === tab.id 
                    ? 'bg-primary text-white shadow-md' 
                    : 'text-secondary hover:bg-input hover:text-primary'
                }`}
              >
                {tab.label}
                {tab.id === 'Resolved' && complaints.filter(c => c.status === 'Resolved').length > 0 && (
                  <span className={`ml-2 px-2 py-0.5 rounded-full text-[10px] ${activeTab === tab.id ? 'bg-white/20' : 'bg-success/20 text-success'}`}>
                    {complaints.filter(c => c.status === 'Resolved').length}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="hidden lg:block bg-info/5 border border-info/20 rounded-2xl p-5 shadow-sm">
            <h3 className="font-bold text-info flex items-center gap-2 mb-2">
              <AlertCircle className="w-4 h-4" /> Quick Tip
            </h3>
            <p className="text-xs text-info/90 leading-relaxed font-medium">
              If a technician marks your issue as "Resolved" but it still persists, you can choose to "Reopen" it before closing.
            </p>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="flex-1 bg-card border border-border rounded-2xl shadow-sm min-h-[500px] flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
          
          <div className="p-4 border-b border-border bg-input/30 flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
              <input 
                type="text" 
                placeholder="Search by ID or Category..." 
                className="w-full bg-card border border-border rounded-xl pl-9 pr-4 py-2 text-sm font-medium focus:outline-none focus:border-primary shadow-sm"
              />
            </div>
            <button className="px-4 py-2 rounded-xl border border-border bg-card text-secondary hover:bg-input transition-colors flex items-center gap-2 text-sm font-bold shadow-sm">
              <Filter className="w-4 h-4" /> Filter
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
            {filteredComplaints.length > 0 ? (
              filteredComplaints.map((cmp) => {
                const statusConfig = getStatusConfig(cmp.status);
                const StatusIcon = statusConfig.icon;

                return (
                  <div 
                    key={cmp.id} 
                    onClick={() => setSelectedComplaint(cmp)}
                    className="border border-border rounded-2xl p-5 cursor-pointer transition-all hover:shadow-md bg-card hover:border-primary/30 group relative overflow-hidden"
                  >
                    {/* Progress Bar Background */}
                    <div className="absolute bottom-0 left-0 h-1 bg-input w-full">
                      <div className={`h-full transition-all duration-1000 ${cmp.status === 'Resolved' || cmp.status === 'Closed' ? 'bg-success' : 'bg-primary'}`} style={{ width: `${statusConfig.progress}%` }}></div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-primary">{cmp.id}</span>
                          <span className="text-secondary/50">•</span>
                          <span className="text-sm font-bold text-secondary">{cmp.category}</span>
                          {cmp.priority === 'Urgent' && (
                            <span className="ml-2 bg-danger text-white text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-wider animate-pulse">
                              Urgent
                            </span>
                          )}
                        </div>
                        <h3 className="font-bold text-primary text-base line-clamp-1">{cmp.description}</h3>
                      </div>
                      
                      <div className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold w-fit ${statusConfig.bg} ${statusConfig.color} ${statusConfig.border}`}>
                        <StatusIcon className="w-4 h-4" />
                        {cmp.status}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium text-secondary">
                      <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {cmp.date}</span>
                      <span className="flex items-center gap-1"><UserCircle className="w-4 h-4" /> {cmp.technician || 'Unassigned'}</span>
                      {cmp.attachments && (
                        <span className="flex items-center gap-1"><Camera className="w-4 h-4" /> {cmp.attachments} Files</span>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-20 h-20 rounded-full bg-input flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-10 h-10 text-success opacity-50" />
                </div>
                <h3 className="text-lg font-bold text-primary mb-2">No active complaints!</h3>
                <p className="text-sm text-secondary max-w-sm mb-6">
                  Everything seems to be working fine. If you face any issues, feel free to raise a new complaint.
                </p>
                <button 
                  onClick={() => setIsNewModalOpen(true)}
                  className="bg-primary/10 text-primary font-bold text-sm px-6 py-2 rounded-xl hover:bg-primary/20 transition-colors"
                >
                  Raise Complaint
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Complaint Details Modal */}
      {selectedComplaint && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-card border border-border rounded-2xl w-full max-w-3xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
            
            <div className="p-5 border-b border-border flex items-center justify-between bg-input/30">
              <div>
                <h2 className="text-lg font-black text-primary">Complaint {selectedComplaint.id}</h2>
                <p className="text-xs text-secondary font-medium">{selectedComplaint.category} • {selectedComplaint.room}</p>
              </div>
              <button 
                onClick={() => setSelectedComplaint(null)}
                className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-input text-secondary hover:text-danger transition-colors shrink-0"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 flex flex-col md:flex-row gap-8">
              
              {/* Left Column: Details */}
              <div className="flex-1 space-y-6">
                <div>
                  <h4 className="text-xs font-bold text-secondary uppercase tracking-wider mb-2">Description</h4>
                  <p className="text-sm text-primary font-medium bg-input/30 p-4 rounded-xl border border-border">
                    {selectedComplaint.description}
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-xs font-bold text-secondary uppercase tracking-wider mb-1">Priority</h4>
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold border ${getPriorityColor(selectedComplaint.priority)}`}>
                      {selectedComplaint.priority}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-secondary uppercase tracking-wider mb-1">Technician</h4>
                    <p className="text-sm font-bold text-primary flex items-center gap-2">
                      <UserCircle className="w-4 h-4 text-secondary" /> 
                      {selectedComplaint.technician || 'Not Assigned'}
                    </p>
                  </div>
                </div>

                {selectedComplaint.attachments && (
                  <div>
                    <h4 className="text-xs font-bold text-secondary uppercase tracking-wider mb-2">Attachments</h4>
                    <div className="flex gap-2">
                      <div className="w-16 h-16 rounded-lg bg-input border border-border flex items-center justify-center">
                        <Camera className="w-6 h-6 text-secondary" />
                      </div>
                    </div>
                  </div>
                )}

                {selectedComplaint.resolutionNotes && (
                  <div className="bg-success/10 border border-success/20 rounded-xl p-4">
                    <h4 className="text-xs font-bold text-success uppercase tracking-wider mb-1 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Resolution Notes
                    </h4>
                    <p className="text-sm text-success/90 font-medium">
                      {selectedComplaint.resolutionNotes}
                    </p>
                  </div>
                )}
              </div>

              {/* Right Column: Timeline / Lifecycle */}
              <div className="w-full md:w-64 shrink-0 border-t md:border-t-0 md:border-l border-border pt-6 md:pt-0 md:pl-6">
                <h4 className="text-xs font-bold text-secondary uppercase tracking-wider mb-4">Status Timeline</h4>
                
                <div className="space-y-4 relative before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-border">
                  {['Submitted', 'Received', 'Assigned', 'In Progress', 'Resolved', 'Closed'].map((step, idx) => {
                    const statusConfig = getStatusConfig(selectedComplaint.status);
                    const currentProgress = statusConfig.progress;
                    const stepProgress = ([0, 15, 50, 75, 90, 100][idx]) ?? 0;
                    
                    const isCompleted = stepProgress <= currentProgress;
                    const isCurrent = step === selectedComplaint.status;
                    
                    return (
                      <div key={step} className="relative flex items-center gap-4">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border-2 z-10 bg-card ${
                          isCompleted ? 'border-success text-success' : 
                          isCurrent ? 'border-primary text-primary' : 'border-border text-border'
                        }`}>
                          {isCompleted ? <Check className="w-3 h-3" /> : <div className="w-1.5 h-1.5 rounded-full bg-current"></div>}
                        </div>
                        <div>
                          <p className={`text-sm font-bold ${isCompleted || isCurrent ? 'text-primary' : 'text-secondary'}`}>
                            {step}
                          </p>
                          {isCurrent && <p className="text-[10px] text-secondary font-medium">{selectedComplaint.lastUpdated}</p>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            
            {/* Action Bar */}
            {selectedComplaint.status === 'Resolved' && (
              <div className="p-4 border-t border-border bg-input/30 flex items-center justify-between gap-4">
                <div className="flex-1">
                  <p className="text-xs font-bold text-primary">Is your issue resolved?</p>
                  <p className="text-[10px] text-secondary">Please confirm to close the ticket, or reopen it.</p>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => handleReopen(selectedComplaint.id)}
                    className="bg-card text-danger border border-danger/20 font-bold text-xs px-4 py-2.5 rounded-xl hover:bg-danger/10 transition-colors flex items-center gap-2"
                  >
                    <ThumbsDown className="w-4 h-4" /> Reopen
                  </button>
                  <button 
                    onClick={() => handleConfirmResolution(selectedComplaint.id)}
                    className="bg-success text-white font-bold text-xs px-4 py-2.5 rounded-xl hover:bg-success/90 shadow-sm transition-colors flex items-center gap-2"
                  >
                    <ThumbsUp className="w-4 h-4" /> Confirm & Close
                  </button>
                </div>
              </div>
            )}
            {selectedComplaint.status !== 'Resolved' && (
              <div className="p-4 border-t border-border bg-input/30 flex justify-end">
                <button 
                  onClick={() => setSelectedComplaint(null)}
                  className="bg-card border border-border text-primary font-bold text-sm px-8 py-2 rounded-xl hover:bg-input transition-colors shadow-sm"
                >
                  Close Window
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* New Complaint Modal */}
      {isNewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-card border border-border rounded-2xl w-full max-w-lg shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-5 border-b border-border flex items-center justify-between bg-input/30">
              <h2 className="text-lg font-black text-primary flex items-center gap-2">
                <Wrench className="w-5 h-5" /> Raise New Complaint
              </h2>
              <button 
                onClick={() => setIsNewModalOpen(false)}
                className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-input text-secondary hover:text-danger transition-colors"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-5">
              <div>
                <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">Category</label>
                <select className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-primary shadow-sm appearance-none">
                  <option>Select Category</option>
                  <option>Electrical</option>
                  <option>Plumbing</option>
                  <option>Water</option>
                  <option>Internet</option>
                  <option>Furniture</option>
                  <option>Cleaning</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">Priority</label>
                <div className="grid grid-cols-4 gap-2">
                  {['Low', 'Medium', 'High', 'Urgent'].map(p => (
                    <button key={p} className="bg-card border border-border rounded-lg py-2 text-xs font-bold text-secondary hover:border-primary hover:text-primary transition-colors text-center">
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">Description</label>
                <textarea 
                  rows={4}
                  placeholder="Describe your issue in detail..."
                  className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-primary shadow-sm resize-none"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">Attachments (Photo/Video)</label>
                <div className="w-full border-2 border-dashed border-border rounded-xl p-6 flex flex-col items-center justify-center text-secondary hover:bg-input hover:border-primary/50 transition-colors cursor-pointer bg-input/30">
                  <div className="flex gap-3 mb-2">
                    <Camera className="w-6 h-6" />
                    <Video className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-bold">Click to upload media</p>
                  <p className="text-xs">Max size: 10MB</p>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-border bg-input/30 flex justify-end gap-3">
              <button 
                onClick={() => setIsNewModalOpen(false)}
                className="bg-card border border-border text-secondary font-bold text-sm px-6 py-2.5 rounded-xl hover:bg-input transition-colors shadow-sm"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  toast.success('Complaint submitted successfully!');
                  setIsNewModalOpen(false);
                }}
                className="bg-primary text-white font-bold text-sm px-8 py-2.5 rounded-xl hover:bg-primary/90 shadow-md transition-colors"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
