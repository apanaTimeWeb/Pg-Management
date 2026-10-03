'use client';

import React, { useState } from 'react';
import { 
  UserCog, Plus, ShieldCheck, Mail, Building2, 
  MapPin, Clock, MoreVertical, ShieldAlert, Key, 
  Activity, PowerOff, CheckCircle2, X, Users, 
  LayoutDashboard, Wallet, UserCheck, Settings
} from 'lucide-react';

const MOCK_MANAGERS = [
  { id: 'MGR-001', name: 'Amit Verma', email: 'amit.verma@pg.com', phone: '+91 9876543210', pg: 'PG Varanasi Main', building: 'Block A (Boys)', status: 'Active', lastLogin: 'Today, 10:30 AM', avatar: 'AV' },
  { id: 'MGR-002', name: 'Sneha Pandey', email: 'sneha.p@pg.com', phone: '+91 9123456789', pg: 'PG Lanka Branch', building: 'Girls Hostel', status: 'Active', lastLogin: 'Yesterday, 04:15 PM', avatar: 'SP' },
  { id: 'MGR-003', name: 'Rajesh Kumar', email: 'rajesh.k@pg.com', phone: '+91 9988776655', pg: 'PG Varanasi Main', building: 'Block B (Boys)', status: 'Suspended', lastLogin: '15 Sep 2026', avatar: 'RK' },
];

const PERMISSIONS_LIST = [
  { id: 'students', label: 'Students', icon: Users, desc: 'View, add, and manage student profiles' },
  { id: 'rooms', label: 'Rooms & Beds', icon: LayoutDashboard, desc: 'Manage room assignments and bed availability' },
  { id: 'attendance', label: 'Attendance', icon: UserCheck, desc: 'Mark and view daily student attendance' },
  { id: 'fees', label: 'Fees & Payments', icon: Wallet, desc: 'Collect rent, view dues, and manage receipts' },
  { id: 'complaints', label: 'Complaints', icon: Settings, desc: 'View and resolve maintenance tickets' },
  { id: 'visitors', label: 'Visitors', icon: Users, desc: 'Approve visitor entries and monitor logs' },
  { id: 'leave', label: 'Leave & Outing', icon: ShieldCheck, desc: 'Approve student leave requests' },
  { id: 'notices', label: 'Notices', icon: Activity, desc: 'Publish announcements to students' },
  { id: 'reports', label: 'Reports', icon: Building2, desc: 'View operational and financial analytics' },
];

export default function ManagerManagementPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>(['students', 'rooms', 'attendance', 'complaints']);

  const togglePermission = (id: string) => {
    if (selectedPermissions.includes(id)) {
      setSelectedPermissions(selectedPermissions.filter(p => p !== id));
    } else {
      setSelectedPermissions([...selectedPermissions, id]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* Invite Manager Modal */}
      {isInviteModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl shadow-xl w-full max-w-3xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
            <div className="p-5 border-b border-border/50 flex items-center justify-between bg-[#1A3A5C] text-white shrink-0">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <UserCog className="w-5 h-5 text-[#F5A623]" /> Invite New Manager
              </h2>
              <button onClick={() => setIsInviteModalOpen(false)} className="p-1.5 hover:bg-card/10 rounded-lg transition-colors"><X className="w-5 h-5" /></button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-8 flex-1">
              
              {/* Account Details */}
              <div>
                <h3 className="text-sm font-bold text-primary mb-4 flex items-center gap-2 border-b border-border/50 pb-2">
                  <span className="bg-[#F5A623] text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px]">1</span> Account Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-secondary uppercase mb-2">Full Name</label>
                    <input type="text" placeholder="e.g. Vikas Sharma" className="w-full px-4 py-2.5 bg-page border border-border rounded-xl focus:outline-none focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623] text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-secondary uppercase mb-2">Email Address</label>
                    <input type="email" placeholder="manager@pg.com" className="w-full px-4 py-2.5 bg-page border border-border rounded-xl focus:outline-none focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623] text-sm" />
                  </div>
                </div>
              </div>

              {/* Assignment */}
              <div>
                <h3 className="text-sm font-bold text-primary mb-4 flex items-center gap-2 border-b border-border/50 pb-2">
                  <span className="bg-[#F5A623] text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px]">2</span> Branch Assignment
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-secondary uppercase mb-2">Assign PG Property</label>
                    <select className="w-full px-4 py-2.5 bg-page border border-border rounded-xl focus:outline-none focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623] text-sm">
                      <option>Select Property...</option>
                      <option>PG Varanasi Main</option>
                      <option>PG Lanka Branch</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-secondary uppercase mb-2">Assign Building / Block</label>
                    <select className="w-full px-4 py-2.5 bg-page border border-border rounded-xl focus:outline-none focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623] text-sm">
                      <option>Select Building...</option>
                      <option>Block A (Boys)</option>
                      <option>Block B (Girls)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Access Permissions */}
              <div>
                <h3 className="text-sm font-bold text-primary mb-4 flex items-center gap-2 border-b border-border/50 pb-2">
                  <span className="bg-[#F5A623] text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px]">3</span> Configure Permissions
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {PERMISSIONS_LIST.map(perm => {
                    const isSelected = selectedPermissions.includes(perm.id);
                    const Icon = perm.icon;
                    return (
                      <div 
                        key={perm.id} 
                        onClick={() => togglePermission(perm.id)}
                        className={`p-3 rounded-xl border-2 cursor-pointer transition-all flex items-start gap-3 ${isSelected ? 'border-[#F5A623] bg-orange-50' : 'border-border/50 bg-card hover:border-border'}`}
                      >
                        <div className={`mt-0.5 p-1 rounded-md ${isSelected ? 'bg-[#F5A623] text-white' : 'bg-[var(--bg-overlay)] text-gray-400'}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <p className={`text-sm font-bold ${isSelected ? 'text-primary' : 'text-secondary'}`}>{perm.label}</p>
                          <p className="text-[10px] text-[var(--text-disabled)] leading-tight mt-0.5">{perm.desc}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
              
            </div>
            
            <div className="p-5 border-t border-border/50 bg-page flex justify-between items-center shrink-0">
              <p className="text-xs text-[var(--text-disabled)] font-medium"><Mail className="w-4 h-4 inline mr-1" /> An invite link and temporary password will be sent to their email.</p>
              <div className="flex gap-3">
                <button onClick={() => setIsInviteModalOpen(false)} className="px-5 py-2.5 bg-card border border-border text-secondary rounded-xl font-bold hover:bg-[var(--bg-overlay)] transition-colors">Cancel</button>
                <button onClick={() => { alert('Account Created & Invite Sent!'); setIsInviteModalOpen(false); }} className="px-5 py-2.5 bg-[#F5A623] text-white rounded-xl font-bold flex items-center gap-2 hover:bg-[#e09612] transition-colors shadow-sm">
                  <CheckCircle2 className="w-4 h-4" /> Send Invite
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
            <UserCog className="w-7 h-7 text-[#F5A623]" />
            Manager Roles & Control
          </h1>
          <p className="text-[var(--text-disabled)] text-sm mt-1">Assign PGs, configure access permissions, and monitor manager activity.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsInviteModalOpen(true)}
            className="flex items-center gap-2 bg-[#1A3A5C] hover:bg-[#122a42] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4" /> Invite Manager
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card p-4 border border-border/50 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><UserCog className="w-6 h-6" /></div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">Total Managers</p>
            <h3 className="text-2xl font-black text-primary">3</h3>
          </div>
        </div>
        <div className="bg-card p-4 border border-border/50 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-green-50 text-green-600 rounded-xl"><ShieldCheck className="w-6 h-6" /></div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">Active Accounts</p>
            <h3 className="text-2xl font-black text-green-600">2</h3>
          </div>
        </div>
        <div className="bg-card p-4 border border-border/50 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-red-50 text-red-600 rounded-xl"><ShieldAlert className="w-6 h-6" /></div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">Suspended</p>
            <h3 className="text-2xl font-black text-red-600">1</h3>
          </div>
        </div>
        <div className="bg-card p-4 border border-border/50 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-xl"><Building2 className="w-6 h-6" /></div>
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">Properties Covered</p>
            <h3 className="text-2xl font-black text-primary">2</h3>
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-card rounded-2xl shadow-sm border border-border/50 overflow-hidden min-h-[500px]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-page border-b border-border/50 text-[var(--text-disabled)] text-xs uppercase tracking-wider font-bold">
                <th className="p-5">Manager Details</th>
                <th className="p-5">Assigned PG & Building</th>
                <th className="p-5">Security Status</th>
                <th className="p-5">Last Login Activity</th>
                <th className="p-5 text-center">Controls</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {MOCK_MANAGERS.map((mgr) => (
                <tr key={mgr.id} className="hover:bg-page/50 transition-colors">
                  <td className="p-5">
                    <div className="flex gap-4 items-center">
                      <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-700 font-black flex items-center justify-center border border-blue-200">
                        {mgr.avatar}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-primary text-sm flex items-center gap-2">
                          {mgr.name}
                        </span>
                        <div className="flex flex-col text-xs font-semibold text-[var(--text-disabled)] mt-0.5">
                          <span>{mgr.email}</span>
                          <span>{mgr.phone}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  
                  <td className="p-5">
                    <div className="flex flex-col gap-1.5">
                      <span className="flex items-center gap-1.5 text-sm font-bold text-secondary">
                        <MapPin className="w-4 h-4 text-[#F5A623]" /> {mgr.pg}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs font-semibold text-[var(--text-disabled)] ml-5">
                        <Building2 className="w-3.5 h-3.5" /> {mgr.building}
                      </span>
                    </div>
                  </td>

                  <td className="p-5">
                    {mgr.status === 'Active' ? (
                      <span className="px-3 py-1.5 bg-green-100 text-green-700 border border-green-200 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 w-max">
                        <ShieldCheck className="w-4 h-4" /> Active
                      </span>
                    ) : (
                      <span className="px-3 py-1.5 bg-red-100 text-red-700 border border-red-200 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 w-max">
                        <ShieldAlert className="w-4 h-4" /> Suspended
                      </span>
                    )}
                  </td>

                  <td className="p-5">
                    <span className="flex items-center gap-2 text-sm font-semibold text-secondary">
                      <Clock className="w-4 h-4 text-gray-400" /> {mgr.lastLogin}
                    </span>
                  </td>

                  <td className="p-5 text-center">
                    <div className="relative group inline-block">
                      <button className="p-2 text-[var(--text-disabled)] hover:text-primary hover:bg-[var(--bg-overlay)] rounded-xl transition-colors border border-transparent group-hover:border-border">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                      
                      {/* Dropdown Menu Mockup */}
                      <div className="absolute right-0 top-full mt-1 w-48 bg-card border border-border/50 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 overflow-hidden">
                        <button className="w-full text-left px-4 py-3 text-sm font-bold text-secondary hover:bg-page flex items-center gap-2 border-b border-gray-50">
                          <Activity className="w-4 h-4 text-blue-500" /> View Activity Log
                        </button>
                        <button className="w-full text-left px-4 py-3 text-sm font-bold text-secondary hover:bg-page flex items-center gap-2 border-b border-gray-50">
                          <Settings className="w-4 h-4 text-purple-500" /> Edit Permissions
                        </button>
                        <button className="w-full text-left px-4 py-3 text-sm font-bold text-secondary hover:bg-page flex items-center gap-2 border-b border-gray-50">
                          <Key className="w-4 h-4 text-orange-500" /> Reset Password
                        </button>
                        
                        {mgr.status === 'Active' ? (
                          <button className="w-full text-left px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-50 flex items-center gap-2">
                            <PowerOff className="w-4 h-4" /> Suspend Account
                          </button>
                        ) : (
                          <button className="w-full text-left px-4 py-3 text-sm font-bold text-green-600 hover:bg-green-50 flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4" /> Activate Account
                          </button>
                        )}
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
