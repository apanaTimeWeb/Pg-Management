'use client';

import React, { useState } from 'react';
import {
  FileText, CalendarCheck, Building, Home, BedDouble, IndianRupee,
  ShieldCheck, CheckCircle2, Clock, AlertCircle, Download, Eye,
  ChevronRight, Hash
} from 'lucide-react';

type AdmissionStatus = 'Application Submitted' | 'Under Verification' | 'Approved' | 'Rejected' | 'Check-in Pending' | 'Active' | 'Notice Period' | 'Checked Out';

const STATUS_TIMELINE: AdmissionStatus[] = [
  'Application Submitted', 'Under Verification', 'Approved',
  'Check-in Pending', 'Active', 'Notice Period', 'Checked Out'
];

const getStatusConfig = (status: AdmissionStatus) => {
  switch (status) {
    case 'Active': return { color: 'text-success', bg: 'bg-success/10', border: 'border-success/20', icon: CheckCircle2 };
    case 'Approved': return { color: 'text-info', bg: 'bg-info/10', border: 'border-info/20', icon: CheckCircle2 };
    case 'Under Verification': return { color: 'text-warning', bg: 'bg-warning/10', border: 'border-warning/20', icon: Clock };
    case 'Check-in Pending': return { color: 'text-primary', bg: 'bg-primary/10', border: 'border-primary/20', icon: Clock };
    case 'Rejected': return { color: 'text-danger', bg: 'bg-danger/10', border: 'border-danger/20', icon: AlertCircle };
    case 'Notice Period': return { color: 'text-warning', bg: 'bg-warning/10', border: 'border-warning/20', icon: AlertCircle };
    default: return { color: 'text-secondary', bg: 'bg-input', border: 'border-border', icon: Clock };
  }
};

const ADMISSION_DATA = {
  id: 'ADM-2024-1045',
  applicationDate: '01 Aug 2026',
  admissionDate: '18 Aug 2026',
  joiningDate: '20 Aug 2026',
  status: 'Active' as AdmissionStatus,
  pgName: 'Green Valley PG',
  property: 'Main Building, Koramangala',
  building: 'Block A',
  floor: '2nd Floor',
  room: 'Room 204',
  bed: 'Bed B',
  roomType: 'Triple Sharing',
  monthlyRent: '₹8,000',
  securityDeposit: '₹10,000',
  admissionFee: '₹500',
  joiningDateFull: '20 Aug 2026',
  expectedCheckout: '19 Feb 2027',
  agreementStatus: 'Signed',
};

export function StudentAdmissionMain() {
  const [activeTab, setActiveTab] = useState<'details' | 'status' | 'agreement'>('details');
  const config = getStatusConfig(ADMISSION_DATA.status);
  const StatusIcon = config.icon;

  const currentStepIdx = STATUS_TIMELINE.indexOf(ADMISSION_DATA.status);

  return (
    <div className="w-full max-w-5xl mx-auto pb-12 animate-in fade-in duration-300">
      
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-black text-primary flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <FileText className="w-6 h-6 text-primary" />
          </div>
          My Admission
        </h1>
        <p className="text-sm text-secondary mt-2 font-medium">Your complete admission history and current status.</p>
      </div>

      {/* Status Badge */}
      <div className={`flex items-center justify-between p-4 rounded-2xl border mb-6 shadow-sm ${config.bg} ${config.border}`}>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${config.bg} border ${config.border}`}>
            <StatusIcon className={`w-5 h-5 ${config.color}`} />
          </div>
          <div>
            <p className="text-xs font-bold text-secondary uppercase tracking-wider">Current Status</p>
            <p className={`text-lg font-black ${config.color}`}>{ADMISSION_DATA.status}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs font-bold text-secondary">Admission ID</p>
          <p className="font-black text-primary">{ADMISSION_DATA.id}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 bg-card border border-border rounded-xl p-1.5 w-fit">
        {[
          { id: 'details', label: 'Admission Details' },
          { id: 'status', label: 'Status Timeline' },
          { id: 'agreement', label: 'Agreement' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === tab.id ? 'bg-primary text-white shadow-md' : 'text-secondary hover:text-primary'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'details' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Application Info */}
          <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
            <h3 className="font-black text-primary flex items-center gap-2 mb-5">
              <Hash className="w-5 h-5 text-primary" /> Application Info
            </h3>
            <div className="space-y-4">
              {[
                { label: 'Admission ID', value: ADMISSION_DATA.id },
                { label: 'Application Date', value: ADMISSION_DATA.applicationDate },
                { label: 'Admission Date', value: ADMISSION_DATA.admissionDate },
                { label: 'Joining Date', value: ADMISSION_DATA.joiningDate },
                { label: 'Expected Check-out', value: ADMISSION_DATA.expectedCheckout },
              ].map(item => (
                <div key={item.label} className="flex justify-between items-center py-2 border-b border-border/50 last:border-0">
                  <span className="text-sm text-secondary font-medium">{item.label}</span>
                  <span className="text-sm font-bold text-primary">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Room & Property */}
          <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
            <h3 className="font-black text-primary flex items-center gap-2 mb-5">
              <Home className="w-5 h-5 text-info" /> Room & Property
            </h3>
            <div className="space-y-4">
              {[
                { label: 'PG Name', value: ADMISSION_DATA.pgName },
                { label: 'Property', value: ADMISSION_DATA.property },
                { label: 'Building', value: ADMISSION_DATA.building },
                { label: 'Room', value: `${ADMISSION_DATA.room} (${ADMISSION_DATA.roomType})` },
                { label: 'Bed', value: ADMISSION_DATA.bed },
              ].map(item => (
                <div key={item.label} className="flex justify-between items-center py-2 border-b border-border/50 last:border-0">
                  <span className="text-sm text-secondary font-medium">{item.label}</span>
                  <span className="text-sm font-bold text-primary">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Financials */}
          <div className="bg-card border border-border rounded-2xl p-5 shadow-sm md:col-span-2">
            <h3 className="font-black text-primary flex items-center gap-2 mb-5">
              <IndianRupee className="w-5 h-5 text-success" /> Financial Details
            </h3>
            <div className="grid grid-cols-3 gap-6">
              {[
                { label: 'Monthly Rent', value: ADMISSION_DATA.monthlyRent, color: 'text-primary' },
                { label: 'Security Deposit', value: ADMISSION_DATA.securityDeposit, color: 'text-success' },
                { label: 'Admission Fee', value: ADMISSION_DATA.admissionFee, color: 'text-warning' },
              ].map(item => (
                <div key={item.label} className="text-center p-4 bg-input/30 rounded-xl border border-border">
                  <p className={`text-2xl font-black ${item.color}`}>{item.value}</p>
                  <p className="text-xs font-bold text-secondary mt-1">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'status' && (
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
          <h3 className="font-black text-primary mb-8">Admission Status Journey</h3>
          <div className="relative">
            <div className="absolute left-5 top-5 bottom-5 w-0.5 bg-border"></div>
            <div className="space-y-6">
              {STATUS_TIMELINE.map((step, idx) => {
                const isCompleted = idx < currentStepIdx;
                const isCurrent = idx === currentStepIdx;
                return (
                  <div key={step} className="flex items-start gap-6 relative">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 z-10 border-2 ${
                      isCompleted ? 'bg-success border-success text-white' :
                      isCurrent ? 'bg-primary border-primary text-white' :
                      'bg-card border-border text-secondary'
                    }`}>
                      {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <span className="text-sm font-bold">{idx + 1}</span>}
                    </div>
                    <div className="flex-1 pt-1.5">
                      <p className={`text-base font-black ${isCompleted || isCurrent ? 'text-primary' : 'text-secondary'}`}>{step}</p>
                      {isCurrent && <span className="inline-block mt-1 text-xs font-bold bg-primary/10 text-primary px-2.5 py-1 rounded-full">Current Status</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'agreement' && (
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="font-black text-primary mb-1">Rent Agreement</h3>
              <p className="text-sm text-secondary">Period: 20 Aug 2026 – 19 Feb 2027</p>
            </div>
            <span className="bg-success/10 text-success border border-success/20 text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> Signed
            </span>
          </div>
          <div className="bg-input/30 border border-border rounded-xl p-8 flex flex-col items-center justify-center text-center mb-6">
            <FileText className="w-14 h-14 text-border mb-3" />
            <p className="text-sm font-bold text-secondary">Agreement_Green_Valley_PG_2026.pdf</p>
            <p className="text-xs text-secondary/60">2.4 MB • PDF</p>
          </div>
          <div className="flex gap-3 justify-end">
            <button className="flex items-center gap-2 bg-card border border-border px-5 py-2.5 rounded-xl text-sm font-bold text-primary hover:bg-input transition-colors shadow-sm">
              <Eye className="w-4 h-4" /> View
            </button>
            <button className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-primary/90 transition-colors shadow-md">
              <Download className="w-4 h-4" /> Download
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
