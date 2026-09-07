// RESPONSIBILITY: Renders the StaffCookMain component.
'use client';

// RESPONSIBILITY: Renders the StaffCookMain component.
'use client';

import { useState, useEffect } from 'react';
import { CheckCircle, Utensils, ShoppingCart, Truck, Archive, AlertTriangle } from 'lucide-react';

import { useStaffContext } from '@/app/staff/staff_components/StaffContext';
import { getSession } from '@/app/staff/staff_lib/staff_auth/StaffSession';
import { staffOperationsApi } from '@/app/staff/staff_lib/staff_api/staffOperations';
import { stockApi } from "@/app/staff/staff_lib/staff_api/StaffStock";
import { authApi as api } from '@/app/staff/staff_lib/staff_api/StaffAuth';
import { mealsApi } from '@/app/staff/staff_lib/staff_api/StaffMeals';
import { stockRequestsApi } from '@/app/staff/staff_lib/staff_api/StaffStockRequests';
import { attendanceApi } from '@/app/owner/owner_lib/owner_api/OwnerAttendance';
import { Pagination } from '@/components/ui/Pagination';

import { StaffCookLiveMealsTab } from './StaffCookLiveMealsTab';
import { StaffCookRequestTab } from './StaffCookRequestTab';
import { StaffCookIncomingTab } from './StaffCookIncomingTab';
import { StaffCookLiveStockTab } from './StaffCookLiveStockTab';

import type { MealStatusType, MealType } from '@/app/staff/staff_lib/staff_api/StaffMeals';

export function StaffCookMain() {
  const { propertyId } = useStaffContext();
  const session = typeof window !== 'undefined' ? getSession() : null;
  
  const [orders, setOrders] = useState<any[]>([]);
  const [requests, setRequests] = useState<any[]>([]);
  const [liveStock, setLiveStock] = useState<any[]>([]);
  const [mealStatuses, setMealStatuses] = useState<Record<MealType, MealStatusType>>({
    Breakfast: 'pending', Lunch: 'pending', Dinner: 'pending'
  });
  const [todayMenu, setTodayMenu] = useState<any>(null);
  const [isPresent, setIsPresent] = useState(false);
  
  const [activeTab, setActiveTab] = useState<'orders' | 'request' | 'incoming' | 'stock'>('orders');
  
  const [formData, setFormData] = useState({ itemName: '', quantityRequested: '', unit: 'kg' });
  const [expiryDates, setExpiryDates] = useState<{ [key: string]: string }>({});

  // Pagination state
  const [stockPage, setStockPage] = useState(1);
  const [ordersPage, setOrdersPage] = useState(1);
  const [requestsPage, setRequestsPage] = useState(1);
  const [incomingPage, setIncomingPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    setStockPage(1); setOrdersPage(1); setRequestsPage(1); setIncomingPage(1);
  }, [activeTab, propertyId]);

  const loadData = () => {
    if (propertyId) {
      setOrders(staffOperationsApi.getLiveOrders(propertyId));
      setRequests(stockRequestsApi.getByProperty(propertyId));
      setLiveStock(stockApi.getByProperty(propertyId).filter((s: any) => s.category?.toLowerCase() === 'groceries'));
      setMealStatuses(mealsApi.getTodayMealStatus(propertyId));
      setTodayMenu(staffOperationsApi.getTodayMenu(propertyId));
      if (session) setIsPresent(attendanceApi.getTodayStatus(propertyId, session.id));
    }
  };

  useEffect(() => {
    loadData();
  }, [propertyId]);

  const handleMarkPresent = () => {
    if (!session || !propertyId) return;
    attendanceApi.markPresent(propertyId, session.id);
    loadData();
  };

  const handleMarkMealReady = (mealType: MealType) => {
    if (!session || !propertyId) return;
    mealsApi.markMealReady(propertyId, mealType, session.id);
    loadData();
  };

  const handleMarkServed = (orderId: string) => {
    if (!session) return;
    staffOperationsApi.updateOrderStatus(orderId, 'Served', session.id);
    loadData();
  };

  const handleRequestStock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!session || !propertyId) return;
    
    stockRequestsApi.create({
      propertyId,
      itemName: (formData as any).itemName,
      quantityRequested: parseFloat((formData as any).quantityRequested) || 0,
      unit: (formData as any).unit,
      requestedBy: session.id
    });
    
    setFormData({ itemName: '', quantityRequested: '', unit: 'kg' });
    alert('Request sent to manager!');
    setActiveTab('incoming');
    loadData();
  };

  const handleVerifyReceipt = (id: string, quantity: number, unit: string) => {
    const expiry = expiryDates[id];
    stockRequestsApi.verifyReceipt(id, quantity, unit, expiry);
    alert('Item verified and added to live stock!');
    loadData();
  };

  if (!propertyId) return <div className="p-6">Loading or Property not assigned...</div>;

  const incomingCount = requests.filter(r => r.status === 'purchased').length;
  const pendingRequests = requests.filter(r => r.status === 'pending');
  const incomingDeliveries = requests.filter(r => r.status === 'purchased');

  // Paginated slices
  const paginatedOrders = orders.slice((ordersPage - 1) * itemsPerPage, ordersPage * itemsPerPage);
  const ordersTotalPages = Math.ceil(orders.length / itemsPerPage);
  const paginatedPendingRequests = pendingRequests.slice((requestsPage - 1) * itemsPerPage, requestsPage * itemsPerPage);
  const requestsTotalPages = Math.ceil(pendingRequests.length / itemsPerPage);
  const paginatedIncomingDeliveries = incomingDeliveries.slice((incomingPage - 1) * itemsPerPage, incomingPage * itemsPerPage);
  const incomingTotalPages = Math.ceil(incomingDeliveries.length / itemsPerPage);
  const paginatedStock = liveStock.slice((stockPage - 1) * itemsPerPage, stockPage * itemsPerPage);
  const stockTotalPages = Math.ceil(liveStock.length / itemsPerPage);

  return (
    <div className="space-y-6 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-[22px] font-bold text-primary">Cook Dashboard</h1>
          <p className="text-sm text-secondary">Manage meals, orders, and kitchen stock</p>
        </div>
        
        <div className="flex items-center gap-3 bg-card border border-border rounded-md p-2 pr-4 shadow-sm">
          {isPresent ? (
            <>
              <div className="w-10 h-10 rounded bg-success-bg text-success flex items-center justify-center">
                <CheckCircle className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-secondary uppercase">Attendance</p>
                <p className="text-sm font-bold text-success">Marked Present ✅</p>
              </div>
            </>
          ) : (
            <>
              <button 
                onClick={handleMarkPresent}
                className="bg-primary text-white hover:bg-primary-hover px-6 py-2.5 rounded-md font-bold text-sm motion-safe:transition-colors shadow-sm"
              >
                Mark Attendance for Today
              </button>
            </>
          )}
        </div>
      </div>

      <div className="flex gap-2 p-1 bg-input rounded-lg w-full overflow-x-auto hide-scrollbar border border-border">
        <button onClick={() => setActiveTab('orders')} className={`flex items-center gap-2 px-5 py-3 font-semibold text-sm border-b-2 motion-safe:transition-colors whitespace-nowrap ${activeTab === 'orders' ? 'border-primary text-primary' : 'border-transparent text-secondary hover:text-primary'}`}>
          <Utensils className="w-4 h-4" /> Live Meals
        </button>
        <button onClick={() => setActiveTab('request')} className={`flex items-center gap-2 px-5 py-3 font-semibold text-sm border-b-2 motion-safe:transition-colors whitespace-nowrap ${activeTab === 'request' ? 'border-primary text-primary' : 'border-transparent text-secondary hover:text-primary'}`}>
          <ShoppingCart className="w-4 h-4" /> Request Groceries
        </button>
        <button onClick={() => setActiveTab('incoming')} className={`flex items-center gap-2 px-5 py-3 font-semibold text-sm border-b-2 motion-safe:transition-colors whitespace-nowrap ${activeTab === 'incoming' ? 'border-primary text-primary' : 'border-transparent text-secondary hover:text-primary'}`}>
          <Truck className="w-4 h-4" /> Incoming Deliveries
          {incomingCount > 0 && <span className="bg-danger text-white text-[10px] px-2 py-0.5 rounded-full">{incomingCount}</span>}
        </button>
        <button onClick={() => setActiveTab('stock')} className={`flex items-center gap-2 px-5 py-3 font-semibold text-sm border-b-2 motion-safe:transition-colors whitespace-nowrap ${activeTab === 'stock' ? 'border-primary text-primary' : 'border-transparent text-secondary hover:text-primary'}`}>
          <Archive className="w-4 h-4" /> Live Kitchen Stock
        </button>
      </div>

      {activeTab === 'orders' && (
        <StaffCookLiveMealsTab
          todayMenu={todayMenu}
          mealStatuses={mealStatuses}
          handleMarkMealReady={handleMarkMealReady}
          orders={orders}
          paginatedOrders={paginatedOrders}
          handleMarkServed={handleMarkServed}
          ordersPage={ordersPage}
          ordersTotalPages={ordersTotalPages}
          setOrdersPage={setOrdersPage}
        />
      )}

      {activeTab === 'request' && (
        <StaffCookRequestTab
          formData={formData}
          setFormData={setFormData}
          handleRequestStock={handleRequestStock}
          pendingRequests={pendingRequests}
          paginatedPendingRequests={paginatedPendingRequests}
          requestsPage={requestsPage}
          requestsTotalPages={requestsTotalPages}
          setRequestsPage={setRequestsPage}
        />
      )}

      {activeTab === 'incoming' && (
        <StaffCookIncomingTab
          incomingDeliveries={incomingDeliveries}
          paginatedIncomingDeliveries={paginatedIncomingDeliveries}
          expiryDates={expiryDates}
          setExpiryDates={setExpiryDates}
          handleVerifyReceipt={handleVerifyReceipt}
          incomingPage={incomingPage}
          incomingTotalPages={incomingTotalPages}
          setIncomingPage={setIncomingPage}
        />
      )}

      {activeTab === 'stock' && (
        <StaffCookLiveStockTab
          liveStock={liveStock}
          paginatedStock={paginatedStock}
          stockPage={stockPage}
          stockTotalPages={stockTotalPages}
          setStockPage={setStockPage}
        />
      )}
    </div>
  );
}
