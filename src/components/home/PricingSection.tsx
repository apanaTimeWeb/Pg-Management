'use client';
import Link from 'next/link';

export function PricingSection() {
  const plans = [
    {
      name: "💡 Starter",
      price: "₹999",
      period: "/month",
      features: [
        "Up to 5 PG",
        "100 Students",
        "Basic Reports",
        "Email Support"
      ],
      cta: "Start Free",
      btnClass: "btn-outline",
      popular: false
    },
    {
      name: "🚀 Pro",
      price: "₹1,999",
      period: "/month",
      features: [
        "Up to 15 PG",
        "500 Students",
        "Advanced Reports",
        "Priority Support",
        "Mobile App"
      ],
      cta: "Start Free",
      btnClass: "btn-gold",
      popular: true
    },
    {
      name: "🏢 Enterprise",
      price: "Custom",
      period: " Pricing",
      features: [
        "Unlimited PG",
        "Unlimited Students",
        "Custom Reports",
        "24/7 Support",
        "Dedicated Manager",
        "API Access"
      ],
      cta: "Contact Us",
      btnClass: "btn-navy",
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-[var(--primary-white)]">
      <div className="max-w-[1200px] mx-auto px-4">
        <h2 className="section-header">💲 Simple & Transparent Pricing</h2>
        <p className="section-subheader">Choose a plan that scales with your property business.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <div key={i} className={`home-card flex flex-col hover-lift relative ${plan.popular ? 'transform md:-translate-y-4 shadow-xl' : ''}`}
                 style={{ border: plan.popular ? '2px solid var(--primary-gold)' : '1px solid var(--border)' }}>
              
              {plan.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[var(--primary-gold)] text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  Most Popular
                </div>
              )}
              
              <h3 className="font-bold text-2xl mb-2" style={{ color: 'var(--primary-navy)' }}>{plan.name}</h3>
              <div className="mb-6">
                <span className="text-4xl font-extrabold" style={{ color: 'var(--primary-teal)' }}>{plan.price}</span>
                <span className="text-sm font-medium" style={{ color: 'var(--text-medium)' }}>{plan.period}</span>
              </div>
              
              <ul className="space-y-4 mb-8 flex-grow">
                {plan.features.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm" style={{ color: 'var(--text-medium)' }}>
                    <svg className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--primary-teal)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    {feat}
                  </li>
                ))}
              </ul>
              
              <Link href="#" className={`w-full ${plan.btnClass}`}>
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 text-sm" style={{ color: 'var(--text-medium)' }}>
          <p>💡 All plans include: 14-day free trial | No hidden charges | Cancel anytime | GST extra</p>
        </div>
      </div>
    </section>
  );
}
