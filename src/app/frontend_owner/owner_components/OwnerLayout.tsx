'use client';

// RESPONSIBILITY: Renders the OwnerLayout component. Receives data via props/hooks.

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, Building2, Bed, Users, 
  Wallet, UtensilsCrossed, Settings, 
  LogOut, Bell, Building, Menu, X, Wrench, CalendarCheck,
  MessageSquare, Megaphone, TrendingUp, Search, Plus, User,
  ClipboardCheck, DoorOpen, ShieldCheck, Calculator, UserCog,
  PlaneTakeoff, Package, FileText, History as HistoryIcon,
  ChevronDown, ChevronRight, Check
} from 'lucide-react';

import { getSession, clearSession } from '@/app/frontend_owner/owner_lib/owner_auth/OwnerSession';
import { useOwnerPropertyContext } from '@/app/frontend_owner/owner_components/OwnerPropertyContext';
import { useOwnerI18n } from '@/app/frontend_owner/OwnerI18n';
import { OwnerForcePasswordChangeModal } from '@/app/frontend_owner/owner_components/OwnerForcePasswordChangeModal';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import type { DictKey } from '@/app/frontend_owner/OwnerI18n';

const NAV_ITEMS = [
  { key: 'dashboard', label: 'Dashboard', href: '/frontend_owner/dashboard', icon: LayoutDashboard },
  { key: 'pg_management', label: 'PG Management', icon: Building, subItems: [
      { label: 'Properties', href: '/frontend_owner/pg_management/properties' },
      { label: 'Buildings', href: '/frontend_owner/pg_management/buildings' },
      { label: 'Floors', href: '/frontend_owner/pg_management/floors' },
      { label: 'PG Information', href: '/frontend_owner/pg_management/info' },
  ]},
  { key: 'rooms_beds', label: 'Rooms & Beds', icon: Bed, subItems: [
      { label: 'Rooms', href: '/frontend_owner/rooms_beds/rooms' },
      { label: 'Beds', href: '/frontend_owner/rooms_beds/beds' },
      { label: 'Occupancy', href: '/frontend_owner/rooms_beds/occupancy' },
      { label: 'Available Beds', href: '/frontend_owner/rooms_beds/available' },
      { label: 'Maintenance Beds', href: '/frontend_owner/rooms_beds/maintenance' },
  ]},
  { key: 'students', label: 'Students', icon: Users, subItems: [
      { label: 'All Students', href: '/frontend_owner/students/all' },
      { label: 'Active', href: '/frontend_owner/students/active' },
      { label: 'Pending', href: '/frontend_owner/students/pending' },
      { label: 'Notice Period', href: '/frontend_owner/students/notice_period' },
      { label: 'Checked Out', href: '/frontend_owner/students/checked_out' },
  ]},
  { key: 'admissions', label: 'Admissions', icon: ClipboardCheck, subItems: [
      { label: 'Enquiries', href: '/frontend_owner/admissions/enquiries' },
      { label: 'Applications', href: '/frontend_owner/admissions/applications' },
      { label: 'Verification', href: '/frontend_owner/admissions/verification' },
      { label: 'Approved', href: '/frontend_owner/admissions/approved' },
      { label: 'Rejected', href: '/frontend_owner/admissions/rejected' },
  ]},
  { key: 'checkin_checkout', label: 'Check-in / Check-out', href: '/frontend_owner/check_in_out', icon: DoorOpen },
  { key: 'fees_payments', label: 'Fees & Payments', icon: Wallet, subItems: [
      { label: 'Rent', href: '/frontend_owner/fees_payments/rent' },
      { label: 'Dues', href: '/frontend_owner/fees_payments/dues' },
      { label: 'Payments', href: '/frontend_owner/fees_payments/payments' },
      { label: 'Receipts', href: '/frontend_owner/fees_payments/receipts' },
      { label: 'Fines', href: '/frontend_owner/fees_payments/fines' },
      { label: 'Refunds', href: '/frontend_owner/fees_payments/refunds' },
  ]},
  { key: 'security_deposit', label: 'Security Deposit', href: '/frontend_owner/security_deposit', icon: ShieldCheck },
  { key: 'accounts', label: 'Accounts', icon: Calculator, subItems: [
      { label: 'Income', href: '/frontend_owner/accounts/income' },
      { label: 'Expenses', href: '/frontend_owner/accounts/expenses' },
      { label: 'Vendors', href: '/frontend_owner/accounts/vendors' },
      { label: 'Financial Reports', href: '/frontend_owner/accounts/reports' },
  ]},
  { key: 'staff', label: 'Staff', icon: UserCog, subItems: [
      { label: 'All Staff', href: '/frontend_owner/staff/all' },
      { label: 'Managers', href: '/frontend_owner/staff/managers' },
      { label: 'Cooks', href: '/frontend_owner/staff/cooks' },
  ]},
  { key: 'mess_food', label: 'Mess / Food', icon: UtensilsCrossed, subItems: [
      { label: 'Menu', href: '/frontend_owner/mess_food/menu' },
      { label: 'Meals', href: '/frontend_owner/mess_food/meals' },
      { label: 'Meal Attendance', href: '/frontend_owner/mess_food/attendance' },
      { label: 'Kitchen Stock', href: '/frontend_owner/mess_food/stock' },
  ]},
  { key: 'attendance', label: 'Attendance', href: '/frontend_owner/attendance', icon: CalendarCheck },
  { key: 'leave_outing', label: 'Leave / Outing', href: '/frontend_owner/leave_outing', icon: PlaneTakeoff },
  { key: 'visitors', label: 'Visitors', href: '/frontend_owner/visitors', icon: Users },
  { key: 'complaints_maintenance', label: 'Complaints & Maint.', icon: Wrench, subItems: [
      { label: 'Complaints', href: '/frontend_owner/complaints_maintenance/complaints' },
      { label: 'Maintenance', href: '/frontend_owner/complaints_maintenance/maintenance' },
      { label: 'Assignments', href: '/frontend_owner/complaints_maintenance/assignments' },
      { label: 'History', href: '/frontend_owner/complaints_maintenance/history' },
  ]},
  { key: 'inventory', label: 'Inventory', icon: Package, subItems: [
      { label: 'Items', href: '/frontend_owner/inventory/items' },
      { label: 'Stock In', href: '/frontend_owner/inventory/stock_in' },
      { label: 'Stock Out', href: '/frontend_owner/inventory/stock_out' },
      { label: 'Low Stock', href: '/frontend_owner/inventory/low_stock' },
      { label: 'Damage / Loss', href: '/frontend_owner/inventory/damage_loss' },
  ]},
  { key: 'notices', label: 'Notices', href: '/frontend_owner/notices', icon: Megaphone },
  { key: 'documents', label: 'Documents', href: '/frontend_owner/documents', icon: FileText },
  { key: 'reports_analytics', label: 'Reports & Analytics', href: '/frontend_owner/reports', icon: TrendingUp },
  { key: 'notifications', label: 'Notifications', href: '/frontend_owner/notifications', icon: Bell },
  { key: 'pg_settings', label: 'PG Settings', href: '/frontend_owner/pg_settings', icon: Settings },
  { key: 'activity_audit', label: 'Activity / Audit', href: '/frontend_owner/activity_audit', icon: HistoryIcon },
  { key: 'my_profile', label: 'My Profile', href: '/frontend_owner/my_profile', icon: User },
];

function NavItemComponent({ item, pathname, isMobileMenuOpen, setIsMobileMenuOpen }: any) {
  const [isOpen, setIsOpen] = useState(false);
  
  const hasActiveChild = item.subItems?.some((sub: any) => pathname === sub.href || pathname.startsWith(sub.href + '/'));
  const isActive = pathname === item.href || pathname.startsWith(item.href + '/') || hasActiveChild;

  // Auto-expand if a child is active
  React.useEffect(() => {
    if (hasActiveChild) {
      setIsOpen(true);
    }
  }, [hasActiveChild]);

  if (item.subItems) {
    return (
      <div className="mb-1">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold motion-safe:transition-all ${
            isActive || isOpen
              ? 'text-white'
              : 'text-secondary hover:bg-page hover:text-primary'
          }`}
          style={isActive || isOpen ? { background: '#2D7D9A' } : {}}
        >
          <div className="flex items-center gap-3">
            <item.icon className={`w-4 h-4 ${isActive || isOpen ? 'text-white' : 'text-secondary'}`} />
            {item.label}
          </div>
          {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>
        
        {isOpen && (
          <div className="mt-1 pl-4 space-y-1">
            {item.subItems.map((sub: any) => {
              const isSubActive = pathname === sub.href || pathname.startsWith(sub.href + '/');
              return (
                <Link
                  key={sub.href}
                  href={sub.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg text-xs font-semibold motion-safe:transition-all ${
                    isSubActive
                      ? 'text-[#F5A623] bg-white/5'
                      : 'text-secondary hover:text-primary'
                  }`}
                >
                  <div className={`w-1.5 h-1.5 rounded-full ${isSubActive ? 'bg-[#F5A623]' : 'bg-secondary'}`} />
                  {sub.label}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="mb-1">
      <Link href={item.href} onClick={() => setIsMobileMenuOpen(false)}
        className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold motion-safe:transition-all ${
          isActive
            ? 'text-white shadow-md'
            : 'text-secondary hover:bg-page hover:text-primary'
        }`}
        style={isActive ? { background: '#2D7D9A' } : {}}
      >
        <item.icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-secondary'}`} />
        {item.label}
      </Link>
    </div>
  );
}

export function OwnerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const user = typeof window !== 'undefined' ? getSession() : null;
  const { properties, selectedPropertyId, setSelectedPropertyId } = useOwnerPropertyContext();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isPropertyMenuOpen, setIsPropertyMenuOpen] = useState(false);
  const { lang, setLang, t } = useOwnerI18n();
  const [forcePasswordChange, setForcePasswordChange] = useState(user?.mustChangePassword || false);

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    clearSession();
    router.push('/');
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row" style={{ background: 'var(--bg-page)' }}>
      <OwnerForcePasswordChangeModal 
        user={user} 
        onSuccess={() => setForcePasswordChange(false)} 
      />
      
      {/* Mobile Header */}
      <div
        className="md:hidden flex items-center justify-between p-3 shrink-0 sticky top-0 z-50 shadow-md"
        style={{ background: 'linear-gradient(135deg, #1A3A5C 0%, #2D7D9A 100%)' }}
      >
        <div className="flex items-center gap-2">
          <button onClick={() => setIsMobileMenuOpen(true)} className="text-white p-1">
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-1 font-bold text-white">
            <Building className="text-[#F5A623] w-5 h-5 hidden sm:block" />
            <span className="hidden sm:block">Smart<span style={{ color: '#F5A623' }}>PG</span></span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <div className="text-xs font-medium text-white/80 max-w-[80px] truncate">
            {user?.name || 'Owner'}
          </div>
        </div>
      </div>

      {/* Mobile Backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 overflow-y-auto shrink-0
        transform transition-transform motion-safe:duration-300 motion-safe:ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:translate-x-0 md:sticky md:top-0 md:h-screen
        scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent
      `} style={{ background: 'var(--bg-sidebar)', borderRight: '1px solid var(--border)' }}>
        {/* Sidebar Header */}
        <div
          className="flex items-center justify-between px-5 py-4 shrink-0 sticky top-0 z-10"
          style={{ background: 'linear-gradient(135deg, #1A3A5C 0%, #2D7D9A 100%)' }}
        >
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-white/15 rounded-lg flex items-center justify-center border border-white/20">
              <Building className="text-[#F5A623] w-4 h-4" />
            </div>
            <span className="font-bold text-white text-base">Smart<span style={{ color: '#F5A623' }}>PG</span> <span className="font-normal text-white/60 text-xs">Admin</span></span>
          </div>
          <button className="md:hidden text-white/70 hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <nav className="px-3 py-4">
          {NAV_ITEMS.map((item) => (
            <NavItemComponent 
              key={item.key} 
              item={item} 
              pathname={pathname}
              isMobileMenuOpen={isMobileMenuOpen}
              setIsMobileMenuOpen={setIsMobileMenuOpen}
            />
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Desktop Header */}
        <header
          className="hidden md:flex h-16 items-center px-6 justify-between shrink-0 sticky top-0 z-20 shadow-md"
          style={{ background: 'linear-gradient(135deg, #1A3A5C 0%, #2D7D9A 100%)' }}
        >
          {/* Left Side: Property Selector & Search */}
          <div className="flex items-center gap-4 flex-1">
            {/* Property Selector */}
            <div className="relative">
              <button 
                onClick={() => setIsPropertyMenuOpen(!isPropertyMenuOpen)}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl px-3 py-2 transition-colors"
              >
                <Building2 className="w-4 h-4 text-[#F5A623]" />
                <span className="text-sm font-semibold text-white truncate max-w-[150px]">
                  {selectedPropertyId === 'all' ? 'My Properties' : properties.find(p => p.id === selectedPropertyId)?.name || 'My Properties'}
                </span>
                <ChevronDown className="w-4 h-4 text-white/70" />
              </button>
              
              {isPropertyMenuOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setIsPropertyMenuOpen(false)} />
                  <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 z-20 py-2 overflow-hidden">
                    <div className="px-3 pb-2 mb-2 border-b border-gray-100">
                      <p className="text-xs font-bold text-gray-400 uppercase">Select Property</p>
                    </div>
                    <button
                      onClick={() => { setSelectedPropertyId('all'); setIsPropertyMenuOpen(false); }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-between"
                    >
                      My Properties (All)
                      {selectedPropertyId === 'all' && <Check className="w-4 h-4 text-blue-600" />}
                    </button>
                    {properties.map(p => (
                      <button
                        key={p.id}
                        onClick={() => { setSelectedPropertyId(p.id); setIsPropertyMenuOpen(false); }}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center justify-between"
                      >
                        {p.name}
                        {selectedPropertyId === p.id && <Check className="w-4 h-4 text-blue-600" />}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Global Search */}
            <div className="relative max-w-md w-full ml-4">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-white/50" />
              </div>
              <input
                type="text"
                placeholder="Global Search..."
                className="block w-full pl-10 pr-3 py-2 border border-white/20 rounded-xl leading-5 bg-white/10 text-white placeholder-white/50 focus:outline-none focus:bg-white/20 focus:ring-0 sm:text-sm transition-colors"
              />
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            <button className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-[#1A3A5C]"></span>
            </button>
            <button className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors">
              <MessageSquare className="w-5 h-5" />
            </button>
            
            <button className="flex items-center gap-1.5 bg-[#F5A623] hover:bg-[#E09612] text-white px-3 py-1.5 rounded-lg text-sm font-bold transition-colors ml-2 shadow-sm">
              <Plus className="w-4 h-4" />
              <span>Quick Add</span>
            </button>

            <div className="h-6 w-px bg-white/20 mx-1"></div>
            
            <ThemeToggle />

            {/* Profile Dropdown */}
            <div className="relative ml-2">
              <button 
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl pl-2 pr-3 py-1.5 transition-colors"
              >
                <div className="w-6 h-6 rounded-full bg-[#F5A623] flex items-center justify-center text-white text-xs font-bold">
                  {user?.name?.[0] || 'O'}
                </div>
                <span className="text-sm font-semibold text-white max-w-[100px] truncate">{user?.name || 'Owner'}</span>
                <ChevronDown className="w-4 h-4 text-white/70" />
              </button>

              {isProfileMenuOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setIsProfileMenuOpen(false)} />
                  <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 z-20 py-2 overflow-hidden">
                    <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#F5A623] flex items-center justify-center text-white text-lg font-bold">
                        {user?.name?.[0] || 'O'}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-800">{user?.name || 'Owner'}</p>
                        <p className="text-xs text-gray-500">{user?.email || 'owner@example.com'}</p>
                      </div>
                    </div>
                    
                    <div className="py-2">
                      <Link href="/frontend_owner/my_profile" onClick={() => setIsProfileMenuOpen(false)} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        <User className="w-4 h-4 mr-3 text-gray-400" /> My Profile
                      </Link>
                      <Link href="/frontend_owner/my_profile?tab=personal" onClick={() => setIsProfileMenuOpen(false)} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        <FileText className="w-4 h-4 mr-3 text-gray-400" /> Personal Information
                      </Link>
                      <Link href="/frontend_owner/my_profile?tab=security" onClick={() => setIsProfileMenuOpen(false)} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        <ShieldCheck className="w-4 h-4 mr-3 text-gray-400" /> Security (2FA/Password)
                      </Link>
                      <Link href="/frontend_owner/my_profile?tab=sessions" onClick={() => setIsProfileMenuOpen(false)} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        <HistoryIcon className="w-4 h-4 mr-3 text-gray-400" /> Active Sessions
                      </Link>
                    </div>
                    
                    <div className="border-t border-gray-100 py-2">
                      <button onClick={handleLogout} className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium">
                        <LogOut className="w-4 h-4 mr-3" /> Logout
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>
        
        <div className="flex-1 p-4 md:p-6 overflow-x-hidden overflow-y-auto" style={{ color: 'var(--text-primary)' }}>
          {children}
        </div>
      </main>
    </div>
  );
}
