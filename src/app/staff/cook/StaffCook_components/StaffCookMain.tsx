// RESPONSIBILITY: Renders the StaffCookMain component.
'use client';

import { useState, useEffect } from 'react';
import { staffOperationsApi } from '@/app/staff/staff_lib/staff_api/staffOperations';
import { useStaffContext } from '@/app/staff/staff_components/StaffContext';
import { getSession } from '@/app/staff/staff_lib/staff_auth/StaffSession';
import { CheckCircle, Utensils, ShoppingCart, Truck, Archive, AlertTriangle } from 'lucide-react';
import { authApi as api } from '@/app/staff/staff_lib/staff_api/StaffAuth';
import { mealsApi, MealType, MealStatusType } from '@/app/staff/staff_lib/staff_api/StaffMeals';
import { stockRequestsApi } from '@/app/staff/staff_lib/staff_api/StaffStockRequests';
import { attendanceApi } from '@/app/owner/owner_lib/owner_api/OwnerAttendance';
import { Pagination } from '@/components/shared/Pagination';

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
      setLiveStock(api.stock.getByProperty(propertyId).filter(s => s.category?.toLowerCase() === 'groceries'));
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
      itemName: formData.itemName,
      quantityRequested: parseFloat(formData.quantityRequested) || 0,
      unit: formData.unit,
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
                className="bg-primary text-white hover:bg-primary-hover px-6 py-2.5 rounded-md font-bold text-sm transition-colors shadow-sm"
              >
                Mark Attendance for Today
              </button>
            </>
          )}
        </div>
      </div>

      <div className="flex gap-2 p-1 bg-input rounded-lg w-full overflow-x-auto hide-scrollbar border border-border">
        <button onClick={() => setActiveTab('orders')} className={`flex items-center gap-2 px-5 py-3 font-semibold text-sm border-b-2 transition-colors whitespace-nowrap ${activeTab === 'orders' ? 'border-primary text-primary' : 'border-transparent text-secondary hover:text-primary'}`}>
          <Utensils className="w-4 h-4" /> Live Meals
        </button>
        <button onClick={() => setActiveTab('request')} className={`flex items-center gap-2 px-5 py-3 font-semibold text-sm border-b-2 transition-colors whitespace-nowrap ${activeTab === 'request' ? 'border-primary text-primary' : 'border-transparent text-secondary hover:text-primary'}`}>
          <ShoppingCart className="w-4 h-4" /> Request Groceries
        </button>
        <button onClick={() => setActiveTab('incoming')} className={`flex items-center gap-2 px-5 py-3 font-semibold text-sm border-b-2 transition-colors whitespace-nowrap ${activeTab === 'incoming' ? 'border-primary text-primary' : 'border-transparent text-secondary hover:text-primary'}`}>
          <Truck className="w-4 h-4" /> Incoming Deliveries
          {incomingCount > 0 && <span className="bg-danger text-white text-[10px] px-2 py-0.5 rounded-full">{incomingCount}</span>}
        </button>
        <button onClick={() => setActiveTab('stock')} className={`flex items-center gap-2 px-5 py-3 font-semibold text-sm border-b-2 transition-colors whitespace-nowrap ${activeTab === 'stock' ? 'border-primary text-primary' : 'border-transparent text-secondary hover:text-primary'}`}>
          <Archive className="w-4 h-4" /> Live Kitchen Stock
        </button>
      </div>

      {activeTab === 'orders' && (
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="font-bold text-lg text-primary mb-4 flex items-center gap-2">
              <Utensils className="w-5 h-5 text-primary" /> Today's Menu & Status
            </h2>
            {todayMenu ? (
              <div className="mb-6 p-4 bg-primary-bg border border-primary border-opacity-20 rounded-xl">
                <h3 className="font-bold text-primary mb-2">Today's Menu</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  <div className="bg-card p-2 rounded border border-primary border-opacity-20 text-center">
                    <span className="block text-[10px] uppercase font-bold text-primary">Breakfast</span>
                    <span className="text-sm text-primary font-medium">{todayMenu.breakfast || 'TBD'}</span>
                  </div>
                  <div className="bg-card p-2 rounded border border-primary border-opacity-20 text-center">
                    <span className="block text-[10px] uppercase font-bold text-primary">Lunch</span>
                    <span className="text-sm text-primary font-medium">{todayMenu.lunch || 'TBD'}</span>
                  </div>
                  <div className="bg-card p-2 rounded border border-primary border-opacity-20 text-center">
                    <span className="block text-[10px] uppercase font-bold text-primary">Dinner</span>
                    <span className="text-sm text-primary font-medium">{todayMenu.dinner || 'TBD'}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mb-6 p-4 bg-input rounded-xl border border-border text-sm text-secondary italic">
                No menu set for today.
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(['Breakfast', 'Lunch', 'Dinner'] as MealType[]).map(meal => (
                <div key={meal} className="border border-border p-4 rounded-xl flex flex-col items-center text-center gap-3">
                  <h3 className="font-bold text-primary">{meal}</h3>
                  {mealStatuses[meal] === 'pending' && (
                    <button onClick={() => handleMarkMealReady(meal)} className="bg-primary hover:bg-primary-hover text-white w-full py-2 rounded-lg text-sm font-bold transition-colors">
                      Mark Ready
                    </button>
                  )}
                  {mealStatuses[meal] === 'ready' && (
                    <span className="w-full py-2 bg-warning-bg text-warning rounded-lg text-sm font-bold border border-warning border-opacity-20">
                      Waiting for Manager
                    </span>
                  )}
                  {mealStatuses[meal] === 'announced' && (
                    <span className="w-full py-2 bg-success-bg text-success rounded-lg text-sm font-bold flex items-center justify-center gap-2">
                      <CheckCircle className="w-4 h-4" /> Announced
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="font-bold text-lg text-primary mb-4 flex items-center gap-2">
              <Utensils className="w-5 h-5 text-primary" /> Live Meal Queue ({orders.length})
            </h2>
          <div className="space-y-3">
            {paginatedOrders.map(o => (
              <div key={o.id} className="flex justify-between items-center p-3 bg-input border border-border rounded-xl">
                <div>
                  <div className="font-bold text-primary">{o.studentName} <span className="text-xs text-secondary font-normal ml-2">Room {o.roomNumber}</span></div>
                  <div className="text-sm text-secondary mt-1">{o.mealType}</div>
                </div>
                {o.status === 'Pending' ? (
                  <button onClick={() => handleMarkServed(o.id)} className="flex items-center gap-2 bg-success text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-green-600 transition-colors">
                    <CheckCircle className="w-4 h-4" /> Served
                  </button>
                ) : (
                  <span className="text-xs font-bold text-success px-3 py-1 bg-success-bg rounded-full">Completed</span>
                )}
              </div>
            ))}
            {orders.length === 0 && (
              <div className="text-center p-8 text-secondary">No active meal orders.</div>
            )}
            {ordersTotalPages > 1 && <Pagination currentPage={ordersPage} totalPages={ordersTotalPages} onPageChange={setOrdersPage} />}
          </div>
        </div>
        </div>
      )}

      {activeTab === 'request' && (
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
              <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary-hover transition-colors mt-2">
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
      )}

      {activeTab === 'incoming' && (
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
                  className="bg-success text-white px-4 py-2 mt-4 rounded-lg text-sm font-bold hover:bg-green-600 transition-colors flex items-center gap-2 whitespace-nowrap"
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
      )}

      {activeTab === 'stock' && (
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
              {paginatedStock.map(item => (
                <tr key={item.id} className="hover:bg-input transition-colors">
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
      )}
    </div>
  );
}
