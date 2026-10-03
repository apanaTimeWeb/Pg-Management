'use client';

import React, { useState } from 'react';
import { 
  Activity, Clock, IndianRupee, Users, MessageSquareWarning, 
  BedDouble, FileText, User, Filter, CalendarOff, LogIn
} from 'lucide-react';

const ACTIVITY_DATA = [
  {
    id: 1,
    type: 'payment',
    icon: IndianRupee,
    title: 'Fee Paid',
    description: 'Rent payment of ₹8,000 for October was successful.',
    date: '03 Oct 2026',
    time: '10:30 AM',
    color: 'text-success',
    bgColor: 'bg-success/10',
    borderColor: 'border-success/20'
  },
  {
    id: 2,
    type: 'visitor',
    icon: Users,
    title: 'Visitor Request Approved',
    description: 'Visitor pass for Rahul Sharma has been approved by the manager.',
    date: '02 Oct 2026',
    time: '04:15 PM',
    color: 'text-info',
    bgColor: 'bg-info/10',
    borderColor: 'border-info/20'
  },
  {
    id: 3,
    type: 'leave',
    icon: CalendarOff,
    title: 'Leave Request Submitted',
    description: 'Leave request from 10 Oct to 15 Oct submitted successfully.',
    date: '01 Oct 2026',
    time: '09:00 AM',
    color: 'text-warning',
    bgColor: 'bg-warning/10',
    borderColor: 'border-warning/20'
  },
  {
    id: 4,
    type: 'complaint',
    icon: MessageSquareWarning,
    title: 'Complaint Resolved',
    description: 'AC not cooling issue (Ticket #1024) has been resolved.',
    date: '30 Sep 2026',
    time: '02:45 PM',
    color: 'text-success',
    bgColor: 'bg-success/10',
    borderColor: 'border-success/20'
  },
  {
    id: 5,
    type: 'room',
    icon: BedDouble,
    title: 'Room Change Requested',
    description: 'Requested transfer from Room 102 to Room 205.',
    date: '28 Sep 2026',
    time: '11:20 AM',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    borderColor: 'border-primary/20'
  },
  {
    id: 6,
    type: 'document',
    icon: FileText,
    title: 'Document Uploaded',
    description: 'Aadhaar Card copy uploaded for verification.',
    date: '25 Sep 2026',
    time: '01:10 PM',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    borderColor: 'border-primary/20'
  },
  {
    id: 7,
    type: 'profile',
    icon: User,
    title: 'Profile Updated',
    description: 'Emergency contact details were updated.',
    date: '20 Sep 2026',
    time: '06:00 PM',
    color: 'text-info',
    bgColor: 'bg-info/10',
    borderColor: 'border-info/20'
  },
  {
    id: 8,
    type: 'login',
    icon: LogIn,
    title: 'New Device Login',
    description: 'Account accessed from a new device (Windows 11).',
    date: '15 Sep 2026',
    time: '10:05 PM',
    color: 'text-danger',
    bgColor: 'bg-danger/10',
    borderColor: 'border-danger/20'
  }
];

export function StudentHistoryMain() {
  const [filter, setFilter] = useState('all');

  const filteredData = filter === 'all' 
    ? ACTIVITY_DATA 
    : ACTIVITY_DATA.filter(item => item.type === filter);

  return (
    <div className="space-y-6 w-full max-w-4xl mx-auto pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-primary flex items-center gap-2">
            <Activity className="w-6 h-6 text-primary" />
            My Activity
          </h1>
          <p className="text-sm text-secondary mt-1">Track your recent actions, requests, and updates.</p>
        </div>
        
        {/* Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
          <Filter className="w-4 h-4 text-secondary shrink-0" />
          <select 
            className="bg-card border border-border text-primary text-sm rounded-lg px-3 py-2 outline-none font-semibold shadow-sm focus:border-primary"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Activities</option>
            <option value="payment">Payments</option>
            <option value="visitor">Visitors</option>
            <option value="leave">Leaves</option>
            <option value="complaint">Complaints</option>
            <option value="room">Room Requests</option>
            <option value="document">Documents</option>
            <option value="profile">Profile Updates</option>
            <option value="login">Logins</option>
          </select>
        </div>
      </div>

      <div className="bg-card border border-border rounded-[var(--radius-lg)] p-4 md:p-8 shadow-sm">
        <div className="relative border-l-2 border-border/50 ml-4 md:ml-6 space-y-8 pb-4">
          
          {filteredData.map((activity) => {
            const Icon = activity.icon;
            return (
              <div key={activity.id} className="relative pl-8 md:pl-10 group">
                {/* Timeline Dot/Icon */}
                <div className={`absolute -left-[17px] top-1 w-8 h-8 rounded-full flex items-center justify-center border-4 border-card shadow-sm ${activity.bgColor} ${activity.color}`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
                
                {/* Content Box */}
                <div className={`bg-page border ${activity.borderColor} rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow`}>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-2">
                    <h3 className="font-bold text-primary text-base flex items-center gap-2">
                      {activity.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-secondary bg-input px-2.5 py-1 rounded-md w-fit">
                      <Clock className="w-3.5 h-3.5" />
                      {activity.date} • {activity.time}
                    </div>
                  </div>
                  <p className="text-sm text-secondary leading-relaxed">
                    {activity.description}
                  </p>
                </div>
              </div>
            );
          })}

          {filteredData.length === 0 && (
            <div className="pl-10 py-10 text-center">
              <Activity className="w-10 h-10 text-secondary/30 mx-auto mb-3" />
              <p className="text-secondary font-medium">No activity found for the selected filter.</p>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
}
