'use client';

import React, { useState } from 'react';
import { Package, Check, X, Shield, Users, Building, Activity, Copy, Edit, Archive, Play, Pause, ChevronRight, Clock, ShieldCheck, CheckCircle, RefreshCcw, Bell, AlertCircle } from 'lucide-react';

export function SuperadminSubscriptionPlansMain() {
  const [activeTab, setActiveTab] = useState('plans');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const tabs = [
    { id: 'plans', label: 'Pricing Plans', icon: Package, color: 'text-info', bg: 'bg-info-bg' },
    { id: 'subscriptions', label: 'Active Subscriptions', icon: Users, color: 'text-success', bg: 'bg-success-bg' },
    { id: 'features', label: 'Feature Access Control', icon: Shield, color: 'text-warning', bg: 'bg-warning-bg' },
    { id: 'workflow', label: 'Renewal Workflow', icon: Activity, color: 'text-purple', bg: 'bg-purple-bg' },
  ];

  const plans = [
    { 
      name: 'Basic', price: '₹999/mo', yearly: '₹9,990/yr', users: 'Up to 50', pgs: '1 PG', storage: '5 GB', 
      features: ['Student Management', 'Fees Collection', 'Basic Reports'], 
      missing: ['Mess Management', 'API Access', 'WhatsApp Alerts'],
      status: 'Active', color: 'text-info' 
    },
    { 
      name: 'Professional', price: '₹2,499/mo', yearly: '₹24,990/yr', users: 'Up to 250', pgs: '5 PGs', storage: '20 GB', 
      features: ['Everything in Basic', 'Mess Management', 'WhatsApp Alerts', 'Advanced Analytics'], 
      missing: ['API Access', 'White-labeling'],
      status: 'Active', color: 'text-theme-primary', popular: true 
    },
    { 
      name: 'Enterprise', price: '₹5,999/mo', yearly: '₹59,990/yr', users: 'Unlimited', pgs: 'Unlimited', storage: '100 GB', 
      features: ['Everything in Pro', 'API Access', 'White-labeling', 'Dedicated Support Manager'], 
      missing: [],
      status: 'Active', color: 'text-warning' 
    }
  ];

  return (
    <div className="w-full h-full space-y-6 pb-20">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-theme-primary to-theme-primary-hover text-white rounded-3xl p-8 shadow-lg relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-700">
          <Package className="w-40 h-40" />
        </div>
        <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black mb-2 flex items-center gap-3">
              <Package className="w-8 h-8" /> Subscription & Plans
            </h1>
            <p className="text-white/80 font-medium max-w-xl">
              Configure commercial PG software tiers, manage PG subscriptions, and define feature access limits.
            </p>
          </div>
          <button onClick={() => setShowCreateModal(true)} className="bg-white text-theme-primary px-6 py-3 rounded-xl font-bold shadow-md hover:bg-white/90 transition-colors flex items-center gap-2 whitespace-nowrap">
            <Package className="w-5 h-5" /> Create New Plan
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Sidebar Navigation */}
        <div className="bg-card border border-border/50 rounded-3xl p-4 shadow-sm h-fit">
          <div className="space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
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
          
          {/* PLANS TAB */}
          {activeTab === 'plans' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-black text-primary flex items-center gap-2">
                  <Package className="w-6 h-6 text-theme-primary" /> Active Plans
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans.map((plan, i) => (
                  <div key={i} className={`bg-card border ${plan.popular ? 'border-theme-primary shadow-lg ring-4 ring-theme-primary/10 scale-105' : 'border-border/50 shadow-sm'} rounded-3xl p-6 flex flex-col relative overflow-hidden transition-all hover:shadow-xl`}>
                    {plan.popular && <div className="absolute top-4 right-[-30px] bg-theme-primary text-white text-[10px] font-black uppercase tracking-wider py-1 px-10 rotate-45">Most Popular</div>}
                    
                    <h3 className={`text-2xl font-black mb-1 ${plan.color}`}>{plan.name}</h3>
                    <div className="flex items-baseline gap-1 mb-4">
                      <span className="text-3xl font-black text-primary">{plan.price.split('/')[0]}</span>
                      <span className="text-sm font-bold text-secondary">/{plan.price.split('/')[1]}</span>
                    </div>
                    
                    <div className="space-y-4 flex-1">
                      <div className="flex justify-between text-sm border-b border-border/50 pb-2">
                        <span className="text-secondary font-medium">Students</span>
                        <span className="font-bold text-primary">{plan.users}</span>
                      </div>
                      <div className="flex justify-between text-sm border-b border-border/50 pb-2">
                        <span className="text-secondary font-medium">Max PGs</span>
                        <span className="font-bold text-primary">{plan.pgs}</span>
                      </div>
                      <div className="flex justify-between text-sm border-b border-border/50 pb-2">
                        <span className="text-secondary font-medium">Storage</span>
                        <span className="font-bold text-primary">{plan.storage}</span>
                      </div>
                      
                      <div className="pt-2 space-y-2">
                        {plan.features.map((f, j) => (
                          <div key={j} className="flex items-start gap-2 text-sm">
                            <Check className="w-4 h-4 text-success shrink-0 mt-0.5" />
                            <span className="font-medium text-primary">{f}</span>
                          </div>
                        ))}
                        {plan.missing.map((f, j) => (
                          <div key={j} className="flex items-start gap-2 text-sm opacity-50">
                            <X className="w-4 h-4 text-danger shrink-0 mt-0.5" />
                            <span className="font-medium text-secondary line-through">{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-8 pt-4 border-t border-border/50 flex gap-2">
                      <button className="flex-1 p-2 bg-bg-page hover:bg-primary-subtle text-theme-primary rounded-xl font-bold transition-colors tooltip flex justify-center items-center gap-1" title="Edit Plan"><Edit className="w-4 h-4" /> Edit</button>
                      <button className="p-2 bg-bg-page hover:bg-info-bg text-info rounded-xl font-bold transition-colors tooltip" title="Duplicate"><Copy className="w-4 h-4" /></button>
                      <button className="p-2 bg-bg-page hover:bg-warning-bg text-warning rounded-xl font-bold transition-colors tooltip" title="Archive"><Archive className="w-4 h-4" /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SUBSCRIPTIONS TAB */}
          {activeTab === 'subscriptions' && (
            <div className="bg-card border border-border/50 rounded-3xl p-8 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-xl font-black text-primary mb-6 border-b border-border/50 pb-4 flex items-center gap-2">
                <Users className="w-6 h-6 text-success" /> Active Subscriptions
              </h2>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse whitespace-nowrap">
                  <thead>
                    <tr className="border-b border-border/50">
                      <th className="py-3 px-4 text-xs font-bold text-secondary uppercase tracking-wider">PG / Owner</th>
                      <th className="py-3 px-4 text-xs font-bold text-secondary uppercase tracking-wider">Plan & Billing</th>
                      <th className="py-3 px-4 text-xs font-bold text-secondary uppercase tracking-wider">Dates</th>
                      <th className="py-3 px-4 text-xs font-bold text-secondary uppercase tracking-wider text-center">Status</th>
                      <th className="py-3 px-4 text-xs font-bold text-secondary uppercase tracking-wider text-right">Manage</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/30">
                    {[
                      { pg: 'Sunshine Boys PG', owner: 'Rahul Sharma', plan: 'Professional', type: 'Yearly', start: '01 Jan 2026', expiry: '31 Dec 2026', status: 'Active' },
                      { pg: 'Comfort Girls PG', owner: 'Neha Verma', plan: 'Basic', type: 'Monthly', start: '01 Oct 2026', expiry: '31 Oct 2026', status: 'Trial' },
                      { pg: 'Elite Stay Co-ed', owner: 'Amit Singh', plan: 'Enterprise', type: 'Yearly', start: '15 Aug 2025', expiry: '14 Aug 2026', status: 'Grace' },
                      { pg: 'Student Nest PG', owner: 'Vikas Kumar', plan: 'Basic', type: 'Monthly', start: '01 Aug 2026', expiry: '31 Aug 2026', status: 'Suspended' },
                    ].map((sub, i) => (
                      <tr key={i} className="hover:bg-bg-page/50 transition-colors">
                        <td className="py-4 px-4">
                          <div className="font-bold text-primary">{sub.pg}</div>
                          <div className="text-xs text-secondary font-medium">{sub.owner}</div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="font-bold text-theme-primary">{sub.plan}</div>
                          <div className="text-[10px] font-bold text-secondary uppercase tracking-wider">{sub.type} Auto-renew</div>
                        </td>
                        <td className="py-4 px-4 text-sm font-medium text-secondary">
                          {sub.start} <br/> <span className="text-danger font-bold">Exp: {sub.expiry}</span>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <span className={`inline-flex items-center justify-center px-3 py-1 rounded-lg text-xs font-bold ${
                            sub.status === 'Active' ? 'bg-success-bg text-success' : 
                            sub.status === 'Trial' ? 'bg-info-bg text-info' : 
                            sub.status === 'Grace' ? 'bg-warning-bg text-warning-fg' : 
                            'bg-danger-bg text-danger'
                          }`}>
                            {sub.status}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <select className="bg-bg-page border border-border/50 text-sm font-bold text-primary px-3 py-1.5 rounded-lg outline-none focus:ring-2 focus:ring-theme-primary">
                             <option>Manage...</option>
                             <option>Upgrade Plan</option>
                             <option>Downgrade Plan</option>
                             <option>Add Grace Period (+7 Days)</option>
                             <option>Suspend Account</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* RENEWAL WORKFLOW TAB */}
          {activeTab === 'workflow' && (
            <div className="bg-card border border-border/50 rounded-3xl p-8 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500 relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-purple-bg rounded-full blur-3xl"></div>
              <h2 className="text-xl font-black text-primary mb-8 border-b border-border/50 pb-4 flex items-center gap-2 relative z-10">
                <Activity className="w-6 h-6 text-purple" /> Automated Renewal & Dunning Workflow
              </h2>
              
              <div className="relative z-10 max-w-2xl mx-auto space-y-4">
                
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-info-bg text-info flex items-center justify-center font-bold border border-info/30 shadow-sm shrink-0"><Bell className="w-5 h-5" /></div>
                  <div className="bg-bg-page border border-border/50 p-4 rounded-2xl flex-1 hover:border-info/50 transition-colors">
                     <h3 className="font-bold text-primary text-sm flex justify-between"><span>30 Days Before Expiry</span> <span className="text-info text-xs bg-info-bg px-2 py-0.5 rounded">Email</span></h3>
                     <p className="text-xs text-secondary font-medium mt-1">Send early renewal reminder with early-bird discount offer.</p>
                  </div>
                </div>
                
                <div className="w-0.5 h-6 bg-border/50 mx-auto"></div>

                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-warning-bg text-warning flex items-center justify-center font-bold border border-warning/30 shadow-sm shrink-0"><Bell className="w-5 h-5" /></div>
                  <div className="bg-bg-page border border-border/50 p-4 rounded-2xl flex-1 hover:border-warning/50 transition-colors">
                     <h3 className="font-bold text-primary text-sm flex justify-between"><span>15 Days Before Expiry</span> <span className="text-warning text-xs bg-warning-bg px-2 py-0.5 rounded">Email + SMS</span></h3>
                     <p className="text-xs text-secondary font-medium mt-1">Send standard payment reminder with invoice attachment.</p>
                  </div>
                </div>

                <div className="w-0.5 h-6 bg-border/50 mx-auto"></div>

                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-danger-bg text-danger flex items-center justify-center font-bold border border-danger/30 shadow-sm shrink-0"><AlertCircle className="w-5 h-5" /></div>
                  <div className="bg-bg-page border border-border/50 p-4 rounded-2xl flex-1 hover:border-danger/50 transition-colors">
                     <h3 className="font-bold text-primary text-sm flex justify-between"><span>7 Days Before Expiry</span> <span className="text-danger text-xs bg-danger-bg px-2 py-0.5 rounded">WhatsApp + Call Task</span></h3>
                     <p className="text-xs text-secondary font-medium mt-1">Send urgent reminder. Create manual follow-up task for Account Manager.</p>
                  </div>
                </div>

                <div className="w-0.5 h-6 bg-border/50 mx-auto"></div>

                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-primary-subtle text-theme-primary flex items-center justify-center font-bold border border-theme-primary/30 shadow-sm shrink-0"><Clock className="w-5 h-5" /></div>
                  <div className="bg-bg-page border border-border/50 p-4 rounded-2xl flex-1 hover:border-theme-primary/50 transition-colors">
                     <h3 className="font-bold text-primary text-sm flex justify-between"><span>Expiry Date</span> <span className="text-theme-primary text-xs bg-primary-subtle px-2 py-0.5 rounded">System Action</span></h3>
                     <p className="text-xs text-secondary font-medium mt-1">Move PG to <strong className="text-theme-primary">Grace Period (7 Days)</strong>. Show warning banner in PG Admin dashboard.</p>
                  </div>
                </div>

                <div className="w-0.5 h-6 bg-border/50 mx-auto"></div>

                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-2xl bg-card border-2 border-danger text-danger flex items-center justify-center font-bold shadow-sm shrink-0"><X className="w-6 h-6" /></div>
                  <div className="bg-danger/5 border border-danger/30 p-4 rounded-2xl flex-1">
                     <h3 className="font-bold text-danger text-sm">Grace End - Account Suspension</h3>
                     <p className="text-xs text-danger/80 font-bold mt-1">Automatically suspend PG Owner access. Restrict student logins for this PG.</p>
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>
      </div>

      {/* CREATE PLAN MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-card border border-border/50 rounded-3xl p-8 w-full max-w-3xl shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black text-primary">Create New Subscription Plan</h2>
              <button onClick={() => setShowCreateModal(false)} className="p-2 bg-bg-page hover:bg-danger-bg text-secondary hover:text-danger rounded-xl transition-colors"><X className="w-5 h-5"/></button>
            </div>
            
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="space-y-2 col-span-2">
                <label className="text-xs font-bold text-secondary uppercase tracking-wider">Plan Name</label>
                <input type="text" placeholder="e.g. Ultra Premium" className="w-full px-4 py-3 bg-bg-page border border-border/50 rounded-xl focus:ring-2 focus:ring-theme-primary font-medium text-primary" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-secondary uppercase tracking-wider">Monthly Price (₹)</label>
                <input type="number" placeholder="4999" className="w-full px-4 py-3 bg-bg-page border border-border/50 rounded-xl focus:ring-2 focus:ring-theme-primary font-medium text-primary" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-secondary uppercase tracking-wider">Yearly Price (₹)</label>
                <input type="number" placeholder="49990" className="w-full px-4 py-3 bg-bg-page border border-border/50 rounded-xl focus:ring-2 focus:ring-theme-primary font-medium text-primary" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-secondary uppercase tracking-wider">Max Students Limit</label>
                <input type="number" placeholder="500" className="w-full px-4 py-3 bg-bg-page border border-border/50 rounded-xl focus:ring-2 focus:ring-theme-primary font-medium text-primary" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-secondary uppercase tracking-wider">Trial Days</label>
                <input type="number" placeholder="14" className="w-full px-4 py-3 bg-bg-page border border-border/50 rounded-xl focus:ring-2 focus:ring-theme-primary font-medium text-primary" />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-border/50">
               <button onClick={() => setShowCreateModal(false)} className="px-6 py-3 rounded-xl font-bold text-secondary hover:bg-bg-page transition-colors">Cancel</button>
               <button className="bg-theme-primary hover:bg-theme-primary-hover text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-colors shadow-md">
                 <Check className="w-5 h-5" /> Save Plan
               </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
