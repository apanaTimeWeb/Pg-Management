// @ts-nocheck
'use client';

import React, { useState } from 'react';
import { Info, MapPin, Phone, Mail, Globe, Clock, ShieldCheck, FileText, CheckCircle2, Edit3, Save, Share2, UploadCloud, Building2, Globe as Facebook, Globe as Instagram, Globe as Twitter } from 'lucide-react';

export default function PGInfoPage() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
            <Info className="w-7 h-7 text-[#F5A623]" />
            PG General Info & Policies
          </h1>
          <p className="text-[var(--text-disabled)] text-sm mt-1">Manage public facing details, contact info, rules, and timings.</p>
        </div>
        
        <div className="flex items-center gap-3">
          {isEditing ? (
            <button onClick={() => setIsEditing(false)} className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-colors">
              <Save className="w-4 h-4" /> Save Changes
            </button>
          ) : (
            <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 bg-[#1A3A5C] hover:bg-[#122a42] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-colors">
              <Edit3 className="w-4 h-4" /> Edit Details
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Details (Left Col) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Basic Info Box */}
          <div className="bg-card border border-border/50 rounded-2xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-border/50 bg-page/50 flex items-center justify-between">
              <h3 className="font-bold text-primary flex items-center gap-2"><Building2 className="w-4 h-4 text-[#F5A623]"/> Property Details</h3>
              <span className="px-2 py-0.5 bg-green-500/10 text-green-600 border border-green-500/20 rounded-md text-[10px] font-bold uppercase tracking-wide">Live</span>
            </div>
            <div className="p-6 space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-20 h-20 rounded-xl bg-page border border-border/50 flex items-center justify-center flex-shrink-0 relative overflow-hidden group">
                  <Building2 className="w-8 h-8 text-[var(--text-disabled)]" />
                  {isEditing && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                      <UploadCloud className="w-5 h-5 text-white" />
                    </div>
                  )}
                </div>
                <div className="flex-1 space-y-3">
                  <div>
                    <label className="text-[10px] font-bold text-[var(--text-disabled)] uppercase">PG / Hostel Name</label>
                    {isEditing ? (
                      <input type="text" defaultValue="SmartPG Varanasi Main Campus" className="w-full mt-1 px-3 py-2 bg-input border border-border rounded-lg text-sm font-semibold focus:outline-none focus:border-[#F5A623]" />
                    ) : (
                      <p className="font-bold text-lg text-primary">SmartPG Varanasi Main Campus</p>
                    )}
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-[var(--text-disabled)] uppercase">Tagline / Description</label>
                    {isEditing ? (
                      <textarea defaultValue="Premium AC/Non-AC accommodation for students with high-speed WiFi and homestyle food." className="w-full mt-1 px-3 py-2 bg-input border border-border rounded-lg text-sm focus:outline-none focus:border-[#F5A623] resize-none" rows={2} />
                    ) : (
                      <p className="text-sm text-secondary">Premium AC/Non-AC accommodation for students with high-speed WiFi and homestyle food.</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4 border-t border-border/50">
                <div>
                  <label className="text-[10px] font-bold text-[var(--text-disabled)] uppercase flex items-center gap-1.5"><MapPin className="w-3 h-3"/> Full Address</label>
                  {isEditing ? (
                    <textarea defaultValue="123 University Road, Lanka, Varanasi, Uttar Pradesh 221005" className="w-full mt-1 px-3 py-2 bg-input border border-border rounded-lg text-sm focus:outline-none focus:border-[#F5A623] resize-none" rows={3} />
                  ) : (
                    <p className="text-sm text-primary font-medium mt-1">123 University Road, Lanka, Varanasi, Uttar Pradesh 221005</p>
                  )}
                </div>
                <div className="space-y-4">
                   <div>
                     <label className="text-[10px] font-bold text-[var(--text-disabled)] uppercase flex items-center gap-1.5"><Globe className="w-3 h-3"/> Google Maps Link</label>
                     {isEditing ? (
                       <input type="text" defaultValue="https://maps.google.com/?q=..." className="w-full mt-1 px-3 py-2 bg-input border border-border rounded-lg text-sm focus:outline-none focus:border-[#F5A623]" />
                     ) : (
                       <a href="#" className="text-sm text-blue-600 hover:underline font-medium flex items-center gap-1 mt-1">View on Maps <Share2 className="w-3 h-3"/></a>
                     )}
                   </div>
                </div>
              </div>
            </div>
          </div>

          {/* Timings & Rules */}
          <div className="bg-card border border-border/50 rounded-2xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-border/50 bg-page/50 flex items-center justify-between">
              <h3 className="font-bold text-primary flex items-center gap-2"><Clock className="w-4 h-4 text-[#F5A623]"/> Timings & Rules</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-page p-3 rounded-xl border border-border/50 text-center">
                  <p className="text-[10px] font-bold text-[var(--text-disabled)] uppercase">Gate Open</p>
                  {isEditing ? <input type="time" defaultValue="06:00" className="mt-1 w-full text-center bg-input border border-border rounded p-1 text-sm font-bold"/> : <p className="font-black text-lg text-primary mt-1">06:00 AM</p>}
                </div>
                <div className="bg-page p-3 rounded-xl border border-border/50 text-center">
                  <p className="text-[10px] font-bold text-[var(--text-disabled)] uppercase">Gate Close</p>
                  {isEditing ? <input type="time" defaultValue="22:30" className="mt-1 w-full text-center bg-input border border-border rounded p-1 text-sm font-bold"/> : <p className="font-black text-lg text-primary mt-1">10:30 PM</p>}
                </div>
                <div className="bg-page p-3 rounded-xl border border-border/50 text-center">
                  <p className="text-[10px] font-bold text-[var(--text-disabled)] uppercase">Check-In</p>
                  {isEditing ? <input type="time" defaultValue="11:00" className="mt-1 w-full text-center bg-input border border-border rounded p-1 text-sm font-bold"/> : <p className="font-black text-lg text-primary mt-1">11:00 AM</p>}
                </div>
                <div className="bg-page p-3 rounded-xl border border-border/50 text-center">
                  <p className="text-[10px] font-bold text-[var(--text-disabled)] uppercase">Check-Out</p>
                  {isEditing ? <input type="time" defaultValue="10:00" className="mt-1 w-full text-center bg-input border border-border rounded p-1 text-sm font-bold"/> : <p className="font-black text-lg text-primary mt-1">10:00 AM</p>}
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-[var(--text-disabled)] uppercase flex items-center gap-1.5 mb-2"><ShieldCheck className="w-3 h-3"/> House Rules</label>
                {isEditing ? (
                  <textarea defaultValue="1. No loud music after 10 PM.&#10;2. Visitors are only allowed in the lobby area.&#10;3. Monthly rent must be paid by the 5th of every month.&#10;4. Alcohol and smoking are strictly prohibited." className="w-full px-4 py-3 bg-input border border-border rounded-xl text-sm focus:outline-none focus:border-[#F5A623] min-h-[120px]" />
                ) : (
                  <ul className="space-y-2">
                    {["No loud music after 10 PM.", "Visitors are only allowed in the lobby area.", "Monthly rent must be paid by the 5th of every month.", "Alcohol and smoking are strictly prohibited."].map((rule, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-secondary font-medium">
                        <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                        {rule}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Col */}
        <div className="space-y-6">
          
          {/* Contact Details */}
          <div className="bg-card border border-border/50 rounded-2xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-border/50 bg-page/50">
              <h3 className="font-bold text-primary flex items-center gap-2"><Phone className="w-4 h-4 text-[#F5A623]"/> Contact Details</h3>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="text-[10px] font-bold text-[var(--text-disabled)] uppercase flex items-center gap-1.5"><Phone className="w-3 h-3"/> Primary Phone</label>
                {isEditing ? <input type="text" defaultValue="+91 9876543210" className="w-full mt-1 px-3 py-1.5 bg-input border border-border rounded-lg text-sm font-semibold"/> : <p className="text-sm font-bold text-primary mt-1">+91 9876543210</p>}
              </div>
              <div>
                <label className="text-[10px] font-bold text-[var(--text-disabled)] uppercase flex items-center gap-1.5"><Mail className="w-3 h-3"/> Official Email</label>
                {isEditing ? <input type="text" defaultValue="contact@smartpgvaranasi.com" className="w-full mt-1 px-3 py-1.5 bg-input border border-border rounded-lg text-sm font-semibold"/> : <p className="text-sm font-bold text-primary mt-1">contact@smartpgvaranasi.com</p>}
              </div>
              <div>
                <label className="text-[10px] font-bold text-[var(--text-disabled)] uppercase flex items-center gap-1.5"><Globe className="w-3 h-3"/> Website</label>
                {isEditing ? <input type="text" defaultValue="www.smartpg.in" className="w-full mt-1 px-3 py-1.5 bg-input border border-border rounded-lg text-sm font-semibold"/> : <a href="#" className="text-sm font-bold text-blue-600 hover:underline mt-1 block">www.smartpg.in</a>}
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-card border border-border/50 rounded-2xl shadow-sm overflow-hidden">
             <div className="p-4 border-b border-border/50 bg-page/50">
              <h3 className="font-bold text-primary flex items-center gap-2"><Share2 className="w-4 h-4 text-[#F5A623]"/> Social Links</h3>
            </div>
            <div className="p-5 space-y-4">
               <div>
                <label className="text-[10px] font-bold text-[var(--text-disabled)] uppercase flex items-center gap-1.5"><Facebook className="w-3 h-3"/> Facebook</label>
                {isEditing ? <input type="text" defaultValue="fb.com/smartpg" className="w-full mt-1 px-3 py-1.5 bg-input border border-border rounded-lg text-sm font-semibold"/> : <p className="text-sm font-medium text-secondary mt-1 hover:text-blue-600 cursor-pointer">fb.com/smartpg</p>}
              </div>
              <div>
                <label className="text-[10px] font-bold text-[var(--text-disabled)] uppercase flex items-center gap-1.5"><Instagram className="w-3 h-3"/> Instagram</label>
                {isEditing ? <input type="text" defaultValue="@smartpg_vns" className="w-full mt-1 px-3 py-1.5 bg-input border border-border rounded-lg text-sm font-semibold"/> : <p className="text-sm font-medium text-secondary mt-1 hover:text-pink-600 cursor-pointer">@smartpg_vns</p>}
              </div>
            </div>
          </div>

          {/* Document Templates */}
          <div className="bg-card border border-border/50 rounded-2xl shadow-sm overflow-hidden">
             <div className="p-4 border-b border-border/50 bg-page/50">
              <h3 className="font-bold text-primary flex items-center gap-2"><FileText className="w-4 h-4 text-[#F5A623]"/> Agreements</h3>
            </div>
            <div className="p-5">
              <div className="flex items-center justify-between p-3 bg-page border border-border/50 rounded-xl hover:border-[#1A3A5C]/30 transition-colors cursor-pointer">
                 <div className="flex items-center gap-3">
                   <div className="w-8 h-8 bg-blue-500/10 text-blue-600 rounded-lg flex items-center justify-center"><FileText className="w-4 h-4"/></div>
                   <div>
                     <p className="text-sm font-bold text-primary">Rent Agreement</p>
                     <p className="text-[10px] text-secondary">PDF • 1.2 MB</p>
                   </div>
                 </div>
                 {isEditing && <button className="text-[10px] font-bold uppercase text-blue-600 hover:underline">Change</button>}
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
