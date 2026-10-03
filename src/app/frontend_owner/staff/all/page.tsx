'use client';

import React, { useState } from 'react';
import { 
  Users, UserPlus, Wallet, FileText, MapPin, 
  Calendar, CheckCircle2, ShieldCheck, XCircle, 
  MoreVertical, FileCheck, IndianRupee, Briefcase,
  Archive, Edit3, X, UserCog, ChefHat, HardHat
} from 'lucide-react';

const MOCK_STAFF = [
  { id: 'EMP-001', name: 'Amit Verma', role: 'Manager', phone: '+91 9876543210', email: 'amit@pg.com', property: 'PG Varanasi Main', joining: '15 Jan 2025', salary: '₹25,000', docs: 'Verified', status: 'Active' },
  { id: 'EMP-002', name: 'Ramesh Yadav', role: 'Cook', phone: '+91 9123456789', email: '-', property: 'PG Varanasi Main', joining: '10 Mar 2025', salary: '₹18,000', docs: 'Verified', status: 'Active' },
  { id: 'EMP-003', name: 'Suresh Kumar', role: 'Cook', phone: '+91 9988776655', email: '-', property: 'PG Lanka Branch', joining: '01 Jun 2026', salary: '₹15,000', docs: 'Pending', status: 'Active' },
  { id: 'EMP-004', name: 'Ravi Singh', role: 'Security Guard', phone: '+91 9000111222', email: '-', property: 'PG Varanasi Main', joining: '12 Sep 2026', salary: '₹12,000', docs: 'Verified', status: 'Active' },
  { id: 'EMP-005', name: 'Dinesh', role: 'Housekeeping', phone: '+91 8888777766', email: '-', property: 'PG Lanka Branch', joining: '20 Aug 2026', salary: '₹10,000', docs: 'Verified', status: 'On Leave' },
];

export default function AllStaffManagementPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const getRoleIcon = (role: string) => {
    switch(role) {
      case 'Manager': return <UserCog className="w-4 h-4 text-blue-500" />;
      case 'Cook': return <ChefHat className="w-4 h-4 text-orange-500" />;
      default: return <HardHat className="w-4 h-4 text-purple-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    if (status === 'Active') return <span className="px-2.5 py-1 bg-green-100 text-green-700 border border-green-200 rounded-lg text-[10px] font-bold uppercase flex items-center gap-1 w-max"><CheckCircle2 className="w-3 h-3"/> Active</span>;
    if (status === 'On Leave') return <span className="px-2.5 py-1 bg-yellow-100 text-yellow-700 border border-yellow-200 rounded-lg text-[10px] font-bold uppercase flex items-center gap-1 w-max"><Calendar className="w-3 h-3"/> On Leave</span>;
    return <span className="px-2.5 py-1 bg-gray-100 text-gray-700 border border-gray-200 rounded-lg text-[10px] font-bold uppercase flex items-center gap-1 w-max"><Archive className="w-3 h-3"/> Archived</span>;
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* HR Add Staff Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-[#1A3A5C] text-white shrink-0">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-[#F5A623]" /> Onboard New Staff Record
              </h2>
              <button onClick={() => setIsAddModalOpen(false)} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"><X className="w-5 h-5" /></button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-8 flex-1 bg-gray-50/50">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Column 1 */}
                <div className="space-y-5">
                  <h3 className="text-sm font-bold text-gray-800 border-b border-gray-200 pb-2 flex items-center gap-2">
                    <UserCog className="w-4 h-4 text-blue-500" /> Personal Details
                  </h3>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Full Name</label>
                    <input type="text" placeholder="e.g. Rahul Sharma" className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623] text-sm" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Mobile</label>
                      <input type="text" placeholder="+91" className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623] text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Email (Optional)</label>
                      <input type="email" placeholder="@gmail.com" className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623] text-sm" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Permanent Address</label>
                    <textarea rows={2} className="w-full px-4 py-2 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623] text-sm"></textarea>
                  </div>
                </div>

                {/* Column 2 */}
                <div className="space-y-5">
                  <h3 className="text-sm font-bold text-gray-800 border-b border-gray-200 pb-2 flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-[#F5A623]" /> Employment Details
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Assign Role</label>
                      <select className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623] text-sm font-bold text-gray-700">
                        <option>Manager</option>
                        <option>Cook</option>
                        <option>Security Guard</option>
                        <option>Housekeeping</option>
                        <option>Other Staff</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Assign PG Property</label>
                      <select className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623] text-sm font-bold text-gray-700">
                        <option>PG Varanasi Main</option>
                        <option>PG Lanka Branch</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Joining Date</label>
                      <input type="date" className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623] text-sm font-bold text-gray-700" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Monthly Salary (₹)</label>
                      <input type="number" placeholder="15000" className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623] text-sm font-bold text-gray-700" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Upload KYC Documents</label>
                    <div className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl text-center hover:bg-gray-50 cursor-pointer transition-colors">
                      <FileText className="w-6 h-6 text-gray-400 mx-auto mb-1" />
                      <span className="text-xs font-bold text-blue-600">Click to upload Aadhar/PAN</span>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
            
            <div className="p-5 border-t border-gray-100 bg-white flex justify-between items-center shrink-0">
              <p className="text-xs text-gray-500 font-medium"><ShieldCheck className="w-4 h-4 inline mr-1 text-green-600" /> Note: Login access is only generated for Managers.</p>
              <div className="flex gap-3">
                <button onClick={() => setIsAddModalOpen(false)} className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-colors">Cancel</button>
                <button onClick={() => { alert('Staff Record Saved!'); setIsAddModalOpen(false); }} className="px-6 py-2.5 bg-[#1A3A5C] hover:bg-[#122a42] text-white rounded-xl font-bold flex items-center gap-2 transition-colors shadow-sm">
                  Save HR Record
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Users className="w-7 h-7 text-[#F5A623]" />
            HR & Staff Directory
          </h1>
          <p className="text-gray-500 text-sm mt-1">Master roster for all internal employees, roles, salaries, and documents.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 bg-[#F5A623] hover:bg-[#e09612] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-colors"
          >
            <UserPlus className="w-4 h-4" /> Add New Staff
          </button>
        </div>
      </div>

      {/* HR Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 border border-gray-100 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><Briefcase className="w-6 h-6" /></div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">Total Employees</p>
            <h3 className="text-2xl font-black text-gray-800">5</h3>
          </div>
        </div>
        <div className="bg-white p-4 border border-gray-100 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl"><IndianRupee className="w-6 h-6" /></div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">Monthly Payroll</p>
            <h3 className="text-xl font-black text-emerald-600">₹80,000</h3>
          </div>
        </div>
        <div className="bg-white p-4 border border-gray-100 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-red-50 text-red-600 rounded-xl"><FileText className="w-6 h-6" /></div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">Missing KYC</p>
            <h3 className="text-2xl font-black text-red-600">1</h3>
          </div>
        </div>
        <div className="bg-white p-4 border border-gray-100 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-xl"><MapPin className="w-6 h-6" /></div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">Locations</p>
            <h3 className="text-2xl font-black text-gray-800">2</h3>
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden min-h-[500px]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-xs uppercase tracking-wider font-bold">
                <th className="p-5">Staff Information</th>
                <th className="p-5">Internal Role & Branch</th>
                <th className="p-5">HR Details (Salary/Join)</th>
                <th className="p-5">Documents</th>
                <th className="p-5 text-center">Status</th>
                <th className="p-5 text-center">Manage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {MOCK_STAFF.map((emp) => (
                <tr key={emp.id} className="hover:bg-gray-50/50 transition-colors">
                  
                  {/* Name & Contact */}
                  <td className="p-5">
                    <div className="flex gap-4 items-center">
                      <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-600 font-black flex items-center justify-center border border-gray-200 shrink-0">
                        {emp.name.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-800 text-sm">{emp.name}</span>
                        <span className="text-xs font-semibold text-gray-500">{emp.phone}</span>
                      </div>
                    </div>
                  </td>
                  
                  {/* Role & Branch */}
                  <td className="p-5">
                    <div className="flex flex-col gap-1.5">
                      <span className="flex items-center gap-1.5 text-sm font-bold text-gray-700">
                        {getRoleIcon(emp.role)} {emp.role}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 ml-5">
                        <MapPin className="w-3.5 h-3.5" /> {emp.property}
                      </span>
                    </div>
                  </td>

                  {/* Salary & Joining */}
                  <td className="p-5">
                    <div className="flex flex-col gap-1.5 text-sm font-semibold">
                      <span className="flex items-center gap-1.5 text-emerald-600">
                        <Wallet className="w-4 h-4 text-emerald-500" /> {emp.salary}/mo
                      </span>
                      <span className="flex items-center gap-1.5 text-gray-500 text-xs ml-5">
                        <Calendar className="w-3.5 h-3.5" /> Joined {emp.joining}
                      </span>
                    </div>
                  </td>

                  {/* Documents */}
                  <td className="p-5">
                    {emp.docs === 'Verified' ? (
                      <span className="px-2.5 py-1 text-[10px] font-bold uppercase rounded-lg bg-green-50 text-green-700 flex items-center gap-1 w-max border border-green-200">
                        <FileCheck className="w-3 h-3" /> KYC Verified
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 text-[10px] font-bold uppercase rounded-lg bg-red-50 text-red-700 flex items-center gap-1 w-max border border-red-200">
                        <XCircle className="w-3 h-3" /> Missing Docs
                      </span>
                    )}
                  </td>

                  {/* Status */}
                  <td className="p-5 text-center">
                    <div className="flex justify-center">
                      {getStatusBadge(emp.status)}
                    </div>
                  </td>

                  {/* Manage Actions */}
                  <td className="p-5 text-center">
                    <div className="relative group inline-block">
                      <button className="p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-colors border border-transparent group-hover:border-gray-200">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                      
                      {/* Dropdown Menu Mockup */}
                      <div className="absolute right-0 top-full mt-1 w-44 bg-white border border-gray-100 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 overflow-hidden">
                        <button className="w-full text-left px-4 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 flex items-center gap-2 border-b border-gray-50">
                          <Edit3 className="w-4 h-4 text-blue-500" /> Edit Profile
                        </button>
                        <button className="w-full text-left px-4 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 flex items-center gap-2 border-b border-gray-50">
                          <FileText className="w-4 h-4 text-purple-500" /> View Documents
                        </button>
                        <button className="w-full text-left px-4 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 flex items-center gap-2 border-b border-gray-50">
                          <Calendar className="w-4 h-4 text-orange-500" /> View Attendance
                        </button>
                        
                        <button className="w-full text-left px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-50 flex items-center gap-2">
                          <Archive className="w-4 h-4" /> Remove / Archive
                        </button>
                      </div>
                    </div>
                  </td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
