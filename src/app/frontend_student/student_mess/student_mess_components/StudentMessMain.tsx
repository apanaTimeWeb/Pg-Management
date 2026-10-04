'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Utensils, CheckCircle2, Clock, Camera, X, Send, AlertCircle, Calendar,
  Star, BarChart3
} from 'lucide-react';
import { toast } from 'sonner';
import { useStudentMess } from '../student_mess_hooks/useStudentMess';

export function StudentMessMain() {
  const searchParams = useSearchParams();
  const viewParam = searchParams.get('view');
  const initialTab = viewParam === 'attendance' ? 'attendance' : viewParam === 'count' ? 'count' : (viewParam === 'complaints' || viewParam === 'complaint') ? 'complaint' : 'menu';
  const initialMenuView = viewParam === 'weekly' ? 'weekly' : 'today';
  const [activeTab, setActiveTab] = useState<'menu' | 'attendance' | 'count' | 'complaint'>(initialTab);
  const [menuView, setMenuView] = useState<'today' | 'weekly'>(initialMenuView);
  const [complaintCategory, setComplaintCategory] = useState('');
  const [complaintDesc, setComplaintDesc] = useState('');
  const [complaintSubmitted, setComplaintSubmitted] = useState(false);

  const { loading, todaysMenu, weeklyMenu, mealAttendance } = useStudentMess();

  const handleComplaintSubmit = () => {
    if (!complaintCategory || !complaintDesc.trim()) { toast.error('Please fill all fields'); return; }
    setComplaintSubmitted(true);
    toast.success('Food complaint submitted!');
  };

  if (loading) {
    return <div className="p-8 text-center text-secondary">Loading mess details...</div>;
  }

  const totalBreakfast = mealAttendance.filter(d => d.breakfast).length;
  const totalLunch = mealAttendance.filter(d => d.lunch).length;
  const totalDinner = mealAttendance.filter(d => d.dinner).length;



  return (
    <div className="w-full pb-12 animate-in fade-in duration-300">
      
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-black text-primary flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-warning/10 flex items-center justify-center">
            <Utensils className="w-6 h-6 text-warning" />
          </div>
          Mess & Food
        </h1>
        <p className="text-sm text-secondary mt-2 font-medium">View today's menu, track meals, and report food complaints.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto hide-scrollbar mb-6 bg-card border border-border rounded-xl p-1.5 w-fit max-w-full">
        {[
          { id: 'menu', label: "Menu" },
          { id: 'attendance', label: 'Meal Attendance' },
          { id: 'count', label: 'My Meal Count' },
          { id: 'complaint', label: 'Food Complaint' },
        ].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id as any)} className={`px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-all ${activeTab === tab.id ? 'bg-primary text-white shadow-md' : 'text-secondary hover:text-primary'}`}>
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'menu' && (
        <div className="space-y-6">
          <div className="flex gap-2">
            <button onClick={() => setMenuView('today')} className={`px-4 py-2 rounded-xl text-sm font-bold border transition-all ${menuView === 'today' ? 'bg-warning text-white border-warning shadow-md' : 'bg-card text-secondary border-border hover:border-warning/40'}`}>Today</button>
            <button onClick={() => setMenuView('weekly')} className={`px-4 py-2 rounded-xl text-sm font-bold border transition-all ${menuView === 'weekly' ? 'bg-warning text-white border-warning shadow-md' : 'bg-card text-secondary border-border hover:border-warning/40'}`}>Weekly</button>
          </div>

          {menuView === 'today' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {todaysMenu.map((m, i) => {
                const colors = ['bg-warning/10 border-warning/20 text-warning', 'bg-success/10 border-success/20 text-success', 'bg-primary/10 border-primary/20 text-primary'];
                return (
                  <div key={m.meal} className={`rounded-2xl border p-5 shadow-sm ${colors[i]}`}>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-black text-base">{m.meal}</h3>
                      <span className="text-xs font-bold opacity-70 bg-white/30 px-2 py-0.5 rounded">{m.time}</span>
                    </div>
                    <p className="text-sm font-medium opacity-90 leading-relaxed">{m.items}</p>
                  </div>
                );
              })}
            </div>
          )}

          {menuView === 'weekly' && (
            <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-input/30 border-b border-border">
                      <th className="py-3 px-4 text-xs font-black text-secondary uppercase">Day</th>
                      <th className="py-3 px-4 text-xs font-black text-warning uppercase">Breakfast</th>
                      <th className="py-3 px-4 text-xs font-black text-success uppercase">Lunch</th>
                      <th className="py-3 px-4 text-xs font-black text-primary uppercase">Dinner</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {weeklyMenu.map(row => (
                      <tr key={row.day} className="hover:bg-input/50 transition-colors">
                        <td className="py-3 px-4 font-black text-primary">{row.day}</td>
                        <td className="py-3 px-4 text-sm font-medium text-secondary">{row.breakfast}</td>
                        <td className="py-3 px-4 text-sm font-medium text-secondary">{row.lunch}</td>
                        <td className="py-3 px-4 text-sm font-medium text-secondary">{row.dinner}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'attendance' && (
        <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
          <div className="p-5 border-b border-border">
            <h3 className="font-black text-primary">My Meal Attendance</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-input/30 border-b border-border">
                  <th className="py-3 px-5 text-xs font-black text-secondary uppercase">Date</th>
                  <th className="py-3 px-5 text-xs font-black text-warning uppercase">Breakfast</th>
                  <th className="py-3 px-5 text-xs font-black text-success uppercase">Lunch</th>
                  <th className="py-3 px-5 text-xs font-black text-primary uppercase">Dinner</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {mealAttendance.map(row => (
                  <tr key={row.date} className="hover:bg-input/50 transition-colors">
                    <td className="py-4 px-5 font-black text-primary text-sm">{row.date}</td>
                    {[row.breakfast, row.lunch, row.dinner].map((v, idx) => (
                      <td key={idx} className="py-4 px-5">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center ${v ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}`}>
                          {v ? <CheckCircle2 className="w-4 h-4" /> : <X className="w-4 h-4" />}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'count' && (
        <div className="space-y-4">
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
            <h3 className="font-black text-primary flex items-center gap-2 mb-6">
              <BarChart3 className="w-5 h-5 text-primary" /> My Meal Count – October 2026
            </h3>
            <div className="grid grid-cols-3 gap-5">
              {[
                { meal: 'Breakfast', count: totalBreakfast, total: mealAttendance.length, color: 'bg-warning' },
                { meal: 'Lunch', count: totalLunch, total: mealAttendance.length, color: 'bg-success' },
                { meal: 'Dinner', count: totalDinner, total: mealAttendance.length, color: 'bg-primary' },
              ].map(item => (
                <div key={item.meal} className="text-center">
                  <div className="w-20 h-20 rounded-full border-4 border-border flex items-center justify-center mx-auto mb-3 relative">
                    <span className="text-2xl font-black text-primary">{item.count}</span>
                  </div>
                  <p className="font-black text-primary">{item.meal}</p>
                  <p className="text-xs text-secondary font-medium mt-1">{item.count} / {item.total} days</p>
                  <div className="w-full h-2 bg-input rounded-full mt-2 overflow-hidden">
                    <div className={`h-full rounded-full ${item.color}`} style={{ width: `${(item.count / item.total) * 100}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-secondary mt-6 bg-input/30 border border-border rounded-lg p-3 text-center">
              This shows your personal meal count only. Manager sees overall PG count separately.
            </p>
          </div>
        </div>
      )}

      {activeTab === 'complaint' && (
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
          {complaintSubmitted ? (
            <div className="flex flex-col items-center text-center py-10">
              <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-8 h-8 text-success" />
              </div>
              <h3 className="text-lg font-black text-primary mb-2">Complaint Submitted!</h3>
              <p className="text-sm text-secondary mb-6">Manager and kitchen staff will review your complaint.</p>
              <button onClick={() => { setComplaintSubmitted(false); setComplaintCategory(''); setComplaintDesc(''); }} className="bg-primary text-white font-bold text-sm px-6 py-2 rounded-xl">New Complaint</button>
            </div>
          ) : (
            <div className="space-y-5">
              <h3 className="font-black text-primary flex items-center gap-2"><AlertCircle className="w-5 h-5 text-danger" /> Report Food Issue</h3>
              <div>
                <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">Category</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {['Quality', 'Taste', 'Quantity', 'Hygiene', 'Menu Issue', 'Timing', 'Other'].map(cat => (
                    <button key={cat} onClick={() => setComplaintCategory(cat)} className={`py-2 px-3 rounded-lg text-xs font-bold border transition-all ${complaintCategory === cat ? 'bg-danger text-white border-danger shadow-md' : 'bg-card text-secondary border-border hover:border-danger/40 hover:text-danger'}`}>{cat}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">Description</label>
                <textarea rows={4} placeholder="Describe the issue in detail..." value={complaintDesc} onChange={(e) => setComplaintDesc(e.target.value)} className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-primary shadow-sm resize-none"></textarea>
              </div>
              <div>
                <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">Photo (Optional)</label>
                <div className="w-full border-2 border-dashed border-border rounded-xl p-5 flex items-center justify-center gap-3 text-secondary hover:bg-input hover:border-primary/50 transition-colors cursor-pointer bg-input/30">
                  <Camera className="w-5 h-5" />
                  <span className="text-sm font-bold">Upload Photo</span>
                </div>
              </div>
              <button onClick={handleComplaintSubmit} className="w-full bg-danger text-white font-bold text-sm py-3 rounded-xl shadow-md hover:bg-danger/90 transition-colors flex items-center justify-center gap-2">
                <Send className="w-4 h-4" /> Submit Complaint
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
