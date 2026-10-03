'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Building2, Search, Filter, Download, Plus, Eye, Edit, ShieldAlert, PowerOff, History, MoreVertical, CheckCircle, XCircle, FileText, ChevronRight, MapPin, Users, Bed, Package, Trash2, ArrowRightLeft, UserCheck, AlertTriangle } from 'lucide-react';

export function SuperadminPGManagementMain() {
  const searchParams = useSearchParams();
  const tabQuery = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState(tabQuery || 'all');

  useEffect(() => {
    if (tabQuery) setActiveTab(tabQuery);
  }, [tabQuery]);
  const [selectedPG, setSelectedPG] = useState<any | null>(null);
  const [formStep, setFormStep] = useState(1);

  const tabs = [
    { id: 'all', label: 'All PGs (Active)', icon: Building2, color: 'text-info', bg: 'bg-info-bg' },
    { id: 'pending', label: 'Pending PGs', icon: UserCheck, color: 'text-warning', bg: 'bg-warning-bg' },
    { id: 'suspended', label: 'Suspended / Expired', icon: ShieldAlert, color: 'text-danger', bg: 'bg-danger-bg' },
    { id: 'archived', label: 'Archived PGs', icon: History, color: 'text-secondary', bg: 'bg-secondary/10' },
    { id: 'add', label: 'Add New PG', icon: Plus, color: 'text-success', bg: 'bg-success-bg' },
  ];

  const dummyPGs = [
    { id: 'PG-001', name: 'Sunshine Boys PG', owner: 'Rahul Sharma', mobile: '+91 9876543210', email: 'rahul@sunshine.com', city: 'Gurugram', totalBeds: 50, occupiedBeds: 45, status: 'Active', plan: 'Professional', type: 'Boys', created: '01 Jan 2026' },
    { id: 'PG-002', name: 'Comfort Girls PG', owner: 'Neha Verma', mobile: '+91 9123456789', email: 'neha@comfort.com', city: 'Delhi', totalBeds: 100, occupiedBeds: 90, status: 'Active', plan: 'Basic', type: 'Girls', created: '15 Feb 2026' },
    { id: 'PG-003', name: 'Elite Stay Co-ed', owner: 'Amit Singh', mobile: '+91 9988776655', email: 'amit@elitestay.com', city: 'Noida', totalBeds: 200, occupiedBeds: 180, status: 'Suspended', plan: 'Enterprise', type: 'Co-ed', created: '10 Mar 2026', suspendReason: 'Payment Default' },
    { id: 'PG-004', name: 'Green Valley PG', owner: 'Priya Sharma', mobile: '+91 9998887776', email: 'priya@green.com', city: 'Pune', totalBeds: 40, occupiedBeds: 0, status: 'Pending', plan: 'Pro', type: 'Girls', created: '02 Oct 2026' },
    { id: 'PG-005', name: 'Student Nest PG', owner: 'Vikas Kumar', mobile: '+91 9112233445', email: 'vikas@nest.in', city: 'Bangalore', totalBeds: 80, occupiedBeds: 70, status: 'Expired', plan: 'Basic', type: 'Boys', created: '01 Jan 2025' },
    { id: 'PG-006', name: 'Old Town Residency', owner: 'Rajesh Gupta', mobile: '+91 8887776665', email: 'rajesh@oldtown.com', city: 'Jaipur', totalBeds: 30, occupiedBeds: 10, status: 'Archived', plan: 'Basic', type: 'Co-ed', created: '15 Jun 2024' },
  ];

  const filteredPGs = activeTab === 'all' 
    ? dummyPGs.filter(p => p.status === 'Active') 
    : dummyPGs.filter(p => 
        (activeTab === 'pending' && p.status === 'Pending') ||
        (activeTab === 'suspended' && (p.status === 'Suspended' || p.status === 'Expired')) ||
        (activeTab === 'archived' && p.status === 'Archived')
      );

  return (
    <div className="w-full h-full space-y-6 pb-20">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-theme-primary to-theme-primary-hover text-white rounded-3xl p-8 shadow-lg relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-700">
          <Building2 className="w-40 h-40" />
        </div>
        <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black mb-2 flex items-center gap-3">
              <Building2 className="w-8 h-8" /> PG / Organization Management
            </h1>
            <p className="text-white/80 font-medium max-w-xl">
              The core module for Superadmin. Manage all PG registrations, onboarding flows, and monitoring.
            </p>
          </div>
          <div className="flex gap-3">
            <button className="bg-white/20 backdrop-blur text-white border border-white/30 px-6 py-3 rounded-xl font-bold shadow-md hover:bg-white/30 transition-colors flex items-center gap-2">
              <Download className="w-5 h-5" /> Export Data
            </button>
            <button onClick={() => { setActiveTab('add'); setSelectedPG(null); }} className="bg-white/20 backdrop-blur text-white border border-white/30 px-6 py-3 rounded-xl font-bold shadow-md hover:bg-white/90 transition-colors flex items-center gap-2">
              <Plus className="w-5 h-5" /> Add New PG
            </button>
          </div>
        </div>
      </div>

      {!selectedPG && activeTab !== 'add' && (
        <div className="flex min-h-[700px]">
          {/* Table Area */}
          <div className="w-full flex-1 bg-card border border-border/50 rounded-3xl shadow-sm flex flex-col h-full overflow-hidden animate-in fade-in slide-in-from-right-8 duration-500 relative">
            <div className="p-6 border-b border-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-bg-page/50">
              <div className="flex items-center gap-3">
                 <h2 className="text-xl font-black text-primary capitalize">{activeTab === 'all' ? 'All PGs' : activeTab}</h2>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 text-secondary absolute left-3 top-1/2 -translate-y-1/2" />
                  <input type="text" placeholder="Search PG name, code, owner, city..." className="pl-9 pr-4 py-2 w-72 bg-card border border-border/50 rounded-xl text-sm focus:ring-2 focus:ring-theme-primary font-medium" />
                </div>
                <button className="p-2 border border-border/50 bg-card rounded-xl text-secondary hover:text-primary transition-colors tooltip" title="Advanced Filter"><Filter className="w-4 h-4" /></button>
              </div>
            </div>

            <div className="flex-1 overflow-auto p-4">
              <table className="w-full text-left border-collapse whitespace-nowrap">
                <thead>
                  <tr className="bg-bg-page/50 border-b border-border/50">
                    <th className="py-3 px-4 text-xs font-bold text-secondary uppercase tracking-wider">PG Information</th>
                    <th className="py-3 px-4 text-xs font-bold text-secondary uppercase tracking-wider">Owner Details</th>
                    <th className="py-3 px-4 text-xs font-bold text-secondary uppercase tracking-wider">Occupancy</th>
                    <th className="py-3 px-4 text-xs font-bold text-secondary uppercase tracking-wider text-center">Status & Plan</th>
                    <th className="py-3 px-4 text-xs font-bold text-secondary uppercase tracking-wider text-right">Manage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30">
                  {filteredPGs.map((pg, i) => (
                    <tr key={i} className="hover:bg-bg-page/50 transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
                            pg.type === 'Boys' ? 'bg-info-bg text-info' : 
                            pg.type === 'Girls' ? 'bg-primary-subtle text-theme-primary' : 'bg-purple-bg text-purple'
                          }`}>
                            <Building2 className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="font-bold text-primary">{pg.name}</div>
                            <div className="text-xs text-secondary font-medium">{pg.id} • {pg.city} ({pg.type})</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-bold text-primary">{pg.owner}</div>
                        <div className="text-xs text-secondary font-medium">{pg.mobile}</div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                           <div className="w-24 h-2 bg-bg-page rounded-full overflow-hidden border border-border/50">
                              <div className="h-full bg-theme-primary" style={{width: `${(pg.occupiedBeds / pg.totalBeds) * 100}%`}}></div>
                           </div>
                           <span className="text-xs font-bold text-primary">{pg.occupiedBeds}/{pg.totalBeds}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold mb-1 block w-fit mx-auto ${
                          pg.status === 'Active' ? 'bg-success-bg text-success' : 
                          pg.status === 'Pending' ? 'bg-warning-bg text-warning-fg' : 
                          pg.status === 'Archived' ? 'bg-secondary/10 text-secondary' : 'bg-danger-bg text-danger'
                        }`}>
                          {pg.status}
                        </span>
                        <div className="text-[10px] font-bold text-secondary uppercase tracking-wider">{pg.plan} Plan</div>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => setSelectedPG(pg)} className="p-1.5 text-theme-primary hover:bg-primary-subtle rounded-lg transition-colors tooltip" title="Open PG Details Dashboard"><Eye className="w-4 h-4" /></button>
                          <div className="relative group/menu">
                            <button className="p-1.5 text-secondary hover:bg-bg-page rounded-lg transition-colors"><MoreVertical className="w-4 h-4" /></button>
                            <div className="absolute right-0 mt-2 w-56 bg-card border border-border/50 rounded-xl shadow-xl opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all z-50">
                              <div className="p-2 space-y-1 text-left">
                                <button className="w-full text-left px-3 py-2 text-sm font-bold text-primary hover:bg-bg-page rounded-lg flex items-center gap-2"><ArrowRightLeft className="w-4 h-4 text-info"/> Login as Admin</button>
                                {activeTab === 'pending' && (
                                  <>
                                    <button className="w-full text-left px-3 py-2 text-sm font-bold text-primary hover:bg-bg-page rounded-lg flex items-center gap-2"><CheckCircle className="w-4 h-4 text-success"/> Approve Registration</button>
                                    <button className="w-full text-left px-3 py-2 text-sm font-bold text-primary hover:bg-bg-page rounded-lg flex items-center gap-2"><XCircle className="w-4 h-4 text-danger"/> Reject</button>
                                    <button className="w-full text-left px-3 py-2 text-sm font-bold text-primary hover:bg-bg-page rounded-lg flex items-center gap-2"><FileText className="w-4 h-4 text-warning"/> Request Correction</button>
                                  </>
                                )}
                                {(activeTab === 'all' || activeTab === 'suspended') && (
                                  <>
                                    <button className="w-full text-left px-3 py-2 text-sm font-bold text-primary hover:bg-bg-page rounded-lg flex items-center gap-2"><Edit className="w-4 h-4 text-info"/> Edit PG Config</button>
                                    {pg.status !== 'Active' && <button className="w-full text-left px-3 py-2 text-sm font-bold text-primary hover:bg-bg-page rounded-lg flex items-center gap-2"><CheckCircle className="w-4 h-4 text-success"/> Unsuspend / Activate</button>}
                                    {pg.status === 'Active' && <button className="w-full text-left px-3 py-2 text-sm font-bold text-primary hover:bg-bg-page rounded-lg flex items-center gap-2"><ShieldAlert className="w-4 h-4 text-danger"/> Suspend PG</button>}
                                    <button className="w-full text-left px-3 py-2 text-sm font-bold text-primary hover:bg-bg-page rounded-lg flex items-center gap-2"><Package className="w-4 h-4 text-purple"/> View Subscription</button>
                                    <button className="w-full text-left px-3 py-2 text-sm font-bold text-primary hover:bg-bg-page rounded-lg flex items-center gap-2"><History className="w-4 h-4 text-secondary"/> Archive PG</button>
                                  </>
                                )}
                                {activeTab === 'archived' && (
                                   <>
                                    <button className="w-full text-left px-3 py-2 text-sm font-bold text-primary hover:bg-bg-page rounded-lg flex items-center gap-2"><History className="w-4 h-4 text-info"/> Restore PG</button>
                                    <div className="h-px w-full bg-border/50 my-1"></div>
                                    <button className="w-full text-left px-3 py-2 text-sm font-bold text-danger hover:bg-danger-bg rounded-lg flex items-center gap-2"><Trash2 className="w-4 h-4 text-danger"/> Permanent Delete</button>
                                   </>
                                )}
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
        </div>
      )}

      {/* ADD NEW PG FLOW */}
      {activeTab === 'add' && (
         <div className="bg-card border border-border/50 rounded-3xl shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500 relative overflow-hidden p-8 flex flex-col h-[800px]">
            <h2 className="text-xl font-black text-primary mb-8 border-b border-border/50 pb-4 flex items-center justify-between relative z-10">
               <span className="flex items-center gap-2"><Plus className="w-6 h-6 text-success" /> New PG Onboarding Form</span>
               <button onClick={() => setActiveTab('all')} className="text-sm text-secondary hover:text-primary transition-colors font-bold">Cancel</button>
            </h2>

            <div className="flex-1 flex gap-8">
               {/* Left Flow Steps */}
               <div className="w-64 border-r border-border/50 pr-8 space-y-8 relative">
                 <div className="absolute top-0 bottom-0 left-[15px] w-0.5 bg-border/50 -z-10"></div>
                 {[
                   { num: 1, title: 'Organization Info' },
                   { num: 2, title: 'Business Details' },
                   { num: 3, title: 'Owner Account' },
                   { num: 4, title: 'Subscription & Plan' },
                   { num: 5, title: 'Documents Upload' },
                   { num: 6, title: 'Final Review & Save' },
                 ].map((s) => (
                    <div key={s.num} className="flex items-center gap-4 relative z-10">
                       <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                         formStep > s.num ? 'bg-success text-white' : 
                         formStep === s.num ? 'bg-theme-primary text-white ring-4 ring-theme-primary/20' : 'bg-bg-page border border-border/50 text-secondary'
                       }`}>
                          {formStep > s.num ? <CheckCircle className="w-4 h-4"/> : s.num}
                       </div>
                       <span className={`font-bold text-sm ${formStep === s.num ? 'text-primary' : 'text-secondary'}`}>{s.title}</span>
                    </div>
                 ))}
               </div>

               {/* Right Form Area */}
               <div className="flex-1 bg-bg-page/50 border border-border/50 rounded-2xl p-8 flex flex-col">
                  <div className="flex-1 overflow-auto pr-4 space-y-6">
                    {formStep === 1 && (
                       <>
                         <h3 className="font-black text-lg text-primary mb-4">Organization Information</h3>
                         <div className="grid grid-cols-2 gap-6">
                           <div className="space-y-2"><label className="text-xs font-bold text-secondary uppercase">PG Name *</label><input type="text" className="w-full p-3 rounded-xl bg-card border border-border/50 text-primary" placeholder="e.g. Royal Residency"/></div>
                           <div className="space-y-2"><label className="text-xs font-bold text-secondary uppercase">PG Code (Auto/Manual)</label><input type="text" className="w-full p-3 rounded-xl bg-card border border-border/50 text-primary" placeholder="e.g. PG-007"/></div>
                           <div className="space-y-2 col-span-2"><label className="text-xs font-bold text-secondary uppercase">Registration / License Number</label><input type="text" className="w-full p-3 rounded-xl bg-card border border-border/50 text-primary" placeholder="Enter reg number if available"/></div>
                           <div className="space-y-2 col-span-2"><label className="text-xs font-bold text-secondary uppercase">Complete Address</label><textarea rows={3} className="w-full p-3 rounded-xl bg-card border border-border/50 text-primary resize-none" placeholder="Full address line"></textarea></div>
                           <div className="space-y-2"><label className="text-xs font-bold text-secondary uppercase">City</label><input type="text" className="w-full p-3 rounded-xl bg-card border border-border/50 text-primary"/></div>
                           <div className="space-y-2"><label className="text-xs font-bold text-secondary uppercase">State</label><input type="text" className="w-full p-3 rounded-xl bg-card border border-border/50 text-primary"/></div>
                         </div>
                       </>
                    )}
                    {/* Only mapping Step 1 visually to show the structure for brevity, logic allows up to 6 */}
                    {formStep > 1 && formStep < 6 && (
                       <div className="flex flex-col items-center justify-center h-full text-secondary gap-4 opacity-50">
                          <Package className="w-16 h-16" />
                          <p className="font-bold">Form elements for Step {formStep} will appear here.</p>
                       </div>
                    )}
                    {formStep === 6 && (
                       <div className="flex flex-col items-center justify-center h-full gap-6">
                          <CheckCircle className="w-20 h-20 text-success" />
                          <h3 className="text-2xl font-black text-primary">Ready to activate this PG</h3>
                          
                          <div className="bg-card border border-border/50 p-6 rounded-2xl w-full max-w-md">
                             <div className="flex items-center gap-2 text-sm font-bold text-secondary mb-3"><AlertTriangle className="w-4 h-4 text-warning"/> System Flow</div>
                             <ul className="text-sm font-medium text-primary space-y-2">
                                <li className="flex items-center gap-2"><ArrowRightLeft className="w-4 h-4 text-theme-primary"/> Save as Draft or Submit</li>
                                <li className="flex items-center gap-2"><ArrowRightLeft className="w-4 h-4 text-theme-primary"/> Owner Account activated instantly</li>
                                <li className="flex items-center gap-2"><ArrowRightLeft className="w-4 h-4 text-theme-primary"/> Welcome notification sent to Owner email/mobile</li>
                             </ul>
                          </div>
                       </div>
                    )}
                  </div>
                  
                  <div className="pt-6 border-t border-border/50 flex justify-between mt-auto">
                     <button onClick={() => setFormStep(prev => Math.max(1, prev - 1))} disabled={formStep === 1} className="px-6 py-2.5 rounded-xl font-bold bg-card border border-border/50 text-primary disabled:opacity-50 hover:bg-bg-page transition-colors">Back</button>
                     {formStep < 6 ? (
                        <button onClick={() => setFormStep(prev => Math.min(6, prev + 1))} className="px-6 py-2.5 rounded-xl font-bold bg-theme-primary text-white hover:bg-theme-primary-hover shadow-md transition-colors flex items-center gap-2">Next Step <ChevronRight className="w-4 h-4"/></button>
                     ) : (
                        <div className="flex gap-3">
                           <button className="px-6 py-2.5 rounded-xl font-bold bg-card border border-border/50 text-primary hover:bg-bg-page transition-colors">Save Draft</button>
                           <button className="px-6 py-2.5 rounded-xl font-bold bg-success text-white hover:bg-success/90 shadow-md transition-colors">Activate PG Now</button>
                        </div>
                     )}
                  </div>
               </div>
            </div>
         </div>
      )}

      {/* SINGLE PG DETAILED OVERVIEW */}
      {selectedPG && (
         <div className="bg-card border border-border/50 rounded-3xl shadow-lg animate-in slide-in-from-bottom-8 duration-500 overflow-hidden min-h-[800px] flex flex-col">
            
            {/* Top Toolbar */}
            <div className="bg-bg-page/80 border-b border-border/50 p-4 flex justify-between items-center backdrop-blur">
               <button onClick={() => setSelectedPG(null)} className="px-4 py-2 bg-card border border-border/50 rounded-xl text-sm font-bold text-secondary hover:text-primary transition-colors flex items-center gap-2">
                  <ChevronRight className="w-4 h-4 rotate-180" /> Back to Directory
               </button>
               <div className="flex gap-2">
                  <button className="px-4 py-2 bg-info-bg text-info hover:bg-info-bg rounded-xl text-sm font-bold transition-colors flex items-center gap-2"><ArrowRightLeft className="w-4 h-4"/> Login as Owner</button>
                  <button className="px-4 py-2 bg-theme-primary text-white hover:bg-theme-primary-hover shadow-md rounded-xl text-sm font-bold transition-colors flex items-center gap-2"><Edit className="w-4 h-4"/> Edit PG Config</button>
               </div>
            </div>

            <div className="flex-1 overflow-auto p-8 flex flex-col gap-8">
               
               {/* PG Hero Info */}
               <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="w-32 h-32 bg-primary-subtle rounded-3xl border-2 border-theme-primary/30 flex items-center justify-center shrink-0">
                     <Building2 className="w-12 h-12 text-theme-primary" />
                  </div>
                  <div className="flex-1">
                     <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-3xl font-black text-primary">{selectedPG.name}</h2>
                        <span className={`px-3 py-1 rounded-lg text-xs font-bold ${selectedPG.status === 'Active' ? 'bg-success-bg text-success' : selectedPG.status === 'Suspended' ? 'bg-danger-bg text-danger' : 'bg-warning-bg text-warning-fg'}`}>{selectedPG.status}</span>
                     </div>
                     <p className="text-secondary font-medium flex items-center gap-2 mb-4"><MapPin className="w-4 h-4"/> {selectedPG.city}, India • {selectedPG.id}</p>
                     
                     <div className="flex flex-wrap gap-6">
                        <div className="flex items-center gap-3">
                           <div className="w-10 h-10 rounded-full bg-purple-bg text-purple flex items-center justify-center font-bold">{selectedPG.owner.charAt(0)}</div>
                           <div>
                              <div className="text-xs font-bold text-secondary uppercase">Owner</div>
                              <div className="text-sm font-bold text-primary">{selectedPG.owner}</div>
                           </div>
                        </div>
                        <div className="h-10 w-px bg-border/50"></div>
                        <div>
                           <div className="text-xs font-bold text-secondary uppercase mb-1">Subscription Plan</div>
                           <div className="text-sm font-black text-theme-primary">{selectedPG.plan} Plan</div>
                        </div>
                        <div className="h-10 w-px bg-border/50"></div>
                        <div>
                           <div className="text-xs font-bold text-secondary uppercase mb-1">Created Date</div>
                           <div className="text-sm font-bold text-primary">{selectedPG.created}</div>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Modular Grid Dashboard for Superadmin View */}
               <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  
                  {/* Occupancy Card */}
                  <div className="bg-bg-page border border-border/50 rounded-2xl p-6 flex flex-col justify-between group hover:border-theme-primary/50 transition-colors">
                     <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-card border border-border/50 rounded-xl group-hover:bg-primary-subtle group-hover:text-theme-primary transition-colors"><Bed className="w-5 h-5"/></div>
                        <span className="text-xs font-bold text-secondary uppercase tracking-wider">Occupancy</span>
                     </div>
                     <div>
                        <div className="flex items-end gap-2 mb-2">
                           <span className="text-3xl font-black text-primary">{selectedPG.occupiedBeds}</span>
                           <span className="text-sm font-bold text-secondary mb-1">/ {selectedPG.totalBeds} Beds</span>
                        </div>
                        <div className="h-1.5 w-full bg-card rounded-full overflow-hidden border border-border/50">
                           <div className="h-full bg-theme-primary" style={{width: `${(selectedPG.occupiedBeds / selectedPG.totalBeds) * 100}%`}}></div>
                        </div>
                     </div>
                  </div>

                  {/* Users Card */}
                  <div className="bg-bg-page border border-border/50 rounded-2xl p-6 flex flex-col justify-between group hover:border-success/50 transition-colors">
                     <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-card border border-border/50 rounded-xl group-hover:bg-success-bg group-hover:text-success transition-colors"><Users className="w-5 h-5"/></div>
                        <span className="text-xs font-bold text-secondary uppercase tracking-wider">Active Users</span>
                     </div>
                     <div className="space-y-1">
                        <div className="flex justify-between items-center"><span className="text-sm font-medium text-secondary">Students</span><span className="text-sm font-black text-primary">{selectedPG.occupiedBeds}</span></div>
                        <div className="flex justify-between items-center"><span className="text-sm font-medium text-secondary">Managers</span><span className="text-sm font-black text-primary">2</span></div>
                        <div className="flex justify-between items-center"><span className="text-sm font-medium text-secondary">Cooks</span><span className="text-sm font-black text-primary">3</span></div>
                     </div>
                  </div>

                  {/* Quick Modules */}
                  <div className="col-span-1 md:col-span-2 grid grid-cols-2 gap-4">
                     {['Subscription & Payments', 'Organization Documents', 'Mess & Inventory', 'Complaints / Support'].map((mod, i) => (
                        <button key={i} className="bg-bg-page border border-border/50 rounded-2xl p-4 flex flex-col items-center justify-center text-center hover:bg-card hover:border-theme-primary/50 transition-colors group">
                           <FileText className={`w-6 h-6 mb-2 ${i === 0 ? 'text-purple' : i === 1 ? 'text-warning' : i === 2 ? 'text-success' : 'text-danger'}`} />
                           <span className="text-xs font-bold text-primary group-hover:text-theme-primary transition-colors">{mod}</span>
                        </button>
                     ))}
                  </div>
               </div>

               {/* Dangerous Actions (If suspended/etc) */}
               {selectedPG.status === 'Suspended' && (
                  <div className="bg-danger/5 border border-danger/30 rounded-2xl p-6 mt-4 flex items-center justify-between">
                     <div>
                        <h4 className="font-bold text-danger flex items-center gap-2"><ShieldAlert className="w-5 h-5"/> Account Suspended</h4>
                        <p className="text-sm text-danger/80 font-medium mt-1">Reason: {selectedPG.suspendReason}. The owner and students cannot log into this PG.</p>
                     </div>
                     <div className="flex gap-3">
                        <button className="bg-card border border-border/50 text-primary px-4 py-2 rounded-xl text-sm font-bold shadow-sm">Contact Owner</button>
                        <button className="bg-success text-white px-4 py-2 rounded-xl text-sm font-bold shadow-md">Unsuspend Now</button>
                     </div>
                  </div>
               )}

            </div>
         </div>
      )}

    </div>
  );
}
