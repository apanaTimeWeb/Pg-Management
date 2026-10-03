'use client';

import React from 'react';
import { Bed, Download, Edit3, Plus, Search, Info, IndianRupee, MapPin, Phone, Mail, Calendar, UploadCloud, CreditCard, FileText } from 'lucide-react';

export default function StudentMyRoomPage() {
  
  return (
    <div className="p-4 md:p-8 space-y-6 animate-in fade-in duration-500 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-card p-6 rounded-2xl shadow-sm border border-border/50">
        <div>
          <h1 className="text-2xl font-black text-primary flex items-center gap-3">
            <div className="p-2.5 bg-blue-100 rounded-xl text-blue-600">
              <Bed className="w-6 h-6"/>
            </div>
            My Room
          </h1>
          <p className="text-[var(--text-disabled)] text-sm mt-2 font-medium">Details about your accommodation and roommates.</p>
        </div>
        
        <div className="flex items-center gap-3">
          
            <button className="flex items-center gap-2 bg-card hover:bg-page border border-border text-primary px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-colors">
              <Edit3 className="w-4 h-4" /> Edit Details
            </button>
    
        </div>
      </div>

      {/* Dynamic Content Based on Page */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Main Info Card */}
        <div className="md:col-span-8 bg-card rounded-2xl shadow-sm border border-border/50 overflow-hidden">
          <div className="p-6 border-b border-border/50 bg-page/30 flex items-center justify-between">
            <h3 className="font-bold text-primary flex items-center gap-2">
              <Info className="w-5 h-5 text-blue-500"/>
              Accommodation Details
            </h3>
          </div>
          <div className="p-6">
            
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="w-full sm:w-1/3 bg-blue-50 border border-blue-100 rounded-xl p-6 text-center">
                  <Bed className="w-10 h-10 text-blue-600 mx-auto mb-3"/>
                  <h2 className="text-3xl font-black text-blue-900">304</h2>
                  <p className="text-sm font-bold text-blue-700 mt-1">Bed A (Double AC)</p>
                </div>
                <div className="w-full sm:w-2/3 space-y-4">
                  <div>
                    <p className="text-xs font-bold text-secondary uppercase mb-1">Property</p>
                    <p className="text-primary font-medium flex items-center gap-2"><MapPin className="w-4 h-4 text-[#F5A623]"/> PG Varanasi Main</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-secondary uppercase mb-1">Roommate</p>
                    <p className="text-primary font-medium">Rahul Sharma (Bed B)</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-secondary uppercase mb-1">Move-in Date</p>
                    <p className="text-primary font-medium">01 Oct 2026</p>
                  </div>
                </div>
              </div>
    
          </div>
        </div>

        {/* Sidebar Card */}
        <div className="md:col-span-4 bg-gradient-to-br from-[#1A3A5C] to-[#122a42] rounded-2xl shadow-lg border border-blue-800 p-6 text-white h-max">
          <h3 className="font-bold mb-4 flex items-center gap-2 opacity-90"><Info className="w-5 h-5"/> Quick Status</h3>
          <div className="space-y-4">
            <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
              <p className="text-xs uppercase font-bold text-blue-200 mb-1">Current Balance</p>
              <h2 className="text-2xl font-black flex items-center"><IndianRupee className="w-5 h-5 mr-1"/> 0.00</h2>
              <p className="text-xs text-blue-200 mt-1">All dues cleared</p>
            </div>
            <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
              <p className="text-xs uppercase font-bold text-blue-200 mb-1">Next Billing</p>
              <h3 className="text-lg font-bold">01 Nov 2026</h3>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
