'use client';

import React, { useState } from 'react';
import { 
  Sparkles, 
  CheckSquare, 
  Square,
  Calendar,
  AlertTriangle,
  Bug,
  ThermometerSnowflake,
  Wrench,
  CheckCircle2,
  Clock,
  ShieldCheck
} from 'lucide-react';

interface ChecklistItem {
  id: string;
  label: string;
  completed: boolean;
}

const INITIAL_CHECKLIST: ChecklistItem[] = [
  { id: '1', label: 'Kitchen floor cleaned', completed: false },
  { id: '2', label: 'Cooking area cleaned', completed: false },
  { id: '3', label: 'Utensils cleaned', completed: false },
  { id: '4', label: 'Refrigerator checked', completed: false },
  { id: '5', label: 'Food covered', completed: false },
  { id: '6', label: 'Waste disposed', completed: false },
  { id: '7', label: 'Gas checked (valves off)', completed: false },
  { id: '8', label: 'Water area cleaned', completed: false },
  { id: '9', label: 'Storage area cleaned', completed: false }
];

interface ScheduleItem {
  id: string;
  title: string;
  type: 'Deep Cleaning' | 'Refrigerator Cleaning' | 'Storage Inspection' | 'Pest Control';
  nextDate: string;
  status: 'Upcoming' | 'Overdue' | 'Done';
}

const MOCK_SCHEDULES: ScheduleItem[] = [
  { id: 's1', title: 'Monthly Deep Cleaning', type: 'Deep Cleaning', nextDate: '15 Oct 2026', status: 'Upcoming' },
  { id: 's2', title: 'Fridge Defrost & Wash', type: 'Refrigerator Cleaning', nextDate: '10 Oct 2026', status: 'Upcoming' },
  { id: 's3', title: 'Dry Storage Verification', type: 'Storage Inspection', nextDate: '01 Oct 2026', status: 'Overdue' },
  { id: 's4', title: 'Quarterly Pest Control', type: 'Pest Control', nextDate: '28 Nov 2026', status: 'Upcoming' }
];

const getScheduleIcon = (type: ScheduleItem['type']) => {
  switch (type) {
    case 'Deep Cleaning': return { icon: Sparkles, color: 'text-purple-500', bg: 'bg-purple-100' };
    case 'Refrigerator Cleaning': return { icon: ThermometerSnowflake, color: 'text-blue-500', bg: 'bg-blue-100' };
    case 'Storage Inspection': return { icon: Wrench, color: 'text-orange-500', bg: 'bg-orange-100' };
    case 'Pest Control': return { icon: Bug, color: 'text-red-500', bg: 'bg-red-100' };
  }
};

export default function HygienePage() {
  const [checklist, setChecklist] = useState<ChecklistItem[]>(INITIAL_CHECKLIST);
  const [submitted, setSubmitted] = useState(false);

  const toggleCheck = (id: string) => {
    if (submitted) return;
    setChecklist(prev => prev.map(item => item.id === id ? { ...item, completed: !item.completed } : item));
  };

  const completedCount = checklist.filter(i => i.completed).length;
  const progressPercent = Math.round((completedCount / checklist.length) * 100);

  const handleSubmit = () => {
    if (completedCount === checklist.length) {
      setSubmitted(true);
    } else {
      alert("Please complete all tasks before submitting to the Manager.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary/10 rounded-xl">
            <Sparkles className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-primary tracking-tight">Hygiene & Cleaning</h1>
            <p className="text-sm text-secondary">Daily checklists and special cleaning schedules</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Col: Daily Checklist */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
            <div className="p-5 border-b border-border bg-page/30 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-primary flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  Today's Checklist
                </h2>
                <p className="text-xs text-secondary mt-1">Mark tasks as you complete them before closing the kitchen.</p>
              </div>
              {submitted && (
                <span className="flex items-center gap-1.5 px-3 py-1.5 bg-green-100 text-green-700 border border-green-200 rounded-lg text-sm font-bold shadow-sm">
                  <ShieldCheck className="w-4 h-4" />
                  Submitted for Review
                </span>
              )}
            </div>

            {/* Progress Bar */}
            <div className="px-5 py-4 bg-page/50 border-b border-border">
              <div className="flex justify-between items-end mb-2">
                <span className="text-sm font-bold text-primary">Progress</span>
                <span className="text-sm font-bold text-primary">{completedCount} of {checklist.length} ({progressPercent}%)</span>
              </div>
              <div className="w-full h-2.5 bg-border rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-500 ease-out ${progressPercent === 100 ? 'bg-green-500' : 'bg-primary'}`}
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
            </div>

            {/* Checklist Items */}
            <div className="p-2">
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-3">
                {checklist.map(item => (
                  <li key={item.id}>
                    <button 
                      onClick={() => toggleCheck(item.id)}
                      disabled={submitted}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all text-left
                        ${item.completed 
                          ? 'bg-primary/5 border-primary/30 shadow-sm' 
                          : 'bg-card border-transparent hover:bg-page hover:border-border'}
                        ${submitted ? 'opacity-75 cursor-not-allowed' : ''}
                      `}
                    >
                      {item.completed ? (
                        <CheckSquare className="w-5 h-5 text-primary shrink-0" />
                      ) : (
                        <Square className="w-5 h-5 text-secondary shrink-0" />
                      )}
                      <span className={`text-sm font-medium ${item.completed ? 'text-primary line-through decoration-primary/30' : 'text-primary/90'}`}>
                        {item.label}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Submit Button */}
            {!submitted && (
              <div className="p-5 border-t border-border bg-page/30 flex justify-end">
                <button 
                  onClick={handleSubmit}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all shadow-sm
                    ${progressPercent === 100 
                      ? 'bg-primary text-white hover:bg-primary/90 hover:shadow-md' 
                      : 'bg-page border border-border text-secondary/50 cursor-not-allowed'
                    }
                  `}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Submit Daily Log
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Col: Additional Schedules */}
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-xl shadow-sm">
            <div className="p-5 border-b border-border bg-page/30">
              <h2 className="text-lg font-bold text-primary flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Cleaning Schedules
              </h2>
            </div>
            
            <div className="divide-y divide-border">
              {MOCK_SCHEDULES.map(schedule => {
                const { icon: Icon, color, bg } = getScheduleIcon(schedule.type);
                return (
                  <div key={schedule.id} className="p-4 hover:bg-page/50 transition-colors">
                    <div className="flex gap-3">
                      <div className={`shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${bg}`}>
                        <Icon className={`w-5 h-5 ${color}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="text-sm font-bold text-primary">{schedule.title}</h3>
                          {schedule.status === 'Overdue' && (
                            <span className="shrink-0 flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 bg-red-100 text-red-700 rounded border border-red-200 uppercase tracking-wide">
                              <AlertTriangle className="w-3 h-3" /> Overdue
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-secondary font-medium mt-0.5">{schedule.type}</p>
                        <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold text-primary/70">
                          <Clock className="w-3.5 h-3.5 text-secondary" />
                          Next: {schedule.nextDate}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <ShieldCheck className="w-5 h-5 text-primary" />
              <h3 className="font-bold text-primary">Manager Review</h3>
            </div>
            <p className="text-sm text-secondary/90 leading-relaxed">
              Once you submit the daily checklist, it will be marked as 'Pending Review' for the Manager. Make sure all listed areas are thoroughly cleaned as random inspections may occur.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
