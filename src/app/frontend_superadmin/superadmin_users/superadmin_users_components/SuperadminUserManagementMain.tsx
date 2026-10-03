// @ts-nocheck
'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Users, Search, Filter, Download, UserPlus, Eye, Edit, ShieldAlert, PowerOff, Key, History, MoreVertical, GraduationCap, ChefHat, UserCircle, MapPin, CheckCircle, XCircle, Building } from 'lucide-react';

export function SuperadminUserManagementMain() {
  const searchParams = useSearchParams();
  const tabQuery = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState(tabQuery || 'all');

  useEffect(() => {
    if (tabQuery) setActiveTab(tabQuery);
  }, [tabQuery]);

  const [selectedUser, setSelectedUser] = useState<any | null>(null);

  const tabs = [
    { id: 'all', label: 'All Users', icon: Users, color: 'text-info', bg: 'bg-info-bg' },
    { id: 'students', label: 'Students', icon: GraduationCap, color: 'text-theme-primary', bg: 'bg-primary-subtle' },
    { id: 'managers', label: 'Managers', icon: UserCircle, color: 'text-purple', bg: 'bg-purple-bg' },
    { id: 'cooks', label: 'Cooks', icon: ChefHat, color: 'text-warning', bg: 'bg-warning-bg' },
    { id: 'pending', label: 'Pending Users', icon: History, color: 'text-secondary', bg: 'bg-secondary/10' },
    { id: 'suspended', label: 'Suspended Users', icon: ShieldAlert, color: 'text-danger', bg: 'bg-danger-bg' },
  ];

  const dummyUsers = [
    { id: 'USR-8901', name: 'Neha Verma', role: 'Student', pg: 'Comfort Girls PG', mobile: '+91 9876543210', email: 'neha@gmail.com', status: 'Active', created: '01 Oct 2026', lastLogin: '2 hrs ago', details: { room: '201-B', admission: 'Confirmed', account: 'Paid' } },
    { id: 'USR-8902', name: 'Vikas Kumar', role: 'Manager', pg: 'Sunshine Boys PG', mobile: '+91 9123456789', email: 'vikas@sunshine.com', status: 'Active', created: '15 Aug 2025', lastLogin: '5 mins ago', details: {} },
    { id: 'USR-8903', name: 'Ramesh Singh', role: 'Cook', pg: 'Elite Stay Co-ed', mobile: '+91 9988776655', email: 'ramesh.c@gmail.com', status: 'Suspended', created: '10 Jan 2026', lastLogin: '1 week ago', details: {} },
    { id: 'USR-8904', name: 'Priya Sharma', role: 'Student', pg: 'Comfort Girls PG', mobile: '+91 9998887776', email: 'priya@gmail.com', status: 'Pending', created: '02 Oct 2026', lastLogin: 'Never', details: { room: 'Unassigned', admission: 'Pending Approval', account: 'Unpaid' } },
  ];

  const filteredUsers = activeTab === 'all' 
    ? dummyUsers 
    : dummyUsers.filter(u => 
        (activeTab === 'students' && u.role === 'Student') ||
        (activeTab === 'managers' && u.role === 'Manager') ||
        (activeTab === 'cooks' && u.role === 'Cook') ||
        (activeTab === 'pending' && u.status === 'Pending') ||
        (activeTab === 'suspended' && u.status === 'Suspended')
      );

  return (
    <div className="w-full h-full space-y-6 pb-20">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-theme-primary to-theme-primary-hover text-white rounded-3xl p-8 shadow-lg relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-700">
          <Users className="w-40 h-40" />
        </div>
        <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black mb-2 flex items-center gap-3">
              <Users className="w-8 h-8" /> User Management
            </h1>
            <p className="text-white/80 font-medium max-w-xl">
              Centralized hub for monitoring and managing all platform users including Students, Managers, and Cooks.
            </p>
          </div>
          <div className="flex gap-3">
            <button className="bg-white/20 backdrop-blur text-white border border-white/30 px-6 py-3 rounded-xl font-bold shadow-md hover:bg-white/30 transition-colors flex items-center gap-2 whitespace-nowrap">
              <Download className="w-5 h-5" /> Export Data
            </button>
          </div>
        </div>
      </div>

      {!selectedUser ? (
        <div className="flex h-[700px]">
          {/* User Table Area */}
          <div className="w-full flex-1 bg-card border border-border/50 rounded-3xl shadow-sm flex flex-col h-full overflow-hidden animate-in fade-in slide-in-from-right-8 duration-500 relative">
            <div className="p-6 border-b border-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-bg-page/50">
              <div className="flex items-center gap-3">
                 <h2 className="text-xl font-black text-primary capitalize">{activeTab === 'all' ? 'All Users' : activeTab}</h2>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 text-secondary absolute left-3 top-1/2 -translate-y-1/2" />
                  <input type="text" placeholder="Search users by name, mobile, ID..." className="pl-9 pr-4 py-2 w-72 bg-card border border-border/50 rounded-xl text-sm focus:ring-2 focus:ring-theme-primary font-medium" />
                </div>
                <button className="p-2 border border-border/50 bg-card rounded-xl text-secondary hover:text-primary transition-colors tooltip" title="Advanced Filter"><Filter className="w-4 h-4" /></button>
              </div>
            </div>

            <div className="flex-1 overflow-auto p-4">
              <table className="w-full text-left border-collapse whitespace-nowrap">
                <thead>
                  <tr className="bg-bg-page/50 border-b border-border/50">
                    <th className="py-3 px-4 text-xs font-bold text-secondary uppercase tracking-wider">User Info</th>
                    <th className="py-3 px-4 text-xs font-bold text-secondary uppercase tracking-wider">Role & PG</th>
                    <th className="py-3 px-4 text-xs font-bold text-secondary uppercase tracking-wider text-center">Status</th>
                    <th className="py-3 px-4 text-xs font-bold text-secondary uppercase tracking-wider">Last Login</th>
                    <th className="py-3 px-4 text-xs font-bold text-secondary uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30">
                  {filteredUsers.map((usr, i) => (
                    <tr key={i} className="hover:bg-bg-page/50 transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                            usr.role === 'Student' ? 'bg-primary-subtle text-theme-primary' : 
                            usr.role === 'Manager' ? 'bg-purple-bg text-purple' : 'bg-warning-bg text-warning'
                          }`}>
                            {usr.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-bold text-primary">{usr.name}</div>
                            <div className="text-xs text-secondary font-medium">{usr.id} • {usr.mobile}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className={`text-xs font-bold uppercase tracking-wider ${
                            usr.role === 'Student' ? 'text-theme-primary' : 
                            usr.role === 'Manager' ? 'text-purple' : 'text-warning'
                          }`}>{usr.role}</div>
                        <div className="text-xs text-secondary font-medium mt-1 truncate max-w-[150px]">{usr.pg}</div>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold ${
                          usr.status === 'Active' ? 'bg-success-bg text-success' : 
                          usr.status === 'Pending' ? 'bg-warning-bg text-warning-fg' : 
                          'bg-danger-bg text-danger'
                        }`}>
                          {usr.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-sm text-secondary font-medium">{usr.lastLogin}</td>
                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => setSelectedUser(usr)} className="p-1.5 text-theme-primary hover:bg-primary-subtle rounded-lg transition-colors tooltip" title="View Profile"><Eye className="w-4 h-4" /></button>
                          <div className="relative group/menu">
                            <button className="p-1.5 text-secondary hover:bg-bg-page rounded-lg transition-colors"><MoreVertical className="w-4 h-4" /></button>
                            {/* Dropdown Menu */}
                            <div className="absolute right-0 mt-2 w-48 bg-card border border-border/50 rounded-xl shadow-xl opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all z-50">
                              <div className="p-2 space-y-1">
                                <button className="w-full text-left px-3 py-2 text-sm font-bold text-primary hover:bg-bg-page rounded-lg flex items-center gap-2"><Edit className="w-4 h-4 text-info"/> Edit User</button>
                                {usr.status !== 'Active' && <button className="w-full text-left px-3 py-2 text-sm font-bold text-primary hover:bg-bg-page rounded-lg flex items-center gap-2"><CheckCircle className="w-4 h-4 text-success"/> Activate</button>}
                                {usr.status === 'Active' && <button className="w-full text-left px-3 py-2 text-sm font-bold text-primary hover:bg-bg-page rounded-lg flex items-center gap-2"><ShieldAlert className="w-4 h-4 text-danger"/> Suspend</button>}
                                <button className="w-full text-left px-3 py-2 text-sm font-bold text-primary hover:bg-bg-page rounded-lg flex items-center gap-2"><Key className="w-4 h-4 text-warning"/> Reset Password</button>
                                <button className="w-full text-left px-3 py-2 text-sm font-bold text-primary hover:bg-bg-page rounded-lg flex items-center gap-2"><PowerOff className="w-4 h-4 text-danger"/> Force Logout</button>
                                <button className="w-full text-left px-3 py-2 text-sm font-bold text-primary hover:bg-bg-page rounded-lg flex items-center gap-2"><History className="w-4 h-4 text-purple"/> View Activity</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Pagination */}
            <div className="p-4 border-t border-border/50 bg-bg-page/50 flex items-center justify-between text-sm z-10">
              <span className="text-secondary font-medium">Showing 1 to {filteredUsers.length} of {filteredUsers.length} users</span>
              <div className="flex items-center gap-2">
                 <button className="px-3 py-1 bg-card border border-border/50 rounded-lg text-secondary hover:text-primary disabled:opacity-50 font-bold" disabled>Prev</button>
                 <button className="px-3 py-1 bg-theme-primary text-white rounded-lg font-bold">1</button>
                 <button className="px-3 py-1 bg-card border border-border/50 rounded-lg text-secondary hover:text-primary disabled:opacity-50 font-bold" disabled>Next</button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* USER PROFILE VIEW */
        <div className="bg-card border border-border/50 rounded-3xl shadow-sm animate-in slide-in-from-right-8 duration-300 flex flex-col min-h-[700px]">
          {/* Header */}
          <div className="p-6 border-b border-border/50 flex items-center justify-between bg-bg-page/50">
            <div className="flex items-center gap-4">
              <button onClick={() => setSelectedUser(null)} className="px-3 py-1.5 border border-border/50 bg-card rounded-xl text-sm font-bold text-secondary hover:text-primary transition-colors">Back</button>
              <h2 className="text-xl font-black text-primary">User Profile</h2>
            </div>
            <div className="flex gap-2">
               <button className="bg-theme-primary hover:bg-theme-primary-hover text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-colors text-sm shadow-md"><Edit className="w-4 h-4"/> Edit Profile</button>
            </div>
          </div>

          <div className="flex-1 p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
             
             {/* Left Column - Core Info */}
             <div className="md:col-span-1 space-y-6">
                <div className="bg-bg-page border border-border/50 p-6 rounded-3xl flex flex-col items-center text-center">
                   <div className={`w-24 h-24 rounded-full flex items-center justify-center font-black text-4xl mb-4 ${
                      selectedUser.role === 'Student' ? 'bg-primary-subtle text-theme-primary' : 
                      selectedUser.role === 'Manager' ? 'bg-purple-bg text-purple' : 'bg-warning-bg text-warning'
                    }`}>
                      {selectedUser.name.charAt(0)}
                   </div>
                   <h3 className="text-2xl font-black text-primary">{selectedUser.name}</h3>
                   <span className="text-sm font-bold text-secondary mt-1">{selectedUser.id}</span>
                   <span className={`mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold ${
                      selectedUser.status === 'Active' ? 'bg-success-bg text-success' : 
                      selectedUser.status === 'Pending' ? 'bg-warning-bg text-warning-fg' : 
                      'bg-danger-bg text-danger'
                    }`}>
                      {selectedUser.status}
                    </span>
                </div>

                <div className="bg-bg-page border border-border/50 p-6 rounded-3xl space-y-4">
                   <h4 className="text-xs font-bold text-secondary uppercase tracking-wider mb-2">Contact Details</h4>
                   <div className="flex flex-col gap-1">
                      <span className="text-xs font-bold text-secondary">Mobile</span>
                      <span className="text-sm font-bold text-primary">{selectedUser.mobile}</span>
                   </div>
                   <div className="flex flex-col gap-1">
                      <span className="text-xs font-bold text-secondary">Email</span>
                      <span className="text-sm font-bold text-primary">{selectedUser.email}</span>
                   </div>
                </div>

                <div className="bg-bg-page border border-border/50 p-6 rounded-3xl space-y-4">
                   <h4 className="text-xs font-bold text-secondary uppercase tracking-wider mb-2">System Meta</h4>
                   <div className="flex flex-col gap-1">
                      <span className="text-xs font-bold text-secondary">Created Date</span>
                      <span className="text-sm font-bold text-primary">{selectedUser.created}</span>
                   </div>
                   <div className="flex flex-col gap-1">
                      <span className="text-xs font-bold text-secondary">Last Login</span>
                      <span className="text-sm font-bold text-primary">{selectedUser.lastLogin}</span>
                   </div>
                </div>
             </div>

             {/* Right Column - Role Specific & Actions */}
             <div className="md:col-span-2 space-y-6">
                
                {/* Role Specific Block (e.g. Student) */}
                <div className="bg-card border-2 border-theme-primary/20 p-6 rounded-3xl shadow-sm relative overflow-hidden">
                   <div className="absolute right-0 top-0 w-32 h-32 bg-theme-primary/5 rounded-bl-full"></div>
                   <h4 className="text-lg font-black text-primary mb-4 flex items-center gap-2">
                     {selectedUser.role === 'Student' ? <GraduationCap className="w-5 h-5 text-theme-primary" /> : <Building className="w-5 h-5 text-purple" />}
                     {selectedUser.role} Details
                   </h4>
                   
                   <div className="grid grid-cols-2 gap-6 relative z-10">
                      <div className="space-y-1">
                         <span className="text-xs font-bold text-secondary">Assigned PG</span>
                         <p className="text-sm font-bold text-primary flex items-center gap-1.5"><MapPin className="w-4 h-4 text-theme-primary"/> {selectedUser.pg}</p>
                      </div>
                      
                      {selectedUser.role === 'Student' && (
                        <>
                          <div className="space-y-1">
                            <span className="text-xs font-bold text-secondary">Room & Bed</span>
                            <p className="text-sm font-bold text-primary">{selectedUser.details?.room}</p>
                          </div>
                          <div className="space-y-1">
                            <span className="text-xs font-bold text-secondary">Admission Status</span>
                            <p className={`text-sm font-bold ${selectedUser.details?.admission === 'Confirmed' ? 'text-success' : 'text-warning'}`}>{selectedUser.details?.admission}</p>
                          </div>
                          <div className="space-y-1">
                            <span className="text-xs font-bold text-secondary">Account Status</span>
                            <p className={`text-sm font-bold ${selectedUser.details?.account === 'Paid' ? 'text-success' : 'text-danger'}`}>{selectedUser.details?.account}</p>
                          </div>
                        </>
                      )}
                   </div>
                </div>

                {/* Quick Actions Panel */}
                <div className="bg-bg-page border border-border/50 p-6 rounded-3xl">
                   <h4 className="text-xs font-bold text-secondary uppercase tracking-wider mb-4">Quick Administrative Actions</h4>
                   <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {selectedUser.status !== 'Active' && (
                        <button className="flex flex-col items-center gap-2 p-4 bg-card border border-success/30 rounded-2xl hover:bg-success-bg transition-colors text-success font-bold text-sm">
                           <CheckCircle className="w-6 h-6" /> Activate User
                        </button>
                      )}
                      {selectedUser.status === 'Active' && (
                        <button className="flex flex-col items-center gap-2 p-4 bg-card border border-danger/30 rounded-2xl hover:bg-danger-bg transition-colors text-danger font-bold text-sm">
                           <ShieldAlert className="w-6 h-6" /> Suspend User
                        </button>
                      )}
                      <button className="flex flex-col items-center gap-2 p-4 bg-card border border-warning/30 rounded-2xl hover:bg-warning-bg transition-colors text-warning font-bold text-sm">
                         <Key className="w-6 h-6" /> Reset Password
                      </button>
                      <button className="flex flex-col items-center gap-2 p-4 bg-card border border-danger/30 rounded-2xl hover:bg-danger-bg transition-colors text-danger font-bold text-sm">
                         <PowerOff className="w-6 h-6" /> Force Logout
                      </button>
                      <button className="flex flex-col items-center gap-2 p-4 bg-card border border-info/30 rounded-2xl hover:bg-info-bg transition-colors text-info font-bold text-sm">
                         <History className="w-6 h-6" /> View Login History
                      </button>
                   </div>
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
}
