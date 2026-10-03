'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Briefcase, Users, Utensils, UserCheck, Eye, EyeOff, CheckCircle2, Lock, X, AlertCircle, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { authApi as api } from '@/app/frontend_login/login_lib/login_api/LoginAuth';
import { setSession } from '@/app/frontend_login/login_lib/login_auth/LoginSession';
import '../globals.css';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

const DEMO_ACCOUNTS = [
  { id: 'superadmin', label: 'SuperAdmin', desc: 'System Admin', email: 'superadmin@gmail.com', password: 'Super@123', icon: Shield },
  { id: 'owner', label: 'Owner', desc: 'PG Owner', email: 'owner@gmail.com', password: 'Owner3@123', icon: Briefcase },
  { id: 'manager', label: 'Manager', desc: 'Operations', email: 'manager3@gmail.com', password: 'Manager@123', icon: Users },
  { id: 'cook', label: 'Cook', desc: 'Food & Mess', email: 'cook3@gmail.com', password: 'Cook@123', icon: Utensils },
  { id: 'student', label: 'Student', desc: 'Resident', email: 'student3@gmail.com', password: 'Student@123', icon: UserCheck }
];

export default function UnifiedLogin() {
  const router = useRouter();
  
  const [selectedRole, setSelectedRole] = useState(DEMO_ACCOUNTS[0]!);
  const [email, setEmail] = useState(DEMO_ACCOUNTS[0]!.email);
  const [password, setPassword] = useState(DEMO_ACCOUNTS[0]!.password);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  const handleRoleSelect = (acc: typeof DEMO_ACCOUNTS[0]) => {
    setSelectedRole(acc);
    setEmail(acc.email);
    setPassword(acc.password);
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
          
          const dashboardRoute = `/frontend_${user.role}/${user.role}_dashboard`;
          router.push(dashboardRoute);
        } catch (err) {
          setError((err as Error).message || 'Invalid credentials');
          setLoading(false);
        }
      }, 1000);
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
    <div className="min-h-screen flex text-primary selection:bg-[var(--primary)] selection:text-white font-sans bg-page relative overflow-hidden">
      
      {/* Dynamic Background Elements for Mobile */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[120px] mix-blend-screen opacity-50 lg:hidden pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-600/20 blur-[100px] mix-blend-screen opacity-50 lg:hidden pointer-events-none"></div>

      {/* Left side: Premium Image Panel */}
      <div className="hidden lg:flex lg:w-[45%] relative flex-col justify-between overflow-hidden p-12">
        <div className="absolute inset-0">
          <Image 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop" 
            alt="Modern PG Interior" 
            fill 
            className="object-cover scale-105 hover:scale-110 transition-transform duration-[20s] ease-out"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-gray-900/40 to-gray-900/20"></div>
          {/* Glassmorphic Overlay gradient */}
          <div className="absolute inset-0 bg-[var(--primary)]/10 backdrop-blur-[2px]"></div>
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 shadow-2xl">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white tracking-tight">SmartPG</span>
          </div>
        </div>

        <div className="relative z-10 mb-8 max-w-md">
          <div className="inline-block px-3 py-1 mb-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-xs font-semibold tracking-wide uppercase">
            Next-Gen Property Management
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-[1.1] tracking-tight">
            Elevate your <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">residential experience.</span>
          </h1>
          <p className="text-lg text-gray-300 font-light leading-relaxed">
            A unified platform to seamlessly manage properties, automate rent collections, and enhance resident satisfaction.
          </p>
        </div>
      </div>

      {/* Right side: Login Form */}
      <div className="w-full lg:w-[55%] flex flex-col justify-center px-6 py-12 sm:px-12 md:px-20 lg:px-28 relative z-10">
        
        <div className="absolute top-6 right-6 lg:right-10 z-50">
          <ThemeToggle />
        </div>
        
        {/* Mobile Header */}
        <div className="lg:hidden mb-10 mt-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[var(--primary)] to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <span className="text-2xl font-bold tracking-tight">SmartPG</span>
        </div>

        <div className="w-full max-w-[440px] mx-auto lg:mx-0">
          <div className="mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Welcome back</h2>
            <p className="text-secondary text-base">Please enter your details to sign in.</p>
          </div>
          
          {/* Role Selector - Modern Pills */}
          <div className="mb-8 animate-in fade-in slide-in-from-bottom-5 duration-700 delay-100">
             <div className="flex flex-wrap gap-2">
               {DEMO_ACCOUNTS.map((acc) => {
                 const isSelected = selectedRole!.id === acc.id;
                 return (
                   <button
                     key={acc.id}
                     type="button"
                     onClick={() => handleRoleSelect(acc)}
                     className={`group flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border ${
                       isSelected 
                         ? 'border-[var(--primary)] bg-[var(--primary)] text-white shadow-md shadow-[var(--primary)]/20 scale-105' 
                         : 'border-border bg-transparent text-secondary hover:border-[var(--text-disabled)] hover:bg-[var(--bg-overlay)]'
                     }`}
                   >
                     <acc.icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-[var(--text-disabled)] group-hover:text-primary transition-colors'}`} />
                     {acc.label}
                   </button>
                 );
               })}
             </div>
          </div>

          <form className="space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200" onSubmit={handleLogin} noValidate>
            <div className="space-y-1">
              <label className="block text-sm font-semibold text-primary">
                Email / Mobile
              </label>
              <div className="relative group">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-4 py-3.5 bg-transparent border-2 border-border rounded-xl text-primary placeholder-[var(--text-disabled)] focus:outline-none focus:border-[var(--primary)] transition-colors"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-semibold text-primary">
                  Password
                </label>
                <button 
                  type="button" 
                  onClick={() => setShowForgotModal(true)}
                  className="text-sm font-medium text-[var(--primary)] hover:text-[var(--primary-hover)] transition-colors"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative group">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full px-4 py-3.5 bg-transparent border-2 border-border rounded-xl text-primary placeholder-[var(--text-disabled)] focus:outline-none focus:border-[var(--primary)] transition-colors pr-12"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-[var(--text-disabled)] hover:text-primary transition-colors focus:outline-none"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center pt-2">
              <label className="flex items-center cursor-pointer group">
                <div className="relative flex items-center">
                  <input 
                    type="checkbox" 
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="peer sr-only" 
                  />
                  <div className="w-5 h-5 border-2 border-border rounded flex items-center justify-center peer-checked:bg-[var(--primary)] peer-checked:border-[var(--primary)] transition-all">
                    <CheckCircle2 className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100" />
                  </div>
                </div>
                <span className="ml-3 text-sm text-secondary group-hover:text-primary transition-colors">Keep me signed in</span>
              </label>
            </div>

            {error && (
              <div className="text-sm bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 p-4 rounded-xl flex items-start gap-3 animate-in fade-in zoom-in-95 duration-200">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" /> 
                <span className="font-medium leading-tight">{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-xl font-bold text-white bg-gradient-to-r from-[var(--primary)] to-indigo-600 hover:to-indigo-500 focus:outline-none focus:ring-4 focus:ring-[var(--primary)]/20 disabled:opacity-70 disabled:cursor-not-allowed transition-all shadow-lg shadow-[var(--primary)]/25 flex justify-center items-center gap-2 group mt-4"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
          
          {/* Demo Accounts Helper - Sleek Design */}
          <div className="mt-12 pt-8 border-t border-border animate-in fade-in duration-1000 delay-300">
             <div className="flex items-center gap-3 mb-4">
               <div className="h-px bg-[var(--border)] flex-1"></div>
               <span className="text-xs font-semibold text-[var(--text-disabled)] uppercase tracking-widest">Quick Demo Login</span>
               <div className="h-px bg-[var(--border)] flex-1"></div>
             </div>
             <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
               {DEMO_ACCOUNTS.map((acc) => (
                 <button
                   key={`demo-${acc.id}`}
                   type="button"
                   onClick={() => populateDemo(acc)}
                   className="flex flex-col items-center justify-center p-3 rounded-xl bg-[var(--bg-overlay)] hover:bg-[var(--bg-input)] border border-border hover:border-[var(--primary)]/50 transition-all group"
                 >
                   <span className="text-sm font-semibold text-primary group-hover:text-[var(--primary)] transition-colors">{acc.label}</span>
                 </button>
               ))}
             </div>
          </div>
          
        </div>
      </div>

      {/* Forgot Password Modal (Glassmorphic) */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-card rounded-3xl shadow-2xl w-full max-w-md border border-border overflow-hidden animate-in zoom-in-95 duration-300">
             <div className="flex justify-between items-center p-6 border-b border-border/50 bg-[var(--bg-overlay)]">
               <div className="w-10 h-10 rounded-full bg-[var(--primary)]/10 flex items-center justify-center">
                 <Lock className="w-5 h-5 text-[var(--primary)]" />
               </div>
               <button onClick={() => setShowForgotModal(false)} className="text-[var(--text-disabled)] hover:text-primary bg-[var(--bg-input)] p-2 rounded-full transition-colors">
                 <X className="w-5 h-5" />
               </button>
             </div>
             
             <div className="p-8">
               <h3 className="font-bold text-2xl mb-2 text-primary">Reset Password</h3>
               
               {forgotSent ? (
                 <div className="text-center py-6 animate-in slide-in-from-right-8 duration-300">
                   <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-5 border border-green-500/20">
                     <CheckCircle2 className="w-8 h-8 text-green-500" />
                   </div>
                   <h4 className="text-xl font-semibold text-primary mb-2">Check your email</h4>
                   <p className="text-secondary text-sm leading-relaxed">
                     We've sent a password reset link to your email address. Please check your inbox.
                   </p>
                 </div>
               ) : (
                 <form onSubmit={handleForgotSubmit} className="animate-in slide-in-from-left-8 duration-300">
                   <p className="text-sm text-secondary mb-6 leading-relaxed">
                     Enter your email or mobile number and we'll send you a link to securely reset your password.
                   </p>
                   <div className="mb-6">
                     <input
                        type="text"
                        required
                        value={forgotEmail}
                        onChange={e => setForgotEmail(e.target.value)}
                        className="w-full px-4 py-3.5 bg-[var(--bg-input)] border-2 border-border rounded-xl text-primary focus:outline-none focus:border-[var(--primary)] transition-colors"
                        placeholder="name@example.com"
                     />
                   </div>
                   <button
                     type="submit"
                     className="w-full py-3.5 px-4 rounded-xl font-bold text-white bg-[var(--primary)] hover:bg-[var(--primary-hover)] transition-colors shadow-lg shadow-[var(--primary)]/20"
                   >
                     Send Reset Link
                   </button>
                 </form>
               )}
             </div>
          </div>
        </div>
      )}
      
    </div>
  );
}

