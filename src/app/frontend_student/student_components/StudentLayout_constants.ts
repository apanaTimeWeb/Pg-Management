import { 
  LayoutDashboard, User, UserPlus, BedDouble, IndianRupee, Shield, 
  CheckSquare, Utensils, CalendarOff, Users, MessageSquareWarning, 
  Bell, FileText, ListTodo, HelpCircle, Activity, Lock
} from 'lucide-react';

export const STUDENT_MENU_ITEMS = [
  { key: 'dashboard', icon: LayoutDashboard, href: '/frontend_student/student_dashboard', label: 'Dashboard' },
  { key: 'profile', icon: User, href: '/frontend_student/student_profile', label: 'My Profile' },
  { 
    key: 'admission', icon: UserPlus, href: '/frontend_student/student_admission', label: 'My Admission',
    subItems: [
      { label: 'Admission Details', href: '/frontend_student/student_admission' },
      { label: 'Status', href: '/frontend_student/student_admission?view=status' },
      { label: 'Agreement', href: '/frontend_student/student_admission?view=agreement' }
    ]
  },
  { 
    key: 'room', icon: BedDouble, href: '/frontend_student/student_room', label: 'My Room & Bed',
    subItems: [
      { label: 'Room Details', href: '/frontend_student/student_room' },
      { label: 'Bed Details', href: '/frontend_student/student_room?view=bed' },
      { label: 'Roommates', href: '/frontend_student/student_room?view=roommates' },
      { label: 'Room Change Request', href: '/frontend_student/student_room?view=change' }
    ]
  },
  { 
    key: 'finance', icon: IndianRupee, href: '/frontend_student/student_rent', label: 'Fees & Payments',
    subItems: [
      { label: 'Current Fees', href: '/frontend_student/student_rent' },
      { label: 'Pay Fees', href: '/frontend_student/student_rent?action=pay' },
      { label: 'Pending Dues', href: '/frontend_student/student_rent?view=pending' },
      { label: 'Payment History', href: '/frontend_student/student_rent?view=history' },
      { label: 'Receipts', href: '/frontend_student/student_rent?view=receipts' }
    ]
  },
  { 
    key: 'deposit', icon: Shield, href: '/frontend_student/student_security_deposit', label: 'Security Deposit',
    subItems: [
      { label: 'Deposit Details', href: '/frontend_student/student_security_deposit' },
      { label: 'Settlement', href: '/frontend_student/student_security_deposit?view=settlement' }
    ]
  },
  { 
    key: 'attendance', icon: CheckSquare, href: '/frontend_student/student_attendance', label: 'Attendance',
    subItems: [
      { label: 'Today', href: '/frontend_student/student_attendance' },
      { label: 'Monthly', href: '/frontend_student/student_attendance?view=monthly' },
      { label: 'History', href: '/frontend_student/student_attendance?view=history' }
    ]
  },
  { 
    key: 'mess', icon: Utensils, href: '/frontend_student/student_mess', label: 'Mess / Food',
    subItems: [
      { label: "Today's Menu", href: '/frontend_student/student_mess' },
      { label: 'Weekly Menu', href: '/frontend_student/student_mess?view=weekly' },
      { label: 'Meal Attendance', href: '/frontend_student/student_mess?view=attendance' },
      { label: 'My Meal Count', href: '/frontend_student/student_mess?view=count' },
      { label: 'Food Complaint', href: '/frontend_student/student_mess?view=complaints' }
    ]
  },
  { 
    key: 'leaves', icon: CalendarOff, href: '/frontend_student/student_leaves', label: 'Leave / Outing',
    subItems: [
      { label: 'New Request', href: '/frontend_student/student_leaves?action=new' },
      { label: 'Pending', href: '/frontend_student/student_leaves?view=pending' },
      { label: 'Approved', href: '/frontend_student/student_leaves?view=approved' },
      { label: 'Active', href: '/frontend_student/student_leaves?view=active' },
      { label: 'History', href: '/frontend_student/student_leaves?view=history' }
    ]
  },
  { 
    key: 'visitors', icon: Users, href: '/frontend_student/student_visitors', label: 'Visitors',
    subItems: [
      { label: 'Request Visitor', href: '/frontend_student/student_visitors?action=new' },
      { label: 'Pending', href: '/frontend_student/student_visitors?view=pending' },
      { label: 'Approved', href: '/frontend_student/student_visitors?view=approved' },
      { label: 'History', href: '/frontend_student/student_visitors?view=history' }
    ]
  },
  { 
    key: 'complaints', icon: MessageSquareWarning, href: '/frontend_student/student_complaints', label: 'Complaints & Maintenance',
    subItems: [
      { label: 'New Complaint', href: '/frontend_student/student_complaints?action=new' },
      { label: 'My Complaints', href: '/frontend_student/student_complaints' },
      { label: 'Maintenance', href: '/frontend_student/student_complaints?view=maintenance' },
      { label: 'Resolved / Closed', href: '/frontend_student/student_complaints?view=resolved' }
    ]
  },
  { key: 'notices', icon: Bell, href: '/frontend_student/student_notices', label: 'Notices' },
  { 
    key: 'documents', icon: FileText, href: '/frontend_student/student_documents', label: 'Documents',
    subItems: [
      { label: 'My Documents', href: '/frontend_student/student_documents' },
      { label: 'Upload', href: '/frontend_student/student_documents?action=upload' },
      { label: 'Verification Status', href: '/frontend_student/student_documents?view=status' }
    ]
  },
  { 
    key: 'requests', icon: ListTodo, href: '/frontend_student/student_requests', label: 'Requests',
    subItems: [
      { label: 'All Requests', href: '/frontend_student/student_requests' },
      { label: 'Pending', href: '/frontend_student/student_requests?view=pending' },
      { label: 'Approved', href: '/frontend_student/student_requests?view=approved' },
      { label: 'Rejected', href: '/frontend_student/student_requests?view=rejected' },
      { label: 'Completed', href: '/frontend_student/student_requests?view=completed' }
    ]
  },
  { key: 'notifications', icon: Bell, href: '/frontend_student/student_notifications', label: 'Notifications' },
  { 
    key: 'support', icon: HelpCircle, href: '/frontend_student/student_support', label: 'Help & Support',
    subItems: [
      { label: 'FAQs', href: '/frontend_student/student_support' },
      { label: 'Support Tickets', href: '/frontend_student/student_support?view=tickets' }
    ]
  },
  { key: 'activity', icon: Activity, href: '/frontend_student/student_history', label: 'My Activity' },
  { 
    key: 'security', icon: Lock, href: '/frontend_student/student_settings', label: 'Profile / Security',
    subItems: [
      { label: 'My Profile', href: '/frontend_student/student_settings' },
      { label: 'Change Password', href: '/frontend_student/student_settings?view=password' },
      { label: 'Mobile Verification', href: '/frontend_student/student_settings?view=mobile' },
      { label: 'Email Verification', href: '/frontend_student/student_settings?view=email' },
      { label: 'Active Sessions', href: '/frontend_student/student_settings?view=sessions' },
      { label: 'Login History', href: '/frontend_student/student_settings?view=login-history' },
      { label: 'Notification Preferences', href: '/frontend_student/student_settings?view=notifications' },
      { label: 'Privacy', href: '/frontend_student/student_settings?view=privacy' },
      { label: '2FA / OTP', href: '/frontend_student/student_settings?view=2fa' },
      { label: 'Device Management', href: '/frontend_student/student_settings?view=devices' }
    ]
  }
];
