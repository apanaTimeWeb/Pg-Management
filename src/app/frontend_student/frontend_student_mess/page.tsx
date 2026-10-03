'use client';

import React from 'react';
import { 
  Utensils, Download, Edit3, Plus, Search, Info, MessageSquareWarning, CalendarOff, Utensils, AlertCircle, CheckCircle2
} from 'lucide-react';

export default function StudentMessFoodPage() {
  
  return (
    <div className="p-4 md:p-8 space-y-6 animate-in fade-in duration-500 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-card p-6 rounded-2xl shadow-sm border border-border/50">
        <div>
          <h1 className="text-2xl font-black text-primary flex items-center gap-3">
            <div className="p-2.5 bg-blue-100 rounded-xl text-blue-600">
              <Utensils className="w-6 h-6"/>
            </div>
            Mess & Food
          </h1>
          <p className="text-[var(--text-disabled)] text-sm mt-2 font-medium">Check the weekly food menu and meal timings.</p>
        </div>
        
        <div className="flex items-center gap-3">
          
            <button className="flex items-center gap-2 bg-card hover:bg-page border border-border text-primary px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-colors">
              <Edit3 className="w-4 h-4" /> Options
            </button>
    
        </div>
      </div>

      {/* Dynamic Content Based on Page */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Main Info Card */}
        <div className="md:col-span-8 bg-card rounded-2xl shadow-sm border border-border/50 overflow-hidden">
          <div className="p-6 border-b border-border/50 bg-page/30 flex items-center justify-between">
            <h3 className="font-bold text-primary flex items-center gap-2">
              <Info className="w-5 h-5 text-blue-500"/>
              Mess & Food Overview
            </h3>
          </div>
          <div className="p-6">
            
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl mb-4 text-center">
                  <h3 className="font-bold text-blue-800 text-lg">Today's Special</h3>
                  <p className="text-blue-600 font-medium">Paneer Butter Masala & Naan</p>
                </div>
                {['Breakfast (8:00 AM)', 'Lunch (1:00 PM)', 'Dinner (8:30 PM)'].map((meal, i) => (
                  <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-page rounded-xl border border-border">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-card rounded-lg border border-border"><Utensils className="w-5 h-5 text-secondary"/></div>
                      <p className="font-bold text-primary text-sm">{meal}</p>
                    </div>
                    <button className="mt-2 sm:mt-0 text-sm font-semibold text-blue-600 hover:underline">View Menu</button>
                  </div>
                ))}
              </div>
    
          </div>
        </div>

        {/* Sidebar Card */}
        <div className="md:col-span-4 bg-gradient-to-br from-[#1A3A5C] to-[#122a42] rounded-2xl shadow-lg border border-blue-800 p-6 text-white h-max">
          <h3 className="font-bold mb-4 flex items-center gap-2 opacity-90"><AlertCircle className="w-5 h-5"/> Notice Board</h3>
          <div className="space-y-4">
            <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/5">
              <p className="text-xs uppercase font-bold text-blue-200 mb-1">Upcoming Event</p>
              <h3 className="text-sm font-bold">Diwali Celebration</h3>
              <p className="text-xs text-blue-200 mt-1">Check the mess menu for special dinner details.</p>
            </div>
            <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/5">
              <p className="text-xs uppercase font-bold text-blue-200 mb-1">Rules Reminder</p>
              <p className="text-xs text-blue-200">Main gate closes at 10:30 PM. Please apply for a night out if you will be late.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
