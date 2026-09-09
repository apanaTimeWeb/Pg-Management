'use client';
import Link from 'next/link';

export function CTASection() {
  return (
    <section className="py-24" style={{ background: 'var(--gradient-primary)' }}>
      <div className="max-w-[800px] mx-auto px-4 text-center fade-in">
        <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: 'var(--primary-white)' }}>
          🚀 Ready to Simplify Your PG Management?
        </h2>
        <p className="text-lg md:text-xl mb-10" style={{ color: 'var(--bg-medium)' }}>
          Join 500+ PG owners already using our platform. No credit card required.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
          <Link href="/owner-request" className="btn-gold text-lg">
            🌟 Start Free Trial
          </Link>
          <Link href="#contact" className="btn-outline-white text-lg">
            📞 Talk to Sales
          </Link>
        </div>

        <p className="text-sm font-medium" style={{ color: 'var(--bg-medium)', opacity: 0.8 }}>
          No credit card required. 14-day free trial.
        </p>
      </div>
    </section>
  );
}
