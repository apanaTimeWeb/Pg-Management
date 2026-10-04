'use client';
import { HomeHeader } from '@/components/home/HomeHeader';
import { HomeFooter } from '@/components/home/HomeFooter';
import { ArrowRight, Building2, CreditCard, Users, Settings, ChefHat, LayoutGrid, Smartphone, ShieldCheck, Zap } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen font-sans bg-[#09090b] text-white selection:bg-indigo-500/30 overflow-x-hidden overflow-y-auto">
      <HomeHeader />
      
      <main className="flex-grow">
        
        {/* --- HERO SECTION --- */}
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center">
          {/* Ambient Glows */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none"></div>
          <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-purple-600/20 blur-[120px] rounded-full pointer-events-none"></div>
          
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-300 text-sm font-medium mb-8 backdrop-blur-md animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
            SmartPG 2.0 is now live
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-extrabold tracking-tight mb-8 leading-[1.05] animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100 max-w-5xl">
            The operating system for <br className="hidden lg:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 animate-gradient-x">modern properties.</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-400 mb-12 max-w-2xl leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            Automate rent collection, manage room allocations mathematically, and elevate your resident experience with a platform engineered for scale.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300 w-full sm:w-auto">
            <Link href="/owner-request" className="px-8 py-4 rounded-xl font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all flex items-center justify-center gap-2 group backdrop-blur-md">
              Start Building
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/demo" className="px-8 py-4 rounded-xl font-bold text-black bg-white hover:bg-gray-100 transition-all flex items-center justify-center gap-2">
              <Zap className="w-4 h-4 text-indigo-600" />
              Book a Demo
            </Link>
          </div>

          {/* Abstract Dashboard Visual */}
          <div className="mt-24 w-full max-w-5xl relative animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500">
            <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-transparent z-10"></div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-2 backdrop-blur-sm shadow-2xl relative">
              <div className="rounded-xl overflow-hidden relative aspect-[16/9] border border-white/10">
                <Image 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" 
                  alt="Dashboard Platform" 
                  fill 
                  className="object-cover opacity-80"
                />
              </div>
            </div>
          </div>
        </section>

        {/* --- STATS SECTION --- */}
        <section className="border-y border-white/5 bg-white/[0.02]">
          <div className="max-w-7xl mx-auto px-4 py-12 flex flex-wrap justify-around gap-8 text-center">
            {[
              { value: '500+', label: 'Properties Managed' },
              { value: '₹50Cr', label: 'Rent Processed' },
              { value: '25k+', label: 'Happy Residents' },
              { value: '99.9%', label: 'System Uptime' }
            ].map((stat, i) => (
              <div key={i} className="flex flex-col space-y-2">
                <span className="text-4xl lg:text-5xl font-bold text-white tracking-tight">{stat.value}</span>
                <span className="text-sm text-gray-400 font-medium tracking-widest uppercase">{stat.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* --- BENTO BOX FEATURES --- */}
        <section id="features" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Everything you need to <span className="text-indigo-400">scale.</span></h2>
            <p className="text-gray-400 text-lg max-w-2xl">Stop using spreadsheets. SmartPG brings enterprise-grade property management tools to owners of all sizes.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 - Large */}
            <div className="md:col-span-2 rounded-3xl border border-white/10 bg-white/5 p-8 relative overflow-hidden group hover:border-indigo-500/50 transition-colors">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <CreditCard className="w-32 h-32 text-indigo-400" />
              </div>
              <div className="relative z-10 h-full flex flex-col justify-end min-h-[250px]">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center mb-6 border border-indigo-500/30">
                  <CreditCard className="w-6 h-6 text-indigo-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Automated Billing Engine</h3>
                <p className="text-gray-400 max-w-md">Generate invoices, send WhatsApp reminders, and track payments in real-time. Say goodbye to manual ledger entries.</p>
              </div>
            </div>

            {/* Feature 2 - Square */}
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 relative group hover:border-purple-500/50 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-6 border border-purple-500/30">
                <LayoutGrid className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Smart Allocation</h3>
              <p className="text-gray-400 text-sm">Visual drag-and-drop bed management. Instantly know which rooms are vacant.</p>
            </div>

            {/* Feature 3 - Square */}
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 relative group hover:border-emerald-500/50 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-6 border border-emerald-500/30">
                <ChefHat className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Mess & Inventory</h3>
              <p className="text-gray-400 text-sm">Track daily meals, manage stock, and reduce food wastage with predictive analytics.</p>
            </div>

            {/* Feature 4 - Large */}
            <div className="md:col-span-2 rounded-3xl border border-white/10 bg-white/5 p-8 relative overflow-hidden group hover:border-blue-500/50 transition-colors">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Settings className="w-32 h-32 text-blue-400" />
              </div>
              <div className="relative z-10 h-full flex flex-col justify-end min-h-[250px]">
                <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-6 border border-blue-500/30">
                  <ShieldCheck className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Ticketing & Maintenance</h3>
                <p className="text-gray-400 max-w-md">Students can raise complaints from their app. Assign tasks to staff and track resolution time automatically.</p>
              </div>
            </div>
          </div>
        </section>

        {/* --- STAKEHOLDER SECTION --- */}
        <section className="py-24 border-y border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-indigo-900/10"></div>
          <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
            <h2 className="text-3xl sm:text-5xl font-bold mb-16">Built for everyone.</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: 'Owners', icon: Building2, desc: 'Portfolio view, financial reports, and macro-level controls.' },
                { title: 'Managers', icon: Users, desc: 'Daily operations, resident onboarding, and rent collection.' },
                { title: 'Students', icon: Smartphone, desc: 'Mobile app for rent payments, gate passes, and complaints.' },
                { title: 'Cooks & Staff', icon: ChefHat, desc: 'Daily menu planning, meal headcounts, and kitchen inventory management.' }
              ].map((role, i) => (
                <div key={i} className="flex flex-col items-center p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:-translate-y-2 transition-transform duration-300">
                  <div className="w-16 h-16 rounded-full bg-indigo-500/20 flex items-center justify-center mb-6">
                    <role.icon className="w-8 h-8 text-indigo-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{role.title}</h3>
                  <p className="text-gray-400 text-sm text-center">{role.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- CTA SECTION --- */}
        <section className="py-32 relative">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6">Ready to automate your PG?</h2>
            <p className="text-xl text-gray-400 mb-10">Join hundreds of property owners who have scaled their operations with SmartPG.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/owner-request" className="px-8 py-4 rounded-xl font-bold text-black bg-white hover:bg-gray-100 transition-colors shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)]">
                Create Owner Account
              </Link>
              <Link href="/login" className="px-8 py-4 rounded-xl font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-colors">
                Sign In to Dashboard
              </Link>
            </div>
          </div>
        </section>

      </main>
      
      <HomeFooter />
    </div>
  );
}

