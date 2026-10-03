'use client';

import React, { useState } from 'react';
import {
  Home, BedDouble, Wifi, Fan, Lightbulb, BookOpen, Sofa, Package,
  Droplets, ArrowRight, Users, User, Phone, AlertCircle, Send, CheckCircle2, XCircle, X
} from 'lucide-react';
import { toast } from 'sonner';

const ROOM_DATA = {
  pgName: 'Green Valley PG',
  building: 'Block A',
  floor: '2nd Floor',
  roomNumber: 'Room 204',
  roomType: 'Triple Sharing',
  bedNumber: 'Bed B',
  capacity: 3,
  facilities: [
    { name: 'Wi-Fi', icon: Wifi, available: true },
    { name: 'Fan', icon: Fan, available: true },
    { name: 'Light', icon: Lightbulb, available: true },
    { name: 'Study Table', icon: BookOpen, available: true },
    { name: 'Chair', icon: Sofa, available: true },
    { name: 'Cupboard', icon: Package, available: true },
    { name: 'Bed + Mattress', icon: BedDouble, available: true },
    { name: 'Attached Bathroom', icon: Droplets, available: false },
  ],
  roommates: [
    { name: 'Amit Verma', bed: 'Bed A', contact: '+91 98765 XXXXX' },
    { name: 'Ravi Gupta', bed: 'Bed C', contact: '+91 87654 XXXXX' },
  ],
};

export function StudentRoomMain() {
  const [activeTab, setActiveTab] = useState<'room' | 'roommates' | 'change'>('room');
  const [isChangeModalOpen, setIsChangeModalOpen] = useState(false);
  const [reason, setReason] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitChange = () => {
    if (!reason.trim()) { toast.error('Please provide a reason'); return; }
    setSubmitted(true);
    toast.success('Room change request submitted!');
  };

  return (
    <div className="w-full max-w-5xl mx-auto pb-12 animate-in fade-in duration-300">
      
      <div className="mb-6 md:mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-primary flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Home className="w-6 h-6 text-primary" />
            </div>
            My Room & Bed
          </h1>
          <p className="text-sm text-secondary mt-2 font-medium">View your room details, facilities, and roommates.</p>
        </div>
        <button
          onClick={() => setIsChangeModalOpen(true)}
          className="bg-warning/10 text-warning border border-warning/20 font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-warning/20 transition-colors flex items-center gap-2 whitespace-nowrap"
        >
          <ArrowRight className="w-4 h-4" /> Request Room Change
        </button>
      </div>

      {/* Quick Room Card */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 to-info/10 border border-primary/20 rounded-2xl p-6 mb-6 shadow-sm">
        <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-primary/10 rounded-full blur-2xl"></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Room', value: ROOM_DATA.roomNumber, icon: Home },
            { label: 'Bed', value: ROOM_DATA.bedNumber, icon: BedDouble },
            { label: 'Floor', value: ROOM_DATA.floor, icon: Home },
            { label: 'Type', value: ROOM_DATA.roomType, icon: Users },
          ].map(item => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="text-center">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-2">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <p className="font-black text-primary text-lg">{item.value}</p>
                <p className="text-xs text-secondary font-medium">{item.label}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 bg-card border border-border rounded-xl p-1.5 w-fit">
        {[
          { id: 'room', label: 'Room Details' },
          { id: 'roommates', label: 'Roommates' },
          { id: 'change', label: 'Change Requests' },
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

      {activeTab === 'room' && (
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
          <h3 className="font-black text-primary mb-6">Room Facilities</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {ROOM_DATA.facilities.map((facility) => {
              const Icon = facility.icon;
              return (
                <div key={facility.name} className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-colors ${facility.available ? 'bg-success/5 border-success/20 text-success' : 'bg-input border-border text-secondary opacity-60'}`}>
                  <Icon className="w-6 h-6" />
                  <p className="text-xs font-bold text-center">{facility.name}</p>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center ${facility.available ? 'bg-success text-white' : 'bg-input text-secondary'}`}>
                    {facility.available ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === 'roommates' && (
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
          <h3 className="font-black text-primary mb-6 flex items-center gap-2"><Users className="w-5 h-5 text-info" /> Roommates</h3>
          <div className="bg-info/5 border border-info/20 rounded-xl p-3 mb-6 flex items-center gap-2 text-info text-sm font-medium">
            <AlertCircle className="w-4 h-4 shrink-0" />
            Contact details are partially hidden to protect privacy.
          </div>
          <div className="space-y-4">
            {ROOM_DATA.roommates.map((rm) => (
              <div key={rm.name} className="flex items-center gap-4 p-4 rounded-xl border border-border bg-input/30 hover:bg-input transition-colors">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-black text-primary">{rm.name}</p>
                  <p className="text-sm font-medium text-secondary">{rm.bed}</p>
                </div>
                <div className="flex items-center gap-1.5 text-secondary text-xs font-medium bg-card border border-border px-3 py-1.5 rounded-lg">
                  <Phone className="w-3.5 h-3.5" /> {rm.contact}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'change' && (
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
          <h3 className="font-black text-primary mb-2">Room / Bed Change History</h3>
          <p className="text-sm text-secondary mb-6">No previous requests. Manager will review and assign a new room/bed if approved.</p>
          <button onClick={() => setIsChangeModalOpen(true)} className="bg-primary text-white font-bold text-sm px-6 py-2.5 rounded-xl shadow-md hover:bg-primary/90 transition-colors flex items-center gap-2">
            <ArrowRight className="w-4 h-4" /> Request Room Change
          </button>
        </div>
      )}

      {/* Room Change Modal */}
      {isChangeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-card border border-border rounded-2xl w-full max-w-md shadow-xl overflow-hidden">
            <div className="p-5 border-b border-border flex items-center justify-between bg-input/30">
              <h2 className="text-lg font-black text-primary">Request Room Change</h2>
              <button onClick={() => setIsChangeModalOpen(false)} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-input text-secondary hover:text-danger transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            {submitted ? (
              <div className="p-10 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-8 h-8 text-success" />
                </div>
                <h3 className="text-lg font-black text-primary mb-2">Request Submitted!</h3>
                <p className="text-sm text-secondary mb-6">Manager will review and notify you soon.</p>
                <button onClick={() => { setIsChangeModalOpen(false); setSubmitted(false); setReason(''); }} className="bg-primary text-white font-bold text-sm px-6 py-2 rounded-xl">Close</button>
              </div>
            ) : (
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">Current Room & Bed</label>
                  <div className="bg-input/30 border border-border rounded-xl px-4 py-3 text-sm font-bold text-primary">{ROOM_DATA.roomNumber} • {ROOM_DATA.bedNumber}</div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">Reason for Change *</label>
                  <textarea
                    rows={4}
                    placeholder="Explain why you need a room change..."
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full bg-card border border-border rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-primary shadow-sm resize-none"
                  ></textarea>
                </div>
                <p className="text-xs text-secondary bg-warning/10 border border-warning/20 rounded-lg p-3">Room will be assigned by Manager after approval. You cannot directly choose your room.</p>
                <div className="flex gap-3 pt-2">
                  <button onClick={() => setIsChangeModalOpen(false)} className="flex-1 bg-card border border-border text-secondary font-bold text-sm py-2.5 rounded-xl hover:bg-input transition-colors">Cancel</button>
                  <button onClick={handleSubmitChange} className="flex-1 bg-primary text-white font-bold text-sm py-2.5 rounded-xl shadow-md hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
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
