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

import { useStudentDashboard } from '../student_dashboard_hooks/useStudentDashboard';

const getAlertStyle = (type: string) => {
  switch (type) {
    case 'danger': return { bar: 'bg-danger', bg: 'bg-danger/5 border-danger/20', icon: 'text-danger bg-danger/10', badge: 'bg-danger text-white' };
    case 'warning': return { bar: 'bg-warning', bg: 'bg-warning/5 border-warning/20', icon: 'text-warning bg-warning/10', badge: 'bg-warning text-white' };
    case 'success': return { bar: 'bg-success', bg: 'bg-success/5 border-success/20', icon: 'text-success bg-success/10', badge: 'bg-success text-white' };
    case 'info': return { bar: 'bg-info', bg: 'bg-info/5 border-info/20', icon: 'text-info bg-info/10', badge: 'bg-info text-white' };
    default: return { bar: 'bg-primary', bg: 'bg-primary/5 border-primary/20', icon: 'text-primary bg-primary/10', badge: 'bg-primary text-white' };
  }
};


export function StudentDashboardMain() {
  const router = useRouter();
  const { profile, loading, menu, notices, invoices, complaints, leaves, visitors, deposit } = useStudentDashboard();
  const [dismissedAlerts, setDismissedAlerts] = useState<string[]>([]);

  if (loading) return <div className="p-8 text-center text-secondary">Loading dashboard...</div>;
  if (!profile) return <div className="p-8 text-center text-secondary">Profile not found.</div>;

  const dueInvoices = invoices.filter(i => i.status === 'Pending' || i.status === 'Overdue');
  const totalDue = dueInvoices.reduce((acc, curr) => acc + curr.amount, 0);

  const openComplaints = complaints.filter(c => c.status !== 'Resolved' && c.status !== 'Closed');
  const activeLeaves = leaves.filter(l => l.status === 'Approved' && new Date(l.endDate) >= new Date());
  
  const todayStr = new Date().toISOString().split('T')[0];
  const todayVisitors = visitors.filter(v => v.date === todayStr);

  const ALERTS = [];
  if (dueInvoices.length > 0) {
    ALERTS.push({ id: 'alert_fee', type: 'danger', icon: IndianRupee, title: 'Fee Due', message: `₹${totalDue.toLocaleString()} is pending. Pay now to avoid fine.`, href: '/frontend_student/student_rent?action=pay', time: 'Action Required' });
  }
  if (activeLeaves.length > 0) {
    ALERTS.push({ id: 'alert_leave', type: 'success', icon: CalendarOff, title: 'Leave Approved', message: `Leave approved from ${activeLeaves[0].startDate}.`, href: '/frontend_student/student_leaves?view=approved', time: 'Upcoming' });
  }
  if (todayVisitors.length > 0) {
    ALERTS.push({ id: 'alert_visitor', type: 'info', icon: Users, title: 'Visitor Today', message: `Visitor ${todayVisitors[0].name} expected today.`, href: '/frontend_student/student_visitors?view=approved', time: 'Today' });
  }
  if (openComplaints.length > 0) {
    ALERTS.push({ id: 'alert_cmp', type: 'warning', icon: Wrench, title: 'Open Complaint', message: `Complaint ${openComplaints[0].title} is ${openComplaints[0].status}.`, href: '/frontend_student/student_complaints', time: 'Recent' });
  }
  notices.slice(0, 2).forEach((n: any, idx: number) => {
    ALERTS.push({ id: `alert_not_${idx}`, type: 'primary', icon: Megaphone, title: 'Notice', message: n.title, href: '/frontend_student/student_notices', time: new Date(n.createdAt).toLocaleDateString() });
  });

  const visibleAlerts = ALERTS.filter(a => !dismissedAlerts.includes(a.id as string));

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
            <h1 className="text-2xl md:text-3xl font-black tracking-tight">{profile.name || profile.user?.name || 'Student'}</h1>
            <p className="text-white/80 text-sm mt-1.5 font-medium">
              Student ID: {profile.userId || profile.id} &nbsp;•&nbsp; Room {profile.roomNumber}, Bed {profile.bedCode} &nbsp;•&nbsp; {profile.propertyName}
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full">🏠 Active Resident</span>
              <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full">📅 Good Standing</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3 shrink-0">
            {[
              { label: 'Attendance', value: '92%', sub: 'This Month', good: true },
              { label: 'Fees', value: totalDue > 0 ? 'Due' : 'Clear', sub: totalDue > 0 ? `₹${totalDue.toLocaleString()} Pending` : 'All Paid', good: totalDue === 0 },
              { label: 'Deposit', value: deposit ? `₹${(deposit.amount/1000).toFixed(0)}K` : 'N/A', sub: 'Secured', good: true },
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
          { label: 'My Room', value: `Room ${profile.roomNumber}`, icon: Home, color: 'text-primary', bg: 'bg-primary/10', href: '/frontend_student/student_room' },
          { label: 'My Bed', value: `Bed ${profile.bedCode}`, icon: BedDouble, color: 'text-info', bg: 'bg-info/10', href: '/frontend_student/student_room' },
          { label: 'Monthly Rent', value: '₹8,500', icon: IndianRupee, color: 'text-success', bg: 'bg-success/10', href: '/frontend_student/student_rent' },
          { label: 'Due Amount', value: `₹${totalDue.toLocaleString()}`, icon: AlertCircle, color: totalDue > 0 ? 'text-danger' : 'text-success', bg: totalDue > 0 ? 'bg-danger/10' : 'bg-success/10', href: '/frontend_student/student_rent?action=pay' },
          { label: 'Due Date', value: dueInvoices.length > 0 ? new Date(dueInvoices[0].dueDate).toLocaleDateString() : 'N/A', icon: Clock, color: 'text-warning', bg: 'bg-warning/10', href: '/frontend_student/student_rent' },
          { label: 'Security Dep.', value: deposit ? `₹${deposit.amount.toLocaleString()}` : 'N/A', icon: ShieldCheck, color: 'text-teal-500', bg: 'bg-teal-500/10', href: '/frontend_student/student_security_deposit' },
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
              { meal: 'Breakfast', time: '08:00 AM', status: 'done', menu: menu?.breakfast || 'Not updated', color: 'bg-warning/10 border-warning/20' },
              { meal: 'Lunch', time: '01:00 PM', status: 'done', menu: menu?.lunch || 'Not updated', color: 'bg-success/10 border-success/20' },
              { meal: 'Dinner', time: '08:30 PM', status: 'pending', menu: menu?.dinner || 'Not updated', color: 'bg-input/60 border-border' },
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
            {[
              { label: 'Attendance', value: 'Present ✓', color: 'text-success bg-success/10 border-success/20', href: '/frontend_student/student_attendance' },
              { label: 'Fee Due', value: totalDue > 0 ? `₹${totalDue.toLocaleString()} Overdue` : 'Clear', color: totalDue > 0 ? 'text-danger bg-danger/10 border-danger/20' : 'text-success bg-success/10 border-success/20', href: '/frontend_student/student_rent' },
              { label: 'Active Leave', value: activeLeaves.length > 0 ? 'Active' : 'None', color: activeLeaves.length > 0 ? 'text-info bg-info/10 border-info/20' : 'text-secondary bg-input border-border', href: '/frontend_student/student_leaves' },
              { label: 'Visitor Today', value: todayVisitors.length > 0 ? `${todayVisitors.length} Approved` : 'None', color: todayVisitors.length > 0 ? 'text-info bg-info/10 border-info/20' : 'text-secondary bg-input border-border', href: '/frontend_student/student_visitors?view=approved' },
              { label: 'Open Complaints', value: openComplaints.length > 0 ? `${openComplaints.length} Open` : 'Clear', color: openComplaints.length > 0 ? 'text-warning bg-warning/10 border-warning/20' : 'text-success bg-success/10 border-success/20', href: '/frontend_student/student_complaints' },
              { label: 'Unread Notices', value: notices.length > 0 ? `${notices.length} New` : 'None', color: notices.length > 0 ? 'text-primary bg-primary/10 border-primary/20' : 'text-secondary bg-input border-border', href: '/frontend_student/student_notices' },
            ].map((item) => (
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
            {activeLeaves.map((leave, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-success/5 border border-success/20">
                <p className="text-xs font-bold text-success">Active Leave</p>
                <p className="text-sm font-black text-primary mt-1">{new Date(leave.startDate).toLocaleDateString()} – {new Date(leave.endDate).toLocaleDateString()}</p>
                <p className="text-xs text-secondary mt-0.5">{leave.reason} • {leave.destination}</p>
              </div>
            ))}
            {activeLeaves.length === 0 && (
              <div className="p-3 rounded-xl bg-input/30 border border-border flex items-center justify-center">
                <p className="text-xs text-secondary font-medium text-center">No active or upcoming leaves</p>
              </div>
            )}
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
            {todayVisitors.map((visitor, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-success/5 border border-success/20">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-black text-primary">{visitor.name}</p>
                    <p className="text-xs text-secondary font-medium">{visitor.relation} • {visitor.timeIn} – {visitor.timeOut}</p>
                  </div>
                  <span className="text-[10px] font-black bg-success text-white px-2 py-1 rounded-md">{visitor.status}</span>
                </div>
              </div>
            ))}
            {todayVisitors.length === 0 && (
              <div className="p-3 rounded-xl bg-input/30 border border-border flex items-center justify-center">
                <p className="text-xs text-secondary font-medium text-center">No visitors expected today</p>
              </div>
            )}
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
            {openComplaints.slice(0, 2).map((cmp, idx) => (
              <div key={idx} className={`p-3 rounded-xl ${cmp.priority === 'High' ? 'bg-danger/5 border-danger/20' : 'bg-warning/5 border-warning/20'}`}>
                <div className="flex items-start justify-between mb-1">
                  <p className={`text-xs font-bold ${cmp.priority === 'High' ? 'text-danger' : 'text-warning'}`}>{cmp.id} • {cmp.category}</p>
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded ${cmp.status === 'In Progress' ? 'bg-info/10 text-info border border-info/20' : 'bg-primary/10 text-primary border border-primary/20'}`}>{cmp.status}</span>
                </div>
                <p className="text-sm font-bold text-primary">{cmp.title}</p>
              </div>
            ))}
            {openComplaints.length === 0 && (
              <div className="p-3 rounded-xl bg-success/5 border border-success/20 flex items-center justify-center">
                <p className="text-xs font-bold text-success text-center">No open complaints!</p>
              </div>
            )}
          </div>
          <button onClick={() => router.push('/frontend_student/student_complaints')} className="w-full mt-4 text-center text-xs font-bold text-primary hover:underline flex items-center justify-center gap-1">
            All Complaints <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    </div>
  );
}
