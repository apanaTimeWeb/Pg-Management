// @ts-nocheck
'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Megaphone, MessageSquare, LayoutTemplate, Send, Users, AlertCircle, Edit, CheckCircle, Mail, Smartphone, Activity, Server } from 'lucide-react';

export function SuperadminCommunicationMain() {
  const searchParams = useSearchParams();
  const tabQuery = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState(tabQuery || 'announcements');

  useEffect(() => {
    setActiveTab(tabQuery || 'announcements');
  }, [tabQuery]);

  const tabs = [
    { id: 'announcements', label: 'Announcements', icon: Megaphone, color: 'text-info', bg: 'bg-info-bg' },
    { id: 'templates', label: 'Notification Templates', icon: LayoutTemplate, color: 'text-purple', bg: 'bg-purple-bg' },
    { id: 'logs', label: 'Delivery Logs', icon: Send, color: 'text-success', bg: 'bg-success-bg' },
    { id: 'providers', label: 'Provider Status', icon: Server, color: 'text-warning', bg: 'bg-warning-bg' },
  ];

  return (
    <div className="w-full h-full space-y-6 pb-20">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-theme-primary to-theme-primary-hover text-white rounded-3xl p-8 shadow-lg relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-700">
          <MessageSquare className="w-40 h-40" />
        </div>
        <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black mb-2 flex items-center gap-3">
              <Megaphone className="w-8 h-8" /> Communication Center
            </h1>
            <p className="text-white/80 font-medium max-w-xl">
              Broadcast platform-wide announcements, manage templates, and track delivery across Email, SMS, and WhatsApp.
            </p>
          </div>
          <button className="bg-white/20 backdrop-blur text-white border border-white/30 px-6 py-3 rounded-xl font-bold shadow-md hover:bg-white/90 transition-colors flex items-center gap-2 whitespace-nowrap">
            <Megaphone className="w-5 h-5" /> New Announcement
          </button>
        </div>
      </div>

      <div className="flex flex-col space-y-6">
        
        {/* Top Navigation Tabs */}
        <div className="bg-card border border-border/50 rounded-3xl p-2 shadow-sm flex items-center overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-bold transition-all whitespace-nowrap ${
                activeTab === tab.id 
                  ? 'bg-primary-subtle text-theme-primary shadow-sm' 
                  : 'text-secondary hover:bg-bg-page hover:text-primary'
              }`}
            >
              <div className={`p-1.5 rounded-lg ${activeTab === tab.id ? tab.bg : 'bg-transparent'}`}>
                <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-theme-primary' : tab.color}`} />
              </div>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content Area */}
        <div className="w-full space-y-6">
          
          {/* ANNOUNCEMENTS TAB */}
          {activeTab === 'announcements' && (
            <div className="bg-card border border-border/50 rounded-3xl p-8 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500 relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-info-bg rounded-full blur-3xl"></div>
              
              <h2 className="text-xl font-black text-primary mb-6 border-b border-border/50 pb-4 flex items-center gap-2 relative z-10">
                <Megaphone className="w-6 h-6 text-info" /> Platform Announcements
              </h2>

              <div className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-bg-page border border-border/50 rounded-2xl">
                  <div className="space-y-4 col-span-2">
                    <h3 className="font-bold text-primary">Create New Broadcast</h3>
                    <input type="text" placeholder="Announcement Title" className="w-full px-4 py-3 bg-card border border-border/50 rounded-xl focus:ring-2 focus:ring-info font-medium text-primary" />
                    <textarea rows={3} placeholder="Write your message here..." className="w-full px-4 py-3 bg-card border border-border/50 rounded-xl focus:ring-2 focus:ring-info font-medium text-primary"></textarea>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-secondary uppercase tracking-wider">Target Audience</label>
                    <select className="w-full px-4 py-3 bg-card border border-border/50 rounded-xl focus:ring-2 focus:ring-info font-medium text-primary cursor-pointer">
                      <option>All Users</option>
                      <option>All Admins (Owners)</option>
                      <option>All Managers</option>
                      <option>All Students</option>
                      <option>Specific PGs Only</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-secondary uppercase tracking-wider">Priority Level</label>
                    <select className="w-full px-4 py-3 bg-card border border-border/50 rounded-xl focus:ring-2 focus:ring-info font-medium text-primary cursor-pointer">
                      <option>Standard Information</option>
                      <option>High Priority / Alert</option>
                      <option>Critical (Maintenence)</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-secondary uppercase tracking-wider">Start Date</label>
                    <input type="date" className="w-full px-4 py-3 bg-card border border-border/50 rounded-xl focus:ring-2 focus:ring-info font-medium text-primary" />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-secondary uppercase tracking-wider">End Date</label>
                    <input type="date" className="w-full px-4 py-3 bg-card border border-border/50 rounded-xl focus:ring-2 focus:ring-info font-medium text-primary" />
                  </div>

                  <div className="col-span-2 flex justify-end pt-4 border-t border-border/50">
                    <button className="bg-theme-primary hover:bg-theme-primary-hover text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-md">
                      <Send className="w-5 h-5" /> Broadcast Now
                    </button>
                  </div>
                </div>

                {/* Recent Announcements List */}
                <h3 className="font-bold text-primary mt-8 mb-4">Active & Past Announcements</h3>
                <div className="space-y-4">
                  {[
                    { title: 'Scheduled Maintenance', audience: 'All Users', priority: 'Critical', active: true },
                    { title: 'New App Update v14.6', audience: 'All Admins', priority: 'High', active: false },
                  ].map((ann, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-bg-page border border-border/50 rounded-xl hover:border-info/30 transition-colors">
                      <div className="flex flex-col">
                        <span className="font-bold text-primary text-sm flex items-center gap-2">
                          {ann.title} 
                          {ann.active ? <span className="bg-success-bg text-success px-2 py-0.5 rounded text-[10px]">Active</span> : <span className="bg-secondary/10 text-secondary px-2 py-0.5 rounded text-[10px]">Expired</span>}
                        </span>
                        <span className="text-xs text-secondary font-medium mt-1">Audience: {ann.audience} | Priority: {ann.priority}</span>
                      </div>
                      <button className="text-info font-bold text-xs hover:underline"><Edit className="w-4 h-4" /></button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TEMPLATES TAB */}
          {activeTab === 'templates' && (
            <div className="bg-card border border-border/50 rounded-3xl p-8 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500 relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-purple-bg rounded-full blur-3xl"></div>
              
              <h2 className="text-xl font-black text-primary mb-6 border-b border-border/50 pb-4 flex items-center justify-between relative z-10">
                <div className="flex items-center gap-2"><LayoutTemplate className="w-6 h-6 text-purple" /> Notification Templates</div>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
                {[
                  { name: 'Welcome Email (New PG)', type: 'Email', status: 'Active', color: 'text-info', bg: 'bg-info-bg' },
                  { name: 'Password Reset', type: 'Email / SMS', status: 'Active', color: 'text-theme-primary', bg: 'bg-primary-subtle' },
                  { name: 'PG Approval Success', type: 'WhatsApp', status: 'Active', color: 'text-success', bg: 'bg-success-bg' },
                  { name: 'Subscription Expiry Alert', type: 'Email / WhatsApp', status: 'Active', color: 'text-warning', bg: 'bg-warning-bg' },
                  { name: 'Invoice Generation', type: 'Email', status: 'Active', color: 'text-purple', bg: 'bg-purple-bg' },
                  { name: 'Support Ticket Reply', type: 'In-App / Email', status: 'Active', color: 'text-info', bg: 'bg-info-bg' },
                ].map((tpl, i) => (
                  <div key={i} className="p-5 bg-bg-page border border-border/50 rounded-2xl hover:border-purple/30 transition-colors group">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-bold text-primary group-hover:text-purple transition-colors text-sm">{tpl.name}</h3>
                      <button className="text-secondary group-hover:text-purple transition-colors"><Edit className="w-4 h-4" /></button>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-1 rounded text-[10px] font-bold ${tpl.bg} ${tpl.color}`}>{tpl.type}</span>
                      <span className="flex items-center gap-1 text-[10px] font-bold text-success"><CheckCircle className="w-3 h-3" /> {tpl.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* DELIVERY LOGS TAB */}
          {activeTab === 'logs' && (
            <div className="bg-card border border-border/50 rounded-3xl p-8 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-xl font-black text-primary mb-6 border-b border-border/50 pb-4 flex items-center gap-2">
                <Send className="w-6 h-6 text-success" /> Message Delivery Logs
              </h2>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse whitespace-nowrap">
                  <thead>
                    <tr className="border-b border-border/50">
                      <th className="py-3 px-4 text-xs font-bold text-secondary uppercase tracking-wider">Recipient</th>
                      <th className="py-3 px-4 text-xs font-bold text-secondary uppercase tracking-wider">Channel</th>
                      <th className="py-3 px-4 text-xs font-bold text-secondary uppercase tracking-wider">Type / Template</th>
                      <th className="py-3 px-4 text-xs font-bold text-secondary uppercase tracking-wider">Status</th>
                      <th className="py-3 px-4 text-xs font-bold text-secondary uppercase tracking-wider">Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/30">
                    {[
                      { to: 'rahul@gmail.com', ch: 'Email', tpl: 'Invoice Generated', status: 'Delivered', time: '2 mins ago', icon: Mail, color: 'text-info' },
                      { to: '+91 9876543210', ch: 'WhatsApp', tpl: 'PG Approval', status: 'Read', time: '15 mins ago', icon: MessageSquare, color: 'text-success' },
                      { to: '+91 9123456789', ch: 'SMS', tpl: 'OTP Verification', status: 'Failed', time: '1 hour ago', icon: Smartphone, color: 'text-danger', error: true },
                      { to: 'amit@sunshinepg.com', ch: 'Email', tpl: 'Subscription Expiry', status: 'Sent', time: '3 hours ago', icon: Mail, color: 'text-info' },
                    ].map((log, i) => (
                      <tr key={i} className="hover:bg-bg-page/50 transition-colors">
                        <td className="py-4 px-4 text-sm font-bold text-primary">{log.to}</td>
                        <td className="py-4 px-4">
                          <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs font-bold bg-bg-page border border-border/50 ${log.color}`}>
                            <log.icon className="w-3 h-3" /> {log.ch}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-sm text-secondary font-medium">{log.tpl}</td>
                        <td className="py-4 px-4">
                          <span className={`px-2 py-1 rounded text-[10px] font-bold ${log.error ? 'bg-danger-bg text-danger' : 'bg-success-bg text-success'}`}>
                            {log.status}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-sm text-secondary">{log.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* PROVIDER STATUS TAB */}
          {activeTab === 'providers' && (
            <div className="bg-card border border-border/50 rounded-3xl p-8 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500 relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-warning-bg rounded-full blur-3xl"></div>
              <h2 className="text-xl font-black text-primary mb-6 border-b border-border/50 pb-4 flex items-center gap-2 relative z-10">
                <Server className="w-6 h-6 text-warning" /> API Provider Status
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 relative z-10">
                {/* Email Provider */}
                <div className="p-6 bg-bg-page border border-success/30 rounded-2xl flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow">
                  <div className="w-14 h-14 bg-success-bg text-success rounded-full flex items-center justify-center mb-3">
                    <Mail className="w-7 h-7" />
                  </div>
                  <h3 className="font-bold text-primary mb-1">SendGrid (Email)</h3>
                  <span className="flex items-center gap-1.5 text-xs font-bold text-success bg-success-bg px-3 py-1 rounded-full"><CheckCircle className="w-3.5 h-3.5" /> Operational</span>
                  <div className="mt-4 pt-4 border-t border-border/50 w-full flex justify-between text-xs">
                    <span className="text-secondary font-medium">Daily Limit:</span>
                    <span className="font-bold text-primary">12k / 50k</span>
                  </div>
                </div>

                {/* SMS Provider */}
                <div className="p-6 bg-bg-page border border-success/30 rounded-2xl flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow">
                  <div className="w-14 h-14 bg-success-bg text-success rounded-full flex items-center justify-center mb-3">
                    <Smartphone className="w-7 h-7" />
                  </div>
                  <h3 className="font-bold text-primary mb-1">Twilio (SMS)</h3>
                  <span className="flex items-center gap-1.5 text-xs font-bold text-success bg-success-bg px-3 py-1 rounded-full"><CheckCircle className="w-3.5 h-3.5" /> Operational</span>
                  <div className="mt-4 pt-4 border-t border-border/50 w-full flex justify-between text-xs">
                    <span className="text-secondary font-medium">Credits:</span>
                    <span className="font-bold text-primary">$450 remaining</span>
                  </div>
                </div>

                {/* WhatsApp Provider */}
                <div className="p-6 bg-bg-page border border-warning/30 rounded-2xl flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow">
                  <div className="w-14 h-14 bg-warning-bg text-warning rounded-full flex items-center justify-center mb-3">
                    <MessageSquare className="w-7 h-7" />
                  </div>
                  <h3 className="font-bold text-primary mb-1">Meta API (WhatsApp)</h3>
                  <span className="flex items-center gap-1.5 text-xs font-bold text-warning bg-warning-bg px-3 py-1 rounded-full"><Activity className="w-3.5 h-3.5 animate-pulse" /> Degraded Perf.</span>
                  <div className="mt-4 pt-4 border-t border-border/50 w-full flex justify-between text-xs">
                    <span className="text-secondary font-medium">Latency:</span>
                    <span className="font-bold text-warning">450ms</span>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
