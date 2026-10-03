// @ts-nocheck
import { 
  LayoutDashboard, Users, UserPlus, BedDouble, LogIn, 
  Clock, IndianRupee, CalendarOff, UserCheck, AlertCircle, 
  Wrench, Utensils, Archive, FileText, Radio, 
  ClipboardCheck, BarChart3, Bell, History, ShieldAlert
} from 'lucide-react';

export const MENU_ITEMS = [
  { key: 'dashboard', icon: LayoutDashboard, href: '/frontend_manager/manager_dashboard', label: 'Dashboard' },
  { key: 'students', icon: Users, href: '/frontend_manager/manager_students', label: 'Students' },
  { key: 'admissions', icon: UserPlus, href: '/frontend_manager/manager_admissions', label: 'Admissions' },
  { key: 'rooms', icon: BedDouble, href: '/frontend_manager/manager_rooms', label: 'Rooms & Beds' },
  { key: 'checkin', icon: LogIn, href: '/frontend_manager/manager_check_in', label: 'Check-in / Out' },
  { key: 'attendance', icon: Clock, href: '/frontend_manager/manager_attendance', label: 'Attendance' },
  { key: 'finance', icon: IndianRupee, href: '/frontend_manager/manager_finance', label: 'Fees & Dues' },
  { key: 'leaves', icon: CalendarOff, href: '/frontend_manager/manager_leaves', label: 'Leave / Outing' },
  { key: 'visitors', icon: UserCheck, href: '/frontend_manager/manager_visitors', label: 'Visitors' },
  { key: 'complaints', icon: AlertCircle, href: '/frontend_manager/manager_complaints', label: 'Complaints' },
  { key: 'maintenance', icon: Wrench, href: '/frontend_manager/manager_maintenance', label: 'Maintenance' },
  { key: 'food', icon: Utensils, href: '/frontend_manager/manager_food', label: 'Mess / Food' },
  { key: 'inventory', icon: Archive, href: '/frontend_manager/manager_inventory', label: 'Inventory' },
  { key: 'staff', icon: Users, href: '/frontend_manager/manager_staff', label: 'Staff' },
  { key: 'broadcasts', icon: Radio, href: '/frontend_manager/manager_broadcasts', label: 'Notices' },
  { key: 'documents', icon: FileText, href: '/frontend_manager/manager_documents', label: 'Documents' },
  { key: 'daily-ops', icon: ClipboardCheck, href: '/frontend_manager/manager_daily_operations', label: 'Daily Operations' },
  { key: 'reports', icon: BarChart3, href: '/frontend_manager/manager_reports', label: 'Reports' },
  { key: 'notifications', icon: Bell, href: '/frontend_manager/manager_notifications', label: 'Notifications' },
  { key: 'history', icon: History, href: '/frontend_manager/manager_activity_history', label: 'Activity History' },
  { key: 'profile', icon: ShieldAlert, href: '/frontend_manager/manager_profile', label: 'My Profile' }
];