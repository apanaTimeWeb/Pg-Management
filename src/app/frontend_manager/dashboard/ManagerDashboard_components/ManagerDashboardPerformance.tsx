import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

export function ManagerDashboardPerformance() {
  const metrics = [
    { label: 'Occupancy Rate', value: '92%', trend: '+2.5%', isUp: true },
    { label: 'Rent Collection', value: '85%', trend: '-5.2%', isUp: false },
    { label: 'Complaint Resolution', value: '98%', trend: '+1.1%', isUp: true },
  ];

  return (
    <div className="h-full flex flex-col relative z-10">
      <div className="absolute top-0 right-0 p-4 opacity-5"><Activity className="w-32 h-32 text-purple" /></div>
      
      <div className="flex items-center justify-between border-b border-border/50 pb-4 mb-4 relative z-10">
        <h3 className="font-black text-primary text-lg flex items-center gap-2">
          <div className="p-1.5 bg-purple-bg rounded-lg text-purple"><Activity className="w-5 h-5" /></div>
          Weekly Performance
        </h3>
      </div>
      
      <div className="space-y-4 flex-1 flex flex-col justify-center relative z-10">
        {metrics.map((m, i) => (
          <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-bg-page border border-border/50 hover:border-purple/30 hover:shadow-md transition-all group">
            <span className="text-sm font-bold text-secondary group-hover:text-primary transition-colors">{m.label}</span>
            <div className="flex items-center gap-4">
              <span className="text-xl font-black text-primary">{m.value}</span>
              <div className={`flex items-center gap-1 text-xs font-black px-2 py-1 rounded-lg border shadow-sm ${m.isUp ? 'bg-success-bg text-success border-success/20' : 'bg-danger-bg text-danger border-danger/20'}`}>
                {m.isUp ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                {m.trend}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
