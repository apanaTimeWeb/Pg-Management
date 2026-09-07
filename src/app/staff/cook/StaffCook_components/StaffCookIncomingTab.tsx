import { AlertTriangle, CheckCircle, Truck } from 'lucide-react';

import { Pagination } from '@/components/ui/Pagination';

export function StaffCookIncomingTab({
  incomingDeliveries,
  paginatedIncomingDeliveries,
  expiryDates,
  setExpiryDates,
  handleVerifyReceipt,
  incomingPage,
  incomingTotalPages,
  setIncomingPage
}: {
  incomingDeliveries: any[];
  paginatedIncomingDeliveries: any[];
  expiryDates: { [key: string]: string };
  setExpiryDates: (dates: any) => void;
  handleVerifyReceipt: (id: string, qty: number, unit: string) => void;
  incomingPage: number;
  incomingTotalPages: number;
  setIncomingPage: (page: number) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="bg-primary-bg border border-primary border-opacity-20 rounded-xl p-4 mb-6">
        <h3 className="font-bold text-primary mb-1 flex items-center gap-2"><AlertTriangle className="w-4 h-4"/> Verify Deliveries</h3>
        <p className="text-sm text-primary opacity-80">The manager has purchased these items. Please check the packets, enter their expiry dates, and add them to your live stock.</p>
      </div>

      {paginatedIncomingDeliveries.map(req => (
        <div key={req.id} className="bg-card border border-border rounded-2xl p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-primary">{req.itemName}</h3>
            <p className="text-sm font-medium text-secondary">Purchased: <span className="text-primary">{req.purchasedQuantity || req.quantityRequested} {req.unit}</span></p>
            {req.purchaseDate && <p className="text-xs text-secondary">Date: {new Date(req.purchaseDate).toLocaleDateString()}</p>}
          </div>

          <div className="flex items-center gap-3 bg-input p-2 rounded-xl border border-border">
            <div className="flex flex-col">
              <label className="text-[10px] uppercase font-bold text-secondary mb-1 ml-1">Expiry Date (From Packet)</label>
              <input 
                type="date"
                value={expiryDates[req.id] || ''}
                onChange={e => setExpiryDates({...expiryDates, [req.id]: e.target.value})}
                className="bg-card border border-border rounded-lg p-2 text-sm text-primary"
              />
            </div>
            <button 
              onClick={() => handleVerifyReceipt(req.id, req.purchasedQuantity || req.quantityRequested, req.unit)}
              className="bg-success text-white px-4 py-2 mt-4 rounded-lg text-sm font-bold hover:bg-green-600 motion-safe:transition-colors flex items-center gap-2 whitespace-nowrap"
            >
              <CheckCircle className="w-4 h-4" /> Verify & Add
            </button>
          </div>
        </div>
      ))}

      {incomingDeliveries.length === 0 && (
        <div className="text-center p-12 text-secondary bg-card border border-border rounded-3xl">
          <Truck className="w-12 h-12 mx-auto mb-3 opacity-20" />
          <p className="font-medium text-lg">No incoming deliveries</p>
          <p className="text-sm mt-1">Check back later when the manager completes purchases.</p>
        </div>
      )}
      {incomingTotalPages > 1 && <Pagination currentPage={incomingPage} totalPages={incomingTotalPages} onPageChange={setIncomingPage} />}
    </div>
  );
}
