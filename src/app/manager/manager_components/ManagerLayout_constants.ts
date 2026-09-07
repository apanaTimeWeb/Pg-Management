import { 
  LayoutDashboard, MessageSquare, ClipboardCheck, BedDouble, 
  Users, AlertCircle, Utensils, UserPlus, Clock, LogOut, Radio, FileText, Archive, IndianRupee, Receipt
} from 'lucide-react';
export const MENU_ITEMS = [
  { key: 'dashboard', icon: LayoutDashboard, href: '/manager/dashboard' },
  { key: 'enquiries', icon: MessageSquare, href: '/manager/enquiries' },
  { key: 'checkin', icon: ClipboardCheck, href: '/manager/check-in' },
  { key: 'rooms', icon: BedDouble, href: '/manager/rooms' },
  { key: 'students', icon: Users, href: '/manager/students' },
  { key: 'complaints', icon: AlertCircle, href: '/manager/complaints' },
  { key: 'food', icon: Utensils, href: '/manager/food', label: 'Food Menu' },
  { key: 'visitors', icon: UserPlus, href: '/manager/visitors' },
  { key: 'attendance', icon: Clock, href: '/manager/attendance' },
  { key: 'gate-logs', icon: LogOut, href: '/manager/gate-logs' },
  { key: 'broadcasts', icon: Radio, href: '/manager/broadcasts' },
  { key: 'documents', icon: FileText, href: '/manager/documents' },
  { key: 'inventory', icon: Archive, href: '/manager/inventory' },
  { key: 'finance', icon: IndianRupee, href: '/manager/finance' },
  { key: 'expenses', icon: Receipt, href: '/manager/expenses', label: 'Expenses' }
];