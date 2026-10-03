import { 
  LayoutDashboard, Users, UserPlus, BedDouble, LogIn, 
  Clock, IndianRupee, CalendarOff, UserCheck, AlertCircle, 
  Wrench, Utensils, Archive, FileText, Radio, 
  ClipboardCheck, BarChart3, Bell, History, ShieldAlert,
  ChevronDown, ChevronRight
} from 'lucide-react';

export const MENU_ITEMS = [
  { key: 'dashboard', icon: LayoutDashboard, href: '/frontend_manager/manager_dashboard', label: 'Dashboard' },
  { 
    key: 'students', icon: Users, href: '/frontend_manager/manager_students', label: 'Students',
    subItems: [
      { label: 'All Students', href: '/frontend_manager/manager_students' },
      { label: 'Active Students', href: '/frontend_manager/manager_students?status=active' },
      { label: 'Notice Period', href: '/frontend_manager/manager_students?status=notice' },
      { label: 'On Leave', href: '/frontend_manager/manager_students?status=leave' },
      { label: 'Checked Out', href: '/frontend_manager/manager_students?status=checkedout' }
    ]
  },
  { 
    key: 'admissions', icon: UserPlus, href: '/frontend_manager/manager_admissions', label: 'Admissions',
    subItems: [
      { label: 'Enquiries', href: '/frontend_manager/manager_admissions?tab=enquiries' },
      { label: 'Applications', href: '/frontend_manager/manager_admissions?tab=applications' },
      { label: 'Verification', href: '/frontend_manager/manager_admissions?tab=verification' },
      { label: 'Approved', href: '/frontend_manager/manager_admissions?tab=approved' },
      { label: 'Rejected', href: '/frontend_manager/manager_admissions?tab=rejected' }
    ]
  },
  { 
    key: 'rooms', icon: BedDouble, href: '/frontend_manager/manager_rooms', label: 'Rooms & Beds',
    subItems: [
      { label: 'Rooms', href: '/frontend_manager/manager_rooms' },
      { label: 'Beds', href: '/frontend_manager/manager_rooms?view=beds' },
      { label: 'Occupancy', href: '/frontend_manager/manager_rooms?view=occupancy' },
      { label: 'Available Beds', href: '/frontend_manager/manager_rooms?view=available' },
      { label: 'Maintenance Beds', href: '/frontend_manager/manager_rooms?view=maintenance' }
    ]
  },
  { 
    key: 'checkin', icon: LogIn, href: '/frontend_manager/manager_check_in', label: 'Check-in / Check-out',
    subItems: [
      { label: 'Check-in', href: '/frontend_manager/manager_check_in' },
      { label: 'Check-out', href: '/frontend_manager/manager_check_in?mode=checkout' },
      { label: 'Transfers', href: '/frontend_manager/manager_check_in?mode=transfers' },
      { label: 'History', href: '/frontend_manager/manager_check_in?mode=history' }
    ]
  },
  { 
    key: 'attendance', icon: Clock, href: '/frontend_manager/manager_attendance', label: 'Attendance',
    subItems: [
      { label: 'Student Attendance', href: '/frontend_manager/manager_attendance' },
      { label: 'Staff Attendance', href: '/frontend_manager/manager_attendance?type=staff' },
      { label: 'Reports', href: '/frontend_manager/manager_attendance?view=reports' }
    ]
  },
  { 
    key: 'finance', icon: IndianRupee, href: '/frontend_manager/manager_finance', label: 'Fees & Dues',
    subItems: [
      { label: 'Today\\'s Collection', href: '/frontend_manager/manager_finance?view=today' },
      { label: 'Pending Dues', href: '/frontend_manager/manager_finance?view=pending' },
      { label: 'Overdue', href: '/frontend_manager/manager_finance?view=overdue' },
      { label: 'Payment History', href: '/frontend_manager/manager_finance?view=history' }
    ]
  },
  { 
    key: 'leaves', icon: CalendarOff, href: '/frontend_manager/manager_leaves', label: 'Leave / Outing',
    subItems: [
      { label: 'Pending Requests', href: '/frontend_manager/manager_leaves' },
      { label: 'Approved', href: '/frontend_manager/manager_leaves?status=approved' },
      { label: 'Active Outing', href: '/frontend_manager/manager_leaves?status=active' },
      { label: 'History', href: '/frontend_manager/manager_leaves?status=history' }
    ]
  },
  { 
    key: 'visitors', icon: UserCheck, href: '/frontend_manager/manager_visitors', label: 'Visitors',
    subItems: [
      { label: 'Today\\'s Visitors', href: '/frontend_manager/manager_visitors' },
      { label: 'Pending', href: '/frontend_manager/manager_visitors?status=pending' },
      { label: 'Entry', href: '/frontend_manager/manager_visitors?view=entry' },
      { label: 'Exit', href: '/frontend_manager/manager_visitors?view=exit' },
      { label: 'History', href: '/frontend_manager/manager_visitors?view=history' }
    ]
  },
  { 
    key: 'complaints', icon: AlertCircle, href: '/frontend_manager/manager_complaints', label: 'Complaints',
    subItems: [
      { label: 'New', href: '/frontend_manager/manager_complaints' },
      { label: 'In Progress', href: '/frontend_manager/manager_complaints?status=progress' },
      { label: 'Resolved', href: '/frontend_manager/manager_complaints?status=resolved' },
      { label: 'Closed', href: '/frontend_manager/manager_complaints?status=closed' }
    ]
  },
  { 
    key: 'maintenance', icon: Wrench, href: '/frontend_manager/manager_maintenance', label: 'Maintenance',
    subItems: [
      { label: 'Pending', href: '/frontend_manager/manager_maintenance' },
      { label: 'Assigned', href: '/frontend_manager/manager_maintenance?status=assigned' },
      { label: 'In Progress', href: '/frontend_manager/manager_maintenance?status=progress' },
      { label: 'Completed', href: '/frontend_manager/manager_maintenance?status=completed' }
    ]
  },
  { 
    key: 'food', icon: Utensils, href: '/frontend_manager/manager_food', label: 'Mess / Food',
    subItems: [
      { label: 'Today\\'s Menu', href: '/frontend_manager/manager_food' },
      { label: 'Menu', href: '/frontend_manager/manager_food?view=menu' },
      { label: 'Meal Attendance', href: '/frontend_manager/manager_food?view=attendance' },
      { label: 'Meal Count', href: '/frontend_manager/manager_food?view=count' },
      { label: 'Food Complaints', href: '/frontend_manager/manager_food?view=complaints' }
    ]
  },
  { 
    key: 'inventory', icon: Archive, href: '/frontend_manager/manager_inventory', label: 'Inventory',
    subItems: [
      { label: 'Stock', href: '/frontend_manager/manager_inventory' },
      { label: 'Stock In', href: '/frontend_manager/manager_inventory?view=in' },
      { label: 'Stock Out', href: '/frontend_manager/manager_inventory?view=out' },
      { label: 'Low Stock', href: '/frontend_manager/manager_inventory?view=low' },
      { label: 'Damage / Loss', href: '/frontend_manager/manager_inventory?view=damage' }
    ]
  },
  { 
    key: 'staff', icon: Users, href: '/frontend_manager/manager_staff', label: 'Staff',
    subItems: [
      { label: 'Staff List', href: '/frontend_manager/manager_staff' },
      { label: 'Duty', href: '/frontend_manager/manager_staff?view=duty' },
      { label: 'Attendance', href: '/frontend_manager/manager_staff?view=attendance' },
      { label: 'Tasks', href: '/frontend_manager/manager_staff?view=tasks' }
    ]
  },
  { key: 'broadcasts', icon: Radio, href: '/frontend_manager/manager_broadcasts', label: 'Notices' },
  { key: 'documents', icon: FileText, href: '/frontend_manager/manager_documents', label: 'Documents' },
  { key: 'daily-ops', icon: ClipboardCheck, href: '/frontend_manager/manager_daily_operations', label: 'Daily Operations' },
  { key: 'reports', icon: BarChart3, href: '/frontend_manager/manager_reports', label: 'Reports' },
  { key: 'notifications', icon: Bell, href: '/frontend_manager/manager_notifications', label: 'Notifications' },
  { key: 'history', icon: History, href: '/frontend_manager/manager_activity_history', label: 'Activity History' },
  { key: 'profile', icon: ShieldAlert, href: '/frontend_manager/manager_profile', label: 'My Profile' }
];
