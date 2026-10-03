'use client';

// RESPONSIBILITY: Renders the Student Dashboard UI layer.
// DATA FLOW: useStudentDashboard.ts -> StudentDashboardMain.tsx

import Link from 'next/link';
import { IndianRupee, MapPin, Bell, Utensils, TriangleAlert, Home, MessageSquareWarning, ArrowRight, User, Plus, DoorOpen, CalendarOff, FileText } from 'lucide-react';

import { useStudentDashboard } from '@/app/frontend_student/dashboard/StudentDashboard_hooks/useStudentDashboard';
import { STUDENT_ROUTES } from '@/app/frontend_student/student_url_config';

export function StudentDashboardMain() {
  const { profile, loading, menu, notices, handleReferralSubmit } = useStudentDashboard();

  if (loading || !profile) return <div className="p-4 md:p-6 motion-safe:animate-pulse">Loading dashboard...</div>;

  const today = new Date();
  const dateStr = today.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  const timeStr = today.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="space-y-6 w-full h-full">
      
      {/* 1. Dashboard Top Banner */}
      <div className="bg-gradient-to-r from-theme-primary to-theme-primary-hover text-white rounded-3xl p-8 shadow-lg relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-700"><Home className="w-40 h-40" /></div>
        <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        <div className="relative z-10">
          <p className="text-white/90 text-xl font-bold mb-1 tracking-tight">🧑‍🎓 Good Morning, {profile.name || 'Student'}! 👋</p>
          <div className="flex items-center gap-2 text-sm text-white/80 mb-6 font-medium">
            <span>📅 {dateStr}</span> | <span>⏰ {timeStr}</span>
          </div>
          <div className="inline-flex items-center gap-2 bg-white/20 px-5 py-2.5 rounded-xl text-sm font-bold backdrop-blur-md shadow-sm border border-white/20 hover:bg-white/30 transition-colors cursor-default">
            🏠 {profile.propertyName || 'Green Valley PG'} - Room {profile.roomNumber || '-'}, Bed {profile.bedCode || '-'}
          </div>
        </div>
      </div>

      {/* 2. Rent Status Card */}
      <div className="bg-gradient-to-br from-bg-card to-bg-page border border-border/50 rounded-3xl p-6 flex flex-col sm:flex-row sm:items-center justify-between hover:shadow-xl motion-safe:hover:-translate-y-1 motion-safe:transition-all group relative overflow-hidden">
        <div className="absolute -right-4 -top-4 w-32 h-32 bg-danger-bg rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
        <div className="absolute -left-4 -bottom-4 w-32 h-32 bg-success-bg rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
        <div className="flex items-start sm:items-center gap-5 relative z-10 mb-4 sm:mb-0">
          <div className={`p-4 rounded-2xl shadow-sm ${profile.duesAmount > 0 ? 'bg-danger-bg text-danger' : 'bg-success-bg text-success'}`}>
            <IndianRupee className="w-7 h-7" />
          </div>
          <div>
            <div className="text-secondary font-bold text-sm mb-1 uppercase tracking-wider">💳 Rent Status</div>
            <div className={`text-3xl font-black tracking-tight ${profile.duesAmount > 0 ? 'text-danger' : 'text-success'}`}>
              ₹{profile.duesAmount > 0 ? profile.duesAmount : '0'}
            </div>
            <div className="text-sm font-bold mt-1">
              {profile.duesAmount > 0 ? (
                <span className="flex items-center gap-1.5 text-warning">
                  <span className="inline-block w-2 h-2 rounded-full bg-warning animate-pulse"></span> Pending | Due: 10th Sep 2024
                </span>
              ) : <span className="text-success">All cleared for this month! 🎉</span>}
            </div>
          </div>
        </div>
        {profile.duesAmount > 0 && (
          <div className="relative z-10 w-full sm:w-auto">
            <Link href={STUDENT_ROUTES.RENT} className="inline-flex items-center justify-center w-full sm:w-auto bg-theme-primary text-white text-sm font-bold px-8 py-3.5 rounded-xl shadow-md hover:bg-theme-primary-hover hover:shadow-lg transition-all group-hover:scale-105">
              Pay Now <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        )}
      </div>

      {/* 3. Horizontal Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: 'My Room', icon: Home, link: STUDENT_ROUTES.ROOM, subtext: 'View →', color: 'text-info', bg: 'from-info/20 to-transparent' },
          { label: 'Rent', icon: IndianRupee, link: STUDENT_ROUTES.RENT, subtext: 'History', color: 'text-success', bg: 'from-success/20 to-transparent' },
          { label: 'Complaints', icon: MessageSquareWarning, link: STUDENT_ROUTES.COMPLAINTS, subtext: '(2 Open)', color: 'text-danger', bg: 'from-danger/20 to-transparent' },
          { label: "Today's Menu", icon: Utensils, link: STUDENT_ROUTES.MESS, subtext: 'View', color: 'text-warning', bg: 'from-warning/20 to-transparent' },
          { label: 'Notices', icon: Bell, link: STUDENT_ROUTES.NOTICES, subtext: '(3 New)', color: 'text-purple', bg: 'from-purple/20 to-transparent' },
        ].map((action, idx) => (
          <Link key={idx} href={action.link} className="relative overflow-hidden bg-card border border-border/50 p-5 rounded-2xl flex flex-col items-center justify-center text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
            <div className={`absolute inset-0 bg-gradient-to-br ${action.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            <div className={`p-3 rounded-xl bg-bg-page shadow-sm ${action.color} mb-3 group-hover:scale-110 transition-transform duration-300 relative z-10`}>
              <action.icon className="w-6 h-6" />
            </div>
            <div className="font-black text-primary text-sm mb-1 relative z-10">{action.label}</div>
            <div className="text-xs text-secondary font-bold relative z-10">{action.subtext}</div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 4. Today's Menu */}
        <div className="lg:col-span-2 bg-card border border-border/50 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="font-black text-primary text-lg border-b border-border/50 pb-4 mb-5 flex items-center gap-2">
            <Utensils className="w-5 h-5 text-theme-primary" /> Today's Menu
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="group">
              <div className="text-xs font-bold text-secondary uppercase tracking-wider mb-2">Breakfast (8-9:30 AM)</div>
              <div className="flex items-center gap-3 text-primary font-bold bg-bg-page p-4 rounded-xl border border-transparent group-hover:border-theme-primary/30 transition-colors">
                <span className="text-xl">🍛</span> {menu?.breakfast || 'Poha + Tea'}
              </div>
            </div>
            <div className="group">
              <div className="text-xs font-bold text-secondary uppercase tracking-wider mb-2">Lunch (12-2 PM)</div>
              <div className="flex items-center gap-3 text-primary font-bold bg-bg-page p-4 rounded-xl border border-transparent group-hover:border-theme-primary/30 transition-colors">
                <span className="text-xl">🍚</span> {menu?.lunch || 'Dal + Rice + Sabji'}
              </div>
            </div>
            <div className="group md:col-span-2">
              <div className="text-xs font-bold text-secondary uppercase tracking-wider mb-2">Dinner (8-10 PM)</div>
              <div className="flex items-center gap-3 text-primary font-bold bg-bg-page p-4 rounded-xl border border-transparent group-hover:border-theme-primary/30 transition-colors">
                <span className="text-xl">🫓</span> {menu?.dinner || 'Roti + Paneer + Salad'}
              </div>
            </div>
          </div>
        </div>

        {/* 5. Quick Actions Links */}
        <div className="bg-card border border-border/50 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="font-black text-primary text-lg border-b border-border/50 pb-4 mb-4 flex items-center gap-2">
            <Plus className="w-5 h-5 text-theme-primary" /> Shortcuts
          </h3>
          <div className="space-y-3">
            <Link href={STUDENT_ROUTES.COMPLAINTS} className="flex items-center justify-between p-3.5 rounded-xl bg-bg-page hover:bg-primary-subtle border border-transparent hover:border-theme-primary/20 transition-colors group">
              <span className="flex items-center gap-3 font-bold text-primary group-hover:text-theme-primary transition-colors"><TriangleAlert className="w-5 h-5 text-secondary group-hover:text-theme-primary transition-colors" /> Raise Complaint</span>
            </Link>
            <Link href={STUDENT_ROUTES.VISITORS} className="flex items-center justify-between p-3.5 rounded-xl bg-bg-page hover:bg-primary-subtle border border-transparent hover:border-theme-primary/20 transition-colors group">
              <span className="flex items-center gap-3 font-bold text-primary group-hover:text-theme-primary transition-colors"><DoorOpen className="w-5 h-5 text-secondary group-hover:text-theme-primary transition-colors" /> Visitor Request</span>
            </Link>
            <Link href={STUDENT_ROUTES.LEAVES} className="flex items-center justify-between p-3.5 rounded-xl bg-bg-page hover:bg-primary-subtle border border-transparent hover:border-theme-primary/20 transition-colors group">
              <span className="flex items-center gap-3 font-bold text-primary group-hover:text-theme-primary transition-colors"><CalendarOff className="w-5 h-5 text-secondary group-hover:text-theme-primary transition-colors" /> Leave Request</span>
            </Link>
            <Link href={STUDENT_ROUTES.MESS} className="flex items-center justify-between p-3.5 rounded-xl bg-bg-page hover:bg-primary-subtle border border-transparent hover:border-theme-primary/20 transition-colors group">
              <span className="flex items-center gap-3 font-bold text-primary group-hover:text-theme-primary transition-colors"><Utensils className="w-5 h-5 text-secondary group-hover:text-theme-primary transition-colors" /> Meal Opt-Out</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 6. Monthly Activity Summary */}
      <div className="bg-card border border-border/50 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow">
        <h3 className="font-black text-primary text-lg mb-5 flex items-center gap-2">
          <Bell className="w-5 h-5 text-theme-primary" /> Activity Summary & Updates
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-5 bg-bg-page rounded-2xl text-center border border-border/30 hover:border-success/30 transition-colors">
              <div className="text-3xl font-black text-success mb-1">28<span className="text-lg text-secondary">/30</span></div>
              <div className="text-xs font-bold text-secondary uppercase tracking-wider mt-2">Present</div>
            </div>
            <div className="p-5 bg-bg-page rounded-2xl text-center border border-border/30 hover:border-info/30 transition-colors">
              <div className="text-3xl font-black text-info mb-1">85%</div>
              <div className="text-xs font-bold text-secondary uppercase tracking-wider mt-2">Attendance</div>
            </div>
            <div className="p-5 bg-bg-page rounded-2xl text-center border border-border/30 hover:border-warning/30 transition-colors">
              <div className="text-3xl font-black text-warning mb-1">3</div>
              <div className="text-xs font-bold text-secondary uppercase tracking-wider mt-2">Leaves</div>
            </div>
            <div className="p-5 bg-bg-page rounded-2xl text-center border border-border/30 hover:border-purple/30 transition-colors">
              <div className="text-3xl font-black text-purple mb-1 flex items-center justify-center gap-1">4.8 ⭐</div>
              <div className="text-xs font-bold text-secondary uppercase tracking-wider mt-2">Rating</div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-bold text-secondary text-sm uppercase tracking-wider mb-2">Recent Notifications</h4>
            <div className="flex items-start gap-4 p-3 rounded-xl hover:bg-bg-page transition-colors cursor-pointer border border-transparent hover:border-border/50">
              <div className="p-2 bg-warning-bg rounded-lg text-warning shrink-0 mt-0.5"><Bell className="w-4 h-4" /></div>
              <div>
                <div className="font-bold text-primary">Water supply will be off tomorrow</div>
                <div className="text-xs text-secondary mt-1 font-medium">Today at 5:00 PM</div>
              </div>
            </div>
            <div className="flex items-start gap-4 p-3 rounded-xl hover:bg-bg-page transition-colors cursor-pointer border border-transparent hover:border-border/50">
              <div className="p-2 bg-success-bg rounded-lg text-success shrink-0 mt-0.5"><Bell className="w-4 h-4" /></div>
              <div>
                <div className="font-bold text-primary">Your complaint #234 is resolved</div>
                <div className="text-xs text-secondary mt-1 font-medium">Today at 2:30 PM</div>
              </div>
            </div>
            <div className="flex items-start gap-4 p-3 rounded-xl hover:bg-bg-page transition-colors cursor-pointer border border-transparent hover:border-border/50">
              <div className="p-2 bg-info-bg rounded-lg text-info shrink-0 mt-0.5"><Bell className="w-4 h-4" /></div>
              <div>
                <div className="font-bold text-primary">Visitor request approved</div>
                <div className="text-xs text-secondary mt-1 font-medium">Today at 11:00 AM</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
