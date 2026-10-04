'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Home, BedDouble, IndianRupee, AlertCircle, CalendarCheck, ShieldCheck,
  Utensils, Bell, FileText, TrendingUp, CheckCircle2, Clock, Users,
  Megaphone, Wrench, Upload, Phone, ChevronRight, Star, Activity,
  CalendarOff, MessageSquareWarning, AlertTriangle, X, MapPin,
  ArrowUpRight, BarChart3, Zap
} from 'lucide-react';

const QUICK_ACTIONS = [
  { label: 'Pay Fees', icon: IndianRupee, href: '/frontend_student/student_rent?action=pay', color: 'bg-success text-white border-success', glow: 'shadow-success/30' },
  { label: 'Request Leave', icon: CalendarOff, href: '/frontend_student/student_leaves?action=new', color: 'bg-primary text-white border-primary', glow: 'shadow-primary/30' },
  { label: 'Invite Visitor', icon: Users, href: '/frontend_student/student_visitors?action=new', color: 'bg-info text-white border-info', glow: 'shadow-info/30' },
  { label: 'Raise Complaint', icon: Wrench, href: '/frontend_student/student_complaints?action=new', color: 'bg-danger text-white border-danger', glow: 'shadow-danger/30' },
  { label: 'View Menu', icon: Utensils, href: '/frontend_student/student_mess', color: 'bg-warning text-white border-warning', glow: 'shadow-warning/30' },
  { label: 'View Notice', icon: Megaphone, href: '/frontend_student/student_notices', color: 'bg-purple-500 text-white border-purple-500', glow: 'shadow-purple-500/30' },
  { label: 'Upload Doc', icon: Upload, href: '/frontend_student/student_documents?action=upload', color: 'bg-teal-500 text-white border-teal-500', glow: 'shadow-teal-500/30' },
  { label: 'Contact Manager', icon: Phone, href: '/frontend_student/student_support', color: 'bg-orange-500 text-white border-orange-500', glow: 'shadow-orange-500/30' },
];

interface Alert {
  id: string;
  type: 'danger' | 'warning' | 'success' | 'info' | 'primary';
  icon: React.ElementType;
  title: string;
  message: string;
  href: string;
  time: string;
}

const ALERTS: Alert[] = [
  { id: '1', type: 'danger', icon: IndianRupee, title: 'Fee Due', message: 'Monthly rent of ₹8,000 is due on 05 Oct. Pay now to avoid late fine.', href: '/frontend_student/student_rent?action=pay', time: '2h ago' },
  { id: '2', type: 'success', icon: CalendarOff, title: 'Leave Approved', message: 'Your leave request for 10 Oct – 15 Oct has been approved by Manager.', href: '/frontend_student/student_leaves?view=approved', time: 'Today' },
  { id: '3', type: 'info', icon: Users, title: 'Visitor Approved', message: 'Visitor pass for Ramesh Sharma approved for Tomorrow, 4:00 PM.', href: '/frontend_student/student_visitors?view=approved', time: 'Today' },
  { id: '4', type: 'warning', icon: Wrench, title: 'Complaint Updated', message: 'Your complaint CMP-2041 (Fan issue) is now In Progress. Technician assigned.', href: '/frontend_student/student_complaints', time: '3h ago' },
  { id: '5', type: 'primary', icon: Megaphone, title: 'New Notice', message: 'Diwali celebration on 24 Oct. Attendance compulsory for all residents.', href: '/frontend_student/student_notices', time: 'Yesterday' },
];

const getAlertStyle = (type: string) => {
  switch (type) {
    case 'danger': return { bar: 'bg-danger', bg: 'bg-danger/5 border-danger/20', icon: 'text-danger bg-danger/10', badge: 'bg-danger text-white' };
    case 'warning': return { bar: 'bg-warning', bg: 'bg-warning/5 border-warning/20', icon: 'text-warning bg-warning/10', badge: 'bg-warning text-white' };
    case 'success': return { bar: 'bg-success', bg: 'bg-success/5 border-success/20', icon: 'text-success bg-success/10', badge: 'bg-success text-white' };
    case 'info': return { bar: 'bg-info', bg: 'bg-info/5 border-info/20', icon: 'text-info bg-info/10', badge: 'bg-info text-white' };
    default: return { bar: 'bg-primary', bg: 'bg-primary/5 border-primary/20', icon: 'text-primary bg-primary/10', badge: 'bg-primary text-white' };
  }
};

const TODAY_STATUS = [
  { label: 'Attendance', value: 'Present ✓', color: 'text-success bg-success/10 border-success/20', href: '/frontend_student/student_attendance' },
  { label: 'Fee Due', value: '₹8,000 Overdue', color: 'text-danger bg-danger/10 border-danger/20', href: '/frontend_student/student_rent' },
  { label: 'Active Leave', value: 'None', color: 'text-secondary bg-input border-border', href: '/frontend_student/student_leaves' },
  { label: 'Visitor Today', value: '1 Approved', color: 'text-info bg-info/10 border-info/20', href: '/frontend_student/student_visitors?view=approved' },
  { label: 'Open Complaints', value: '1 In Progress', color: 'text-warning bg-warning/10 border-warning/20', href: '/frontend_student/student_complaints' },
  { label: 'Unread Notices', value: '2 New', color: 'text-primary bg-primary/10 border-primary/20', href: '/frontend_student/student_notices' },
];

export function StudentDashboardMain() {
  const router = useRouter();
  const [dismissedAlerts, setDismissedAlerts] = useState<string[]>([]);

  const visibleAlerts = ALERTS.filter(a => !dismissedAlerts.includes(a.id));

  const dismissAlert = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setDismissedAlerts(prev => [...prev, id]);
  };

  return (
    <div className="w-full pb-12 animate-in fade-in duration-300 space-y-6">

      {/* Welcome Hero Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary via-primary/90 to-info/80 rounded-2xl p-6 md:p-8 text-white shadow-xl">
        <div className="absolute -top-12 -right-12 w-56 h-56 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-10 right-32 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute top-0 left-1/2 w-80 h-80 bg-info/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <p className="text-white/70 text-sm font-medium mb-1 flex items-center gap-2">
              <Zap className="w-4 h-4" /> Welcome back 👋
            </p>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight">Rahul Sharma</h1>
            <p className="text-white/80 text-sm mt-1.5 font-medium">
              Student ID: STU-2024-1045 &nbsp;•&nbsp; Room 204, Bed B &nbsp;•&nbsp; Green Valley PG
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full">🏠 Active Resident</span>
              <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full">📅 Day 47 of Stay</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3 shrink-0">
            {[
              { label: 'Attendance', value: '92%', sub: 'This Month', good: true },
              { label: 'Fees', value: 'Due', sub: '₹8,000 Pending', good: false },
              { label: 'Deposit', value: '₹10K', sub: 'Secured', good: true },
            ].map(stat => (
              <div key={stat.label} className={`bg-white/20 backdrop-blur-sm rounded-2xl px-5 py-3 text-center border ${stat.good ? 'border-white/20' : 'border-red-400/40 bg-red-500/20'}`}>
                <p className="text-xl md:text-2xl font-black">{stat.value}</p>
                <p className="text-[10px] text-white/70 font-bold uppercase tracking-wider">{stat.label}</p>
                <p className="text-[10px] text-white/60 mt-0.5">{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Info Cards — 7 cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
        {[
          { label: 'My Room', value: 'Room 204', icon: Home, color: 'text-primary', bg: 'bg-primary/10', href: '/frontend_student/student_room' },
          { label: 'My Bed', value: 'Bed B', icon: BedDouble, color: 'text-info', bg: 'bg-info/10', href: '/frontend_student/student_room' },
          { label: 'Monthly Rent', value: '₹8,000', icon: IndianRupee, color: 'text-success', bg: 'bg-success/10', href: '/frontend_student/student_rent' },
          { label: 'Due Amount', value: '₹8,000', icon: AlertCircle, color: 'text-danger', bg: 'bg-danger/10', href: '/frontend_student/student_rent?action=pay' },
          { label: 'Due Date', value: '05 Oct', icon: Clock, color: 'text-warning', bg: 'bg-warning/10', href: '/frontend_student/student_rent' },
          { label: 'Security Dep.', value: '₹10,000', icon: ShieldCheck, color: 'text-teal-500', bg: 'bg-teal-500/10', href: '/frontend_student/student_security_deposit' },
          { label: 'Attendance', value: '92%', icon: BarChart3, color: 'text-purple-500', bg: 'bg-purple-500/10', href: '/frontend_student/student_attendance' },
        ].map((card) => {
          const Icon = card.icon;
          return (
            <button
              key={card.label}
              onClick={() => router.push(card.href)}
              className="bg-card border border-border rounded-2xl p-4 shadow-sm hover:shadow-lg hover:scale-105 transition-all text-left group cursor-pointer"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${card.bg} group-hover:scale-110 transition-transform`}>
                <Icon className={`w-5 h-5 ${card.color}`} />
              </div>
              <p className="text-base md:text-lg font-black text-primary truncate">{card.value}</p>
              <p className="text-xs text-secondary font-medium mt-0.5 truncate">{card.label}</p>
              <ArrowUpRight className="w-3.5 h-3.5 text-secondary/40 mt-1 group-hover:text-primary transition-colors" />
            </button>
          );
        })}
      </div>

      {/* Middle Row: Today's Meal + Today Status + Attendance */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

        {/* Today's Meal */}
        <div className="bg-card border border-border rounded-2xl p-5 shadow-sm flex flex-col">
          <h3 className="font-black text-primary flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-warning/10 flex items-center justify-center">
              <Utensils className="w-4 h-4 text-warning" />
            </div>
            {"Today's Meal"}
          </h3>
          <div className="space-y-3 flex-1">
            {[
              { meal: 'Breakfast', time: '08:00 AM', status: 'done', menu: 'Poha + Tea', color: 'bg-warning/10 border-warning/20' },
              { meal: 'Lunch', time: '01:00 PM', status: 'done', menu: 'Dal + Rice + Sabzi', color: 'bg-success/10 border-success/20' },
              { meal: 'Dinner', time: '08:30 PM', status: 'pending', menu: 'Roti + Paneer + Salad', color: 'bg-input/60 border-border' },
            ].map((item) => (
              <div key={item.meal} className={`flex items-center justify-between p-3 rounded-xl border ${item.color}`}>
                <div>
                  <p className="text-sm font-black text-primary">
                    {item.meal}
                    <span className="font-medium text-secondary text-xs ml-1">• {item.time}</span>
                  </p>
                  <p className="text-xs text-secondary font-medium mt-0.5">{item.menu}</p>
                </div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${item.status === 'done' ? 'bg-success text-white' : 'bg-warning/20 text-warning'}`}>
                  {item.status === 'done'
                    ? <CheckCircle2 className="w-4 h-4" />
                    : <Clock className="w-4 h-4" />
                  }
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => router.push('/frontend_student/student_mess')} className="w-full mt-4 text-center text-xs font-bold text-primary hover:underline flex items-center justify-center gap-1 group">
            Full Weekly Menu <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Today's Status */}
        <div className="bg-card border border-border rounded-2xl p-5 shadow-sm flex flex-col">
          <h3 className="font-black text-primary flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Activity className="w-4 h-4 text-primary" />
            </div>
            {"Today's Status"}
          </h3>
          <div className="space-y-2.5 flex-1">
            {TODAY_STATUS.map((item) => (
              <button
                key={item.label}
                onClick={() => router.push(item.href)}
                className="w-full flex items-center justify-between hover:bg-input/30 rounded-xl px-2 py-1.5 transition-colors group"
              >
                <span className="text-sm text-secondary font-medium">{item.label}</span>
                <span className={`text-xs font-black px-2.5 py-1 rounded-lg border flex items-center gap-1 ${item.color}`}>
                  {item.value}
                  <ChevronRight className="w-3 h-3 opacity-60 group-hover:opacity-100" />
                </span>
              </button>
            ))}
          </div>
          <button onClick={() => router.push('/frontend_student/student_history')} className="w-full mt-4 text-center text-xs font-bold text-primary hover:underline flex items-center justify-center gap-1 group">
            My Full Activity <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Attendance Visual */}
        <div className="bg-card border border-border rounded-2xl p-5 shadow-sm flex flex-col">
          <h3 className="font-black text-primary flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <CalendarCheck className="w-4 h-4 text-purple-500" />
            </div>
            Attendance — Oct
          </h3>
          
          {/* Circular Progress */}
          <div className="flex items-center justify-center mb-5">
            <div className="relative w-28 h-28">
              <svg className="w-28 h-28 -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" className="text-border" strokeWidth="10" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" className="text-success" strokeWidth="10"
                  strokeDasharray={`${92 * 2.51} ${(100 - 92) * 2.51}`} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-black text-primary">92%</span>
                <span className="text-[10px] font-bold text-secondary">Attendance</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 flex-1">
            {[
              { label: 'Present', value: 28, color: 'text-success bg-success/10' },
              { label: 'Absent', value: 1, color: 'text-danger bg-danger/10' },
              { label: 'Leave', value: 1, color: 'text-info bg-info/10' },
              { label: 'Late', value: 0, color: 'text-warning bg-warning/10' },
            ].map(stat => (
              <div key={stat.label} className={`flex flex-col items-center p-3 rounded-xl ${stat.color}`}>
                <span className="text-xl font-black">{stat.value}</span>
                <span className="text-[10px] font-bold opacity-80 mt-0.5">{stat.label}</span>
              </div>
            ))}
          </div>
          
          <button onClick={() => router.push('/frontend_student/student_attendance')} className="w-full mt-4 text-center text-xs font-bold text-primary hover:underline flex items-center justify-center gap-1 group">
            Full Attendance <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-card border border-border rounded-2xl p-5 md:p-6 shadow-sm">
        <h3 className="font-black text-primary mb-5 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Zap className="w-4 h-4 text-primary" />
          </div>
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3">
          {QUICK_ACTIONS.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.label}
                onClick={() => router.push(action.href)}
                className={`flex flex-col items-center justify-center gap-2.5 p-4 rounded-2xl border transition-all hover:scale-105 hover:shadow-lg font-bold text-xs ${action.color} shadow-sm`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-center leading-tight">{action.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Dashboard Alerts */}
      {visibleAlerts.length > 0 && (
        <div className="bg-card border border-border rounded-2xl p-5 md:p-6 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-black text-primary flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-danger/10 flex items-center justify-center">
                <Bell className="w-4 h-4 text-danger" />
              </div>
              Dashboard Alerts
              <span className="ml-1 text-xs font-black bg-danger text-white px-2 py-0.5 rounded-full">{visibleAlerts.length}</span>
            </h3>
            <button
              onClick={() => router.push('/frontend_student/student_notifications')}
              className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
            >
              All Notifications <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="space-y-3">
            {visibleAlerts.map(alert => {
              const style = getAlertStyle(alert.type);
              const Icon = alert.icon;
              return (
                <div
                  key={alert.id}
                  onClick={() => router.push(alert.href)}
                  className={`relative flex items-start gap-4 p-4 rounded-2xl border cursor-pointer hover:shadow-sm transition-all overflow-hidden group ${style.bg}`}
                >
                  {/* Left color bar */}
                  <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl ${style.bar}`}></div>
                  
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ml-1 ${style.icon}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider ${style.badge}`}>{alert.title}</span>
                      <span className="text-[10px] font-medium text-secondary/70">{alert.time}</span>
                    </div>
                    <p className="text-xs font-medium text-primary/90 leading-relaxed">{alert.message}</p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <ArrowUpRight className="w-4 h-4 text-secondary/40 group-hover:text-primary transition-colors" />
                    <button
                      onClick={(e) => dismissAlert(alert.id, e)}
                      className="w-6 h-6 rounded-full flex items-center justify-center text-secondary/40 hover:text-danger hover:bg-danger/10 transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Bottom Row: Leave Status + Visitors + Open Complaints */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        {/* Active Leave Status */}
        <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
          <h3 className="font-black text-primary flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-warning/10 flex items-center justify-center">
              <CalendarOff className="w-4 h-4 text-warning" />
            </div>
            Leave Status
          </h3>
          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-success/5 border border-success/20">
              <p className="text-xs font-bold text-success">Upcoming Leave Approved</p>
              <p className="text-sm font-black text-primary mt-1">10 Oct – 15 Oct 2026</p>
              <p className="text-xs text-secondary mt-0.5">Diwali festival at home • Patna, Bihar</p>
            </div>
            <div className="p-3 rounded-xl bg-info/5 border border-info/20">
              <p className="text-xs font-bold text-info">Outing Active</p>
              <p className="text-sm font-black text-primary mt-1">Today, 6:00 PM – 9:00 PM</p>
              <p className="text-xs text-secondary mt-0.5">Movie with friends • PVR Cinemas</p>
            </div>
          </div>
          <button onClick={() => router.push('/frontend_student/student_leaves')} className="w-full mt-4 text-center text-xs font-bold text-primary hover:underline flex items-center justify-center gap-1">
            All Requests <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Today's Visitors */}
        <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
          <h3 className="font-black text-primary flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-info/10 flex items-center justify-center">
              <Users className="w-4 h-4 text-info" />
            </div>
            {"Today's Visitor"}
          </h3>
          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-success/5 border border-success/20">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-black text-primary">Ramesh Sharma</p>
                  <p className="text-xs text-secondary font-medium">Father • 4:00 PM – 7:00 PM</p>
                </div>
                <span className="text-[10px] font-black bg-success text-white px-2 py-1 rounded-md">Approved</span>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-input/30 border border-border flex items-center justify-center">
              <p className="text-xs text-secondary font-medium text-center">No other visitors today</p>
            </div>
          </div>
          <button onClick={() => router.push('/frontend_student/student_visitors?action=new')} className="w-full mt-4 text-xs font-bold text-primary hover:underline flex items-center justify-center gap-1">
            + Invite Visitor <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Open Complaints */}
        <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
          <h3 className="font-black text-primary flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-danger/10 flex items-center justify-center">
              <MessageSquareWarning className="w-4 h-4 text-danger" />
            </div>
            Open Complaints
          </h3>
          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-warning/5 border border-warning/20">
              <div className="flex items-start justify-between mb-1">
                <p className="text-xs font-bold text-warning">CMP-2041 • Electrical</p>
                <span className="text-[10px] font-black bg-info/10 text-info border border-info/20 px-2 py-0.5 rounded">In Progress</span>
              </div>
              <p className="text-sm font-bold text-primary">Fan making noise, Room 204</p>
              <p className="text-xs text-secondary mt-0.5">Ramesh (Electrician) assigned</p>
            </div>
            <div className="p-3 rounded-xl bg-info/5 border border-info/20">
              <div className="flex items-start justify-between mb-1">
                <p className="text-xs font-bold text-info">CMP-2038 • Water</p>
                <span className="text-[10px] font-black bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded">Assigned</span>
              </div>
              <p className="text-sm font-bold text-primary">No hot water in morning</p>
              <p className="text-xs text-secondary mt-0.5">Suresh (Plumber) assigned</p>
            </div>
          </div>
          <button onClick={() => router.push('/frontend_student/student_complaints')} className="w-full mt-4 text-center text-xs font-bold text-primary hover:underline flex items-center justify-center gap-1">
            All Complaints <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    </div>
  );
}
