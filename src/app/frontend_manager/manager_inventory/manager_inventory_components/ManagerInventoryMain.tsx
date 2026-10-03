// RESPONSIBILITY: Renders the ManagerInventoryMain component.
'use client';
import { useManagerPropertyContext } from '@/app/frontend_manager/manager_components/ManagerPropertyContext';
import { useManagerSession } from '@/app/frontend_manager/manager_components/manager_hooks/useManagerSession';
import { useManagerInventory } from '@/app/frontend_manager/manager_inventory/ManagerInventory_hooks/useManagerInventory';
import { ManagerInventoryTabs } from '@/app/frontend_manager/manager_inventory/ManagerInventory_components/ManagerInventoryTabs';
import { ManagerInventoryRequests } from '@/app/frontend_manager/manager_inventory/ManagerInventory_components/ManagerInventoryRequests';
import { ManagerInventoryLive } from '@/app/frontend_manager/manager_inventory/ManagerInventory_components/ManagerInventoryLive';
import { ManagerInventoryBatches } from '@/app/frontend_manager/manager_inventory/ManagerInventory_components/ManagerInventoryBatches';
import { ManagerInventoryAlerts } from '@/app/frontend_manager/manager_inventory/ManagerInventory_components/ManagerInventoryAlerts';
import { ManagerInventoryKPIs } from '@/app/frontend_manager/manager_inventory/ManagerInventory_components/ManagerInventoryKPIs';
import { Pagination } from '@/components/ui/Pagination';
import { Package } from 'lucide-react';
export function ManagerInventoryMain() {
  const user = useManagerSession();
  const { selectedPropertyId, loading: ctxLoading } = useManagerPropertyContext();
  const {
    inventory, requests, batches, activeTab, setActiveTab,
    formData, setFormData, purchaseCost, setPurchaseCost, purchasedQty, setPurchasedQty, purchaseDate, setPurchaseDate,
    currentPage, setCurrentPage, itemsPerPage,
    lowStockAlerts, expiryAlerts, alertCount, pendingCount,
    loadData, handleUpdateQty, handleAdd, handleMarkPurchased
  } = useManagerInventory(selectedPropertyId, ctxLoading, user?.id);
  if (ctxLoading) return <div className="p-6 text-secondary">Loading...</div>;
  if (!selectedPropertyId) return <div className="p-6 text-center text-secondary">Property Required</div>;
  const currentList = activeTab === 'live' ? inventory : requests;
  const totalPages = Math.ceil(currentList.length / itemsPerPage);
  const paginatedRequests = requests.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  return (
    <div className="space-y-6 pb-20 manager-theme animate-fade-in">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-warning to-amber-600 text-white rounded-3xl p-8 shadow-lg relative overflow-hidden group mb-6">
        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-700">
          <Package className="w-40 h-40" />
        </div>
        <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black mb-2 flex items-center gap-3">
              <Package className="w-8 h-8" /> Inventory & Kitchen
            </h1>
            <p className="text-white/80 font-medium max-w-xl">
              Manage live stock, fulfill cook requests, track batches, and control wastage.
            </p>
          </div>
        </div>
      </div>
      
      <ManagerInventoryKPIs pendingCount={pendingCount} alertCount={alertCount} totalItems={inventory.length} />
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
          setPurchasedQty={setPurchasedQty as any}
          purchaseDate={purchaseDate}
          setPurchaseDate={setPurchaseDate as any}
          purchaseCost={purchaseCost}
          setPurchaseCost={setPurchaseCost as any}
          handleMarkPurchased={handleMarkPurchased}
        />
      )}
      {activeTab === 'live' && (
        <ManagerInventoryLive 
          inventory={inventory}
          handleUpdateQty={handleUpdateQty}
          formData={formData}
          setFormData={setFormData as any}
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