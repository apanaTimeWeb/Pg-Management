import os

base_path = r'c:\Users\Rohit\Desktop\Project_to_work\PG\src\app\frontend_owner'
routes = [
  'pg_management/properties', 'pg_management/buildings', 'pg_management/floors', 'pg_management/info',
  'rooms_beds/rooms', 'rooms_beds/beds', 'rooms_beds/occupancy', 'rooms_beds/available', 'rooms_beds/maintenance',
  'students/all', 'students/active', 'students/pending', 'students/notice_period', 'students/checked_out',
  'admissions/enquiries', 'admissions/applications', 'admissions/verification', 'admissions/approved', 'admissions/rejected',
  'checkin_checkout/checkin', 'checkin_checkout/checkout', 'checkin_checkout/transfers', 'checkin_checkout/history',
  'fees_payments/rent', 'fees_payments/dues', 'fees_payments/payments', 'fees_payments/receipts', 'fees_payments/fines', 'fees_payments/refunds',
  'security_deposit',
  'accounts/income', 'accounts/expenses', 'accounts/vendors', 'accounts/reports',
  'staff/all', 'staff/managers', 'staff/cooks',
  'mess_food/menu', 'mess_food/meals', 'mess_food/attendance', 'mess_food/stock',
  'attendance', 'leave_outing', 'visitors',
  'complaints_maintenance/complaints', 'complaints_maintenance/maintenance', 'complaints_maintenance/assignments', 'complaints_maintenance/history',
  'inventory/items', 'inventory/stock_in', 'inventory/stock_out', 'inventory/low_stock', 'inventory/damage_loss',
  'notices', 'documents', 'reports', 'notifications', 'pg_settings', 'activity_audit', 'my_profile'
]

for route in routes:
    full_path = os.path.join(base_path, os.path.normpath(route))
    os.makedirs(full_path, exist_ok=True)
    
    title = route.split('/')[-1].replace('_', ' ').title()
    
    page_content = f"""import React from 'react';

export default function Page() {{
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 min-h-[500px]">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">{title}</h1>
      <p className="text-gray-500">This is the placeholder page for {title}.</p>
    </div>
  );
}}
"""
    with open(os.path.join(full_path, 'page.tsx'), 'w', encoding='utf-8') as f:
        f.write(page_content)

print('Routes generated successfully.')
