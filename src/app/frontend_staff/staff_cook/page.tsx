'use client';

import React from 'react';
import { 
  Bell, Home, User, CheckSquare, Wrench, Package, Utensils
} from 'lucide-react';

export default function KitchenMenuPage() {
  
  return (
    <div className="p-4 md:p-8 space-y-6 animate-in fade-in duration-500 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-primary flex items-center gap-3">
            <div className="p-2 bg-slate-800 rounded-xl text-slate-100">
              <Utensils className="w-6 h-6"/>
            </div>
            Kitchen & Menu
          </h1>
          <p className="text-[var(--text-disabled)] text-sm mt-1 font-medium">Manage kitchen & menu at Smart PG.</p>
        </div>
      </div>

      {/* Content View */}
      <div className="bg-card border border-border/60 rounded-2xl shadow-sm overflow-hidden p-6">
        
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl">
            <h3 className="font-bold text-blue-900 mb-1">Today's Headcount</h3>
            <p className="text-3xl font-black text-blue-700">45 <span className="text-sm font-medium text-blue-600">students dining today</span></p>
          </div>
          
          <h3 className="font-bold text-primary mt-6 mb-4">Preparation Schedule</h3>
          {[
            { meal: 'Breakfast', dish: 'Poha & Jalebi', time: '08:00 AM', status: 'Prepared' },
            { meal: 'Lunch', dish: 'Rajma Chawal', time: '01:00 PM', status: 'Cooking' },
            { meal: 'Dinner', dish: 'Roti, Dal Tadka', time: '08:30 PM', status: 'Pending' }
          ].map((meal, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-page rounded-xl border border-border">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-card rounded-lg border border-border"><Utensils className="w-5 h-5 text-secondary"/></div>
                <div>
                  <p className="font-bold text-primary text-sm">{meal.meal}: {meal.dish}</p>
                  <p className="text-xs text-secondary mt-0.5">Serve at {meal.time}</p>
                </div>
              </div>
              <div>
                <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase ${meal.status === 'Prepared' ? 'bg-green-100 text-green-700' : meal.status === 'Cooking' ? 'bg-orange-100 text-orange-700' : 'bg-gray-200 text-gray-700'}`}>{meal.status}</span>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </div>
  );
}
