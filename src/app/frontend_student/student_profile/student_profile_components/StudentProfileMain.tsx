'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  User, Camera, Phone, Mail, MapPin, Edit2, Save, X, AlertCircle,
  UserCircle, Users, Home, CheckCircle2, Send
} from 'lucide-react';
import { toast } from 'sonner';

const PROFILE_DATA = {
  id: 'STU-2024-1045',
  name: 'Rahul Sharma',
  photo: null as null | string,
  dob: '15 Mar 2003',
  gender: 'Male',
  mobile: '+91 98765 43210',
  email: 'rahul.sharma@gmail.com',
  parent: { name: 'Ramesh Sharma', relation: 'Father', mobile: '+91 91234 56789', email: 'ramesh@gmail.com' },
  emergency: { name: 'Sunita Sharma', relation: 'Mother', mobile: '+91 87654 32109', alternateMobile: '+91 76543 21098' },
  address: { address: '12, Rajiv Nagar, Near Bus Stand', city: 'Patna', state: 'Bihar', country: 'India', pincode: '800001' },
};

export function StudentProfileMain() {
  const searchParams = useSearchParams();
  const viewParam = searchParams.get('view');
  const initialTab = viewParam === 'guardian' ? 'guardian' : viewParam === 'emergency' ? 'emergency' : viewParam === 'address' ? 'address' : 'personal';
  const [activeTab, setActiveTab] = useState<'personal' | 'guardian' | 'emergency' | 'address'>(initialTab);
  const [editingEmergency, setEditingEmergency] = useState(false);
  const [emergency, setEmergency] = useState(PROFILE_DATA.emergency);
  const [correctionModal, setCorrectionModal] = useState(false);
  const [correctionField, setCorrectionField] = useState('');
  const [correctionValue, setCorrectionValue] = useState('');
  const [correctionSubmitted, setCorrectionSubmitted] = useState(false);

  const handleOpenCorrection = (field: string) => {
    setCorrectionField(field);
    setCorrectionModal(true);
  };

  const handleSubmitCorrection = () => {
    if (!correctionValue.trim()) { toast.error('Please provide the correct value'); return; }
    setCorrectionSubmitted(true);
    toast.success('Correction request submitted to manager!');
  };

  const handleSaveEmergency = () => {
    setEditingEmergency(false);
    toast.success('Emergency contact updated!');
  };

  return (
    <div className="w-full pb-12 animate-in fade-in duration-300">

      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-black text-primary flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <UserCircle className="w-6 h-6 text-primary" />
          </div>
          My Profile
        </h1>
        <p className="text-sm text-secondary mt-2 font-medium">View and manage your personal information.</p>
      </div>

      {/* Profile Card */}
      <div className="bg-gradient-to-br from-primary/10 to-info/5 border border-primary/20 rounded-2xl p-6 mb-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
          <div className="relative shrink-0">
            <div className="w-24 h-24 rounded-full bg-primary/10 border-4 border-card shadow-lg flex items-center justify-center">
              <User className="w-12 h-12 text-primary" />
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shadow-md hover:bg-primary/90 transition-colors">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-black text-primary">{PROFILE_DATA.name}</h2>
            <p className="text-sm text-secondary font-medium">{PROFILE_DATA.id}</p>
            <div className="flex flex-wrap justify-center sm:justify-start gap-3 mt-3">
              <span className="flex items-center gap-1.5 text-xs font-bold text-secondary bg-card border border-border px-3 py-1.5 rounded-lg"><Mail className="w-3.5 h-3.5" /> {PROFILE_DATA.email}</span>
              <span className="flex items-center gap-1.5 text-xs font-bold text-secondary bg-card border border-border px-3 py-1.5 rounded-lg"><Phone className="w-3.5 h-3.5" /> {PROFILE_DATA.mobile}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-warning/5 border border-warning/20 rounded-xl p-4 mb-6 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-warning shrink-0 mt-0.5" />
        <p className="text-sm font-medium text-warning/90">Verified fields (Name, DOB, ID) cannot be directly edited. Use the <strong>&quot;Request Correction&quot;</strong> option to submit a change to the manager.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto hide-scrollbar mb-6 bg-card border border-border rounded-xl p-1.5 w-fit max-w-full">
        {[
          { id: 'personal', label: 'Personal Info' },
          { id: 'guardian', label: 'Parent / Guardian' },
          { id: 'emergency', label: 'Emergency Contact' },
          { id: 'address', label: 'Address' },
        ].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id as any)} className={`px-4 py-2 rounded-lg text-sm font-bold whitespace-nowrap transition-all ${activeTab === tab.id ? 'bg-primary text-white shadow-md' : 'text-secondary hover:text-primary'}`}>
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'personal' && (
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
          <h3 className="font-black text-primary mb-6 flex items-center gap-2"><User className="w-5 h-5 text-primary" /> Personal Information</h3>
          <div className="space-y-4">
            {[
              { label: 'Student ID', value: PROFILE_DATA.id, locked: true },
              { label: 'Full Name', value: PROFILE_DATA.name, locked: true },
              { label: 'Date of Birth', value: PROFILE_DATA.dob, locked: true },
              { label: 'Gender', value: PROFILE_DATA.gender, locked: true },
              { label: 'Mobile', value: PROFILE_DATA.mobile, locked: false },
              { label: 'Email', value: PROFILE_DATA.email, locked: false },
            ].map(item => (
              <div key={item.label} className="flex items-center justify-between py-3 border-b border-border/50 last:border-0 gap-4">
                <span className="text-sm text-secondary font-medium shrink-0">{item.label}</span>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-primary">{item.value}</span>
                  <button onClick={() => handleOpenCorrection(item.label)} className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors text-xs font-bold ${item.locked ? 'bg-input text-secondary border border-border' : 'bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20'}`} title={item.locked ? 'Request correction' : 'Edit'}>
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'guardian' && (
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
          <h3 className="font-black text-primary mb-6 flex items-center gap-2"><Users className="w-5 h-5 text-info" /> Parent / Guardian</h3>
          <div className="space-y-4">
            {[
              { label: 'Name', value: PROFILE_DATA.parent.name },
              { label: 'Relation', value: PROFILE_DATA.parent.relation },
              { label: 'Mobile', value: PROFILE_DATA.parent.mobile },
              { label: 'Email', value: PROFILE_DATA.parent.email },
            ].map(item => (
              <div key={item.label} className="flex items-center justify-between py-3 border-b border-border/50 last:border-0">
                <span className="text-sm text-secondary font-medium">{item.label}</span>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-primary">{item.value}</span>
                  <button onClick={() => handleOpenCorrection(`Guardian ${item.label}`)} className="shrink-0 w-8 h-8 rounded-lg bg-input text-secondary border border-border flex items-center justify-center hover:bg-card transition-colors">
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'emergency' && (
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-black text-primary flex items-center gap-2"><Phone className="w-5 h-5 text-danger" /> Emergency Contact</h3>
            <button onClick={() => setEditingEmergency(!editingEmergency)} className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold border transition-colors ${editingEmergency ? 'bg-success/10 text-success border-success/20' : 'bg-primary/10 text-primary border-primary/20 hover:bg-primary/20'}`}>
              {editingEmergency ? <><Save className="w-3.5 h-3.5" onClick={handleSaveEmergency} /> Save</> : <><Edit2 className="w-3.5 h-3.5" /> Edit</>}
            </button>
          </div>
          <div className="space-y-4">
            {[
              { label: 'Name', key: 'name' as const },
              { label: 'Relation', key: 'relation' as const },
              { label: 'Mobile', key: 'mobile' as const },
              { label: 'Alternate Mobile', key: 'alternateMobile' as const },
            ].map(item => (
              <div key={item.label} className="py-3 border-b border-border/50 last:border-0">
                <label className="text-xs font-bold text-secondary uppercase tracking-wider mb-1 block">{item.label}</label>
                {editingEmergency ? (
                  <input value={emergency[item.key]} onChange={(e) => setEmergency({...emergency, [item.key]: e.target.value})} className="w-full bg-input border border-border rounded-xl px-4 py-2.5 text-sm font-bold text-primary focus:outline-none focus:border-primary" />
                ) : (
                  <p className="text-sm font-bold text-primary">{emergency[item.key]}</p>
                )}
              </div>
            ))}
          </div>
          {editingEmergency && (
            <button onClick={handleSaveEmergency} className="w-full mt-4 bg-primary text-white font-bold text-sm py-3 rounded-xl shadow-md hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
              <Save className="w-4 h-4" /> Save Changes
            </button>
          )}
        </div>
      )}

      {activeTab === 'address' && (
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
          <h3 className="font-black text-primary mb-6 flex items-center gap-2"><Home className="w-5 h-5 text-success" /> Permanent Address</h3>
          <div className="space-y-4">
            {[
              { label: 'Address', value: PROFILE_DATA.address.address },
              { label: 'City', value: PROFILE_DATA.address.city },
              { label: 'State', value: PROFILE_DATA.address.state },
              { label: 'Country', value: PROFILE_DATA.address.country },
              { label: 'Pincode', value: PROFILE_DATA.address.pincode },
            ].map(item => (
              <div key={item.label} className="flex items-center justify-between py-3 border-b border-border/50 last:border-0">
                <span className="text-sm text-secondary font-medium">{item.label}</span>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-primary">{item.value}</span>
                  <button onClick={() => handleOpenCorrection(item.label)} className="shrink-0 w-8 h-8 rounded-lg bg-input text-secondary border border-border flex items-center justify-center hover:bg-card transition-colors">
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Correction Request Modal */}
      {correctionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-card border border-border rounded-2xl w-full max-w-md shadow-xl overflow-hidden">
            <div className="p-5 border-b border-border flex items-center justify-between bg-input/30">
              <h2 className="text-base font-black text-primary">Request Correction: {correctionField}</h2>
              <button onClick={() => { setCorrectionModal(false); setCorrectionSubmitted(false); setCorrectionValue(''); }} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-input text-secondary hover:text-danger transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            {correctionSubmitted ? (
              <div className="p-10 flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-success/10 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-7 h-7 text-success" />
                </div>
                <h3 className="text-base font-black text-primary mb-2">Request Submitted!</h3>
                <p className="text-sm text-secondary mb-5">Manager will verify and update your information.</p>
                <button onClick={() => { setCorrectionModal(false); setCorrectionSubmitted(false); setCorrectionValue(''); }} className="bg-primary text-white font-bold text-sm px-6 py-2 rounded-xl">Close</button>
              </div>
            ) : (
              <div className="p-6 space-y-4">
                <p className="text-xs font-medium text-secondary bg-warning/5 border border-warning/20 rounded-lg p-3">Manager will review and approve your correction request. Fields cannot be self-edited directly.</p>
                <div>
                  <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">New Correct Value</label>
                  <input value={correctionValue} onChange={e => setCorrectionValue(e.target.value)} placeholder={`Enter correct ${correctionField.toLowerCase()}`} className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-primary shadow-sm" />
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setCorrectionModal(false)} className="flex-1 bg-card border border-border text-secondary font-bold text-sm py-2.5 rounded-xl hover:bg-input transition-colors">Cancel</button>
                  <button onClick={handleSubmitCorrection} className="flex-1 bg-primary text-white font-bold text-sm py-2.5 rounded-xl shadow-md hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                    <Send className="w-4 h-4" /> Submit
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
