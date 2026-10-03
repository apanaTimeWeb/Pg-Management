// @ts-nocheck
'use client';

import React, { useState } from 'react';
import { 
  Wrench, Search, Filter, AlertTriangle, MessageSquareWarning, 
  CheckCircle2, Clock, UserCog, IndianRupee, FileText, ChevronRight,
  User
} from 'lucide-react';

type TaskStatus = 'Pending' | 'Assigned' | 'In Progress' | 'Completed';

interface MaintenanceTask {
  id: string;
  complaintId: string;
  room: string;
  student: string;
  issue: string;
  status: TaskStatus;
  isEmergency: boolean;
  assignedTo?: string;
  vendor?: string;
  cost?: number;
  partsUsed?: string;
  dateCreated: string;
}

const INITIAL_TASKS: MaintenanceTask[] = [
  {
    id: 'MT-1001',
    complaintId: 'C-089',
    room: '102',
    student: 'Rahul Sharma',
    issue: 'Fan is making loud noise and rotating slowly.',
    status: 'In Progress',
    isEmergency: false,
    assignedTo: 'Ramesh (Electrician)',
    dateCreated: '03 Oct 2026'
  },
  {
    id: 'MT-1002',
    complaintId: 'C-090',
    room: '205',
    student: 'Amit Kumar',
    issue: 'Water leaking from bathroom tap.',
    status: 'Pending',
    isEmergency: true,
    dateCreated: '03 Oct 2026'
  },
  {
    id: 'MT-0995',
    complaintId: 'C-075',
    room: '304',
    student: 'Vikas Singh',
    issue: 'AC not cooling properly.',
    status: 'Completed',
    isEmergency: false,
    assignedTo: 'CoolTech Services',
    vendor: 'CoolTech AC Repair',
    cost: 1500,
    partsUsed: 'Gas refill, Filter change',
    dateCreated: '01 Oct 2026'
  }
];

export default function ManagerMaintenanceMain() {
  const [tasks, setTasks] = useState<MaintenanceTask[]>(INITIAL_TASKS);
  const [selectedTask, setSelectedTask] = useState<MaintenanceTask>(INITIAL_TASKS[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'All' | TaskStatus>('All');

  const filteredTasks = tasks.filter(t => {
    const matchesSearch = t.issue.toLowerCase().includes(searchTerm.toLowerCase()) || t.room.includes(searchTerm);
    const matchesStatus = filterStatus === 'All' || t.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case 'Pending': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'Assigned': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'In Progress': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Completed': return 'bg-green-100 text-green-700 border-green-200';
    }
  };

  const handleUpdateStatus = (newStatus: TaskStatus) => {
    setTasks(prev => prev.map(t => t.id === selectedTask.id ? { ...t, status: newStatus } : t));
    setSelectedTask(prev => ({ ...prev, status: newStatus }));
  };

  const handleRecordCost = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const vendor = (form.elements.namedItem('vendor') as HTMLInputElement).value;
    const parts = (form.elements.namedItem('parts') as HTMLInputElement).value;
    const cost = parseInt((form.elements.namedItem('cost') as HTMLInputElement).value) || 0;
    
    setTasks(prev => prev.map(t => t.id === selectedTask.id ? { 
      ...t, vendor, partsUsed: parts, cost, status: 'Completed' 
    } : t));
    setSelectedTask(prev => ({ ...prev, vendor, partsUsed: parts, cost, status: 'Completed' }));
  };

  return (
    <div className="p-4 md:p-8 space-y-6 animate-in fade-in duration-500 max-w-7xl mx-auto h-[calc(100vh-4rem)] flex flex-col">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-black text-primary flex items-center gap-3">
            <div className="p-2 bg-indigo-100 rounded-xl text-indigo-600">
              <Wrench className="w-6 h-6"/>
            </div>
            Maintenance & Repairs
          </h1>
          <p className="text-[var(--text-disabled)] text-sm mt-1 font-medium">Manage maintenance tasks linked to student complaints.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
        
        {/* Left Side: Tasks List */}
        <div className="lg:col-span-1 bg-card border border-border/60 rounded-2xl shadow-sm flex flex-col min-h-0">
          
          <div className="p-4 border-b border-border/50 bg-page/30 shrink-0 space-y-3">
            <div className="flex gap-2 overflow-x-auto hide-scrollbar">
              {['All', 'Pending', 'In Progress', 'Completed'].map(status => (
                <button 
                  key={status}
                  onClick={() => setFilterStatus(status as any)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
                    filterStatus === status 
                      ? 'bg-indigo-600 text-white border-indigo-600' 
                      : 'bg-white text-secondary border-border/60 hover:border-indigo-300'
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
                placeholder="Search by room or issue..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-input border border-border rounded-lg text-sm font-medium focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {filteredTasks.map(task => (
              <div 
                key={task.id}
                onClick={() => setSelectedTask(task)}
                className={`p-3 rounded-xl cursor-pointer transition-all ${
                  selectedTask.id === task.id 
                    ? 'bg-indigo-50 border border-indigo-200 shadow-sm' 
                    : 'bg-transparent border border-transparent hover:bg-page/50'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-secondary bg-white px-2 py-0.5 rounded border border-border">Rm {task.room}</span>
                      {task.isEmergency && <AlertTriangle className="w-3.5 h-3.5 text-red-500" />}
                    </div>
                    <h4 className="font-bold text-primary mt-1 truncate">{task.issue}</h4>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider border ${getStatusColor(task.status)}`}>
                    {task.status}
                  </span>
                  <span className="text-[10px] font-medium text-secondary">{task.dateCreated}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Task Flow & Details */}
        <div className="lg:col-span-2 bg-card border border-border/60 rounded-2xl shadow-sm flex flex-col min-h-0 overflow-y-auto">
          
          {/* Header Info */}
          <div className="p-6 border-b border-border/50 bg-page/30 shrink-0">
            <div className="flex items-center justify-between mb-4">
              <span className={`px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wider border ${getStatusColor(selectedTask.status)}`}>
                {selectedTask.status}
              </span>
              <span className="text-sm font-bold text-secondary">Task ID: {selectedTask.id}</span>
            </div>
            
            <h2 className="text-2xl font-black text-primary leading-tight">{selectedTask.issue}</h2>
            
            <div className="flex flex-wrap items-center gap-4 mt-4">
              <div className="flex items-center gap-2 text-sm font-bold text-secondary bg-white px-3 py-1.5 rounded-lg border border-border">
                <User className="w-4 h-4" /> {selectedTask.student}
              </div>
              <div className="flex items-center gap-2 text-sm font-bold text-secondary bg-white px-3 py-1.5 rounded-lg border border-border">
                <MessageSquareWarning className="w-4 h-4" /> Linked to {selectedTask.complaintId}
              </div>
              {selectedTask.isEmergency && (
                <div className="flex items-center gap-1.5 text-sm font-bold text-red-600 bg-red-50 px-3 py-1.5 rounded-lg border border-red-200">
                  <AlertTriangle className="w-4 h-4" /> Emergency
                </div>
              )}
            </div>
          </div>

          <div className="p-6 flex-1 space-y-8">
            
            {/* Visual Flow Pipeline */}
            <div className="bg-white p-4 rounded-xl border border-border shadow-sm overflow-x-auto hide-scrollbar">
              <h3 className="text-xs font-bold text-secondary uppercase tracking-wider mb-4">Maintenance Pipeline</h3>
              <div className="flex items-center justify-between min-w-[500px]">
                
                <div className="flex flex-col items-center gap-2 flex-1">
                  <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold text-primary text-center">Complaint<br/>Logged</span>
                </div>
                
                <div className={`h-1 flex-1 ${selectedTask.status !== 'Pending' ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                
                <div className="flex flex-col items-center gap-2 flex-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    selectedTask.status !== 'Pending' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-400 border-2 border-gray-200'
                  }`}>
                    {selectedTask.status !== 'Pending' ? <CheckCircle2 className="w-5 h-5" /> : <UserCog className="w-4 h-4" />}
                  </div>
                  <span className={`text-xs font-bold text-center ${selectedTask.status !== 'Pending' ? 'text-primary' : 'text-secondary'}`}>Task<br/>Assigned</span>
                </div>
                
                <div className={`h-1 flex-1 ${selectedTask.status === 'In Progress' || selectedTask.status === 'Completed' ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                
                <div className="flex flex-col items-center gap-2 flex-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    selectedTask.status === 'Completed' ? 'bg-green-500 text-white' : 
                    selectedTask.status === 'In Progress' ? 'bg-indigo-600 text-white animate-pulse' : 'bg-gray-100 text-gray-400 border-2 border-gray-200'
                  }`}>
                    {selectedTask.status === 'Completed' ? <CheckCircle2 className="w-5 h-5" /> : <Wrench className="w-4 h-4" />}
                  </div>
                  <span className={`text-xs font-bold text-center ${selectedTask.status === 'In Progress' || selectedTask.status === 'Completed' ? 'text-primary' : 'text-secondary'}`}>Work<br/>Started</span>
                </div>
                
                <div className={`h-1 flex-1 ${selectedTask.status === 'Completed' ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                
                <div className="flex flex-col items-center gap-2 flex-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    selectedTask.status === 'Completed' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-400 border-2 border-gray-200'
                  }`}>
                    {selectedTask.status === 'Completed' ? <CheckCircle2 className="w-5 h-5" /> : <IndianRupee className="w-4 h-4" />}
                  </div>
                  <span className={`text-xs font-bold text-center ${selectedTask.status === 'Completed' ? 'text-primary' : 'text-secondary'}`}>Cost<br/>Recorded</span>
                </div>

              </div>
            </div>

            {/* Actions based on Status */}
            <div className="bg-gray-50/50 p-6 rounded-2xl border border-border">
              <h3 className="font-bold text-primary mb-4 flex items-center gap-2">
                <UserCog className="w-5 h-5 text-indigo-600" /> Operational Actions
              </h3>

              {selectedTask.status === 'Pending' && (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-bold text-secondary">Assign To (Staff/Vendor)</label>
                    <input type="text" placeholder="e.g. Ramesh (Electrician)" className="w-full px-4 py-2 mt-1 bg-white border border-border rounded-lg focus:outline-none focus:border-indigo-500" />
                  </div>
                  <button 
                    onClick={() => handleUpdateStatus('Assigned')}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-all"
                  >
                    Assign Task
                  </button>
                </div>
              )}

              {selectedTask.status === 'Assigned' && (
                <div className="space-y-4">
                  <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg text-sm text-blue-800 font-medium">
                    Task is currently assigned. When the staff/vendor starts working, update the status.
                  </div>
                  <button 
                    onClick={() => handleUpdateStatus('In Progress')}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-all flex items-center gap-2"
                  >
                    <Wrench className="w-4 h-4" /> Mark as Work Started
                  </button>
                </div>
              )}

              {selectedTask.status === 'In Progress' && (
                <form onSubmit={handleRecordCost} className="space-y-4">
                  <div className="p-3 bg-purple-50 border border-purple-100 rounded-lg text-sm text-purple-800 font-medium mb-4">
                    Work is in progress. Once completed, record the details and cost to close the task.
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-bold text-secondary">Vendor / Person Name</label>
                      <input name="vendor" defaultValue={selectedTask.assignedTo} required type="text" className="w-full px-4 py-2 mt-1 bg-white border border-border rounded-lg focus:outline-none focus:border-indigo-500" />
                    </div>
                    <div>
                      <label className="text-sm font-bold text-secondary">Total Cost (₹)</label>
                      <input name="cost" required type="number" min="0" placeholder="0 if covered internally" className="w-full px-4 py-2 mt-1 bg-white border border-border rounded-lg focus:outline-none focus:border-indigo-500" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-bold text-secondary">Parts Used (Inventory deduction)</label>
                    <input name="parts" type="text" placeholder="e.g. 1 Fan Capacitor" className="w-full px-4 py-2 mt-1 bg-white border border-border rounded-lg focus:outline-none focus:border-indigo-500" />
                  </div>
                  
                  <div className="pt-2">
                    <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-all flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" /> Complete & Record Cost
                    </button>
                  </div>
                </form>
              )}

              {selectedTask.status === 'Completed' && (
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-xl flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0" />
                    <div>
                      <h4 className="font-bold text-green-900">Task Completed Successfully</h4>
                      <p className="text-sm text-green-800 mt-1">This task is closed. The student who raised the complaint has been notified.</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50">
                    <div>
                      <p className="text-xs font-bold text-secondary uppercase tracking-wider">Vendor / Staff</p>
                      <p className="font-bold text-primary mt-1">{selectedTask.vendor || selectedTask.assignedTo}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-secondary uppercase tracking-wider">Total Cost</p>
                      <p className="font-bold text-primary mt-1">₹{selectedTask.cost}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-xs font-bold text-secondary uppercase tracking-wider">Parts Used</p>
                      <p className="font-bold text-primary mt-1">{selectedTask.partsUsed || 'None'}</p>
                    </div>
                  </div>
                </div>
              )}

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
