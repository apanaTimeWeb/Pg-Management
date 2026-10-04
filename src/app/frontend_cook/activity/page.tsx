'use client';

import React from 'react';
import { 
  Activity, 
  Utensils, 
  Package, 
  Trash2, 
  AlertTriangle, 
  CheckCircle,
  FileEdit,
  Clock
} from 'lucide-react';

type ActionType = 
  | 'Menu Updated' 
  | 'Meal Prepared' 
  | 'Stock Used' 
  | 'Stock Added' 
  | 'Wastage Recorded' 
  | 'Complaint Updated' 
  | 'Task Completed';

interface ActivityLog {
  id: string;
  type: ActionType;
  description: string;
  timestamp: Date;
}

// Placeholder data based on user requirements
const MOCK_ACTIVITY: ActivityLog[] = [
  {
    id: '1',
    type: 'Meal Prepared',
    description: 'Breakfast marked Ready',
    timestamp: new Date('2026-10-04T08:10:00')
  },
  {
    id: '2',
    type: 'Stock Updated' as ActionType, // To match user text "Rice stock updated"
    description: 'Rice stock updated',
    timestamp: new Date('2026-10-04T11:30:00')
  },
  {
    id: '3',
    type: 'Task Completed',
    description: 'Lunch completed',
    timestamp: new Date('2026-10-04T14:00:00')
  },
  {
    id: '4',
    type: 'Menu Updated',
    description: 'Weekly menu updated for next week',
    timestamp: new Date('2026-10-03T16:45:00')
  },
  {
    id: '5',
    type: 'Wastage Recorded',
    description: 'Recorded 2kg wastage of vegetables',
    timestamp: new Date('2026-10-03T21:00:00')
  }
];

// Helper to get the correct icon and color for each action
const getActionIconAndColor = (type: string) => {
  switch (type) {
    case 'Menu Updated': return { icon: FileEdit, color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/30' };
    case 'Meal Prepared': return { icon: Utensils, color: 'text-green-500', bg: 'bg-green-100 dark:bg-green-900/30' };
    case 'Stock Used': 
    case 'Stock Added':
    case 'Stock Updated': return { icon: Package, color: 'text-purple-500', bg: 'bg-purple-100 dark:bg-purple-900/30' };
    case 'Wastage Recorded': return { icon: Trash2, color: 'text-danger', bg: 'bg-danger-bg' };
    case 'Complaint Updated': return { icon: AlertTriangle, color: 'text-warning', bg: 'bg-warning-bg/30' };
    case 'Task Completed': return { icon: CheckCircle, color: 'text-teal-500', bg: 'bg-teal-100 dark:bg-teal-900/30' };
    default: return { icon: Activity, color: 'text-secondary', bg: 'bg-secondary/10' };
  }
};

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).format(date); // Output: 04 Oct 08:10
};

export default function ActivityHistoryPage() {
  return (
    <div className="w-full space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-primary/10 rounded-xl">
          <Activity className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-primary tracking-tight">Activity History</h1>
          <p className="text-sm text-secondary">Your recent actions and audit trail</p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl shadow-sm p-6 mt-6">
        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-border">
          <Clock className="w-5 h-5 text-secondary" />
          <h2 className="text-lg font-semibold text-primary">Recent Activity</h2>
        </div>

        <div className="relative pl-6 border-l-2 border-border/50 ml-4 space-y-8">
          {MOCK_ACTIVITY.map((activity) => {
            const { icon: Icon, color, bg } = getActionIconAndColor(activity.type);
            return (
              <div key={activity.id} className="relative group">
                {/* Timeline dot/icon */}
                <span className={`absolute -left-[45px] top-1 flex items-center justify-center w-10 h-10 rounded-full border-4 border-card ${bg}`}>
                  <Icon className={`w-4 h-4 ${color}`} />
                </span>
                
                <div className="flex flex-col gap-1 p-4 rounded-lg bg-page/50 border border-border hover:border-primary/30 hover:shadow-md transition-all motion-safe:duration-200">
                  <div className="flex justify-between items-start">
                    <span className="text-sm font-semibold text-primary tracking-wide">
                      {activity.type}
                    </span>
                    <span className="text-xs font-medium text-secondary bg-card border border-border px-2 py-1 rounded-md shadow-sm">
                      {formatDate(activity.timestamp).replace(',', '')}
                    </span>
                  </div>
                  <p className="text-sm text-secondary mt-1">
                    {activity.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-8 pt-4 border-t border-border flex justify-center">
          <button className="text-sm font-medium text-primary hover:underline flex items-center gap-1">
            Load More Activity
          </button>
        </div>
      </div>
    </div>
  );
}
