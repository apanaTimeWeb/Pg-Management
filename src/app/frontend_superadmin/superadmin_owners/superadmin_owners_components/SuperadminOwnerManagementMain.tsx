'use client';

import React, { useState } from 'react';
import { UserPlus, Shield, Users, Clock, Search, Filter, Eye, Edit, ShieldAlert, PowerOff, Key, History, MoreVertical, CheckCircle, XCircle, Mail, KeySquare, ChevronRight, Lock } from 'lucide-react';

export function SuperadminOwnerManagementMain() {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedOwner, setSelectedOwner] = useState<any | null>(null);

  const tabs = [
    { id: 'all', label: 'All Admins / Owners', icon: Users, color: 'text-info', bg: 'bg-info-bg' },
    { id: 'pending', label: 'Pending Admins', icon: Clock, color: 'text-warning', bg: 'bg-warning-bg' },
    { id: 'create', label: 'Create Admin / Owner', icon: UserPlus, color: 'text-success', bg: 'bg-success-bg' },
    { id: 'permissions', label: 'Admin Permissions', icon: Shield, color: 'text-purple', bg: 'bg-purple-bg' },
  ];

  const dummyOwners = [
    { id: 'OWN-1042', name: 'Rahul Sharma', pg: 'Sunshine Boys PG', email: 'rahul@sunshine.com', mobile: '+91 9876543210', status: 'Active', plan: 'Professional', lastLogin: '2 hrs ago', created: '01 Jan 2026' },
    { id: 'OWN-1043', name: 'Neha Verma', pg: 'Comfort Girls PG', email: 'neha@comfortpg.com', mobile: '+91 9123456789', status: 'Active', plan: 'Basic', lastLogin: '5 mins ago', created: '15 Feb 2026' },
    { id: 'OWN-1044', name: 'Amit Singh', pg: 'Elite Stay Co-ed', email: 'amit@elitestay.com', mobile: '+91 9988776655', status: 'Suspended', plan: 'Enterprise', lastLogin: '1 week ago', created: '10 Mar 2026' },
  ];

  const dummyPending = [
    { id: 'REQ-5021', name: 'Priya Sharma', pg: 'Green Valley PG', email: 'priya@greenvalley.com', mobile: '+91 9998887776', status: 'Pending', docsVerified: false, contactVerified: true, requestDate: '02 Oct 2026' },
    { id: 'REQ-5022', name: 'Vikas Kumar', pg: 'Student Nest PG', email: 'vikas.k@studentnest.in', mobile: '+91 9112233445', status: 'Pending', docsVerified: true, contactVerified: false, requestDate: '01 Oct 2026' },
  ];

  const createFlowSteps = ['Create Account', 'Assign PG', 'Assign Plan', 'Set Status', 'Send Credentials'];

  return (
    <div className="w-full h-full space-y-6 pb-20">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-theme-primary to-theme-primary-hover text-white rounded-3xl p-8 shadow-lg relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-700">
          <Shield className="w-40 h-40" />
        </div>
        <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black mb-2 flex items-center gap-3">
              <Shield className="w-8 h-8" /> Admin / Owner Management
            </h1>
            <p className="text-white/80 font-medium max-w-xl">
              Control the top-level accounts (PG Owners), configure global permissions, and manage onboarding.
            </p>
          </div>
          <button onClick={() => setActiveTab('create')} className="bg-white text-theme-primary px-6 py-3 rounded-xl font-bold shadow-md hover:bg-white/90 transition-colors flex items-center gap-2 whitespace-nowrap">
            <UserPlus className="w-5 h-5" /> Add New Admin
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-[700px]">
        
        {/* Sidebar Navigation */}
        <div className="bg-card border border-border/50 rounded-3xl p-4 shadow-sm h-fit">
          <div className="space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setSelectedOwner(null); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all ${
                  activeTab === tab.id 
                    ? 'bg-primary-subtle text-theme-primary shadow-sm' 
                    : 'text-secondary hover:bg-bg-page hover:text-primary'
                }`}
              >
                <div className={`p-1.5 rounded-lg ${activeTab === tab.id ? tab.bg : 'bg-transparent'}`}>
                  <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-theme-primary' : tab.color}`} />
                </div>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content Area */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* ALL ADMINS TAB */}
          {activeTab === 'all' && !selectedOwner && (
            <div className="bg-card border border-border/50 rounded-3xl shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500 overflow-hidden flex flex-col h-full">
              <div className="p-6 border-b border-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-bg-page/50">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="w-4 h-4 text-secondary absolute left-3 top-1/2 -translate-y-1/2" />
                    <input type="text" placeholder="Search Admins by name, PG, email..." className="pl-9 pr-4 py-2 w-72 bg-card border border-border/50 rounded-xl text-sm focus:ring-2 focus:ring-theme-primary font-medium" />
                  </div>
                  <button className="p-2 border border-border/50 bg-card rounded-xl text-secondary hover:text-primary transition-colors tooltip" title="Advanced Filter"><Filter className="w-4 h-4" /></button>
                </div>
              </div>

              <div className="flex-1 overflow-auto p-4">
                <table className="w-full text-left border-collapse whitespace-nowrap">
                  <thead>
                    <tr className="bg-bg-page/50 border-b border-border/50">
                      <th className="py-3 px-4 text-xs font-bold text-secondary uppercase tracking-wider">Admin Info</th>
                      <th className="py-3 px-4 text-xs font-bold text-secondary uppercase tracking-wider">PG / Plan</th>
                      <th className="py-3 px-4 text-xs font-bold text-secondary uppercase tracking-wider text-center">Status</th>
                      <th className="py-3 px-4 text-xs font-bold text-secondary uppercase tracking-wider">Last Login</th>
                      <th className="py-3 px-4 text-xs font-bold text-secondary uppercase tracking-wider text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/30">
                    {dummyOwners.map((own, i) => (
                      <tr key={i} className="hover:bg-bg-page/50 transition-colors">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-info-bg text-info flex items-center justify-center font-bold text-sm">
                              {own.name.charAt(0)}
                            </div>
                            <div>
                              <div className="font-bold text-primary">{own.name}</div>
                              <div className="text-xs text-secondary font-medium">{own.mobile} • {own.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="font-bold text-theme-primary">{own.pg}</div>
                          <div className="text-xs font-bold text-secondary mt-1">{own.plan} Plan</div>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold ${
                            own.status === 'Active' ? 'bg-success-bg text-success' : 'bg-danger-bg text-danger'
                          }`}>
                            {own.status}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-sm text-secondary font-medium">{own.lastLogin}</td>
                        <td className="py-4 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button onClick={() => setSelectedOwner(own)} className="p-1.5 text-theme-primary hover:bg-primary-subtle rounded-lg transition-colors tooltip" title="View Profile"><Eye className="w-4 h-4" /></button>
                            <div className="relative group/menu">
                              <button className="p-1.5 text-secondary hover:bg-bg-page rounded-lg transition-colors"><MoreVertical className="w-4 h-4" /></button>
                              <div className="absolute right-0 mt-2 w-48 bg-card border border-border/50 rounded-xl shadow-xl opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all z-50">
                                <div className="p-2 space-y-1 text-left">
                                  <button className="w-full text-left px-3 py-2 text-sm font-bold text-primary hover:bg-bg-page rounded-lg flex items-center gap-2"><Edit className="w-4 h-4 text-info"/> Edit Admin</button>
                                  {own.status !== 'Active' && <button className="w-full text-left px-3 py-2 text-sm font-bold text-primary hover:bg-bg-page rounded-lg flex items-center gap-2"><CheckCircle className="w-4 h-4 text-success"/> Activate</button>}
                                  {own.status === 'Active' && <button className="w-full text-left px-3 py-2 text-sm font-bold text-primary hover:bg-bg-page rounded-lg flex items-center gap-2"><ShieldAlert className="w-4 h-4 text-danger"/> Suspend</button>}
                                  <button className="w-full text-left px-3 py-2 text-sm font-bold text-primary hover:bg-bg-page rounded-lg flex items-center gap-2"><Key className="w-4 h-4 text-warning"/> Reset Password</button>
                                  <button className="w-full text-left px-3 py-2 text-sm font-bold text-primary hover:bg-bg-page rounded-lg flex items-center gap-2"><PowerOff className="w-4 h-4 text-danger"/> Force Logout</button>
                                  <button className="w-full text-left px-3 py-2 text-sm font-bold text-primary hover:bg-bg-page rounded-lg flex items-center gap-2"><Mail className="w-4 h-4 text-purple"/> Verify Email/Mobile</button>
                                  <button className="w-full text-left px-3 py-2 text-sm font-bold text-primary hover:bg-bg-page rounded-lg flex items-center gap-2"><History className="w-4 h-4 text-secondary"/> Login History</button>
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
            </div>
          )}

          {/* SINGLE ADMIN VIEW (from All Admins) */}
          {activeTab === 'all' && selectedOwner && (
            <div className="bg-card border border-border/50 rounded-3xl shadow-sm animate-in slide-in-from-right-8 duration-300 flex flex-col min-h-[600px]">
              <div className="p-6 border-b border-border/50 flex items-center justify-between bg-bg-page/50">
                <div className="flex items-center gap-4">
                  <button onClick={() => setSelectedOwner(null)} className="px-3 py-1.5 border border-border/50 bg-card rounded-xl text-sm font-bold text-secondary hover:text-primary transition-colors">Back</button>
                  <h2 className="text-xl font-black text-primary">Admin Profile</h2>
                </div>
              </div>
              <div className="flex-1 p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="space-y-6">
                    <div className="bg-bg-page border border-border/50 p-6 rounded-3xl flex flex-col items-center text-center">
                       <div className="w-24 h-24 rounded-full bg-info-bg text-info flex items-center justify-center font-black text-4xl mb-4">
                          {selectedOwner.name.charAt(0)}
                       </div>
                       <h3 className="text-2xl font-black text-primary">{selectedOwner.name}</h3>
                       <span className="text-sm font-bold text-secondary mt-1">{selectedOwner.id}</span>
                       <span className={`mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold ${
                          selectedOwner.status === 'Active' ? 'bg-success-bg text-success' : 'bg-danger-bg text-danger'
                        }`}>
                          {selectedOwner.status}
                        </span>
                    </div>
                    <div className="bg-bg-page border border-border/50 p-6 rounded-3xl space-y-4">
                       <h4 className="text-xs font-bold text-secondary uppercase tracking-wider mb-2">Account Details</h4>
                       <div className="flex justify-between border-b border-border/50 pb-2"><span className="text-sm text-secondary font-medium">Mobile</span> <span className="text-sm font-bold text-primary">{selectedOwner.mobile}</span></div>
                       <div className="flex justify-between border-b border-border/50 pb-2"><span className="text-sm text-secondary font-medium">Email</span> <span className="text-sm font-bold text-primary">{selectedOwner.email}</span></div>
                       <div className="flex justify-between border-b border-border/50 pb-2"><span className="text-sm text-secondary font-medium">Associated PG</span> <span className="text-sm font-bold text-theme-primary">{selectedOwner.pg}</span></div>
                       <div className="flex justify-between"><span className="text-sm text-secondary font-medium">Subscription</span> <span className="text-sm font-bold text-primary">{selectedOwner.plan} Plan</span></div>
                    </div>
                 </div>
                 <div className="space-y-6">
                    <div className="bg-bg-page border border-border/50 p-6 rounded-3xl">
                       <h4 className="text-xs font-bold text-secondary uppercase tracking-wider mb-4">Quick Administrative Actions</h4>
                       <div className="grid grid-cols-2 gap-4">
                          {selectedOwner.status !== 'Active' && <button className="flex flex-col items-center gap-2 p-4 bg-card border border-success/30 rounded-2xl hover:bg-success-bg text-success font-bold text-sm"><CheckCircle className="w-5 h-5"/> Activate</button>}
                          {selectedOwner.status === 'Active' && <button className="flex flex-col items-center gap-2 p-4 bg-card border border-danger/30 rounded-2xl hover:bg-danger-bg text-danger font-bold text-sm"><ShieldAlert className="w-5 h-5"/> Suspend</button>}
                          <button className="flex flex-col items-center gap-2 p-4 bg-card border border-warning/30 rounded-2xl hover:bg-warning-bg text-warning font-bold text-sm"><Key className="w-5 h-5"/> Reset Password</button>
                          <button className="flex flex-col items-center gap-2 p-4 bg-card border border-danger/30 rounded-2xl hover:bg-danger-bg text-danger font-bold text-sm"><PowerOff className="w-5 h-5"/> Force Logout</button>
                          <button className="flex flex-col items-center gap-2 p-4 bg-card border border-purple/30 rounded-2xl hover:bg-purple-bg text-purple font-bold text-sm"><Mail className="w-5 h-5"/> Verify Contact</button>
                          <button className="flex flex-col items-center gap-2 p-4 bg-card border border-info/30 rounded-2xl hover:bg-info-bg text-info font-bold text-sm"><History className="w-5 h-5"/> View Activity</button>
                       </div>
                    </div>
                 </div>
              </div>
            </div>
          )}

          {/* PENDING ADMINS TAB */}
          {activeTab === 'pending' && (
            <div className="bg-card border border-border/50 rounded-3xl shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500 overflow-hidden flex flex-col h-full p-6">
              <h2 className="text-xl font-black text-primary mb-6 border-b border-border/50 pb-4 flex items-center gap-2">
                <Clock className="w-6 h-6 text-warning" /> Pending Onboarding Requests
              </h2>
              
              <div className="space-y-4">
                {dummyPending.map((req, i) => (
                  <div key={i} className="bg-bg-page border border-border/50 rounded-2xl p-6 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-warning-bg text-warning flex items-center justify-center font-black text-xl">{req.name.charAt(0)}</div>
                      <div>
                        <h3 className="font-bold text-primary text-lg">{req.name} <span className="text-sm text-theme-primary ml-2">• {req.pg}</span></h3>
                        <div className="text-sm text-secondary font-medium mt-1 flex gap-4">
                          <span>{req.mobile}</span>
                          <span>{req.email}</span>
                          <span>Req: {req.requestDate}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 min-w-[200px]">
                      <div className="flex justify-between items-center text-xs font-bold">
                         <span className="text-secondary">Docs Verified:</span> 
                         {req.docsVerified ? <span className="text-success flex items-center gap-1"><CheckCircle className="w-3 h-3"/> Yes</span> : <span className="text-danger flex items-center gap-1"><XCircle className="w-3 h-3"/> No</span>}
                      </div>
                      <div className="flex justify-between items-center text-xs font-bold">
                         <span className="text-secondary">Contact Verified:</span> 
                         {req.contactVerified ? <span className="text-success flex items-center gap-1"><CheckCircle className="w-3 h-3"/> Yes</span> : <span className="text-danger flex items-center gap-1"><XCircle className="w-3 h-3"/> No</span>}
                      </div>
                    </div>
                    <div className="flex gap-2">
                       <button className="bg-success hover:bg-success/90 text-white px-4 py-2 rounded-xl text-sm font-bold transition-colors">Approve</button>
                       <button className="bg-danger-bg hover:bg-danger-bg text-danger px-4 py-2 rounded-xl text-sm font-bold transition-colors">Reject</button>
                       <button className="bg-card border border-border/50 hover:bg-bg-page px-4 py-2 rounded-xl text-sm font-bold text-primary transition-colors">Resend Invite</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CREATE ADMIN / OWNER TAB */}
          {activeTab === 'create' && (
            <div className="bg-card border border-border/50 rounded-3xl p-8 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500 relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-success-bg rounded-full blur-3xl"></div>
              <h2 className="text-xl font-black text-primary mb-8 border-b border-border/50 pb-4 flex items-center gap-2 relative z-10">
                <UserPlus className="w-6 h-6 text-success" /> Admin Onboarding Flow
              </h2>
              
              <div className="relative z-10 max-w-3xl mx-auto space-y-8">
                
                {/* Stepper */}
                <div className="flex items-center justify-between relative mb-12">
                   <div className="absolute top-1/2 left-0 right-0 h-1 bg-border/50 -translate-y-1/2 z-0"></div>
                   {createFlowSteps.map((step, i) => (
                     <div key={i} className="relative z-10 flex flex-col items-center gap-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${i === 0 ? 'bg-theme-primary text-white ring-4 ring-theme-primary/20' : 'bg-bg-page text-secondary border border-border/50'}`}>
                           {i + 1}
                        </div>
                        <span className={`text-xs font-bold ${i === 0 ? 'text-theme-primary' : 'text-secondary'}`}>{step}</span>
                     </div>
                   ))}
                </div>

                {/* Step 1 Form */}
                <div className="bg-bg-page border border-border/50 rounded-2xl p-6 space-y-6">
                  <h3 className="font-black text-lg text-primary mb-4">Step 1: Create Account Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-secondary uppercase tracking-wider">Full Name</label>
                      <input type="text" placeholder="e.g. Rahul Sharma" className="w-full px-4 py-3 bg-card border border-border/50 rounded-xl focus:ring-2 focus:ring-theme-primary font-medium text-primary" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-secondary uppercase tracking-wider">Mobile Number</label>
                      <input type="text" placeholder="+91" className="w-full px-4 py-3 bg-card border border-border/50 rounded-xl focus:ring-2 focus:ring-theme-primary font-medium text-primary" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-xs font-bold text-secondary uppercase tracking-wider">Email Address</label>
                      <input type="email" placeholder="owner@pg.com" className="w-full px-4 py-3 bg-card border border-border/50 rounded-xl focus:ring-2 focus:ring-theme-primary font-medium text-primary" />
                    </div>
                  </div>
                  <div className="flex justify-end pt-4">
                    <button className="bg-theme-primary hover:bg-theme-primary-hover text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-colors shadow-md">
                      Next Step <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ADMIN PERMISSIONS TAB */}
          {activeTab === 'permissions' && (
            <div className="bg-card border border-border/50 rounded-3xl p-8 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500 relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-purple-bg rounded-full blur-3xl"></div>
              <h2 className="text-xl font-black text-primary mb-6 border-b border-border/50 pb-4 flex items-center gap-2 relative z-10">
                <Shield className="w-6 h-6 text-purple" /> Global Role Permissions
              </h2>
              
              <div className="relative z-10 space-y-8">
                <p className="text-sm font-medium text-secondary">Configure what actions the fixed login roles (Superadmin, Admin/Owner, Manager, Cook, Student) can perform across modules. New login roles cannot be created here.</p>

                {/* Roles Selector */}
                <div className="flex gap-2">
                   {['Superadmin', 'Admin/Owner', 'Manager', 'Cook', 'Student'].map((role, i) => (
                      <button key={i} className={`px-4 py-2 rounded-xl text-sm font-bold transition-colors ${role === 'Admin/Owner' ? 'bg-purple-bg text-purple border border-purple/30' : 'bg-bg-page border border-border/50 text-secondary hover:text-primary'}`}>
                        {role}
                      </button>
                   ))}
                </div>

                {/* Permissions Matrix for Selected Role */}
                <div className="bg-bg-page border border-border/50 rounded-2xl overflow-hidden">
                  <div className="p-4 bg-purple/5 border-b border-border/50">
                    <h3 className="font-bold text-primary flex items-center gap-2"><Lock className="w-4 h-4 text-purple" /> Permissions for: <span className="text-purple">Admin/Owner</span></h3>
                  </div>
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-border/50">
                        <th className="py-3 px-6 text-xs font-bold text-secondary uppercase tracking-wider">Module</th>
                        <th className="py-3 px-6 text-xs font-bold text-secondary uppercase tracking-wider text-center">View</th>
                        <th className="py-3 px-6 text-xs font-bold text-secondary uppercase tracking-wider text-center">Add</th>
                        <th className="py-3 px-6 text-xs font-bold text-secondary uppercase tracking-wider text-center">Edit (Own)</th>
                        <th className="py-3 px-6 text-xs font-bold text-secondary uppercase tracking-wider text-center">Delete</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/30">
                      {[
                        { module: 'Student Module', view: true, add: true, edit: true, del: false },
                        { module: 'Fees / Payments', view: true, add: true, edit: true, del: false },
                        { module: 'PG Setup', view: true, add: false, edit: true, del: false },
                        { module: 'Reports', view: true, add: false, edit: false, del: false },
                        { module: 'Staff Management', view: true, add: true, edit: true, del: true },
                      ].map((perm, i) => (
                        <tr key={i} className="hover:bg-card transition-colors">
                          <td className="py-4 px-6 text-sm font-bold text-primary">{perm.module}</td>
                          <td className="py-4 px-6 text-center"><input type="checkbox" defaultChecked={perm.view} className="w-5 h-5 rounded border-border text-purple focus:ring-purple bg-bg-page" /></td>
                          <td className="py-4 px-6 text-center"><input type="checkbox" defaultChecked={perm.add} className="w-5 h-5 rounded border-border text-purple focus:ring-purple bg-bg-page" /></td>
                          <td className="py-4 px-6 text-center"><input type="checkbox" defaultChecked={perm.edit} className="w-5 h-5 rounded border-border text-purple focus:ring-purple bg-bg-page" /></td>
                          <td className="py-4 px-6 text-center"><input type="checkbox" defaultChecked={perm.del} className="w-5 h-5 rounded border-border text-purple focus:ring-purple bg-bg-page" /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="p-4 border-t border-border/50 flex justify-end bg-card">
                     <button className="bg-theme-primary text-white px-6 py-2 rounded-xl text-sm font-bold shadow-md hover:bg-theme-primary-hover">Save Permissions</button>
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
