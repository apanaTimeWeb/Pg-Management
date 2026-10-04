'use client';

import React, { useState } from 'react';
import { 
  ListTodo, 
  Clock, 
  AlertCircle, 
  UserRound, 
  CheckCircle2,
  PlayCircle,
  MessageSquare,
  Image as ImageIcon,
  MoreVertical,
  Paperclip,
  CheckSquare
} from 'lucide-react';

type TaskStatus = 'Pending' | 'Started' | 'In Progress' | 'Completed' | 'Overdue';
type TaskPriority = 'Low' | 'Medium' | 'High' | 'Urgent';

interface KitchenTask {
  id: string;
  title: string;
  description: string;
  assignedBy: string;
  dueDate: string;
  dueTime: string;
  priority: TaskPriority;
  status: TaskStatus;
  note?: string;
  photoAttached?: boolean;
}

const MOCK_TASKS: KitchenTask[] = [
  {
    id: 'T1',
    title: 'Clean Storage Area',
    description: 'Ensure dry storage is arranged and old boxes are discarded.',
    assignedBy: 'Manager',
    dueDate: 'Today',
    dueTime: '10:00 AM',
    priority: 'High',
    status: 'Pending'
  },
  {
    id: 'T2',
    title: 'Receive Vegetable Order',
    description: 'Check weight and quality of the vegetables arriving from vendor.',
    assignedBy: 'Manager',
    dueDate: 'Today',
    dueTime: '11:30 AM',
    priority: 'Medium',
    status: 'In Progress'
  },
  {
    id: 'T3',
    title: 'Check Refrigerator Temp',
    description: 'Record the temperature and report if it is above 4°C.',
    assignedBy: 'Manager',
    dueDate: 'Yesterday',
    dueTime: '09:00 PM',
    priority: 'High',
    status: 'Overdue'
  },
  {
    id: 'T4',
    title: 'Sanitize Cutting Boards',
    description: 'Deep clean all colored cutting boards with sanitizer solution.',
    assignedBy: 'Owner',
    dueDate: 'Today',
    dueTime: '08:00 AM',
    priority: 'Medium',
    status: 'Completed',
    note: 'All 4 boards cleaned',
    photoAttached: true
  }
];

const getPriorityColor = (priority: TaskPriority) => {
  switch (priority) {
    case 'Low': return 'text-green-600 bg-green-100 border-green-200';
    case 'Medium': return 'text-blue-600 bg-blue-100 border-blue-200';
    case 'High': return 'text-orange-600 bg-orange-100 border-orange-200';
    case 'Urgent': return 'text-red-600 bg-red-100 border-red-200';
  }
};

const getStatusBadge = (status: TaskStatus) => {
  switch (status) {
    case 'Pending': return 'text-secondary bg-secondary/10 border-border';
    case 'Started':
    case 'In Progress': return 'text-blue-600 bg-blue-100 border-blue-200';
    case 'Completed': return 'text-green-600 bg-green-100 border-green-200';
    case 'Overdue': return 'text-red-600 bg-red-100 border-red-200';
  }
};

export default function KitchenTasksPage() {
  const [tasks, setTasks] = useState<KitchenTask[]>(MOCK_TASKS);
  const [filter, setFilter] = useState<'All' | 'Pending/Progress' | 'Completed' | 'Overdue'>('Pending/Progress');

  const updateStatus = (id: string, newStatus: TaskStatus) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: newStatus } : t));
  };

  const filteredTasks = tasks.filter(t => {
    if (filter === 'Pending/Progress') return t.status === 'Pending' || t.status === 'Started' || t.status === 'In Progress';
    if (filter === 'Completed') return t.status === 'Completed';
    if (filter === 'Overdue') return t.status === 'Overdue';
    return true;
  });

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary/10 rounded-xl">
            <ListTodo className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-primary tracking-tight">Kitchen Tasks</h1>
            <p className="text-sm text-secondary">Manage and complete tasks assigned by Manager/Owner</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        {['Pending/Progress', 'Overdue', 'Completed', 'All'].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab as any)}
            className={`px-4 py-2 text-sm font-semibold rounded-md transition-all ${
              filter === tab 
                ? 'bg-primary text-white shadow-md' 
                : 'bg-card text-secondary border border-border hover:text-primary hover:bg-page'
            }`}
          >
            {tab}
            {tab === 'Overdue' && tasks.some(t => t.status === 'Overdue') && (
              <span className="ml-2 bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full">
                {tasks.filter(t => t.status === 'Overdue').length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Task Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredTasks.map((task) => {
          const isOverdue = task.status === 'Overdue';
          const isCompleted = task.status === 'Completed';

          return (
            <div 
              key={task.id} 
              className={`bg-card border rounded-xl overflow-hidden shadow-sm flex flex-col transition-all
                ${isCompleted ? 'opacity-70 border-border/50' : 'hover:shadow-md hover:border-primary/40'}
                ${isOverdue ? 'border-red-500 shadow-red-500/10' : 'border-border'}
              `}
            >
              {/* Card Header */}
              <div className="p-4 border-b border-border bg-page/30 flex items-start justify-between gap-2">
                <div>
                  <h3 className={`font-bold ${isCompleted ? 'text-primary/70 line-through decoration-primary/30' : 'text-primary'}`}>
                    {task.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1.5 text-xs">
                    <span className={`px-2 py-0.5 rounded border font-semibold ${getPriorityColor(task.priority)}`}>
                      {task.priority} Priority
                    </span>
                    <span className={`px-2 py-0.5 rounded border font-bold ${getStatusBadge(task.status)}`}>
                      {task.status}
                    </span>
                  </div>
                </div>
                <button className="text-secondary hover:text-primary p-1">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>

              {/* Card Body */}
              <div className="p-4 flex-1 space-y-4">
                <p className="text-sm text-secondary leading-relaxed">
                  {task.description}
                </p>

                <div className="bg-page/50 border border-border/50 p-3 rounded-lg grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="block text-secondary font-medium mb-0.5">Assigned By</span>
                    <span className="flex items-center gap-1 font-semibold text-primary">
                      <UserRound className="w-3.5 h-3.5" />
                      {task.assignedBy}
                    </span>
                  </div>
                  <div>
                    <span className="block text-secondary font-medium mb-0.5">Due Time</span>
                    <span className={`flex items-center gap-1 font-semibold ${isOverdue ? 'text-red-500' : 'text-primary'}`}>
                      <Clock className="w-3.5 h-3.5" />
                      {task.dueDate} • {task.dueTime}
                    </span>
                  </div>
                </div>

                {/* Additional info tags (Notes, Photos) */}
                {(task.note || task.photoAttached) && (
                  <div className="flex flex-wrap items-center gap-2">
                    {task.note && (
                      <span className="flex items-center gap-1 text-[11px] font-medium bg-secondary/10 text-secondary px-2 py-1 rounded-md">
                        <Paperclip className="w-3 h-3" /> Note attached
                      </span>
                    )}
                    {task.photoAttached && (
                      <span className="flex items-center gap-1 text-[11px] font-medium bg-blue-100 text-blue-700 px-2 py-1 rounded-md">
                        <ImageIcon className="w-3 h-3" /> Photo attached
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="p-4 border-t border-border bg-page/30 flex flex-wrap items-center gap-2">
                {!isCompleted && (
                  <>
                    {(task.status === 'Pending' || task.status === 'Overdue') && (
                      <button 
                        onClick={() => updateStatus(task.id, 'In Progress')}
                        className="flex-1 flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2 px-3 rounded-lg transition-colors"
                      >
                        <PlayCircle className="w-4 h-4" /> Start
                      </button>
                    )}
                    {task.status === 'In Progress' && (
                      <button 
                        onClick={() => updateStatus(task.id, 'Completed')}
                        className="flex-1 flex items-center justify-center gap-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-bold py-2 px-3 rounded-lg transition-colors"
                      >
                        <CheckSquare className="w-4 h-4" /> Complete
                      </button>
                    )}
                    
                    {/* Action icons for Note/Photo */}
                    <div className="flex items-center gap-1 ml-auto">
                      <button title="Add Note" className="p-2 bg-card border border-border text-secondary hover:text-primary hover:border-primary/40 rounded-lg transition-all">
                        <MessageSquare className="w-4 h-4" />
                      </button>
                      <button title="Upload Photo" className="p-2 bg-card border border-border text-secondary hover:text-primary hover:border-primary/40 rounded-lg transition-all">
                        <ImageIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </>
                )}

                {isCompleted && (
                  <div className="w-full flex items-center justify-center gap-2 text-green-600 font-bold text-sm bg-green-100/50 py-1.5 rounded-md">
                    <CheckCircle2 className="w-5 h-5" /> Task Completed
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {filteredTasks.length === 0 && (
          <div className="col-span-1 md:col-span-2 lg:col-span-3 flex flex-col items-center justify-center p-12 bg-card border border-border rounded-xl">
            <CheckCircle2 className="w-12 h-12 text-secondary/30 mb-4" />
            <h3 className="text-lg font-medium text-primary">No Tasks Found</h3>
            <p className="text-sm text-secondary mt-1">You don't have any {filter.toLowerCase()} tasks at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
}
