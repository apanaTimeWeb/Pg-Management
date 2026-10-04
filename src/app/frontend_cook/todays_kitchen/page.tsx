'use client';

import React, { useState } from 'react';
import { 
  UtensilsCrossed, 
  Clock, 
  Users, 
  CheckCircle2, 
  PlayCircle,
  Flame,
  Utensils,
  ChevronRight,
  StopCircle
} from 'lucide-react';

type MealStatus = 'Scheduled' | 'Preparation Started' | 'In Preparation' | 'Ready' | 'Serving' | 'Completed';

interface KitchenMeal {
  id: string;
  type: string;
  time: string;
  menu: string[];
  expectedMeals: number;
  status: MealStatus;
  accentColor: string;
  bgLight: string;
}

const MOCK_MEALS: KitchenMeal[] = [
  {
    id: '1',
    type: 'Breakfast',
    time: '08:00 AM',
    menu: ['Poha', 'Tea'],
    expectedMeals: 72,
    status: 'Ready',
    accentColor: 'text-blue-500',
    bgLight: 'bg-blue-50 dark:bg-blue-900/10'
  },
  {
    id: '2',
    type: 'Lunch',
    time: '01:00 PM',
    menu: ['Rice', 'Dal', 'Sabzi', 'Roti'],
    expectedMeals: 68,
    status: 'In Preparation',
    accentColor: 'text-orange-500',
    bgLight: 'bg-orange-50 dark:bg-orange-900/10'
  },
  {
    id: '3',
    type: 'Dinner',
    time: '08:30 PM',
    menu: ['Roti', 'Paneer', 'Salad'],
    expectedMeals: 70,
    status: 'Scheduled',
    accentColor: 'text-indigo-500',
    bgLight: 'bg-indigo-50 dark:bg-indigo-900/10'
  }
];

export default function TodaysKitchenPage() {
  const [meals, setMeals] = useState<KitchenMeal[]>(MOCK_MEALS);

  const updateStatus = (id: string, newStatus: MealStatus) => {
    setMeals(prev => prev.map(meal => meal.id === id ? { ...meal, status: newStatus } : meal));
  };

  const renderActionButton = (meal: KitchenMeal) => {
    switch (meal.status) {
      case 'Scheduled':
        return (
          <button onClick={() => updateStatus(meal.id, 'Preparation Started')} className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-lg text-sm transition-all shadow-sm">
            <PlayCircle className="w-4 h-4" /> Start preparation
          </button>
        );
      case 'Preparation Started':
        return (
          <button onClick={() => updateStatus(meal.id, 'In Preparation')} className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2.5 rounded-lg text-sm transition-all shadow-sm">
            <Flame className="w-4 h-4" /> Mark in preparation
          </button>
        );
      case 'In Preparation':
        return (
          <button onClick={() => updateStatus(meal.id, 'Ready')} className="w-full flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2.5 rounded-lg text-sm transition-all shadow-sm">
            <CheckCircle2 className="w-4 h-4" /> Mark ready
          </button>
        );
      case 'Ready':
        return (
          <button onClick={() => updateStatus(meal.id, 'Serving')} className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 rounded-lg text-sm transition-all shadow-sm">
            <Utensils className="w-4 h-4" /> Mark serving
          </button>
        );
      case 'Serving':
        return (
          <button onClick={() => updateStatus(meal.id, 'Completed')} className="w-full flex items-center justify-center gap-2 bg-page border border-border hover:bg-secondary/10 text-primary font-bold py-2.5 rounded-lg text-sm transition-all">
            <StopCircle className="w-4 h-4" /> Mark completed
          </button>
        );
      case 'Completed':
        return (
          <div className="w-full flex items-center justify-center gap-2 text-green-600 font-bold text-sm bg-green-100/50 py-2.5 rounded-lg">
            <CheckCircle2 className="w-5 h-5" /> Completed
          </div>
        );
      default:
        return null;
    }
  };

  const getStatusBadge = (status: MealStatus) => {
    switch (status) {
      case 'Scheduled': return 'bg-page text-secondary border-border';
      case 'Preparation Started': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'In Preparation': return 'bg-orange-100 text-orange-700 border-orange-200 animate-pulse';
      case 'Ready': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Serving': return 'bg-green-100 text-green-700 border-green-200 shadow-[0_0_10px_rgba(34,197,94,0.3)]';
      case 'Completed': return 'bg-gray-200 text-gray-600 border-gray-300 line-through decoration-gray-400/30';
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary/10 rounded-xl">
            <UtensilsCrossed className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-primary tracking-tight">Today's Kitchen</h1>
            <p className="text-sm font-medium text-secondary">Your primary operational dashboard for the day</p>
          </div>
        </div>

        {/* Global Flow Visualizer */}
        <div className="hidden lg:flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-secondary bg-card border border-border px-3 py-2 rounded-lg shadow-sm">
          <span>Scheduled</span>
          <ChevronRight className="w-3 h-3 text-border" />
          <span className="text-blue-500">Prep Started</span>
          <ChevronRight className="w-3 h-3 text-border" />
          <span className="text-orange-500">In Prep</span>
          <ChevronRight className="w-3 h-3 text-border" />
          <span className="text-yellow-600">Ready</span>
          <ChevronRight className="w-3 h-3 text-border" />
          <span className="text-green-500">Serving</span>
          <ChevronRight className="w-3 h-3 text-border" />
          <span className="text-gray-400">Completed</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
        {meals.map((meal) => {
          const isCompleted = meal.status === 'Completed';

          return (
            <div 
              key={meal.id} 
              className={`bg-card border rounded-2xl overflow-hidden shadow-sm flex flex-col transition-all duration-300
                ${isCompleted ? 'opacity-70 border-border/50 bg-page/30' : 'hover:shadow-md hover:border-primary/30'}
                ${meal.status === 'Serving' ? 'border-green-400/50 shadow-green-500/10' : ''}
                ${meal.status === 'In Preparation' ? 'border-orange-400/50 shadow-orange-500/10' : ''}
              `}
            >
              {/* Card Header */}
              <div className={`p-5 border-b border-border flex items-start justify-between ${meal.bgLight}`}>
                <div>
                  <h2 className={`text-2xl font-black tracking-tight ${meal.accentColor}`}>{meal.type}</h2>
                  <div className="flex items-center gap-1.5 mt-1 font-bold text-secondary text-sm">
                    <Clock className="w-4 h-4" /> {meal.time}
                  </div>
                </div>
                <div className={`px-2.5 py-1 text-xs font-bold rounded border ${getStatusBadge(meal.status)}`}>
                  {meal.status}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 space-y-6">
                
                {/* Menu Info */}
                <div>
                  <span className="block text-xs font-bold text-secondary uppercase tracking-wider mb-2">Menu Details</span>
                  <div className="flex flex-wrap gap-2">
                    {meal.menu.map((item, idx) => (
                      <span key={idx} className="bg-page border border-border text-primary px-3 py-1.5 rounded-md text-sm font-bold shadow-sm">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Expected Count */}
                <div className="bg-primary/5 border border-primary/10 rounded-xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-full text-primary">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block text-xs font-semibold text-secondary uppercase tracking-wider mb-0.5">Expected Plates</span>
                      <span className="text-xl font-black text-primary leading-none">{meal.expectedMeals}</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="p-5 border-t border-border bg-page/30 mt-auto">
                {renderActionButton(meal)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
