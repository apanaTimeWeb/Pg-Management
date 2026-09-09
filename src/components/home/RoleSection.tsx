'use client';
import Link from 'next/link';
import { UserCog, Users, ChefHat, GraduationCap, ShieldAlert, Smartphone } from 'lucide-react';

export function RoleSection() {
  const roles = [
    {
      icon: <UserCog className="w-6 h-6" />,
      title: "Owner",
      color: "var(--primary-teal)",
      features: ["Property Management", "Rent Collection", "Reports & Analytics", "Staff Management"]
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Manager",
      color: "var(--secondary-green)",
      features: ["Daily Operations", "Student Check-in/out", "Complaint Handling", "Visitor Management"]
    },
    {
      icon: <ChefHat className="w-6 h-6" />,
      title: "Cook",
      color: "var(--secondary-orange)",
      features: ["Menu Management", "Meal Tracking", "Inventory Management", "Purchase Requests"]
    },
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: "Student",
      color: "var(--secondary-purple)",
      features: ["Room Information", "Rent Payment", "Complaint System", "Meal Attendance"]
    },
    {
      icon: <ShieldAlert className="w-6 h-6" />,
      title: "SuperAdmin",
      color: "var(--primary-navy)",
      features: ["System Monitoring", "Owner Management", "PG Approval", "Revenue Tracking"]
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Everyone",
      color: "var(--primary-gold)",
      features: ["Mobile Access", "Real-time Updates", "Push Notifications", "Digital Payments"]
    }
  ];

  return (
    <section className="py-20 bg-[var(--primary-white)]">
      <div className="max-w-[1200px] mx-auto px-4">
        <h2 className="section-header">👥 Designed For Every Role</h2>
        <p className="section-subheader">A unified system tailored for everyone involved.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {roles.map((role, i) => (
            <div key={i} className="home-card group flex flex-col h-full hover-lift" 
                 style={{ borderLeft: `4px solid ${role.color}` }}>
              <h3 className="font-bold text-xl mb-4 flex items-center gap-2" style={{ color: 'var(--primary-navy)' }}>
                <span>{role.icon}</span> {role.title}
              </h3>
              
              <div className="w-full h-px mb-4" style={{ background: 'var(--bg-medium)' }}></div>
              
              <ul className="flex-grow space-y-3 mb-6">
                {role.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm" style={{ color: 'var(--text-medium)' }}>
                    <span className="text-xs mt-1" style={{ color: role.color }}>●</span>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <Link href="#" className="font-semibold text-sm hover:underline mt-auto" style={{ color: role.color }}>
                Learn More →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
