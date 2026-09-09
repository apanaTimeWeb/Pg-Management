'use client';
import Link from 'next/link';

export function HomeFooter() {
  return (
    <footer className="pt-16 pb-8" style={{ background: 'var(--primary-navy)', color: 'var(--bg-medium)' }}>
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded bg-[var(--primary-white)] flex items-center justify-center">
                <span className="text-[var(--primary-gold)] font-bold">PG</span>
              </div>
              <span className="text-[var(--primary-white)] text-xl font-bold tracking-tight">PG System</span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-light)' }}>
              Smart PG Management Platform. Digitizing property operations for owners and students across India.
            </p>
          </div>

          {/* Links 1 */}
          <div>
            <h4 className="font-bold mb-6 text-lg" style={{ color: 'var(--primary-white)', borderBottom: '2px solid var(--primary-teal)', display: 'inline-block', paddingBottom: '4px' }}>Product</h4>
            <ul className="space-y-3">
              <li><Link href="#features" className="text-sm hover:text-[var(--primary-gold)] transition-colors" style={{ color: 'var(--bg-medium)' }}>Features</Link></li>
              <li><Link href="#pricing" className="text-sm hover:text-[var(--primary-gold)] transition-colors" style={{ color: 'var(--bg-medium)' }}>Pricing</Link></li>
              <li><Link href="#" className="text-sm hover:text-[var(--primary-gold)] transition-colors" style={{ color: 'var(--bg-medium)' }}>Integrations</Link></li>
              <li><Link href="#" className="text-sm hover:text-[var(--primary-gold)] transition-colors" style={{ color: 'var(--bg-medium)' }}>Changelog</Link></li>
            </ul>
          </div>

          {/* Links 2 */}
          <div>
            <h4 className="font-bold mb-6 text-lg" style={{ color: 'var(--primary-white)', borderBottom: '2px solid var(--primary-teal)', display: 'inline-block', paddingBottom: '4px' }}>Company</h4>
            <ul className="space-y-3">
              <li><Link href="#" className="text-sm hover:text-[var(--primary-gold)] transition-colors" style={{ color: 'var(--bg-medium)' }}>About Us</Link></li>
              <li><Link href="#" className="text-sm hover:text-[var(--primary-gold)] transition-colors" style={{ color: 'var(--bg-medium)' }}>Careers</Link></li>
              <li><Link href="#" className="text-sm hover:text-[var(--primary-gold)] transition-colors" style={{ color: 'var(--bg-medium)' }}>Blog</Link></li>
              <li><Link href="#" className="text-sm hover:text-[var(--primary-gold)] transition-colors" style={{ color: 'var(--bg-medium)' }}>Press</Link></li>
            </ul>
          </div>

          {/* Links 3 */}
          <div>
            <h4 className="font-bold mb-6 text-lg" style={{ color: 'var(--primary-white)', borderBottom: '2px solid var(--primary-teal)', display: 'inline-block', paddingBottom: '4px' }}>Support</h4>
            <ul className="space-y-3">
              <li><Link href="#" className="text-sm hover:text-[var(--primary-gold)] transition-colors" style={{ color: 'var(--bg-medium)' }}>Help Center</Link></li>
              <li><Link href="#" className="text-sm hover:text-[var(--primary-gold)] transition-colors" style={{ color: 'var(--bg-medium)' }}>Contact</Link></li>
              <li><Link href="#" className="text-sm hover:text-[var(--primary-gold)] transition-colors" style={{ color: 'var(--bg-medium)' }}>Privacy Policy</Link></li>
              <li><Link href="#" className="text-sm hover:text-[var(--primary-gold)] transition-colors" style={{ color: 'var(--bg-medium)' }}>Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t pt-8 pb-4 flex flex-col md:flex-row justify-between items-center gap-4" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
          <div className="flex items-center gap-4 text-xl">
            <span className="text-sm mr-2">📱 Follow Us:</span>
            <Link href="#" className="hover:text-[var(--primary-gold)] transition-colors">f</Link>
            <Link href="#" className="hover:text-[var(--primary-gold)] transition-colors">t</Link>
            <Link href="#" className="hover:text-[var(--primary-gold)] transition-colors">in</Link>
            <Link href="#" className="hover:text-[var(--primary-gold)] transition-colors">ig</Link>
          </div>
          
          <p className="text-sm text-center md:text-right" style={{ color: 'var(--text-light)' }}>
            © {new Date().getFullYear()} PG Management System. All rights reserved. Made with ❤️ in India.
          </p>
        </div>
      </div>
    </footer>
  );
}
