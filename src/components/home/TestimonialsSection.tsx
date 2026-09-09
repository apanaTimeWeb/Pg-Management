'use client';

export function TestimonialsSection() {
  const testimonials = [
    {
      quote: "This system transformed my PG management. Rent collection is now easy!",
      name: "Rajesh Kumar",
      role: "PG Owner"
    },
    {
      quote: "Managing my PG business has never been easier! The reports are fantastic.",
      name: "Priya Singh",
      role: "PG Manager"
    },
    {
      quote: "The student app makes it so easy to pay rent and raise complaints!",
      name: "Amit Sharma",
      role: "Student"
    }
  ];

  return (
    <section className="py-20" style={{ background: 'var(--bg-light)' }}>
      <div className="max-w-[1200px] mx-auto px-4">
        <h2 className="section-header">⭐ What Our Users Say</h2>
        <p className="section-subheader">Trusted by thousands of PG owners and students across India.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {testimonials.map((test, i) => (
            <div key={i} className="home-card hover-lift flex flex-col justify-between">
              <div>
                <div className="flex gap-1 mb-4" style={{ color: 'var(--primary-gold)' }}>
                  <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                </div>
                <p className="text-base italic mb-6 leading-relaxed" style={{ color: 'var(--text-dark)' }}>
                  "{test.quote}"
                </p>
              </div>
              <div className="mt-auto">
                <p className="font-bold text-lg" style={{ color: 'var(--primary-navy)' }}>{test.name}</p>
                <p className="text-sm" style={{ color: 'var(--text-medium)' }}>{test.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
