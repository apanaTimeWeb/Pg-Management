import { Pagination } from '@/components/ui/Pagination';

export function StaffCookLiveStockTab({
  liveStock,
  paginatedStock,
  stockPage,
  stockTotalPages,
  setStockPage
}: {
  liveStock: any[];
  paginatedStock: any[];
  stockPage: number;
  stockTotalPages: number;
  setStockPage: (page: number) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-card border-b border-border text-secondary sticky top-0 z-10 shadow-sm shadow-black/5">
            <tr>
              <th className="p-4 font-semibold uppercase tracking-wider text-[11px]">Grocery Item</th>
              <th className="p-4 font-semibold uppercase tracking-wider text-[11px]">Available Qty</th>
              <th className="p-4 font-semibold uppercase tracking-wider text-[11px]">Expiry Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {paginatedStock.map((item: any) => (
              <tr key={item.id} className="hover:bg-input motion-safe:transition-colors">
                <td className="p-4 font-medium text-primary">{item.name}</td>
                <td className="p-4">
                  <span className="font-bold text-lg text-primary">{item.quantity}</span>
                  <span className="text-xs text-secondary ml-1">{item.unit}</span>
                </td>
                <td className="p-4">
                  {item.expiryDate ? (
                    <span className={`${new Date(item.expiryDate) < new Date() ? 'text-danger font-bold' : 'text-secondary'}`}>
                      {new Date(item.expiryDate).toLocaleDateString()}
                      {new Date(item.expiryDate) < new Date() && ' (Expired)'}
                    </span>
                  ) : (
                    <span className="text-secondary opacity-50">Not set</span>
                  )}
                </td>
              </tr>
            ))}
            {liveStock.length === 0 && (
              <tr>
                <td colSpan={3} className="p-8 text-center text-secondary">No groceries in live stock. Please request items.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {stockTotalPages > 1 && <Pagination currentPage={stockPage} totalPages={stockTotalPages} onPageChange={setStockPage} />}
    </div>
  );
}
