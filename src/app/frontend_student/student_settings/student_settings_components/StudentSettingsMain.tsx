'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  User, Key, Smartphone, Mail, Shield, History, Bell, Lock, 
  LogOut, ShieldAlert, MonitorSmartphone, CheckCircle2, ChevronRight,
  Fingerprint
} from 'lucide-react';
import { toast } from 'sonner';

export function StudentSettingsMain() {
  const searchParams = useSearchParams();
  const initialView = searchParams?.get('view') || 'profile';
  const [activeTab, setActiveTab] = useState(initialView);

  const handleLogout = () => {
    toast.success('Logged out successfully');
  };

  const tabs = [
    { id: 'profile', icon: User, label: 'My Profile' },
    { id: 'password', icon: Key, label: 'Change Password' },
    { id: 'verification', icon: CheckCircle2, label: 'Verification (Email/Mobile)' },
    { id: '2fa', icon: Shield, label: '2FA & OTP Security' },
    { id: 'sessions', icon: MonitorSmartphone, label: 'Active Sessions & Devices' },
    { id: 'login-history', icon: History, label: 'Login History' },
    { id: 'notifications', icon: Bell, label: 'Notification Preferences' },
    { id: 'privacy', icon: Lock, label: 'Privacy' },
  ];

  const [settings, setSettings] = useState({
    emailNotif: true,
    smsNotif: false,
    pushNotif: true,
    showProfileToRoommates: true,
    twoFactorAuth: false
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    toast.success('Settings updated');
  };

  return (
    <div className="w-full max-w-6xl mx-auto pb-12">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-black text-primary flex items-center gap-2">
          <ShieldAlert className="w-8 h-8 text-primary" /> Profile & Security
        </h1>
        <p className="text-sm text-secondary mt-1">Manage your account details, security settings, and preferences.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Menu */}
        <div className="w-full md:w-72 shrink-0 space-y-2">
          <div className="bg-card border border-border rounded-xl p-2 shadow-sm">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center justify-between p-3 rounded-lg text-sm font-bold transition-all ${
                  activeTab === tab.id 
                    ? 'bg-primary text-white shadow-md' 
                    : 'text-secondary hover:bg-input hover:text-primary'
                }`}
              >
                <div className="flex items-center gap-3">
                  <tab.icon className="w-4 h-4" /> {tab.label}
                </div>
                {activeTab === tab.id && <ChevronRight className="w-4 h-4" />}
              </button>
            ))}
            <div className="my-2 border-t border-border mx-2"></div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 p-3 rounded-lg text-sm font-bold text-danger hover:bg-danger/10 transition-colors"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-card border border-border rounded-xl shadow-sm min-h-[500px]">
          
          {/* PROFILE */}
          {activeTab === 'profile' && (
            <div className="p-6 animate-in fade-in duration-300">
              <h2 className="text-xl font-bold text-primary mb-6 flex items-center gap-2 border-b border-border pb-4">
                <User className="w-5 h-5 text-primary" /> My Profile
              </h2>
              <div className="space-y-4 max-w-md">
                <div>
                  <label className="block text-xs font-bold text-secondary uppercase mb-1">Full Name</label>
                  <input type="text" defaultValue="Rahul Sharma" className="w-full bg-input border border-border rounded-lg px-4 py-2 text-sm text-primary font-medium focus:outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-secondary uppercase mb-1">Date of Birth</label>
                  <input type="date" defaultValue="2002-05-15" className="w-full bg-input border border-border rounded-lg px-4 py-2 text-sm text-primary font-medium focus:outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-secondary uppercase mb-1">Emergency Contact</label>
                  <input type="text" defaultValue="+91 9876543210" className="w-full bg-input border border-border rounded-lg px-4 py-2 text-sm text-primary font-medium focus:outline-none focus:border-primary" />
                </div>
                <button className="bg-primary text-white font-bold text-sm px-6 py-2.5 rounded-lg shadow-md hover:bg-primary/90 transition-colors mt-4">
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* PASSWORD */}
          {activeTab === 'password' && (
            <div className="p-6 animate-in fade-in duration-300">
              <h2 className="text-xl font-bold text-primary mb-6 flex items-center gap-2 border-b border-border pb-4">
                <Key className="w-5 h-5 text-primary" /> Change Password
              </h2>
              <div className="space-y-4 max-w-md">
                <div>
                  <label className="block text-xs font-bold text-secondary uppercase mb-1">Current Password</label>
                  <input type="password" placeholder="••••••••" className="w-full bg-input border border-border rounded-lg px-4 py-2 text-sm text-primary font-medium focus:outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-secondary uppercase mb-1">New Password</label>
                  <input type="password" placeholder="••••••••" className="w-full bg-input border border-border rounded-lg px-4 py-2 text-sm text-primary font-medium focus:outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-secondary uppercase mb-1">Confirm New Password</label>
                  <input type="password" placeholder="••••••••" className="w-full bg-input border border-border rounded-lg px-4 py-2 text-sm text-primary font-medium focus:outline-none focus:border-primary" />
                </div>
                <div className="flex items-center justify-between mt-6">
                  <button className="bg-primary text-white font-bold text-sm px-6 py-2.5 rounded-lg shadow-md hover:bg-primary/90 transition-colors">
                    Update Password
                  </button>
                  <button className="text-sm font-bold text-primary hover:underline">
                    Forgot Password?
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* VERIFICATION */}
          {activeTab === 'verification' && (
            <div className="p-6 animate-in fade-in duration-300">
              <h2 className="text-xl font-bold text-primary mb-6 flex items-center gap-2 border-b border-border pb-4">
                <CheckCircle2 className="w-5 h-5 text-primary" /> Mobile & Email Verification
              </h2>
              <div className="space-y-6 max-w-lg">
                <div className="bg-input/50 border border-border rounded-xl p-5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-success/10 text-success flex items-center justify-center">
                      <Smartphone className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-primary text-sm">Mobile Number</h4>
                      <p className="text-xs text-secondary font-medium">+91 9999988888</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold bg-success text-white px-3 py-1 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Verified
                  </span>
                </div>

                <div className="bg-input/50 border border-border rounded-xl p-5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-warning/10 text-warning flex items-center justify-center">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-primary text-sm">Email Address</h4>
                      <p className="text-xs text-secondary font-medium">rahul@example.com</p>
                    </div>
                  </div>
                  <button className="text-xs font-bold bg-primary text-white px-4 py-1.5 rounded-full hover:bg-primary/90 transition-colors">
                    Verify Now
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 2FA */}
          {activeTab === '2fa' && (
            <div className="p-6 animate-in fade-in duration-300">
              <h2 className="text-xl font-bold text-primary mb-6 flex items-center gap-2 border-b border-border pb-4">
                <Shield className="w-5 h-5 text-primary" /> Two-Factor Authentication (2FA)
              </h2>
              <div className="max-w-lg">
                <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 text-center mb-6">
                  <Fingerprint className="w-12 h-12 text-primary mx-auto mb-3" />
                  <h3 className="font-bold text-primary mb-2">Secure Your Account</h3>
                  <p className="text-sm text-secondary mb-4">Add an extra layer of security to your account. We'll ask for an OTP every time you log in from a new device.</p>
                  <button 
                    onClick={() => toggleSetting('twoFactorAuth')}
                    className={`font-bold text-sm px-6 py-2.5 rounded-lg transition-colors w-full ${settings.twoFactorAuth ? 'bg-danger text-white' : 'bg-primary text-white shadow-md'}`}
                  >
                    {settings.twoFactorAuth ? 'Disable 2FA' : 'Enable 2FA via SMS OTP'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* SESSIONS & DEVICES */}
          {activeTab === 'sessions' && (
            <div className="p-6 animate-in fade-in duration-300">
              <h2 className="text-xl font-bold text-primary mb-6 flex items-center gap-2 border-b border-border pb-4">
                <MonitorSmartphone className="w-5 h-5 text-primary" /> Active Sessions & Devices
              </h2>
              <div className="space-y-4">
                <div className="bg-card border-2 border-primary/20 rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-primary flex items-center gap-2 text-sm">
                      Windows 11 - Chrome 
                      <span className="text-[10px] bg-success text-white px-2 py-0.5 rounded-md uppercase tracking-wider">Current</span>
                    </h4>
                    <p className="text-xs text-secondary mt-1">IP: 192.168.1.5 • Last active: Just now</p>
                  </div>
                </div>
                <div className="bg-input/30 border border-border rounded-xl p-4 flex items-center justify-between group">
                  <div>
                    <h4 className="font-bold text-primary text-sm">iPhone 13 - Safari</h4>
                    <p className="text-xs text-secondary mt-1">IP: 103.45.67.89 • Last active: 2 hours ago</p>
                  </div>
                  <button className="text-xs font-bold text-danger border border-danger px-3 py-1.5 rounded-lg hover:bg-danger hover:text-white transition-colors">
                    Revoke
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* LOGIN HISTORY */}
          {activeTab === 'login-history' && (
            <div className="p-6 animate-in fade-in duration-300">
              <h2 className="text-xl font-bold text-primary mb-6 flex items-center gap-2 border-b border-border pb-4">
                <History className="w-5 h-5 text-primary" /> Login History
              </h2>
              <div className="space-y-0 border border-border rounded-xl overflow-hidden divide-y divide-border">
                {[
                  { device: 'Windows 11', browser: 'Chrome', time: '03 Oct 2026, 10:30 AM', status: 'Success' },
                  { device: 'iPhone 13', browser: 'Safari', time: '01 Oct 2026, 08:15 PM', status: 'Success' },
                  { device: 'Unknown Device', browser: 'Firefox', time: '28 Sep 2026, 02:45 AM', status: 'Failed' },
                ].map((log, i) => (
                  <div key={i} className="p-4 bg-card hover:bg-input/50 transition-colors flex items-center justify-between">
                    <div>
                      <p className="font-bold text-primary text-sm">{log.device} <span className="text-secondary font-medium">• {log.browser}</span></p>
                      <p className="text-xs text-secondary mt-1">{log.time}</p>
                    </div>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-md ${log.status === 'Success' ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}`}>
                      {log.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* NOTIFICATIONS */}
          {activeTab === 'notifications' && (
            <div className="p-6 animate-in fade-in duration-300">
              <h2 className="text-xl font-bold text-primary mb-6 flex items-center gap-2 border-b border-border pb-4">
                <Bell className="w-5 h-5 text-primary" /> Notification Preferences
              </h2>
              <div className="space-y-6 max-w-lg">
                {[
                  { id: 'pushNotif', label: 'Push Notifications', desc: 'Receive alerts for rent dues and important notices on your device.' },
                  { id: 'emailNotif', label: 'Email Alerts', desc: 'Get monthly rent invoices and payment receipts via email.' },
                  { id: 'smsNotif', label: 'SMS Alerts', desc: 'Get critical updates like water/electricity cutoff via SMS.' }
                ].map((item) => (
                  <div key={item.id} className="flex items-center justify-between bg-input/20 border border-border p-4 rounded-xl">
                    <div>
                      <h4 className="font-bold text-primary text-sm">{item.label}</h4>
                      <p className="text-xs text-secondary mt-1 max-w-[280px]">{item.desc}</p>
                    </div>
                    <button 
                      onClick={() => toggleSetting(item.id as keyof typeof settings)}
                      className={`w-12 h-6 rounded-full relative transition-colors shrink-0 ${settings[item.id as keyof typeof settings] ? 'bg-primary' : 'bg-border'}`}
                    >
                      <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${settings[item.id as keyof typeof settings] ? 'left-7' : 'left-1'}`}></div>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PRIVACY */}
          {activeTab === 'privacy' && (
            <div className="p-6 animate-in fade-in duration-300">
              <h2 className="text-xl font-bold text-primary mb-6 flex items-center gap-2 border-b border-border pb-4">
                <Lock className="w-5 h-5 text-primary" /> Privacy Settings
              </h2>
              <div className="space-y-6 max-w-lg">
                <div className="flex items-center justify-between bg-input/20 border border-border p-4 rounded-xl">
                  <div>
                    <h4 className="font-bold text-primary text-sm">Profile Visibility</h4>
                    <p className="text-xs text-secondary mt-1">Allow roommates to view your basic profile (Phone number, Course).</p>
                  </div>
                  <button 
                    onClick={() => toggleSetting('showProfileToRoommates')}
                    className={`w-12 h-6 rounded-full relative transition-colors shrink-0 ${settings.showProfileToRoommates ? 'bg-primary' : 'bg-border'}`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${settings.showProfileToRoommates ? 'left-7' : 'left-1'}`}></div>
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
