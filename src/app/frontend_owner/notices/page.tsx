// @ts-nocheck
'use client';

import React, { useState } from 'react';
import { Megaphone, Plus, Users, Calendar, Wrench, Droplet, Zap, MessageSquare, ArrowRight, Eye, CheckCircle2, FileText, BellRing, UserCheck, Search, ChevronRight, Send, UtensilsCrossed } from 'lucide-react';

const MOCK_NOTICES = [
  { id: 1, title: 'Electricity Shutdown Notice', type: 'Electricity shutdown', content: 'There will be a planned power outage tomorrow from 10 AM to 2 PM due to transformer maintenance.', audience: 'All Students', date: 'Oct 03, 2026', readStatus: '180 / 210', icon: Zap, color: 'text-yellow-500', bg: 'bg-yellow-50' },
  { id: 2, title: 'Diwali Holiday Mess Timings', type: 'Holiday', content: 'The mess will be closed for lunch on the day of Diwali. Breakfast and Dinner will be served as usual.', audience: 'All Students', date: 'Oct 01, 2026', readStatus: '205 / 210', icon: Calendar, color: 'text-purple-500', bg: 'bg-purple-50' },
  { id: 3, title: 'Water Pump Repair', type: 'Water issue', content: 'We are experiencing low water pressure on the 3rd floor. Plumber is working on it.', audience: 'Selected Students', date: 'Sep 28, 2026', readStatus: '40 / 45', icon: Droplet, color: 'text-blue-500', bg: 'bg-blue-50' },
  { id: 4, title: 'Pending Fee Reminder', type: 'Fee reminder', content: 'Gentle reminder to clear your pending dues for October by the 5th to avoid late fines.', audience: 'Selected Students', date: 'Sep 25, 2026', readStatus: '12 / 12', icon: BellRing, color: 'text-red-500', bg: 'bg-red-50' },
  { id: 5, title: 'Kitchen Deep Cleaning', type: 'Maintenance', content: 'Deep cleaning of the kitchen is scheduled for Sunday. Cooks please report at 7 AM.', audience: 'Cooks', date: 'Sep 20, 2026', readStatus: '4 / 4', icon: Wrench, color: 'text-orange-500', bg: 'bg-orange-50' },
];

export default function NoticesPage() {
  const [viewState, setViewState] = useState<'list' | 'create' | 'audience' | 'preview'>('list');
  const [formData, setFormData] = useState({ title: '', type: 'General announcement', content: '', audience: 'All Students' });

  const renderContent = () => {
    switch (viewState) {
      case 'list':
        return (
          <div className="animate-in fade-in zoom-in-95 duration-300">
            <div className="flex items-center justify-between mb-6">
              <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="text" placeholder="Search announcements..." className="w-full pl-10 pr-4 py-2 border border-border rounded-xl focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623] outline-none text-sm" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {MOCK_NOTICES.map((notice) => (
                <div key={notice.id} className="bg-card rounded-2xl p-5 border border-border/50 shadow-sm hover:shadow-md transition-shadow relative">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-xl ${notice.bg} ${notice.color}`}>
                        <notice.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-primary text-sm md:text-base">{notice.title}</h3>
                        <span className="text-xs font-semibold text-[var(--text-disabled)]">{notice.date}</span>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 bg-[var(--bg-overlay)] text-secondary rounded-lg text-[10px] font-bold uppercase tracking-wider">
                      {notice.type}
                    </span>
                  </div>
                  
                  <p className="text-sm text-secondary mb-4 line-clamp-2">"{notice.content}"</p>
                  
                  <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-semibold text-[var(--text-disabled)]">
                      <Users className="w-3.5 h-3.5" /> Sent to: <span className="text-primary">{notice.audience}</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-bold border border-green-100 tooltip-trigger" title="Read Status">
                      <Eye className="w-3.5 h-3.5" /> {notice.readStatus} Read
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        
      case 'create':
        return (
          <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-sm animate-in fade-in slide-in-from-right-4 duration-300 max-w-3xl mx-auto">
            <h2 className="text-lg font-bold text-primary mb-6 flex items-center gap-2">
              <span className="bg-[#F5A623] text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span> 
              Draft Notice Content
            </h2>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-secondary mb-2">Notice Type</label>
                <select 
                  className="w-full px-4 py-2.5 rounded-xl border border-border focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623] outline-none"
                  value={formData.type}
                  onChange={e => setFormData({...formData, type: e.target.value})}
                >
                  <option>General announcement</option>
                  <option>Fee reminder</option>
                  <option>Mess notice</option>
                  <option>Holiday</option>
                  <option>Maintenance</option>
                  <option>Water issue</option>
                  <option>Electricity shutdown</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-secondary mb-2">Notice Title</label>
                <input 
                  type="text" 
                  placeholder="e.g. Wi-Fi Maintenance Tomorrow" 
                  className="w-full px-4 py-2.5 rounded-xl border border-border focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623] outline-none"
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-secondary mb-2">Message Content</label>
                <textarea 
                  rows={5} 
                  placeholder="Write your announcement here..." 
                  className="w-full px-4 py-3 rounded-xl border border-border focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623] outline-none resize-none"
                  value={formData.content}
                  onChange={e => setFormData({...formData, content: e.target.value})}
                ></textarea>
              </div>
              <div className="pt-4 flex justify-end">
                <button 
                  onClick={() => setViewState('audience')}
                  className="flex items-center gap-2 bg-[#1A3A5C] hover:bg-[#122a42] text-white px-6 py-2.5 rounded-xl font-bold transition-colors"
                >
                  Next: Select Audience <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        );

      case 'audience':
        return (
          <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-sm animate-in fade-in slide-in-from-right-4 duration-300 max-w-3xl mx-auto">
            <h2 className="text-lg font-bold text-primary mb-6 flex items-center gap-2">
              <span className="bg-[#F5A623] text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span> 
              Select Target Audience
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {[
                { id: 'All Students', icon: Users, desc: 'Broadcast to everyone living in PG' },
                { id: 'Selected Students', icon: UserCheck, desc: 'Pick specific rooms or students' },
                { id: 'All Staff', icon: Users, desc: 'Broadcast to all employees' },
                { id: 'Managers', icon: UserCheck, desc: 'Send to branch managers only' },
                { id: 'Cooks', icon: UtensilsCrossed, desc: 'Send to kitchen staff only' },
              ].map(aud => {
                const Icon = aud.icon as any;
                return (
                  <label key={aud.id} className={`flex items-start gap-4 p-4 border rounded-2xl cursor-pointer transition-all ${formData.audience === aud.id ? 'border-[#F5A623] bg-[#F5A623]/5' : 'border-border hover:border-border'}`}>
                    <input 
                      type="radio" 
                      name="audience" 
                      className="mt-1 accent-[#F5A623]" 
                      checked={formData.audience === aud.id}
                      onChange={() => setFormData({...formData, audience: aud.id})}
                    />
                    <div>
                      <h4 className="font-bold text-primary flex items-center gap-2">
                        <Icon className="w-4 h-4 text-[var(--text-disabled)]" /> {aud.id}
                      </h4>
                      <p className="text-xs text-[var(--text-disabled)] mt-1">{aud.desc}</p>
                    </div>
                  </label>
                )
              })}
            </div>
            <div className="pt-4 border-t border-border/50 flex justify-between">
              <button 
                onClick={() => setViewState('create')}
                className="text-[var(--text-disabled)] font-bold px-4 py-2 hover:bg-page rounded-xl transition-colors"
              >
                Back
              </button>
              <button 
                onClick={() => setViewState('preview')}
                className="flex items-center gap-2 bg-[#1A3A5C] hover:bg-[#122a42] text-white px-6 py-2.5 rounded-xl font-bold transition-colors"
              >
                Next: Preview Notice <Eye className="w-4 h-4" />
              </button>
            </div>
          </div>
        );

      case 'preview':
        return (
          <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-sm animate-in fade-in slide-in-from-right-4 duration-300 max-w-2xl mx-auto">
            <h2 className="text-lg font-bold text-primary mb-6 flex items-center gap-2">
              <span className="bg-[#F5A623] text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">3</span> 
              Preview & Publish
            </h2>
            
            {/* The Mocked App Notification Look */}
            <div className="bg-[var(--bg-overlay)] p-6 rounded-2xl mb-8 flex justify-center">
              <div className="bg-card w-full max-w-sm rounded-2xl shadow-xl overflow-hidden border border-border">
                <div className="bg-[#1A3A5C] p-4 text-white">
                  <div className="flex items-center gap-2 mb-1">
                    <Megaphone className="w-4 h-4 text-[#F5A623]" />
                    <span className="text-xs font-bold uppercase tracking-wider">{formData.type}</span>
                  </div>
                  <h3 className="font-bold text-lg">{formData.title || 'Untitled Notice'}</h3>
                </div>
                <div className="p-4">
                  <p className="text-secondary text-sm whitespace-pre-wrap">{formData.content || 'Your message will appear here...'}</p>
                  <p className="text-xs text-gray-400 mt-4 text-right">Just now</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl mb-6">
              <h4 className="font-bold text-blue-800 text-sm mb-1">Publishing Details</h4>
              <p className="text-xs text-blue-600">This notice will be sent immediately to <strong>{formData.audience}</strong> via In-App Notification and Push Notification.</p>
            </div>

            <div className="pt-4 border-t border-border/50 flex justify-between">
              <button 
                onClick={() => setViewState('audience')}
                className="text-[var(--text-disabled)] font-bold px-4 py-2 hover:bg-page rounded-xl transition-colors"
              >
                Back
              </button>
              <button 
                onClick={() => {
                  alert('Notice Published Successfully!');
                  setViewState('list');
                }}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-xl font-bold transition-colors shadow-sm"
              >
                <Send className="w-4 h-4" /> Publish Now
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
            <Megaphone className="w-7 h-7 text-[#F5A623]" />
            Notices & Announcements
          </h1>
          <p className="text-[var(--text-disabled)] text-sm mt-1">Broadcast important information to students and staff.</p>
        </div>
        
        {viewState === 'list' ? (
          <button 
            onClick={() => {
              setFormData({ title: '', type: 'General announcement', content: '', audience: 'All Students' });
              setViewState('create');
            }}
            className="flex items-center justify-center gap-2 bg-[#F5A623] hover:bg-[#e09612] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-colors"
          >
            <Plus className="w-5 h-5" /> Create New Notice
          </button>
        ) : (
          <button 
            onClick={() => setViewState('list')}
            className="text-[var(--text-disabled)] hover:bg-[var(--bg-overlay)] px-4 py-2 rounded-xl font-bold text-sm transition-colors"
          >
            Cancel
          </button>
        )}
      </div>

      {renderContent()}
    </div>
  );
}
