'use client';

import React, { useState } from 'react';
import { 
  User, 
  Camera, 
  Mail, 
  Phone, 
  MapPin, 
  Building2, 
  Lock, 
  Save, 
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export default function CookProfilePage() {
  const [isSaved, setIsSaved] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Ramesh Kumar (Cook)',
    mobile: '+91 9876543210',
    email: 'ramesh.cook@apanatime.com'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="w-full space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary/10 rounded-xl">
            <User className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-primary tracking-tight">My Profile</h1>
            <p className="text-sm text-secondary">Manage your personal information</p>
          </div>
        </div>
        
        {isSaved && (
          <div className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-lg font-bold text-sm shadow-sm animate-in fade-in slide-in-from-top-4">
            <CheckCircle2 className="w-4 h-4" /> Profile Updated Successfully
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Column: Photo & Static Info */}
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col items-center text-center">
            <div className="relative mb-4 group cursor-pointer">
              <div className="w-32 h-32 rounded-full bg-page border-4 border-primary/20 flex items-center justify-center overflow-hidden">
                <User className="w-16 h-16 text-secondary/40" />
              </div>
              <div className="absolute inset-0 bg-black/40 rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="w-6 h-6 text-white mb-1" />
                <span className="text-[10px] font-bold text-white uppercase tracking-wider">Change Photo</span>
              </div>
            </div>
            <h2 className="text-xl font-black text-primary">{formData.name}</h2>
            <p className="text-sm font-bold text-primary/60 uppercase tracking-wider mt-1">Head Cook</p>
            
            <div className="mt-4 pt-4 border-t border-border w-full flex items-center justify-center gap-2 text-sm font-semibold text-green-600 bg-green-50 py-2 rounded-lg border border-green-200">
              <ShieldCheck className="w-4 h-4" /> Account Active
            </div>
          </div>
        </div>

        {/* Right Column: Edit Form & Assigned PG */}
        <div className="md:col-span-2 space-y-6">
          
          <form onSubmit={handleSave} className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
            <div className="p-5 border-b border-border bg-page/30">
              <h3 className="text-base font-bold text-primary">Personal Details</h3>
            </div>
            
            <div className="p-5 space-y-5">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-primary">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="w-4 h-4 text-secondary" />
                  </div>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-page border border-border rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-primary text-primary transition-colors" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-primary">Mobile Number</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="w-4 h-4 text-secondary" />
                    </div>
                    <input 
                      type="tel" 
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      className="w-full bg-page border border-border rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-primary text-primary transition-colors" 
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-primary">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="w-4 h-4 text-secondary" />
                    </div>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-page border border-border rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-primary text-primary transition-colors" 
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 border-t border-border bg-page/30 flex justify-end">
              <button 
                type="submit"
                className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-lg text-sm font-bold transition-all shadow-sm"
              >
                <Save className="w-4 h-4" /> Save Changes
              </button>
            </div>
          </form>

          {/* Assigned PG (Read Only) */}
          <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-xl shadow-sm overflow-hidden relative">
            
            <div className="absolute top-4 right-4 flex items-center gap-1.5 text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-1 rounded-md border border-blue-200 uppercase tracking-wider shadow-sm">
              <Lock className="w-3 h-3" /> Read Only
            </div>

            <div className="p-5 border-b border-blue-200/50 bg-blue-100/50 dark:bg-blue-900/20">
              <h3 className="text-base font-bold text-blue-900 dark:text-blue-300 flex items-center gap-2">
                <Building2 className="w-5 h-5" /> Assigned PG / Property
              </h3>
              <p className="text-xs text-blue-700 dark:text-blue-400 mt-1 pr-24">
                Cook cannot change their PG assignment. Please contact Manager/Owner for transfer.
              </p>
            </div>
            
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="block text-xs font-bold text-blue-700 uppercase tracking-wider mb-1">Property Name</span>
                  <div className="bg-white/60 dark:bg-black/20 border border-blue-200 dark:border-blue-800/50 rounded-lg px-4 py-2.5 text-sm font-bold text-blue-950 dark:text-blue-100 cursor-not-allowed">
                    Sunrise PG for Boys
                  </div>
                </div>
                <div>
                  <span className="block text-xs font-bold text-blue-700 uppercase tracking-wider mb-1">Kitchen / Building</span>
                  <div className="bg-white/60 dark:bg-black/20 border border-blue-200 dark:border-blue-800/50 rounded-lg px-4 py-2.5 text-sm font-bold text-blue-950 dark:text-blue-100 cursor-not-allowed">
                    Block A Kitchen
                  </div>
                </div>
              </div>
              
              <div>
                <span className="block text-xs font-bold text-blue-700 uppercase tracking-wider mb-1">Location</span>
                <div className="flex items-center gap-2 bg-white/60 dark:bg-black/20 border border-blue-200 dark:border-blue-800/50 rounded-lg px-4 py-2.5 text-sm font-semibold text-blue-950 dark:text-blue-100 cursor-not-allowed">
                  <MapPin className="w-4 h-4 text-blue-500" />
                  123, Knowledge Park III, Greater Noida, UP 201310
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
