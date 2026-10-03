'use client';

import React, { useState } from 'react';
import { 
  Bell, Check, X, CreditCard, CalendarOff, Users, AlertTriangle, 
  FileText, Megaphone, Utensils, Wrench, ShieldAlert, CheckCircle2,
  Clock, Filter, Search, MoreVertical, MapPin
} from 'lucide-react';
import { toast } from 'sonner';

type NotificationType = 'fee' | 'payment_success' | 'payment_failed' | 'leave_approved' | 'leave_rejected' | 'visitor' | 'complaint' | 'maintenance' | 'notice' | 'menu' | 'document' | 'checkout' | 'emergency';

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  actionUrl?: string;
  isUrgent?: boolean;
}

const DUMMY_NOTIFICATIONS: Notification[] = [
  {
    id: 'n1',
    type: 'emergency',
    title: 'Emergency Alert: Fire Drill',
    message: 'Mandatory fire drill in 15 minutes. Please assemble in the ground floor parking area.',
    time: 'Just now',
    isRead: false,
    isUrgent: true
  },
  {
    id: 'n2',
    type: 'fee',
    title: 'Rent Overdue Warning',
    message: 'Your rent for October is overdue. Please pay immediately to avoid late fees of ₹200/day.',
    time: '2 hours ago',
    isRead: false,
    actionUrl: '/frontend_student/student_rent?action=pay',
    isUrgent: true
  },
  {
    id: 'n3',
    type: 'visitor',
    title: 'Visitor Request Approved',
    message: 'Your visitor pass for Rahul Sharma has been approved for tomorrow, 4 PM.',
    time: '5 hours ago',
    isRead: false
  },
  {
    id: 'n4',
    type: 'payment_success',
    title: 'Payment Successful',
    message: 'Payment of ₹1,500 for Security Deposit was successful. Receipt generated.',
    time: 'Yesterday, 10:30 AM',
    isRead: true
  },
  {
    id: 'n5',
    type: 'complaint',
    title: 'Complaint Updated',
    message: 'Ticket #1024 (AC Not Cooling) status changed to "In Progress". Technician assigned.',
    time: 'Yesterday, 2:15 PM',
    isRead: true
  },
  {
    id: 'n6',
    type: 'leave_approved',
    title: 'Leave Approved',
    message: 'Your leave request from 10 Oct to 15 Oct has been approved by the manager.',
    time: '02 Oct 2026',
    isRead: true
  },
  {
    id: 'n7',
    type: 'notice',
    title: 'New Notice: Diwali Celebration',
    message: 'Join us for the Diwali celebration on 24th Oct. Dinner will be specially arranged!',
    time: '01 Oct 2026',
    isRead: true
  },
  {
    id: 'n8',
    type: 'document',
    title: 'Action Required: Aadhaar Card',
    message: 'Your uploaded Aadhaar card image is blurry. Please re-upload a clear copy.',
    time: '30 Sep 2026',
    isRead: true,
    isUrgent: true
  }
];

const getNotificationConfig = (type: NotificationType) => {
  switch (type) {
    case 'fee': return { icon: CreditCard, color: 'text-warning', bg: 'bg-warning/10', border: 'border-warning/20' };
    case 'payment_success': return { icon: CheckCircle2, color: 'text-success', bg: 'bg-success/10', border: 'border-success/20' };
    case 'payment_failed': return { icon: X, color: 'text-danger', bg: 'bg-danger/10', border: 'border-danger/20' };
    case 'leave_approved': return { icon: Check, color: 'text-success', bg: 'bg-success/10', border: 'border-success/20' };
    case 'leave_rejected': return { icon: X, color: 'text-danger', bg: 'bg-danger/10', border: 'border-danger/20' };
    case 'visitor': return { icon: Users, color: 'text-info', bg: 'bg-info/10', border: 'border-info/20' };
    case 'complaint': return { icon: Wrench, color: 'text-primary', bg: 'bg-primary/10', border: 'border-primary/20' };
    case 'maintenance': return { icon: Wrench, color: 'text-success', bg: 'bg-success/10', border: 'border-success/20' };
    case 'notice': return { icon: Megaphone, color: 'text-primary', bg: 'bg-primary/10', border: 'border-primary/20' };
    case 'menu': return { icon: Utensils, color: 'text-info', bg: 'bg-info/10', border: 'border-info/20' };
    case 'document': return { icon: FileText, color: 'text-warning', bg: 'bg-warning/10', border: 'border-warning/20' };
    case 'checkout': return { icon: MapPin, color: 'text-warning', bg: 'bg-warning/10', border: 'border-warning/20' };
    case 'emergency': return { icon: ShieldAlert, color: 'text-danger', bg: 'bg-danger/10', border: 'border-danger/50' };
    default: return { icon: Bell, color: 'text-secondary', bg: 'bg-input', border: 'border-border' };
  }
};

export function StudentNotificationsMain() {
  const [notifications, setNotifications] = useState<Notification[]>(DUMMY_NOTIFICATIONS);
  const [filter, setFilter] = useState('all'); // all, unread, urgent
  const [searchQuery, setSearchQuery] = useState('');

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    toast.success('All notifications marked as read');
  };

  const handleDelete = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    toast.success('Notification removed');
  };

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'unread' && n.isRead) return false;
    if (filter === 'urgent' && !n.isUrgent) return false;
    if (searchQuery && !n.title.toLowerCase().includes(searchQuery.toLowerCase()) && !n.message.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="w-full max-w-4xl mx-auto pb-12 animate-in fade-in duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-primary flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center relative">
              <Bell className="w-6 h-6 text-primary" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-danger rounded-full flex items-center justify-center text-[9px] font-bold text-white border-2 border-card">
                  {unreadCount}
                </span>
              )}
            </div>
            Notifications
          </h1>
          <p className="text-sm text-secondary mt-2 font-medium">Stay updated with your personalized alerts and notices.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
            <input 
              type="text" 
              placeholder="Search notifications..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-card border border-border rounded-xl pl-9 pr-4 py-2.5 text-sm font-medium focus:outline-none focus:border-primary shadow-sm w-full sm:w-64"
            />
          </div>
          <button 
            onClick={handleMarkAllAsRead}
            disabled={unreadCount === 0}
            className="bg-card border border-border px-4 py-2.5 rounded-xl text-sm font-bold text-primary hover:bg-input transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            Mark all read
          </button>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden flex flex-col min-h-[500px]">
        
        {/* Filters */}
        <div className="border-b border-border p-4 bg-input/30 flex items-center gap-2 overflow-x-auto hide-scrollbar">
          <Filter className="w-4 h-4 text-secondary shrink-0 mr-2" />
          {[
            { id: 'all', label: 'All Updates' },
            { id: 'unread', label: `Unread (${unreadCount})` },
            { id: 'urgent', label: 'Urgent / Action Required' }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${
                filter === f.id ? 'bg-primary text-white shadow-md' : 'bg-page text-secondary border border-border hover:text-primary hover:border-primary/50'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto divide-y divide-border">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notif) => {
              const config = getNotificationConfig(notif.type);
              const Icon = config.icon;
              
              return (
                <div key={notif.id} className={`p-4 md:p-6 transition-colors hover:bg-input/50 flex gap-4 ${!notif.isRead ? 'bg-primary/5' : ''}`}>
                  
                  <div className={`w-12 h-12 rounded-full shrink-0 flex items-center justify-center border shadow-sm ${config.bg} ${config.color} ${config.border}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2">
                        <h3 className={`text-sm md:text-base font-bold ${!notif.isRead ? 'text-primary' : 'text-secondary'}`}>
                          {notif.title}
                        </h3>
                        {notif.isUrgent && (
                          <span className="bg-danger/10 text-danger border border-danger/20 text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider">
                            Urgent
                          </span>
                        )}
                        {!notif.isRead && (
                          <div className="w-2 h-2 rounded-full bg-primary shrink-0 sm:hidden"></div>
                        )}
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-xs text-secondary font-medium flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {notif.time}
                        </span>
                        
                        {/* Desktop Actions */}
                        <div className="hidden sm:flex items-center gap-1 ml-2">
                          {!notif.isRead && (
                            <button onClick={() => handleMarkAsRead(notif.id)} className="w-7 h-7 rounded-lg hover:bg-input text-secondary hover:text-success flex items-center justify-center transition-colors" title="Mark as read">
                              <Check className="w-4 h-4" />
                            </button>
                          )}
                          <button onClick={() => handleDelete(notif.id)} className="w-7 h-7 rounded-lg hover:bg-input text-secondary hover:text-danger flex items-center justify-center transition-colors" title="Dismiss">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <p className={`text-sm leading-relaxed mb-3 ${!notif.isRead ? 'text-primary/90 font-medium' : 'text-secondary'}`}>
                      {notif.message}
                    </p>

                    <div className="flex items-center gap-3">
                      {notif.actionUrl && (
                        <button className="bg-primary text-white text-xs font-bold px-4 py-1.5 rounded-lg shadow-sm hover:bg-primary/90 transition-colors">
                          Open details
                        </button>
                      )}
                      
                      {/* Mobile Actions */}
                      <div className="sm:hidden flex items-center gap-2">
                        {!notif.isRead && (
                          <button onClick={() => handleMarkAsRead(notif.id)} className="text-xs font-bold text-primary hover:underline">
                            Mark read
                          </button>
                        )}
                        <button onClick={() => handleDelete(notif.id)} className="text-xs font-bold text-danger hover:underline">
                          Dismiss
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Unread indicator dot (desktop) */}
                  {!notif.isRead && (
                    <div className="hidden sm:flex w-2.5 h-2.5 rounded-full bg-primary mt-2 shrink-0"></div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center px-4">
              <div className="w-20 h-20 rounded-full bg-input flex items-center justify-center mb-4">
                <Bell className="w-10 h-10 text-secondary opacity-50" />
              </div>
              <h3 className="text-lg font-bold text-primary mb-2">No notifications found</h3>
              <p className="text-sm text-secondary max-w-sm">
                {searchQuery ? 'Try adjusting your search criteria.' : 'You\'re all caught up! There are no new notifications to show here.'}
              </p>
              {(searchQuery || filter !== 'all') && (
                <button 
                  onClick={() => { setFilter('all'); setSearchQuery(''); }}
                  className="mt-6 bg-primary/10 text-primary font-bold text-sm px-6 py-2 rounded-xl hover:bg-primary/20 transition-colors"
                >
                  Clear Filters
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
