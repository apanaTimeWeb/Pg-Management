'use client';

import { useManagerPropertyContext } from '@/app/manager/manager_shared/ManagerPropertyContext';
import { getSession } from '@/app/login/lib/auth/session';
import { useManagerInventory } from '@/app/manager/inventory/ManagerInventory_hooks/useManagerInventory';
import { ManagerInventoryTabs } from '@/app/manager/inventory/ManagerInventory_components/ManagerInventoryTabs';
import { ManagerInventoryRequests } from '@/app/manager/inventory/ManagerInventory_components/ManagerInventoryRequests';
import { ManagerInventoryLive } from '@/app/manager/inventory/ManagerInventory_components/ManagerInventoryLive';
import { ManagerInventoryBatches } from '@/app/manager/inventory/ManagerInventory_components/ManagerInventoryBatches';
import { ManagerInventoryAlerts } from '@/app/manager/inventory/ManagerInventory_components/ManagerInventoryAlerts';
import { Pagination } from '@/components/shared/Pagination';

export function ManagerInventoryMain() {
  const user = typeof window !== 'undefined' ? getSession() : null;
  const { selectedPropertyId, loading: ctxLoading } = useManagerPropertyContext();
  
  const {
    inventory, requests, batches, activeTab, setActiveTab,
    formData, setFormData, purchaseCost, setPurchaseCost, purchasedQty, setPurchasedQty, purchaseDate, setPurchaseDate,
    currentPage, setCurrentPage, itemsPerPage,
    lowStockAlerts, expiryAlerts, alertCount, pendingCount,
    loadData, handleUpdateQty, handleAdd, handleMarkPurchased
  } = useManagerInventory(selectedPropertyId, ctxLoading, user?.id);

  if (ctxLoading) return <div className="p-6 text-[var(--text-secondary)]">Loading...</div>;
  if (!selectedPropertyId) return <div className="p-6 text-center text-[var(--text-secondary)]">Property Required</div>;

  const currentList = activeTab === 'live' ? inventory : requests;
  const totalPages = Math.ceil(currentList.length / itemsPerPage);
  const paginatedRequests = requests.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="space-y-6 pb-20">
      <div>
        <h1 className="text-[24px] font-bold text-[var(--text-primary)]">Inventory & Kitchen Requests</h1>
        <p className="text-sm text-[var(--text-secondary)]">Manage live stock and fulfill cook requests.</p>
      </div>

      <ManagerInventoryTabs 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        pendingCount={pendingCount} 
        alertCount={alertCount} 
      />

      {activeTab === 'requests' && (
        <ManagerInventoryRequests 
          requests={paginatedRequests}
          purchasedQty={purchasedQty}
          setPurchasedQty={setPurchasedQty}
          purchaseDate={purchaseDate}
          setPurchaseDate={setPurchaseDate}
          purchaseCost={purchaseCost}
          setPurchaseCost={setPurchaseCost}
          handleMarkPurchased={handleMarkPurchased}
        />
      )}

      {activeTab === 'live' && (
        <ManagerInventoryLive 
          inventory={inventory}
          handleUpdateQty={handleUpdateQty}
          formData={formData}
          setFormData={setFormData}
          handleAdd={handleAdd}
        />
      )}

      {activeTab === 'batches' && (
        <ManagerInventoryBatches batches={batches} />
      )}

      {activeTab === 'alerts' && (
        <ManagerInventoryAlerts 
          alertCount={alertCount}
          expiryAlerts={expiryAlerts}
          lowStockAlerts={lowStockAlerts}
          requests={requests}
          selectedPropertyId={selectedPropertyId}
          userId={user?.id}
          loadData={loadData}
        />
      )}

      {(activeTab === 'requests' || activeTab === 'live') && totalPages > 1 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      )}
    </div>
  );
}
