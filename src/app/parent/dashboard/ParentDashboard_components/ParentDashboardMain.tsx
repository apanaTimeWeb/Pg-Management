'use client';
import { useEffect, useState } from 'react';
import { ShieldCheck, IndianRupee, MapPin, Bed, Activity, ArrowRight, Bell, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

import { parentOperationsApi as api } from '@/app/parent/parent_lib/parent_api/ParentOperations';
import { getSession } from '@/app/parent/parent_lib/parent_auth/ParentSession';

export function ParentDashboardMain() {
  const user = typeof window !== 'undefined' ? getSession() : null;
  const [child, setChild] = useState<any>(null);
  const [alerts, setAlerts] = useState<any[]>([]);
  const [gateLogs, setGateLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      const linkedChild = api.getLinkedChild(user.id);
      setChild(linkedChild);
      
      if (linkedChild) {
        setAlerts(api.getChildAlerts(linkedChild.id).slice(0, 3)); // Top 3 alerts
        setGateLogs(api.getChildGateLogs(linkedChild.id).slice(0, 3)); // Last 3 gate logs
      }
    }
    setLoading(false);
  }, [user?.id]);

  if (loading) {
    return <div className="p-6 animate-pulse">Loading dashboard...</div>;
  }

  if (!child) {
    return (
      <div className="p-6 flex flex-col items-center justify-center text-center bg-card rounded-lg border border-border h-64">
        <ShieldCheck className="w-12 h-12 text-secondary mb-4" />
        <h2 className="text-xl font-bold text-primary">No Student Linked</h2>
        <p className="text-secondary text-sm mt-2">Please contact the PG Manager to link your account to your child.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20">
      <div className="mb-6">
        <h1 className="text-[22px] font-bold text-primary">Parent Dashboard</h1>
        <p className="text-sm text-secondary">Monitor safety, attendance, and rent for {child.name}.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Child Profile Card */}
        <div className="lg:col-span-2 bg-card border border-border rounded-lg p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="w-24 h-24 rounded-full bg-primary-subtle flex items-center justify-center text-primary text-3xl font-bold shrink-0 border border-primary/20">
              {child.name.charAt(0)}
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-2xl font-bold text-primary">{child.name}</h2>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center justify-center sm:justify-start gap-2 text-sm text-secondary">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>{child.propertyId || 'Unknown PG'}</span>
                </div>
                <div className="flex items-center justify-center sm:justify-start gap-2 text-sm text-secondary">
                  <Bed className="w-4 h-4 text-primary" />
                  <span>Room {child.roomNumber || 'N/A'}</span>
                </div>
                <div className="flex items-center justify-center sm:justify-start gap-2 text-sm text-secondary">
                  <Activity className="w-4 h-4 text-primary" />
                  <span className="font-semibold text-success">Active Resident</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Alerts */}
        <div className="bg-card border border-border rounded-lg p-6 shadow-sm flex flex-col">
          <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
            <Bell className="w-5 h-5 text-warning" />
            Recent Alerts
          </h3>
          <div className="flex-1 space-y-3">
            {alerts.length === 0 ? (
              <div className="text-center text-sm text-secondary py-4">No recent alerts.</div>
            ) : (
              alerts.map(a => (
                <div key={a.id} className="p-3 bg-page border border-border rounded-md flex items-start gap-3">
                  {a.severity === 'high' ? (
                    <AlertTriangle className="w-5 h-5 text-danger shrink-0 mt-0.5" />
                  ) : (
                    <Bell className="w-5 h-5 text-warning shrink-0 mt-0.5" />
                  )}
                  <div>
                    <div className="text-sm font-bold text-primary">{a.title}</div>
                    <div className="text-[10px] text-secondary">{new Date(a.date).toLocaleString()}</div>
                  </div>
                </div>
              ))
            )}
          </div>
          <Link href="/parent/alerts" className="mt-4 text-center text-xs font-bold text-primary hover:underline">
            View All Alerts &rarr;
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance & Gate Logs */}
        <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-primary">Recent Gate Logs</h3>
          </div>
          <div className="space-y-3">
            {gateLogs.length === 0 ? (
              <div className="text-center text-sm text-secondary py-4">No recent gate activity.</div>
            ) : (
              gateLogs.map(log => (
                <div key={log.id} className="flex items-center justify-between p-3 border-b border-border last:border-0">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-primary uppercase">
                      {log.type === 'in' ? 'Entered' : 'Exited'}
                    </span>
                    <span className="text-[11px] text-secondary">{new Date(log.createdAt).toLocaleString()}</span>
                  </div>
                  {log.isLate && (
                    <span className="bg-warning/10 text-warning px-2 py-1 rounded text-[10px] font-bold">LATE</span>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Finance Snapshot */}
        <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-primary flex items-center gap-2">
              <IndianRupee className="w-5 h-5 text-success" />
              Finance Overview
            </h3>
          </div>
          <div className="p-4 bg-page rounded-lg border border-border flex items-center justify-between mb-4">
            <div>
              <p className="text-xs text-secondary font-medium uppercase tracking-wider mb-1">Monthly Rent</p>
              <p className="text-xl font-bold text-primary">₹{child.rentAmount || 0}</p>
            </div>
            <Link href="/parent/finance" className="bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-hover motion-safe:transition-colors">
              View Dues
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
