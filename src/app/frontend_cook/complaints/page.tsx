'use client';

import React, { useState } from 'react';
import { 
  AlertTriangle, 
  UserRound, 
  CalendarDays,
  MessageSquare,
  Wrench,
  CheckCircle2,
  Lock,
  ChevronDown,
  ChevronRight,
  Flame,
  Thermometer,
  Clock,
  Utensils
} from 'lucide-react';

type ComplaintCategory = 'Taste' | 'Quality' | 'Quantity' | 'Hygiene' | 'Menu' | 'Timing' | 'Temperature' | 'Food Item' | 'Other';
type ComplaintStatus = 'New' | 'Received' | 'In Progress' | 'Resolved' | 'Closed';
type ComplaintPriority = 'Low' | 'Medium' | 'High' | 'Critical';

interface Complaint {
  id: string;
  student: string;
  room: string;
  category: ComplaintCategory;
  description: string;
  date: string;
  time: string;
  priority: ComplaintPriority;
  status: ComplaintStatus;
  comments: { sender: string; text: string; time: string }[];
  resolution?: string;
}

const MOCK_COMPLAINTS: Complaint[] = [
  {
    id: 'CMP-1042',
    student: 'Rahul Verma',
    room: 'Room 204',
    category: 'Taste',
    description: 'The dal served in lunch today was very salty.',
    date: '04 Oct 2026',
    time: '01:30 PM',
    priority: 'Medium',
    status: 'New',
    comments: [
      { sender: 'Manager', text: 'Assigned to kitchen. Please check the salt levels for dinner prep.', time: '02:00 PM' }
    ]
  },
  {
    id: 'CMP-1040',
    student: 'Ananya Sharma',
    room: 'Room 105',
    category: 'Temperature',
    description: 'Breakfast parathas were served cold at 8:30 AM.',
    date: '03 Oct 2026',
    time: '09:00 AM',
    priority: 'High',
    status: 'In Progress',
    comments: [
      { sender: 'Manager', text: 'Ensure the hot case is turned on before serving time.', time: '09:30 AM' },
      { sender: 'Cook (You)', text: 'Noted. The hotcase element was faulty, getting it fixed.', time: '10:00 AM' }
    ]
  },
  {
    id: 'CMP-1035',
    student: 'Vikram Singh',
    room: 'Room 302',
    category: 'Hygiene',
    description: 'Found a small piece of plastic wrapper in the evening snack.',
    date: '01 Oct 2026',
    time: '06:00 PM',
    priority: 'Critical',
    status: 'Resolved',
    resolution: 'Apologized to the student. Informed all kitchen staff to open packets strictly away from cooking vessels.',
    comments: []
  },
  {
    id: 'CMP-1020',
    student: 'Sneha Patel',
    room: 'Room 401',
    category: 'Timing',
    description: 'Dinner was delayed by 40 minutes on Sunday.',
    date: '28 Sep 2026',
    time: '09:40 PM',
    priority: 'Medium',
    status: 'Closed',
    resolution: 'Gas cylinder was empty. Switched to backup earlier now.',
    comments: []
  }
];

const getPriorityStyle = (priority: ComplaintPriority) => {
  switch (priority) {
    case 'Low': return 'bg-green-100 text-green-700 border-green-200';
    case 'Medium': return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'High': return 'bg-orange-100 text-orange-700 border-orange-200';
    case 'Critical': return 'bg-red-100 text-red-700 border-red-200 font-bold';
  }
};

const getStatusStyle = (status: ComplaintStatus) => {
  switch (status) {
    case 'New': return 'bg-primary text-white';
    case 'Received': return 'bg-indigo-100 text-indigo-700 border-indigo-200';
    case 'In Progress': return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'Resolved': return 'bg-green-100 text-green-700 border-green-200';
    case 'Closed': return 'bg-page text-secondary border-border';
  }
};

const getCategoryIcon = (category: ComplaintCategory) => {
  switch (category) {
    case 'Taste':
    case 'Food Item':
    case 'Menu':
    case 'Quality': return <Utensils className="w-4 h-4" />;
    case 'Temperature': return <Thermometer className="w-4 h-4" />;
    case 'Timing': return <Clock className="w-4 h-4" />;
    default: return <AlertTriangle className="w-4 h-4" />;
  }
};

export default function FoodComplaintsPage() {
  const [complaints, setComplaints] = useState<Complaint[]>(MOCK_COMPLAINTS);
  const [filter, setFilter] = useState<'Active' | 'Resolved/Closed' | 'All'>('Active');
  const [expandedId, setExpandedId] = useState<string | null>(complaints[0]?.id || null);
  const [replyText, setReplyText] = useState('');

  const updateStatus = (id: string, newStatus: ComplaintStatus, resolutionText?: string) => {
    setComplaints(prev => prev.map(c => {
      if (c.id === id) {
        const updated = { ...c, status: newStatus };
        if (resolutionText) updated.resolution = resolutionText;
        return updated;
      }
      return c;
    }));
  };

  const addComment = (id: string) => {
    if (!replyText.trim()) return;
    setComplaints(prev => prev.map(c => {
      if (c.id === id) {
        return {
          ...c,
          comments: [...c.comments, { sender: 'Cook (You)', text: replyText, time: 'Just now' }]
        };
      }
      return c;
    }));
    setReplyText('');
  };

  const filteredComplaints = complaints.filter(c => {
    if (filter === 'Active') return c.status !== 'Resolved' && c.status !== 'Closed';
    if (filter === 'Resolved/Closed') return c.status === 'Resolved' || c.status === 'Closed';
    return true;
  });

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary/10 rounded-xl">
            <AlertTriangle className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-primary tracking-tight">Food Complaints</h1>
            <p className="text-sm text-secondary">Review and resolve food-related issues raised by students</p>
          </div>
        </div>
        
        {/* Flow visualizer */}
        <div className="hidden lg:flex items-center gap-2 text-xs font-semibold text-secondary/60 bg-card border border-border px-4 py-2 rounded-lg shadow-sm">
          <span>Student</span>
          <ChevronRight className="w-3 h-3" />
          <span>Manager</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-primary">Cook Action</span>
          <ChevronRight className="w-3 h-3" />
          <span>Resolved</span>
          <ChevronRight className="w-3 h-3" />
          <span>Closed (Mgr)</span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center bg-card border border-border rounded-lg p-1 w-fit shadow-sm">
        {['Active', 'Resolved/Closed', 'All'].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab as any)}
            className={`px-4 py-2 text-sm font-semibold rounded-md transition-all ${
              filter === tab 
                ? 'bg-primary text-white shadow-md' 
                : 'text-secondary hover:text-primary hover:bg-page'
            }`}
          >
            {tab}
            {tab === 'Active' && complaints.some(c => c.status === 'New') && (
              <span className="ml-2 bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full">
                {complaints.filter(c => c.status === 'New').length} New
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Complaints List */}
      <div className="space-y-4">
        {filteredComplaints.map((complaint) => {
          const isExpanded = expandedId === complaint.id;
          const isClosed = complaint.status === 'Closed';
          const isResolved = complaint.status === 'Resolved';

          return (
            <div 
              key={complaint.id} 
              className={`bg-card border rounded-xl overflow-hidden shadow-sm transition-all
                ${isClosed || isResolved ? 'border-border/50 opacity-80' : 'border-border hover:border-primary/40'}
                ${complaint.priority === 'Critical' && !isClosed && !isResolved ? 'border-red-500/50 shadow-red-500/5' : ''}
              `}
            >
              {/* Header (Clickable to expand) */}
              <button 
                onClick={() => setExpandedId(isExpanded ? null : complaint.id)}
                className={`w-full p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors ${isExpanded ? 'bg-page/50 border-b border-border' : 'hover:bg-page/30'}`}
              >
                <div className="flex items-start sm:items-center gap-4 text-left">
                  <div className={`p-2.5 rounded-lg border flex items-center justify-center shrink-0 ${getPriorityStyle(complaint.priority)}`}>
                    {getCategoryIcon(complaint.category)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-primary">{complaint.id}</span>
                      <span className="text-sm font-medium text-secondary/70">&bull;</span>
                      <span className="text-sm font-semibold text-secondary">{complaint.category}</span>
                    </div>
                    <h3 className="text-sm text-primary font-medium mt-0.5 max-w-xl truncate">
                      "{complaint.description}"
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-4 pl-14 sm:pl-0">
                  <div className="text-left sm:text-right hidden sm:block">
                    <span className="block text-xs font-medium text-secondary">{complaint.date}</span>
                    <span className="block text-xs font-semibold text-primary">{complaint.student} ({complaint.room})</span>
                  </div>
                  <div className={`px-2.5 py-1 text-xs font-bold rounded-md border shrink-0 ${getStatusStyle(complaint.status)}`}>
                    {complaint.status}
                  </div>
                  <ChevronDown className={`w-5 h-5 text-secondary transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                </div>
              </button>

              {/* Expanded Content */}
              {isExpanded && (
                <div className="p-5 space-y-6">
                  {/* Complaint Details Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-page/50 border border-border rounded-lg text-sm">
                    <div>
                      <span className="block text-xs font-medium text-secondary mb-1">Student</span>
                      <span className="font-bold text-primary flex items-center gap-1.5"><UserRound className="w-3.5 h-3.5" />{complaint.student}</span>
                      <span className="text-xs text-secondary mt-0.5 block">{complaint.room}</span>
                    </div>
                    <div>
                      <span className="block text-xs font-medium text-secondary mb-1">Reported On</span>
                      <span className="font-bold text-primary flex items-center gap-1.5"><CalendarDays className="w-3.5 h-3.5" />{complaint.date}</span>
                      <span className="text-xs text-secondary mt-0.5 block">{complaint.time}</span>
                    </div>
                    <div>
                      <span className="block text-xs font-medium text-secondary mb-1">Priority</span>
                      <span className={`inline-flex px-2 py-0.5 rounded text-xs font-bold border ${getPriorityStyle(complaint.priority)}`}>
                        {complaint.priority}
                      </span>
                    </div>
                    <div>
                      <span className="block text-xs font-medium text-secondary mb-1">Manager Assignment</span>
                      <span className="font-bold text-primary text-xs bg-card border border-border px-2 py-1 rounded-md">
                        Assigned to Kitchen
                      </span>
                    </div>
                  </div>

                  {/* Full Description & Resolution */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xs font-bold text-secondary uppercase tracking-wider mb-2">Complaint Description</h4>
                      <p className="text-sm text-primary bg-page border border-border p-3 rounded-lg leading-relaxed">
                        {complaint.description}
                      </p>
                    </div>

                    {(complaint.resolution || isResolved || isClosed) && (
                      <div>
                        <h4 className="text-xs font-bold text-green-600 uppercase tracking-wider mb-2 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Resolution / Action Taken
                        </h4>
                        <p className="text-sm text-primary bg-green-50 border border-green-200 p-3 rounded-lg leading-relaxed">
                          {complaint.resolution || "Resolved. Awaiting manager closure."}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Comments Thread */}
                  <div>
                    <h4 className="text-xs font-bold text-secondary uppercase tracking-wider mb-3">Communication Thread</h4>
                    <div className="space-y-3">
                      {complaint.comments.map((comment, idx) => (
                        <div key={idx} className={`flex gap-3 ${comment.sender.includes('You') ? 'flex-row-reverse' : ''}`}>
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${comment.sender.includes('You') ? 'bg-primary text-white' : 'bg-secondary/20 text-primary'}`}>
                            {comment.sender.charAt(0)}
                          </div>
                          <div className={`flex flex-col ${comment.sender.includes('You') ? 'items-end' : 'items-start'} max-w-[80%]`}>
                            <span className="text-[10px] font-bold text-secondary mb-1">
                              {comment.sender} &bull; {comment.time}
                            </span>
                            <div className={`p-2.5 rounded-lg text-sm ${comment.sender.includes('You') ? 'bg-primary/10 border border-primary/20 text-primary' : 'bg-page border border-border text-primary'}`}>
                              {comment.text}
                            </div>
                          </div>
                        </div>
                      ))}
                      
                      {/* Add Comment Input */}
                      {!isClosed && !isResolved && (
                        <div className="flex gap-2 mt-4 pt-4 border-t border-border">
                          <input 
                            type="text" 
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder="Add a comment or update..."
                            className="flex-1 bg-page border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary transition-colors"
                            onKeyDown={(e) => e.key === 'Enter' && addComment(complaint.id)}
                          />
                          <button 
                            onClick={() => addComment(complaint.id)}
                            disabled={!replyText.trim()}
                            className="bg-page border border-border hover:bg-primary/10 hover:text-primary hover:border-primary/30 text-secondary px-4 py-2 rounded-lg text-sm font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Reply
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Cook Actions */}
                  {!isClosed && (
                    <div className="flex flex-wrap items-center gap-3 pt-5 border-t border-border">
                      {complaint.status === 'New' && (
                        <button 
                          onClick={() => updateStatus(complaint.id, 'Received')}
                          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-sm"
                        >
                          <MessageSquare className="w-4 h-4" /> Acknowledge Receipt
                        </button>
                      )}
                      
                      {(complaint.status === 'New' || complaint.status === 'Received') && (
                        <button 
                          onClick={() => updateStatus(complaint.id, 'In Progress')}
                          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-sm"
                        >
                          <Wrench className="w-4 h-4" /> Take Action (In Progress)
                        </button>
                      )}
                      
                      {complaint.status === 'In Progress' && (
                        <button 
                          onClick={() => {
                            const res = prompt("Enter resolution notes (What action was taken?):");
                            if (res !== null) updateStatus(complaint.id, 'Resolved', res || 'Action taken and resolved.');
                          }}
                          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-sm"
                        >
                          <CheckCircle2 className="w-4 h-4" /> Mark as Resolved
                        </button>
                      )}

                      {isResolved && (
                        <div className="flex items-center gap-2 text-sm font-bold text-secondary bg-page px-4 py-2 rounded-lg border border-border">
                          <Lock className="w-4 h-4" /> Waiting for Manager to Close
                        </div>
                      )}
                    </div>
                  )}

                  {isClosed && (
                    <div className="flex items-center justify-center gap-2 text-sm font-bold text-secondary bg-page px-4 py-3 rounded-lg border border-border mt-2">
                      <Lock className="w-4 h-4" /> This complaint has been reviewed and closed by the Manager.
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {filteredComplaints.length === 0 && (
          <div className="flex flex-col items-center justify-center p-12 bg-card border border-border rounded-xl">
            <AlertTriangle className="w-12 h-12 text-secondary/30 mb-4" />
            <h3 className="text-lg font-medium text-primary">No Complaints Found</h3>
            <p className="text-sm text-secondary mt-1">There are no {filter.toLowerCase()} complaints.</p>
          </div>
        )}
      </div>
    </div>
  );
}
