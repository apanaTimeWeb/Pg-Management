'use client';

// RESPONSIBILITY: Renders the Student Dashboard UI layer.
// DATA FLOW: useStudentDashboard.ts -> StudentDashboardMain.tsx

import Link from 'next/link';
import { IndianRupee, MapPin, Bell, Utensils, Zap, TriangleAlert } from 'lucide-react';

import { StudentUseStudentDashboard } from '@/app/student/dashboard/StudentDashboard_components/StudentUseStudentDashboard';
import { STUDENT_ROUTES } from '@/app/student/student_url_config';

export function StudentDashboardMain() {
  const { profile, loading, menu, notices, handleReferralSubmit } = StudentUseStudentDashboard();

  if (loading || !profile) return <div className="p-4 md:p-6 motion-safe:animate-pulse">Loading dashboard...</div>;

  return (
    <div className="space-y-6">
      
      {/* Top Banner / Room Info */}
      <div className="bg-primary text-white rounded-[var(--radius-lg)] p-6 shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10"><MapPin className="w-32 h-32" /></div>
        <div className="relative z-10">
          <p className="text-white/80 font-medium mb-1">Your Accommodation - {profile.propertyName || 'PG'}</p>
          <h2 className="text-3xl font-black mb-4">Room {profile.roomNumber || '-'} <span className="text-xl font-normal text-white/80 ml-2">Bed {profile.bedCode || '-'}</span></h2>
          <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-[var(--radius-sm)] text-sm font-bold backdrop-blur-sm">
            PG Score: {profile.pgScore || 0}/100
          </div>
        </div>
      </div>

      <div className={`grid ${profile.hasMessFacility ? 'grid-cols-2' : 'grid-cols-1'} gap-4`}>
        {/* Dues */}
        <Link href={STUDENT_ROUTES.RENT} className="bg-gradient-to-br from-bg-card to-bg-page border border-border rounded-[var(--radius-lg)] p-5 flex flex-col justify-between hover:border-primary motion-safe:hover:-translate-y-1 motion-safe:transition-all shadow-sm group relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-20 h-20 bg-danger-bg rounded-[var(--radius-full)] blur-2xl opacity-40 motion-safe:group-hover:scale-150 motion-safe:transition-transform motion-safe:duration-[700ms]"></div>
          <div className="text-secondary font-medium mb-3 flex items-center gap-1.5 relative z-10"><IndianRupee className="w-5 h-5 text-danger"/> Rent & Invoices</div>
          <div className={`text-3xl font-black relative z-10 ${profile.duesAmount > 0 ? 'text-danger' : 'text-success'}`}>
            ₹{profile.duesAmount || 0}
            <div className="text-sm font-medium text-secondary mt-1">{profile.duesAmount > 0 ? 'Pending Dues' : 'Cleared'}</div>
          </div>
          <div className="mt-4 relative z-10">
            {profile.duesAmount > 0 ? (
              <span className="inline-flex items-center justify-center w-full bg-primary text-white text-sm font-bold py-2.5 rounded-[var(--radius-md)] shadow hover:bg-primary-hover motion-safe:transition-colors">
                Pay Rent Now &rarr;
              </span>
            ) : (
              <span className="inline-flex items-center justify-center w-full bg-input text-primary text-sm font-bold py-2.5 rounded-[var(--radius-md)] hover:bg-border motion-safe:transition-colors">
                View History &rarr;
              </span>
            )}
          </div>
        </Link>
        
        {/* Mess Subscription Status (Only show if subscribed) */}
        {profile.hasMessFacility && (
          <div className="bg-gradient-to-br from-bg-card to-bg-page border border-border rounded-[var(--radius-lg)] p-5 flex flex-col justify-between hover:border-primary motion-safe:hover:-translate-y-1 motion-safe:transition-all shadow-sm group relative overflow-hidden">
            <div className="absolute -right-4 -top-4 w-20 h-20 bg-yellow-500/10 rounded-[var(--radius-full)] blur-2xl opacity-80 motion-safe:group-hover:scale-150 motion-safe:transition-transform motion-safe:duration-[700ms]"></div>
            <div className="text-secondary font-medium mb-3 flex items-center gap-1.5 relative z-10"><Utensils className="w-5 h-5 text-yellow-500"/> Mess Facility</div>
            <div className="text-2xl font-black text-primary relative z-10">
              Subscribed
            </div>
            <div className="text-sm text-secondary font-medium mt-3 relative z-10">
              Charges included in rent
            </div>
          </div>
        )}
      </div>

      {/* SOS Button */}
      <Link href={STUDENT_ROUTES.SOS} className="block w-full bg-destructive text-white text-center py-4 rounded-[var(--radius-lg)] font-black text-lg shadow-lg hover:bg-destructive/90 motion-safe:transition-all motion-safe:active:scale-95 flex items-center justify-center gap-2 border border-destructive/50 focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:outline-none">
        <TriangleAlert className="w-6 h-6 text-red-400" /> EMERGENCY SOS
      </Link>

      <div className={`grid ${profile.hasMessFacility ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-6`}>
        {/* Today's Menu (Only if subscribed) */}
        {profile.hasMessFacility && (
          <div className="bg-card border border-border rounded-[var(--radius-lg)] p-5 shadow-sm">
            <h3 className="font-bold text-primary flex items-center gap-2 mb-4">
              <Utensils className="w-5 h-5 text-primary"/> Today's Menu
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center p-3 bg-input rounded-[var(--radius-md)]">
                <span className="text-secondary">Breakfast</span>
                <span className="font-medium text-primary">{menu?.breakfast || 'TBD'}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-input rounded-[var(--radius-md)]">
                <span className="text-secondary">Lunch</span>
                <span className="font-medium text-primary">{menu?.lunch || 'TBD'}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-input rounded-[var(--radius-md)]">
                <span className="text-secondary">Dinner</span>
                <span className="font-medium text-primary">{menu?.dinner || 'TBD'}</span>
              </div>
            </div>
            <Link href={STUDENT_ROUTES.MESS} className="block mt-4 text-center text-sm font-bold text-primary py-2 border border-primary rounded-[var(--radius-md)] hover:bg-primary-subtle motion-safe:transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none">
              Manage Meals
            </Link>
          </div>
        )}

        {/* Notices */}
        <div className="bg-card border border-border rounded-[var(--radius-lg)] p-5 shadow-sm">
          <h3 className="font-bold text-primary flex items-center gap-2 mb-4">
            <Bell className="w-5 h-5 text-primary"/> Recent Notices
          </h3>
          <div className="space-y-3">
            {notices.map((n: any) => (
              <div key={n.id} className="p-3 border-l-2 border-primary bg-input rounded-r-[var(--radius-md)] text-sm">
                <div className="font-bold text-primary">{n.title}</div>
                <div className="text-secondary mt-1 truncate">{n.message}</div>
                <div className="text-[10px] text-secondary mt-2">{new Date(n.createdAt).toLocaleDateString()}</div>
              </div>
            ))}
            {notices.length === 0 && <p className="text-sm text-secondary">No recent notices.</p>}
          </div>
          <Link href={STUDENT_ROUTES.NOTICES} className="inline-block mt-4 text-sm font-bold text-primary hover:underline focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none rounded-[var(--radius-sm)]">
            View All &rarr;
          </Link>
        </div>
      </div>

      {/* Refer a Friend Banner */}
      <div className="bg-gradient-to-r from-[#10B981] to-[#14B8A6] text-white rounded-[var(--radius-lg)] p-6 shadow-md relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="text-xl font-black mb-1">🎁 Refer a Friend & Get 20% Off!</h3>
          <p className="text-sm text-emerald-50 mb-4 max-w-md">
            Refer a friend to our PG. When they move in, you get a 20% flat discount on your next month's rent.
          </p>
          {profile.pendingReferralRewards > 0 && (
            <div className="mb-4 inline-flex items-center gap-2 bg-white text-emerald-600 px-3 py-1.5 rounded-[var(--radius-full)] text-xs font-bold shadow-sm">
              🎉 You have {profile.pendingReferralRewards} pending 20% Off rewards!
            </div>
          )}
          <div className="bg-white/10 rounded-[var(--radius-lg)] p-4 backdrop-blur-sm border border-white/20">
            <h4 className="text-sm font-bold mb-3">Submit Friend's Details</h4>
            <form onSubmit={handleReferralSubmit} className="flex flex-col sm:flex-row gap-3">
              <input name="name" required type="text" placeholder="Friend's Name" className="flex-1 bg-white/20 border border-white/30 text-white placeholder-emerald-100 px-3 py-2 rounded-[var(--radius-md)] focus:outline-none focus:border-white text-sm" />
              <input name="phone" required type="tel" placeholder="Friend's Phone" onKeyDown={(e) => { if (e.key === '-' || e.key === 'e') e.preventDefault(); }} className="flex-1 bg-white/20 border border-white/30 text-white placeholder-emerald-100 px-3 py-2 rounded-[var(--radius-md)] focus:outline-none focus:border-white text-sm" />
              <button type="submit" className="bg-white text-emerald-600 font-bold px-4 py-2 rounded-[var(--radius-md)] shadow hover:bg-emerald-50 motion-safe:transition-colors whitespace-nowrap text-sm focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none">
                Submit Referral
              </button>
            </form>
          </div>
        </div>
      </div>

    </div>
  );
}
