'use client';

import React, { useState } from 'react';
import { 
  Shield, 
  KeyRound, 
  Smartphone, 
  History, 
  Monitor,
  Laptop,
  AlertTriangle,
  LogOut,
  CheckCircle2,
  Mail
} from 'lucide-react';

export default function SecurityPage() {
  const [isPasswordSaved, setIsPasswordSaved] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.new !== passwordForm.confirm) {
      alert("Passwords do not match");
      return;
    }
    setIsPasswordSaved(true);
    setPasswordForm({ current: '', new: '', confirm: '' });
    setTimeout(() => setIsPasswordSaved(false), 3000);
  };

  const handleForgotPassword = () => {
    alert("Password reset link has been sent to your registered mobile and email.");
  };

  return (
    <div className="w-full space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary/10 rounded-xl">
            <Shield className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-primary tracking-tight">Security & Login</h1>
            <p className="text-sm text-secondary">Manage passwords and active sessions</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Column: Passwords */}
        <div className="space-y-6">
          
          {/* Change Password Card */}
          <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
            <div className="p-5 border-b border-border bg-page/30 flex items-center justify-between">
              <h2 className="text-base font-bold text-primary flex items-center gap-2">
                <KeyRound className="w-5 h-5 text-primary" /> Change Password
              </h2>
              {isPasswordSaved && (
                <span className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-md">
                  <CheckCircle2 className="w-3 h-3" /> Updated
                </span>
              )}
            </div>
            
            <form onSubmit={handlePasswordSubmit} className="p-5 space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-primary">Current Password</label>
                <input 
                  type="password" 
                  required
                  value={passwordForm.current}
                  onChange={(e) => setPasswordForm({...passwordForm, current: e.target.value})}
                  placeholder="Enter current password"
                  className="w-full bg-page border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary text-primary transition-colors" 
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-primary">New Password</label>
                <input 
                  type="password" 
                  required
                  value={passwordForm.new}
                  onChange={(e) => setPasswordForm({...passwordForm, new: e.target.value})}
                  placeholder="Enter new password"
                  className="w-full bg-page border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary text-primary transition-colors" 
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-primary">Confirm New Password</label>
                <input 
                  type="password" 
                  required
                  value={passwordForm.confirm}
                  onChange={(e) => setPasswordForm({...passwordForm, confirm: e.target.value})}
                  placeholder="Confirm new password"
                  className="w-full bg-page border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary text-primary transition-colors" 
                />
              </div>
              
              <div className="pt-2">
                <button 
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-2.5 rounded-lg text-sm transition-all shadow-sm"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>

          {/* Forgot Password Card */}
          <div className="bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-800 rounded-xl p-5 shadow-sm">
            <h3 className="text-base font-bold text-orange-900 dark:text-orange-300 flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-orange-600" /> Forgot Password?
            </h3>
            <p className="text-sm text-orange-800 dark:text-orange-400 mb-4 leading-relaxed">
              If you forgot your password, you can request a reset link. It will be sent to your registered mobile number and email.
            </p>
            <button 
              type="button"
              onClick={handleForgotPassword}
              className="bg-white dark:bg-black/20 border border-orange-300 dark:border-orange-700 text-orange-700 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-900/40 px-4 py-2 rounded-lg text-sm font-bold transition-colors shadow-sm flex items-center gap-2"
            >
              <Mail className="w-4 h-4" /> Send Reset Link
            </button>
          </div>

        </div>

        {/* Right Column: Sessions & History */}
        <div className="space-y-6">
          
          {/* Active Sessions */}
          <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-border bg-page/30">
              <h2 className="text-sm font-bold text-primary flex items-center gap-2">
                <Monitor className="w-4 h-4 text-primary" /> Active Sessions
              </h2>
            </div>
            <div className="divide-y divide-border">
              <div className="p-4 flex items-center justify-between hover:bg-page/20 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0">
                    <Laptop className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary">Windows • Chrome</h4>
                    <p className="text-xs font-medium text-secondary flex items-center gap-1 mt-0.5">
                      <span className="w-2 h-2 rounded-full bg-green-500"></span> Current Session
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 flex items-center justify-between hover:bg-page/20 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-page border border-border text-secondary flex items-center justify-center shrink-0">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary">Android • App</h4>
                    <p className="text-xs font-medium text-secondary mt-0.5">Last active: 2 hours ago</p>
                  </div>
                </div>
                <button className="text-xs font-bold text-danger bg-danger-bg hover:bg-danger/20 px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 border border-danger/20">
                  <LogOut className="w-3.5 h-3.5" /> Logout
                </button>
              </div>
            </div>
          </div>

          {/* Login History */}
          <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-border bg-page/30">
              <h2 className="text-sm font-bold text-primary flex items-center gap-2">
                <History className="w-4 h-4 text-primary" /> Recent Login History
              </h2>
            </div>
            <div className="p-2">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <tbody className="divide-y divide-border text-primary">
                  <tr className="hover:bg-page/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="font-bold text-primary">04 Oct 2026</div>
                      <div className="text-[10px] text-secondary font-medium">10:24 AM</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-semibold text-primary">192.168.1.45</div>
                      <div className="text-[10px] text-secondary">Noida, IN</div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="text-xs font-bold text-green-600">Success</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-page/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="font-bold text-primary">03 Oct 2026</div>
                      <div className="text-[10px] text-secondary font-medium">05:15 PM</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-semibold text-primary">192.168.1.12</div>
                      <div className="text-[10px] text-secondary">Delhi, IN</div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="text-xs font-bold text-green-600">Success</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-page/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="font-bold text-primary">02 Oct 2026</div>
                      <div className="text-[10px] text-secondary font-medium">11:05 PM</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-semibold text-primary">10.0.0.1</div>
                      <div className="text-[10px] text-secondary">Unknown</div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="text-xs font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded">Failed</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
