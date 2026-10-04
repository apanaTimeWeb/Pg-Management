'use client';

import React, { useState } from 'react';
import { 
  Activity,
  Utensils,
  CheckCircle2,
  AlertTriangle,
  PlayCircle,
  Clock,
  CheckSquare,
  Edit,
  Flame,
  ChefHat,
  ChevronRight
} from 'lucide-react';

type PrepStatus = 'Pending' | 'Started' | 'Ready' | 'Served' | 'Completed';

interface Ingredient {
  name: string;
  required: number;
  unit: string;
  isAvailable: boolean;
}

interface MealPrep {
  id: string;
  meal: string;
  menuItem: string;
  timeSlot: string;
  expectedCount: number;
  status: PrepStatus;
  ingredients: Ingredient[];
}

const MOCK_PREP: MealPrep[] = [
  {
    id: '1',
    meal: 'Breakfast',
    menuItem: 'Kanda Poha & Tea',
    timeSlot: '07:30 AM - 09:30 AM',
    expectedCount: 70,
    status: 'Started',
    ingredients: [
      { name: 'Poha', required: 5, unit: 'Kg', isAvailable: true },
      { name: 'Onion', required: 2, unit: 'Kg', isAvailable: true },
      { name: 'Potato', required: 3, unit: 'Kg', isAvailable: true },
      { name: 'Peanuts', required: 0.5, unit: 'Kg', isAvailable: false },
      { name: 'Oil', required: 1, unit: 'Liters', isAvailable: true }
    ]
  },
  {
    id: '2',
    meal: 'Lunch',
    menuItem: 'Dal Tadka, Jeera Rice, Chapati, Salad',
    timeSlot: '12:30 PM - 02:30 PM',
    expectedCount: 85,
    status: 'Pending',
    ingredients: [
      { name: 'Rice', required: 6, unit: 'Kg', isAvailable: true },
      { name: 'Toor Dal', required: 3, unit: 'Kg', isAvailable: true },
      { name: 'Atta', required: 5, unit: 'Kg', isAvailable: true },
      { name: 'Tomato', required: 2, unit: 'Kg', isAvailable: true }
    ]
  },
  {
    id: '3',
    meal: 'Evening Snacks',
    menuItem: 'Samosa & Coffee',
    timeSlot: '05:00 PM - 06:00 PM',
    expectedCount: 60,
    status: 'Pending',
    ingredients: [
      { name: 'Maida', required: 2, unit: 'Kg', isAvailable: true },
      { name: 'Potato', required: 4, unit: 'Kg', isAvailable: true },
      { name: 'Oil (for frying)', required: 3, unit: 'Liters', isAvailable: false }
    ]
  }
];

const getStatusColor = (status: PrepStatus) => {
  switch (status) {
    case 'Pending': return 'bg-page text-secondary border-border';
    case 'Started': return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'Ready': return 'bg-orange-100 text-orange-700 border-orange-200';
    case 'Served': return 'bg-green-100 text-green-700 border-green-200';
    case 'Completed': return 'bg-gray-200 text-gray-700 border-gray-300';
  }
};

export default function TodayPreparationPage() {
  const [prepTasks, setPrepTasks] = useState<MealPrep[]>(MOCK_PREP);

  const updateStatus = (id: string, newStatus: PrepStatus) => {
    setPrepTasks(prev => prev.map(task => task.id === id ? { ...task, status: newStatus } : task));
  };

  const updateQuantity = (id: string) => {
    const newCount = prompt("Enter updated expected meal count:");
    if (newCount && !isNaN(Number(newCount))) {
      setPrepTasks(prev => prev.map(task => task.id === id ? { ...task, expectedCount: Number(newCount) } : task));
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary/10 rounded-xl">
            <ChefHat className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-primary tracking-tight">Food Preparation</h1>
            <p className="text-sm text-secondary">Manage daily cooking tasks, ingredients, and meal status</p>
          </div>
        </div>

        {/* Flow Visualizer */}
        <div className="hidden lg:flex items-center gap-2 text-[10px] uppercase tracking-wider font-bold text-secondary/60 bg-card border border-border px-3 py-1.5 rounded-lg shadow-sm">
          <span>Pending</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-blue-500">Started</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-orange-500">Ready</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-green-500">Served / Completed</span>
        </div>
      </div>

      {/* Grid of Meal Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {prepTasks.map((task) => {
          const allIngredientsAvailable = task.ingredients.every(i => i.isAvailable);

          return (
            <div 
              key={task.id} 
              className={`bg-card border rounded-xl overflow-hidden shadow-sm flex flex-col transition-all
                ${task.status === 'Completed' ? 'opacity-70 border-border/50' : 'hover:shadow-md hover:border-primary/40'}
              `}
            >
              {/* Card Header */}
              <div className="p-5 border-b border-border bg-page/30 flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border
                    ${task.status === 'Started' ? 'bg-blue-100 border-blue-200 text-blue-600' :
                      task.status === 'Ready' ? 'bg-orange-100 border-orange-200 text-orange-600' :
                      task.status === 'Served' || task.status === 'Completed' ? 'bg-green-100 border-green-200 text-green-600' :
                      'bg-page border-border text-secondary'}
                  `}>
                    {task.status === 'Started' ? <Flame className="w-5 h-5" /> : <Utensils className="w-5 h-5" />}
                  </div>
                  <div>
                    <h2 className="text-lg font-black text-primary leading-tight">{task.meal}</h2>
                    <p className="text-xs font-semibold text-secondary flex items-center gap-1 mt-1">
                      <Clock className="w-3.5 h-3.5" /> {task.timeSlot}
                    </p>
                  </div>
                </div>
                <div className={`px-2.5 py-1 text-xs font-bold rounded-md border shrink-0 ${getStatusColor(task.status)}`}>
                  {task.status}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 space-y-5">
                
                {/* Menu Info */}
                <div className="bg-primary/5 border border-primary/20 p-3 rounded-lg">
                  <span className="block text-xs font-bold text-primary uppercase tracking-wider mb-1">Menu</span>
                  <p className="text-sm font-semibold text-primary">{task.menuItem}</p>
                </div>

                {/* Expected Count */}
                <div className="flex items-center justify-between border-b border-border pb-4">
                  <div>
                    <span className="block text-xs font-medium text-secondary mb-0.5">Expected Meals</span>
                    <span className="text-2xl font-black text-primary">{task.expectedCount} <span className="text-xs text-secondary font-medium">plates</span></span>
                  </div>
                  <button 
                    onClick={() => updateQuantity(task.id)}
                    className="p-2 bg-page border border-border rounded-lg text-secondary hover:text-primary hover:border-primary/40 transition-colors"
                    title="Update expected quantity"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                </div>

                {/* Ingredients List */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xs font-bold text-secondary uppercase tracking-wider">Ingredients Required</h4>
                    {!allIngredientsAvailable && (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded-full uppercase tracking-wider">
                        <AlertTriangle className="w-3 h-3" /> Shortage
                      </span>
                    )}
                  </div>
                  
                  <ul className="space-y-2">
                    {task.ingredients.map((ing, idx) => (
                      <li key={idx} className="flex items-center justify-between text-sm">
                        <span className="font-medium text-primary flex items-center gap-2">
                          <span className={`w-1.5 h-1.5 rounded-full ${ing.isAvailable ? 'bg-green-500' : 'bg-red-500'}`}></span>
                          {ing.name}
                        </span>
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-primary">{ing.required} <span className="text-xs text-secondary font-medium">{ing.unit}</span></span>
                          {ing.isAvailable ? (
                            <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                          ) : (
                            <AlertTriangle className="w-4 h-4 text-red-500 shrink-0" />
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4 border-t border-border bg-page/30 flex flex-wrap gap-2">
                {task.status === 'Pending' && (
                  <button 
                    onClick={() => updateStatus(task.id, 'Started')}
                    className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-lg text-sm transition-all shadow-sm"
                  >
                    <PlayCircle className="w-4 h-4" /> Start Preparation
                  </button>
                )}

                {task.status === 'Started' && (
                  <button 
                    onClick={() => updateStatus(task.id, 'Ready')}
                    className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2.5 rounded-lg text-sm transition-all shadow-sm"
                  >
                    <Flame className="w-4 h-4" /> Mark as Ready
                  </button>
                )}

                {task.status === 'Ready' && (
                  <button 
                    onClick={() => updateStatus(task.id, 'Served')}
                    className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 rounded-lg text-sm transition-all shadow-sm"
                  >
                    <Utensils className="w-4 h-4" /> Mark as Served
                  </button>
                )}

                {task.status === 'Served' && (
                  <button 
                    onClick={() => updateStatus(task.id, 'Completed')}
                    className="w-full flex items-center justify-center gap-2 bg-page border border-border hover:bg-secondary/10 text-primary font-bold py-2.5 rounded-lg text-sm transition-all"
                  >
                    <CheckSquare className="w-4 h-4" /> Mark shift Completed
                  </button>
                )}
                
                {task.status === 'Completed' && (
                  <div className="w-full flex items-center justify-center gap-2 text-green-600 font-bold text-sm bg-green-100/50 py-2.5 rounded-lg">
                    <CheckCircle2 className="w-5 h-5" /> Shift Closed
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
