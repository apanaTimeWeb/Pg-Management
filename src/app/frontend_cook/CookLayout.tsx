'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, Utensils, ClipboardList, Clock, 
  Package, Trash2, AlertTriangle, ListTodo, Sparkles, 
  UserCheck, BellRing, FileText, Activity, User, Shield,
  Menu as MenuIcon, X, LogOut, ChevronDown, ChevronRight
} from 'lucide-react';
import { getSession, clearSession } from './cook_lib/cook_auth/CookSession';
import { useCookContext } from './CookContext';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

type NavItem = {
  title: string;
  href?: string;
  icon: any;
  subItems?: { title: string; href: string; }[];
};

const NAV_ITEMS: NavItem[] = [
  { title: 'Dashboard', href: '/frontend_cook/dashboard', icon: LayoutDashboard },
  { 
    title: "Today's Kitchen", 
    icon: Clock,
    subItems: [
      { title: 'Breakfast', href: '/frontend_cook/todays_kitchen/breakfast' },
      { title: 'Lunch', href: '/frontend_cook/todays_kitchen/lunch' },
      { title: 'Dinner', href: '/frontend_cook/todays_kitchen/dinner' },
      { title: 'Kitchen Status', href: '/frontend_cook/todays_kitchen/status' }
    ]
  },
  {
    title: 'Menu',
    icon: Utensils,
    subItems: [
      { title: "Today's Menu", href: '/frontend_cook/menu/today' },
      { title: 'Weekly Menu', href: '/frontend_cook/menu/weekly' },
      { title: 'Create Menu', href: '/frontend_cook/menu/create' },
      { title: 'Menu History', href: '/frontend_cook/menu/history' }
    ]
  },
  {
    title: 'Meal Management',
    icon: ClipboardList,
    subItems: [
      { title: 'Meal Count', href: '/frontend_cook/meals/count' },
      { title: 'Breakfast', href: '/frontend_cook/meals/breakfast' },
      { title: 'Lunch', href: '/frontend_cook/meals/lunch' },
      { title: 'Dinner', href: '/frontend_cook/meals/dinner' },
      { title: 'Special Meals', href: '/frontend_cook/meals/special' }
    ]
  },
  {
    title: 'Food Preparation',
    icon: Activity,
    subItems: [
      { title: "Today's Preparation", href: '/frontend_cook/preparation/today' },
      { title: 'In Progress', href: '/frontend_cook/preparation/in_progress' },
      { title: 'Ready', href: '/frontend_cook/preparation/ready' },
      { title: 'Completed', href: '/frontend_cook/preparation/completed' }
    ]
  },
  {
    title: 'Kitchen Inventory',
    icon: Package,
    subItems: [
      { title: 'Current Stock', href: '/frontend_cook/inventory/current' },
      { title: 'Stock In', href: '/frontend_cook/inventory/in' },
      { title: 'Stock Out', href: '/frontend_cook/inventory/out' },
      { title: 'Low Stock', href: '/frontend_cook/inventory/low' },
      { title: 'Expired Items', href: '/frontend_cook/inventory/expired' }
    ]
  },
  { title: 'Wastage', href: '/frontend_cook/wastage', icon: Trash2 },
  {
    title: 'Food Complaints',
    icon: AlertTriangle,
    subItems: [
      { title: 'New', href: '/frontend_cook/complaints/new' },
      { title: 'In Progress', href: '/frontend_cook/complaints/in_progress' },
      { title: 'Resolved', href: '/frontend_cook/complaints/resolved' },
      { title: 'History', href: '/frontend_cook/complaints/history' }
    ]
  },
  { title: 'Kitchen Tasks', href: '/frontend_cook/tasks', icon: ListTodo },
  { title: 'Hygiene & Cleaning', href: '/frontend_cook/hygiene', icon: Sparkles },
  {
    title: 'Attendance',
    icon: UserCheck,
    subItems: [
      { title: 'My Attendance', href: '/frontend_cook/attendance/my' }
    ]
  },
  { title: 'Notices', href: '/frontend_cook/notices', icon: BellRing },
  { title: 'Reports', href: '/frontend_cook/reports', icon: FileText },
  { title: 'Notifications', href: '/frontend_cook/notifications', icon: BellRing },
  { title: 'Activity History', href: '/frontend_cook/activity', icon: Activity },
  { title: 'My Profile', href: '/frontend_cook/profile', icon: User },
  { title: 'Security', href: '/frontend_cook/security', icon: Shield }
];

export function CookLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const user = typeof window !== 'undefined' ? getSession() : null;
  const { loading } = useCookContext();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({});

  if (loading) return null;

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    clearSession();
    router.push('/');
  };

  const toggleMenu = (title: string) => {
    setExpandedMenus(prev => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <div className="min-h-screen bg-page flex flex-col md:flex-row">
      
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between bg-header/90 backdrop-blur-md p-3 border-b border-border shrink-0 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <button onClick={() => setIsMobileMenuOpen(true)} className="text-primary p-1.5 hover:bg-black/5 dark:hover:bg-white/10 rounded-lg transition-colors focus:outline-none active:bg-black/10 dark:active:bg-white/20">
            <MenuIcon className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-1.5 font-bold text-primary">
            <Utensils className="text-orange-500 w-5 h-5" />
            <span className="text-lg">Cook Portal</span>
          </div>
        </div>
        <div className="flex items-center gap-3 relative">
          <ThemeToggle />
          
          <button 
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-500 text-white font-bold text-sm shadow-md focus:outline-none ring-2 ring-transparent focus:ring-orange-500/50 active:scale-95 transition-transform"
          >
            {user?.name?.[0]?.toUpperCase() || 'C'}
          </button>

          {/* Mobile Profile Dropdown */}
          {isProfileMenuOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setIsProfileMenuOpen(false)}></div>
              <div className="absolute right-0 top-full mt-3 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden py-1 animate-in slide-in-from-top-2 fade-in duration-200">
                <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white text-lg font-bold">
                    {user?.name?.[0]?.toUpperCase() || 'C'}
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{user?.name || 'Cook'}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.email || 'cook@example.com'}</p>
                  </div>
                </div>
                
                <div className="py-2">
                  <Link href="/frontend_cook/profile" onClick={() => setIsProfileMenuOpen(false)} className="flex items-center px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-orange-50 dark:hover:bg-orange-900/30 font-semibold transition-colors">
                    <User className="w-4 h-4 mr-3 text-gray-400 dark:text-gray-500" /> My Profile
                  </Link>
                  <Link href="/frontend_cook/security" onClick={() => setIsProfileMenuOpen(false)} className="flex items-center px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-orange-50 dark:hover:bg-orange-900/30 font-semibold transition-colors">
                    <Shield className="w-4 h-4 mr-3 text-gray-400 dark:text-gray-500" /> Security
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
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-border overflow-y-auto shrink-0
        transform transition-transform motion-safe:duration-300 motion-safe:ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:translate-x-0 md:sticky md:top-0 md:h-screen
      `}>
        <div className="flex items-center justify-between p-6 border-b border-border shrink-0 sticky top-0 bg-sidebar z-10">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 font-bold text-xl text-primary">
              <Utensils className="text-primary w-7 h-7" />
              <span>Cook Portal</span>
            </div>
          </div>
          <button className="md:hidden text-secondary" onClick={() => setIsMobileMenuOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="p-4 space-y-1 pb-20">
          {NAV_ITEMS.map((item) => {
            const hasSub = !!item.subItems;
            const isExpanded = !!expandedMenus[item.title];
            // Check if active route is this one or any of its children
            const isActive = pathname === item.href || (hasSub && item.subItems?.some(s => pathname === s.href));
            
            return (
              <div key={item.title} className="mb-1">
                {hasSub ? (
                  <button
                    onClick={() => toggleMenu(item.title)}
                    className={`w-full flex items-center justify-between px-4 py-2.5 rounded-md text-sm font-medium motion-safe:transition-colors ${isActive ? 'bg-primary-subtle text-primary border-l-4 border-primary' : 'text-secondary hover:bg-page hover:text-primary'}`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </div>
                    {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  </button>
                ) : (
                  <Link 
                    href={item.href || '#'} 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium motion-safe:transition-colors ${isActive ? 'bg-primary-subtle text-primary border-l-4 border-primary' : 'text-secondary hover:bg-page hover:text-primary'}`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.title}</span>
                  </Link>
                )}
                
                {hasSub && isExpanded && (
                  <div className="ml-9 mt-1 space-y-1 border-l border-border pl-2">
                    {item.subItems?.map(sub => (
                      <Link 
                        key={sub.title} 
                        href={sub.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`block px-3 py-2 rounded-md text-sm motion-safe:transition-colors ${pathname === sub.href ? 'text-primary bg-primary-subtle font-medium' : 'text-secondary hover:text-primary hover:bg-page'}`}
                      >
                        {sub.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
          
          <div className="mt-8 pt-4 border-t border-border">
             <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium text-danger hover:bg-danger-bg hover:text-danger motion-safe:transition-all">
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
             </button>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="hidden md:flex h-16 bg-header border-b border-border items-center px-6 justify-between shrink-0 sticky top-0 z-20 backdrop-blur-md bg-opacity-80">
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold text-primary capitalize leading-tight">
              {pathname.split('/').pop()?.replace(/_/g, ' ') || 'Dashboard'}
            </h2>
            <p className="text-xs text-secondary capitalize leading-tight">Role: Cook</p>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <div className="text-sm text-secondary">
              User: <strong className="text-primary">{user?.name}</strong>
            </div>
            <button onClick={handleLogout} className="text-sm bg-page border border-border px-4 py-2 rounded-md text-danger font-medium hover:bg-danger-bg hover:text-danger motion-safe:transition-all">
              Logout
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
