// RESPONSIBILITY: Renders the ManagerInventoryRequests component.
import { CheckCircle, Clock, ShoppingCart } from 'lucide-react';
import type { ManagerKitchenRequest } from '@/app/manager/inventory/ManagerInventory_types/ManagerInventory.types';

interface Props {
  requests: ManagerKitchenRequest[];
  purchasedQty: { [key: string]: string };
  setPurchasedQty: (val: any) => void;
  purchaseDate: { [key: string]: string };
  setPurchaseDate: (val: any) => void;
  purchaseCost: { [key: string]: string };
  setPurchaseCost: (val: any) => void;
  handleMarkPurchased: (id: string, defaultQty: number) => void;
}

export function ManagerInventoryRequests({
  requests, purchasedQty, setPurchasedQty,
  purchaseDate, setPurchaseDate,
  purchaseCost, setPurchaseCost,
  handleMarkPurchased
}: Props) {
  if (requests.length === 0) {
    return (
      <div className="text-center p-12 text-[var(--text-secondary)] bg-[var(--bg-card)] border border-[var(--border)] rounded-3xl">
        <ShoppingCart className="w-12 h-12 mx-auto mb-3 opacity-20" />
        <p className="font-medium text-lg">No pending requests</p>
        <p className="text-sm mt-1">The kitchen has not requested any groceries recently.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {requests.map(req => (
        <div key={req.id} className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                req.status === 'pending' ? 'bg-[var(--warning-bg)] text-[var(--warning)]' : 'bg-[var(--success-bg)] text-[var(--success)]'
              }`}>
                {req.status === 'pending' ? 'New Request' : 'Purchased & Sent to Kitchen'}
              </span>
              <span className="text-xs text-[var(--text-secondary)]">{new Date(req.createdAt).toLocaleDateString()}</span>
            </div>
            <h3 className="text-lg font-bold text-[var(--text-primary)]">{req.itemName}</h3>
            <p className="text-sm font-medium text-[var(--text-secondary)]">Requested: <span className="text-[var(--text-primary)]">{req.quantityRequested} {req.unit}</span></p>
          </div>

          {req.status === 'pending' ? (
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-[var(--bg-input)] p-3 rounded-xl border border-[var(--border)]">
              <div className="flex flex-wrap gap-3">
                <div className="flex flex-col">
                  <label className="text-[10px] uppercase font-bold text-[var(--text-secondary)] mb-1 ml-1">Purchased Qty</label>
                  <div className="flex items-center bg-[var(--bg-card)] px-3 rounded-lg border border-[var(--border)] focus-within:border-[var(--primary)] transition-colors">
                    <input 
                      type="number"
                      placeholder={req.quantityRequested.toString()}
                      value={purchasedQty[req.id] || ''}
                      onChange={e => setPurchasedQty({...purchasedQty, [req.id]: e.target.value})}
                      className="bg-transparent border-none outline-none w-16 p-2 text-sm text-[var(--text-primary)] font-bold"
                    />
                    <span className="text-[var(--text-secondary)] text-sm font-medium pr-1">{req.unit}</span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <label className="text-[10px] uppercase font-bold text-[var(--text-secondary)] mb-1 ml-1">Purchase Date</label>
                  <input 
                    type="date"
                    value={purchaseDate[req.id] || ''}
                    onChange={e => setPurchaseDate({...purchaseDate, [req.id]: e.target.value})}
                    className="bg-[var(--bg-card)] border border-[var(--border)] rounded-lg px-3 py-2 h-[38px] text-sm text-[var(--text-primary)] focus:border-[var(--primary)] outline-none transition-colors"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-[10px] uppercase font-bold text-[var(--text-secondary)] mb-1 ml-1">Total Cost</label>
                  <div className="flex items-center bg-[var(--bg-card)] px-3 rounded-lg border border-[var(--border)] focus-within:border-[var(--primary)] transition-colors h-[38px]">
                    <span className="text-[var(--text-secondary)] font-medium">₹</span>
                    <input 
                      type="number"
                      placeholder="Cost"
                      value={purchaseCost[req.id] || ''}
                      onChange={e => setPurchaseCost({...purchaseCost, [req.id]: e.target.value})}
                      className="bg-transparent border-none outline-none w-20 p-2 text-sm text-[var(--text-primary)] font-bold"
                    />
                  </div>
                </div>
              </div>
              <button 
                onClick={() => handleMarkPurchased(req.id, req.quantityRequested)}
                className="bg-[var(--primary)] text-white px-5 py-2 mt-auto sm:mt-5 rounded-lg text-sm font-bold hover:bg-[var(--primary-hover)] transition-colors flex items-center justify-center gap-2 whitespace-nowrap w-full sm:w-auto h-[38px]"
              >
                <CheckCircle className="w-4 h-4" /> Fulfill
              </button>
            </div>
          ) : (
            <div className="text-sm font-bold text-[var(--success)] flex items-center gap-2">
              <Clock className="w-4 h-4" /> Awaiting Cook Verification
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
