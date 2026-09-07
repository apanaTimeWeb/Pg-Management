export const MOCK_OWNERS = [
  { 
    id: '1', userId: 'user1', name: 'Satya Prakash', email: 'satya@example.com', phone: '9876543210', businessName: 'Satya PGs', 
    city: 'Bangalore', address: '123 Tech Park', status: 'Active', planId: 'p2', propertiesCount: 5, bedsCount: 200, occupancy: 120, collectionThisMonth: 500000,
    createdAt: '2023-01-15T00:00:00Z', updatedAt: '2023-01-15T00:00:00Z', createdBy: 'system', updatedBy: 'system', isDeleted: false,
    lastLogin: '2024-03-15T10:30:00Z'
  },
  { 
    id: '2', userId: 'user2', name: 'Rahul Sharma', email: 'rahul@example.com', phone: '9876543211', businessName: 'Sharma Homes', 
    city: 'Mumbai', address: '456 Andheri West', status: 'Active', planId: 'p1', propertiesCount: 2, bedsCount: 50, occupancy: 45, collectionThisMonth: 150000,
    createdAt: '2023-03-10T00:00:00Z', updatedAt: '2023-03-10T00:00:00Z', createdBy: 'system', updatedBy: 'system', isDeleted: false,
    lastLogin: '2024-03-14T10:30:00Z'
  },
  { 
    id: '3', userId: 'user3', name: 'Amit Kumar', email: 'amit@example.com', phone: '9876543212', businessName: 'Amit Stays', 
    city: 'Pune', address: '789 Hinjewadi', status: 'Inactive', planId: 'p1', propertiesCount: 1, bedsCount: 25, occupancy: 20, collectionThisMonth: 80000,
    createdAt: '2023-05-22T00:00:00Z', updatedAt: '2023-05-22T00:00:00Z', createdBy: 'system', updatedBy: 'system', isDeleted: false,
    lastLogin: '2024-02-15T10:30:00Z'
  },
];

export const MOCK_REQUESTS = [
  { 
    id: 'req1', name: 'Vikram Singh', email: 'vikram@example.com', phone: '9123456780', businessName: 'Singh PG', 
    city: 'Delhi', pgCount: 1, bedCount: 30, status: 'Pending', planId: 'p2', message: 'Interested in Premium plan',
    createdAt: '2024-03-15T10:30:00Z', updatedAt: '2024-03-15T10:30:00Z', createdBy: 'public', updatedBy: 'public', isDeleted: false
  },
  { 
    id: 'req2', name: 'Priya Patel', email: 'priya@example.com', phone: '9123456781', businessName: 'Patel Girls Hostel', 
    city: 'Ahmedabad', pgCount: 2, bedCount: 100, status: 'Pending', planId: 'p1', message: 'Wants a demo before paying',
    createdAt: '2024-03-14T14:20:00Z', updatedAt: '2024-03-14T14:20:00Z', createdBy: 'public', updatedBy: 'public', isDeleted: false
  },
  { 
    id: 'req3', name: 'Neha Gupta', email: 'neha@example.com', phone: '9123456782', businessName: 'Gupta Residency', 
    city: 'Chennai', pgCount: 3, bedCount: 150, status: 'Approved', planId: 'p3', message: 'Documentation pending',
    createdAt: '2024-03-12T09:15:00Z', updatedAt: '2024-03-12T09:15:00Z', createdBy: 'public', updatedBy: 'public', isDeleted: false
  },
];

export const MOCK_DASHBOARD_STATS = {
  activeOwnersCount: 42,
  pendingRequestsCount: 8,
  activePropertiesCount: 156,
  totalStudentsCount: 3420,
  occupancyPercentage: 85,
  monthlyRecurringRevenue: 1250000,
  openTicketsCount: 12,
  expiringPlansCount: 5,
  latestRequests: MOCK_REQUESTS,
  recentAuditLogs: [
    { id: 'log1', action: 'Approved Owner', adminId: 'admin1', details: 'Approved request req3', timestamp: '2024-03-15T11:00:00Z' },
    { id: 'log2', action: 'Changed Plan', adminId: 'admin1', details: 'Upgraded Owner 1 to Premium', timestamp: '2024-03-14T16:30:00Z' },
  ],
  ownersByPlan: [
    { plan: 'Basic', count: 20 },
    { plan: 'Premium', count: 15 },
    { plan: 'Enterprise', count: 7 },
  ],
};

export const MOCK_TICKETS = [
  { 
    id: 't1', title: 'Payment Gateway Issue', description: 'Students cannot pay via UPI', status: 'Open', priority: 'High', 
    ownerId: '1', ownerName: 'Satya Prakash', category: 'Billing', 
    createdAt: '2024-03-15T09:00:00Z', updatedAt: '2024-03-15T09:00:00Z', createdBy: '1', updatedBy: '1', isDeleted: false 
  },
  { 
    id: 't2', title: 'Need more properties', description: 'How do I add a 6th property?', status: 'In Progress', priority: 'Medium', 
    ownerId: '1', ownerName: 'Satya Prakash', category: 'Account', 
    createdAt: '2024-03-14T10:00:00Z', updatedAt: '2024-03-14T10:00:00Z', createdBy: '1', updatedBy: '1', isDeleted: false 
  },
  { 
    id: 't3', title: 'App crashing on iOS', description: 'The manager app crashes on login', status: 'Resolved', priority: 'High', 
    ownerId: '2', ownerName: 'Rahul Sharma', category: 'Technical', 
    createdAt: '2024-03-10T14:00:00Z', updatedAt: '2024-03-10T14:00:00Z', createdBy: '2', updatedBy: '2', isDeleted: false 
  },
];

export const MOCK_PLANS = [
  { id: 'p1', name: 'Basic', price: 999, maxProperties: 1, features: ['Tenant Management', 'Basic Reports'], isPopular: false },
  { id: 'p2', name: 'Premium', price: 2499, maxProperties: 5, features: ['Tenant Management', 'Advanced Reports', 'Payment Gateway', 'Staff Logins'], isPopular: true },
  { id: 'p3', name: 'Enterprise', price: 4999, maxProperties: -1, features: ['Unlimited Properties', 'White-labeling', 'Dedicated Support'], isPopular: false },
];
