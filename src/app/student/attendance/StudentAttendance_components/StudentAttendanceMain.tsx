'use client';

// RESPONSIBILITY: Renders the Student Attendance UI.

import { CheckSquare, Calendar as CalendarIcon, Clock, AlertCircle } from 'lucide-react';
import { useStudentContext } from '@/app/student/student_components/StudentContext';

export function StudentAttendanceMain() {
  const { profile } = useStudentContext();

  // Mocking calendar days for a standard month
  const days = Array.from({ length: 31 }, (_, i) => ({
    day: i + 1,
    status: (i + 1) === 15 ? 'Absent' : (i + 1) === 10 ? 'Late' : (i + 1) > 28 ? 'Pending' : 'Present'
  }));

  return (
    <div className="space-y-6 w-full">
      <div>
        <h1 className="text-[24px] font-black text-primary flex items-center gap-2">
          ✅ Attendance
        </h1>
        <p className="text-sm text-secondary mt-1">Track your daily in/out attendance and monthly stats.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* Stats Column */}
        <div className="md:col-span-1 space-y-4">
          <div className="bg-primary-subtle border border-primary/20 rounded-[var(--radius-lg)] p-5 text-center">
            <div className="text-xs font-bold text-primary/70 uppercase mb-2">Total Present</div>
            <div className="text-4xl font-black text-primary">27<span className="text-lg">/30</span></div>
            <div className="text-sm font-bold text-primary mt-2">90% Attendance</div>
          </div>
          
          <div className="bg-danger-bg border border-danger/20 rounded-[var(--radius-lg)] p-5 text-center">
            <div className="text-xs font-bold text-danger/70 uppercase mb-2">Absent / Leaves</div>
            <div className="text-4xl font-black text-danger">3</div>
            <div className="text-xs text-danger mt-2">Days absent this month</div>
          </div>

          <div className="bg-warning-bg border border-warning/20 rounded-[var(--radius-lg)] p-5 text-center">
            <div className="text-xs font-bold text-warning/70 uppercase mb-2">Late Entries</div>
            <div className="text-4xl font-black text-warning">1</div>
            <div className="text-xs text-warning mt-2">After curfew time</div>
          </div>
        </div>

        {/* Calendar View */}
        <div className="md:col-span-3 bg-card border border-border rounded-[var(--radius-lg)] p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
             <h3 className="font-black text-primary text-lg flex items-center gap-2">
               <CalendarIcon className="w-5 h-5" /> September 2024
             </h3>
             <div className="flex gap-4 text-xs font-bold text-secondary">
               <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-success"></span> Present</span>
               <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-danger"></span> Absent</span>
               <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-warning"></span> Late</span>
             </div>
          </div>
          
          <div className="grid grid-cols-7 gap-2 sm:gap-4 text-center">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
              <div key={d} className="font-bold text-secondary text-xs uppercase mb-2">{d}</div>
            ))}
            {/* Empty slots for calendar alignment (mock) */}
            <div></div><div></div>
            
            {days.map(d => (
              <div 
                key={d.day} 
                className={`aspect-square flex items-center justify-center rounded-[var(--radius-md)] text-sm sm:text-base font-bold border transition-colors cursor-default ${
                  d.status === 'Present' ? 'bg-success-bg border-success/20 text-success' :
                  d.status === 'Absent' ? 'bg-danger-bg border-danger/20 text-danger' :
                  d.status === 'Late' ? 'bg-warning-bg border-warning/20 text-warning text-white' :
                  'bg-input border-border text-secondary'
                }`}
                title={d.status}
              >
                {d.day}
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Logs */}
        <div className="md:col-span-4 bg-card border border-border rounded-[var(--radius-lg)] p-6 shadow-sm">
          <h3 className="font-black text-primary text-lg mb-4 flex items-center gap-2 border-b border-border pb-3">
            <Clock className="w-5 h-5 text-secondary" /> Recent In/Out Logs
          </h3>
          <div className="overflow-x-auto">
             <table className="w-full text-sm text-left">
               <thead className="bg-input text-secondary text-xs uppercase font-bold">
                 <tr>
                   <th className="px-4 py-3 rounded-tl-[var(--radius-sm)]">Date</th>
                   <th className="px-4 py-3">In Time</th>
                   <th className="px-4 py-3">Out Time</th>
                   <th className="px-4 py-3">Status</th>
                   <th className="px-4 py-3 rounded-tr-[var(--radius-sm)]">Remarks</th>
                 </tr>
               </thead>
               <tbody className="divide-y divide-border">
                 <tr className="hover:bg-input transition-colors">
                   <td className="px-4 py-3 font-medium text-primary">28 Sep 2024</td>
                   <td className="px-4 py-3 text-secondary">08:00 PM</td>
                   <td className="px-4 py-3 text-secondary">09:00 AM</td>
                   <td className="px-4 py-3">
                     <span className="bg-success-bg text-success text-[10px] font-bold px-2 py-1 rounded-full">Present</span>
                   </td>
                   <td className="px-4 py-3 text-secondary">-</td>
                 </tr>
                 <tr className="hover:bg-input transition-colors">
                   <td className="px-4 py-3 font-medium text-primary">27 Sep 2024</td>
                   <td className="px-4 py-3 text-secondary">10:30 PM</td>
                   <td className="px-4 py-3 text-secondary">08:30 AM</td>
                   <td className="px-4 py-3">
                     <span className="bg-warning-bg text-warning text-[10px] font-bold px-2 py-1 rounded-full">Late Entry</span>
                   </td>
                   <td className="px-4 py-3 text-danger text-xs font-bold flex items-center gap-1"><AlertCircle className="w-3 h-3"/> Warning issued</td>
                 </tr>
                 <tr className="hover:bg-input transition-colors">
                   <td className="px-4 py-3 font-medium text-primary">15 Sep 2024</td>
                   <td className="px-4 py-3 text-secondary">-</td>
                   <td className="px-4 py-3 text-secondary">-</td>
                   <td className="px-4 py-3">
                     <span className="bg-danger-bg text-danger text-[10px] font-bold px-2 py-1 rounded-full">Absent</span>
                   </td>
                   <td className="px-4 py-3 text-secondary text-xs">Approved Leave</td>
                 </tr>
               </tbody>
             </table>
          </div>
        </div>

      </div>
    </div>
  );
}
