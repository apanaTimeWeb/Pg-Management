'use client';

// RESPONSIBILITY: Renders the Student Profile UI layer.
// DATA FLOW: useStudentProfile.ts -> StudentProfileMain.tsx

import { User, Shield, Star, Award, TrendingUp, TrendingDown } from 'lucide-react';
import { useStudentProfile } from '@/app/student/profile/StudentProfile_components/useStudentProfile';

export function StudentProfileMain() {
  const { profile, session, formData, setFormData, handleSubmit } = useStudentProfile();

  if (!profile) return <div className="p-4 motion-safe:animate-pulse">Loading...</div>;

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div>
        <h1 className="text-[24px] font-bold text-primary">My Profile</h1>
        <p className="text-sm text-secondary">Manage your personal and emergency contact details.</p>
      </div>

      <div className="bg-card border border-border rounded-[var(--radius-xl)] overflow-hidden shadow-sm">
        <div className="h-32 bg-gradient-to-r from-primary to-indigo-600 relative">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
            <div className="w-20 h-20 bg-card text-primary rounded-[var(--radius-full)] flex items-center justify-center text-3xl font-black border-4 border-bg-card shadow-lg">
              {session?.name?.charAt(0) || 'T'}
            </div>
          </div>
        </div>
        <div className="pt-14 pb-8 px-6 text-center relative z-10">
          <h2 className="text-2xl font-black text-primary">{session?.name}</h2>
          <p className="text-secondary font-medium mt-1">{session?.email}</p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 bg-page border border-border rounded-[var(--radius-full)] text-sm font-bold text-primary shadow-sm">
            <span>Room {profile.roomNumber}</span>
            <span className="w-1.5 h-1.5 rounded-[var(--radius-full)] bg-border"></span>
            <span>Bed {profile.bedId}</span>
          </div>

        <div className="border-t border-border pt-6 mt-2">
          <div className="flex flex-col sm:flex-row justify-between items-center bg-page rounded-[var(--radius-lg)] p-4 border border-border">
            <div className="flex items-center gap-4 mb-4 sm:mb-0">
              <div className={`w-14 h-14 rounded-[var(--radius-full)] flex items-center justify-center border-4 ${profile.pgScore >= 90 ? 'border-success bg-success-bg text-success' : profile.pgScore < 50 ? 'border-danger bg-danger-bg text-danger' : 'border-primary bg-primary-subtle text-primary'}`}>
                <Star className="w-6 h-6 fill-current" />
              </div>
              <div className="text-left">
                <div className="text-sm font-bold text-secondary uppercase tracking-wider">Your PG Score</div>
                <div className="text-2xl font-black text-primary">{profile.pgScore} <span className="text-sm font-medium text-secondary">/ 100</span></div>
              </div>
            </div>
            
            <div className="text-left sm:text-right text-sm">
              {profile.pgScore >= 90 ? (
                <div className="flex items-center sm:justify-end gap-1 text-success font-semibold">
                  <Award className="w-4 h-4" /> Excellent! Eligible for discounts.
                </div>
              ) : profile.pgScore >= 70 ? (
                <div className="flex items-center sm:justify-end gap-1 text-primary font-semibold">
                  <TrendingUp className="w-4 h-4" /> Good standing. Keep it up!
                </div>
              ) : (
                <div className="flex items-center sm:justify-end gap-1 text-danger font-semibold">
                  <TrendingDown className="w-4 h-4" /> Pay rent on time to improve score.
                </div>
              )}
              {profile.discountApplied && (
                <div className="mt-1 text-xs bg-success text-white px-2 py-0.5 rounded-[var(--radius-sm)] inline-block">5% Discount Applied Next Month</div>
              )}
            </div>
          </div>
        </div>
      </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-card border border-border rounded-[var(--radius-xl)] p-6 md:p-8 space-y-8 shadow-sm">
        <div>
          <h3 className="font-black text-lg text-primary mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-primary" />
            Contact Info
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-secondary mb-2 uppercase tracking-wider">Phone Number</label>
              <input type="tel" onKeyDown={(e) => { if (e.key === '-' || e.key === 'e') e.preventDefault(); }} value={formData.phone} onChange={e=>setFormData({...formData, phone: e.target.value})} className="w-full bg-page border border-border px-4 py-3 rounded-[var(--radius-lg)] text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-primary motion-safe:transition-shadow focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none" />
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-black text-lg text-primary border-t border-border pt-8 mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            Emergency Contacts
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-secondary mb-2 uppercase tracking-wider">Parent / Guardian Name</label>
              <input type="text" value={formData.parentName} onChange={e=>setFormData({...formData, parentName: e.target.value})} className="w-full bg-page border border-border px-4 py-3 rounded-[var(--radius-lg)] text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-primary motion-safe:transition-shadow focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-bold text-secondary mb-2 uppercase tracking-wider">Parent / Guardian Phone</label>
              <input type="tel" onKeyDown={(e) => { if (e.key === '-' || e.key === 'e') e.preventDefault(); }} value={formData.parentPhone} onChange={e=>setFormData({...formData, parentPhone: e.target.value})} className="w-full bg-page border border-border px-4 py-3 rounded-[var(--radius-lg)] text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-primary motion-safe:transition-shadow focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none" />
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-border flex justify-end">
          <button type="submit" className="px-8 py-3 bg-primary text-white rounded-[var(--radius-lg)] font-bold text-sm shadow-lg shadow-primary-subtle hover:bg-primary-hover motion-safe:hover:-translate-y-0.5 motion-safe:transition-all focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none">Save Changes</button>
        </div>
      </form>
    </div>
  );
}
