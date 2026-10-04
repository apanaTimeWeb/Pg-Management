'use client';

import React from 'react';
import { 
  AlertTriangle, 
  ChefHat, 
  ListTodo, 
  Utensils, 
  AlertCircle, 
  MessageSquareWarning, 
  PackageMinus, 
  Activity,
  Flame,
  CheckSquare,
  UtensilsCrossed,
  Calculator,
  DatabaseZap,
  Trash2,
  ChevronRight,
  TrendingDown,
  Info,
  Clock,
  Menu
} from 'lucide-react';
import Link from 'next/link';

export default function CookDashboard() {
  return (
    <div className="w-full space-y-6">
      
      {/* Header & Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary/10 rounded-xl">
            <ChefHat className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-primary tracking-tight">Cook Dashboard</h1>
            <p className="text-sm font-medium text-secondary">Welcome back. Here is your kitchen overview for today.</p>
          </div>
        </div>
        <div className="text-right hidden sm:block">
          <p className="text-sm font-bold text-primary">04 Oct 2026, Tuesday</p>
          <p className="text-xs font-semibold text-green-600 flex items-center justify-end gap-1">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Kitchen Active
          </p>
        </div>
      </div>

      {/* Important Alerts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-start gap-3 shadow-sm">
          <Clock className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-bold text-blue-800">Breakfast prep starts soon</h4>
            <p className="text-xs font-medium text-blue-600/80">Scheduled at 06:30 AM</p>
          </div>
        </div>
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 flex items-start gap-3 shadow-sm">
          <DatabaseZap className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-bold text-orange-800">Low Rice & Oil Stock</h4>
            <p className="text-xs font-medium text-orange-600/80">Check inventory immediately</p>
          </div>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex items-start gap-3 shadow-sm">
          <UtensilsCrossed className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-bold text-yellow-800">Special Meal Requested</h4>
            <p className="text-xs font-medium text-yellow-600/80">1 Jain meal added for Lunch</p>
          </div>
        </div>
        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-3 flex items-start gap-3 shadow-sm">
          <Menu className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-bold text-indigo-800">Lunch Menu Changed</h4>
            <p className="text-xs font-medium text-indigo-600/80">Manager updated menu 1hr ago</p>
          </div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-3 shadow-sm">
          <MessageSquareWarning className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-bold text-red-800">New Food Complaint</h4>
            <p className="text-xs font-medium text-red-600/80">Action required on Taste issue</p>
          </div>
        </div>
        <div className="bg-page border border-border rounded-lg p-3 flex items-start gap-3 shadow-sm hover:bg-page/50 transition-colors cursor-pointer">
          <ListTodo className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-bold text-primary">Kitchen Task Pending</h4>
            <p className="text-xs font-medium text-secondary">Clean storage area by 10 AM</p>
          </div>
        </div>
      </div>

      {/* Main Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-xl p-5 shadow-sm hover:border-primary/40 transition-colors">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 rounded-lg text-blue-600"><Utensils className="w-5 h-5" /></div>
            <span className="text-xs font-bold text-secondary uppercase tracking-wider">Meals Today</span>
          </div>
          <div className="flex items-end gap-2">
            <h3 className="text-3xl font-black text-primary">210</h3>
            <span className="text-xs font-medium text-secondary mb-1">Expected</span>
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-5 shadow-sm hover:border-primary/40 transition-colors">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-orange-100 rounded-lg text-orange-600"><DatabaseZap className="w-5 h-5" /></div>
            <span className="text-xs font-bold text-secondary uppercase tracking-wider">Low Stock</span>
          </div>
          <div className="flex items-end gap-2">
            <h3 className="text-3xl font-black text-orange-600">4</h3>
            <span className="text-xs font-medium text-secondary mb-1">Items</span>
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-5 shadow-sm hover:border-primary/40 transition-colors">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-red-100 rounded-lg text-red-600"><MessageSquareWarning className="w-5 h-5" /></div>
            <span className="text-xs font-bold text-secondary uppercase tracking-wider">Complaints</span>
          </div>
          <div className="flex items-end gap-2">
            <h3 className="text-3xl font-black text-red-600">2</h3>
            <span className="text-xs font-medium text-secondary mb-1">Open</span>
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-5 shadow-sm hover:border-primary/40 transition-colors">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-100 rounded-lg text-green-600"><CheckSquare className="w-5 h-5" /></div>
            <span className="text-xs font-bold text-secondary uppercase tracking-wider">Tasks</span>
          </div>
          <div className="flex items-end gap-2">
            <h3 className="text-3xl font-black text-primary">1/3</h3>
            <span className="text-xs font-medium text-secondary mb-1">Completed</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Today's Menu & Status */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-border bg-page/30 flex items-center justify-between">
              <h2 className="text-base font-bold text-primary flex items-center gap-2">
                <Menu className="w-5 h-5 text-primary" /> Today's Menu & Status
              </h2>
              <Link href="/frontend_cook/todays_kitchen" className="text-xs font-bold text-blue-600 hover:underline">Go to Kitchen View</Link>
            </div>
            
            <div className="divide-y divide-border">
              {/* Breakfast */}
              <div className="p-4 hover:bg-page/20 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-black">BF</div>
                  <div>
                    <h3 className="font-bold text-primary">Kanda Poha & Tea</h3>
                    <p className="text-xs font-medium text-secondary flex items-center gap-1 mt-0.5">
                      <Calculator className="w-3.5 h-3.5" /> Expected: <strong className="text-primary">72 Plates</strong>
                    </p>
                  </div>
                </div>
                <div className="flex flex-col sm:items-end gap-1">
                  <span className="px-2.5 py-1 text-xs font-bold rounded-md border bg-green-100 text-green-700 border-green-200 w-fit">
                    Prepared (Ready)
                  </span>
                  <Link href="/frontend_cook/todays_kitchen" className="text-[10px] font-bold text-secondary hover:text-primary">Update Status &rarr;</Link>
                </div>
              </div>

              {/* Lunch */}
              <div className="p-4 hover:bg-page/20 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-black">L</div>
                  <div>
                    <h3 className="font-bold text-primary">Rice, Dal, Sabzi, Roti</h3>
                    <p className="text-xs font-medium text-secondary flex items-center gap-1 mt-0.5">
                      <Calculator className="w-3.5 h-3.5" /> Expected: <strong className="text-primary">68 Plates</strong>
                    </p>
                  </div>
                </div>
                <div className="flex flex-col sm:items-end gap-1">
                  <span className="px-2.5 py-1 text-xs font-bold rounded-md border bg-orange-100 text-orange-700 border-orange-200 w-fit animate-pulse">
                    In Preparation
                  </span>
                  <Link href="/frontend_cook/todays_kitchen" className="text-[10px] font-bold text-secondary hover:text-primary">Update Status &rarr;</Link>
                </div>
              </div>

              {/* Dinner */}
              <div className="p-4 hover:bg-page/20 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-black">D</div>
                  <div>
                    <h3 className="font-bold text-primary">Roti, Paneer, Salad</h3>
                    <p className="text-xs font-medium text-secondary flex items-center gap-1 mt-0.5">
                      <Calculator className="w-3.5 h-3.5" /> Expected: <strong className="text-primary">70 Plates</strong>
                    </p>
                  </div>
                </div>
                <div className="flex flex-col sm:items-end gap-1">
                  <span className="px-2.5 py-1 text-xs font-bold rounded-md border bg-page text-secondary border-border w-fit">
                    Pending
                  </span>
                  <Link href="/frontend_cook/todays_kitchen" className="text-[10px] font-bold text-secondary hover:text-primary">Update Status &rarr;</Link>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions Grid */}
          <div>
            <h3 className="text-sm font-bold text-secondary uppercase tracking-wider mb-3">Quick Actions</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <Link href="/frontend_cook/menu/create" className="bg-card border border-border hover:border-primary hover:shadow-md p-4 rounded-xl flex flex-col items-center justify-center gap-2 text-center transition-all group">
                <div className="p-2 bg-page rounded-full group-hover:bg-primary/10 text-primary transition-colors"><Menu className="w-5 h-5" /></div>
                <span className="text-xs font-bold text-primary">Update Menu</span>
              </Link>
              <Link href="/frontend_cook/todays_kitchen" className="bg-card border border-border hover:border-blue-500 hover:shadow-md p-4 rounded-xl flex flex-col items-center justify-center gap-2 text-center transition-all group">
                <div className="p-2 bg-page rounded-full group-hover:bg-blue-100 text-blue-600 transition-colors"><Flame className="w-5 h-5" /></div>
                <span className="text-xs font-bold text-primary">Start Prep</span>
              </Link>
              <Link href="/frontend_cook/meals/count" className="bg-card border border-border hover:border-orange-500 hover:shadow-md p-4 rounded-xl flex flex-col items-center justify-center gap-2 text-center transition-all group">
                <div className="p-2 bg-page rounded-full group-hover:bg-orange-100 text-orange-600 transition-colors"><Calculator className="w-5 h-5" /></div>
                <span className="text-xs font-bold text-primary">Meal Count</span>
              </Link>
              <Link href="/frontend_cook/inventory/out" className="bg-card border border-border hover:border-indigo-500 hover:shadow-md p-4 rounded-xl flex flex-col items-center justify-center gap-2 text-center transition-all group">
                <div className="p-2 bg-page rounded-full group-hover:bg-indigo-100 text-indigo-600 transition-colors"><PackageMinus className="w-5 h-5" /></div>
                <span className="text-xs font-bold text-primary">Record Usage</span>
              </Link>
              <Link href="/frontend_cook/wastage" className="bg-card border border-border hover:border-red-500 hover:shadow-md p-4 rounded-xl flex flex-col items-center justify-center gap-2 text-center transition-all group">
                <div className="p-2 bg-page rounded-full group-hover:bg-red-100 text-red-600 transition-colors"><Trash2 className="w-5 h-5" /></div>
                <span className="text-xs font-bold text-primary">Log Wastage</span>
              </Link>
              <Link href="/frontend_cook/tasks" className="bg-card border border-border hover:border-green-500 hover:shadow-md p-4 rounded-xl flex flex-col items-center justify-center gap-2 text-center transition-all group">
                <div className="p-2 bg-page rounded-full group-hover:bg-green-100 text-green-600 transition-colors"><CheckSquare className="w-5 h-5" /></div>
                <span className="text-xs font-bold text-primary">Kitchen Tasks</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column: Mini Widgets */}
        <div className="space-y-6">
          
          {/* Daily Schedule Quick View */}
          <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-border bg-page/30">
              <h2 className="text-sm font-bold text-primary flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" /> Today's Schedule
              </h2>
            </div>
            <div className="p-4 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                <div className="flex-1">
                  <p className="text-xs font-bold text-primary">07:30 AM - Breakfast</p>
                  <p className="text-[10px] text-secondary font-medium">Service completed</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></div>
                <div className="flex-1">
                  <p className="text-xs font-bold text-primary">01:00 PM - Lunch</p>
                  <p className="text-[10px] text-secondary font-medium">In preparation</p>
                </div>
              </div>
              <div className="flex items-center gap-3 opacity-50">
                <div className="w-1.5 h-1.5 rounded-full bg-secondary"></div>
                <div className="flex-1">
                  <p className="text-xs font-bold text-primary">05:00 PM - Snacks</p>
                  <p className="text-[10px] text-secondary font-medium">Upcoming</p>
                </div>
              </div>
              <div className="flex items-center gap-3 opacity-50">
                <div className="w-1.5 h-1.5 rounded-full bg-secondary"></div>
                <div className="flex-1">
                  <p className="text-xs font-bold text-primary">08:30 PM - Dinner</p>
                  <p className="text-[10px] text-secondary font-medium">Upcoming</p>
                </div>
              </div>
            </div>
          </div>

          {/* Pending Tasks */}
          <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-border bg-page/30 flex justify-between items-center">
              <h2 className="text-sm font-bold text-primary flex items-center gap-2">
                <ListTodo className="w-4 h-4 text-primary" /> Today's Tasks
              </h2>
              <Link href="/frontend_cook/tasks" className="text-[10px] font-bold text-blue-600 hover:underline">View All</Link>
            </div>
            <div className="divide-y divide-border">
              <div className="p-3 flex items-start gap-3 hover:bg-page/30 transition-colors">
                <input type="checkbox" className="mt-1" />
                <div>
                  <p className="text-xs font-bold text-primary">Clean Storage Area</p>
                  <p className="text-[10px] text-secondary font-medium mt-0.5 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-red-500" /> Overdue (10:00 AM)
                  </p>
                </div>
              </div>
              <div className="p-3 flex items-start gap-3 hover:bg-page/30 transition-colors">
                <input type="checkbox" className="mt-1" />
                <div>
                  <p className="text-xs font-bold text-primary">Receive Veg Delivery</p>
                  <p className="text-[10px] text-secondary font-medium mt-0.5">Manager assigned</p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
