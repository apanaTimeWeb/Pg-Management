import { CheckCircle2, Clock, AlertTriangle } from 'lucide-react';

export function ManagerDashboardTasks() {
  const tasks = [
    { id: 1, title: 'Approve pending check-ins', time: '10:00 AM', status: 'pending', type: 'urgent' },
    { id: 2, title: 'Review weekly kitchen expenses', time: '12:30 PM', status: 'pending', type: 'normal' },
    { id: 3, title: 'Assign room to new student', time: '02:00 PM', status: 'completed', type: 'normal' },
    { id: 4, title: 'Follow up on Room 102 plumbing complaint', time: '04:00 PM', status: 'pending', type: 'urgent' },
  ];

  return (
    <div className="h-full flex flex-col p-6 bg-card border border-border/50 rounded-3xl shadow-sm relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-5"><CheckCircle2 className="w-32 h-32 text-theme-primary" /></div>
      
      <div className="flex items-center justify-between border-b border-border/50 pb-4 mb-4 relative z-10">
        <h3 className="font-black text-primary text-lg flex items-center gap-2">
          <div className="p-1.5 bg-theme-primary/10 rounded-lg text-theme-primary"><CheckCircle2 className="w-5 h-5" /></div>
          Today's Tasks
        </h3>
        <span className="bg-theme-primary/10 text-theme-primary text-xs font-black px-3 py-1.5 rounded-lg shadow-sm border border-theme-primary/20">
          {tasks.filter(t => t.status === 'pending').length} Pending
        </span>
      </div>
      
      <div className="space-y-3 flex-1 overflow-y-auto pr-2 relative z-10">
        {tasks.map(task => (
          <div key={task.id} className="flex items-start gap-3 p-4 bg-bg-page border border-border/50 rounded-2xl hover:bg-card hover:border-theme-primary/30 hover:shadow-md transition-all group cursor-pointer relative overflow-hidden">
            {task.type === 'urgent' && task.status === 'pending' && <div className="absolute top-0 left-0 w-1 h-full bg-danger"></div>}
            {task.type === 'normal' && task.status === 'pending' && <div className="absolute top-0 left-0 w-1 h-full bg-warning"></div>}
            {task.status === 'completed' && <div className="absolute top-0 left-0 w-1 h-full bg-success"></div>}
            
            <div className={`p-2 rounded-xl mt-0.5 shadow-sm transition-transform group-hover:scale-110 shrink-0 ${
               task.status === 'completed' ? 'bg-success/10 text-success' :
               task.type === 'urgent' ? 'bg-danger/10 text-danger' : 'bg-warning/10 text-warning'
            }`}>
               {task.status === 'completed' ? (
                 <CheckCircle2 className="w-4 h-4" />
               ) : task.type === 'urgent' ? (
                 <AlertTriangle className="w-4 h-4" />
               ) : (
                 <Clock className="w-4 h-4" />
               )}
            </div>
            
            <div>
              <p className={`text-sm font-bold ${task.status === 'completed' ? 'line-through text-secondary' : 'text-primary group-hover:text-theme-primary transition-colors'}`}>
                {task.title}
              </p>
              <p className="text-xs text-secondary mt-1 font-medium bg-bg-page inline-block px-2 py-0.5 rounded border border-border/50">{task.time}</p>
            </div>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-4 text-sm font-bold text-theme-primary bg-theme-primary/10 border border-theme-primary/20 hover:bg-theme-primary hover:text-white py-3 rounded-xl transition-colors shadow-sm relative z-10">
        View All Tasks
      </button>
    </div>
  );
}
