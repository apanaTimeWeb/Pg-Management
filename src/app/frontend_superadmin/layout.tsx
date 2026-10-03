'use client';
import { SuperAdminRequireSuperAdmin } from '@/app/frontend_superadmin/SuperAdmin_components/SuperAdminRequireSuperAdmin';
import Link from 'next/link';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { LayoutDashboard, FileText, UserPlus, Users, Package, BarChart3, ToggleLeft, Ticket, History, Settings, Menu, X, ShieldAlert, LogOut, ChevronDown, User, Search, Bell, AlertCircle, LifeBuoy, Database, Server, ShieldCheck, MessageSquare, CreditCard, Shield, Building2, PlusSquare } from 'lucide-react';
import { getSession, clearSession } from '@/app/frontend_superadmin/superadmin_lib/superadmin_auth/SuperadminSession';
import { SuperadminI18nProvider, useSuperadminI18n } from '@/app/frontend_superadmin/SuperadminI18n';
import type { DictKey } from '@/app/frontend_superadmin/SuperadminI18n';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';

function SuperAdminLayoutInner({ children, adminName, isMobileMenuOpen, setIsMobileMenuOpen, handleLogout, pathname }: any) {
  const { lang, setLang, t } = useSuperadminI18n();
  const { theme, setTheme } = useTheme();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAlertsOpen, setIsAlertsOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({
    'users': true
  });

  const toggleExpanded = (key: string) => {
    setExpandedMenus(prev => ({ ...prev, [key]: !prev[key] }));
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  const isAuthPage = pathname?.includes('/login') || pathname?.includes('/first-login');
  if (isAuthPage) return <>{children}</>;

  const navigationGroups = [
    {
      label: 'OVERVIEW',
      items: [
        { key: 'dashboard', name: 'Executive Dashboard', href: '/frontend_superadmin/superadmin_dashboard', icon: LayoutDashboard },
        { key: 'analytics', name: 'Intelligence & Analytics', href: '/frontend_superadmin/superadmin_analytics', icon: BarChart3 },
      ]
    },
    {
      label: 'ORGANIZATION MANAGEMENT',
      items: [
        { 
          key: 'pgs', 
          name: 'Property Portfolio', 
          href: '/frontend_superadmin/superadmin_pgs', 
          icon: Building2,
          subItems: [
            { key: 'pgs_pending', name: 'Pending Onboarding', href: '/frontend_superadmin/superadmin_pgs?tab=pending' },
            { key: 'pgs_suspended', name: 'Suspended Accounts', href: '/frontend_superadmin/superadmin_pgs?tab=suspended' },
            { key: 'pgs_archived', name: 'Archived Entities', href: '/frontend_superadmin/superadmin_pgs?tab=archived' },
            { key: 'pgs_add', name: 'Onboard Property', href: '/frontend_superadmin/superadmin_pgs?tab=add' }
          ]
        },
        { 
          key: 'owners', 
          name: 'Access & Roles', 
          href: '/frontend_superadmin/superadmin_owners', 
          icon: Shield,
          subItems: [
            { key: 'owners_pending', name: 'Approval Queue', href: '/frontend_superadmin/superadmin_owners?tab=pending' },
            { key: 'owners_create', name: 'Provision Administrator', href: '/frontend_superadmin/superadmin_owners?tab=create' },
            { key: 'owners_permissions', name: 'Role-Based Access (RBAC)', href: '/frontend_superadmin/superadmin_owners?tab=permissions' }
          ]
        },
        { 
          key: 'users', 
          name: 'Identity Management', 
          href: '/frontend_superadmin/superadmin_users', 
          icon: Users,
          subItems: [
            { key: 'users_students', name: 'Tenants / Residents', href: '/frontend_superadmin/superadmin_users?tab=students' },
            { key: 'users_managers', name: 'Property Managers', href: '/frontend_superadmin/superadmin_users?tab=managers' },
            { key: 'users_cooks', name: 'Facility Staff', href: '/frontend_superadmin/superadmin_users?tab=cooks' },
            { key: 'users_pending', name: 'Pending Verification', href: '/frontend_superadmin/superadmin_users?tab=pending' },
            { key: 'users_suspended', name: 'Restricted Accounts', href: '/frontend_superadmin/superadmin_users?tab=suspended' },
          ]
        },
      ]
    },
    {
      label: 'COMMERCE & BILLING',
      items: [
        { 
          key: 'plans', 
          name: 'Subscription Plans', 
          href: '/frontend_superadmin/superadmin_plans', 
          icon: Package,
          subItems: [
            { key: 'plans_subscriptions', name: 'Active Subscriptions', href: '/frontend_superadmin/superadmin_plans?tab=subscriptions' },
            { key: 'plans_workflow', name: 'Automated Workflows', href: '/frontend_superadmin/superadmin_plans?tab=workflow' }
          ]
        },
        { 
          key: 'billing', 
          name: 'Financial Operations', 
          href: '/frontend_superadmin/superadmin_billing', 
          icon: CreditCard,
          subItems: [
            { key: 'billing_transactions', name: 'Transaction Ledger', href: '/frontend_superadmin/superadmin_billing?tab=transactions' },
            { key: 'billing_settlements', name: 'Settlement Reports', href: '/frontend_superadmin/superadmin_billing?tab=settlements' },
            { key: 'billing_gateways', name: 'Payment Gateways Config', href: '/frontend_superadmin/superadmin_billing?tab=gateways' }
          ]
        },
        { 
          key: 'masterData', 
          name: 'Master Data Config', 
          href: '/frontend_superadmin/superadmin_master_data', 
          icon: Database,
          subItems: [
            { key: 'master_roomTypes', name: 'Room Inventories', href: '/frontend_superadmin/superadmin_master_data?tab=roomTypes' },
            { key: 'master_bedTypes', name: 'Bed Configurations', href: '/frontend_superadmin/superadmin_master_data?tab=bedTypes' },
            { key: 'master_facilities', name: 'Facility Amenities', href: '/frontend_superadmin/superadmin_master_data?tab=facilities' }
          ]
        },
      ]
    },
    {
      label: 'SUPPORT & OPERATIONS',
      items: [
        { key: 'tickets', name: 'Helpdesk & Support', href: '/frontend_superadmin/superadmin_tickets', icon: Ticket },
        { key: 'communication', name: 'Communications Hub', href: '/frontend_superadmin/superadmin_communication', icon: MessageSquare },
        { key: 'marketing', name: 'Marketing & Leads', href: '/frontend_superadmin/superadmin_marketing', icon: BarChart3 },
        { key: 'affiliates', name: 'Affiliates Program', href: '/frontend_superadmin/superadmin_affiliates', icon: Users },
      ]
    },
    {
      label: 'DEVELOPER & API',
      items: [
        { key: 'integrations', name: 'API & Integrations', href: '/frontend_superadmin/superadmin_integrations', icon: Server },
      ]
    },
    {
      label: 'SYSTEM & COMPLIANCE',
      items: [
        { key: 'featureFlags', name: 'Feature Toggles', href: '/frontend_superadmin/superadmin_feature_flags', icon: ToggleLeft },
        { key: 'auditLogs', name: 'Audit & Compliance Logs', href: '/frontend_superadmin/superadmin_audit_logs', icon: ShieldCheck },
        { key: 'settings', name: 'Environment Settings', href: '/frontend_superadmin/superadmin_settings', icon: Settings },
        { key: 'systemManagement', name: 'Infrastructure Health', href: '/frontend_superadmin/superadmin_system_management', icon: Server },
        { key: 'dataManagement', name: 'Data Governance', href: '/frontend_superadmin/superadmin_data_management', icon: Database },
        { key: 'backups', name: 'Disaster Recovery', href: '/frontend_superadmin/superadmin_backups', icon: Database },
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row font-sans" style={{ background: 'var(--bg-page)' }}>
      
      {/* Mobile Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-page/80 backdrop-blur-md md:hidden transition-all"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* ── SIDEBAR ── */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64 overflow-y-auto shrink-0 flex flex-col
          transform transition-transform motion-safe:duration-300 motion-safe:ease-in-out shadow-2xl md:shadow-none
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          md:relative md:translate-x-0 md:sticky md:top-0 md:h-screen
          scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent
        `}
        style={{ background: 'var(--bg-sidebar)', borderRight: '1px solid var(--border)' }}
      >
        {/* Sidebar Header */}
        <div
          className="flex items-center justify-between px-5 py-4 shrink-0 sticky top-0 z-10"
          style={{ background: 'linear-gradient(135deg, #1A3A5C 0%, #2D7D9A 100%)' }}
        >
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-white/15 rounded-lg flex items-center justify-center border border-white/20">
              <ShieldAlert className="text-[#F5A623] w-4 h-4" />
            </div>
            <span className="font-bold text-white text-base">Smart<span style={{ color: '#F5A623' }}>PG</span> <span className="font-normal text-white/60 text-xs">Admin</span></span>
          </div>
          <button className="md:hidden text-white/70 hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sidebar Nav */}
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6 scrollbar-hide relative z-10">
          {navigationGroups.map((group, idx) => (
            <div key={idx} className="space-y-2">
              <h3 className="px-4 text-[10px] font-black tracking-widest text-secondary/70 uppercase mb-2">
                {group.label}
              </h3>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                  const hasSubItems = (item as any).subItems && (item as any).subItems.length > 0;
                  const isExpanded = expandedMenus[item.key] || false;
                  
                  if (hasSubItems) {
                    return (
                      <div key={item.key || item.href} className="mb-1">
                        <button
                          onClick={() => {
                            if (!isExpanded) {
                              toggleExpanded(item.key);
                              if ((item as any).subItems && (item as any).subItems.length > 0) {
                                router.push((item as any).subItems[0].href);
                              }
                            } else {
                              toggleExpanded(item.key);
                            }
                          }}
                          className={`w-full flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold motion-safe:transition-all ${
                            isActive || isExpanded
                              ? 'text-white'
                              : 'text-secondary hover:bg-page hover:text-primary'
                          }`}
                          style={isActive || isExpanded ? { background: '#2D7D9A' } : {}}
                        >
                          <div className="flex items-center gap-3">
                            <item.icon className={`w-4 h-4 ${isActive || isExpanded ? 'text-white' : 'text-secondary'}`} />
                            {item.key ? (t(item.key as DictKey) || item.name) : item.name}
                          </div>
                          {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronDown className="w-4 h-4 -rotate-90" />}
                        </button>
                        
                        {isExpanded && (
                          <div className="mt-1 pl-4 space-y-1">
                            {(item as any).subItems.map((subItem: any) => {
                              const currentUrl = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '');
                              const isSubActive = currentUrl === subItem.href || currentUrl.startsWith(subItem.href + '&');
                              return (
                                <Link
                                  key={subItem.key || subItem.href}
                                  href={subItem.href}
                                  onClick={() => setIsMobileMenuOpen(false)}
                                  className={`flex items-center gap-3 px-4 py-2 rounded-lg text-xs font-semibold motion-safe:transition-all ${
                                    isSubActive
                                      ? 'text-[#F5A623] bg-white/5'
                                      : 'text-secondary hover:text-primary'
                                  }`}
                                >
                                  <div className={`w-1.5 h-1.5 rounded-full ${isSubActive ? 'bg-[#F5A623]' : 'bg-secondary'}`} />
                                  {t(subItem.key as DictKey) || subItem.name}
                                </Link>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  }

                  return (
                    <div key={item.key || item.href} className="mb-1">
                      <Link href={item.href} onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold motion-safe:transition-all ${
                          isActive
                            ? 'text-white shadow-md'
                            : 'text-secondary hover:bg-page hover:text-primary'
                        }`}
                        style={isActive ? { background: '#2D7D9A' } : {}}
                      >
                        <item.icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-secondary'}`} />
                        {item.key ? (t(item.key as DictKey) || item.name) : item.name}
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

      </aside>

      {/* ── MAIN AREA ── */}
      <div className="flex-1 flex flex-col min-w-0 bg-transparent min-h-screen">
        
        {/* Mobile Header (For screens smaller than md) */}
        <div
          className="md:hidden flex items-center justify-between p-3 shrink-0 sticky top-0 z-50 shadow-md"
          style={{ background: 'linear-gradient(135deg, #1A3A5C 0%, #2D7D9A 100%)' }}
        >
          <div className="flex items-center gap-2">
            <button onClick={() => setIsMobileMenuOpen(true)} className="text-white p-1">
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-1 font-bold text-white">
              <ShieldAlert className="text-[#F5A623] w-5 h-5 hidden sm:block" />
              <span className="hidden sm:block">Smart<span style={{ color: '#F5A623' }}>PG</span></span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="w-8 h-8 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors focus:outline-none"
                title="Toggle Theme"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            )}
            <div className="text-xs font-medium text-white/80 max-w-[80px] truncate">
              {adminName || 'Admin'}
            </div>
          </div>
        </div>

        {/* Desktop Header */}
        <header className="hidden md:flex sticky top-0 z-30 bg-bg-page/80 backdrop-blur-xl h-[80px] items-center justify-between px-4 sm:px-6 md:px-8 border-b border-border/50 gap-4" style={{ background: 'var(--bg-card)' }}>
          <div className="flex items-center gap-4 flex-1">
            <div className="hidden sm:flex items-center gap-2 text-sm shrink-0">
              <span className="font-semibold text-[var(--text-disabled)] uppercase tracking-wider text-[11px]">SuperAdmin</span>
              <span className="text-[var(--text-disabled)]">/</span>
              <span className="font-bold text-primary">
                 {pathname.includes('/superadmin_dashboard') ? 'Dashboard' : 
                  pathname.includes('/superadmin_pgs') ? 'PG Management' : 
                  pathname.includes('/superadmin_owners') ? 'Admin / Owners' : 
                  pathname.includes('/superadmin_users') ? 'User Management' : 
                  pathname.includes('/superadmin_plans') ? 'Subscriptions & Plans' : 
                  pathname.includes('/superadmin_billing') ? 'Billing & Payments' : 
                  pathname.includes('/superadmin_analytics') ? 'Reports & Analytics' : 
                  pathname.includes('/superadmin_tickets') ? 'Support & Helpdesk' : 
                  pathname.includes('/superadmin_communication') ? 'Communication' : 
                  pathname.includes('/superadmin_audit_logs') ? 'Audit & Security' : 
                  pathname.includes('/superadmin_feature_flags') ? 'Feature Flags' : 
                  pathname.includes('/superadmin_settings') ? 'Global Config' : 
                  pathname.includes('/superadmin_master_data') ? 'Master Data' : 
                  pathname.includes('/superadmin_system_management') ? 'System Management' : 
                  pathname.includes('/superadmin_data_management') ? 'Data Management' : 
                  pathname.includes('/superadmin_backups') ? 'Backups' : 
                  pathname.includes('/superadmin_owner_requests') ? 'Owner Requests' : 
                  pathname.includes('/superadmin_create_owner') ? 'Create Owner/PG' : 
                  pathname.split('/').pop()?.replace(/superadmin_/g, '').replace(/_/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
              </span>
            </div>

            {/* Global Search */}
            <div className="flex-1 max-w-xl hidden md:flex items-center ml-4">
              <div className="relative w-full group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-secondary group-focus-within:text-[var(--primary)] transition-colors" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search PG, Owner, Manager, Cook, Student, Subscription, Invoice, Ticket..."
                  className="block w-full pl-10 pr-3 py-2 border border-border rounded-full leading-5 bg-card text-primary placeholder-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] sm:text-sm transition-all shadow-sm"
                />
                {searchQuery && (
                  <div className="absolute top-full left-0 mt-2 w-full bg-card rounded-xl shadow-xl border border-border p-2 z-50">
                    <div className="p-3 text-sm text-secondary flex items-center justify-center gap-2">
                      <Search className="w-4 h-4 animate-spin-slow" /> Searching database for "{searchQuery}"...
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* System Alerts */}
            <div className="relative" title="System Alerts">
              <button onClick={() => { setIsAlertsOpen(!isAlertsOpen); setIsSupportOpen(false); setIsNotifOpen(false); setIsProfileOpen(false); }} className="hidden sm:flex w-9 h-9 items-center justify-center text-[var(--danger)] hover:bg-[var(--danger-bg)] rounded-full transition-colors relative" aria-label="System Alerts">
                <AlertCircle className="w-[18px] h-[18px]" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-[var(--danger)] rounded-full animate-ping"></span>
              </button>
              {isAlertsOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsAlertsOpen(false)}></div>
                  <div className="absolute right-0 mt-2 w-72 bg-card rounded-xl shadow-xl border border-[var(--danger)] z-50 overflow-hidden py-1">
                    <div className="px-4 py-3 border-b border-border bg-[var(--danger-bg)]">
                      <p className="text-sm font-bold text-[var(--danger)] flex items-center gap-2"><AlertCircle className="w-4 h-4" /> System Alerts</p>
                    </div>
                    <div className="p-3 text-sm text-secondary hover:bg-[var(--bg-overlay)] cursor-pointer">
                      <p className="font-bold text-primary">Database Backup Failed</p>
                      <p className="text-xs mt-1">Automatic backup failed at 3:00 AM.</p>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Support */}
            <div className="relative" title="Support Hub">
              <button onClick={() => { setIsSupportOpen(!isSupportOpen); setIsAlertsOpen(false); setIsNotifOpen(false); setIsProfileOpen(false); }} className="hidden sm:flex w-9 h-9 items-center justify-center text-secondary hover:text-[var(--primary)] hover:bg-[var(--primary-subtle)] rounded-full transition-colors" aria-label="Support">
                <LifeBuoy className="w-[18px] h-[18px]" />
              </button>
              {isSupportOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsSupportOpen(false)}></div>
                  <div className="absolute right-0 mt-2 w-64 bg-card rounded-xl shadow-xl border border-border z-50 overflow-hidden py-1">
                    <div className="px-4 py-3 border-b border-border bg-[var(--primary-subtle)]">
                      <p className="text-sm font-bold text-[var(--primary)] flex items-center gap-2"><LifeBuoy className="w-4 h-4" /> Support Hub</p>
                    </div>
                    <Link href="/frontend_superadmin/superadmin_tickets" onClick={() => setIsSupportOpen(false)} className="block p-3 text-sm text-secondary hover:bg-[var(--bg-overlay)]">
                      <p className="font-bold text-primary">Open Helpdesk</p>
                      <p className="text-xs mt-1">Manage active support tickets</p>
                    </Link>
                  </div>
                </>
              )}
            </div>

            {/* Notifications */}
            <div className="relative" title="Notifications">
              <button onClick={() => { setIsNotifOpen(!isNotifOpen); setIsSupportOpen(false); setIsAlertsOpen(false); setIsProfileOpen(false); }} className="w-9 h-9 flex items-center justify-center text-secondary hover:text-[var(--warning)] hover:bg-[var(--warning-bg)] rounded-full transition-colors relative" aria-label="Notifications">
                <Bell className="w-[18px] h-[18px]" />
                <span className="absolute top-2 right-2.5 w-2 h-2 bg-[var(--warning)] rounded-full"></span>
              </button>
              {isNotifOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsNotifOpen(false)}></div>
                  <div className="absolute right-0 mt-2 w-72 bg-card rounded-xl shadow-xl border border-border z-50 overflow-hidden py-1">
                    <div className="px-4 py-3 border-b border-border bg-[var(--warning-bg)]">
                      <p className="text-sm font-bold text-[var(--warning)] flex items-center gap-2"><Bell className="w-4 h-4" /> Notifications</p>
                    </div>
                    <div className="p-3 text-sm text-secondary hover:bg-[var(--bg-overlay)] cursor-pointer">
                      <p className="font-bold text-primary">New Owner Registered</p>
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
                className="w-9 h-9 flex items-center justify-center text-secondary hover:text-primary hover:bg-[var(--bg-overlay)] rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                aria-label="Toggle Theme"
                title="Toggle Theme"
              >
                {theme === 'dark' ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
              </button>
            )}

            {/* Language Switcher */}
            <div className="hidden sm:flex items-center bg-[var(--bg-overlay)] border border-border rounded-lg overflow-hidden text-xs font-semibold shadow-sm ml-1 mr-1" title="Switch Language">
              <button
                onClick={() => setLang('en')}
                className={`px-3 py-1.5 transition-colors focus:outline-none ${lang === 'en' ? 'bg-[var(--primary)] text-white' : 'text-secondary hover:bg-[var(--bg-input)]'}`}
              >EN</button>
              <button
                onClick={() => setLang('hi')}
                className={`px-3 py-1.5 transition-colors focus:outline-none ${lang === 'hi' ? 'bg-[var(--primary)] text-white' : 'text-secondary hover:bg-[var(--bg-input)]'}`}
              >हिं</button>
            </div>

            {/* Profile Dropdown */}
            <div className="relative" title="User Profile Menu">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 px-2 py-1.5 hover:bg-[var(--bg-overlay)] border border-transparent hover:border-border rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              >
                <div className="w-8 h-8 rounded-full bg-[var(--primary-subtle)] text-[var(--primary)] flex items-center justify-center font-bold text-xs border border-[var(--primary)]/20 shadow-sm">
                   {adminName.charAt(0).toUpperCase() || 'S'}
                </div>
                <ChevronDown className={`w-4 h-4 text-secondary transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
              </button>

              {isProfileOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)}></div>
                  <div className="absolute right-0 mt-2 w-56 bg-card rounded-xl shadow-xl border border-border z-50 overflow-hidden py-1 animate-in slide-in-from-top-2 fade-in duration-200">
                    <div className="px-4 py-3 border-b border-border bg-page/50">
                      <p className="text-sm font-bold text-primary truncate">{adminName || 'SuperAdmin'}</p>
                      <p className="text-xs text-secondary truncate">System Administrator</p>
                    </div>
                    <div className="p-1">
                      <Link href="/frontend_superadmin/superadmin_profile" onClick={() => setIsProfileOpen(false)} className="w-full text-left px-3 py-2 text-sm text-primary hover:bg-[var(--bg-overlay)] hover:text-[var(--primary)] font-medium rounded-lg flex items-center gap-2 transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--primary)]">
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
