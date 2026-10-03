'use client';

import { useState } from 'react';
import { useManagerPropertyContext } from '@/app/manager/manager_components/ManagerPropertyContext';
import { Calendar, Search, CheckCircle2, XCircle } from 'lucide-react';

export function ManagerLeavesMain() {
  const { selectedPropertyId } = useManagerPropertyContext();
  const [search, setSearch] = useState('');
  
  // Basic mock data state for leaves
  const [leaves, setLeaves] = useState([
    { id: '1', studentName: 'Rahul Kumar', room: '101', fromDate: '2023-11-01', toDate: '2023-11-05', reason: 'Going Home', status: 'pending' },
    { id: '2', studentName: 'Amit Sharma', room: '205', fromDate: '2023-11-02', toDate: '2023-11-03', reason: 'College Trip', status: 'approved' },
  ]);

  if (!selectedPropertyId) return <div className="p-6 text-secondary">Property Required</div>;

  const updateStatus = (id: string, status: string) => {
    setLeaves(leaves.map(l => 
      l.id === id ? { ...l, status } : l
    ));
  };

  const filteredLeaves = leaves.filter(l => 
    l.studentName.toLowerCase().includes(search.toLowerCase()) || 
    l.room.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-20 manager-theme animate-fade-in max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[24px] font-bold text-primary flex items-center gap-2 tracking-tight">
            <Calendar className="w-6 h-6 text-theme-primary" />
            Leave Requests
          </h1>
          <p className="text-sm text-secondary">Manage resident gate passes and leaves.</p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-4">
        <div className="relative max-w-md mb-6">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
          <input 
            type="text" 
            placeholder="Search by student or room..." 
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-input border border-border rounded-lg text-sm focus:border-primary outline-none"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border text-sm text-secondary">
                <th className="pb-3 font-medium px-4">Resident</th>
                <th className="pb-3 font-medium px-4">Dates</th>
                <th className="pb-3 font-medium px-4">Reason</th>
                <th className="pb-3 font-medium px-4">Status</th>
                <th className="pb-3 font-medium px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {filteredLeaves.map(leave => (
                <tr key={leave.id} className="border-b border-border/50 hover:bg-bg-page/50 transition-colors">
                  <td className="py-4 px-4">
                    <p className="font-medium text-primary">{leave.studentName}</p>
                    <p className="text-xs text-secondary">Room {leave.room}</p>
                  </td>
                  <td className="py-4 px-4 text-secondary">
                    {leave.fromDate} to {leave.toDate}
                  </td>
                  <td className="py-4 px-4 text-secondary max-w-[200px] truncate">{leave.reason}</td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold 
                      ${leave.status === 'approved' ? 'bg-success/10 text-success' : 
                        leave.status === 'rejected' ? 'bg-danger/10 text-danger' : 
                        'bg-warning/10 text-warning'}`}>
                      {leave.status.charAt(0).toUpperCase() + leave.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    {leave.status === 'pending' && (
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => updateStatus(leave.id, 'approved')}
                          className="p-2 bg-success/10 text-success hover:bg-success hover:text-white rounded-lg transition-colors"
                          title="Approve"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => updateStatus(leave.id, 'rejected')}
                          className="p-2 bg-danger/10 text-danger hover:bg-danger hover:text-white rounded-lg transition-colors"
                          title="Reject"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredLeaves.length === 0 && (
            <div className="py-8 text-center text-secondary text-sm">
              No leave requests found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
