import { 
  LayoutDashboard, MessageSquare, ClipboardCheck, BedDouble, 
  Users, AlertCircle, Utensils, UserPlus, Clock, LogOut, Radio, FileText, Archive, IndianRupee, Receipt, Menu
} from 'lucide-react';

export const MENU_ITEMS = [
  { key: 'dashboard', icon: LayoutDashboard, href: '/frontend_manager/frontend_manager_dashboard' },
  { key: 'students', icon: Users, href: '/frontend_manager/frontend_manager_students' },
  { key: 'rooms', icon: BedDouble, href: '/frontend_manager/frontend_manager_rooms' },
  { key: 'checkin', icon: ClipboardCheck, href: '/frontend_manager/frontend_manager_check-in' },
  { key: 'enquiries', icon: MessageSquare, href: '/frontend_manager/frontend_manager_enquiries' },
  { key: 'complaints', icon: AlertCircle, href: '/frontend_manager/frontend_manager_complaints' },
  { key: 'visitors', icon: UserPlus, href: '/frontend_manager/frontend_manager_visitors' },
  { key: 'attendance', icon: Clock, href: '/frontend_manager/frontend_manager_attendance' },
  { key: 'gate-logs', icon: LogOut, href: '/frontend_manager/frontend_manager_gate-logs' },
  { key: 'leaves', icon: Clock, href: '/frontend_manager/frontend_manager_leaves', label: 'Leaves' },
  { key: 'food', icon: Utensils, href: '/frontend_manager/frontend_manager_food', label: 'Food Menu' },
  { key: 'broadcasts', icon: Radio, href: '/frontend_manager/frontend_manager_broadcasts' },
  { key: 'housekeeping', icon: ClipboardCheck, href: '/frontend_manager/frontend_manager_housekeeping', label: 'Housekeeping' },
  { key: 'documents', icon: FileText, href: '/frontend_manager/frontend_manager_documents' },
  { key: 'inventory', icon: Archive, href: '/frontend_manager/frontend_manager_inventory' },
  { key: 'finance', icon: IndianRupee, href: '/frontend_manager/frontend_manager_finance' },
  { key: 'expenses', icon: Receipt, href: '/frontend_manager/frontend_manager_expenses', label: 'Expenses' },
  { key: 'daily-ops', icon: FileText, href: '/frontend_manager/frontend_manager_daily-operations', label: 'Daily Ops' },
  { key: 'reports', icon: FileText, href: '/frontend_manager/frontend_manager_reports', label: 'Reports' },
  { key: 'staff', icon: Users, href: '/frontend_manager/frontend_manager_staff', label: 'Staff' },
  { key: 'settings', icon: Menu, href: '/frontend_manager/frontend_manager_settings', label: 'Settings' }
];