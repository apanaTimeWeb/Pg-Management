'use client';

import React from 'react';
import { 
  Building2, 
  Users, 
  Wallet, 
  BedDouble,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  ArrowRight,
  UserPlus,
  ClipboardCheck,
  DoorOpen
} from 'lucide-react';
import Link from 'next/link';
import { useOwnerPropertyContext } from '@/app/frontend_owner/owner_components/OwnerPropertyContext';

export default function OwnerDashboard() {
  const { properties, selectedPropertyId } = useOwnerPropertyContext();

  const selectedProperty = selectedPropertyId === 'all' 
    ? { name: 'All Properties', location: 'Multiple Locations' } 
    : properties.find(p => p.id === selectedPropertyId);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* Dynamic Header based on Context */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3.5 bg-gradient-to-br from-[#1A3A5C] to-[#2D7D9A] rounded-2xl shadow-sm">
            <Building2 className="w-8 h-8 text-[#F5A623]" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-primary tracking-tight">
              {selectedProperty?.name || 'My Properties'}
            </h1>
            <p className="text-sm font-semibold text-secondary flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              {selectedPropertyId === 'all' ? 'Consolidated Overview' : `Property Context Active`}
            </p>
          </div>
        </div>
        
        <div className="flex gap-3">
          <Link href="/frontend_owner/admissions/enquiries" className="bg-card hover:bg-page border border-border text-primary px-4 py-2 rounded-xl text-sm font-bold shadow-sm flex items-center gap-2 transition-colors">
            <UserPlus className="w-4 h-4 text-blue-500" /> New Admission
          </Link>
          <Link href="/frontend_owner/fees_payments/rent" className="bg-[#1A3A5C] hover:bg-[#2D7D9A] text-white px-4 py-2 rounded-xl text-sm font-bold shadow-sm flex items-center gap-2 transition-colors">
            <Wallet className="w-4 h-4 text-[#F5A623]" /> Collect Rent
          </Link>
        </div>
      </div>

      {/* Main Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-2xl p-5 shadow-sm hover:border-blue-300 transition-colors group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-xl">
              <Users className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-md">+12 this month</span>
          </div>
          <div>
            <span className="block text-sm font-bold text-secondary uppercase tracking-wider mb-1">Active Students</span>
            <h3 className="text-3xl font-black text-primary group-hover:text-blue-600 transition-colors">
              {selectedPropertyId === 'all' ? '450' : '120'}
            </h3>
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-5 shadow-sm hover:border-purple-300 transition-colors group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2.5 bg-purple-50 dark:bg-purple-900/20 text-purple-600 rounded-xl">
              <BedDouble className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-secondary">85% Occupancy</span>
          </div>
          <div>
            <span className="block text-sm font-bold text-secondary uppercase tracking-wider mb-1">Available Beds</span>
            <h3 className="text-3xl font-black text-primary group-hover:text-purple-600 transition-colors">
              {selectedPropertyId === 'all' ? '65 / 515' : '12 / 132'}
            </h3>
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-5 shadow-sm hover:border-green-300 transition-colors group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2.5 bg-green-50 dark:bg-green-900/20 text-green-600 rounded-xl">
              <TrendingUp className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-md">Expected: ₹4.5L</span>
          </div>
          <div>
            <span className="block text-sm font-bold text-secondary uppercase tracking-wider mb-1">Revenue (This Month)</span>
            <h3 className="text-3xl font-black text-primary group-hover:text-green-600 transition-colors">
              ₹3,15,000
            </h3>
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-5 shadow-sm hover:border-red-300 transition-colors group">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2.5 bg-red-50 dark:bg-red-900/20 text-red-600 rounded-xl">
              <TrendingDown className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-red-600 bg-red-100 px-2 py-1 rounded-md">Pending Dues: ₹85k</span>
          </div>
          <div>
            <span className="block text-sm font-bold text-secondary uppercase tracking-wider mb-1">Total Expenses</span>
            <h3 className="text-3xl font-black text-primary group-hover:text-red-600 transition-colors">
              ₹1,42,000
            </h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Col: Admission & Student Pipeline */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
            <div className="p-5 border-b border-border bg-page/30 flex items-center justify-between">
              <h2 className="text-base font-bold text-primary flex items-center gap-2">
                <ClipboardCheck className="w-5 h-5 text-blue-600" /> Admission & Student Pipeline
              </h2>
              <Link href="/frontend_owner/admissions/enquiries" className="text-xs font-bold text-blue-600 hover:underline">View All</Link>
            </div>
            <div className="p-5">
              <div className="grid grid-cols-3 gap-4">
                <div className="border border-border rounded-xl p-4 text-center hover:bg-page transition-colors cursor-pointer">
                  <span className="text-3xl font-black text-blue-600 block mb-1">14</span>
                  <span className="text-xs font-bold text-secondary uppercase tracking-wider">New Enquiries</span>
                </div>
                <div className="border border-border rounded-xl p-4 text-center hover:bg-page transition-colors cursor-pointer">
                  <span className="text-3xl font-black text-orange-500 block mb-1">5</span>
                  <span className="text-xs font-bold text-secondary uppercase tracking-wider">Pending Verif.</span>
                </div>
                <div className="border border-border rounded-xl p-4 text-center hover:bg-page transition-colors cursor-pointer">
                  <span className="text-3xl font-black text-green-600 block mb-1">3</span>
                  <span className="text-xs font-bold text-secondary uppercase tracking-wider">Ready to Check-in</span>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-xs font-bold text-secondary uppercase tracking-wider mb-3">Recent Admission Activity</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-page rounded-xl border border-border">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">R</div>
                      <div>
                        <p className="text-sm font-bold text-primary">Rahul Verma</p>
                        <p className="text-xs text-secondary font-medium">Applied for Double Sharing (AC)</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded border bg-yellow-100 text-yellow-700 border-yellow-200">
                      Doc Verif Pending
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-page rounded-xl border border-border">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold">A</div>
                      <div>
                        <p className="text-sm font-bold text-primary">Amit Singh</p>
                        <p className="text-xs text-secondary font-medium">Room 102 Allocated</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded border bg-green-100 text-green-700 border-green-200">
                      Ready for Check-in
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Alerts & Operations */}
        <div className="space-y-6">
          
          <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
            <div className="p-5 border-b border-border bg-page/30">
              <h2 className="text-base font-bold text-primary flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-500" /> Action Required
              </h2>
            </div>
            <div className="divide-y divide-border">
              <Link href="/frontend_owner/complaints_maintenance/complaints" className="flex items-start gap-3 p-4 hover:bg-page transition-colors group">
                <div className="p-2 rounded-lg bg-red-100 text-red-600 mt-0.5"><AlertTriangle className="w-4 h-4" /></div>
                <div>
                  <h4 className="text-sm font-bold text-primary group-hover:text-red-600 transition-colors">4 Unresolved Complaints</h4>
                  <p className="text-xs text-secondary font-medium mt-1">2 High priority AC issues pending for 48 hrs.</p>
                </div>
              </Link>
              <Link href="/frontend_owner/fees_payments/dues" className="flex items-start gap-3 p-4 hover:bg-page transition-colors group">
                <div className="p-2 rounded-lg bg-orange-100 text-orange-600 mt-0.5"><Wallet className="w-4 h-4" /></div>
                <div>
                  <h4 className="text-sm font-bold text-primary group-hover:text-orange-600 transition-colors">15 Overdue Payments</h4>
                  <p className="text-xs text-secondary font-medium mt-1">Rent pending for over 5 days. Reminders sent.</p>
                </div>
              </Link>
              <Link href="/frontend_owner/students/notice_period" className="flex items-start gap-3 p-4 hover:bg-page transition-colors group">
                <div className="p-2 rounded-lg bg-blue-100 text-blue-600 mt-0.5"><DoorOpen className="w-4 h-4" /></div>
                <div>
                  <h4 className="text-sm font-bold text-primary group-hover:text-blue-600 transition-colors">3 Upcoming Check-outs</h4>
                  <p className="text-xs text-secondary font-medium mt-1">Deposit settlement required for Room 204, 301.</p>
                </div>
              </Link>
            </div>
            <div className="p-3 border-t border-border bg-page/30 text-center">
              <Link href="/frontend_owner/activity_audit" className="text-xs font-bold text-[#2D7D9A] hover:underline flex items-center justify-center gap-1">
                View All Audit Logs <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
