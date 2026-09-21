'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Briefcase, Users, Utensils, UserCheck, Eye, EyeOff, CheckCircle2, Lock, X, AlertCircle } from 'lucide-react';

import { authApi as api } from '@/app/login/login_lib/login_api/LoginAuth';
import { setSession } from '@/app/login/login_lib/login_auth/LoginSession';
import '../globals.css';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

const DEMO_ACCOUNTS = [
  { id: 'superadmin', label: 'SuperAdmin', desc: 'System Administration', email: 'superadmin@gmail.com', password: 'Super@123', icon: Shield },
  { id: 'owner', label: 'Owner', desc: 'PG Business Owner', email: 'owner@gmail.com', password: 'Owner3@123', icon: Briefcase },
  { id: 'manager', label: 'Manager', desc: 'PG Operations', email: 'manager3@gmail.com', password: 'Manager@123', icon: Users },
  { id: 'cook', label: 'Cook', desc: 'Food & Mess', email: 'cook3@gmail.com', password: 'Cook@123', icon: Utensils },
  { id: 'student', label: 'Student', desc: 'Resident Portal', email: 'student3@gmail.com', password: 'Student@123', icon: UserCheck }
];

export default function UnifiedLogin() {
  const router = useRouter();
  
  const [selectedRole, setSelectedRole] = useState(DEMO_ACCOUNTS[0]!);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  const handleRoleSelect = (acc: typeof DEMO_ACCOUNTS[0]) => {
    setSelectedRole(acc);
    setError('');
  };
  
  const populateDemo = (acc: typeof DEMO_ACCOUNTS[0]) => {
    setSelectedRole(acc);
    setEmail(acc.email);
    setPassword(acc.password);
    setError('');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email) return setError('Email / Mobile is required.');
    if (!password) return setError('Password is required.');
    
    const belongsToOtherRole = DEMO_ACCOUNTS.some(acc => acc.email === email && acc.id !== selectedRole!.id);
    if (belongsToOtherRole) {
      return setError('Selected role does not match this account.');
    }

    setLoading(true);

    try {
      setTimeout(() => {
        try {
          const apiRole = selectedRole!.id === 'cook' ? 'staff' : selectedRole!.id;
          const user = api.login({ email, password, expectedRole: apiRole as any });
          setSession(user);
          
          let dashboardRoute = `/${user.role}/dashboard`;
          if (user.role === 'staff') {
             dashboardRoute = '/staff/dashboard';
          }
          router.push(dashboardRoute);
        } catch (err) {
          setError((err as Error).message || 'Invalid credentials');
          setLoading(false);
        }
      }, 800);
    } catch (err) {
      setError((err as Error).message || 'Invalid credentials');
      setLoading(false);
    }
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail) return;
    setForgotSent(true);
    setTimeout(() => {
      setShowForgotModal(false);
      setForgotSent(false);
      setForgotEmail('');
    }, 2500);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[var(--bg-page)] text-[var(--text-primary)] font-sans selection:bg-[var(--primary-subtle)]">
      
      {/* Left side: Premium Branded Visual Area */}
      <div className="lg:w-[45%] relative hidden lg:flex flex-col justify-center items-center overflow-hidden bg-[var(--primary)] text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-hover)] to-[var(--primary)] opacity-90"></div>
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-[#4F46E5] blur-[120px] mix-blend-screen opacity-40"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#818CF8] blur-[100px] mix-blend-screen opacity-30"></div>
        
        <div className="relative z-10 p-12 text-center max-w-lg">
          <div className="mb-8 flex justify-center">
             <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 shadow-xl">
               <Shield className="w-8 h-8 text-white" />
             </div>
          </div>
          <h1 className="text-4xl font-extrabold mb-4 tracking-tight">SmartPG</h1>
          <h2 className="text-xl font-medium text-blue-100 mb-6 opacity-90">Smart PG Management Platform</h2>
          <p className="text-base text-blue-200 leading-relaxed font-light">
            Manage properties, rooms, residents, rent and daily PG operations from one centralized place.
          </p>
        </div>
      </div>

      {/* Right side: Login Form */}
      <div className="w-full lg:w-[55%] flex flex-col justify-center px-6 py-8 sm:px-12 md:px-20 lg:px-24 relative z-10">
        
        <div className="absolute top-6 right-6"><ThemeToggle /></div>
        
        {/* Mobile Logo */}
        <div className="lg:hidden mb-8 text-center flex flex-col items-center mt-8">
           <div className="w-12 h-12 bg-[var(--primary)] rounded-xl flex items-center justify-center shadow-lg mb-3">
             <Shield className="w-6 h-6 text-white" />
           </div>
           <h1 className="text-2xl font-bold text-[var(--primary)]">SmartPG</h1>
        </div>

        <div className="w-full max-w-md mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-[var(--text-primary)] tracking-tight mb-2">Welcome Back</h2>
            <p className="text-[var(--text-secondary)] text-sm">Sign in to continue</p>
          </div>
          
          {/* Role Selector */}
          <div className="mb-8 overflow-x-auto pb-2 -mx-2 px-2 sm:mx-0 sm:px-0" style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
             <div className="flex sm:grid sm:grid-cols-2 gap-3 min-w-max sm:min-w-0" style={{ '&::-webkit-scrollbar': { display: 'none' } } as any}>
               {DEMO_ACCOUNTS.map((acc) => {
                 const isSelected = selectedRole!.id === acc.id;
                 return (
                   <button
                     key={acc.id}
                     type="button"
                     onClick={() => handleRoleSelect(acc)}
                     className={`flex flex-col items-start p-3 rounded-xl border text-left transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--border-focus)] focus:ring-offset-1 w-36 sm:w-auto ${
                       isSelected 
                         ? 'border-[var(--primary)] bg-[var(--primary-subtle)] shadow-sm' 
                         : 'border-[var(--border)] bg-[var(--bg-card)] hover:border-[var(--border-focus)] hover:bg-[var(--bg-page)]'
                     }`}
                   >
                     <div className="flex items-center justify-between w-full mb-2">
                       <acc.icon className={`w-5 h-5 ${isSelected ? 'text-[var(--primary)]' : 'text-[var(--text-disabled)]'}`} />
                       {isSelected && <CheckCircle2 className="w-4 h-4 text-[var(--primary)]" />}
                     </div>
                     <span className={`text-sm font-semibold mb-0.5 ${isSelected ? 'text-[var(--primary)]' : 'text-[var(--text-primary)]'}`}>
                       {acc.label}
                     </span>
                     <span className={`text-[10px] leading-tight ${isSelected ? 'text-[var(--primary)] opacity-80' : 'text-[var(--text-secondary)]'}`}>
                       {acc.desc}
                     </span>
                   </button>
                 );
               })}
             </div>
          </div>

          <form className="space-y-5" onSubmit={handleLogin} noValidate>
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
                Email / Mobile
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border)] rounded-lg text-[var(--text-primary)] placeholder-[var(--text-disabled)] focus:outline-none focus:border-[var(--border-focus)] focus:ring-1 focus:ring-[var(--border-focus)] transition-colors"
                placeholder="Enter your email or mobile"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border)] rounded-lg text-[var(--text-primary)] placeholder-[var(--text-disabled)] focus:outline-none focus:border-[var(--border-focus)] focus:ring-1 focus:ring-[var(--border-focus)] transition-colors pr-12"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-[var(--text-disabled)] hover:text-[var(--text-secondary)] focus:outline-none rounded-r-lg"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-[var(--border)] text-[var(--primary)] focus:ring-[var(--border-focus)] cursor-pointer" 
                />
                <span className="ml-2 text-sm text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">Remember Me</span>
              </label>
              <button 
                type="button" 
                onClick={() => setShowForgotModal(true)}
                className="text-sm font-medium text-[var(--primary)] hover:text-[var(--primary-hover)] transition-colors focus:outline-none focus:underline"
              >
                Forgot Password?
              </button>
            </div>

            {error && (
              <div className="text-sm bg-[var(--danger-bg)] text-[var(--danger)] border border-[var(--danger)]/20 p-3 rounded-lg flex items-center gap-2 animate-in fade-in slide-in-from-top-1 duration-200">
                <AlertCircle className="w-4 h-4 shrink-0" /> 
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-lg font-semibold text-white bg-[var(--primary)] hover:bg-[var(--primary-hover)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--border-focus)] disabled:opacity-70 disabled:cursor-not-allowed transition-all shadow-sm mt-2 flex justify-center items-center"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Signing in...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
          
          {/* Demo Accounts Helper */}
          <div className="mt-12 pt-6 border-t border-[var(--border)]">
             <div className="text-xs font-semibold text-[var(--text-disabled)] uppercase tracking-wider mb-3">Demo Accounts</div>
             <div className="flex flex-wrap gap-2">
               {DEMO_ACCOUNTS.map((acc) => (
                 <button
                   key={`demo-${acc.id}`}
                   type="button"
                   onClick={() => populateDemo(acc)}
                   className="text-xs px-2.5 py-1.5 rounded bg-[var(--bg-overlay)] text-[var(--text-secondary)] hover:bg-[var(--bg-input)] hover:text-[var(--text-primary)] border border-transparent hover:border-[var(--border)] transition-colors"
                 >
                   {acc.label}
                 </button>
               ))}
             </div>
          </div>
          
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[var(--bg-page)]/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[var(--bg-card)] rounded-2xl shadow-xl w-full max-w-md border border-[var(--border)] overflow-hidden animate-in zoom-in-95 duration-200">
             <div className="flex justify-between items-center p-5 border-b border-[var(--border)]">
               <h3 className="font-semibold text-lg flex items-center gap-2 text-[var(--text-primary)]">
                 <Lock className="w-5 h-5 text-[var(--primary)]" />
                 Password Reset
               </h3>
               <button onClick={() => setShowForgotModal(false)} className="text-[var(--text-disabled)] hover:text-[var(--text-primary)] rounded-full p-1 transition-colors">
                 <X className="w-5 h-5" />
               </button>
             </div>
             
             <div className="p-6">
               {forgotSent ? (
                 <div className="text-center py-6">
                   <div className="w-12 h-12 rounded-full bg-[var(--success-bg)] flex items-center justify-center mx-auto mb-4">
                     <CheckCircle2 className="w-6 h-6 text-[var(--success)]" />
                   </div>
                   <h4 className="text-lg font-medium text-[var(--text-primary)] mb-2">Check your email</h4>
                   <p className="text-[var(--text-secondary)] text-sm">
                     We've sent a password reset link to your email address. (Demo behavior only)
                   </p>
                 </div>
               ) : (
                 <form onSubmit={handleForgotSubmit}>
                   <p className="text-sm text-[var(--text-secondary)] mb-4">
                     Enter your email or mobile number associated with your account and we'll send you a link to reset your password.
                   </p>
                   <div className="mb-5">
                     <label className="block text-sm font-medium text-[var(--text-primary)] mb-1.5">Email / Mobile</label>
                     <input
                        type="text"
                        required
                        value={forgotEmail}
                        onChange={e => setForgotEmail(e.target.value)}
                        className="w-full px-4 py-2.5 bg-[var(--bg-input)] border border-[var(--border)] rounded-lg text-[var(--text-primary)] focus:outline-none focus:border-[var(--border-focus)] focus:ring-1 focus:ring-[var(--border-focus)]"
                        placeholder="name@example.com"
                     />
                   </div>
                   <div className="flex gap-3">
                     <button
                       type="button"
                       onClick={() => setShowForgotModal(false)}
                       className="flex-1 py-2.5 px-4 rounded-lg font-medium bg-[var(--bg-overlay)] text-[var(--text-primary)] hover:bg-[var(--bg-input)] transition-colors border border-[var(--border)]"
                     >
                       Cancel
                     </button>
                     <button
                       type="submit"
                       className="flex-1 py-2.5 px-4 rounded-lg font-medium text-white bg-[var(--primary)] hover:bg-[var(--primary-hover)] focus:ring-2 focus:ring-offset-2 focus:ring-[var(--border-focus)] transition-colors shadow-sm"
                     >
                       Continue
                     </button>
                   </div>
                 </form>
               )}
             </div>
          </div>
        </div>
      )}
      
    </div>
  );
}
