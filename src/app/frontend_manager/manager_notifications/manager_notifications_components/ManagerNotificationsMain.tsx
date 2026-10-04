// @ts-nocheck
'use client';

import React, { useState } from 'react';
import { 
  Bell, Search, Filter, CheckCircle2, Trash2, MailOpen, AlertTriangle, 
  UserPlus, DoorOpen, Users, MessageSquare, Wrench, IndianRupee, 
  LogIn, LogOut, Package, Utensils, FileText, MoreVertical, X
} from 'lucide-react';

type NotificationType = 'Emergency' | 'Admission' | 'Leave' | 'Visitor' | 'Complaint' | 'Maintenance' | 'Payment' | 'CheckIn' | 'CheckOut' | 'Inventory' | 'Food' | 'Notice';

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  timestamp: string;
  isRead: boolean;
  priority: 'low' | 'medium' | 'high' | 'critical';
}

const DUMMY_NOTIFICATIONS: Notification[] = [
  {
    id: 'n1',
    type: 'Emergency',
    title: 'Emergency: Fire Alarm Triggered',
    description: 'Fire alarm triggered in Block B, Floor 2. Please check immediately.',
    timestamp: '2026-10-03T18:05:00',
    isRead: false,
    priority: 'critical'
  },
  {
    id: 'n2',
    type: 'Admission',
    title: 'New Admission Application',
    description: 'Rahul Sharma has submitted a new admission request for a Double Sharing AC Room.',
    timestamp: '2026-10-03T17:30:00',
    isRead: false,
    priority: 'medium'
  },
  {
    id: 'n3',
    type: 'Leave',
    title: 'Pending Leave Request',
    description: 'Amit Kumar (Room 105) requested leave from 5 Oct to 8 Oct. Approval required.',
    timestamp: '2026-10-03T16:15:00',
    isRead: true,
    priority: 'medium'
  },
  {
    id: 'n4',
    type: 'Visitor',
    title: 'New Visitor Request',
    description: 'Visitor request pending for Suresh (Room 201) at the front gate.',
    timestamp: '2026-10-03T15:45:00',
    isRead: false,
    priority: 'low'
  },
  {
    id: 'n5',
    type: 'Complaint',
    title: 'New Complaint Registered',
    description: 'AC not working in Room 304. Raised by Vikas Singh.',
    timestamp: '2026-10-03T14:20:00',
    isRead: true,
    priority: 'high'
  },
  {
    id: 'n6',
    type: 'Maintenance',
    title: 'Maintenance Update',
    description: 'Plumbing issue in Room 102 has been resolved by staff.',
    timestamp: '2026-10-03T11:10:00',
    isRead: true,
    priority: 'low'
  },
  {
    id: 'n7',
    type: 'Payment',
    title: 'Payment Overdue Alert',
    description: '5 students have overdue rent payments exceeding 3 days.',
    timestamp: '2026-10-03T10:00:00',
    isRead: false,
    priority: 'high'
  },
  {
    id: 'n8',
    type: 'Inventory',
    title: 'Low Stock Alert',
    description: 'Hand Wash Refill stock is critically low (2 units remaining).',
    timestamp: '2026-10-02T18:00:00',
    isRead: true,
    priority: 'medium'
  },
  {
    id: 'n9',
    type: 'Food',
    title: 'Food Quality Complaint',
    description: 'Multiple students reported issues with dinner quality yesterday.',
    timestamp: '2026-10-02T09:30:00',
    isRead: true,
    priority: 'high'
  },
  {
    id: 'n10',
    type: 'CheckOut',
    title: 'Check-out Pending',
    description: 'Suresh Patel (Room 405) is scheduled for check-out today.',
    timestamp: '2026-10-02T08:00:00',
    isRead: true,
    priority: 'medium'
  }
];

const getIconForType = (type: NotificationType) => {
  switch (type) {
    case 'Emergency': return <AlertTriangle className="w-5 h-5" />;
    case 'Admission': return <UserPlus className="w-5 h-5" />;
    case 'Leave': return <DoorOpen className="w-5 h-5" />;
    case 'Visitor': return <Users className="w-5 h-5" />;
    case 'Complaint': return <MessageSquare className="w-5 h-5" />;
    case 'Maintenance': return <Wrench className="w-5 h-5" />;
    case 'Payment': return <IndianRupee className="w-5 h-5" />;
    case 'CheckIn': return <LogIn className="w-5 h-5" />;
    case 'CheckOut': return <LogOut className="w-5 h-5" />;
    case 'Inventory': return <Package className="w-5 h-5" />;
    case 'Food': return <Utensils className="w-5 h-5" />;
    case 'Notice': return <FileText className="w-5 h-5" />;
    default: return <Bell className="w-5 h-5" />;
  }
};

const getColorForType = (type: NotificationType, priority: string) => {
  if (type === 'Emergency' || priority === 'critical') return 'bg-red-100 text-red-600 border-red-200';
  if (priority === 'high') return 'bg-orange-100 text-orange-600 border-orange-200';
  if (type === 'Admission' || type === 'CheckIn' || type === 'Payment') return 'bg-green-100 text-green-600 border-green-200';
  return 'bg-indigo-100 text-indigo-600 border-indigo-200';
};

const formatTimeAgo = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
  
  if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays === 1) return 'Yesterday';
  return `${diffInDays} days ago`;
};

export default function ManagerNotificationsMain() {
  const [notifications, setNotifications] = useState<Notification[]>(DUMMY_NOTIFICATIONS);
  const [filterType, setFilterType] = useState<string>('All');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);

  // Actions
  const markAsRead = (id: string, e?: React.MouseEvent) => {
    if(e) e.stopPropagation();
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const deleteNotification = (id: string, e?: React.MouseEvent) => {
    if(e) e.stopPropagation();
    setNotifications(prev => prev.filter(n => n.id !== id));
    if (selectedNotification?.id === id) setSelectedNotification(null);
  };

  const clearAllNotifications = () => {
    if(window.confirm('Are you sure you want to clear all notifications?')) {
      setNotifications([]);
      setSelectedNotification(null);
    }
  };

  const openNotification = (notification: Notification) => {
    setSelectedNotification(notification);
    if (!notification.isRead) {
      markAsRead(notification.id);
    }
  };

  // Filtering
  const filteredNotifications = notifications.filter(n => {
    const matchesType = filterType === 'All' || n.type === filterType;
    const matchesStatus = filterStatus === 'All' 
                          ? true 
                          : filterStatus === 'Unread' ? !n.isRead : n.isRead;
    return matchesType && matchesStatus;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="p-4 md:p-8 space-y-6 animate-in fade-in duration-500 w-full h-[calc(100vh-4rem)] flex flex-col">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-black text-primary flex items-center gap-3">
            <div className="p-2 bg-indigo-100 rounded-xl text-indigo-600 relative">
              <Bell className="w-6 h-6"/>
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
              )}
            </div>
            Notifications
            {unreadCount > 0 && (
              <span className="px-2.5 py-1 bg-red-100 text-red-700 text-sm rounded-full font-bold">
                {unreadCount} New
              </span>
            )}
          </h1>
          <p className="text-[var(--text-disabled)] text-sm mt-1 font-medium">Important operational alerts and updates.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
            className="flex items-center gap-2 bg-page text-secondary border border-border/60 hover:text-primary hover:bg-page/80 px-4 py-2 rounded-xl text-sm font-bold shadow-sm transition-all disabled:opacity-50"
          >
            <CheckCircle2 className="w-4 h-4" /> Mark All Read
          </button>
          <button 
            onClick={clearAllNotifications}
            disabled={notifications.length === 0}
            className="flex items-center gap-2 bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2 rounded-xl text-sm font-bold shadow-sm transition-all disabled:opacity-50"
          >
            <Trash2 className="w-4 h-4" /> Clear All
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
        
        {/* Notifications List (Left Side) */}
        <div className="lg:col-span-2 bg-card border border-border/60 rounded-2xl shadow-sm flex flex-col min-h-0">
          
          {/* Filters */}
          <div className="p-4 border-b border-border/50 flex items-center justify-between gap-4 bg-page/30 shrink-0">
            <div className="flex items-center gap-2">
              <select 
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 bg-input border border-border rounded-lg text-sm font-bold text-secondary focus:outline-none focus:border-indigo-500"
              >
                <option value="All">All Status</option>
                <option value="Unread">Unread</option>
                <option value="Read">Read</option>
              </select>
              
              <select 
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2 bg-input border border-border rounded-lg text-sm font-bold text-secondary focus:outline-none focus:border-indigo-500"
              >
                <option value="All">All Types</option>
                <option value="Emergency">Emergency</option>
                <option value="Admission">Admission</option>
                <option value="Leave">Leave Request</option>
                <option value="Complaint">Complaint</option>
                <option value="Payment">Payment</option>
                <option value="Inventory">Inventory</option>
              </select>
            </div>
            
            <button className="p-2 text-secondary hover:text-primary rounded-lg hover:bg-page transition-colors">
              <Filter className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="overflow-y-auto flex-1 p-2 space-y-1">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notif) => (
                <div 
                  key={notif.id}
                  onClick={() => openNotification(notif)}
                  className={`relative p-4 rounded-xl border cursor-pointer transition-all ${
                    !notif.isRead 
                      ? 'bg-indigo-50/30 border-indigo-100 hover:border-indigo-300 shadow-sm' 
                      : 'bg-transparent border-transparent hover:bg-page/50'
                  } ${selectedNotification?.id === notif.id ? 'ring-2 ring-indigo-500 ring-offset-1' : ''}`}
                >
                  {!notif.isRead && (
                    <div className="absolute top-1/2 -translate-y-1/2 left-2 w-2 h-2 bg-indigo-600 rounded-full"></div>
                  )}
                  
                  <div className={`flex gap-4 ${!notif.isRead ? 'pl-4' : 'pl-2'}`}>
                    <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center border ${getColorForType(notif.type, notif.priority)}`}>
                      {getIconForType(notif.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className={`text-sm truncate pr-2 ${!notif.isRead ? 'font-black text-primary' : 'font-bold text-secondary'}`}>
                          {notif.title}
                        </h4>
                        <span className="text-[11px] font-medium text-secondary shrink-0 whitespace-nowrap">
                          {formatTimeAgo(notif.timestamp)}
                        </span>
                      </div>
                      <p className={`text-sm mt-1 line-clamp-1 ${!notif.isRead ? 'font-medium text-primary/80' : 'text-secondary/80'}`}>
                        {notif.description}
                      </p>
                    </div>

                    <div className="shrink-0 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {!notif.isRead && (
                        <button 
                          onClick={(e) => markAsRead(notif.id, e)}
                          className="p-1.5 text-secondary hover:text-indigo-600 hover:bg-indigo-50 rounded-lg"
                          title="Mark as Read"
                        >
                          <MailOpen className="w-4 h-4" />
                        </button>
                      )}
                      <button 
                        onClick={(e) => deleteNotification(notif.id, e)}
                        className="p-1.5 text-secondary hover:text-red-600 hover:bg-red-50 rounded-lg"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-8">
                <div className="w-16 h-16 bg-page rounded-full flex items-center justify-center mb-4 border border-border">
                  <Bell className="w-8 h-8 text-secondary/50" />
                </div>
                <h3 className="text-lg font-bold text-primary">All Caught Up!</h3>
                <p className="text-secondary text-sm mt-1">You don't have any notifications matching the current filters.</p>
              </div>
            )}
          </div>
        </div>

        {/* Notification Details (Right Side) */}
        <div className="lg:col-span-1">
          {selectedNotification ? (
            <div className="bg-card border border-border/60 rounded-2xl shadow-sm h-full flex flex-col animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="p-4 border-b border-border/50 flex items-center justify-between bg-page/30">
                <h3 className="font-bold text-primary">Details</h3>
                <button 
                  onClick={() => setSelectedNotification(null)}
                  className="p-1.5 text-secondary hover:text-primary rounded-lg hover:bg-page transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-6 flex-1 overflow-y-auto">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border mb-6 ${getColorForType(selectedNotification.type, selectedNotification.priority)}`}>
                  {getIconForType(selectedNotification.type)}
                </div>
                
                <h2 className="text-xl font-black text-primary mb-2">
                  {selectedNotification.title}
                </h2>
                
                <div className="flex items-center gap-3 text-sm font-medium text-secondary mb-6 border-b border-border/50 pb-6">
                  <span>{new Date(selectedNotification.timestamp).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short'})}</span>
                  <span>•</span>
                  <span className="capitalize">{selectedNotification.type}</span>
                </div>
                
                <div className="prose prose-sm max-w-none text-primary">
                  <p className="text-base leading-relaxed">{selectedNotification.description}</p>
                </div>

                <div className="mt-8 space-y-3">
                  <h4 className="text-xs font-bold text-secondary uppercase tracking-wider">Quick Actions</h4>
                  <div className="flex flex-col gap-2">
                    <button className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold shadow-md transition-all">
                      Take Action
                    </button>
                    <button 
                      onClick={(e) => deleteNotification(selectedNotification.id, e)}
                      className="w-full py-2.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl text-sm font-bold transition-all"
                    >
                      Delete Notification
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-card border border-border/60 rounded-2xl shadow-sm h-full flex flex-col items-center justify-center p-8 text-center border-dashed">
              <div className="w-16 h-16 bg-page rounded-full flex items-center justify-center mb-4">
                <MailOpen className="w-8 h-8 text-secondary/40" />
              </div>
              <h3 className="text-lg font-bold text-secondary">Select a Notification</h3>
              <p className="text-secondary/70 text-sm mt-1">Click on any notification from the list to view its complete details here.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
