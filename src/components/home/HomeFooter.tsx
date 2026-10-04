'use client';
import Link from 'next/link';
import { Shield, Twitter, Facebook, Instagram, Linkedin, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

export function HomeFooter() {
  return (
    <footer className="bg-[#09090b] border-t border-white/10 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section - CTA & Newsletter */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10 pb-16 border-b border-white/10">
          <div className="max-w-xl">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 tracking-tight">Ready to scale your PG business?</h3>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">Join 500+ properties using SmartPG to automate rent, manage tenants, and grow operations seamlessly.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto shrink-0">
            <Link href="/owner-request" className="px-6 py-3.5 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25">
              Start Free Trial <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/demo" className="px-6 py-3.5 rounded-xl font-bold text-white bg-white/10 hover:bg-white/20 border border-white/10 transition-colors flex items-center justify-center">
              Book Demo
            </Link>
          </div>
        </div>

        {/* Middle Section - Grid Links */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-x-8 gap-y-12 py-16">
          
          {/* Brand & Info */}
          <div className="col-span-2 lg:col-span-2 pr-4 sm:pr-12">
            <Link href="/" className="flex items-center gap-2 mb-6 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-white text-2xl font-bold tracking-tight">SmartPG</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-sm">
              The operating system for modern properties. Automate rent collection, manage room allocations mathematically, and elevate your resident experience with a platform engineered for scale.
            </p>
            <div className="flex items-center gap-4">
              <Link href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all group">
                <Twitter className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all group">
                <Linkedin className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all group">
                <Facebook className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all group">
                <Instagram className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Product */}
          <div className="col-span-1">
            <h4 className="text-white font-semibold mb-6 tracking-wide uppercase text-sm">Product</h4>
            <ul className="space-y-4">
              {['Features', 'Pricing', 'Integrations', 'Changelog', 'Roadmap', 'API Docs'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm font-medium text-gray-400 hover:text-indigo-400 transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="col-span-1">
            <h4 className="text-white font-semibold mb-6 tracking-wide uppercase text-sm">Company</h4>
            <ul className="space-y-4">
              {['About Us', 'Careers', 'Blog', 'Press', 'Team', 'Partners'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm font-medium text-gray-400 hover:text-indigo-400 transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 lg:col-span-1">
            <h4 className="text-white font-semibold mb-6 tracking-wide uppercase text-sm">Contact</h4>
            <ul className="space-y-4">
              <li>
                <a href="mailto:hello@smartpg.com" className="group flex items-center gap-3 text-sm font-medium text-gray-400 hover:text-white transition-colors">
                  <Mail className="w-4 h-4 text-gray-500 group-hover:text-indigo-400 transition-colors shrink-0" />
                  hello@smartpg.com
                </a>
              </li>
              <li>
                <a href="tel:+919876543210" className="group flex items-center gap-3 text-sm font-medium text-gray-400 hover:text-white transition-colors">
                  <Phone className="w-4 h-4 text-gray-500 group-hover:text-indigo-400 transition-colors shrink-0" />
                  +91 98765 43210
                </a>
              </li>
              <li>
                <div className="flex gap-3 text-sm font-medium text-gray-400 mt-2">
                  <MapPin className="w-4 h-4 text-gray-500 shrink-0 mt-1" />
                  <span className="leading-relaxed">123 Tech Park, Sector 4<br/>Bangalore, India 560001</span>
                </div>
              </li>
            </ul>
          </div>
          
        </div>

        {/* Bottom Section - Copyright & Legal */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-white/10">
          <p className="text-gray-500 text-sm text-center md:text-left font-medium">
            © {new Date().getFullYear()} SmartPG. All rights reserved. <span className="hidden sm:inline">| Built with ❤️ in India</span>
          </p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            <Link href="#" className="text-sm font-medium text-gray-500 hover:text-gray-300 transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-sm font-medium text-gray-500 hover:text-gray-300 transition-colors">Terms of Service</Link>
            <Link href="#" className="text-sm font-medium text-gray-500 hover:text-gray-300 transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
