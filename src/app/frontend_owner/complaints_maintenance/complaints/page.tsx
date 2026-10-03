'use client';

import React, { useState } from 'react';
import { 
  Wrench, Zap, Droplet, Brush, Sofa, Wifi, 
  Bed, UtensilsCrossed, ShieldAlert, FileWarning, 
  MoreVertical, Clock, CheckCircle2, UserCheck, 
  Camera, MessageSquare, DollarSign, ArrowRight,
  Filter, Search, AlertCircle, Plus, X
} from 'lucide-react';

const CATEGORY_ICONS: any = {
  'Electrical': Zap, 'Plumbing': Droplet, 'Cleaning': Brush,
  'Furniture': Sofa, 'Internet': Wifi, 'Room': Bed,
  'Food': UtensilsCrossed, 'Water': Droplet, 'Safety': ShieldAlert, 'Other': FileWarning
};

const STATUS_FLOW = ['Created', 'Review', 'Assign', 'In Progress', 'Resolved', 'Closed'];

const MOCK_COMPLAINTS = [
  { id: 'TKT-1042', room: '205', student: 'Aman Singh', category: 'Electrical', desc: 'Ceiling fan is making a loud noise and speed is very slow.', priority: 'High', status: 'In Progress', assignedTo: 'Rajesh (Electrician)', date: 'Today, 10:30 AM', cost: 0, photos: 1, comments: 2 },
  { id: 'TKT-1041', room: '102', student: 'Vikram Patel', category: 'Plumbing', desc: 'Bathroom tap is leaking continuously.', priority: 'Medium', status: 'Assign', assignedTo: 'Unassigned', date: 'Yesterday, 4:15 PM', cost: 0, photos: 0, comments: 0 },
  { id: 'TKT-1040', room: 'Mess', student: 'Multiple', category: 'Food', desc: 'Rice served yesterday was not cooked properly.', priority: 'High', status: 'Closed', assignedTo: 'Ramesh (Cook)', date: '01 Oct 2026', cost: 0, photos: 0, comments: 3 },
  { id: 'TKT-1039', room: '304', student: 'Rahul Kumar', category: 'Internet', desc: 'Wi-Fi router on the 3rd floor is disconnecting frequently.', priority: 'Medium', status: 'Resolved', assignedTo: 'Airtel Support', date: '30 Sep 2026', cost: 500, photos: 0, comments: 1 },
  { id: 'TKT-1038', room: 'Hall', student: 'System', category: 'Cleaning', desc: 'Deep cleaning required for common hall.', priority: 'Low', status: 'Review', assignedTo: 'Unassigned', date: '28 Sep 2026', cost: 0, photos: 0, comments: 0 },
];

export default function ComplaintsMaintenancePage() {
  const [selectedTicket, setSelectedTicket] = useState<any | null>(null);

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'High': return 'text-red-600 bg-red-100 border-red-200';
      case 'Medium': return 'text-orange-600 bg-orange-100 border-orange-200';
      case 'Low': return 'text-green-600 bg-green-100 border-green-200';
      default: return 'text-secondary bg-[var(--bg-overlay)] border-border';
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Created': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'Review': return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'Assign': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'In Progress': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'Resolved': return 'text-emerald-600 bg-emerald-50 border-emerald-200';
      case 'Closed': return 'text-secondary bg-[var(--bg-overlay)] border-border';
      default: return 'text-secondary bg-[var(--bg-overlay)] border-border';
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 h-[calc(100vh-6rem)] flex flex-col">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
            <Wrench className="w-7 h-7 text-[#F5A623]" />
            Complaints & Maintenance
          </h1>
          <p className="text-[var(--text-disabled)] text-sm mt-1">Combined operational dashboard for ticketing and repairs.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-[#F5A623] hover:bg-[#e09612] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-colors">
            <Plus className="w-4 h-4" /> New Ticket
          </button>
        </div>
      </div>

      <div className="flex flex-1 gap-6 min-h-0 overflow-hidden">
        {/* Left Side: Ticket List */}
        <div className={`flex-1 bg-card rounded-2xl shadow-sm border border-border/50 flex flex-col overflow-hidden transition-all ${selectedTicket ? 'hidden lg:flex lg:w-1/2' : 'w-full'}`}>
          <div className="p-4 border-b border-border/50 bg-page/50 flex flex-col gap-3 shrink-0">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-primary">Active Tickets</h2>
              <div className="flex gap-2">
                <button className="p-2 bg-card border border-border rounded-lg hover:bg-page tooltip-trigger"><Filter className="w-4 h-4 text-[var(--text-disabled)]" /></button>
              </div>
            </div>
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" placeholder="Search by ticket ID, room, or student..." className="w-full pl-9 pr-4 py-2 border border-border rounded-xl text-sm focus:outline-none focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623] bg-card" />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {MOCK_COMPLAINTS.map(ticket => {
              const Icon = CATEGORY_ICONS[ticket.category] || FileWarning;
              const isSelected = selectedTicket?.id === ticket.id;
              
              return (
                <div 
                  key={ticket.id} 
                  onClick={() => setSelectedTicket(ticket)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${isSelected ? 'border-[#F5A623] bg-[#F5A623]/5 shadow-sm' : 'border-border hover:border-[#F5A623] hover:shadow-sm bg-card'}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-primary">{ticket.id}</span>
                      <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md border ${getPriorityColor(ticket.priority)}`}>
                        {ticket.priority}
                      </span>
                    </div>
                    <span className="text-xs font-semibold text-[var(--text-disabled)]">{ticket.date}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-bold text-secondary bg-[var(--bg-overlay)] px-2 py-1 rounded-md">Room {ticket.room}</span>
                    <span className="text-xs font-semibold text-secondary">{ticket.student}</span>
                  </div>
                  
                  <h3 className="text-sm text-secondary font-medium line-clamp-2 mb-3">"{ticket.desc}"</h3>
                  
                  <div className="flex items-center justify-between pt-3 border-t border-border/50">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-[var(--bg-overlay)] text-[var(--text-disabled)] rounded-lg"><Icon className="w-3.5 h-3.5" /></div>
                      <span className="text-xs font-bold text-secondary">{ticket.category}</span>
                    </div>
                    <span className={`px-2.5 py-1 text-[10px] font-bold uppercase rounded-full border ${getStatusColor(ticket.status)}`}>
                      {ticket.status}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Right Side: Ticket Details (Operational Module) */}
        {selectedTicket ? (
          <div className="flex-1 bg-card rounded-2xl shadow-sm border border-border/50 flex flex-col overflow-hidden animate-in fade-in slide-in-from-right-4 duration-300">
            {/* Header */}
            <div className="p-4 border-b border-border/50 flex items-center justify-between shrink-0 bg-page">
              <div className="flex items-center gap-3">
                <button onClick={() => setSelectedTicket(null)} className="lg:hidden p-1 bg-card border border-border rounded-lg mr-1"><ArrowRight className="w-4 h-4 rotate-180" /></button>
                <div>
                  <h2 className="text-lg font-bold text-primary">{selectedTicket.id}</h2>
                  <p className="text-xs text-[var(--text-disabled)] font-medium">Room {selectedTicket.room} • {selectedTicket.student}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <span className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg border shadow-sm ${getStatusColor(selectedTicket.status)}`}>
                  {selectedTicket.status}
                </span>
                <button onClick={() => setSelectedTicket(null)} className="hidden lg:flex p-1.5 text-gray-400 hover:text-primary hover:bg-gray-200 rounded-lg transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              
              {/* Timeline Flow */}
              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Resolution Flow</h3>
                <div className="flex items-center justify-between relative">
                  <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gray-200 -z-10 -translate-y-1/2"></div>
                  {STATUS_FLOW.map((step, idx) => {
                    const currentIndex = STATUS_FLOW.indexOf(selectedTicket.status);
                    const isPassed = idx < currentIndex;
                    const isCurrent = idx === currentIndex;
                    
                    return (
                      <div key={step} className="flex flex-col items-center gap-2 bg-card px-2">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-colors ${
                          isPassed ? 'bg-green-500 text-white shadow-sm' : 
                          isCurrent ? 'bg-[#F5A623] text-white ring-4 ring-[#F5A623]/20 shadow-md' : 
                          'bg-[var(--bg-overlay)] text-gray-400 border border-border'
                        }`}>
                          {isPassed ? <CheckCircle2 className="w-3.5 h-3.5" /> : (idx + 1)}
                        </div>
                        <span className={`text-[10px] font-bold ${isCurrent ? 'text-[#F5A623]' : isPassed ? 'text-green-600' : 'text-gray-400'}`}>{step}</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Details & Assignment */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Complaint Details</h3>
                  <div className="p-4 bg-page border border-border/50 rounded-xl">
                    <p className="text-sm text-secondary leading-relaxed font-medium">"{selectedTicket.desc}"</p>
                    
                    <div className="mt-4 flex flex-wrap gap-2">
                      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-card border border-border rounded-lg text-xs font-semibold text-secondary">
                        <Camera className="w-3.5 h-3.5 text-blue-500" /> {selectedTicket.photos} Photos
                      </div>
                      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-card border border-border rounded-lg text-xs font-semibold text-secondary">
                        <MessageSquare className="w-3.5 h-3.5 text-purple-500" /> {selectedTicket.comments} Comments
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Assign To Manager/Staff</h3>
                    <select 
                      className="w-full px-4 py-2.5 rounded-xl border border-border focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623] outline-none text-sm font-semibold text-secondary bg-card"
                      defaultValue={selectedTicket.assignedTo}
                    >
                      <option value="Unassigned">Select Staff Member...</option>
                      <option value="Rajesh (Electrician)">Rajesh (Electrician)</option>
                      <option value="Ramesh (Cook)">Ramesh (Cook)</option>
                      <option value="Amit (Manager)">Amit (Manager)</option>
                      <option value="Airtel Support">Airtel Support</option>
                    </select>
                  </div>
                  
                  <div>
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Resolution Cost</h3>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input 
                        type="number" 
                        value={selectedTicket.cost} 
                        readOnly
                        className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623] outline-none text-sm font-bold text-secondary bg-card" 
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-border/50">
                <button className="flex-1 min-w-[120px] py-2.5 bg-[#1A3A5C] text-white rounded-xl text-sm font-bold hover:bg-[#122a42] transition-colors shadow-sm">
                  Update Status
                </button>
                <button className="flex-1 min-w-[120px] py-2.5 bg-green-600 text-white rounded-xl text-sm font-bold hover:bg-green-700 transition-colors shadow-sm flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Mark Resolved
                </button>
                <button className="py-2.5 px-4 bg-[var(--bg-overlay)] text-secondary rounded-xl text-sm font-bold hover:bg-gray-200 transition-colors border border-border">
                  Add Comment
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="hidden lg:flex flex-1 bg-card rounded-2xl border border-border/50 border-dashed flex-col items-center justify-center text-center p-8">
            <Wrench className="w-16 h-16 text-gray-200 mb-4" />
            <h2 className="text-xl font-bold text-primary mb-2">Select a Complaint</h2>
            <p className="text-[var(--text-disabled)] max-w-sm">Click on any ticket from the list on the left to view details, assign staff, update the status, and track repair costs.</p>
          </div>
        )}
      </div>
    </div>
  );
}
