// RESPONSIBILITY: Renders the StudentLayout component.
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Home, IndianRupee, Utensils, MessageSquareWarning, FileText, Bell, LogOut, User, Menu, X, ShieldAlert, Bed, Users, CalendarOff, CheckSquare, MessageCircle, HistoryIcon, Settings, Star, ChevronDown, ChevronRight, ShieldCheck } from 'lucide-react';

import { getSession, clearSession } from '@/app/frontend_student/student_lib/student_auth/StudentSession';
import { StudentProvider, useStudentContext } from '@/app/frontend_student/student_components/StudentContext';
import { useStudentI18n } from '@/app/frontend_student/StudentI18n';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { LogoutModal } from '@/components/ui/LogoutModal';
import '../student-theme.css';

import type { DictKey } from '@/app/frontend_student/StudentI18n';
import { STUDENT_MENU_ITEMS } from '@/app/frontend_student/student_components/StudentLayout_constants';

const NAV_ITEMS = [
  { key: 'dashboard', href: '/frontend_student/student_dashboard', icon: Home },
  { key: 'profile', href: '/frontend_student/student_profile', icon: User },
  { key: 'room', href: '/frontend_student/student_room', icon: Bed },
  { key: 'payRent', href: '/frontend_student/student_rent', icon: IndianRupee },
  { key: 'documents', href: '/frontend_student/student_documents', icon: FileText },
  { key: 'complaints', href: '/frontend_student/student_complaints', icon: MessageSquareWarning },
  { key: 'mess', href: '/frontend_student/student_mess', icon: Utensils },
  { key: 'visitors', href: '/frontend_student/student_visitors', icon: Users },
  { key: 'leaves', href: '/frontend_student/student_leaves', icon: CalendarOff },
  { key: 'attendance', href: '/frontend_student/student_attendance', icon: CheckSquare },
  { key: 'communication', href: '/frontend_student/student_communication', icon: MessageCircle },
  { key: 'history', href: '/frontend_student/student_history', icon: HistoryIcon },
  { key: 'settings', href: '/frontend_student/student_settings', icon: Settings },
];

function StudentLayoutInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const user = typeof window !== 'undefined' ? getSession() : null;
  const { profile, loading } = useStudentContext();
  const { lang, setLang, t } = useStudentI18n();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

  useEffect(() => {
    const session = getSession();
    if (!session || session.role !== 'student') {
      router.replace('/student/login');
    }
  }, [router]);

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsProfileMenuOpen(false);
    setIsLogoutModalOpen(true);
  };

  const handleConfirmLogout = () => {
    setIsLogoutModalOpen(false);
    clearSession();
    router.push('/');
  };

  if (loading) return null;

  return (
    <div className="student-theme min-h-screen bg-page flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between bg-header/90 backdrop-blur-md p-3 border-b border-border shrink-0 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <button onClick={() => setIsMobileMenuOpen(true)} className="text-primary p-1.5 hover:bg-black/5 dark:hover:bg-white/10 rounded-lg transition-colors focus:outline-none active:bg-black/10 dark:active:bg-white/20">
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-1.5 font-bold text-primary">
            <ShieldAlert className="text-blue-600 dark:text-blue-400 w-5 h-5" />
            <span className="text-lg">Student App</span>
          </div>
        </div>
        <div className="flex items-center gap-3 relative">
          <ThemeToggle />
          
          <button 
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 dark:bg-blue-500 text-white font-bold text-sm shadow-md focus:outline-none ring-2 ring-transparent focus:ring-blue-600/50 active:scale-95 transition-transform"
          >
            {user?.name?.[0]?.toUpperCase() || 'S'}
          </button>

          {/* Mobile Profile Dropdown */}
          {isProfileMenuOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setIsProfileMenuOpen(false)}></div>
              <div className="absolute right-0 top-full mt-3 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden py-1 animate-in slide-in-from-top-2 fade-in duration-200">
                <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-600 dark:bg-blue-500 flex items-center justify-center text-white text-lg font-bold">
                    {user?.name?.[0]?.toUpperCase() || 'S'}
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{user?.name || 'Student'}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.email || 'student@example.com'}</p>
                  </div>
                </div>
                
                <div className="py-2">
                  <Link href="/frontend_student/student_profile" onClick={() => setIsProfileMenuOpen(false)} className="flex items-center px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900/30 font-semibold transition-colors">
                    <User className="w-4 h-4 mr-3 text-gray-400 dark:text-gray-500" /> My Profile
                  </Link>
                  <Link href="/frontend_student/student_settings" onClick={() => setIsProfileMenuOpen(false)} className="flex items-center px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-900/30 font-semibold transition-colors">
                    <Settings className="w-4 h-4 mr-3 text-gray-400 dark:text-gray-500" /> Settings
                  </Link>
                </div>
                
                <div className="border-t border-gray-200 dark:border-gray-700 py-1.5 bg-gray-50 dark:bg-gray-900/30">
                  <button onClick={handleLogout} className="flex items-center w-full px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/50 hover:text-red-700 dark:hover:text-red-300 font-bold transition-colors">
                    <LogOut className="w-4 h-4 mr-3" /> Logout
                  </button>
                </div>
              </div>
            </>
          )}
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
      <aside className={`w-64 bg-card border-r border-border flex-col sticky top-0 h-screen shrink-0 z-50 ${isMobileMenuOpen ? 'flex absolute left-0 shadow-2xl' : 'hidden md:flex'}`}>
        <div className="p-6 border-b border-border flex justify-between items-center bg-card">
          <div className="flex items-center gap-2 font-black text-xl text-primary">
            <ShieldAlert className="text-primary w-7 h-7" />
            <span>Student App</span>
          </div>
          <button onClick={() => setIsMobileMenuOpen(false)} className="md:hidden text-primary">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          <div className="mb-4 px-3">
            <p className="text-xs font-bold text-secondary uppercase tracking-wider mb-2">Menu</p>
          </div>
          
          {STUDENT_MENU_ITEMS.map((item: any) => {
            if (item.key === 'mess' && !(profile as any)?.hasMessFacility) return null;
            const label = item.label || t(item.key as DictKey);
            const isActive = pathname.startsWith(item.href);
            const hasSub = !!item.subItems;
            const isExpanded = expandedMenu === item.key;

            return (
              <div key={item.key} className="flex flex-col">
                <div
                  onClick={() => {
                    if (hasSub) {
                      setExpandedMenu(isExpanded ? null : item.key);
                    } else {
                      if(typeof window !== 'undefined') window.location.href = item.href;
                    }
                  }}
                  className={`flex items-center justify-between gap-3 px-3 py-2.5 rounded-md font-bold motion-safe:transition-all cursor-pointer ${
                    isActive 
                      ? 'bg-primary text-white shadow-lg shadow-primary-subtle' 
                      : 'text-secondary hover:bg-input hover:text-primary'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5" />
                    {label}
                  </div>
                  {hasSub && (
                    isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />
                  )}
                </div>
                {hasSub && isExpanded && (
                  <div className="pl-9 pr-3 py-1 flex flex-col gap-1 border-l-2 border-primary/20 ml-5 mt-1 mb-1">
                    {item.subItems.map((sub: any) => (
                      <Link
                        key={sub.label}
                        href={sub.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-secondary hover:text-primary text-xs font-semibold py-1.5 transition-colors"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
          
          <div className="pt-4 mt-4 border-t border-border space-y-2">
            <Link href="/frontend_student/student_notices" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-md text-secondary hover:bg-input hover:text-primary text-sm font-medium">
              <Bell className="w-5 h-5"/> Notices
            </Link>
            <Link href="/frontend_student/student_feedback" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-md text-secondary hover:bg-input hover:text-primary text-sm font-medium">
              <Star className="w-5 h-5"/> Feedback
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="hidden md:flex h-16 bg-header border-b border-border items-center px-6 justify-between shrink-0 sticky top-0 z-20 backdrop-blur-md bg-opacity-80">
          <h2 className="text-lg font-semibold text-primary capitalize">
            {pathname.split('/')[2]?.replace('-', ' ') || 'Dashboard'}
          </h2>
          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <div className="flex items-center bg-input border border-border rounded-md overflow-hidden text-xs font-bold">
              <button 
                onClick={() => setLang('en')}
                className={`px-3 py-1.5 motion-safe:transition-colors ${lang === 'en' ? 'bg-primary text-white' : 'text-secondary hover:text-primary'}`}
              >
                EN
              </button>
              <button 
                onClick={() => setLang('hi')}
                className={`px-3 py-1.5 motion-safe:transition-colors ${lang === 'hi' ? 'bg-primary text-white' : 'text-secondary hover:text-primary'}`}
              >
                हिं
              </button>
            </div>

            <div className="text-sm text-secondary">
              Student: <strong className="text-primary">{user?.name}</strong>
            </div>
            <button onClick={handleLogout} className="text-sm bg-page border border-border px-4 py-2 rounded-md text-danger font-medium hover:bg-danger-bg hover:text-danger motion-safe:transition-all">
              {t('logout')}
            </button>
          </div>
        </header>
        
        <div className="flex-1 p-4 pb-24 md:p-6 md:pb-6 text-primary overflow-x-hidden w-full">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-card/90 backdrop-blur-xl border-t border-border pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-40 motion-safe:transition-all motion-safe:duration-300">
        <div className="flex items-center justify-around p-2">
          {NAV_ITEMS.filter(item => !(item.key === 'mess' && !profile?.hasMessFacility)).slice(0, 5).map((item: any) => (
            <Link
              key={item.key}
              href={item.href}
              className={`flex flex-col items-center gap-1 p-2 min-w-[64px] motion-safe:transition-colors rounded-xl ${
                pathname.startsWith(item.href) ? 'text-primary bg-primary-subtle' : 'text-secondary hover:bg-input'
              }`}
            >
              <item.icon className={`w-6 h-6 ${pathname.startsWith(item.href) ? 'drop-shadow-sm' : ''}`} />
              <span className="text-[10px] font-bold">{t(item.key as DictKey)}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Global Floating Emergency SOS */}
      <Link href="/frontend_student/student_sos" className="fixed bottom-24 md:bottom-8 right-4 md:right-8 z-50 w-14 h-14 bg-danger text-white rounded-full flex items-center justify-center shadow-lg shadow-danger/30 border-2 border-white hover:bg-danger-hover motion-safe:transition-transform hover:scale-105 active:scale-95 group">
        <ShieldAlert className="w-6 h-6 group-hover:animate-pulse" />
      </Link>

      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleConfirmLogout}
      />
    </div>
  );
}

export function StudentLayout({ children }: { children: React.ReactNode }) {
  return (
    <StudentProvider>
      <StudentLayoutInner>{children}</StudentLayoutInner>
    </StudentProvider>
  );
}


