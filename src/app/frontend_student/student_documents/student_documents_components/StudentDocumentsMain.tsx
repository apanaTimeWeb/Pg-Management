'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { FileText, ChevronRight } from 'lucide-react';

export function StudentDocumentsMain() {
  const searchParams = useSearchParams();
  const initialView = searchParams?.get('view') || searchParams?.get('action') || 'my';
  const [activeTab, setActiveTab] = useState(initialView);

  // Sync tab with URL parameter on load
  useEffect(() => {
    const view = searchParams?.get('view') || searchParams?.get('action');
    if (view) {
      // Find matching tab or fallback
      const matchingTab = ['my', 'upload', 'status'].find(id => id.includes(view) || view.includes(id));
      if (matchingTab) setActiveTab(matchingTab);
    }
  }, [searchParams]);

  return (
    <div className="w-full max-w-6xl mx-auto pb-12 animate-in fade-in duration-300">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-black text-primary flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <FileText className="w-6 h-6 text-primary" />
          </div>
          Documents
        </h1>
        <p className="text-sm text-secondary mt-2 font-medium">Manage your uploaded documents and verification status.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 md:gap-8">
        
        {/* Colorful Sidebar / Tabs */}
        <div className="w-full md:w-64 shrink-0 space-y-2">
          <div className="bg-card border border-border rounded-2xl p-3 shadow-sm flex flex-row md:flex-col overflow-x-auto hide-scrollbar gap-2">
            
            <button
              onClick={() => setActiveTab('my')}
              className={`flex-1 md:w-full flex items-center justify-between p-3.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === 'my' 
                  ? 'bg-primary text-white shadow-md scale-[1.02]' 
                  : 'text-secondary hover:bg-input hover:text-primary'
              }`}
            >
              <div className="flex items-center gap-3">
                My Documents
              </div>
              {activeTab === 'my' && <ChevronRight className="w-4 h-4 hidden md:block" />}
            </button>
            <button
              onClick={() => setActiveTab('upload')}
              className={`flex-1 md:w-full flex items-center justify-between p-3.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === 'upload' 
                  ? 'bg-primary text-white shadow-md scale-[1.02]' 
                  : 'text-secondary hover:bg-input hover:text-primary'
              }`}
            >
              <div className="flex items-center gap-3">
                Upload
              </div>
              {activeTab === 'upload' && <ChevronRight className="w-4 h-4 hidden md:block" />}
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
                Verification Status
              </div>
              {activeTab === 'status' && <ChevronRight className="w-4 h-4 hidden md:block" />}
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-card border border-border rounded-2xl shadow-sm min-h-[400px] p-6 relative overflow-hidden">
          
          {/* Decorative background blob */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2"></div>
          
          
          {activeTab === 'my' && (
            <div className="animate-in slide-in-from-right-4 duration-300">
              <h2 className="text-xl font-bold text-primary mb-6 flex items-center gap-2 border-b border-border pb-4">
                My Documents
              </h2>
              
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-input flex items-center justify-center mb-4">
                  <FileText className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-lg font-bold text-primary mb-2">My Documents content goes here</h3>
                <p className="text-sm text-secondary max-w-sm">
                  This section handles the full UI logic for My Documents. You can build tables, forms, or summary cards here.
                </p>
                <button className="mt-6 bg-primary/10 text-primary font-bold text-sm px-6 py-2.5 rounded-xl hover:bg-primary/20 transition-colors">
                  Action Button
                </button>
              </div>
            </div>
          )}
          {activeTab === 'upload' && (
            <div className="animate-in slide-in-from-right-4 duration-300">
              <h2 className="text-xl font-bold text-primary mb-6 flex items-center gap-2 border-b border-border pb-4">
                Upload
              </h2>
              
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-input flex items-center justify-center mb-4">
                  <FileText className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-lg font-bold text-primary mb-2">Upload content goes here</h3>
                <p className="text-sm text-secondary max-w-sm">
                  This section handles the full UI logic for Upload. You can build tables, forms, or summary cards here.
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
                Verification Status
              </h2>
              
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-input flex items-center justify-center mb-4">
                  <FileText className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-lg font-bold text-primary mb-2">Verification Status content goes here</h3>
                <p className="text-sm text-secondary max-w-sm">
                  This section handles the full UI logic for Verification Status. You can build tables, forms, or summary cards here.
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
