// @ts-nocheck
'use client';

import React, { useState } from 'react';
import { 
  MessageSquareWarning, Search, Filter, AlertCircle, CheckCircle2, 
  Clock, Image as ImageIcon, Send, User, MapPin, Briefcase, 
  ChevronRight, Wrench, XCircle, RotateCcw, Zap, Droplets, 
  Wifi, ShieldAlert, Coffee, Armchair
} from 'lucide-react';

type ComplaintStatus = 'New' | 'Reviewed' | 'Assigned' | 'In Progress' | 'Resolved' | 'Closed';
type ComplaintCategory = 'Room' | 'Electrical' | 'Plumbing' | 'Water' | 'Cleaning' | 'Internet' | 'Furniture' | 'Food' | 'Noise' | 'Safety' | 'Other';
type Priority = 'Low' | 'Medium' | 'High';

interface Complaint {
  id: string;
  student: string;
  room: string;
  category: ComplaintCategory;
  title: string;
  description: string;
  status: ComplaintStatus;
  priority: Priority;
  assignedTo?: string;
  dateCreated: string;
  comments: { user: string; text: string; time: string; isManager?: boolean }[];
  resolution?: string;
}

const INITIAL_COMPLAINTS: Complaint[] = [
  {
    id: 'C-089',
    student: 'Rahul Sharma',
    room: '102',
    category: 'Electrical',
    title: 'Fan not working properly',
    description: 'The ceiling fan is making a loud noise and rotating very slowly. Hard to sleep at night.',
    status: 'In Progress',
    priority: 'Medium',
    assignedTo: 'Ramesh (Electrician)',
    dateCreated: '03 Oct 2026, 09:30 AM',
    comments: [
      { user: 'Rahul Sharma', text: 'Please fix this today if possible.', time: '09:35 AM' },
      { user: 'Manager', text: 'Noted. Forwarded to maintenance.', time: '10:00 AM', isManager: true }
    ]
  },
  {
    id: 'C-090',
    student: 'Amit Kumar',
    room: '205',
    category: 'Internet',
    title: 'Wi-Fi keeps disconnecting',
    description: 'The Wi-Fi router on 2nd floor is turning off automatically every 10 minutes.',
    status: 'New',
    priority: 'High',
    dateCreated: '03 Oct 2026, 01:15 PM',
    comments: []
  },
  {
    id: 'C-091',
    student: 'Suresh Patel',
    room: '304',
    category: 'Cleaning',
    title: 'Room not cleaned',
    description: 'The housekeeping staff missed our room yesterday.',
    status: 'Reviewed',
    priority: 'Low',
    dateCreated: '02 Oct 2026, 05:45 PM',
    comments: []
  },
  {
    id: 'C-075',
    student: 'Vikas Singh',
    room: '105',
    category: 'Plumbing',
    title: 'Tap leaking continuously',
    description: 'Bathroom tap is leaking, causing water wastage.',
    status: 'Closed',
    priority: 'Medium',
    assignedTo: 'Plumber',
    resolution: 'Replaced the washer in the tap. Leakage stopped.',
    dateCreated: '01 Oct 2026, 11:20 AM',
    comments: []
  }
];

import { useManagerPropertyContext } from '@/app/frontend_manager/manager_components/ManagerPropertyContext';
import { api } from '@/app/frontend_manager/manager_lib/manager_api/ManagerApi';

export default function ManagerComplaintsMain() {
  const { selectedPropertyId, loading: ctxLoading } = useManagerPropertyContext();
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'All' | ComplaintStatus>('All');
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    if (ctxLoading) return;
    if (!selectedPropertyId) {
      setComplaints([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    // In real app: fetch from API, map if needed
    // For now we just merge mock API with the required UI structure
    const fetched = api.managerOperations.listComplaints(selectedPropertyId) as unknown as any[];
    
    // Fallback if db is empty or to match UI
    if (fetched.length === 0) {
      // simulate delay
      setTimeout(() => {
        setComplaints(INITIAL_COMPLAINTS);
        setSelectedComplaint(INITIAL_COMPLAINTS[0]);
        setLoading(false);
      }, 500);
    } else {
      setComplaints(fetched);
      setSelectedComplaint(fetched[0]);
      setLoading(false);
    }
  }, [selectedPropertyId, ctxLoading]);

  const filteredComplaints = complaints.filter(c => {
    const titleMatch = c.title ? c.title.toLowerCase().includes(searchTerm.toLowerCase()) : false;
    const studentMatch = c.student ? c.student.toLowerCase().includes(searchTerm.toLowerCase()) : false;
    const roomMatch = c.room ? c.room.includes(searchTerm) : false;
    
    const matchesSearch = titleMatch || studentMatch || roomMatch;
    const matchesStatus = filterStatus === 'All' || c.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  if (loading || ctxLoading) {
    return <div className="p-8 flex items-center justify-center min-h-[50vh]"><div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div></div>;
  }

  const getStatusColor = (status: ComplaintStatus) => {
    switch (status) {
      case 'New': return 'bg-red-100 text-red-700 border-red-200';
      case 'Reviewed': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Assigned': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'In Progress': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Resolved': return 'bg-green-100 text-green-700 border-green-200';
      case 'Closed': return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getCategoryIcon = (category: ComplaintCategory) => {
    switch(category) {
      case 'Electrical': return <Zap className="w-4 h-4 text-yellow-500" />;
      case 'Plumbing': return <Droplets className="w-4 h-4 text-blue-500" />;
      case 'Internet': return <Wifi className="w-4 h-4 text-indigo-500" />;
      case 'Cleaning': return <CheckCircle2 className="w-4 h-4 text-teal-500" />;
      case 'Safety': return <ShieldAlert className="w-4 h-4 text-red-500" />;
      case 'Food': return <Coffee className="w-4 h-4 text-orange-500" />;
      case 'Furniture': return <Armchair className="w-4 h-4 text-amber-600" />;
      default: return <Wrench className="w-4 h-4 text-gray-500" />;
    }
  };

  const handleStatusUpdate = (newStatus: ComplaintStatus) => {
    if (selectedComplaint) {
      api.managerOperations.updateComplaintStatus(selectedComplaint.id, newStatus, 'manager-1');
      setComplaints(prev => prev.map(c => c.id === selectedComplaint.id ? { ...c, status: newStatus } : c));
      setSelectedComplaint(prev => prev ? ({ ...prev, status: newStatus }) : null);
    }
  };

  const handlePriorityUpdate = (newPriority: Priority) => {
    if (selectedComplaint) {
      setComplaints(prev => prev.map(c => c.id === selectedComplaint.id ? { ...c, priority: newPriority } : c));
      setSelectedComplaint(prev => prev ? ({ ...prev, priority: newPriority }) : null);
    }
  };

  const handleAddComment = () => {
    if (!newComment.trim() || !selectedComplaint) return;
    const comment = { user: 'Manager', text: newComment, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}), isManager: true };
    setComplaints(prev => prev.map(c => c.id === selectedComplaint.id ? { ...c, comments: [...(c.comments || []), comment] } : c));
    setSelectedComplaint(prev => prev ? ({ ...prev, comments: [...(prev.comments || []), comment] }) : null);
    setNewComment('');
  };

  const handleAssign = () => {
    if (!selectedComplaint) return;
    const person = window.prompt("Assign task to (Staff/Vendor name):");
    if (person) {
      api.managerOperations.updateComplaintStatus(selectedComplaint.id, 'Assigned', 'manager-1');
      setComplaints(prev => prev.map(c => c.id === selectedComplaint.id ? { ...c, assignedTo: person, status: 'Assigned' } : c));
      setSelectedComplaint(prev => prev ? ({ ...prev, assignedTo: person, status: 'Assigned' }) : null);
    }
  };

  const handleResolve = () => {
    if (!selectedComplaint) return;
    const resolution = window.prompt("Enter resolution details:");
    if (resolution) {
      api.managerOperations.resolveComplaintWithCost(selectedComplaint.id, 0, resolution, 'manager-1');
      setComplaints(prev => prev.map(c => c.id === selectedComplaint.id ? { ...c, resolution, status: 'Resolved' } : c));
      setSelectedComplaint(prev => prev ? ({ ...prev, resolution, status: 'Resolved' }) : null);
    }
  };

  return (
    <div className="p-4 md:p-8 space-y-6 animate-in fade-in duration-500 w-full h-[calc(100vh-4rem)] flex flex-col">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-black text-primary flex items-center gap-3">
            <div className="p-2 bg-indigo-100 rounded-xl text-indigo-600">
              <MessageSquareWarning className="w-6 h-6"/>
            </div>
            Complaints Management
          </h1>
          <p className="text-[var(--text-disabled)] text-sm mt-1 font-medium">Manage and resolve student complaints effectively.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
        
        {/* Left Side: Complaints List */}
        <div className="lg:col-span-1 bg-card border border-border/60 rounded-2xl shadow-sm flex flex-col min-h-0">
          
          <div className="p-4 border-b border-border/50 bg-page/30 shrink-0 space-y-3">
            <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
              {['All', 'New', 'Reviewed', 'Assigned', 'In Progress', 'Resolved', 'Closed'].map(status => (
                <button 
                  key={status}
                  onClick={() => setFilterStatus(status as any)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
                    filterStatus === status 
                      ? 'bg-indigo-600 text-white border-indigo-600' 
                      : 'bg-card text-secondary border-border/60 hover:border-indigo-300'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
            
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
              <input 
                type="text" 
                placeholder="Search complaint..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-input border border-border rounded-lg text-sm font-medium focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {filteredComplaints.map(comp => (
              <div 
                key={comp.id}
                onClick={() => setSelectedComplaint(comp)}
                className={`p-3 rounded-xl cursor-pointer transition-all ${
                  selectedComplaint?.id === comp.id 
                    ? 'bg-indigo-50 border border-indigo-200 shadow-sm' 
                    : 'bg-transparent border border-transparent hover:bg-page/50'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      {getCategoryIcon(comp.category)}
                      <span className="text-xs font-bold text-secondary">{comp.category}</span>
                      {comp.priority === 'High' && <AlertCircle className="w-3.5 h-3.5 text-red-500 ml-auto" />}
                    </div>
                    <h4 className="font-bold text-primary truncate">{comp.title}</h4>
                    <p className="text-[11px] text-secondary mt-0.5 truncate">{comp.student} • Rm {comp.room}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider border ${getStatusColor(comp.status)}`}>
                    {comp.status}
                  </span>
                  <span className="text-[10px] font-medium text-secondary">{comp.dateCreated?.split(',')[0] || ''}</span>
                </div>
              </div>
            ))}
            
            {filteredComplaints.length === 0 && (
              <div className="text-center p-8 text-secondary text-sm">No complaints found.</div>
            )}
          </div>
        </div>

        {/* Right Side: Details & Lifecycle */}
        <div className="lg:col-span-2 bg-card border border-border/60 rounded-2xl shadow-sm flex flex-col min-h-0 overflow-y-auto">
          {!selectedComplaint ? (
            <div className="flex-1 flex items-center justify-center text-secondary p-8 text-center">
              Select a complaint to view details
            </div>
          ) : (
            <>
              {/* Header Info */}
              <div className="p-6 border-b border-border/50 bg-page/30 shrink-0">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wider border ${getStatusColor(selectedComplaint.status)}`}>
                  {selectedComplaint.status}
                </span>
                <span className="text-sm font-bold text-secondary">ID: {selectedComplaint.id}</span>
              </div>
              <span className="text-sm text-secondary font-medium">{selectedComplaint.dateCreated}</span>
            </div>
            
            <h2 className="text-2xl font-black text-primary leading-tight mb-4">{selectedComplaint.title}</h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-card px-3 py-2 rounded-lg border border-border">
                <p className="text-[10px] font-black text-secondary uppercase tracking-wider">Student</p>
                <p className="text-sm font-bold text-primary mt-0.5 flex items-center gap-1"><User className="w-3.5 h-3.5"/> {selectedComplaint.student}</p>
              </div>
              <div className="bg-card px-3 py-2 rounded-lg border border-border">
                <p className="text-[10px] font-black text-secondary uppercase tracking-wider">Room</p>
                <p className="text-sm font-bold text-primary mt-0.5 flex items-center gap-1"><MapPin className="w-3.5 h-3.5"/> {selectedComplaint.room}</p>
              </div>
              <div className="bg-card px-3 py-2 rounded-lg border border-border">
                <p className="text-[10px] font-black text-secondary uppercase tracking-wider">Category</p>
                <p className="text-sm font-bold text-primary mt-0.5 flex items-center gap-1">{getCategoryIcon(selectedComplaint.category)} {selectedComplaint.category}</p>
              </div>
              <div className="bg-card px-3 py-2 rounded-lg border border-border">
                <p className="text-[10px] font-black text-secondary uppercase tracking-wider">Priority</p>
                <select 
                  value={selectedComplaint.priority}
                  onChange={(e) => handlePriorityUpdate(e.target.value as Priority)}
                  disabled={selectedComplaint.status === 'Closed'}
                  className={`text-sm font-bold mt-0.5 bg-transparent focus:outline-none cursor-pointer w-full ${selectedComplaint.priority === 'High' ? 'text-red-600' : selectedComplaint.priority === 'Medium' ? 'text-orange-600' : 'text-green-600'}`}
                >
                  <option value="High">High Priority</option>
                  <option value="Medium">Medium Priority</option>
                  <option value="Low">Low Priority</option>
                </select>
              </div>
            </div>
            
            <div className="mt-4 p-4 bg-page rounded-xl border border-border text-primary text-sm leading-relaxed">
              {selectedComplaint.description}
            </div>
          </div>

          <div className="p-6 flex-1 space-y-6">
            
            {/* Resolution Box if resolved/closed */}
            {(selectedComplaint.status === 'Resolved' || selectedComplaint.status === 'Closed') && selectedComplaint.resolution && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-xl flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0" />
                <div>
                  <h4 className="font-bold text-green-900">Resolution Provided</h4>
                  <p className="text-sm text-green-800 mt-1">{selectedComplaint.resolution}</p>
                </div>
              </div>
            )}

            {/* Manager Action Lifecycle Tracker */}
            {selectedComplaint.status !== 'Closed' && (
              <div className="bg-page/50 border border-border rounded-xl p-5">
                <h3 className="font-bold text-primary mb-4 flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-indigo-600"/> Lifecycle Actions
                </h3>
                
                <div className="flex flex-wrap items-center gap-3">
                  {selectedComplaint.status === 'New' && (
                    <button onClick={() => handleStatusUpdate('Reviewed')} className="px-4 py-2 bg-orange-100 text-orange-700 hover:bg-orange-200 rounded-lg text-sm font-bold transition-all border border-orange-200">
                      Mark as Reviewed
                    </button>
                  )}
                  
                  {(selectedComplaint.status === 'New' || selectedComplaint.status === 'Reviewed') && (
                    <button onClick={handleAssign} className="px-4 py-2 bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-lg text-sm font-bold transition-all border border-blue-200">
                      Assign to Staff
                    </button>
                  )}

                  {selectedComplaint.status === 'Assigned' && (
                    <>
                      <div className="text-sm font-bold text-blue-700 px-3 py-2 bg-blue-50 rounded-lg border border-blue-100 flex items-center gap-2">
                        <Briefcase className="w-4 h-4"/> Assigned to: {selectedComplaint.assignedTo}
                      </div>
                      <button onClick={() => handleStatusUpdate('In Progress')} className="px-4 py-2 bg-purple-100 text-purple-700 hover:bg-purple-200 rounded-lg text-sm font-bold transition-all border border-purple-200">
                        Mark In Progress
                      </button>
                    </>
                  )}

                  {selectedComplaint.status === 'In Progress' && (
                    <button onClick={handleResolve} className="px-4 py-2 bg-green-100 text-green-700 hover:bg-green-200 rounded-lg text-sm font-bold transition-all border border-green-200 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4"/> Add Resolution & Resolve
                    </button>
                  )}
                  
                  {selectedComplaint.status === 'Resolved' && (
                    <button onClick={() => handleStatusUpdate('Closed')} className="px-4 py-2 bg-gray-800 text-white hover:bg-gray-900 rounded-lg text-sm font-bold transition-all flex items-center gap-2">
                      <XCircle className="w-4 h-4"/> Close Complaint
                    </button>
                  )}
                </div>
              </div>
            )}
            
            {selectedComplaint.status === 'Closed' && (
              <div className="flex justify-end">
                <button onClick={() => handleStatusUpdate('In Progress')} className="px-4 py-2 bg-card text-orange-600 border border-orange-200 dark:border-orange-800 hover:bg-orange-50 dark:hover:bg-orange-950/30 rounded-lg text-sm font-bold transition-all flex items-center gap-2 shadow-sm">
                  <RotateCcw className="w-4 h-4"/> Reopen Complaint
                </button>
              </div>
            )}

            {/* Comment Thread */}
            <div className="border border-border/50 rounded-xl overflow-hidden flex flex-col">
              <div className="p-3 bg-page/50 border-b border-border/50 font-bold text-primary flex items-center justify-between">
                <span>Discussion Thread</span>
                <span className="text-xs text-secondary font-medium">{(selectedComplaint.comments || []).length} updates</span>
              </div>
              
              <div className="p-4 space-y-4 max-h-60 overflow-y-auto bg-page/30">
                {(selectedComplaint.comments || []).map((cmt, idx) => (
                  <div key={idx} className={`flex flex-col ${cmt.isManager ? 'items-end' : 'items-start'}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-secondary">{cmt.user}</span>
                      <span className="text-[10px] text-gray-400">{cmt.time}</span>
                    </div>
                    <div className={`px-4 py-2 rounded-2xl max-w-[80%] text-sm ${
                      cmt.isManager ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-card border border-border text-primary rounded-bl-none shadow-sm'
                    }`}>
                      {cmt.text}
                    </div>
                  </div>
                ))}
                {(selectedComplaint.comments || []).length === 0 && (
                  <div className="text-center text-xs text-secondary italic">No comments yet.</div>
                )}
              </div>

              {selectedComplaint.status !== 'Closed' && (
                <div className="p-3 bg-card border-t border-border flex items-center gap-2">
                  <button className="p-2 text-secondary hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                    <ImageIcon className="w-5 h-5" />
                  </button>
                  <input 
                    type="text" 
                    placeholder="Add an internal note or reply to student..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
                    className="flex-1 px-3 py-2 bg-input border border-border rounded-lg text-sm focus:outline-none focus:border-indigo-500"
                  />
                  <button 
                    onClick={handleAddComment}
                    disabled={!newComment.trim()}
                    className="p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
      </div>
    </div>
  </div>
  );
}