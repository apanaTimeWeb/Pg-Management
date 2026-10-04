'use client';

import React, { useState } from 'react';
import { 
  BellRing, 
  CalendarDays, 
  CheckSquare, 
  AlertCircle, 
  UtensilsCrossed, 
  PackageMinus, 
  PackageX, 
  ListTodo, 
  Sparkles, 
  Megaphone,
  CheckCircle2,
  Clock,
  Star,
  MoreVertical
} from 'lucide-react';

type NotificationType = 
  | 'New Meal Schedule' 
  | 'Menu Approved' 
  | 'Menu Changed' 
  | 'Special Meal Request' 
  | 'Food Complaint' 
  | 'Low Stock' 
  | 'Out of Stock' 
  | 'Kitchen Task' 
  | 'Cleaning Task' 
  | 'Manager Notice';

type NotificationStatus = 'Unread' | 'Read' | 'Important';

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: Date;
  status: NotificationStatus;
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'Menu Approved',
    title: 'Weekly Menu Approved',
    message: 'Your menu for Oct 10 - Oct 16 has been approved by the manager.',
    timestamp: new Date('2026-10-04T09:30:00'),
    status: 'Unread'
  },
  {
    id: '2',
    type: 'Special Meal Request',
    title: 'Special Dinner Request',
    message: 'Tenant A block requested a Jain meal for dinner today.',
    timestamp: new Date('2026-10-04T10:15:00'),
    status: 'Important'
  },
  {
    id: '3',
    type: 'Out of Stock',
    title: 'Rice Out of Stock',
    message: 'Basmati Rice is completely out of stock in the kitchen inventory.',
    timestamp: new Date('2026-10-04T11:45:00'),
    status: 'Unread'
  },
  {
    id: '4',
    type: 'Food Complaint',
    title: 'New Complaint Received',
    message: 'Complaint #402 regarding too much salt in yesterday\'s dinner.',
    timestamp: new Date('2026-10-03T18:20:00'),
    status: 'Read'
  },
  {
    id: '5',
    type: 'Manager Notice',
    title: 'Kitchen Inspection',
    message: 'Health & safety inspection scheduled for tomorrow at 10 AM.',
    timestamp: new Date('2026-10-03T09:00:00'),
    status: 'Important'
  },
  {
    id: '6',
    type: 'Low Stock',
    title: 'Cooking Oil Running Low',
    message: 'Only 5 liters of Sunflower Oil remaining.',
    timestamp: new Date('2026-10-02T14:30:00'),
    status: 'Read'
  }
];

const getNotificationIcon = (type: NotificationType) => {
  switch (type) {
    case 'New Meal Schedule': return { icon: CalendarDays, color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/30' };
    case 'Menu Approved': return { icon: CheckSquare, color: 'text-green-500', bg: 'bg-green-100 dark:bg-green-900/30' };
    case 'Menu Changed': return { icon: UtensilsCrossed, color: 'text-orange-500', bg: 'bg-orange-100 dark:bg-orange-900/30' };
    case 'Special Meal Request': return { icon: Star, color: 'text-yellow-500', bg: 'bg-yellow-100 dark:bg-yellow-900/30' };
    case 'Food Complaint': return { icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-100 dark:bg-red-900/30' };
    case 'Low Stock': return { icon: PackageMinus, color: 'text-orange-500', bg: 'bg-orange-100 dark:bg-orange-900/30' };
    case 'Out of Stock': return { icon: PackageX, color: 'text-red-600', bg: 'bg-red-100 dark:bg-red-900/30' };
    case 'Kitchen Task': return { icon: ListTodo, color: 'text-indigo-500', bg: 'bg-indigo-100 dark:bg-indigo-900/30' };
    case 'Cleaning Task': return { icon: Sparkles, color: 'text-teal-500', bg: 'bg-teal-100 dark:bg-teal-900/30' };
    case 'Manager Notice': return { icon: Megaphone, color: 'text-purple-500', bg: 'bg-purple-100 dark:bg-purple-900/30' };
    default: return { icon: BellRing, color: 'text-secondary', bg: 'bg-secondary/10' };
  }
};

const formatTimeAgo = (date: Date) => {
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / 60000);
  
  if (diffInMinutes < 60) return `${diffInMinutes} mins ago`;
  if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hrs ago`;
  return `${Math.floor(diffInMinutes / 1440)} days ago`;
};

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState<'All' | 'Unread' | 'Important'>('All');
  
  const filteredNotifications = MOCK_NOTIFICATIONS.filter(notif => {
    if (activeTab === 'Unread') return notif.status === 'Unread';
    if (activeTab === 'Important') return notif.status === 'Important';
    return true;
  });

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary/10 rounded-xl">
            <BellRing className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-primary tracking-tight">Notifications</h1>
            <p className="text-sm text-secondary">Manage your kitchen alerts and notices</p>
          </div>
        </div>
        
        <button className="text-sm font-medium text-primary hover:bg-primary/10 px-4 py-2 rounded-lg transition-colors flex items-center gap-2 border border-primary/20">
          <CheckCircle2 className="w-4 h-4" />
          Mark all as read
        </button>
      </div>

      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        {/* Tabs */}
        <div className="flex items-center border-b border-border px-2 pt-2 bg-page/50">
          {['All', 'Unread', 'Important'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-6 py-3 text-sm font-semibold border-b-2 transition-colors ${
                activeTab === tab 
                  ? 'border-primary text-primary' 
                  : 'border-transparent text-secondary hover:text-primary hover:bg-card/50'
              }`}
            >
              {tab}
              {tab === 'Unread' && (
                <span className="ml-2 bg-primary text-white text-[10px] px-2 py-0.5 rounded-full">
                  {MOCK_NOTIFICATIONS.filter(n => n.status === 'Unread').length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Notification List */}
        <div className="divide-y divide-border">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notif) => {
              const { icon: Icon, color, bg } = getNotificationIcon(notif.type);
              const isUnread = notif.status === 'Unread';
              const isImportant = notif.status === 'Important';

              return (
                <div 
                  key={notif.id} 
                  className={`p-5 flex gap-4 hover:bg-page/50 transition-colors ${
                    isUnread ? 'bg-primary/5' : ''
                  }`}
                >
                  <div className={`shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${bg} ${
                    isImportant ? 'ring-2 ring-warning ring-offset-2 ring-offset-card' : ''
                  }`}>
                    <Icon className={`w-6 h-6 ${color}`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className={`text-base font-semibold truncate ${isUnread ? 'text-primary' : 'text-primary/80'}`}>
                        {notif.title}
                      </h3>
                      <span className="shrink-0 text-xs text-secondary flex items-center gap-1 mt-1">
                        <Clock className="w-3 h-3" />
                        {formatTimeAgo(notif.timestamp)}
                      </span>
                    </div>
                    
                    <p className={`text-sm mt-1 mb-2 ${isUnread ? 'text-secondary font-medium' : 'text-secondary/80'}`}>
                      {notif.message}
                    </p>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold px-2 py-1 bg-page border border-border rounded-md text-secondary/80">
                        {notif.type}
                      </span>
                      {isImportant && (
                        <span className="text-xs font-bold px-2 py-1 bg-warning/10 text-warning border border-warning/20 rounded-md flex items-center gap-1">
                          <Star className="w-3 h-3 fill-warning" /> Important
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="shrink-0 flex items-start">
                    <button className="p-2 text-secondary hover:text-primary hover:bg-page rounded-lg transition-colors">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-12 text-center flex flex-col items-center">
              <BellRing className="w-12 h-12 text-secondary/30 mb-4" />
              <h3 className="text-lg font-medium text-primary">No Notifications</h3>
              <p className="text-sm text-secondary mt-1">
                You're all caught up! No {activeTab.toLowerCase()} notifications found.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
