'use client';
import { Home, IndianRupee, Smartphone, ShieldCheck, UtensilsCrossed, BarChart3, MessageSquareWarning, Star } from 'lucide-react';

export function FeaturesSection() {
  const features = [
    {
      icon: <Home className="w-6 h-6" />,
      title: "Room Management",
      desc: "Manage rooms & beds effortlessly"
    },
    {
      icon: <IndianRupee className="w-6 h-6" />,
      title: "Payment Tracking",
      desc: "Auto collection & invoices"
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Mobile App",
      desc: "Access anywhere anytime"
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "Security First",
      desc: "Data encrypted & secure"
    },
    {
      icon: <UtensilsCrossed className="w-6 h-6" />,
      title: "Mess Management",
      desc: "Track meals & inventory"
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Analytics & Reports",
      desc: "Real-time dashboards"
    },
    {
      icon: <MessageSquareWarning className="w-6 h-6" />,
      title: "Complaint System",
      desc: "Quick resolution"
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Student Feedback",
      desc: "Improve services"
    }
  ];

  return (
    <section id="features" className="py-20 bg-[var(--primary-white)]">
      <div className="max-w-[1200px] mx-auto px-4">
        <h2 className="section-header">🚀 Why Choose PG Management System?</h2>
        <p className="section-subheader">Everything you need to run your property seamlessly.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {features.map((f, i) => (
            <div key={i} className="home-card group hover:border-[var(--primary-gold)] border border-transparent transition-all hover-lift">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-2xl" style={{ backgroundColor: 'rgba(45,125,154,0.1)' }}>
                <span style={{ color: 'var(--primary-teal)' }}>{f.icon}</span>
              </div>
              <h3 className="font-bold text-lg mb-2" style={{ color: 'var(--primary-navy)' }}>{f.title}</h3>
              <p className="text-sm" style={{ color: 'var(--text-medium)' }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
