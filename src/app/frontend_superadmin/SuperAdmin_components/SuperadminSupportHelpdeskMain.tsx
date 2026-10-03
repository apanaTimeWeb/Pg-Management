'use client';

import React, { useState } from 'react';
import { Ticket, Search, Filter, Plus, MessageSquare, Paperclip, MoreVertical, AlertCircle, CheckCircle, Clock, User, Send, ArrowRightCircle } from 'lucide-react';

export function SuperadminSupportHelpdeskMain() {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedTicket, setSelectedTicket] = useState<any | null>(null);

  const stats = [
    { label: 'Open Tickets', value: '24', color: 'text-danger', bg: 'bg-danger-bg' },
    { label: 'Assigned', value: '12', color: 'text-info', bg: 'bg-info-bg' },
    { label: 'In Progress', value: '8', color: 'text-warning', bg: 'bg-warning-bg' },
    { label: 'Resolved (Today)', value: '15', color: 'text-success', bg: 'bg-success-bg' },
  ];

  const tickets = [
    { id: 'TKT-1042', subject: 'Payment Gateway Integration Failed', category: 'Payment', priority: 'High', status: 'Open', user: 'Rahul Sharma (Owner)', date: '10 mins ago' },
    { id: 'TKT-1041', subject: 'Unable to login to Dashboard', category: 'Login', priority: 'Critical', status: 'Assigned', user: 'Neha Verma (Student)', date: '1 hour ago' },
    { id: 'TKT-1040', subject: 'Data sync issue with App', category: 'Technical Issue', priority: 'Medium', status: 'In Progress', user: 'Vikas Kumar (Manager)', date: '3 hours ago' },
    { id: 'TKT-1039', subject: 'PG Setup Approval Pending', category: 'PG Setup', priority: 'Low', status: 'Waiting for User', user: 'Amit Singh (Owner)', date: '1 day ago' },
    { id: 'TKT-1038', subject: 'Bug in Subscription Renewal', category: 'Bug', priority: 'High', status: 'Resolved', user: 'System Alert', date: '2 days ago' },
  ];

  return (
    <div className="w-full h-full space-y-6 pb-20">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-theme-primary to-theme-primary-hover text-white rounded-3xl p-8 shadow-lg relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-700">
          <Ticket className="w-40 h-40" />
        </div>
        <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black mb-2 flex items-center gap-3">
              <Ticket className="w-8 h-8" /> Support & Helpdesk
            </h1>
            <p className="text-white/80 font-medium max-w-xl">
              Manage platform issues, communicate with users, and track ticket lifecycles efficiently.
            </p>
          </div>
          <button className="bg-white text-theme-primary px-6 py-3 rounded-xl font-bold shadow-md hover:bg-white/90 transition-colors flex items-center gap-2 whitespace-nowrap">
            <Plus className="w-5 h-5" /> Create Ticket
          </button>
        </div>
      </div>

      {!selectedTicket ? (
        <>
          {/* KPI Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <div key={i} className={`p-5 rounded-2xl border border-border/50 bg-bg-page flex items-center justify-between hover:border-${stat.color.split('-')[1]}/30 transition-colors`}>
                <div>
                  <p className="text-xs font-bold text-secondary uppercase tracking-wider mb-1">{stat.label}</p>
                  <h3 className={`text-2xl font-black ${stat.color}`}>{stat.value}</h3>
                </div>
                <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                  <Ticket className="w-6 h-6" />
                </div>
              </div>
            ))}
          </div>

          {/* Ticket List Area */}
          <div className="bg-card border border-border/50 rounded-3xl shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="p-6 border-b border-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex gap-2 bg-bg-page p-1 rounded-xl border border-border/50">
                {['All', 'Open', 'In Progress', 'Resolved'].map((tab) => (
                  <button key={tab} onClick={() => setActiveTab(tab.toLowerCase())} className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-colors ${activeTab === tab.toLowerCase() ? 'bg-card shadow-sm text-theme-primary border border-border/50' : 'text-secondary hover:text-primary'}`}>
                    {tab}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="w-4 h-4 text-secondary absolute left-3 top-1/2 -translate-y-1/2" />
                  <input type="text" placeholder="Search tickets..." className="pl-9 pr-4 py-2 bg-bg-page border border-border/50 rounded-xl text-sm focus:ring-2 focus:ring-theme-primary font-medium" />
                </div>
                <button className="p-2 border border-border/50 bg-bg-page rounded-xl text-secondary hover:text-primary transition-colors">
                  <Filter className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse whitespace-nowrap">
                <thead>
                  <tr className="bg-bg-page/50 border-b border-border/50">
                    <th className="py-4 px-6 text-xs font-bold text-secondary uppercase tracking-wider">Ticket Details</th>
                    <th className="py-4 px-6 text-xs font-bold text-secondary uppercase tracking-wider">Category & Priority</th>
                    <th className="py-4 px-6 text-xs font-bold text-secondary uppercase tracking-wider">Status</th>
                    <th className="py-4 px-6 text-xs font-bold text-secondary uppercase tracking-wider text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30">
                  {tickets.map((tkt, i) => (
                    <tr key={i} className="hover:bg-bg-page/50 transition-colors cursor-pointer group" onClick={() => setSelectedTicket(tkt)}>
                      <td className="py-4 px-6">
                        <div className="flex flex-col">
                          <span className="font-bold text-primary group-hover:text-theme-primary transition-colors">{tkt.subject}</span>
                          <span className="text-xs text-secondary font-medium mt-1">{tkt.id} • {tkt.user} • {tkt.date}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex flex-col gap-1.5 items-start">
                          <span className="bg-secondary/10 text-secondary px-2 py-0.5 rounded text-[10px] font-bold uppercase">{tkt.category}</span>
                          <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${tkt.priority === 'Critical' ? 'bg-danger-bg text-danger' : tkt.priority === 'High' ? 'bg-warning-bg text-warning-fg' : 'bg-info-bg text-info'}`}>{tkt.priority}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="flex items-center gap-1.5 text-xs font-bold">
                          {tkt.status === 'Open' && <AlertCircle className="w-4 h-4 text-danger" />}
                          {tkt.status === 'Assigned' && <User className="w-4 h-4 text-info" />}
                          {tkt.status === 'In Progress' && <Clock className="w-4 h-4 text-warning" />}
                          {tkt.status === 'Waiting for User' && <MessageSquare className="w-4 h-4 text-purple" />}
                          {tkt.status === 'Resolved' && <CheckCircle className="w-4 h-4 text-success" />}
                          {tkt.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button className="text-theme-primary font-bold text-sm hover:underline">View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        /* TICKET DETAILS VIEW */
        <div className="bg-card border border-border/50 rounded-3xl shadow-sm animate-in slide-in-from-right-8 duration-500 flex flex-col md:flex-row overflow-hidden min-h-[600px]">
          
          {/* Main Chat/Thread Area */}
          <div className="flex-1 flex flex-col border-r border-border/50">
            {/* Thread Header */}
            <div className="p-6 border-b border-border/50 flex items-center justify-between bg-bg-page/50">
              <div className="flex items-center gap-4">
                <button onClick={() => setSelectedTicket(null)} className="text-secondary hover:text-primary transition-colors bg-card border border-border rounded-lg p-2 font-bold text-sm">
                   Back
                </button>
                <div>
                  <h2 className="text-xl font-black text-primary">{selectedTicket.subject}</h2>
                  <p className="text-sm text-secondary font-medium">{selectedTicket.id} • Opened {selectedTicket.date}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-2 text-success hover:bg-success-bg rounded-xl transition-colors tooltip" title="Resolve Ticket"><CheckCircle className="w-5 h-5" /></button>
                <button className="p-2 text-danger hover:bg-danger-bg rounded-xl transition-colors tooltip" title="Escalate"><ArrowRightCircle className="w-5 h-5" /></button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-bg-page/30">
              {/* User Message */}
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-info-bg text-info flex items-center justify-center font-bold shrink-0">R</div>
                <div className="bg-card border border-border/50 p-4 rounded-2xl rounded-tl-sm max-w-2xl shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-bold text-primary text-sm">{selectedTicket.user}</span>
                    <span className="text-xs text-secondary font-medium">{selectedTicket.date}</span>
                  </div>
                  <p className="text-sm text-primary/90 leading-relaxed">Hi Support, I am trying to integrate the Razorpay payment gateway but it keeps failing at the webhook verification step. Please check and assist ASAP.</p>
                  <div className="mt-3 flex items-center gap-2">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-bg-page border border-border/50 rounded-lg text-xs font-bold text-theme-primary cursor-pointer hover:bg-theme-primary/5 transition-colors">
                      <Paperclip className="w-3 h-3" /> error_log.png
                    </div>
                  </div>
                </div>
              </div>

              {/* Internal Note */}
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-warning-bg text-warning flex items-center justify-center font-bold shrink-0"><AlertCircle className="w-5 h-5" /></div>
                <div className="bg-warning-bg border border-warning/30 p-4 rounded-2xl rounded-tl-sm max-w-2xl">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-bold text-warning-fg text-sm">System (Internal Note)</span>
                    <span className="text-xs text-warning font-medium">5 mins ago</span>
                  </div>
                  <p className="text-sm text-warning-fg/90 italic">Ticket automatically assigned to Tech Support Level 2 due to priority.</p>
                </div>
              </div>
            </div>

            {/* Reply Box */}
            <div className="p-4 border-t border-border/50 bg-bg-page/50">
               <div className="bg-card border border-border/50 rounded-2xl focus-within:ring-2 focus-within:ring-theme-primary focus-within:border-theme-primary transition-all p-2">
                 <textarea rows={3} placeholder="Type your reply here... (Use @ to mention staff)" className="w-full bg-transparent border-none focus:ring-0 text-sm p-2 text-primary resize-none"></textarea>
                 <div className="flex items-center justify-between pt-2 border-t border-border/30 px-2 mt-2">
                    <div className="flex items-center gap-3">
                      <button className="text-secondary hover:text-primary transition-colors"><Paperclip className="w-4 h-4" /></button>
                      <label className="flex items-center gap-1.5 text-xs font-bold text-warning cursor-pointer">
                        <input type="checkbox" className="rounded border-border bg-bg-page text-warning focus:ring-warning" />
                        Internal Note
                      </label>
                    </div>
                    <button className="bg-theme-primary hover:bg-theme-primary-hover text-white px-5 py-2 rounded-xl font-bold flex items-center gap-2 shadow-md transition-colors text-sm">
                      <Send className="w-4 h-4" /> Send Reply
                    </button>
                 </div>
               </div>
            </div>
          </div>

          {/* Ticket Metadata Sidebar */}
          <div className="w-full md:w-80 bg-bg-page/50 p-6 flex flex-col gap-6">
            <div>
              <h3 className="text-xs font-bold text-secondary uppercase tracking-wider mb-3">Ticket Properties</h3>
              <div className="space-y-4">
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-secondary font-medium">Status</span>
                  <select className="bg-card border border-border/50 rounded-lg px-3 py-1.5 text-sm font-bold text-primary focus:ring-2 focus:ring-theme-primary cursor-pointer">
                    <option>Open</option>
                    <option>Assigned</option>
                    <option>In Progress</option>
                    <option>Waiting for User</option>
                    <option>Resolved</option>
                    <option>Closed</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-secondary font-medium">Priority</span>
                  <select className="bg-card border border-border/50 rounded-lg px-3 py-1.5 text-sm font-bold text-danger focus:ring-2 focus:ring-theme-primary cursor-pointer">
                    <option>Critical</option>
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-secondary font-medium">Category</span>
                  <select className="bg-card border border-border/50 rounded-lg px-3 py-1.5 text-sm font-bold text-primary focus:ring-2 focus:ring-theme-primary cursor-pointer">
                    <option>Payment</option>
                    <option>Login</option>
                    <option>Subscription</option>
                    <option>Bug</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-secondary font-medium">Assigned To</span>
                  <select className="bg-card border border-border/50 rounded-lg px-3 py-1.5 text-sm font-bold text-theme-primary focus:ring-2 focus:ring-theme-primary cursor-pointer">
                    <option>Unassigned</option>
                    <option>Tech Team L2</option>
                    <option>Admin (Rahul)</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="border-t border-border/50 pt-6">
              <h3 className="text-xs font-bold text-secondary uppercase tracking-wider mb-3">User Information</h3>
              <div className="bg-card border border-border/50 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-info-bg text-info flex items-center justify-center font-bold shrink-0">R</div>
                  <div>
                    <p className="font-bold text-primary text-sm">Rahul Sharma</p>
                    <p className="text-xs text-secondary">Owner</p>
                  </div>
                </div>
                <div className="space-y-1.5 text-xs text-secondary font-medium">
                  <p>Email: rahul@smartpg.com</p>
                  <p>Phone: +91 9876543210</p>
                  <p>Plan: <span className="text-purple font-bold">Pro (Active)</span></p>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
