import { History, UserPlus, FileText, CheckCircle2 } from 'lucide-react';

export function ManagerDashboardActivity() {
  const activities = [
    { id: 1, type: 'registration', text: 'Rahul Sharma registered as new student.', time: '10 mins ago', icon: UserPlus, color: 'text-info', bg: 'bg-info-bg' },
    { id: 2, type: 'payment', text: 'Rent payment of ₹8,000 received from Room 201.', time: '1 hour ago', icon: CheckCircle2, color: 'text-success', bg: 'bg-success-bg' },
    { id: 3, type: 'complaint', text: 'New plumbing complaint logged for Room 105.', time: '3 hours ago', icon: FileText, color: 'text-danger', bg: 'bg-danger-bg' },
  ];

  return (
    <div className="h-full flex flex-col relative z-10">
      <div className="absolute top-0 right-0 p-4 opacity-5"><History className="w-32 h-32 text-secondary" /></div>
      
      <div className="flex items-center justify-between border-b border-border/50 pb-4 mb-4 relative z-10">
        <h3 className="font-black text-primary text-lg flex items-center gap-2">
          <div className="p-1.5 bg-secondary/10 rounded-lg text-secondary"><History className="w-5 h-5" /></div>
          Recent Activity Logs
        </h3>
        <button className="text-sm font-bold text-theme-primary hover:text-theme-primary-hover transition-colors">View All</button>
      </div>
      
      <div className="space-y-4 flex-1 overflow-y-auto pr-2 relative z-10">
        {activities.map(activity => (
          <div key={activity.id} className="flex items-start gap-4 p-4 rounded-2xl hover:bg-bg-page/50 transition-colors group cursor-pointer border border-transparent hover:border-border/50">
            <div className={`p-3 rounded-xl mt-0.5 shadow-sm transition-transform group-hover:scale-110 shrink-0 ${activity.bg} ${activity.color}`}>
               <activity.icon className="w-5 h-5" />
            </div>
            
            <div className="flex-1">
              <p className="text-sm font-bold text-primary group-hover:text-theme-primary transition-colors">
                {activity.text}
              </p>
              <p className="text-xs text-secondary mt-1 font-medium">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
