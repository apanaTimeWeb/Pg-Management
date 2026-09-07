import { Pagination } from '@/components/ui/Pagination';

export function StaffCookRequestTab({
  formData,
  setFormData,
  handleRequestStock,
  pendingRequests,
  paginatedPendingRequests,
  requestsPage,
  requestsTotalPages,
  setRequestsPage
}: {
  formData: any;
  setFormData: any;
  handleRequestStock: (e: React.FormEvent) => void;
  pendingRequests: any[];
  paginatedPendingRequests: any[];
  requestsPage: number;
  requestsTotalPages: number;
  setRequestsPage: (page: number) => void;
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="font-bold text-lg text-primary mb-1">Request Groceries</h2>
        <p className="text-sm text-secondary mb-6">Send a request to the manager to purchase items.</p>
        
        <form onSubmit={handleRequestStock} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-secondary mb-1">Item Name</label>
            <input type="text" required value={formData.itemName} onChange={e => setFormData({...formData, itemName: e.target.value})} className="w-full bg-input border border-border rounded-lg p-3 text-sm text-primary" placeholder="e.g. Paneer, Rice, Milk" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-secondary mb-1">Quantity</label>
              <input type="number" step="0.1" required value={formData.quantityRequested} onChange={e => setFormData({...formData, quantityRequested: e.target.value})} className="w-full bg-input border border-border rounded-lg p-3 text-sm text-primary" placeholder="0" />
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary mb-1">Unit</label>
              <select value={formData.unit} onChange={e => setFormData({...formData, unit: e.target.value})} className="w-full bg-input border border-border rounded-lg p-3 text-sm text-primary">
                <option value="kg">Kilograms (kg)</option>
                <option value="L">Liters (L)</option>
                <option value="packets">Packets</option>
                <option value="pieces">Pieces</option>
              </select>
            </div>
          </div>
          <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary-hover motion-safe:transition-colors mt-2">
            Send Request
          </button>
        </form>
      </div>

      <div className="space-y-4">
        <h3 className="font-bold text-lg text-primary">Pending Requests ({pendingRequests.length})</h3>
        {paginatedPendingRequests.map(req => (
          <div key={req.id} className="bg-card border border-border rounded-xl p-4 flex justify-between items-center">
            <div>
              <h4 className="font-bold text-primary">{req.itemName}</h4>
              <p className="text-sm text-secondary">{req.quantityRequested} {req.unit}</p>
            </div>
            <span className="text-[10px] font-bold tracking-wider uppercase px-3 py-1 bg-warning-bg text-warning rounded-full">
              Waiting for Manager
            </span>
          </div>
        ))}
        {pendingRequests.length === 0 && (
          <div className="text-sm text-secondary italic">No pending requests.</div>
        )}
        {requestsTotalPages > 1 && <Pagination currentPage={requestsPage} totalPages={requestsTotalPages} onPageChange={setRequestsPage} />}
      </div>
    </div>
  );
}
