'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Bell } from 'lucide-react';

export function StudentNoticesMain() {


  return (
    <div className="w-full max-w-6xl mx-auto pb-12 animate-in fade-in duration-300">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-black text-primary flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Bell className="w-6 h-6 text-primary" />
          </div>
          Notices
        </h1>
        <p className="text-sm text-secondary mt-2 font-medium">Important announcements and notices from management.</p>
      </div>

      <div className="bg-card border border-border rounded-2xl shadow-sm min-h-[400px] p-6 flex flex-col items-center justify-center text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="w-20 h-20 rounded-full bg-input flex items-center justify-center mb-4">
          <Bell className="w-10 h-10 text-secondary" />
        </div>
        <h2 className="text-xl font-bold text-primary mb-2">Notices</h2>
        <p className="text-sm text-secondary max-w-md">Detailed overview and data for Notices will be displayed here.</p>
      </div>
    </div>
  );
}
