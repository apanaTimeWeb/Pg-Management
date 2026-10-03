import { CheckCircle2, Clock, AlertTriangle, ShieldCheck } from 'lucide-react';

export function ManagerDashboardTasks() {
  const tasks = [
    { id: 1, title: 'Approve pending check-ins', time: '10:00 AM', status: 'pending', type: 'urgent' },
    { id: 2, title: 'Review weekly kitchen expenses', time: '12:30 PM', status: 'pending', type: 'normal' },
    { id: 3, title: 'Assign room to new student', time: '02:00 PM', status: 'completed', type: 'normal' },
    { id: 4, title: 'Follow up on Room 102 plumbing complaint', time: '04:00 PM', status: 'pending', type: 'urgent' },
  ];

  return (
    <div className="h-full flex flex-col p-6">
      <div className="flex items-center justify-between border-b border-border/50 pb-4 mb-4">
        <h3 className="font-bold text-primary text-lg flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-theme-primary" />
          Today's Tasks
        </h3>
        <span className="bg-theme-primary/10 text-theme-primary text-xs font-black px-2.5 py-1 rounded-lg">
          {tasks.filter(t => t.status === 'pending').length} Pending
        </span>
      </div>
      <div className="space-y-3 flex-1 overflow-y-auto pr-2">
        {tasks.map(task => (
          <div key={task.id} className="flex items-start gap-3 p-3.5 rounded-xl hover:bg-bg-page/50 motion-safe:transition-all group cursor-pointer border border-transparent hover:border-border/50 hover:shadow-sm">
            {task.status === 'completed' ? (
              <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
            ) : task.type === 'urgent' ? (
              <AlertTriangle className="w-5 h-5 text-danger shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
            ) : (
              <Clock className="w-5 h-5 text-warning shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
            )}
            <div>
              <p className={`text-sm font-bold ${task.status === 'completed' ? 'line-through text-secondary' : 'text-primary group-hover:text-theme-primary transition-colors'}`}>
                {task.title}
              </p>
              <p className="text-xs text-secondary mt-1 font-medium">{task.time}</p>
            </div>
          </div>
        ))}
      </div>
      <button className="w-full mt-4 text-sm font-bold text-theme-primary bg-theme-primary/5 hover:bg-theme-primary/10 py-2.5 rounded-xl transition-colors">
        View All Tasks
      </button>
    </div>
  );
}
