'use client';
import { useEffect, useState } from 'react';
import { ShieldAlert, Bell, AlertTriangle, Filter } from 'lucide-react';

import { parentOperationsApi as api } from '@/app/parent/parent_lib/parent_api/ParentOperations';
import { getSession } from '@/app/parent/parent_lib/parent_auth/ParentSession';

export function ParentAlertsMain() {
  const user = typeof window !== 'undefined' ? getSession() : null;
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (user?.id) {
      const child = api.getLinkedChild(user.id);
      if (child) {
        setAlerts(api.getChildAlerts(child.id));
      }
    }
    setLoading(false);
  }, [user?.id]);

  const filteredAlerts = alerts.filter(a => filter === 'all' || a.severity === filter);

  if (loading) {
    return <div className="p-6 animate-pulse">Loading alerts...</div>;
  }

  return (
    <div className="space-y-6 pb-20 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[22px] font-bold text-primary flex items-center gap-2">
            <Bell className="w-6 h-6" />
            Safety Alerts
          </h1>
          <p className="text-sm text-secondary">Real-time notifications for SOS and late entries.</p>
        </div>
        
        <div className="flex items-center gap-2 text-sm bg-card border border-border p-1 rounded-md">
          <Filter className="w-4 h-4 text-secondary ml-2" />
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-transparent text-primary focus:outline-none border-none py-1 pr-2"
          >
            <option value="all">All Alerts</option>
            <option value="high">Critical (SOS)</option>
            <option value="medium">Warnings (Late Entry)</option>
            <option value="low">Info (Dues)</option>
          </select>
        </div>
      </div>

      {alerts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center bg-card border border-border rounded-lg shadow-sm">
          <ShieldAlert className="w-16 h-16 text-secondary/30 mb-4" />
          <h2 className="text-xl font-bold text-primary mb-2">No Alerts Found</h2>
          <p className="text-secondary text-sm max-w-sm">
            Everything looks good! There are no SOS triggers, late entries, or pending dues at the moment.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredAlerts.length === 0 ? (
             <div className="text-center text-sm text-secondary py-8">No alerts match the selected filter.</div>
          ) : (
            filteredAlerts.map(alert => (
              <div 
                key={alert.id} 
                className={`p-5 rounded-lg border ${
                  alert.severity === 'high' ? 'bg-danger-bg border-danger/30' :
                  alert.severity === 'medium' ? 'bg-warning/5 border-warning/30' :
                  'bg-card border-border'
                } flex items-start gap-4 shadow-sm`}
              >
                <div className="shrink-0 mt-1">
                  {alert.severity === 'high' ? (
                    <div className="w-10 h-10 rounded-full bg-danger/10 flex items-center justify-center">
                      <AlertTriangle className="w-5 h-5 text-danger" />
                    </div>
                  ) : alert.severity === 'medium' ? (
                    <div className="w-10 h-10 rounded-full bg-warning/10 flex items-center justify-center">
                      <Bell className="w-5 h-5 text-warning" />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-primary-subtle flex items-center justify-center">
                      <Bell className="w-5 h-5 text-primary" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                    <h3 className={`font-bold text-lg ${
                      alert.severity === 'high' ? 'text-danger' :
                      alert.severity === 'medium' ? 'text-warning' :
                      'text-primary'
                    }`}>
                      {alert.title}
                    </h3>
                    <span className="text-xs font-medium text-secondary whitespace-nowrap">
                      {new Date(alert.date).toLocaleString()}
                    </span>
                  </div>
                  
                  <p className="text-sm text-secondary mt-1">
                    {alert.type === 'sos' && 'An emergency SOS was triggered from the student app. The PG Manager and Guards have been notified.'}
                    {alert.type === 'late' && 'The student entered the premises after the designated night entry cutoff time.'}
                    {alert.type === 'due' && 'A new rent invoice has been generated and is pending payment.'}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
