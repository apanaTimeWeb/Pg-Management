'use client';

import React from 'react';
import { 
  Building2, Users, IndianRupee, Settings, AlertTriangle, 
  Bed, Wallet, UserCheck, UserPlus, LogIn, LogOut, 
  ShieldCheck, Coffee, Flame, Zap, ArrowUpRight, 
  ArrowDownRight, FileText, BellRing, User, Plus, 
  Utensils, LayoutGrid, CheckCircle2, TrendingUp, PieChart
} from 'lucide-react';
import Link from 'next/link';

export default function OwnerDashboardPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-800 tracking-tight">Command Center</h1>
          <p className="text-gray-500 text-sm mt-1 font-medium">Welcome back! Here is the live pulse of your PG Portfolio today.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-sm flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-sm font-bold text-gray-700">Live Data Sync Active</span>
          </div>
        </div>
      </div>

      {/* QUICK ACTIONS ROW (Scrollable) */}
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Fast-Travel Quick Actions</h3>
        <div className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar">
          <Link href="/frontend_owner/admissions/enquiries" className="flex flex-col items-center gap-2 p-3 min-w-[100px] hover:bg-blue-50 rounded-xl transition-colors border border-transparent hover:border-blue-100 group">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform"><UserPlus className="w-5 h-5"/></div>
            <span className="text-xs font-bold text-gray-700">Add Student</span>
          </Link>
          <Link href="/frontend_owner/rooms_beds/rooms" className="flex flex-col items-center gap-2 p-3 min-w-[100px] hover:bg-[#F5A623]/10 rounded-xl transition-colors border border-transparent hover:border-[#F5A623]/20 group">
            <div className="w-12 h-12 bg-[#F5A623]/20 text-[#d48c18] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform"><Bed className="w-5 h-5"/></div>
            <span className="text-xs font-bold text-gray-700">Allocate Bed</span>
          </Link>
          <Link href="/frontend_owner/fees_payments/rent" className="flex flex-col items-center gap-2 p-3 min-w-[100px] hover:bg-green-50 rounded-xl transition-colors border border-transparent hover:border-green-100 group">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform"><IndianRupee className="w-5 h-5"/></div>
            <span className="text-xs font-bold text-gray-700">Collect Rent</span>
          </Link>
          <Link href="/frontend_owner/accounts/expenses" className="flex flex-col items-center gap-2 p-3 min-w-[100px] hover:bg-red-50 rounded-xl transition-colors border border-transparent hover:border-red-100 group">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform"><Wallet className="w-5 h-5"/></div>
            <span className="text-xs font-bold text-gray-700">Add Expense</span>
          </Link>
          <Link href="/frontend_owner/mess_food" className="flex flex-col items-center gap-2 p-3 min-w-[100px] hover:bg-orange-50 rounded-xl transition-colors border border-transparent hover:border-orange-100 group">
            <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform"><Utensils className="w-5 h-5"/></div>
            <span className="text-xs font-bold text-gray-700">Create Menu</span>
          </Link>
          <Link href="/frontend_owner/staff/all" className="flex flex-col items-center gap-2 p-3 min-w-[100px] hover:bg-purple-50 rounded-xl transition-colors border border-transparent hover:border-purple-100 group">
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform"><User className="w-5 h-5"/></div>
            <span className="text-xs font-bold text-gray-700">Add Staff</span>
          </Link>
          <Link href="/frontend_owner/pg_management/buildings" className="flex flex-col items-center gap-2 p-3 min-w-[100px] hover:bg-indigo-50 rounded-xl transition-colors border border-transparent hover:border-indigo-100 group">
            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform"><Building2 className="w-5 h-5"/></div>
            <span className="text-xs font-bold text-gray-700">Add Room</span>
          </Link>
          <Link href="/frontend_owner/check_in_out" className="flex flex-col items-center gap-2 p-3 min-w-[100px] hover:bg-teal-50 rounded-xl transition-colors border border-transparent hover:border-teal-100 group">
            <div className="w-12 h-12 bg-teal-100 text-teal-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform"><LogIn className="w-5 h-5"/></div>
            <span className="text-xs font-bold text-gray-700">Check-in</span>
          </Link>
        </div>
      </div>

      {/* MEGA METRICS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Real Estate & Occupancy */}
        <div className="bg-gradient-to-br from-[#1A3A5C] to-blue-800 rounded-2xl p-5 text-white shadow-lg relative overflow-hidden">
          <Building2 className="absolute -right-4 -bottom-4 w-24 h-24 text-white/10" />
          <h3 className="text-blue-200 text-xs font-bold uppercase tracking-wider mb-4 flex items-center gap-2"><LayoutGrid className="w-4 h-4"/> Rooms & Beds</h3>
          <div className="grid grid-cols-2 gap-y-4">
            <div><p className="text-blue-200 text-xs">Total Beds</p><p className="text-2xl font-black">250</p></div>
            <div><p className="text-blue-200 text-xs">Occupied</p><p className="text-2xl font-black text-green-300">210</p></div>
            <div><p className="text-blue-200 text-xs">Available</p><p className="text-lg font-bold">35</p></div>
            <div><p className="text-blue-200 text-xs">Maintenance</p><p className="text-lg font-bold text-orange-300">5</p></div>
          </div>
          <div className="mt-4 pt-3 border-t border-white/20 flex justify-between items-center text-xs font-semibold text-blue-100">
            <span>84% Overall Occupancy</span>
            <span>60 Rooms Total</span>
          </div>
        </div>

        {/* Student Stats */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200 relative overflow-hidden">
          <Users className="absolute -right-4 -bottom-4 w-24 h-24 text-gray-50" />
          <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-4 flex items-center gap-2"><UserCheck className="w-4 h-4 text-blue-500"/> Student Base</h3>
          <div className="grid grid-cols-2 gap-y-4 relative z-10">
            <div><p className="text-gray-500 text-xs font-bold">Total Active</p><p className="text-2xl font-black text-gray-800">210</p></div>
            <div><p className="text-gray-500 text-xs font-bold">Pending Adm.</p><p className="text-2xl font-black text-[#F5A623]">8</p></div>
            <div><p className="text-gray-500 text-xs font-bold">On Notice</p><p className="text-lg font-bold text-orange-500">12</p></div>
            <div><p className="text-gray-500 text-xs font-bold">Check-outs Today</p><p className="text-lg font-bold text-red-500">2</p></div>
          </div>
          <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center text-xs font-bold text-blue-600">
            <span className="flex items-center gap-1"><LogIn className="w-3 h-3"/> +3 Check-ins Today</span>
          </div>
        </div>

        {/* Financial Pulse */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200 relative overflow-hidden border-t-4 border-t-green-500">
          <IndianRupee className="absolute -right-4 -bottom-4 w-24 h-24 text-green-50" />
          <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-4 flex items-center gap-2"><Wallet className="w-4 h-4 text-green-500"/> Financial Pulse</h3>
          <div className="grid grid-cols-2 gap-y-4 relative z-10">
            <div className="col-span-2"><p className="text-gray-500 text-xs font-bold">Rent Collected (Oct)</p><p className="text-3xl font-black text-green-600 flex items-center gap-2">₹4.2L <TrendingUp className="w-5 h-5 text-green-500"/></p></div>
            <div><p className="text-gray-500 text-xs font-bold">Overdue Dues</p><p className="text-lg font-bold text-red-600">₹85,500</p></div>
            <div><p className="text-gray-500 text-xs font-bold">Deposits Held</p><p className="text-lg font-bold text-gray-800">₹3.2L</p></div>
          </div>
        </div>

        {/* Ops & Kitchen */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200 relative overflow-hidden border-t-4 border-t-orange-400">
          <Coffee className="absolute -right-4 -bottom-4 w-24 h-24 text-orange-50" />
          <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-4 flex items-center gap-2"><Settings className="w-4 h-4 text-orange-500"/> Daily Operations</h3>
          <div className="grid grid-cols-2 gap-y-4 relative z-10">
            <div><p className="text-gray-500 text-xs font-bold">Open Complaints</p><p className="text-2xl font-black text-red-500">14</p></div>
            <div><p className="text-gray-500 text-xs font-bold">Maint. Pending</p><p className="text-2xl font-black text-orange-500">5</p></div>
            <div className="col-span-2">
              <p className="text-gray-500 text-xs font-bold mb-1">Today's Meals Prepared</p>
              <div className="flex gap-2">
                <span className="text-[10px] bg-orange-100 text-orange-800 font-bold px-2 py-1 rounded">BF: 190</span>
                <span className="text-[10px] bg-yellow-100 text-yellow-800 font-bold px-2 py-1 rounded">L: 150</span>
                <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-1 rounded">D: 205</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* CHARTS / ANALYTICS AREA (Mock Visualizations) */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Occupancy Chart Card */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-gray-800 flex items-center gap-2"><PieChart className="w-5 h-5 text-[#F5A623]"/> Real-time Occupancy</h3>
              </div>
              <div className="flex items-center justify-center h-48 relative">
                {/* CSS Mock Donut Chart */}
                <div className="w-32 h-32 rounded-full border-[16px] border-green-500 relative flex items-center justify-center">
                  <div className="absolute inset-[-16px] rounded-full border-[16px] border-gray-100" style={{ clipPath: 'polygon(50% 50%, 100% 0, 100% 100%, 80% 100%)' }}></div>
                  <div className="absolute inset-[-16px] rounded-full border-[16px] border-[#F5A623]" style={{ clipPath: 'polygon(50% 50%, 80% 100%, 0 100%, 0 80%)' }}></div>
                  <span className="text-2xl font-black text-gray-800">84%</span>
                </div>
              </div>
              <div className="flex justify-center gap-6 mt-2 text-xs font-bold text-gray-600">
                <span className="flex items-center gap-1"><div className="w-3 h-3 bg-green-500 rounded-sm"></div> Occupied</span>
                <span className="flex items-center gap-1"><div className="w-3 h-3 bg-gray-100 rounded-sm"></div> Vacant</span>
                <span className="flex items-center gap-1"><div className="w-3 h-3 bg-[#F5A623] rounded-sm"></div> Reserved</span>
              </div>
            </div>

            {/* Income vs Expense Chart Card */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-gray-800 flex items-center gap-2"><TrendingUp className="w-5 h-5 text-blue-500"/> Revenue vs Expenses</h3>
              </div>
              <div className="h-48 flex items-end justify-between px-4 gap-2 border-b border-l border-gray-200 pb-2">
                {/* Mock Bar Chart */}
                <div className="w-full flex justify-around items-end h-full">
                  <div className="flex gap-1 items-end h-[60%]"><div className="w-4 bg-green-500 rounded-t h-full"></div><div className="w-4 bg-red-400 rounded-t h-[40%]"></div></div>
                  <div className="flex gap-1 items-end h-[80%]"><div className="w-4 bg-green-500 rounded-t h-full"></div><div className="w-4 bg-red-400 rounded-t h-[50%]"></div></div>
                  <div className="flex gap-1 items-end h-[70%]"><div className="w-4 bg-green-500 rounded-t h-full"></div><div className="w-4 bg-red-400 rounded-t h-[30%]"></div></div>
                  <div className="flex gap-1 items-end h-[90%]"><div className="w-4 bg-green-500 rounded-t h-full"></div><div className="w-4 bg-red-400 rounded-t h-[45%]"></div></div>
                </div>
              </div>
              <div className="flex justify-between text-[10px] font-bold text-gray-400 mt-2 px-6">
                <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span>
              </div>
              <div className="flex justify-center gap-6 mt-4 text-xs font-bold text-gray-600">
                <span className="flex items-center gap-1"><div className="w-3 h-3 bg-green-500 rounded-sm"></div> Rent Collected</span>
                <span className="flex items-center gap-1"><div className="w-3 h-3 bg-red-400 rounded-sm"></div> Expenses</span>
              </div>
            </div>
          </div>

        </div>

        {/* ACTIONABLE ALERTS CENTER */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-red-200 relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-bl-[100px] -z-10"></div>
          <div className="flex justify-between items-center mb-5 pb-3 border-b border-gray-100">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <BellRing className="w-5 h-5 text-red-500 animate-bounce"/> Critical Action Alerts
            </h3>
            <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded-full">5 Issues</span>
          </div>

          <div className="space-y-4">
            
            <div className="flex items-start gap-3 p-3 bg-red-50 rounded-xl border border-red-100 hover:bg-red-100 cursor-pointer transition-colors">
              <Wallet className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-red-900">Rent Overdue (Critical)</h4>
                <p className="text-xs text-red-700 mt-1">12 students have not paid rent past the 5th of the month. Total pending: ₹85,500.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-xl border border-orange-100 hover:bg-orange-100 cursor-pointer transition-colors">
              <FileText className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-orange-900">Expiring Agreements</h4>
                <p className="text-xs text-orange-700 mt-1">4 student lease agreements are expiring within the next 15 days.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-xl border border-yellow-100 hover:bg-yellow-100 cursor-pointer transition-colors">
              <LogOut className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-yellow-900">Students Leaving Soon</h4>
                <p className="text-xs text-yellow-700 mt-1">3 students on notice period are checking out this weekend. Ensure inspections are scheduled.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-xl border border-blue-100 hover:bg-blue-100 cursor-pointer transition-colors">
              <Bed className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-blue-900">Empty Beds Revenue Loss</h4>
                <p className="text-xs text-blue-700 mt-1">35 beds are currently vacant. You have 8 pending admissions that can fill these slots.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-xl border border-purple-100 hover:bg-purple-100 cursor-pointer transition-colors">
              <Flame className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-purple-900">Low Kitchen Stock</h4>
                <p className="text-xs text-purple-700 mt-1">Rice and Cooking Oil are below the minimum threshold. Manager approval needed for purchase.</p>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
