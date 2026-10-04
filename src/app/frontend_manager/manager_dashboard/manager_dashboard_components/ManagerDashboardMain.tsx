'use client';

import React from 'react';
import { 
  Users, Bed, LogIn, LogOut, CheckCircle2, UserCheck, 
  Coffee, IndianRupee, MessageSquare, Wrench, CalendarOff, 
  ShieldAlert, Bell, Plus, FileText, ArrowRight, UserPlus
} from 'lucide-react';
import Link from 'next/link';
import { useManagerDashboard } from '../manager_dashboard_hooks/useManagerDashboard';

export default function ManagerDashboardMain() {
  const { stats, loading, selectedPropertyId } = useManagerDashboard();

  if (loading) {
    return <div className="p-8 flex items-center justify-center min-h-[50vh]"><div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div></div>;
  }

  if (!selectedPropertyId) {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-[50vh] text-center">
        <div className="w-16 h-16 bg-indigo-50 text-indigo-500 rounded-full flex items-center justify-center mb-4">
          <Bed className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-primary mb-2">No Property Selected</h2>
        <p className="text-secondary mb-4">Please select a property from the top navigation to view the dashboard.</p>
      </div>
    );
  }

  // Generate dynamic alerts based on stats
  const alerts = [];
  if (stats?.pendingRentAmount && stats.pendingRentAmount > 0) {
    alerts.push({ id: 1, type: 'critical', text: `Pending Dues of ₹${stats.pendingRentAmount.toLocaleString()} to be collected` });
  }
  if (stats?.todayCheckouts && stats.todayCheckouts > 0) {
    alerts.push({ id: 2, type: 'warning', text: `${stats.todayCheckouts} Check-outs scheduled for today` });
  }
  if (stats?.todayCheckins && stats.todayCheckins > 0) {
    alerts.push({ id: 3, type: 'info', text: `${stats.todayCheckins} Check-ins scheduled for today` });
  }
  if (stats?.openComplaints && stats.openComplaints > 0) {
    alerts.push({ id: 4, type: 'critical', text: `${stats.openComplaints} Open complaints require your attention` });
  }
  if (stats?.pendingVisitors && stats.pendingVisitors > 0) {
    alerts.push({ id: 5, type: 'warning', text: `${stats.pendingVisitors} Visitors pending approval` });
  }

  return (
    <div className="p-4 md:p-8 space-y-6 animate-in fade-in duration-500 max-w-[1600px] mx-auto h-[calc(100vh-4rem)] flex flex-col overflow-y-auto hide-scrollbar">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-black text-primary flex items-center gap-3">
            <div className="p-2 bg-indigo-100 rounded-xl text-indigo-600">
              <span className="text-xl">👋</span>
            </div>
            Good Morning, Manager
          </h1>
          <p className="text-[var(--text-disabled)] text-sm mt-1 font-medium">Here's your operational overview for today.</p>
        </div>
        <p className="text-sm font-bold text-secondary bg-card px-4 py-2 rounded-xl border border-border shadow-sm">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Main Content Area (Left 3 cols) */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            
            {/* Students */}
            <div className="bg-card p-4 rounded-2xl border border-border shadow-sm flex flex-col justify-between">
              <div className="flex justify-between items-start mb-2">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 flex items-center justify-center"><Users className="w-5 h-5"/></div>
                <span className="text-[10px] font-bold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-950/50 px-2 py-0.5 rounded">Students</span>
              </div>
              <div>
                <h3 className="text-2xl font-black text-primary">{stats?.totalStudents || 0}</h3>
                <p className="text-xs text-secondary mt-1"><b className="text-green-600 dark:text-green-400">{stats?.activeStudents || 0} Active</b> • {(stats?.totalStudents || 0) - (stats?.activeStudents || 0)} Pending</p>
              </div>
            </div>

            {/* Beds */}
            <div className="bg-card p-4 rounded-2xl border border-border shadow-sm flex flex-col justify-between">
              <div className="flex justify-between items-start mb-2">
                <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400 flex items-center justify-center"><Bed className="w-5 h-5"/></div>
                <span className="text-[10px] font-bold text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-950/50 px-2 py-0.5 rounded">Beds</span>
              </div>
              <div>
                <h3 className="text-2xl font-black text-primary">{stats?.totalBeds || 0}</h3>
                <p className="text-xs text-secondary mt-1"><b className="text-purple-600 dark:text-purple-400">{stats?.occupiedBeds || 0} Occ.</b> • {stats?.vacantBeds || 0} Vacant</p>
              </div>
            </div>

            {/* Movements */}
            <div className="bg-card p-4 rounded-2xl border border-border shadow-sm flex flex-col justify-between">
              <div className="flex justify-between items-start mb-2">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center"><ArrowRight className="w-5 h-5"/></div>
                <span className="text-[10px] font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-950/50 px-2 py-0.5 rounded">Movements</span>
              </div>
              <div>
                <h3 className="text-2xl font-black text-primary">{(stats?.todayCheckins || 0) + (stats?.todayCheckouts || 0)}</h3>
                <p className="text-xs text-secondary mt-1"><b className="text-green-600 dark:text-green-400">{stats?.todayCheckins || 0} In</b> • <b className="text-orange-600 dark:text-orange-400">{stats?.todayCheckouts || 0} Out</b> Today</p>
              </div>
            </div>

            {/* Finance */}
            <div className="bg-card p-4 rounded-2xl border border-red-200 dark:border-red-900/50 shadow-sm flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-red-50 dark:bg-red-950/30 rounded-bl-full -mr-4 -mt-4"></div>
              <div className="flex justify-between items-start mb-2 relative z-10">
                <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-400 flex items-center justify-center"><IndianRupee className="w-5 h-5"/></div>
                <span className="text-[10px] font-bold text-red-700 dark:text-red-300 bg-red-100 dark:bg-red-950/50 px-2 py-0.5 rounded">Pending Dues</span>
              </div>
              <div className="relative z-10">
                <h3 className="text-2xl font-black text-red-700 dark:text-red-400">₹ {(stats?.pendingRentAmount || 0).toLocaleString()}</h3>
                <p className="text-xs text-red-600 dark:text-red-400 mt-1">Expected: ₹{(stats?.totalExpectedRent || 0).toLocaleString()}</p>
              </div>
            </div>

          </div>

          {/* Secondary Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Today's Overview Box */}
            <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
              <div className="p-4 bg-page/30 border-b border-border/50 flex items-center justify-between">
                <h3 className="font-bold text-primary flex items-center gap-2"><CalendarOff className="w-4 h-4 text-indigo-600 dark:text-indigo-400"/> Today's Log</h3>
                <span className="text-xs font-bold text-secondary">Operational Data</span>
              </div>
              <div className="p-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
                
                <div className="text-center">
                  <p className="text-xs font-bold text-secondary mb-1">Attendance</p>
                  <p className="font-black text-lg text-primary">{stats?.activeStudents || 0}</p>
                  <p className="text-[10px] text-green-600 dark:text-green-400 font-bold">Total Active</p>
                </div>
                <div className="text-center border-l border-border/50">
                  <p className="text-xs font-bold text-secondary mb-1">Leaves</p>
                  <p className="font-black text-lg text-primary">{stats?.todayLeaves || 0}</p>
                  <p className="text-[10px] text-purple-600 dark:text-purple-400 font-bold">On Leave</p>
                </div>
                <div className="text-center border-l border-border/50">
                  <p className="text-xs font-bold text-secondary mb-1">Visitors</p>
                  <p className="font-black text-lg text-primary">{stats?.pendingVisitors || 0}</p>
                  <p className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold">Pending</p>
                </div>
                <div className="text-center border-l border-border/50">
                  <p className="text-xs font-bold text-secondary mb-1">Issues</p>
                  <p className="font-black text-lg text-red-600 dark:text-red-400">{stats?.openComplaints || 0}</p>
                  <p className="text-[10px] text-red-500 dark:text-red-400 font-bold">Open Tasks</p>
                </div>

              </div>
            </div>

            {/* Mess Overview */}
            <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
              <div className="p-4 bg-page/30 border-b border-border/50 flex items-center justify-between">
                <h3 className="font-bold text-primary flex items-center gap-2"><Coffee className="w-4 h-4 text-indigo-600 dark:text-indigo-400"/> Mess Expected Headcount</h3>
              </div>
              <div className="p-4 grid grid-cols-3 gap-2">
                <div className="bg-orange-50 dark:bg-orange-950/20 p-3 rounded-xl border border-orange-100 dark:border-orange-900/30 text-center">
                  <p className="text-xs font-bold text-orange-700 dark:text-orange-400">Breakfast</p>
                  <p className="font-black text-xl text-orange-900 dark:text-orange-200 mt-1">{(stats?.activeStudents || 0) - (stats?.todayLeaves || 0)}</p>
                </div>
                <div className="bg-yellow-50 dark:bg-yellow-950/20 p-3 rounded-xl border border-yellow-100 dark:border-yellow-900/30 text-center">
                  <p className="text-xs font-bold text-yellow-700 dark:text-yellow-400">Lunch</p>
                  <p className="font-black text-xl text-yellow-900 dark:text-yellow-200 mt-1">{(stats?.activeStudents || 0) - (stats?.todayLeaves || 0)}</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded-xl border border-blue-100 dark:border-blue-900/30 text-center">
                  <p className="text-xs font-bold text-blue-700 dark:text-blue-400">Dinner</p>
                  <p className="font-black text-xl text-blue-900 dark:text-blue-200 mt-1">{(stats?.activeStudents || 0) - (stats?.todayLeaves || 0)}</p>
                </div>
              </div>
            </div>

          </div>

          {/* Quick Actions (Manager's Playground) */}
          <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
            <div className="p-4 bg-page/30 border-b border-border/50">
              <h3 className="font-bold text-primary flex items-center gap-2">⚡ Quick Actions</h3>
            </div>
            
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-[1px] bg-border/50">
              
              <Link href="/frontend_manager/manager_admissions" className="bg-card p-4 flex flex-col items-center justify-center gap-2 hover:bg-page transition-colors group">
                <div className="w-10 h-10 rounded-full bg-page flex items-center justify-center group-hover:bg-indigo-100 dark:group-hover:bg-indigo-950/40 group-hover:text-indigo-600 transition-colors"><UserPlus className="w-5 h-5"/></div>
                <span className="text-[11px] font-bold text-center text-secondary group-hover:text-primary">New Admission</span>
              </Link>
              
              <Link href="/frontend_manager/manager_check_in" className="bg-card p-4 flex flex-col items-center justify-center gap-2 hover:bg-page transition-colors group">
                <div className="w-10 h-10 rounded-full bg-page flex items-center justify-center group-hover:bg-green-100 dark:group-hover:bg-green-950/40 group-hover:text-green-600 transition-colors"><LogIn className="w-5 h-5"/></div>
                <span className="text-[11px] font-bold text-center text-secondary group-hover:text-primary">Check-In</span>
              </Link>

              <Link href="/frontend_manager/manager_check_in?mode=checkout" className="bg-card p-4 flex flex-col items-center justify-center gap-2 hover:bg-page transition-colors group">
                <div className="w-10 h-10 rounded-full bg-page flex items-center justify-center group-hover:bg-orange-100 dark:group-hover:bg-orange-950/40 group-hover:text-orange-600 transition-colors"><LogOut className="w-5 h-5"/></div>
                <span className="text-[11px] font-bold text-center text-secondary group-hover:text-primary">Check-Out</span>
              </Link>

              <Link href="/frontend_manager/manager_rooms" className="bg-card p-4 flex flex-col items-center justify-center gap-2 hover:bg-page transition-colors group">
                <div className="w-10 h-10 rounded-full bg-page flex items-center justify-center group-hover:bg-indigo-100 dark:group-hover:bg-indigo-950/40 group-hover:text-indigo-600 transition-colors"><Bed className="w-5 h-5"/></div>
                <span className="text-[11px] font-bold text-center text-secondary group-hover:text-primary">Allocate Bed</span>
              </Link>

              <Link href="/frontend_manager/manager_attendance" className="bg-card p-4 flex flex-col items-center justify-center gap-2 hover:bg-page transition-colors group">
                <div className="w-10 h-10 rounded-full bg-page flex items-center justify-center group-hover:bg-indigo-100 dark:group-hover:bg-indigo-950/40 group-hover:text-indigo-600 transition-colors"><UserCheck className="w-5 h-5"/></div>
                <span className="text-[11px] font-bold text-center text-secondary group-hover:text-primary">Mark Attendance</span>
              </Link>

              <Link href="/frontend_manager/manager_finance" className="bg-card p-4 flex flex-col items-center justify-center gap-2 hover:bg-page transition-colors group">
                <div className="w-10 h-10 rounded-full bg-page flex items-center justify-center group-hover:bg-green-100 dark:group-hover:bg-green-950/40 group-hover:text-green-600 transition-colors"><IndianRupee className="w-5 h-5"/></div>
                <span className="text-[11px] font-bold text-center text-secondary group-hover:text-primary">Collect Payment</span>
              </Link>

              <Link href="/frontend_manager/manager_leaves" className="bg-card p-4 flex flex-col items-center justify-center gap-2 hover:bg-page transition-colors group">
                <div className="w-10 h-10 rounded-full bg-page flex items-center justify-center group-hover:bg-indigo-100 dark:group-hover:bg-indigo-950/40 group-hover:text-indigo-600 transition-colors"><CalendarOff className="w-5 h-5"/></div>
                <span className="text-[11px] font-bold text-center text-secondary group-hover:text-primary">Approve Leave</span>
              </Link>

              <Link href="/frontend_manager/manager_visitors" className="bg-card p-4 flex flex-col items-center justify-center gap-2 hover:bg-page transition-colors group">
                <div className="w-10 h-10 rounded-full bg-page flex items-center justify-center group-hover:bg-indigo-100 dark:group-hover:bg-indigo-950/40 group-hover:text-indigo-600 transition-colors"><Users className="w-5 h-5"/></div>
                <span className="text-[11px] font-bold text-center text-secondary group-hover:text-primary">Add Visitor</span>
              </Link>

              <Link href="/frontend_manager/manager_complaints" className="bg-card p-4 flex flex-col items-center justify-center gap-2 hover:bg-page transition-colors group">
                <div className="w-10 h-10 rounded-full bg-page flex items-center justify-center group-hover:bg-red-100 dark:group-hover:bg-red-950/40 group-hover:text-red-600 transition-colors"><MessageSquare className="w-5 h-5"/></div>
                <span className="text-[11px] font-bold text-center text-secondary group-hover:text-primary">Log Complaint</span>
              </Link>

              <Link href="/frontend_manager/manager_maintenance" className="bg-card p-4 flex flex-col items-center justify-center gap-2 hover:bg-page transition-colors group">
                <div className="w-10 h-10 rounded-full bg-page flex items-center justify-center group-hover:bg-orange-100 dark:group-hover:bg-orange-950/40 group-hover:text-orange-600 transition-colors"><Wrench className="w-5 h-5"/></div>
                <span className="text-[11px] font-bold text-center text-secondary group-hover:text-primary">Maintenance</span>
              </Link>

              <Link href="/frontend_manager/manager_broadcasts" className="bg-card p-4 flex flex-col items-center justify-center gap-2 hover:bg-page transition-colors group">
                <div className="w-10 h-10 rounded-full bg-page flex items-center justify-center group-hover:bg-indigo-100 dark:group-hover:bg-indigo-950/40 group-hover:text-indigo-600 transition-colors"><Bell className="w-5 h-5"/></div>
                <span className="text-[11px] font-bold text-center text-secondary group-hover:text-primary">Add Notice</span>
              </Link>

              <Link href="/frontend_manager/manager_students" className="bg-card p-4 flex flex-col items-center justify-center gap-2 hover:bg-page transition-colors group">
                <div className="w-10 h-10 rounded-full bg-page flex items-center justify-center group-hover:bg-indigo-100 dark:group-hover:bg-indigo-950/40 group-hover:text-indigo-600 transition-colors"><Users className="w-5 h-5"/></div>
                <span className="text-[11px] font-bold text-center text-secondary group-hover:text-primary">All Students</span>
              </Link>

            </div>
          </div>

        </div>

        {/* Right Sidebar - Active Alerts */}
        <div className="lg:col-span-1">
          <div className="bg-card rounded-2xl border border-border shadow-sm h-full flex flex-col">
            
            <div className="p-4 border-b border-border/50 bg-red-50/50 dark:bg-red-950/20 rounded-t-2xl flex items-center justify-between">
              <h3 className="font-black text-red-700 dark:text-red-400 flex items-center gap-2"><Bell className="w-4 h-4"/> Actionable Alerts</h3>
              <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{alerts.length} New</span>
            </div>

            <div className="p-4 flex-1 overflow-y-auto space-y-3">
              {alerts.length === 0 ? (
                <div className="text-center text-secondary text-sm p-4">No active alerts! Everything is going smoothly.</div>
              ) : (
                alerts.map((alert, idx) => (
                  <div 
                    key={idx}
                    className={`p-3 rounded-xl border flex gap-3 ${
                      alert.type === 'critical' ? 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900/40 text-red-900 dark:text-red-200' :
                      alert.type === 'warning' ? 'bg-orange-50 dark:bg-orange-950/30 border-orange-200 dark:border-orange-900/40 text-orange-900 dark:text-orange-200' :
                      'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900/40 text-blue-900 dark:text-blue-200'
                    }`}
                  >
                    <ShieldAlert className={`w-5 h-5 shrink-0 mt-0.5 ${
                      alert.type === 'critical' ? 'text-red-500' :
                      alert.type === 'warning' ? 'text-orange-500' :
                      'text-blue-500'
                    }`} />
                    <div>
                      <p className="text-sm font-bold leading-snug">{alert.text}</p>
                      <button className="text-[10px] font-bold mt-2 uppercase tracking-wider hover:underline opacity-70">Take Action &rarr;</button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-4 border-t border-border/50 bg-page/30">
              <Link href="/frontend_manager/manager_notifications" className="w-full block text-center py-2 bg-card hover:bg-page border border-border text-xs font-bold text-secondary hover:text-primary rounded-lg transition-colors">
                View All Notifications
              </Link>
            </div>
            
          </div>
        </div>

      </div>
    </div>
  );
}