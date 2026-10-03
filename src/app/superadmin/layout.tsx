'use client';
import { SuperAdminRequireSuperAdmin } from '@/app/superadmin/SuperAdmin_components/SuperAdminRequireSuperAdmin';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { LayoutDashboard, FileText, UserPlus, Users, Package, BarChart3, ToggleLeft, Ticket, History, Settings, Menu, X, ShieldAlert, LogOut, ChevronDown, User, Search, Bell, AlertCircle, LifeBuoy, Database, Server, ShieldCheck, MessageSquare } from 'lucide-react';
import { getSession, clearSession } from '@/app/superadmin/superadmin_lib/superadmin_auth/SuperadminSession';
import { SuperadminI18nProvider, useSuperadminI18n } from '@/app/superadmin/SuperadminI18n';
import type { DictKey } from '@/app/superadmin/SuperadminI18n';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';

function SuperAdminLayoutInner({ children, adminName, isMobileMenuOpen, setIsMobileMenuOpen, handleLogout, pathname }: any) {
  const { lang, setLang, t } = useSuperadminI18n();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAlertsOpen, setIsAlertsOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setMounted(true);
  }, []);

  const isAuthPage = pathname?.includes('/login') || pathname?.includes('/first-login');
  if (isAuthPage) return <>{children}</>;

  const navigationGroups = [
    {
      label: 'OVERVIEW',
      items: [
        { key: 'dashboard', name: 'Dashboard', href: '/superadmin/dashboard', icon: LayoutDashboard },
      ]
    },
    {
      label: 'MANAGEMENT',
      items: [
        { key: 'ownerRequests', name: 'Owner Requests', href: '/superadmin/owner-requests', icon: FileText },
        { key: 'createOwner', name: 'Create Owner', href: '/superadmin/create-owner', icon: UserPlus },
        { key: 'owners', name: 'Owners', href: '/superadmin/owners', icon: Users },
      ]
    },
    {
      label: 'SYSTEM',
      items: [
        { key: 'plans', name: 'Plans', href: '/superadmin/plans', icon: Package },
        { key: 'analytics', name: 'Reports & Analytics', href: '/superadmin/analytics', icon: BarChart3 },
        { key: 'tickets', name: 'Support & Helpdesk', href: '/superadmin/tickets', icon: Ticket },
        { key: 'communication', name: 'Communication', href: '/superadmin/communication', icon: MessageSquare },
        { key: 'auditLogs', name: 'Audit & Security', href: '/superadmin/audit-logs', icon: ShieldCheck },
        { key: 'featureFlags', name: 'Feature Flags', href: '/superadmin/feature-flags', icon: ToggleLeft },
        { key: 'settings', name: 'Settings', href: '/superadmin/settings', icon: Settings },
        { key: 'systemManagement', name: 'System Mgmt', href: '/superadmin/system-management', icon: Server },
        { key: 'dataManagement', name: 'Data Management', href: '/superadmin/data-management', icon: Database },
        { key: 'backups', name: 'Backups', href: '/superadmin/backups', icon: Database },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-primary)] font-sans flex">
      
      {/* Mobile Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-[var(--bg-page)]/80 backdrop-blur-sm md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* ── SIDEBAR ── */}
      <aside
        className={`
          fixed top-0 bottom-0 left-0 z-50 w-[260px] bg-[#172554] text-white flex flex-col
          transform transition-transform duration-300 ease-in-out border-r border-[#1E3A8A]/50
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
        `}
      >
        {/* Sidebar Header */}
        <div className="h-[72px] flex items-center px-6 shrink-0 border-b border-[#1E3A8A]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center border border-white/20">
              <ShieldAlert className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg text-white leading-none tracking-tight">SmartPG</span>
              <span className="text-[10px] text-white/70 font-semibold tracking-wider mt-0.5">SUPER ADMIN</span>
            </div>
          </div>
        </div>

        {/* Sidebar Nav */}
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-6 scrollbar-hide">
          {navigationGroups.map((group, idx) => (
            <div key={idx}>
              <h3 className="px-3 text-[11px] font-bold tracking-widest text-[#64748B] mb-2 uppercase">
                {group.label}
              </h3>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group focus:outline-none focus:ring-2 focus:ring-[#4F46E5] ${
                        isActive
                          ? 'bg-[#4F46E5] text-white shadow-sm'
                          : 'text-slate-300 hover:bg-[#1E3A8A] hover:text-white'
                      }`}
                    >
                      <item.icon className={`w-[18px] h-[18px] shrink-0 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white transition-colors'}`} />
                      <span className="truncate">{item.key ? (t(item.key as DictKey) || item.name) : item.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-[#1E3A8A] shrink-0">
          <div className="flex items-center justify-between bg-[#1E3A8A]/50 rounded-xl p-3 border border-[#1E3A8A]">
            <div className="flex items-center gap-3 overflow-hidden">
               <div className="w-9 h-9 rounded-full bg-[#4F46E5] text-white flex items-center justify-center font-bold shrink-0 text-sm">
                 {adminName.charAt(0).toUpperCase() || 'S'}
               </div>
               <div className="flex flex-col truncate">
                 <span className="text-sm font-bold text-white truncate">{adminName || 'SuperAdmin'}</span>
                 <span className="text-[10px] text-slate-300 font-medium">System Admin</span>
               </div>
            </div>
            <button onClick={handleLogout} className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#4F46E5]" aria-label="Logout">
              <LogOut className="w-[18px] h-[18px]" />
            </button>
          </div>
        </div>
      </aside>

      {/* ── MAIN AREA ── */}
      <div className="flex-1 flex flex-col min-w-0 md:ml-[260px] bg-[var(--bg-page)]">
        
        {/* Header */}
        {/* Header */}
        <header className="sticky top-0 z-30 bg-[var(--bg-page)]/80 backdrop-blur-md h-[72px] flex items-center justify-between px-4 sm:px-6 md:px-8 border-b border-[var(--border)] gap-4">
          <div className="flex items-center gap-4 flex-1">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 -ml-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-overlay)] rounded-lg md:hidden focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              aria-label="Toggle Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="hidden sm:flex items-center gap-2 text-sm shrink-0">
              <span className="font-semibold text-[var(--text-disabled)] uppercase tracking-wider text-[11px]">SuperAdmin</span>
              <span className="text-[var(--text-disabled)]">/</span>
              <span className="font-bold text-[var(--text-primary)]">
                 {pathname === '/superadmin/dashboard' ? 'Dashboard' : 
                  pathname.includes('/owners') ? 'Owners' : 
                  pathname.includes('/tickets') ? 'Support Tickets' :
                  pathname.includes('/settings') ? 'Settings' :
                  pathname.split('/').pop()?.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
              </span>
            </div>

            {/* Global Search */}
            <div className="flex-1 max-w-xl hidden md:flex items-center ml-4">
              <div className="relative w-full group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-[var(--text-secondary)] group-focus-within:text-[var(--primary)] transition-colors" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search PG, Owner, Manager, Cook, Student, Subscription, Invoice, Ticket..."
                  className="block w-full pl-10 pr-3 py-2 border border-[var(--border)] rounded-full leading-5 bg-[var(--bg-card)] text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] sm:text-sm transition-all shadow-sm"
                />
                {searchQuery && (
                  <div className="absolute top-full left-0 mt-2 w-full bg-[var(--bg-card)] rounded-xl shadow-xl border border-[var(--border)] p-2 z-50">
                    <div className="p-3 text-sm text-[var(--text-secondary)] flex items-center justify-center gap-2">
                      <Search className="w-4 h-4 animate-spin-slow" /> Searching database for "{searchQuery}"...
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* System Alerts */}
            <div className="relative">
              <button onClick={() => { setIsAlertsOpen(!isAlertsOpen); setIsSupportOpen(false); setIsNotifOpen(false); setIsProfileOpen(false); }} className="hidden sm:flex w-9 h-9 items-center justify-center text-[var(--danger)] hover:bg-[var(--danger-bg)] rounded-full transition-colors relative" aria-label="System Alerts">
                <AlertCircle className="w-[18px] h-[18px]" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-[var(--danger)] rounded-full animate-ping"></span>
              </button>
              {isAlertsOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsAlertsOpen(false)}></div>
                  <div className="absolute right-0 mt-2 w-72 bg-[var(--bg-card)] rounded-xl shadow-xl border border-[var(--danger)] z-50 overflow-hidden py-1">
                    <div className="px-4 py-3 border-b border-[var(--border)] bg-[var(--danger-bg)]">
                      <p className="text-sm font-bold text-[var(--danger)] flex items-center gap-2"><AlertCircle className="w-4 h-4" /> System Alerts</p>
                    </div>
                    <div className="p-3 text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-overlay)] cursor-pointer">
                      <p className="font-bold text-[var(--text-primary)]">Database Backup Failed</p>
                      <p className="text-xs mt-1">Automatic backup failed at 3:00 AM.</p>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Support */}
            <div className="relative">
              <button onClick={() => { setIsSupportOpen(!isSupportOpen); setIsAlertsOpen(false); setIsNotifOpen(false); setIsProfileOpen(false); }} className="hidden sm:flex w-9 h-9 items-center justify-center text-[var(--text-secondary)] hover:text-[var(--primary)] hover:bg-[var(--primary-subtle)] rounded-full transition-colors" aria-label="Support">
                <LifeBuoy className="w-[18px] h-[18px]" />
              </button>
              {isSupportOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsSupportOpen(false)}></div>
                  <div className="absolute right-0 mt-2 w-64 bg-[var(--bg-card)] rounded-xl shadow-xl border border-[var(--border)] z-50 overflow-hidden py-1">
                    <div className="px-4 py-3 border-b border-[var(--border)] bg-[var(--primary-subtle)]">
                      <p className="text-sm font-bold text-[var(--primary)] flex items-center gap-2"><LifeBuoy className="w-4 h-4" /> Support Hub</p>
                    </div>
                    <Link href="/superadmin/tickets" onClick={() => setIsSupportOpen(false)} className="block p-3 text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-overlay)]">
                      <p className="font-bold text-[var(--text-primary)]">Open Helpdesk</p>
                      <p className="text-xs mt-1">Manage active support tickets</p>
                    </Link>
                  </div>
                </>
              )}
            </div>

            {/* Notifications */}
            <div className="relative">
              <button onClick={() => { setIsNotifOpen(!isNotifOpen); setIsSupportOpen(false); setIsAlertsOpen(false); setIsProfileOpen(false); }} className="w-9 h-9 flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--warning)] hover:bg-[var(--warning-bg)] rounded-full transition-colors relative" aria-label="Notifications">
                <Bell className="w-[18px] h-[18px]" />
                <span className="absolute top-2 right-2.5 w-2 h-2 bg-[var(--warning)] rounded-full"></span>
              </button>
              {isNotifOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsNotifOpen(false)}></div>
                  <div className="absolute right-0 mt-2 w-72 bg-[var(--bg-card)] rounded-xl shadow-xl border border-[var(--border)] z-50 overflow-hidden py-1">
                    <div className="px-4 py-3 border-b border-[var(--border)] bg-[var(--warning-bg)]">
                      <p className="text-sm font-bold text-[var(--warning)] flex items-center gap-2"><Bell className="w-4 h-4" /> Notifications</p>
                    </div>
                    <div className="p-3 text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-overlay)] cursor-pointer">
                      <p className="font-bold text-[var(--text-primary)]">New Owner Registered</p>
                      <p className="text-xs mt-1">Rahul Sharma has requested owner approval.</p>
                    </div>
                  </div>
                </>
              )}
            </div>

             {/* Theme Toggle */}
             {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="w-9 h-9 flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-overlay)] rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                aria-label="Toggle Theme"
              >
                {theme === 'dark' ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
              </button>
            )}

            {/* Language Switcher */}
            <div className="hidden sm:flex items-center bg-[var(--bg-overlay)] border border-[var(--border)] rounded-lg overflow-hidden text-xs font-semibold shadow-sm ml-1 mr-1">
              <button
                onClick={() => setLang('en')}
                className={`px-3 py-1.5 transition-colors focus:outline-none ${lang === 'en' ? 'bg-[var(--primary)] text-white' : 'text-[var(--text-secondary)] hover:bg-[var(--bg-input)]'}`}
              >EN</button>
              <button
                onClick={() => setLang('hi')}
                className={`px-3 py-1.5 transition-colors focus:outline-none ${lang === 'hi' ? 'bg-[var(--primary)] text-white' : 'text-[var(--text-secondary)] hover:bg-[var(--bg-input)]'}`}
              >हिं</button>
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 px-2 py-1.5 hover:bg-[var(--bg-overlay)] border border-transparent hover:border-[var(--border)] rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              >
                <div className="w-8 h-8 rounded-full bg-[var(--primary-subtle)] text-[var(--primary)] flex items-center justify-center font-bold text-xs border border-[var(--primary)]/20 shadow-sm">
                   {adminName.charAt(0).toUpperCase() || 'S'}
                </div>
                <ChevronDown className={`w-4 h-4 text-[var(--text-secondary)] transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
              </button>

              {isProfileOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)}></div>
                  <div className="absolute right-0 mt-2 w-56 bg-[var(--bg-card)] rounded-xl shadow-xl border border-[var(--border)] z-50 overflow-hidden py-1 animate-in slide-in-from-top-2 fade-in duration-200">
                    <div className="px-4 py-3 border-b border-[var(--border)] bg-[var(--bg-page)]/50">
                      <p className="text-sm font-bold text-[var(--text-primary)] truncate">{adminName || 'SuperAdmin'}</p>
                      <p className="text-xs text-[var(--text-secondary)] truncate">System Administrator</p>
                    </div>
                    <div className="p-1">
                      <Link href="/superadmin/profile" onClick={() => setIsProfileOpen(false)} className="w-full text-left px-3 py-2 text-sm text-[var(--text-primary)] hover:bg-[var(--bg-overlay)] hover:text-[var(--primary)] font-medium rounded-lg flex items-center gap-2 transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--primary)]">
                        <User className="w-4 h-4" />
                        My Profile
                      </Link>
                      <button onClick={handleLogout} className="w-full text-left px-3 py-2 mt-1 text-sm text-[var(--danger)] hover:bg-[var(--danger-bg)] hover:text-[var(--danger)] font-medium rounded-lg flex items-center gap-2 transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--danger)]">
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-5 md:p-6 lg:p-8 pt-6 sm:pt-8">
          <div className="max-w-[1600px] mx-auto w-full">
            {children}
          </div>
        </main>
      </div>

    </div>
  );
}

export default function SuperAdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [adminName, setAdminName] = useState('');

  useEffect(() => {
    const session = getSession();
    if(session) setAdminName(session.name);
  }, []);

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      clearSession();
      window.location.href = '/';
    }
  };

  return (
    <SuperAdminRequireSuperAdmin>
      <SuperadminI18nProvider>
          <SuperAdminLayoutInner 
            adminName={adminName} 
            isMobileMenuOpen={isMobileMenuOpen} 
            setIsMobileMenuOpen={setIsMobileMenuOpen} 
            handleLogout={handleLogout} 
            pathname={pathname} 
          >
            {children}
          </SuperAdminLayoutInner>
      </SuperadminI18nProvider>
    </SuperAdminRequireSuperAdmin>
  );
}
