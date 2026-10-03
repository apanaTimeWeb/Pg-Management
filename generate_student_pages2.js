const fs = require('fs');
const path = require('path');

const studentPages = [
  { path: 'src/app/frontend_student/frontend_student_complaints/page.tsx', title: 'My Complaints', icon: 'MessageSquareWarning', desc: 'Raise maintenance tickets and track issues.' },
  { path: 'src/app/frontend_student/frontend_student_mess/page.tsx', title: 'Mess & Food', icon: 'Utensils', desc: 'Check the weekly food menu and meal timings.' },
  { path: 'src/app/frontend_student/frontend_student_visitors/page.tsx', title: 'My Visitors', icon: 'Users', desc: 'Register guests and track visitor history.' },
  { path: 'src/app/frontend_student/frontend_student_leaves/page.tsx', title: 'Leaves & Outing', icon: 'CalendarOff', desc: 'Apply for leaves and night outs.' },
  { path: 'src/app/frontend_student/frontend_student_attendance/page.tsx', title: 'My Attendance', icon: 'CheckSquare', desc: 'View your daily attendance records.' },
  { path: 'src/app/frontend_student/frontend_student_communication/page.tsx', title: 'Notices', icon: 'MessageCircle', desc: 'Important announcements from PG management.' },
  { path: 'src/app/frontend_student/frontend_student_settings/page.tsx', title: 'Settings', icon: 'Settings', desc: 'App preferences and security settings.' },
];

const generateStudentTemplate = (title, icon, desc) => {
  let mainContent = '';
  
  if (title === 'My Complaints') {
    mainContent = `
              <div className="space-y-4">
                {[
                  { id: 'TKT-101', issue: 'AC Not Cooling', status: 'Pending', date: '02 Oct 2026' },
                  { id: 'TKT-102', issue: 'Tap Leaking', status: 'Resolved', date: '28 Sep 2026' }
                ].map((ticket, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-page rounded-xl border border-border">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-card rounded-lg border border-border"><MessageSquareWarning className="w-5 h-5 text-red-500"/></div>
                      <div>
                        <p className="font-bold text-primary text-sm">{ticket.issue}</p>
                        <p className="text-xs text-secondary mt-0.5">{ticket.id} • {ticket.date}</p>
                      </div>
                    </div>
                    <div>
                      <span className={\`text-[10px] font-bold px-2 py-0.5 rounded inline-block uppercase \${ticket.status === 'Resolved' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}\`}>{ticket.status}</span>
                    </div>
                  </div>
                ))}
              </div>
    `;
  } else if (title === 'Mess & Food') {
    mainContent = `
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl mb-4 text-center">
                  <h3 className="font-bold text-blue-800 text-lg">Today's Special</h3>
                  <p className="text-blue-600 font-medium">Paneer Butter Masala & Naan</p>
                </div>
                {['Breakfast (8:00 AM)', 'Lunch (1:00 PM)', 'Dinner (8:30 PM)'].map((meal, i) => (
                  <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-page rounded-xl border border-border">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-card rounded-lg border border-border"><Utensils className="w-5 h-5 text-secondary"/></div>
                      <p className="font-bold text-primary text-sm">{meal}</p>
                    </div>
                    <button className="mt-2 sm:mt-0 text-sm font-semibold text-blue-600 hover:underline">View Menu</button>
                  </div>
                ))}
              </div>
    `;
  } else if (title === 'Leaves & Outing') {
    mainContent = `
              <div className="space-y-4">
                {[
                  { reason: 'Going Home', date: '10 Oct 2026 - 15 Oct 2026', status: 'Approved' },
                  { reason: 'Night Out with friends', date: '04 Oct 2026', status: 'Pending' }
                ].map((leave, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-page rounded-xl border border-border">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-card rounded-lg border border-border"><CalendarOff className="w-5 h-5 text-secondary"/></div>
                      <div>
                        <p className="font-bold text-primary text-sm">{leave.reason}</p>
                        <p className="text-xs text-secondary mt-0.5">{leave.date}</p>
                      </div>
                    </div>
                    <div>
                      <span className={\`text-[10px] font-bold px-2 py-0.5 rounded inline-block uppercase \${leave.status === 'Approved' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}\`}>{leave.status}</span>
                    </div>
                  </div>
                ))}
              </div>
    `;
  } else {
    // Generic empty state for settings, visitors, etc
    mainContent = `
              <div className="text-center py-10">
                <div className="w-16 h-16 bg-page rounded-full flex items-center justify-center mx-auto mb-4 border border-border">
                  <${icon} className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-lg font-bold text-primary">No Records Found</h3>
                <p className="text-secondary text-sm mt-1 max-w-sm mx-auto">There are currently no active records for ${title.toLowerCase()}. Use the button above to add a new record.</p>
              </div>
    `;
  }

  let buttonHtml = '';
  if (title === 'My Complaints') {
    buttonHtml = `
            <button className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5">
              <MessageSquareWarning className="w-4 h-4" /> Raise Ticket
            </button>
    `;
  } else if (title === 'Leaves & Outing') {
    buttonHtml = `
            <button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5">
              <Plus className="w-4 h-4" /> Apply Leave
            </button>
    `;
  } else {
    buttonHtml = `
            <button className="flex items-center gap-2 bg-card hover:bg-page border border-border text-primary px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-colors">
              <Edit3 className="w-4 h-4" /> Options
            </button>
    `;
  }

  return `'use client';

import React from 'react';
import { 
  ${icon}, Download, Edit3, Plus, Search, Info, MessageSquareWarning, CalendarOff, Utensils, AlertCircle, CheckCircle2
} from 'lucide-react';

export default function Student${title.replace(/[^a-zA-Z0-9]/g, '')}Page() {
  
  return (
    <div className="p-4 md:p-8 space-y-6 animate-in fade-in duration-500 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-card p-6 rounded-2xl shadow-sm border border-border/50">
        <div>
          <h1 className="text-2xl font-black text-primary flex items-center gap-3">
            <div className="p-2.5 bg-blue-100 rounded-xl text-blue-600">
              <${icon} className="w-6 h-6"/>
            </div>
            ${title}
          </h1>
          <p className="text-[var(--text-disabled)] text-sm mt-2 font-medium">${desc}</p>
        </div>
        
        <div className="flex items-center gap-3">
          ${buttonHtml}
        </div>
      </div>

      {/* Dynamic Content Based on Page */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Main Info Card */}
        <div className="md:col-span-8 bg-card rounded-2xl shadow-sm border border-border/50 overflow-hidden">
          <div className="p-6 border-b border-border/50 bg-page/30 flex items-center justify-between">
            <h3 className="font-bold text-primary flex items-center gap-2">
              <Info className="w-5 h-5 text-blue-500"/>
              ${title} Overview
            </h3>
          </div>
          <div className="p-6">
            ${mainContent}
          </div>
        </div>

        {/* Sidebar Card */}
        <div className="md:col-span-4 bg-gradient-to-br from-[#1A3A5C] to-[#122a42] rounded-2xl shadow-lg border border-blue-800 p-6 text-white h-max">
          <h3 className="font-bold mb-4 flex items-center gap-2 opacity-90"><AlertCircle className="w-5 h-5"/> Notice Board</h3>
          <div className="space-y-4">
            <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/5">
              <p className="text-xs uppercase font-bold text-blue-200 mb-1">Upcoming Event</p>
              <h3 className="text-sm font-bold">Diwali Celebration</h3>
              <p className="text-xs text-blue-200 mt-1">Check the mess menu for special dinner details.</p>
            </div>
            <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/5">
              <p className="text-xs uppercase font-bold text-blue-200 mb-1">Rules Reminder</p>
              <p className="text-xs text-blue-200">Main gate closes at 10:30 PM. Please apply for a night out if you will be late.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
`;
}

studentPages.forEach(page => {
  const absolutePath = path.join(__dirname, page.path);
  const dirPath = path.dirname(absolutePath);
  
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  fs.writeFileSync(absolutePath, generateStudentTemplate(page.title, page.icon, page.desc), 'utf8');
});
