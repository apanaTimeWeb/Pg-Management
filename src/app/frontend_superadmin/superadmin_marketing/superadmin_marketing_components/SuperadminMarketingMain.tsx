'use client';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { BarChart3, Users, Search, Ticket } from 'lucide-react';

export function SuperadminMarketingMain() {
  const searchParams = useSearchParams();
  const tabQuery = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState(tabQuery || 'leads');

  useEffect(() => {
    if (tabQuery) setActiveTab(tabQuery);
  }, [tabQuery]);

  const tabs = [
  {
    id: "leads",
    label: "Prospective Leads",
    icon: "Users",
    color: "text-info",
    bg: "bg-primary-subtle"
  },
  {
    id: "seo",
    label: "SEO Config",
    icon: "Search",
    color: "text-warning",
    bg: "bg-primary-subtle"
  },
  {
    id: "promotions",
    label: "Banners & Offers",
    icon: "Ticket",
    color: "text-success",
    bg: "bg-primary-subtle"
  }
];

  return (
    <div className="w-full h-full space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-theme-primary to-theme-primary-hover text-white rounded-3xl p-8 shadow-lg relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-700">
          <BarChart3 className="w-40 h-40" />
        </div>
        <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black mb-2 flex items-center gap-3">
              <BarChart3 className="w-8 h-8" /> Marketing & Leads
            </h1>
            <p className="text-white/80 font-medium max-w-xl">
              Manage prospective PGs, website SEO, and promotional banners.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col space-y-6">
        
        {/* Top Navigation Tabs */}
        <div className="bg-card border border-border/50 rounded-3xl p-2 shadow-sm flex items-center overflow-x-auto scrollbar-hide">
          {tabs.map((tab: any) => {
            const Icon = require('lucide-react')[tab.icon];
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-bold transition-all whitespace-nowrap ${
                  activeTab === tab.id 
                    ? 'bg-primary-subtle text-theme-primary shadow-sm' 
                    : 'text-secondary hover:bg-bg-page hover:text-primary'
                }`}
              >
                <div className={`p-1.5 rounded-lg ${activeTab === tab.id ? 'bg-primary-subtle' : 'bg-transparent'}`}>
                  <Icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-theme-primary' : tab.color}`} />
                </div>
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Dynamic Content Area */}
        <div className="w-full flex-1 bg-card border border-border/50 rounded-3xl shadow-sm flex flex-col min-h-[600px] overflow-hidden relative p-8">
           <div className="flex flex-col items-center justify-center h-full text-secondary opacity-50 space-y-4">
              <BarChart3 className="w-16 h-16" />
              <h2 className="text-2xl font-black text-primary">No data configured for {activeTab}</h2>
              <p className="font-bold">This module is part of the premium setup.</p>
           </div>
        </div>
      </div>
    </div>
  );
}