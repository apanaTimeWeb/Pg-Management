// RESPONSIBILITY: Renders the SuperAdminOwnerProfileMain component.
import React from 'react';
import { Building2, FileText, Ticket } from 'lucide-react';
import { Owner360Data } from '@/app/superadmin/owners/SuperAdminOwners_types/SuperAdminOwners.types';

export const SuperAdminOwnerProfileMain: React.FC<{ data: Owner360Data }> = ({ data }) => {
  const { subscription, properties, recentPayments, tickets } = data;

  return (
    <div className="space-y-6">
      {/* Plan Usage KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-lg,12px)] p-5 shadow-sm text-center flex flex-col justify-center">
          <div className="text-[11px] font-medium text-[var(--text-secondary)] uppercase tracking-wider mb-2">Properties</div>
          <div className="text-[28px] font-bold text-[var(--text-primary)]">
            {properties.length} <span className="text-lg text-[var(--text-disabled)]">/ {subscription?.maxProperties || 0}</span>
          </div>
        </div>
        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-lg,12px)] p-5 shadow-sm text-center flex flex-col justify-center">
          <div className="text-[11px] font-medium text-[var(--text-secondary)] uppercase tracking-wider mb-2">Total Students</div>
          <div className="text-[28px] font-bold text-[var(--text-primary)]">
            {data.studentsCount} <span className="text-lg text-[var(--text-disabled)]">/ {subscription?.maxBeds || 0}</span>
          </div>
        </div>
        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-lg,12px)] p-5 shadow-sm text-center flex flex-col justify-center">
          <div className="text-[11px] font-medium text-[var(--text-secondary)] uppercase tracking-wider mb-2">Staff/Managers</div>
          <div className="text-[28px] font-bold text-[var(--text-primary)]">
            {data.managersCount} <span className="text-lg text-[var(--text-disabled)]">/ {subscription?.maxStaff || 0}</span>
          </div>
        </div>
      </div>

      {/* Properties List */}
      <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-lg,12px)] shadow-sm overflow-hidden">
        <div className="bg-[var(--bg-page)] border-b border-[var(--border)] p-4 flex items-center gap-2">
          <Building2 className="w-4 h-4 text-[var(--primary)]" />
          <h2 className="font-semibold text-[var(--text-primary)] text-[14px]">Owner's PGs</h2>
        </div>
        <div className="divide-y divide-[var(--border)]">
          {properties.length === 0 ? (
            <div className="p-6 text-center text-[var(--text-secondary)] text-sm">No properties created yet.</div>
          ) : (
            properties.map((p: any) => (
              <div key={p.id} className="p-4 flex items-center justify-between hover:bg-[var(--primary-subtle)] transition-colors">
                <div>
                  <div className="font-medium text-[var(--text-primary)]">{p.name}</div>
                  <div className="text-[12px] text-[var(--text-secondary)]">{p.city} • {p.managers} Staff</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-[var(--text-primary)]">{p.occupied} / {p.capacity}</div>
                  <div className="text-[11px] text-[var(--success)]">Occupied</div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Payments */}
        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-lg,12px)] shadow-sm overflow-hidden flex flex-col">
          <div className="bg-[var(--bg-page)] border-b border-[var(--border)] p-4 flex items-center gap-2 shrink-0">
            <FileText className="w-4 h-4 text-[var(--success)]" />
            <h2 className="font-semibold text-[var(--text-primary)] text-[14px]">Platform Payments</h2>
          </div>
          <div className="divide-y divide-[var(--border)] flex-1 overflow-y-auto max-h-[300px] custom-scrollbar">
            {recentPayments.length === 0 ? (
              <div className="p-6 text-center text-[var(--text-secondary)] text-sm">No payments recorded.</div>
            ) : (
              recentPayments.map((p: any) => (
                <div key={p.id} className="p-4 flex items-center justify-between">
                  <div>
                    <div className="text-[12px] text-[var(--text-secondary)]">{new Date(p.date).toLocaleDateString()}</div>
                    <div className="text-[11px] font-medium text-[var(--text-primary)]">{p.mode}</div>
                  </div>
                  <div className="font-medium text-[var(--success)]">₹{p.amount.toLocaleString()}</div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Tickets */}
        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius-lg,12px)] shadow-sm overflow-hidden flex flex-col">
          <div className="bg-[var(--bg-page)] border-b border-[var(--border)] p-4 flex items-center gap-2 shrink-0">
            <Ticket className="w-4 h-4 text-[var(--danger)]" />
            <h2 className="font-semibold text-[var(--text-primary)] text-[14px]">Support Tickets</h2>
          </div>
          <div className="divide-y divide-[var(--border)] flex-1 overflow-y-auto max-h-[300px] custom-scrollbar">
            {tickets.length === 0 ? (
              <div className="p-6 text-center text-[var(--text-secondary)] text-sm">No support tickets found.</div>
            ) : (
              tickets.map((t: any) => (
                <div key={t.id} className="p-4 flex flex-col gap-1">
                  <div className="font-medium text-[var(--text-primary)] text-sm line-clamp-1" title={t.issue}>{t.issue}</div>
                  <div>
                    {t.status === 'Resolved' ? (
                      <span className="text-[10px] bg-[var(--success-bg)] text-[var(--success)] px-2 py-0.5 rounded-full font-bold uppercase border border-[var(--success)]">Resolved</span>
                    ) : (
                      <span className="text-[10px] bg-[var(--warning-bg)] text-[var(--warning)] px-2 py-0.5 rounded-full font-bold uppercase border border-[var(--warning)]">Open</span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
