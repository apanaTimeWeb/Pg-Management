// @ts-nocheck
// RESPONSIBILITY: Renders the ManagerBroadcastsMain component.
'use client';
import { useState, useEffect } from 'react';
import { Radio, Users, Building, AlertTriangle } from 'lucide-react';
import { ManagerUseManagerUrlPagination } from '@/app/manager/manager_components/manager_hooks/ManagerUseManagerUrlPagination';
import { api } from '@/app/manager/manager_lib/manager_api/ManagerApi';
import { useManagerPropertyContext } from '@/app/manager/manager_components/ManagerPropertyContext';
import { getSession } from '@/app/manager/manager_lib/manager_auth/ManagerSession';
import { Pagination } from '@/components/ui/Pagination';
export default function ManagerBroadcastsMain() {
  const { selectedPropertyId, loading: ctxLoading } = useManagerPropertyContext();
  const [broadcasts, setBroadcasts] = useState<unknown[]>([]);
  const user = typeof window !== 'undefined' ? getSession() : null;
  const [formData, setFormData] = useState({ title: '', message: '', audience: 'all', targetFloor: '' });
  const loadData = () => {
    if (!ctxLoading && selectedPropertyId) {
      setBroadcasts(api.managerOperations.listBroadcasts(selectedPropertyId));
    }
  };
  useEffect(() => {
    loadData();
  }, [selectedPropertyId, ctxLoading]);
  // Pagination
  const { currentPage, setCurrentPage } = ManagerUseManagerUrlPagination(1);
  const itemsPerPage = 10;
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedPropertyId]);
  const totalPages = Math.ceil(broadcasts.length / itemsPerPage);
  const paginatedData = broadcasts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !selectedPropertyId) return;
    api.managerOperations.createBroadcast({
      ...formData,      audience: formData.audience as unknown,
      // @ts-expect-error
      
      propertyId: selectedPropertyId,
      managerId: user.id
    });
    setFormData({ title: '', message: '', audience: 'all', targetFloor: '' });
    loadData();
  };
  if (ctxLoading) return <div className="p-6 text-secondary">Loading...</div>;
  if (!selectedPropertyId) return <div className="p-6 text-center text-secondary">Property Required</div>;
  return (
    <div className="space-y-6 pb-20 flex flex-col lg:flex-row gap-6">
      <div className="w-full lg:w-1/3 shrink-0">
        <div className="bg-card border border p-6 rounded-[var(--radius-lg,12px)] sticky top-6">
          <h2 className="font-bold text-lg text-primary mb-4 flex items-center gap-2">
            <Radio className="w-5 h-5 text-primary" />
            New Broadcast
          </h2>
          <form onSubmit={handleSend} className="space-y-4">
             <div>
               <label className="block text-sm text-secondary mb-1">Title</label>               <input required type="text" value={formData.title} onChange={e=>setFormData({...formData, title: e.target.value})} placeholder="e.g. Water Supply Update" className="w-full bg-input border border px-3 py-2 rounded text-primary focus:outline-none focus:border-primary" />
             </div>
             <div>
               <label className="block text-sm text-secondary mb-1">Message</label>               <textarea required rows={4} value={formData.message} onChange={e=>setFormData({...formData, message: e.target.value})} placeholder="Type message..." className="w-full bg-input border border px-3 py-2 rounded text-primary focus:outline-none focus:border-primary resize-none" />
             </div>
             <div>
               <label className="block text-sm text-secondary mb-1">Audience</label>               <select value={formData.audience} onChange={e=>setFormData({...formData, audience: e.target.value})} className="w-full bg-input border border px-3 py-2 rounded text-primary focus:outline-none focus:border-primary">
                 <option value="all">All Students</option>
                 <option value="floor">Specific Floor</option>
                 <option value="defaulters">Rent Defaulters</option>
               </select>
             </div>
             {formData.audience === 'floor' && (
               <div className="animate-in fade-in">
                 <label className="block text-sm text-secondary mb-1">Target Floor</label>                 <input required type="text" value={formData.targetFloor} onChange={e=>setFormData({...formData, targetFloor: e.target.value})} placeholder="e.g. 2nd Floor" className="w-full bg-input border border px-3 py-2 rounded text-primary focus:outline-none focus:border-primary" />
               </div>
             )}
             <button type="submit" className="w-full py-2 bg-primary text-white rounded font-medium mt-4">Send Broadcast</button>
          </form>
        </div>
      </div>
      <div className="flex-1 space-y-6">
        <div>
          <h1 className="text-[24px] font-bold text-primary">Broadcast History</h1>
          <p className="text-sm text-secondary">Past announcements sent to students.</p>
        </div>
        <div className="space-y-4">
          {paginatedData.map(b => (            <div key={(b as Record<string, unknown>).id} className="bg-card border border p-5 rounded-[var(--radius-lg,12px)]">
              <div className="flex justify-between items-start mb-2">                <h3 className="font-bold text-primary">{(b as Record<string, unknown>).title}</h3>                <span className="text-xs text-secondary">{new Date((b as Record<string, unknown>).createdAt).toLocaleString()}</span>
              </div>              <p className="text-sm text-secondary mb-4">{(b as Record<string, unknown>).message}</p>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-input text-xs text-primary font-medium">                {(b as Record<string, unknown>).audience === 'all' && <Users className="w-3.5 h-3.5 text-primary" />}                {(b as Record<string, unknown>).audience === 'floor' && <Building className="w-3.5 h-3.5 text-success" />}                {(b as Record<string, unknown>).audience === 'defaulters' && <AlertTriangle className="w-3.5 h-3.5 text-danger" />}                Target: {(b as Record<string, unknown>).audience === 'floor' ? (b as Record<string, unknown>).targetFloor : (b as Record<string, unknown>).audience === 'defaulters' ? 'Defaulters' : 'All Students'}
              </div>
            </div>
          // @ts-expect-error
          ))}
          {broadcasts.length === 0 && (
            // @ts-expect-error
            <div className="text-center p-8 text-secondary bg-card rounded-[var(--radius-lg,12px)] border border">
              // @ts-expect-error
              No previous broadcasts.
            </div>
          // @ts-expect-error
          )}
          {totalPages > 1 && (
            <div className="mt-4">
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            </div>
          // @ts-expect-error
          )}
        </div>
      </div>
    </div>
  );
}