'use client';

import React, { useState } from 'react';
import { 
  Clock, 
  Settings, 
  Utensils, 
  Coffee, 
  Sun, 
  Moon, 
  AlertCircle,
  PlayCircle,
  CheckCircle2,
  StopCircle,
  Info
} from 'lucide-react';

interface MealSchedule {
  id: string;
  meal: string;
  startTime: string;
  endTime: string;
  icon: any;
  color: string;
  bg: string;
  operationalStatus: 'Not Started' | 'In Progress' | 'Delayed' | 'Finished';
  statusNote?: string;
}

const MOCK_SCHEDULE: MealSchedule[] = [
  {
    id: '1',
    meal: 'Breakfast',
    startTime: '07:30 AM',
    endTime: '09:30 AM',
    icon: Coffee,
    color: 'text-blue-500',
    bg: 'bg-blue-100',
    operationalStatus: 'Finished'
  },
  {
    id: '2',
    meal: 'Lunch',
    startTime: '01:00 PM',
    endTime: '03:00 PM',
    icon: Sun,
    color: 'text-orange-500',
    bg: 'bg-orange-100',
    operationalStatus: 'In Progress'
  },
  {
    id: '3',
    meal: 'Snacks',
    startTime: '05:00 PM',
    endTime: '06:00 PM',
    icon: Utensils,
    color: 'text-yellow-500',
    bg: 'bg-yellow-100',
    operationalStatus: 'Not Started'
  },
  {
    id: '4',
    meal: 'Dinner',
    startTime: '08:30 PM',
    endTime: '10:30 PM',
    icon: Moon,
    color: 'text-indigo-500',
    bg: 'bg-indigo-100',
    operationalStatus: 'Not Started'
  }
];

export default function MealSchedulePage() {
  const [schedules, setSchedules] = useState<MealSchedule[]>(MOCK_SCHEDULE);

  const handleStatusUpdate = (id: string, newStatus: MealSchedule['operationalStatus'], delayReason?: string) => {
    setSchedules(prev => prev.map(schedule => {
      if (schedule.id === id) {
        return { 
          ...schedule, 
          operationalStatus: newStatus,
          statusNote: delayReason || (newStatus === 'Delayed' ? schedule.statusNote : undefined)
        };
      }
      return schedule;
    }));
  };

  const promptForDelay = (id: string) => {
    const reason = prompt('Enter delay reason or estimated time (e.g., "Delayed by 15 mins"):');
    if (reason) {
      handleStatusUpdate(id, 'Delayed', reason);
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary/10 rounded-xl">
            <Clock className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-primary tracking-tight">Daily Meal Schedule</h1>
            <p className="text-sm text-secondary">View fixed timings and update operational status</p>
          </div>
        </div>

        {/* Read-only restriction badge */}
        <div className="flex items-center gap-2 bg-page border border-border px-3 py-1.5 rounded-lg shadow-sm max-w-sm">
          <Settings className="w-5 h-5 text-secondary shrink-0" />
          <p className="text-[11px] font-bold text-secondary leading-tight">
            Permanent schedule timings are managed by Admin. You can only update live operational status here.
          </p>
        </div>
      </div>

      {/* Schedule List */}
      <div className="space-y-4 mt-6">
        {schedules.map((schedule) => {
          const { icon: Icon, color, bg } = schedule;
          const isActive = schedule.operationalStatus === 'In Progress';
          const isDelayed = schedule.operationalStatus === 'Delayed';
          const isFinished = schedule.operationalStatus === 'Finished';

          return (
            <div 
              key={schedule.id} 
              className={`bg-card border rounded-xl p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all shadow-sm
                ${isActive ? 'border-primary/50 shadow-primary/10 bg-primary/5' : 'border-border hover:border-primary/30'}
                ${isFinished ? 'opacity-75 bg-page/50' : ''}
                ${isDelayed ? 'border-orange-400/50 bg-orange-50/50 dark:bg-orange-900/5' : ''}
              `}
            >
              {/* Timing Info */}
              <div className="flex items-center gap-5">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 border ${bg} border-transparent`}>
                  <Icon className={`w-7 h-7 ${color}`} />
                </div>
                <div>
                  <h2 className={`text-xl font-black tracking-tight ${isFinished ? 'text-primary/70 line-through decoration-primary/20' : 'text-primary'}`}>
                    {schedule.meal}
                  </h2>
                  <div className="flex items-center gap-2 mt-1 font-semibold text-secondary">
                    <Clock className="w-4 h-4" />
                    {schedule.startTime} — {schedule.endTime}
                  </div>
                </div>
              </div>

              {/* Status & Actions */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-t md:border-t-0 md:border-l border-border pt-4 md:pt-0 md:pl-6 w-full md:w-auto">
                
                {/* Current Status Display */}
                <div className="flex-1 sm:flex-none">
                  <span className="block text-xs font-bold text-secondary uppercase tracking-wider mb-1">Status</span>
                  <div className="flex items-center gap-2">
                    {schedule.operationalStatus === 'Not Started' && <span className="font-semibold text-secondary">Pending</span>}
                    {schedule.operationalStatus === 'In Progress' && <span className="font-bold text-green-600 flex items-center gap-1.5"><PlayCircle className="w-4 h-4" /> Serving Now</span>}
                    {schedule.operationalStatus === 'Delayed' && <span className="font-bold text-orange-600 flex items-center gap-1.5"><AlertCircle className="w-4 h-4" /> Delayed</span>}
                    {schedule.operationalStatus === 'Finished' && <span className="font-bold text-secondary flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> Finished</span>}
                  </div>
                  {schedule.statusNote && (
                    <div className="text-xs text-orange-700 font-medium mt-1 bg-orange-100 px-2 py-0.5 rounded border border-orange-200">
                      {schedule.statusNote}
                    </div>
                  )}
                </div>

                {/* Cook Actions */}
                <div className="flex flex-wrap items-center gap-2 mt-2 sm:mt-0 w-full sm:w-auto justify-end">
                  {!isFinished && (
                    <>
                      {(schedule.operationalStatus === 'Not Started' || schedule.operationalStatus === 'Delayed') && (
                        <button 
                          onClick={() => handleStatusUpdate(schedule.id, 'In Progress')}
                          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-sm flex items-center gap-1.5"
                        >
                          <PlayCircle className="w-4 h-4" /> Start Service
                        </button>
                      )}
                      
                      {schedule.operationalStatus === 'In Progress' && (
                        <button 
                          onClick={() => handleStatusUpdate(schedule.id, 'Finished')}
                          className="bg-page border border-border hover:bg-secondary/10 text-primary px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-1.5"
                        >
                          <StopCircle className="w-4 h-4" /> End Service
                        </button>
                      )}

                      {schedule.operationalStatus !== 'Delayed' && (
                        <button 
                          onClick={() => promptForDelay(schedule.id)}
                          className="bg-orange-100 hover:bg-orange-200 text-orange-700 px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-sm border border-orange-200 flex items-center gap-1.5"
                        >
                          <AlertCircle className="w-4 h-4" /> Report Delay
                        </button>
                      )}
                    </>
                  )}
                </div>
                
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
