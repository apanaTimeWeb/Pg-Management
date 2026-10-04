'use client';

import React, { useState } from 'react';
import { 
  Activity, Clock, Filter
} from 'lucide-react';
import { useStudentHistory } from '../student_history_hooks/useStudentHistory';

export function StudentHistoryMain() {
  const { loading, historyData } = useStudentHistory();
  const [filter, setFilter] = useState('all');

  if (loading) {
    return <div className="p-8 text-center text-secondary">Loading activity history...</div>;
  }

  const filteredData = filter === 'all' 
    ? historyData 
    : historyData.filter(item => item.type === filter);

  return (
    <div className="space-y-6 w-full pb-10">
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
