// @ts-nocheck
'use client';
import React, { useState } from 'react';
import { Search, Filter, Plus, Users, Clock, CheckCircle, ArrowRightLeft, LogOut } from 'lucide-react';

const MOCK_VISITORS = [
  { id: 'VIS-001', visitorName: 'Sunita Sharma', studentName: 'Rahul Sharma', relation: 'Mother', room: '101A', entry: '10:30 AM', exit: '-', status: 'Inside', date: '05 Oct 2026' },
  { id: 'VIS-002', visitorName: 'Ravi Kumar', studentName: 'Amit Kumar', relation: 'Brother', room: '102B', entry: '11:00 AM', exit: '01:30 PM', status: 'Checked Out', date: '05 Oct 2026' },
  { id: 'VIS-003', visitorName: 'Deepak Verma', studentName: 'Priya Verma', relation: 'Father', room: '104C', entry: '-', exit: '-', status: 'Pre-approved', date: '05 Oct 2026' },
];

export default function VisitorsLogPage() {
  const [visitors, setVisitors] = useState(MOCK_VISITORS);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredData = visitors.filter(vis => {
    if (searchTerm && !vis.visitorName.toLowerCase().includes(searchTerm.toLowerCase()) && !vis.studentName.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const insideCount = visitors.filter(d => d.status === 'Inside').length;
  const checkedOutCount = visitors.filter(d => d.status === 'Checked Out').length;
  const preApprovedCount = visitors.filter(d => d.status === 'Pre-approved').length;

  const markExit = (id) => {
    setVisitors(prev => prev.map(vis => {
      if(vis.id === id) {
        return { ...vis, status: 'Checked Out', exit: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) };
      }
      return vis;
    }));
  };
  
  const markEntry = (id) => {
    setVisitors(prev => prev.map(vis => {
      if(vis.id === id) {
        return { ...vis, status: 'Inside', entry: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) };
      }
      return vis;
    }));
  };

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary flex items-center gap-2"><Users className="w-6 h-6 text-[#1A3A5C]"/> Visitors Log</h1>
          <p className="text-[var(--text-disabled)] text-sm mt-1">Track guest entries and exits for security.</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 bg-[#1A3A5C] hover:bg-[#122a42] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-colors">
            <Plus className="w-4 h-4" /> Log Visitor
          </button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card p-4 rounded-xl border border-border shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-lg bg-green-100 text-green-600">
            <ArrowRightLeft className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-secondary uppercase">Currently Inside</p>
            <h3 className="text-xl font-black text-primary">{insideCount}</h3>
          </div>
        </div>
        <div className="bg-card p-4 rounded-xl border border-border shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-secondary uppercase">Pre-approved</p>
            <h3 className="text-xl font-black text-primary">{preApprovedCount}</h3>
          </div>
        </div>
        <div className="bg-card p-4 rounded-xl border border-border shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-lg bg-gray-100 text-gray-600">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-secondary uppercase">Total Checked Out</p>
            <h3 className="text-xl font-black text-primary">{checkedOutCount}</h3>
          </div>
        </div>
      </div>

      <div className="bg-card border border-border/50 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-page/50">
          <div className="relative max-w-md w-full">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
            <input 
              type="text" 
              placeholder="Search visitor or student..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-input border border-border rounded-xl text-sm focus:outline-none focus:border-[#F5A623] text-primary transition-colors"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border/50 bg-page/30 text-[10px] uppercase tracking-wider text-secondary">
                <th className="p-4 font-bold">Visitor Details</th>
                <th className="p-4 font-bold">Visiting Student</th>
                <th className="p-4 font-bold">Timings</th>
                <th className="p-4 font-bold">Status</th>
                <th className="p-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {filteredData.map((vis, idx) => (
                <tr key={idx} className="hover:bg-page/30 transition-colors group">
                  <td className="p-4">
                    <p className="text-sm font-bold text-primary">{vis.visitorName}</p>
                    <p className="text-[10px] text-secondary mt-0.5">Relation: {vis.relation} | <span className="font-mono">{vis.id}</span></p>
                  </td>
                  <td className="p-4">
                    <p className="text-sm font-bold text-primary">{vis.studentName}</p>
                    <p className="text-[10px] text-[var(--text-disabled)] mt-0.5">Room: {vis.room}</p>
                  </td>
                  <td className="p-4 text-sm text-secondary font-medium">
                    In: <span className="text-primary font-bold">{vis.entry}</span><br/>
                    Out: <span className="text-primary font-bold">{vis.exit}</span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 border rounded-md text-[10px] font-bold uppercase tracking-wide 
                      ${vis.status === 'Inside' ? 'bg-green-100 text-green-700 border-green-200' : 
                        vis.status === 'Pre-approved' ? 'bg-blue-100 text-blue-700 border-blue-200' : 'bg-gray-100 text-gray-700 border-gray-200'}`}>
                      {vis.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    {vis.status === 'Inside' && (
                      <button onClick={() => markExit(vis.id)} className="flex items-center justify-center gap-1.5 ml-auto px-3 py-1.5 text-xs font-bold bg-red-50 text-red-600 hover:bg-red-100 rounded-lg border border-red-200 transition-colors">
                        <LogOut className="w-3.5 h-3.5"/> Mark Exit
                      </button>
                    )}
                    {vis.status === 'Pre-approved' && (
                      <button onClick={() => markEntry(vis.id)} className="flex items-center justify-center gap-1.5 ml-auto px-3 py-1.5 text-xs font-bold bg-green-50 text-green-600 hover:bg-green-100 rounded-lg border border-green-200 transition-colors">
                        <ArrowRightLeft className="w-3.5 h-3.5"/> Mark Entry
                      </button>
                    )}
                    {vis.status === 'Checked Out' && (
                      <span className="text-xs text-secondary font-medium mr-2">Completed</span>
                    )}
                  </td>
                </tr>
              ))}
              {filteredData.length === 0 && (
                <tr><td colSpan="5" className="p-8 text-center text-secondary font-medium">No records found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Log Visitor Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl shadow-xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-5 border-b border-border/50 flex items-center justify-between bg-[#1A3A5C] text-white">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-400" /> New Visitor
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors">X</button>
            </div>
            <div className="p-6 space-y-4 bg-page/50">
               <div>
                <label className="block text-xs font-bold text-secondary uppercase mb-2">Visitor Name</label>
                <input type="text" placeholder="e.g. Ashok Kumar" className="w-full px-4 py-2 bg-card border border-border rounded-xl focus:outline-none focus:border-[#F5A623] text-sm font-bold text-primary" />
              </div>
              <div>
                <label className="block text-xs font-bold text-secondary uppercase mb-2">Student to Visit</label>
                <input type="text" placeholder="e.g. Rahul Sharma (Room 101A)" className="w-full px-4 py-2 bg-card border border-border rounded-xl focus:outline-none focus:border-[#F5A623] text-sm font-bold text-primary" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                   <label className="block text-xs font-bold text-secondary uppercase mb-2">Relation</label>
                   <input type="text" placeholder="e.g. Uncle" className="w-full px-4 py-2 bg-card border border-border rounded-xl focus:outline-none focus:border-[#F5A623] text-sm font-bold text-primary" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-secondary uppercase mb-2">Status</label>
                  <select className="w-full px-4 py-2 bg-card border border-border rounded-xl focus:outline-none focus:border-[#F5A623] text-sm font-bold text-primary">
                    <option value="Inside">Inside (Direct Entry)</option>
                    <option value="Pre-approved">Pre-approved</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="p-5 border-t border-border/50 bg-card flex justify-end gap-3">
              <button onClick={() => setIsModalOpen(false)} className="px-5 py-2 bg-[var(--bg-overlay)] text-secondary rounded-xl font-bold hover:bg-gray-200 transition-colors">Cancel</button>
              <button onClick={() => {
                setVisitors([{
                  id: `VIS-00${visitors.length + 1}`, visitorName: 'New Visitor', studentName: 'Student', relation: 'Relative', room: '101', entry: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}), exit: '-', status: 'Inside', date: new Date().toLocaleDateString()
                }, ...visitors]);
                setIsModalOpen(false);
              }} className="px-5 py-2 bg-[#1A3A5C] text-white rounded-xl font-bold">Save Log</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}