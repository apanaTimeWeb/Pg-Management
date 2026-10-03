import os

parent_pages = [
    {'path': 'src/app/frontend_parent/parent_dashboard/page.tsx', 'title': 'Parent Dashboard', 'icon': 'Home', 'type': 'dashboard'},
    {'path': 'src/app/frontend_parent/parent_finance/page.tsx', 'title': 'Rent & Finance', 'icon': 'IndianRupee', 'type': 'finance'},
    {'path': 'src/app/frontend_parent/parent_alerts/page.tsx', 'title': 'Safety Alerts', 'icon': 'Bell', 'type': 'alerts'}
]

def get_main_content(ptype):
    if ptype == 'finance':
        return """
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-green-600 to-emerald-800 rounded-2xl p-6 text-white shadow-lg">
            <p className="text-sm font-bold text-green-100 uppercase tracking-wide">Pending Dues</p>
            <h2 className="text-4xl font-black mt-1 flex items-center">
              <IndianRupee className="w-8 h-8 mr-1" /> 0.00
            </h2>
            <p className="text-sm text-green-100 mt-2">All rent payments for the current semester are cleared.</p>
          </div>
          
          <h3 className="font-bold text-primary mt-6 mb-4">Payment History</h3>
          <div className="space-y-4">
            {[
              { month: 'October 2026', amount: '8,500', status: 'Paid', date: '01 Oct 2026' },
              { month: 'September 2026', amount: '8,500', status: 'Paid', date: '02 Sep 2026' }
            ].map((p, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-page rounded-xl border border-border">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-card rounded-lg border border-border"><IndianRupee className="w-5 h-5 text-secondary"/></div>
                  <div>
                    <p className="font-bold text-primary text-sm">{p.month} Rent</p>
                    <p className="text-xs text-secondary mt-0.5">Paid on {p.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-black text-primary">₹{p.amount}</p>
                  <span className="text-[10px] font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded uppercase">{p.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        """
    elif ptype == 'alerts':
        return """
        <div className="space-y-4">
          <div className="flex items-start gap-4 p-5 bg-red-50 border border-red-100 rounded-xl">
             <div className="p-2 bg-red-100 rounded-full shrink-0"><Bell className="w-5 h-5 text-red-600" /></div>
             <div>
                <h4 className="font-bold text-red-900 text-sm">Gate Pass Alert</h4>
                <p className="text-xs text-red-700 mt-1">Your ward requested a night-out pass for 15 Oct 2026. Please approve via the SMS link sent to your registered mobile number.</p>
                <p className="text-[10px] text-red-500 font-bold mt-2">2 hours ago</p>
             </div>
          </div>
          
          <div className="flex items-start gap-4 p-5 bg-blue-50 border border-blue-100 rounded-xl">
             <div className="p-2 bg-blue-100 rounded-full shrink-0"><Bell className="w-5 h-5 text-blue-600" /></div>
             <div>
                <h4 className="font-bold text-blue-900 text-sm">Monthly Attendance Report</h4>
                <p className="text-xs text-blue-700 mt-1">Your ward's attendance for September was 92%. They were marked absent on 3 days.</p>
                <p className="text-[10px] text-blue-500 font-bold mt-2">01 Oct 2026</p>
             </div>
          </div>
        </div>
        """
    else:
        return """
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-card p-6 rounded-2xl border border-border shadow-sm text-center flex flex-col items-center justify-center min-h-[200px]">
             <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
               <User className="w-8 h-8 text-blue-600" />
             </div>
             <h3 className="font-bold text-primary text-lg">Ward Profile</h3>
             <p className="text-sm text-secondary mt-1">Room 304, Alpha Building</p>
          </div>
          <div className="bg-card p-6 rounded-2xl border border-border shadow-sm text-center flex flex-col items-center justify-center min-h-[200px]">
             <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4">
               <CheckCircle2 className="w-8 h-8 text-green-600" />
             </div>
             <h3 className="font-bold text-primary text-lg">Today's Attendance</h3>
             <p className="text-sm text-green-600 font-bold mt-1">Present (Checked in at 8:15 AM)</p>
          </div>
        </div>
        """

template_wrapper = """'use client';

import React from 'react';
import { 
  IndianRupee, Bell, Home, User, CheckCircle2, Download
} from 'lucide-react';

export default function {clean_title}Page() {
  
  return (
    <div className="p-4 md:p-8 space-y-6 animate-in fade-in duration-500 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-primary flex items-center gap-3">
            <div className="p-2 bg-indigo-100 rounded-xl text-indigo-600">
              <{icon} className="w-6 h-6"/>
            </div>
            {title}
          </h1>
          <p className="text-[var(--text-disabled)] text-sm mt-1 font-medium">Monitor your ward's {title_lower} at Smart PG.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-card border border-border text-primary hover:bg-page px-5 py-2.5 rounded-xl text-sm font-bold transition-all">
            <Download className="w-4 h-4" /> Download Report
          </button>
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

for page in parent_pages:
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
