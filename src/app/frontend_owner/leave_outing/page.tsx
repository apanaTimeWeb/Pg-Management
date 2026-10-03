'use client';
import React, { useState } from 'react';
import { Search, Filter, Plus, FileText, Download, Eye, CalendarCheck, Users, PlaneTakeoff, UtensilsCrossed, Package } from 'lucide-react';

export default function LeaveOutingPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary flex items-center gap-2"><PlaneTakeoff className="w-6 h-6 text-[#F5A623]"/> Leave & Outing</h1>
          <p className="text-[var(--text-disabled)] text-sm mt-1">Manage student leave requests and outings.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-[#1A3A5C] hover:bg-[#122a42] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-colors">
            <Plus className="w-4 h-4" /> New Record
          </button>
        </div>
      </div>

      <div className="bg-card border border-border/50 rounded-2xl shadow-sm overflow-hidden p-8 text-center">
        <div className="w-16 h-16 bg-page rounded-full flex items-center justify-center mx-auto mb-4 border border-border">
          <PlaneTakeoff className="w-8 h-8 text-secondary" />
        </div>
        <h3 className="text-lg font-bold text-primary">No Records Found</h3>
        <p className="text-secondary text-sm mt-1 max-w-sm mx-auto">There are currently no active records for leave & outing. Click the button above to add a new record.</p>
      </div>
    </div>
  );
}