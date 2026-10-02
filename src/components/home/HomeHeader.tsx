'use client';
import Link from 'next/link';
import { Shield, Smartphone, LogIn, UserPlus, Menu } from 'lucide-react';

export function HomeHeader() {
  return (
    <header className="sticky top-0 z-50 transition-all duration-300 border-b border-[var(--border)] bg-[var(--bg-page)]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--primary)] to-indigo-600 flex items-center justify-center shadow-lg shadow-[var(--primary)]/20 group-hover:scale-105 transition-transform">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-[var(--text-primary)] text-2xl font-bold tracking-tight">SmartPG</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8 bg-[var(--bg-overlay)] px-6 py-2 rounded-full border border-[var(--border)] shadow-sm">
          {[
            { label: 'Platform', href: '#features' },
            { label: 'Pricing', href: '#pricing' },
            { label: 'FAQ', href: '#faq' }
          ].map((item) => (
            <Link 
              key={item.label} 
              href={item.href} 
              className="text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/login" className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-[var(--text-secondary)] hover:text-[var(--primary)] transition-all">
            <LogIn className="w-4 h-4" />
            Sign In
          </Link>
          <Link href="/owner-request" className="flex items-center gap-2 px-5 py-2 text-sm font-bold text-white bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl hover:shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-0.5 transition-all">
            <UserPlus className="w-4 h-4" />
            Get Started
          </Link>
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden p-2 text-[var(--text-primary)] bg-[var(--bg-overlay)] rounded-lg border border-[var(--border)]">
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
}
