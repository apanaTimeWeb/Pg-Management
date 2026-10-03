'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Home, BedDouble, IndianRupee, AlertCircle, CalendarCheck, ShieldCheck,
  Utensils, Bell, FileText, ArrowRight, TrendingUp, CheckCircle2,
  Clock, Users, Megaphone, Wrench, Upload, Phone, ChevronRight, Star
} from 'lucide-react';

const QUICK_ACTIONS = [
  { label: 'Pay Fees', icon: IndianRupee, href: '/frontend_student/student_rent', color: 'bg-success/10 text-success border-success/20' },
  { label: 'Request Leave', icon: CalendarCheck, href: '/frontend_student/student_leaves', color: 'bg-primary/10 text-primary border-primary/20' },
  { label: 'Invite Visitor', icon: Users, href: '/frontend_student/student_visitors', color: 'bg-info/10 text-info border-info/20' },
  { label: 'Raise Complaint', icon: Wrench, href: '/frontend_student/student_complaints', color: 'bg-danger/10 text-danger border-danger/20' },
  { label: 'View Menu', icon: Utensils, href: '/frontend_student/student_mess', color: 'bg-warning/10 text-warning border-warning/20' },
  { label: 'View Notice', icon: Megaphone, href: '/frontend_student/student_notices', color: 'bg-primary/10 text-primary border-primary/20' },
  { label: 'Upload Doc', icon: Upload, href: '/frontend_student/student_documents', color: 'bg-info/10 text-info border-info/20' },
  { label: 'Contact Manager', icon: Phone, href: '/frontend_student/student_support', color: 'bg-success/10 text-success border-success/20' },
];

const ALERTS = [
  { type: 'warning', icon: IndianRupee, message: 'Monthly rent of ₹8,000 is due on 05 Oct' },
  { type: 'success', icon: CheckCircle2, message: 'Leave approved: 10 Oct – 15 Oct' },
  { type: 'info', icon: Users, message: 'Visitor pass for Rahul approved for tomorrow 4 PM' },
  { type: 'primary', icon: Megaphone, message: 'New notice: Diwali celebration on 24 Oct' },
];

const getAlertStyle = (type: string) => {
  switch (type) {
    case 'warning': return 'bg-warning/10 border-warning/20 text-warning';
    case 'success': return 'bg-success/10 border-success/20 text-success';
    case 'info': return 'bg-info/10 border-info/20 text-info';
    default: return 'bg-primary/10 border-primary/20 text-primary';
  }
};

export function StudentDashboardMain() {
  const router = useRouter();

  return (
    <div className="w-full max-w-7xl mx-auto pb-12 animate-in fade-in duration-300 space-y-8">

      {/* Welcome Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary to-primary/70 rounded-2xl p-6 md:p-8 text-white shadow-lg">
        <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-8 right-20 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <p className="text-white/70 text-sm font-medium mb-1">Welcome back 👋</p>
            <h1 className="text-2xl md:text-3xl font-black">Rahul Sharma</h1>
            <p className="text-white/80 text-sm mt-1 font-medium">Student ID: STU-2024-1045 • Room 204, Bed B</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-3 text-center">
              <p className="text-2xl font-black">92%</p>
              <p className="text-xs text-white/80 font-medium">Attendance</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-3 text-center">
              <p className="text-2xl font-black">Day 47</p>
              <p className="text-xs text-white/80 font-medium">Stay</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Info Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: 'My Room', value: 'Room 204', icon: Home, color: 'text-primary', bg: 'bg-primary/10' },
          { label: 'My Bed', value: 'Bed B', icon: BedDouble, color: 'text-info', bg: 'bg-info/10' },
          { label: 'Monthly Rent', value: '₹8,000', icon: IndianRupee, color: 'text-success', bg: 'bg-success/10' },
          { label: 'Due Amount', value: '₹8,000', icon: AlertCircle, color: 'text-danger', bg: 'bg-danger/10' },
          { label: 'Due Date', value: '05 Oct', icon: Clock, color: 'text-warning', bg: 'bg-warning/10' },
          { label: 'Security Dep.', value: '₹10,000', icon: ShieldCheck, color: 'text-primary', bg: 'bg-primary/10' },
        ].map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="bg-card border border-border rounded-2xl p-4 shadow-sm hover:shadow-md transition-all">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${card.bg}`}>
                <Icon className={`w-5 h-5 ${card.color}`} />
              </div>
              <p className="text-lg md:text-xl font-black text-primary">{card.value}</p>
              <p className="text-xs text-secondary font-medium mt-1">{card.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Today's Meal */}
        <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
          <h3 className="font-black text-primary flex items-center gap-2 mb-5">
            <Utensils className="w-5 h-5 text-warning" /> {"Today's Meal"}
          </h3>
          <div className="space-y-3">
            {[
              { meal: 'Breakfast', time: '08:00 AM', status: 'done', menu: 'Poha + Tea' },
              { meal: 'Lunch', time: '01:00 PM', status: 'done', menu: 'Dal + Rice + Sabzi' },
              { meal: 'Dinner', time: '08:30 PM', status: 'pending', menu: 'Roti + Paneer + Salad' },
            ].map((item) => (
              <div key={item.meal} className="flex items-center justify-between p-3 rounded-xl bg-input/30 border border-border">
                <div>
                  <p className="text-sm font-bold text-primary">{item.meal} <span className="font-normal text-secondary">• {item.time}</span></p>
                  <p className="text-xs text-secondary font-medium mt-0.5">{item.menu}</p>
                </div>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center ${item.status === 'done' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'}`}>
                  {item.status === 'done' ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => router.push('/frontend_student/student_mess')} className="w-full mt-4 text-center text-xs font-bold text-primary hover:underline flex items-center justify-center gap-1">
            Full Menu <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Alerts */}
        <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
          <h3 className="font-black text-primary flex items-center gap-2 mb-5">
            <Bell className="w-5 h-5 text-danger" /> Dashboard Alerts
          </h3>
          <div className="space-y-3">
            {ALERTS.map((alert, idx) => {
              const Icon = alert.icon;
              return (
                <div key={idx} className={`flex items-start gap-3 p-3 rounded-xl border ${getAlertStyle(alert.type)}`}>
                  <Icon className="w-4 h-4 shrink-0 mt-0.5" />
                  <p className="text-xs font-bold leading-relaxed">{alert.message}</p>
                </div>
              );
            })}
          </div>
          <button onClick={() => router.push('/frontend_student/student_notifications')} className="w-full mt-4 text-center text-xs font-bold text-primary hover:underline flex items-center justify-center gap-1">
            All Notifications <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Today's Status */}
        <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
          <h3 className="font-black text-primary flex items-center gap-2 mb-5">
            <Star className="w-5 h-5 text-warning" /> {"Today's Status"}
          </h3>
          <div className="space-y-3">
            {[
              { label: 'Attendance', value: 'Present', color: 'text-success bg-success/10' },
              { label: 'Fee Due', value: '₹8,000 Overdue', color: 'text-danger bg-danger/10' },
              { label: 'Active Leave', value: 'None', color: 'text-secondary bg-input' },
              { label: 'Visitor Today', value: '1 Approved', color: 'text-info bg-info/10' },
              { label: 'Open Complaints', value: '1 In Progress', color: 'text-warning bg-warning/10' },
              { label: 'Notices Unread', value: '2 New', color: 'text-primary bg-primary/10' },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between text-sm">
                <span className="text-secondary font-medium">{item.label}</span>
                <span className={`text-xs font-black px-2.5 py-1 rounded-lg ${item.color}`}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-card border border-border rounded-2xl p-5 md:p-6 shadow-sm">
        <h3 className="font-black text-primary mb-5 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" /> Quick Actions
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3">
          {QUICK_ACTIONS.map((action) => {
            const Icon = action.icon;
            return (
              <button 
                key={action.label} 
                onClick={() => router.push(action.href)}
                className={`flex flex-col items-center justify-center gap-2.5 p-4 rounded-2xl border transition-all hover:scale-105 hover:shadow-md font-bold text-xs ${action.color}`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-center leading-tight">{action.label}</span>
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
}
