'use client';

import React, { useState } from 'react';
import { 
  Star, 
  UserPlus, 
  UtensilsCrossed, 
  PartyPopper, 
  CheckCircle2, 
  ChefHat, 
  Clock, 
  AlertCircle,
  ChevronRight
} from 'lucide-react';

type MealType = 'Guest Meal' | 'Extra Meal' | 'Special Event' | 'Festival Meal' | 'Approved Special Diet';
type MealStatus = 'Approved' | 'Preparing' | 'Ready' | 'Served';

interface SpecialMealRequest {
  id: string;
  type: MealType;
  requestedBy: string; // e.g., "Student (Room 102)" or "Manager"
  details: string;
  count: number;
  timeSlot: string; // e.g., "Lunch - 1:00 PM"
  status: MealStatus;
  date: string;
}

const MOCK_REQUESTS: SpecialMealRequest[] = [
  {
    id: 'REQ-101',
    type: 'Guest Meal',
    requestedBy: 'Aarav (Room 204)',
    details: '2 guests joining for dinner. Standard Veg Thali.',
    count: 2,
    timeSlot: 'Dinner - 8:30 PM',
    status: 'Approved',
    date: 'Today, Oct 04'
  },
  {
    id: 'REQ-102',
    type: 'Approved Special Diet',
    requestedBy: 'Priya (Room 105)',
    details: 'No Onion, No Garlic (Jain Meal) requested due to fasting.',
    count: 1,
    timeSlot: 'Lunch - 1:30 PM',
    status: 'Preparing',
    date: 'Today, Oct 04'
  },
  {
    id: 'REQ-103',
    type: 'Festival Meal',
    requestedBy: 'Manager',
    details: 'Navratri Special Fasting Thali (Sabudana Khichdi, Fruits) for 15 students.',
    count: 15,
    timeSlot: 'Dinner - 8:00 PM',
    status: 'Approved',
    date: 'Tomorrow, Oct 05'
  },
  {
    id: 'REQ-104',
    type: 'Special Event',
    requestedBy: 'Manager',
    details: 'Welcome party snacks (Samosa, Tea) for new batch.',
    count: 40,
    timeSlot: 'Evening Snacks - 5:00 PM',
    status: 'Ready',
    date: 'Today, Oct 04'
  },
  {
    id: 'REQ-105',
    type: 'Extra Meal',
    requestedBy: 'Vikram (Room 302)',
    details: 'Requested double portion for lunch.',
    count: 1,
    timeSlot: 'Lunch - 1:00 PM',
    status: 'Served',
    date: 'Today, Oct 04'
  }
];

const getTypeIconAndColor = (type: MealType) => {
  switch (type) {
    case 'Guest Meal': return { icon: UserPlus, color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/30' };
    case 'Extra Meal': return { icon: UtensilsCrossed, color: 'text-indigo-500', bg: 'bg-indigo-100 dark:bg-indigo-900/30' };
    case 'Special Event': return { icon: PartyPopper, color: 'text-pink-500', bg: 'bg-pink-100 dark:bg-pink-900/30' };
    case 'Festival Meal': return { icon: Star, color: 'text-orange-500', bg: 'bg-orange-100 dark:bg-orange-900/30' };
    case 'Approved Special Diet': return { icon: AlertCircle, color: 'text-teal-500', bg: 'bg-teal-100 dark:bg-teal-900/30' };
  }
};

const getStatusBadge = (status: MealStatus) => {
  switch (status) {
    case 'Approved': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    case 'Preparing': return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'Ready': return 'bg-orange-100 text-orange-700 border-orange-200';
    case 'Served': return 'bg-green-100 text-green-700 border-green-200';
  }
};

export default function SpecialMealsPage() {
  const [requests, setRequests] = useState<SpecialMealRequest[]>(MOCK_REQUESTS);
  const [filter, setFilter] = useState<'All' | 'Pending Action' | 'Completed'>('Pending Action');

  const updateStatus = (id: string, newStatus: MealStatus) => {
    setRequests(prev => prev.map(req => req.id === id ? { ...req, status: newStatus } : req));
  };

  const filteredRequests = requests.filter(req => {
    if (filter === 'Pending Action') return req.status !== 'Served';
    if (filter === 'Completed') return req.status === 'Served';
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary/10 rounded-xl">
            <Star className="w-6 h-6 text-primary fill-primary/20" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-primary tracking-tight">Special Meal Requests</h1>
            <p className="text-sm text-secondary">Manage and prepare approved custom meal requests</p>
          </div>
        </div>
        
        {/* Flow visualizer */}
        <div className="hidden lg:flex items-center gap-2 text-xs font-semibold text-secondary/60 bg-card border border-border px-4 py-2 rounded-lg shadow-sm">
          <span>Approved</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-primary">Preparation</span>
          <ChevronRight className="w-3 h-3" />
          <span>Served</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center bg-card border border-border rounded-lg p-1 w-fit shadow-sm">
        {['Pending Action', 'Completed', 'All'].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab as any)}
            className={`px-4 py-2 text-sm font-semibold rounded-md transition-all ${
              filter === tab 
                ? 'bg-primary text-white shadow-md' 
                : 'text-secondary hover:text-primary hover:bg-page'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Requests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-5">
        {filteredRequests.map((req) => {
          const { icon: Icon, color, bg } = getTypeIconAndColor(req.type);
          
          return (
            <div 
              key={req.id} 
              className={`bg-card border rounded-xl overflow-hidden shadow-sm transition-all
                ${req.status === 'Served' ? 'border-border/50 opacity-75' : 'border-border hover:border-primary/40 hover:shadow-md'}
              `}
            >
              {/* Card Header */}
              <div className="p-4 border-b border-border flex items-start justify-between bg-page/30">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${bg}`}>
                    <Icon className={`w-5 h-5 ${color}`} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-primary">{req.type}</h3>
                    <p className="text-xs text-secondary font-medium">{req.date} &bull; {req.timeSlot}</p>
                  </div>
                </div>
                <div className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${getStatusBadge(req.status)}`}>
                  {req.status}
                </div>
              </div>
              
              {/* Card Body */}
              <div className="p-5 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="block text-xs text-secondary font-medium mb-1">Requested By</span>
                    <span className="block text-sm font-semibold text-primary">{req.requestedBy}</span>
                  </div>
                  <div>
                    <span className="block text-xs text-secondary font-medium mb-1">Quantity/Count</span>
                    <span className="block text-sm font-semibold text-primary bg-page border border-border px-2 py-0.5 rounded-md w-fit">
                      {req.count} {req.count > 1 ? 'Persons' : 'Person'}
                    </span>
                  </div>
                </div>
                
                <div className="bg-page/50 border border-border/50 p-3 rounded-lg">
                  <span className="block text-xs text-secondary font-medium mb-1">Request Details</span>
                  <p className="text-sm text-primary/90 font-medium leading-relaxed">{req.details}</p>
                </div>
              </div>
              
              {/* Card Footer / Actions */}
              <div className="p-4 border-t border-border bg-page/30 flex items-center justify-end gap-3">
                {req.status === 'Approved' && (
                  <button 
                    onClick={() => updateStatus(req.id, 'Preparing')}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors shadow-sm"
                  >
                    <ChefHat className="w-4 h-4" />
                    Start Preparation
                  </button>
                )}
                
                {req.status === 'Preparing' && (
                  <button 
                    onClick={() => updateStatus(req.id, 'Ready')}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors shadow-sm"
                  >
                    <Clock className="w-4 h-4" />
                    Mark as Ready
                  </button>
                )}
                
                {req.status === 'Ready' && (
                  <button 
                    onClick={() => updateStatus(req.id, 'Served')}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors shadow-sm"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Mark as Served
                  </button>
                )}
                
                {req.status === 'Served' && (
                  <span className="text-sm font-bold text-green-600 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    Served & Completed
                  </span>
                )}
              </div>
            </div>
          );
        })}

        {filteredRequests.length === 0 && (
          <div className="col-span-1 md:col-span-2 xl:col-span-2 flex flex-col items-center justify-center p-12 bg-card border border-border rounded-xl">
            <Star className="w-12 h-12 text-secondary/30 mb-4" />
            <h3 className="text-lg font-medium text-primary">No Requests Found</h3>
            <p className="text-sm text-secondary mt-1">There are no {filter.toLowerCase()} special meal requests.</p>
          </div>
        )}
      </div>
    </div>
  );
}
