'use client';

import { useState } from 'react';
import { useManagerPropertyContext } from '@/app/frontend_manager/manager_components/ManagerPropertyContext';
import { ClipboardCheck, Search, CheckCircle2, Circle } from 'lucide-react';
import { api } from '@/app/frontend_manager/manager_lib/manager_api/ManagerApi';

export function ManagerHousekeepingMain() {
  const { selectedPropertyId } = useManagerPropertyContext();
  const [search, setSearch] = useState('');
  
  // Basic mock data state for housekeeping
  const [tasks, setTasks] = useState([
    { id: '1', room: '101', status: 'pending', assignedTo: 'Ramesh (Cleaner)' },
    { id: '2', room: '102', status: 'completed', assignedTo: 'Suresh (Cleaner)' },
    { id: '3', room: '201', status: 'pending', assignedTo: 'Ramesh (Cleaner)' },
    { id: '4', room: '202', status: 'completed', assignedTo: 'Suresh (Cleaner)' },
    { id: '5', room: 'Common Area', status: 'pending', assignedTo: 'Ramesh (Cleaner)' },
  ]);

  if (!selectedPropertyId) return <div className="p-6 text-secondary">Property Required</div>;

  const toggleStatus = (id: string) => {
    setTasks(tasks.map(t => 
      t.id === id 
        ? { ...t, status: t.status === 'pending' ? 'completed' : 'pending' } 
        : t
    ));
  };

  const filteredTasks = tasks.filter(t => t.room.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6 pb-20 manager-theme animate-fade-in w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[24px] font-bold text-primary flex items-center gap-2 tracking-tight">
            <ClipboardCheck className="w-6 h-6 text-theme-primary" />
            Housekeeping
          </h1>
          <p className="text-sm text-secondary">Track daily room cleaning and maintenance.</p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-4">
        <div className="relative max-w-md mb-6">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
          <input 
            type="text" 
            placeholder="Search room..." 
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-input border border-border rounded-lg text-sm focus:border-primary outline-none"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border text-sm text-secondary">
                <th className="pb-3 font-medium px-4">Room / Area</th>
                <th className="pb-3 font-medium px-4">Assigned To</th>
                <th className="pb-3 font-medium px-4">Status</th>
                <th className="pb-3 font-medium px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {filteredTasks.map(task => (
                <tr key={task.id} className="border-b border-border/50 hover:bg-bg-page/50 transition-colors">
                  <td className="py-4 px-4 font-medium text-primary">{task.room}</td>
                  <td className="py-4 px-4 text-secondary">{task.assignedTo}</td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${task.status === 'completed' ? 'bg-success-bg text-success' : 'bg-warning-bg text-warning'}`}>
                      {task.status === 'completed' ? 'Completed' : 'Pending'}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button 
                      onClick={() => toggleStatus(task.id)}
                      className={`flex items-center gap-1.5 ml-auto px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${task.status === 'completed' ? 'bg-bg-page text-secondary hover:bg-danger-bg hover:text-danger' : 'bg-success text-white hover:bg-success-hover shadow-sm'}`}
                    >
                      {task.status === 'completed' ? <Circle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
                      {task.status === 'completed' ? 'Mark Pending' : 'Mark Done'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredTasks.length === 0 && (
            <div className="py-8 text-center text-secondary text-sm">
              No tasks found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
