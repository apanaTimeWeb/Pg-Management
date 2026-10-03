import os

staff_pages = [
    {'path': 'src/app/frontend_staff/staff_dashboard/page.tsx', 'title': 'Staff Dashboard', 'icon': 'Home', 'type': 'dashboard'},
    {'path': 'src/app/frontend_staff/staff_tasks/page.tsx', 'title': 'Daily Tasks', 'icon': 'CheckSquare', 'type': 'tasks'},
    {'path': 'src/app/frontend_staff/staff_cook/page.tsx', 'title': 'Kitchen & Menu', 'icon': 'Utensils', 'type': 'cook'},
    {'path': 'src/app/frontend_staff/staff_stock/page.tsx', 'title': 'Stock & Inventory', 'icon': 'Package', 'type': 'stock'},
    {'path': 'src/app/frontend_staff/staff_alerts/page.tsx', 'title': 'Alerts', 'icon': 'Bell', 'type': 'alerts'}
]

def get_main_content(ptype):
    if ptype == 'tasks':
        return """
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-primary">Pending Maintenance</h3>
            <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-bold">2 Tasks Left</span>
          </div>
          {[
            { room: 'Room 102', issue: 'Clean bathroom', status: 'Pending', time: '10:00 AM' },
            { room: 'Room 304', issue: 'Fix AC leaking', status: 'Pending', time: '11:30 AM' }
          ].map((task, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-page rounded-xl border border-border">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-card rounded-lg border border-border"><Wrench className="w-5 h-5 text-orange-500"/></div>
                <div>
                  <p className="font-bold text-primary text-sm">{task.issue}</p>
                  <p className="text-xs text-secondary mt-0.5">{task.room} • {task.time}</p>
                </div>
              </div>
              <button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-bold shadow-sm transition-colors">
                Mark Done
              </button>
            </div>
          ))}
        </div>
        """
    elif ptype == 'cook':
        return """
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
        """
    elif ptype == 'stock':
        return """
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4">
             <h3 className="font-bold text-primary">Low Inventory Items</h3>
             <button className="text-sm text-blue-600 font-bold hover:underline">Request Stock</button>
          </div>
          {[
            { item: 'Rice (Basmati)', qty: '5 KG left', status: 'Critical' },
            { item: 'Broom/Mops', qty: '2 units left', status: 'Low' }
          ].map((stock, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-red-50 rounded-xl border border-red-100">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-red-100 rounded-lg"><Package className="w-5 h-5 text-red-600"/></div>
                <div>
                  <p className="font-bold text-red-900 text-sm">{stock.item}</p>
                  <p className="text-xs text-red-700 mt-0.5">{stock.qty}</p>
                </div>
              </div>
              <span className="text-[10px] font-bold text-red-700 bg-red-200 px-2 py-0.5 rounded uppercase">{stock.status}</span>
            </div>
          ))}
        </div>
        """
    elif ptype == 'alerts':
        return """
        <div className="space-y-4">
          <div className="flex items-start gap-4 p-5 bg-page border border-border rounded-xl">
             <div className="p-2 bg-blue-100 rounded-full shrink-0"><Bell className="w-5 h-5 text-blue-600" /></div>
             <div>
                <h4 className="font-bold text-primary text-sm">Manager Meeting</h4>
                <p className="text-xs text-secondary mt-1">All staff members are required to gather at the reception at 5:00 PM today.</p>
                <p className="text-[10px] text-blue-500 font-bold mt-2">1 hour ago</p>
             </div>
          </div>
        </div>
        """
    else:
        return """
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-card p-6 rounded-2xl border border-border shadow-sm text-center">
             <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
               <CheckSquare className="w-8 h-8 text-blue-600" />
             </div>
             <h3 className="font-bold text-primary text-lg">3 Tasks</h3>
             <p className="text-sm text-secondary mt-1">Pending today</p>
          </div>
          <div className="bg-card p-6 rounded-2xl border border-border shadow-sm text-center">
             <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
               <User className="w-8 h-8 text-green-600" />
             </div>
             <h3 className="font-bold text-primary text-lg">Present</h3>
             <p className="text-sm text-green-600 font-bold mt-1">Checked in at 07:00 AM</p>
          </div>
        </div>
        """

template_wrapper = """'use client';

import React from 'react';
import { 
  Bell, Home, User, CheckSquare, Wrench, Package, Utensils
} from 'lucide-react';

export default function {clean_title}Page() {
  
  return (
    <div className="p-4 md:p-8 space-y-6 animate-in fade-in duration-500 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-primary flex items-center gap-3">
            <div className="p-2 bg-slate-800 rounded-xl text-slate-100">
              <{icon} className="w-6 h-6"/>
            </div>
            {title}
          </h1>
          <p className="text-[var(--text-disabled)] text-sm mt-1 font-medium">Manage {title_lower} at Smart PG.</p>
        </div>
      </div>

      {/* Content View */}
      <div className="bg-card border border-border/60 rounded-2xl shadow-sm overflow-hidden p-6">
        {main_content}
      </div>
    </div>
  );
}
"""

for page in staff_pages:
    abs_path = os.path.abspath(page['path'])
    os.makedirs(os.path.dirname(abs_path), exist_ok=True)
    
    clean_title = ''.join(e for e in page['title'] if e.isalnum())
    main_content = get_main_content(page['type'])
    
    final_code = template_wrapper.replace('{clean_title}', clean_title)
    final_code = final_code.replace('{icon}', page['icon'])
    final_code = final_code.replace('{title}', page['title'])
    final_code = final_code.replace('{title_lower}', page['title'].lower())
    final_code = final_code.replace('{main_content}', main_content)
    
    with open(abs_path, 'w', encoding='utf-8') as f:
        f.write(final_code)
