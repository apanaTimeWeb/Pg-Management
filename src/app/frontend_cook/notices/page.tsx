'use client';

import React, { useState } from 'react';
import { 
  Megaphone,
  Clock,
  UtensilsCrossed,
  PartyPopper,
  Truck,
  Sparkles,
  ClipboardCheck,
  AlertOctagon,
  CheckCircle2,
  CalendarDays,
  UserRound,
  Info
} from 'lucide-react';

type NoticeCategory = 
  | 'Kitchen Timing Change'
  | 'Menu Change'
  | 'Special Event'
  | 'Stock Delivery'
  | 'Cleaning Schedule'
  | 'Inspection'
  | 'Emergency';

interface Notice {
  id: string;
  title: string;
  category: NoticeCategory;
  message: string;
  sender: string;
  timestamp: Date;
  requiresAck: boolean;
  isAcknowledged: boolean;
  isRead: boolean;
}

const MOCK_NOTICES: Notice[] = [
  {
    id: '1',
    title: 'Urgent: Kitchen Deep Cleaning',
    category: 'Inspection',
    message: 'Health inspector visit scheduled for tomorrow morning. Please ensure deep cleaning of all counters and fryers before 8 PM tonight.',
    sender: 'Manager',
    timestamp: new Date('2026-10-04T09:00:00'),
    requiresAck: true,
    isAcknowledged: false,
    isRead: false
  },
  {
    id: '2',
    title: 'Diwali Special Dinner Prep',
    category: 'Special Event',
    message: 'For the upcoming Diwali dinner, we need to start prepping sweets from tomorrow. Extra staff has been arranged.',
    sender: 'Owner',
    timestamp: new Date('2026-10-03T14:30:00'),
    requiresAck: true,
    isAcknowledged: true,
    isRead: true
  },
  {
    id: '3',
    title: 'Breakfast Timing Update',
    category: 'Kitchen Timing Change',
    message: 'Starting next Monday, breakfast service will begin 30 minutes earlier at 7:30 AM to accommodate early college batches.',
    sender: 'Manager',
    timestamp: new Date('2026-10-02T10:15:00'),
    requiresAck: false,
    isAcknowledged: false,
    isRead: true
  },
  {
    id: '4',
    title: 'Gas Cylinder Delivery Delay',
    category: 'Emergency',
    message: 'Today\'s gas cylinder delivery is delayed. Please use the backup induction stoves for light preparations until 2 PM.',
    sender: 'Manager',
    timestamp: new Date('2026-10-04T08:00:00'),
    requiresAck: true,
    isAcknowledged: false,
    isRead: false
  },
  {
    id: '5',
    title: 'Bulk Rice Delivery Tomorrow',
    category: 'Stock Delivery',
    message: '100KG rice delivery arriving tomorrow at 6 AM. Ensure the dry storage area is cleared to receive the stock.',
    sender: 'Manager',
    timestamp: new Date('2026-10-01T16:00:00'),
    requiresAck: false,
    isAcknowledged: false,
    isRead: true
  }
];

const getNoticeIcon = (category: NoticeCategory) => {
  switch (category) {
    case 'Kitchen Timing Change': return { icon: Clock, color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/30' };
    case 'Menu Change': return { icon: UtensilsCrossed, color: 'text-indigo-500', bg: 'bg-indigo-100 dark:bg-indigo-900/30' };
    case 'Special Event': return { icon: PartyPopper, color: 'text-pink-500', bg: 'bg-pink-100 dark:bg-pink-900/30' };
    case 'Stock Delivery': return { icon: Truck, color: 'text-green-500', bg: 'bg-green-100 dark:bg-green-900/30' };
    case 'Cleaning Schedule': return { icon: Sparkles, color: 'text-teal-500', bg: 'bg-teal-100 dark:bg-teal-900/30' };
    case 'Inspection': return { icon: ClipboardCheck, color: 'text-orange-500', bg: 'bg-orange-100 dark:bg-orange-900/30' };
    case 'Emergency': return { icon: AlertOctagon, color: 'text-red-500', bg: 'bg-red-100 dark:bg-red-900/30' };
    default: return { icon: Megaphone, color: 'text-secondary', bg: 'bg-secondary/10' };
  }
};

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit'
  }).format(date);
};

export default function KitchenNoticesPage() {
  const [notices, setNotices] = useState<Notice[]>(MOCK_NOTICES);

  const handleAcknowledge = (id: string) => {
    setNotices(prev => prev.map(notice => 
      notice.id === id ? { ...notice, isAcknowledged: true, isRead: true } : notice
    ));
  };

  const unreadCount = notices.filter(n => !n.isRead).length;
  const pendingAckCount = notices.filter(n => n.requiresAck && !n.isAcknowledged).length;

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary/10 rounded-xl relative">
            <Megaphone className="w-6 h-6 text-primary" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-danger rounded-full border-2 border-page"></span>
            )}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-primary tracking-tight">Kitchen Notices</h1>
            <p className="text-sm text-secondary">View updates and announcements from Manager/Owner</p>
          </div>
        </div>

        {/* Read-only restriction badge */}
        <div className="flex items-center gap-2 bg-page border border-border px-3 py-1.5 rounded-full shadow-sm">
          <Info className="w-4 h-4 text-secondary" />
          <span className="text-xs font-medium text-secondary">View-Only Access</span>
        </div>
      </div>

      {/* Summary Cards */}
      {pendingAckCount > 0 && (
        <div className="bg-warning/10 border border-warning/20 rounded-xl p-4 flex items-start sm:items-center justify-between flex-col sm:flex-row gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-warning/20 rounded-full">
              <AlertOctagon className="w-5 h-5 text-warning" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-warning">Action Required</h3>
              <p className="text-xs text-warning/80 mt-0.5">You have {pendingAckCount} notice(s) requiring your acknowledgment.</p>
            </div>
          </div>
        </div>
      )}

      {/* Notice List */}
      <div className="space-y-4">
        {notices.map((notice) => {
          const { icon: Icon, color, bg } = getNoticeIcon(notice.category);
          const isEmergency = notice.category === 'Emergency';

          return (
            <div 
              key={notice.id} 
              className={`bg-card border rounded-xl p-5 shadow-sm transition-all
                ${!notice.isRead ? 'border-primary/40 shadow-primary/5' : 'border-border'}
                ${isEmergency && !notice.isRead ? 'border-red-500 shadow-red-500/10' : ''}
              `}
            >
              <div className="flex flex-col sm:flex-row gap-5">
                {/* Icon */}
                <div className="shrink-0 flex items-start justify-between sm:justify-start">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${bg}`}>
                    <Icon className={`w-6 h-6 ${color}`} />
                  </div>
                  {/* Mobile category badge */}
                  <div className="sm:hidden text-xs font-semibold px-2 py-1 bg-page border border-border rounded-md text-secondary">
                    {notice.category}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                    <div>
                      <h2 className={`text-lg font-bold tracking-tight flex items-center gap-2 ${!notice.isRead ? 'text-primary' : 'text-primary/80'}`}>
                        {notice.title}
                        {!notice.isRead && (
                          <span className="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">New</span>
                        )}
                      </h2>
                      <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs text-secondary font-medium">
                        <span className="hidden sm:inline-flex px-2 py-0.5 bg-page border border-border rounded-md">
                          {notice.category}
                        </span>
                        <span className="flex items-center gap-1">
                          <UserRound className="w-3.5 h-3.5" /> From {notice.sender}
                        </span>
                        <span className="flex items-center gap-1">
                          <CalendarDays className="w-3.5 h-3.5" /> {formatDate(notice.timestamp)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 p-4 bg-page/50 rounded-lg border border-border/50 text-sm text-secondary leading-relaxed">
                    {notice.message}
                  </div>
                </div>

                {/* Actions */}
                <div className="shrink-0 flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 sm:border-l border-border pt-4 sm:pt-0 sm:pl-5 gap-3">
                  {notice.requiresAck ? (
                    notice.isAcknowledged ? (
                      <div className="flex items-center gap-1.5 text-green-600 bg-green-50 px-3 py-2 rounded-lg font-medium text-sm">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Acknowledged</span>
                      </div>
                    ) : (
                      <button 
                        onClick={() => handleAcknowledge(notice.id)}
                        className={`px-4 py-2 text-sm font-bold rounded-lg transition-all shadow-sm
                          ${isEmergency 
                            ? 'bg-danger text-white hover:bg-danger/90 hover:shadow-md' 
                            : 'bg-primary text-white hover:bg-primary/90 hover:shadow-md'
                          }
                        `}
                      >
                        Acknowledge
                      </button>
                    )
                  ) : (
                    <div className="text-xs font-medium text-secondary flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4 text-primary/50" />
                      Read Only
                    </div>
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
