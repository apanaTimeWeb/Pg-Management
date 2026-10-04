// @ts-nocheck
// RESPONSIBILITY: Renders the ManagerDashboardHeader component.
import { CheckCircle2, TrendingUp, Building2, MapPin } from 'lucide-react';

interface ManagerUser {
  name?: string;
  id?: string;
}

interface ManagerProperty {
  id: string;
  name?: string;
  city?: string;
}

interface ManagerDashboardHeaderProps {
  user: unknown;
  selectedProp: unknown;
  isPresent: boolean;
  handleMarkPresent: () => void;
}

export function ManagerDashboardHeader({ user, selectedProp, isPresent, handleMarkPresent }: ManagerDashboardHeaderProps) {
  const typedUser = user as ManagerUser | null;
  const typedProp = selectedProp as ManagerProperty | undefined;
  
  const dateOptions: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const todayDate = new Date().toLocaleDateString('en-IN', dateOptions);
  
  const currentHour = new Date().getHours();
  let greeting = 'Good Evening';
  if (currentHour < 12) greeting = 'Good Morning';
  else if (currentHour < 17) greeting = 'Good Afternoon';

  const managerName = typedUser?.name || 'Manager';
  const propertyName = typedProp?.name || 'Loading Property...';

  return (
    <div className="bg-gradient-to-r from-theme-primary to-theme-primary-hover text-white rounded-3xl p-8 shadow-lg relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-700">
        <Building2 className="w-40 h-40" />
      </div>
      <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black mb-2 flex items-center gap-3">
            {greeting}, {managerName} 👋
          </h1>
          <p className="text-white/80 font-medium max-w-xl flex items-center gap-2">
            {todayDate}
            <span className="hidden md:inline">•</span>
            <span className="flex items-center gap-1 font-bold text-white bg-white/20 px-2 py-0.5 rounded-md"><MapPin className="w-3 h-3" /> {propertyName}</span>
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Performance Score */}
          <div className="hidden sm:flex flex-col items-end mr-4 pr-4 border-r border-white/20">
            <span className="text-xs font-bold text-white/80 uppercase mb-1">Performance Score</span>
            <div className="flex items-center gap-1.5 bg-white/20 px-2 py-0.5 rounded-lg">
              <TrendingUp className="w-4 h-4 text-success-text" />
              <span className="text-lg font-black text-white">92/100</span>
            </div>
          </div>

          {isPresent ? (
            <div className="flex items-center gap-2 bg-success text-white border border-white/20 px-5 py-3 rounded-xl shadow-md">
              <CheckCircle2 className="w-5 h-5" />
              <div>
                <p className="text-[10px] font-bold uppercase opacity-80 leading-none mb-0.5">Attendance</p>
                <p className="text-sm font-black leading-none">Marked Present</p>
              </div>
            </div>
          ) : (
            <button 
              onClick={handleMarkPresent}
              className="bg-white text-indigo-900 hover:bg-white/90 px-6 py-3 rounded-xl font-black text-sm motion-safe:transition-colors shadow-lg flex items-center gap-2 keep-white"
            >
              <CheckCircle2 className="w-5 h-5" /> Mark Present Today
            </button>
          )}
        </div>
      </div>
    </div>
  );
}