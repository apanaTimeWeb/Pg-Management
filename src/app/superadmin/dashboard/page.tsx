'use client';

import React, { useState, useMemo } from 'react';
import { Megaphone, PlusCircle, ArrowRight, Zap, Bell, Server, Users, Building2, Ticket, CheckCircle2, AlertCircle, FileText, Settings, HelpCircle, Activity, UserCircle } from 'lucide-react';
import Link from 'next/link';

import { SuperAdminDashboardKpiGrid } from '@/app/superadmin/dashboard/SuperAdminDashboard_components/SuperAdminDashboardKpiGrid';
import { SuperadminUseSuperAdminDashboardData } from '@/app/superadmin/dashboard/SuperAdminDashboard_hooks/SuperadminUseSuperAdminDashboardData';

export default function SuperAdminDashboardPage() {
  const { data, loading, error } = SuperadminUseSuperAdminDashboardData();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <AlertCircle className="w-12 h-12 text-[var(--danger)] mb-4" />
        <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">Unable to load dashboard data</h2>
        <button onClick={() => window.location.reload()} className="px-4 py-2 bg-[var(--primary)] text-white rounded-lg hover:bg-[var(--primary-hover)] transition-colors">
          Refresh
        </button>
      </div>
    );
  }

  // Generate a nice greeting
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
  const currentDate = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <div className="space-y-8 pb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* 1. Page Header & 2. Welcome Area */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[var(--border)] pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[var(--text-primary)] mb-1">SuperAdmin Dashboard</h1>
          <p className="text-[var(--text-secondary)] text-sm">System-wide overview of your PG management platform</p>
          
          <div className="mt-6 bg-[var(--primary-subtle)] border border-[var(--primary)]/20 rounded-xl p-4 inline-block">
            <h2 className="text-lg font-semibold text-[var(--primary)]">{greeting}, SuperAdmin</h2>
            <p className="text-sm text-[var(--text-secondary)] mt-1">Here’s what’s happening across your platform.</p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="text-sm font-medium text-[var(--text-secondary)]">{currentDate}</div>
          <div className="flex gap-2 mt-2">
            <Link href="/superadmin/tickets" className="p-2 border border-[var(--border)] rounded-full hover:bg-[var(--bg-overlay)] relative transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--primary)]">
              <Bell className="w-5 h-5 text-[var(--text-secondary)]" />
              {data.openTicketsCount > 0 && (
                <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-[var(--danger)] rounded-full border-2 border-[var(--bg-page)]"></span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* 3. KPI Cards */}
      <SuperAdminDashboardKpiGrid data={data} />

      {/* 5. Secondary KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {[
          { label: 'Active Properties', value: data.activePropertiesCount },
          { label: 'Vacant Beds', value: data.vacantBeds },
          { label: 'Active Students', value: data.totalStudents },
        ].map((item, i) => (
          <div key={i} className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-4 flex items-center justify-between shadow-sm">
            <span className="text-sm font-medium text-[var(--text-secondary)]">{item.label}</span>
            <span className="text-lg font-bold text-[var(--text-primary)]">{item.value}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Main Left Column */}
        <div className="xl:col-span-2 space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 6. Occupancy Analytics */}
            <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-lg text-[var(--text-primary)] mb-6">Occupancy Overview</h3>
              
              <div className="flex flex-col gap-6">
                {/* Horizontal Progress */}
                <div className="w-full h-4 rounded-full overflow-hidden flex bg-[var(--bg-input)]">
                  <div className="bg-[var(--primary)] h-full transition-all duration-1000" style={{ width: `${data.totalBeds > 0 ? (data.occupiedBeds / data.totalBeds) * 100 : 0}%` }}></div>
                  <div className="bg-[var(--warning)] h-full transition-all duration-1000" style={{ width: `${data.totalBeds > 0 ? (data.maintenanceBeds / data.totalBeds) * 100 : 0}%` }}></div>
                </div>
                
                <div className="flex items-end justify-between">
                  <div className="text-4xl font-black text-[var(--text-primary)]">{data.occupancyPercentage}%</div>
                  <div className="text-sm text-[var(--text-secondary)] text-right">Overall Occupancy</div>
                </div>

                <div className="space-y-3 mt-2">
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[var(--primary)]"></div> <span className="text-[var(--text-secondary)]">Occupied</span></div>
                    <span className="font-semibold text-[var(--text-primary)]">{data.occupiedBeds}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[var(--bg-input)]"></div> <span className="text-[var(--text-secondary)]">Vacant</span></div>
                    <span className="font-semibold text-[var(--text-primary)]">{data.vacantBeds}</span>
                  </div>
                  {data.maintenanceBeds > 0 && (
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[var(--warning)]"></div> <span className="text-[var(--text-secondary)]">Maintenance</span></div>
                      <span className="font-semibold text-[var(--text-primary)]">{data.maintenanceBeds}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 7. Platform Overview */}
            <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-lg text-[var(--text-primary)] mb-6">Platform Overview</h3>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4 p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-page)]">
                   <div className="w-10 h-10 rounded-lg bg-[var(--primary-subtle)] flex items-center justify-center shrink-0">
                     <Users className="w-5 h-5 text-[var(--primary)]" />
                   </div>
                   <div className="flex-1">
                     <div className="text-xs text-[var(--text-secondary)] uppercase tracking-wider font-semibold">Total Owners</div>
                     <div className="text-xl font-bold text-[var(--text-primary)]">{data.totalOwners}</div>
                   </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-page)]">
                   <div className="w-10 h-10 rounded-lg bg-[var(--success-bg)] flex items-center justify-center shrink-0">
                     <Building2 className="w-5 h-5 text-[var(--success)]" />
                   </div>
                   <div className="flex-1">
                     <div className="text-xs text-[var(--text-secondary)] uppercase tracking-wider font-semibold">Total Properties</div>
                     <div className="text-xl font-bold text-[var(--text-primary)]">{data.totalProperties}</div>
                   </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-page)]">
                   <div className="w-10 h-10 rounded-lg bg-[var(--info-bg)] flex items-center justify-center shrink-0">
                     <UserCircle className="w-5 h-5 text-[var(--info)]" />
                   </div>
                   <div className="flex-1">
                     <div className="text-xs text-[var(--text-secondary)] uppercase tracking-wider font-semibold">Total Students</div>
                     <div className="text-xl font-bold text-[var(--text-primary)]">{data.totalStudents}</div>
                   </div>
                </div>
              </div>
            </div>
          </div>

          {/* 12. Owner Summary */}
          <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl shadow-sm overflow-hidden flex flex-col">
            <div className="p-6 border-b border-[var(--border)] flex justify-between items-center">
              <h3 className="font-bold text-lg text-[var(--text-primary)]">Recent Owners</h3>
              <Link href="/superadmin/owners" className="text-sm font-medium text-[var(--primary)] hover:underline flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] rounded px-1">
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            {data.recentOwners.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left whitespace-nowrap">
                  <thead className="bg-[var(--bg-page)] text-[var(--text-secondary)] uppercase text-xs">
                    <tr>
                      <th className="px-6 py-4 font-semibold">Owner Name</th>
                      <th className="px-6 py-4 font-semibold">Email</th>
                      <th className="px-6 py-4 font-semibold">Status</th>
                      <th className="px-6 py-4 font-semibold text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border)]">
                    {data.recentOwners.map((owner) => (
                      <tr key={owner.id} className="hover:bg-[var(--bg-page)] transition-colors">
                        <td className="px-6 py-4 font-medium text-[var(--text-primary)]">{owner.name}</td>
                        <td className="px-6 py-4 text-[var(--text-secondary)]">{owner.email}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                            owner.status === 'Active' ? 'bg-[var(--success-bg)] text-[var(--success)]' :
                            owner.status === 'Pending' ? 'bg-[var(--warning-bg)] text-[var(--warning)]' :
                            'bg-[var(--danger-bg)] text-[var(--danger)]'
                          }`}>
                            {owner.status.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Link href="/superadmin/owners" className="text-[var(--primary)] font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-[var(--primary)] rounded px-2 py-1">View</Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-8 text-center text-[var(--text-secondary)]">No owners have been added yet.</div>
            )}
          </div>

          {/* 13. Property Summary */}
          <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl shadow-sm overflow-hidden flex flex-col">
            <div className="p-6 border-b border-[var(--border)] flex justify-between items-center">
              <h3 className="font-bold text-lg text-[var(--text-primary)]">Recent Properties</h3>
            </div>
            {data.recentProperties.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left whitespace-nowrap">
                  <thead className="bg-[var(--bg-page)] text-[var(--text-secondary)] uppercase text-xs">
                    <tr>
                      <th className="px-6 py-4 font-semibold">Property</th>
                      <th className="px-6 py-4 font-semibold">Owner</th>
                      <th className="px-6 py-4 font-semibold">Rooms / Beds</th>
                      <th className="px-6 py-4 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border)]">
                    {data.recentProperties.map((prop) => (
                      <tr key={prop.id} className="hover:bg-[var(--bg-page)] transition-colors">
                        <td className="px-6 py-4 font-medium text-[var(--text-primary)]">{prop.name}</td>
                        <td className="px-6 py-4 text-[var(--text-secondary)]">{prop.ownerName}</td>
                        <td className="px-6 py-4 text-[var(--text-secondary)]">{prop.roomCount} Rooms / {prop.bedCount} Beds</td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                            prop.status === 'Active' ? 'bg-[var(--success-bg)] text-[var(--success)]' :
                            'bg-[var(--danger-bg)] text-[var(--danger)]'
                          }`}>
                            {prop.status.toUpperCase()}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-8 text-center text-[var(--text-secondary)]">No PG properties have been added yet.</div>
            )}
          </div>

        </div>

        {/* Right Sidebar */}
        <div className="space-y-6 xl:col-span-1">
          
          {/* 10. Support / Ticket Summary */}
          <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl shadow-sm p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--danger-bg)] rounded-bl-full -mr-4 -mt-4 opacity-50 transition-transform group-hover:scale-110"></div>
            <h3 className="font-bold text-lg text-[var(--text-primary)] flex items-center gap-2 mb-4 relative z-10">
              <Ticket className="w-5 h-5 text-[var(--danger)]" /> Support Overview
            </h3>
            
            <div className="flex flex-col gap-3 relative z-10">
              <div className="flex items-center justify-between p-3 rounded-lg border border-[var(--border)] bg-[var(--bg-page)] shadow-sm">
                 <span className="text-sm font-medium text-[var(--text-secondary)]">Open Tickets</span>
                 <span className="font-bold text-[var(--text-primary)]">{data.openTicketsCount}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border border-[var(--border)] bg-[var(--bg-page)] shadow-sm">
                 <span className="text-sm font-medium text-[var(--text-secondary)]">Pending</span>
                 <span className="font-bold text-[var(--text-primary)]">{data.pendingTicketsCount}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border border-[var(--border)] bg-[var(--bg-page)] shadow-sm">
                 <span className="text-sm font-medium text-[var(--text-secondary)]">Resolved</span>
                 <span className="font-bold text-[var(--text-primary)]">{data.resolvedTicketsCount}</span>
              </div>
              <Link href="/superadmin/tickets" className="mt-3 text-sm text-[var(--primary)] font-medium text-center hover:underline focus:outline-none focus:ring-2 focus:ring-[var(--primary)] rounded py-1">
                 View Support Center
              </Link>
            </div>
          </div>

          {/* 11. Quick Actions */}
          <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl shadow-sm p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--info-bg)] rounded-bl-full -mr-4 -mt-4 opacity-50 transition-transform group-hover:scale-110"></div>
            <h3 className="font-bold text-lg text-[var(--text-primary)] flex items-center gap-2 mb-4 relative z-10">
              <Zap className="w-5 h-5 text-[var(--info)]" /> Quick Actions
            </h3>
            
            <div className="space-y-3 relative z-10">
              <Link href="/superadmin/create-owner" className="flex items-center justify-between p-3 rounded-lg border border-[var(--border)] hover:border-[var(--primary)] hover:bg-[var(--primary-subtle)] transition-colors group focus:outline-none focus:ring-2 focus:ring-[var(--primary)]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-md bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)]">
                    <PlusCircle className="w-4 h-4" />
                  </div>
                  <span className="font-medium text-sm text-[var(--text-primary)]">Add Owner</span>
                </div>
                <ArrowRight className="w-4 h-4 text-[var(--text-secondary)] group-hover:text-[var(--primary)] group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link href="/superadmin/owners" className="flex items-center justify-between p-3 rounded-lg border border-[var(--border)] hover:border-[var(--primary)] hover:bg-[var(--primary-subtle)] transition-colors group focus:outline-none focus:ring-2 focus:ring-[var(--primary)]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-md bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)]">
                    <Users className="w-4 h-4" />
                  </div>
                  <span className="font-medium text-sm text-[var(--text-primary)]">View Owners</span>
                </div>
                <ArrowRight className="w-4 h-4 text-[var(--text-secondary)] group-hover:text-[var(--primary)] group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link href="/superadmin/settings" className="flex items-center justify-between p-3 rounded-lg border border-[var(--border)] hover:border-[var(--primary)] hover:bg-[var(--primary-subtle)] transition-colors group focus:outline-none focus:ring-2 focus:ring-[var(--primary)]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-md bg-[var(--primary)]/10 flex items-center justify-center text-[var(--primary)]">
                    <Settings className="w-4 h-4" />
                  </div>
                  <span className="font-medium text-sm text-[var(--text-primary)]">System Settings</span>
                </div>
                <ArrowRight className="w-4 h-4 text-[var(--text-secondary)] group-hover:text-[var(--primary)] group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* 8. Recent Activity */}
          <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl shadow-sm p-6">
            <h3 className="font-bold text-lg text-[var(--text-primary)] flex items-center gap-2 mb-4">
              <Activity className="w-5 h-5 text-[var(--text-secondary)]" /> Recent Activity
            </h3>
            
            {data.recentActivity.length > 0 ? (
              <div className="space-y-4">
                {data.recentActivity.slice(0, 5).map((log) => (
                  <div key={log.id} className="flex gap-3 relative before:absolute before:left-4 before:top-8 before:bottom-0 before:w-0.5 before:-ml-px before:bg-[var(--border)] last:before:hidden">
                    <div className="w-8 h-8 shrink-0 rounded-full bg-[var(--bg-page)] border border-[var(--border)] flex items-center justify-center z-10 shadow-sm">
                      <FileText className="w-4 h-4 text-[var(--text-secondary)]" />
                    </div>
                    <div className="flex-1 pb-4">
                      <p className="text-sm font-medium text-[var(--text-primary)]">{log.action}</p>
                      <p className="text-xs text-[var(--text-secondary)] mt-1 leading-relaxed">{log.details}</p>
                      <p className="text-[10px] font-semibold text-[var(--text-disabled)] mt-2 uppercase tracking-wide">{new Date(log.createdAt).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
                {data.recentActivity.length > 5 && (
                  <Link href="/superadmin/audit-logs" className="block w-full text-center text-sm font-medium text-[var(--primary)] hover:underline pt-4 border-t border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] rounded py-1">
                    View all activity
                  </Link>
                )}
              </div>
            ) : (
               <div className="text-center py-8 text-sm text-[var(--text-secondary)]">No recent activity.</div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
