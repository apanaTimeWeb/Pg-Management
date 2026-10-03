// @ts-nocheck
'use client';

import React, { useState } from 'react';
import { Bell, CheckCircle2, UserPlus, Wallet, AlertCircle, PlaneTakeoff, MessageSquare, Wrench, Package, Users, LogOut, FileWarning, Mail, Smartphone, MessageCircle, AppWindow, Settings, Check, X } from 'lucide-react';

const MOCK_NOTIFICATIONS = [
  { id: 1, type: 'New admission', title: 'New Student Admission', desc: 'Rohan Sharma has completed the admission process for Room 102.', time: '10 mins ago', icon: UserPlus, color: 'text-blue-500', bg: 'bg-blue-50', unread: true, channels: ['in-app', 'email'] },
  { id: 2, type: 'Payment received', title: 'Payment Received', desc: '₹12,000 rent received from Amit Kumar (Room 304).', time: '1 hour ago', icon: Wallet, color: 'text-emerald-500', bg: 'bg-emerald-50', unread: true, channels: ['in-app', 'sms', 'whatsapp'] },
  { id: 3, type: 'Rent overdue', title: 'Rent Overdue Alert', desc: '5 students have not paid rent for the current month.', time: '3 hours ago', icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-50', unread: false, channels: ['in-app', 'push'] },
  { id: 4, type: 'Leave request', title: 'New Leave Request', desc: 'Vikram Singh requested leave from 10 Oct to 15 Oct.', time: '5 hours ago', icon: PlaneTakeoff, color: 'text-teal-500', bg: 'bg-teal-50', unread: false, channels: ['in-app', 'whatsapp'] },
  { id: 5, type: 'Complaint', title: 'New Complaint Logged', desc: 'WiFi not working on the 2nd floor.', time: 'Yesterday', icon: MessageSquare, color: 'text-orange-500', bg: 'bg-orange-50', unread: false, channels: ['in-app'] },
  { id: 6, type: 'Maintenance', title: 'Maintenance Scheduled', desc: 'AC Servicing is scheduled for tomorrow at 10 AM.', time: 'Yesterday', icon: Wrench, color: 'text-secondary', bg: 'bg-[var(--bg-overlay)]', unread: false, channels: ['in-app', 'email'] },
  { id: 7, type: 'Low stock', title: 'Low Inventory Stock', desc: 'Rice and Dal are running low in the kitchen inventory.', time: 'Yesterday', icon: Package, color: 'text-yellow-600', bg: 'bg-yellow-50', unread: false, channels: ['in-app', 'sms'] },
  { id: 8, type: 'New visitor', title: 'New Visitor Request', desc: 'Rahul (Friend) is requesting to visit Aman (Room 101).', time: '2 days ago', icon: Users, color: 'text-purple-500', bg: 'bg-purple-50', unread: false, channels: ['in-app', 'push'] },
  { id: 9, type: 'Check-out request', title: 'Check-out Request', desc: 'Suresh has requested to check out on 30th Oct.', time: '2 days ago', icon: LogOut, color: 'text-pink-500', bg: 'bg-pink-50', unread: false, channels: ['in-app', 'email', 'whatsapp'] },
  { id: 10, type: 'Document expiry', title: 'Document Expiry Warning', desc: 'Police Verification for 3 students is expiring this week.', time: '3 days ago', icon: FileWarning, color: 'text-red-500', bg: 'bg-red-50', unread: false, channels: ['in-app', 'email'] },
];

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState<'inbox' | 'settings'>('inbox');
  const [filterUnread, setFilterUnread] = useState(false);

  const displayedNotifications = filterUnread 
    ? MOCK_NOTIFICATIONS.filter(n => n.unread)
    : MOCK_NOTIFICATIONS;

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'in-app': return <AppWindow className="w-3 h-3" />;
      case 'email': return <Mail className="w-3 h-3" />;
      case 'sms': return <Smartphone className="w-3 h-3" />;
      case 'whatsapp': return <MessageCircle className="w-3 h-3 text-green-500" />;
      case 'push': return <Bell className="w-3 h-3" />;
      default: return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
            <Bell className="w-7 h-7 text-[#F5A623]" />
            Notification Center
          </h1>
          <p className="text-[var(--text-disabled)] text-sm mt-1">Manage all your property alerts, communications, and delivery channels.</p>
        </div>
        
        <div className="flex bg-[var(--bg-overlay)] p-1 rounded-xl">
          <button 
            onClick={() => setActiveTab('inbox')}
            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'inbox' ? 'bg-card text-primary shadow-sm' : 'text-[var(--text-disabled)] hover:text-secondary'}`}
          >
            Inbox
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${activeTab === 'settings' ? 'bg-card text-primary shadow-sm' : 'text-[var(--text-disabled)] hover:text-secondary'}`}
          >
            <Settings className="w-4 h-4" /> Channels Setup
          </button>
        </div>
      </div>

      {activeTab === 'inbox' ? (
        <div className="bg-card rounded-2xl shadow-sm border border-border/50 min-h-[600px] flex flex-col md:flex-row">
          
          {/* Left Side: Filters / Categories */}
          <div className="w-full md:w-64 border-r border-border/50 p-5 shrink-0">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Filters</h3>
            <div className="space-y-1">
              <button 
                onClick={() => setFilterUnread(false)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${!filterUnread ? 'bg-[#F5A623]/10 text-[#F5A623]' : 'text-secondary hover:bg-page'}`}
              >
                All Notifications
                {!filterUnread && <div className="w-1.5 h-1.5 rounded-full bg-[#F5A623]" />}
              </button>
              <button 
                onClick={() => setFilterUnread(true)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${filterUnread ? 'bg-[#F5A623]/10 text-[#F5A623]' : 'text-secondary hover:bg-page'}`}
              >
                Unread Only
                <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">2</span>
              </button>
            </div>

            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 mt-8">Categories</h3>
            <div className="space-y-2">
              {[
                { name: 'Admissions & Checkouts', icon: UserPlus },
                { name: 'Payments & Dues', icon: Wallet },
                { name: 'Leaves & Visitors', icon: Users },
                { name: 'Complaints & Maint.', icon: Wrench },
                { name: 'Inventory Alerts', icon: Package },
                { name: 'System & Documents', icon: FileWarning },
              ].map(cat => (
                <button key={cat.name} className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold text-[var(--text-disabled)] hover:text-primary hover:bg-page transition-colors">
                  <cat.icon className="w-4 h-4 text-gray-400" />
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Right Side: Notification List */}
          <div className="flex-1 p-0 flex flex-col">
            <div className="flex items-center justify-between p-5 border-b border-border/50">
              <h2 className="font-bold text-primary">{filterUnread ? 'Unread Notifications' : 'All Notifications'}</h2>
              <button className="text-sm font-semibold text-[#F5A623] hover:text-[#e09612] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Mark all as read
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-2">
              {displayedNotifications.map((notif) => (
                <div 
                  key={notif.id} 
                  className={`flex items-start gap-4 p-4 rounded-xl mb-1 transition-colors cursor-pointer ${notif.unread ? 'bg-blue-50/50 hover:bg-blue-50' : 'hover:bg-page'}`}
                >
                  <div className={`p-3 rounded-2xl shrink-0 ${notif.bg} ${notif.color}`}>
                    <notif.icon className="w-6 h-6" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h4 className={`text-sm truncate ${notif.unread ? 'font-bold text-primary' : 'font-semibold text-primary'}`}>
                        {notif.title}
                      </h4>
                      <span className="text-xs font-semibold text-gray-400 whitespace-nowrap">{notif.time}</span>
                    </div>
                    <p className={`text-sm ${notif.unread ? 'text-secondary font-medium' : 'text-[var(--text-disabled)]'} mb-2`}>
                      {notif.desc}
                    </p>
                    
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mr-1">Delivered Via:</span>
                      {notif.channels.map(channel => (
                        <div key={channel} className="bg-card border border-border p-1 rounded-md shadow-sm tooltip-trigger" title={channel}>
                          {getChannelIcon(channel)}
                        </div>
                      ))}
                    </div>
                  </div>

                  {notif.unread && (
                    <div className="w-2.5 h-2.5 bg-blue-500 rounded-full mt-2 shrink-0"></div>
                  )}
                </div>
              ))}
              
              {displayedNotifications.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center p-12 text-center">
                  <Bell className="w-12 h-12 text-gray-200 mb-4" />
                  <h3 className="font-bold text-primary text-lg">You're all caught up!</h3>
                  <p className="text-[var(--text-disabled)]">No new notifications in this view.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Channels Setup Tab */
        <div className="bg-card rounded-2xl shadow-sm border border-border/50 p-6 md:p-8">
          <div className="max-w-3xl">
            <h2 className="text-xl font-bold text-primary mb-2">Notification Channels</h2>
            <p className="text-[var(--text-disabled)] text-sm mb-8">Configure how and where you want to receive alerts for different types of events.</p>

            <div className="space-y-6">
              {[
                { name: 'In-App Notifications', icon: AppWindow, color: 'text-blue-500', desc: 'Receive alerts directly inside the Owner Dashboard.', status: true, locked: true },
                { name: 'Email Alerts', icon: Mail, color: 'text-purple-500', desc: 'Get daily summaries and critical alerts via email.', status: true },
                { name: 'SMS Messages', icon: Smartphone, color: 'text-orange-500', desc: 'Instant text messages for highly critical alerts like Overdue Rent.', status: false },
                { name: 'WhatsApp Notifications', icon: MessageCircle, color: 'text-green-500', desc: 'Automated WhatsApp messages directly to your phone.', status: true },
                { name: 'Push Notifications', icon: Bell, color: 'text-red-500', desc: 'Browser and mobile app push notifications.', status: false },
              ].map((channel, idx) => (
                <div key={idx} className="flex items-center justify-between p-5 border border-border/50 rounded-2xl hover:border-border transition-colors bg-page/30">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl bg-card shadow-sm border border-border/50 ${channel.color}`}>
                      <channel.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-primary">{channel.name}</h3>
                      <p className="text-xs text-[var(--text-disabled)] mt-0.5">{channel.desc}</p>
                    </div>
                  </div>
                  
                  <div>
                    {channel.locked ? (
                      <span className="px-3 py-1 bg-gray-200 text-secondary text-xs font-bold rounded-full">Always On</span>
                    ) : (
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked={channel.status} />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-card after:border-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#F5A623]"></div>
                      </label>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-border/50 flex justify-end">
              <button className="bg-[#F5A623] hover:bg-[#e09612] text-white px-6 py-2.5 rounded-xl font-bold shadow-sm transition-colors">
                Save Channel Preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
