'use client';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, PlayCircle, CheckCircle2, Shield, Users, Building, CreditCard } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[var(--bg-page)] pt-24 pb-20 lg:pt-32 lg:pb-28">
      {/* Dynamic Background */}
      <div className="absolute top-[-10%] left-[20%] w-[60%] h-[60%] rounded-full bg-[var(--primary)]/10 blur-[120px] mix-blend-screen pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/10 blur-[100px] mix-blend-screen pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--primary)]/10 border border-[var(--primary)]/20 text-[var(--primary)] text-sm font-semibold mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--primary)] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--primary)]"></span>
          </span>
          Next-Generation PG Management
        </div>

        {/* Headlines */}
        <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[var(--text-primary)] mb-6 leading-[1.1]">
            Manage your properties <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-indigo-400">intelligently.</span>
          </h1>
          <p className="text-lg sm:text-xl text-[var(--text-secondary)] mb-10 max-w-2xl mx-auto leading-relaxed">
            A unified platform to seamlessly manage rooms, automate rent collections, track expenses, and enhance resident satisfaction effortlessly.
          </p>
        </div>

        {/* Feature Ticks */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm font-medium text-[var(--text-secondary)] mb-12 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
          {[
            { icon: Building, text: 'Manage Rooms' },
            { icon: CreditCard, text: 'Track Payments' },
            { icon: Users, text: 'Handle Residents' },
            { icon: Shield, text: 'Total Security' }
          ].map((feat, i) => (
            <span key={i} className="flex items-center gap-2 bg-[var(--bg-overlay)] px-4 py-2 rounded-lg border border-[var(--border)]">
              <feat.icon className="w-4 h-4 text-[var(--primary)]" /> {feat.text}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
          <Link href="/owner-request" className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-white bg-[var(--primary)] hover:bg-[var(--primary-hover)] transition-all shadow-lg shadow-[var(--primary)]/25 flex items-center justify-center gap-2 group">
            Get Started Free
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <button className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-[var(--text-primary)] bg-[var(--bg-overlay)] border border-[var(--border)] hover:border-[var(--primary)] transition-all flex items-center justify-center gap-2 hover:bg-[var(--bg-input)]">
            <PlayCircle className="w-5 h-5 text-[var(--primary)]" />
            Watch Demo
          </button>
        </div>

        {/* Stats Glass Card */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto p-6 lg:p-8 rounded-3xl border border-[var(--border)] bg-[var(--bg-overlay)]/50 backdrop-blur-xl shadow-xl mb-24 animate-in fade-in duration-1000 delay-500">
          {[
            { label: 'Properties', value: '500+' },
            { label: 'Active Residents', value: '25k+' },
            { label: 'Revenue Tracked', value: '₹10Cr+' },
            { label: 'Support Uptime', value: '99.9%' }
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center justify-center space-y-1">
              <span className="text-3xl lg:text-4xl font-extrabold text-[var(--text-primary)]">{stat.value}</span>
              <span className="text-sm font-medium text-[var(--text-secondary)] uppercase tracking-wider">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Dashboard Mockup Image */}
        <div className="relative max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500">
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-page)] via-transparent to-transparent z-10"></div>
          <div className="rounded-t-2xl lg:rounded-t-3xl overflow-hidden border border-[var(--border)] border-b-0 shadow-2xl relative bg-[var(--bg-card)]">
            {/* Window Controls Mac Style */}
            <div className="h-10 border-b border-[var(--border)] bg-[var(--bg-overlay)] flex items-center px-4 gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-amber-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
            {/* The Image */}
            <div className="relative w-full aspect-[16/9] lg:aspect-[21/9]">
              <Image 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" 
                alt="Dashboard Preview" 
                fill 
                className="object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-[var(--primary)]/5 mix-blend-overlay"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
