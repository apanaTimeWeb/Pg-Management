'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { UserPlus, ChevronRight } from 'lucide-react';

export function StudentAdmissionMain() {
  const searchParams = useSearchParams();
  const initialView = searchParams?.get('view') || searchParams?.get('action') || 'details';
  const [activeTab, setActiveTab] = useState(initialView);

  // Sync tab with URL parameter on load
  useEffect(() => {
    const view = searchParams?.get('view') || searchParams?.get('action');
    if (view) {
      // Find matching tab or fallback
      const matchingTab = ['details', 'status', 'agreement'].find(id => id.includes(view) || view.includes(id));
      if (matchingTab) setActiveTab(matchingTab);
    }
  }, [searchParams]);

  return (
    <div className="w-full max-w-6xl mx-auto pb-12 animate-in fade-in duration-300">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-black text-primary flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <UserPlus className="w-6 h-6 text-primary" />
          </div>
          My Admission
        </h1>
        <p className="text-sm text-secondary mt-2 font-medium">Manage your admission details and agreement.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 md:gap-8">
        
        {/* Colorful Sidebar / Tabs */}
        <div className="w-full md:w-64 shrink-0 space-y-2">
          <div className="bg-card border border-border rounded-2xl p-3 shadow-sm flex flex-row md:flex-col overflow-x-auto hide-scrollbar gap-2">
            
            <button
              onClick={() => setActiveTab('details')}
              className={`flex-1 md:w-full flex items-center justify-between p-3.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === 'details' 
                  ? 'bg-primary text-white shadow-md scale-[1.02]' 
                  : 'text-secondary hover:bg-input hover:text-primary'
              }`}
            >
              <div className="flex items-center gap-3">
                Admission Details
              </div>
              {activeTab === 'details' && <ChevronRight className="w-4 h-4 hidden md:block" />}
            </button>
            <button
              onClick={() => setActiveTab('status')}
              className={`flex-1 md:w-full flex items-center justify-between p-3.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === 'status' 
                  ? 'bg-primary text-white shadow-md scale-[1.02]' 
                  : 'text-secondary hover:bg-input hover:text-primary'
              }`}
            >
              <div className="flex items-center gap-3">
                Status
              </div>
              {activeTab === 'status' && <ChevronRight className="w-4 h-4 hidden md:block" />}
            </button>
            <button
              onClick={() => setActiveTab('agreement')}
              className={`flex-1 md:w-full flex items-center justify-between p-3.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === 'agreement' 
                  ? 'bg-primary text-white shadow-md scale-[1.02]' 
                  : 'text-secondary hover:bg-input hover:text-primary'
              }`}
            >
              <div className="flex items-center gap-3">
                Agreement
              </div>
              {activeTab === 'agreement' && <ChevronRight className="w-4 h-4 hidden md:block" />}
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-card border border-border rounded-2xl shadow-sm min-h-[400px] p-6 relative overflow-hidden">
          
          {/* Decorative background blob */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
          
          
          {activeTab === 'details' && (
            <div className="animate-in slide-in-from-right-4 duration-300">
              <h2 className="text-xl font-bold text-primary mb-6 flex items-center gap-2 border-b border-border pb-4">
                Admission Details
              </h2>
              
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-input flex items-center justify-center mb-4">
                  <UserPlus className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-lg font-bold text-primary mb-2">Admission Details content goes here</h3>
                <p className="text-sm text-secondary max-w-sm">
                  This section handles the full UI logic for Admission Details. You can build tables, forms, or summary cards here.
                </p>
                <button className="mt-6 bg-primary/10 text-primary font-bold text-sm px-6 py-2.5 rounded-xl hover:bg-primary/20 transition-colors">
                  Action Button
                </button>
              </div>
            </div>
          )}
          {activeTab === 'status' && (
            <div className="animate-in slide-in-from-right-4 duration-300">
              <h2 className="text-xl font-bold text-primary mb-6 flex items-center gap-2 border-b border-border pb-4">
                Status
              </h2>
              
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-input flex items-center justify-center mb-4">
                  <UserPlus className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-lg font-bold text-primary mb-2">Status content goes here</h3>
                <p className="text-sm text-secondary max-w-sm">
                  This section handles the full UI logic for Status. You can build tables, forms, or summary cards here.
                </p>
                <button className="mt-6 bg-primary/10 text-primary font-bold text-sm px-6 py-2.5 rounded-xl hover:bg-primary/20 transition-colors">
                  Action Button
                </button>
              </div>
            </div>
          )}
          {activeTab === 'agreement' && (
            <div className="animate-in slide-in-from-right-4 duration-300">
              <h2 className="text-xl font-bold text-primary mb-6 flex items-center gap-2 border-b border-border pb-4">
                Agreement
              </h2>
              
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-input flex items-center justify-center mb-4">
                  <UserPlus className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-lg font-bold text-primary mb-2">Agreement content goes here</h3>
                <p className="text-sm text-secondary max-w-sm">
                  This section handles the full UI logic for Agreement. You can build tables, forms, or summary cards here.
                </p>
                <button className="mt-6 bg-primary/10 text-primary font-bold text-sm px-6 py-2.5 rounded-xl hover:bg-primary/20 transition-colors">
                  Action Button
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
