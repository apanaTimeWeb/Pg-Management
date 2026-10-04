'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Shield, LogIn, UserPlus, Menu, X } from 'lucide-react';

export function HomeHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 transition-all duration-300 border-b border-border bg-page/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--primary)] to-indigo-600 flex items-center justify-center shadow-lg shadow-[var(--primary)]/20 group-hover:scale-105 transition-transform">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-primary text-2xl font-bold tracking-tight">SmartPG</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8 bg-[var(--bg-overlay)] px-6 py-2 rounded-full border border-border shadow-sm">
          {[
            { label: 'Platform', href: '#features' },
            { label: 'Pricing', href: '#pricing' },
            { label: 'FAQ', href: '#faq' }
          ].map((item) => (
            <Link 
              key={item.label} 
              href={item.href} 
              className="text-sm font-semibold text-secondary hover:text-[var(--primary)] transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/frontend_login" className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-secondary hover:text-[var(--primary)] transition-all">
            <LogIn className="w-4 h-4" />
            Sign In
          </Link>
          <Link href="/owner-request" className="flex items-center gap-2 px-5 py-2 text-sm font-bold text-white bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl hover:shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-0.5 transition-all">
            <UserPlus className="w-4 h-4" />
            Get Started
          </Link>
        </div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2 text-primary bg-[var(--bg-overlay)] rounded-lg border border-border"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-page/95 backdrop-blur-xl px-4 py-6 flex flex-col gap-6 shadow-xl absolute w-full left-0 animate-in slide-in-from-top-2">
          <nav className="flex flex-col gap-4">
            {[
              { label: 'Platform', href: '#features' },
              { label: 'Pricing', href: '#pricing' },
              { label: 'FAQ', href: '#faq' }
            ].map((item) => (
              <Link 
                key={item.label} 
                href={item.href} 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-base font-semibold text-primary py-2 border-b border-border"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          
          <div className="flex flex-col gap-3">
            <Link 
              href="/frontend_login" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold text-primary bg-[var(--bg-overlay)] border border-border rounded-xl transition-all"
            >
              <LogIn className="w-5 h-5" />
              Sign In
            </Link>
            <Link 
              href="/owner-request" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 px-5 py-3 text-sm font-bold text-white bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl hover:shadow-lg transition-all"
            >
              <UserPlus className="w-5 h-5" />
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
