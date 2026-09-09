// RESPONSIBILITY: Renders the ManagerLayout component.
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Menu, X, ShieldAlert, Building2, LogOut
} from 'lucide-react';

import { MENU_ITEMS } from '@/app/manager/manager_components/ManagerLayout_constants';

import { clearSession } from '@/app/manager/manager_lib/manager_auth/ManagerSession';
import { useManagerSession } from '@/app/manager/manager_components/manager_hooks/useManagerSession';
import { useManagerPropertyContext } from '@/app/manager/manager_components/ManagerPropertyContext';
import { useManagerI18n } from '@/app/manager/ManagerI18n';
import { ManagerForcePasswordChangeModal } from '@/app/manager/manager_components/ManagerForcePasswordChangeModal';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

import type { DictKey } from '@/app/manager/ManagerI18n';
import '../manager-theme.css';

type MenuItem = { key: string; icon: React.ElementType; href: string; label?: string };
export function ManagerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const user = useManagerSession();
  const { properties, selectedPropertyId, setSelectedPropertyId } = useManagerPropertyContext();
  const { lang, setLang, t } = useManagerI18n();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  console.log('ManagerLayout render ' + JSON.stringify({ selectedPropertyId, propCount: properties.length }));
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);
  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    if(typeof window !== 'undefined'){ 
      clearSession(); 
      window.location.href='/'; 
    }
  };
  return (
    <div className="manager-theme min-h-screen bg-page flex flex-col md:flex-row text-primary">
      <ManagerForcePasswordChangeModal 
        user={user} 
        onSuccess={() => { /* handled internally */ }} 
      />
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between bg-header/90 backdrop-blur-md p-3 border-b border-border shrink-0 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <button onClick={() => setIsMobileMenuOpen(true)} className="text-primary p-1">
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-1 font-bold text-primary">
            <ShieldAlert className="text-primary w-5 h-5 hidden sm:block" />
            <span className="hidden sm:block">ManagerOps</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <div className="text-xs font-medium text-secondary max-w-[80px] truncate">
            {user?.name || 'Manager'}
          </div>
          <button onClick={handleLogout} className="text-xs bg-danger-bg text-danger px-2 py-1.5 rounded-md font-bold flex items-center gap-1">
            <LogOut className="w-3.5 h-3.5" />
          </button>
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
        fixed inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-border overflow-y-auto shrink-0
        transform transition-transform motion-safe:duration-300 motion-safe:ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:sticky md:top-0 md:h-screen
      `}>
        <div className="flex items-center justify-between p-6 border-b border-border shrink-0">
          <div className="flex items-center gap-2 font-bold text-xl text-primary">
            <ShieldAlert className="text-primary w-7 h-7" />
            <span>ManagerOps</span>
          </div>
          <button className="md:hidden text-secondary" onClick={() => setIsMobileMenuOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="p-4 space-y-1">
          {MENU_ITEMS.map((item: MenuItem) => {
            const label = item.label || t(item.key as DictKey);
            return (
              <Link key={item.key} href={item.href} onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-bold motion-safe:transition-all
                  ${pathname.startsWith(item.href)
                    ? 'bg-primary text-white shadow-lg shadow-primary-subtle' 
                    : 'text-secondary hover:bg-input hover:text-primary'
                  }`}
              >
                <item.icon className={`w-4 h-4 ${pathname.startsWith(item.href) ? 'text-white' : 'text-secondary'}`} />
                {label}
              </Link>
            );
          })}
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="hidden md:flex h-16 bg-header border-b border-border items-center px-6 justify-between shrink-0 sticky top-0 z-20 backdrop-blur-md bg-opacity-80">
          <h2 className="text-lg font-semibold text-primary capitalize">
            {pathname.split('/')[2]?.replace('-', ' ') || 'Dashboard'}
          </h2>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            {/* Language Switcher */}
            <div className="flex items-center bg-input border border-border rounded-[var(--radius-md,8px)] overflow-hidden text-xs font-bold">
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
            {/* Property Switcher */}
            <div className="flex items-center gap-2 bg-input border border-border rounded-[var(--radius-md,8px)] px-3 py-1.5">
              <Building2 className="w-4 h-4 text-secondary shrink-0" />
              <select 
                className="bg-transparent text-sm font-medium text-primary outline-none cursor-pointer w-full max-w-[150px] truncate"
                value={selectedPropertyId}
                onChange={(e) => setSelectedPropertyId(e.target.value)}
              >
                {properties.map(p => (
                  <option key={(p as { id: string }).id} value={(p as { id: string }).id}>{(p as { id: string; name: string }).name}</option>
                ))}
              </select>
            </div>
            <div className="text-sm text-secondary">
              Manager: <strong className="text-primary">{user?.name}</strong>
            </div>
            <button onClick={handleLogout} className="text-sm bg-page border border-border px-4 py-2 rounded-[var(--radius-md,8px)] text-danger font-medium hover:bg-danger-bg hover:text-danger motion-safe:transition-all">
              {t('logout')}
            </button>
          </div>
        </header>
        <div className="flex-1 p-4 md:p-6 text-primary overflow-x-hidden">
          {children}
        </div>
      </main>
    </div>
  );
}