'use client';

import React, { useState } from 'react';
import { 
  Utensils,
  Calendar,
  Save,
  Send,
  ChevronRight,
  Info,
  CheckCircle2,
  Clock,
  FileText
} from 'lucide-react';

interface MenuDraft {
  id: string;
  date: string;
  mealType: string;
  items: string;
  status: 'Draft' | 'Pending Approval' | 'Approved' | 'Published';
}

const MOCK_MENUS: MenuDraft[] = [
  { id: '1', date: '05 Oct 2026', mealType: 'Breakfast', items: 'Poha, Tea', status: 'Approved' },
  { id: '2', date: '05 Oct 2026', mealType: 'Lunch', items: 'Rajma, Rice, Roti, Salad', status: 'Pending Approval' },
  { id: '3', date: '06 Oct 2026', mealType: 'Breakfast', items: 'Idli, Sambar, Coffee', status: 'Draft' },
];

export default function CreateMenuPage() {
  const [menus, setMenus] = useState<MenuDraft[]>(MOCK_MENUS);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    mealType: 'Breakfast',
    dish1: '',
    dish2: '',
    dish3: '',
    sideItem: '',
    beverage: '',
    instructions: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = (status: MenuDraft['status']) => {
    const itemsList = [formData.dish1, formData.dish2, formData.dish3, formData.sideItem, formData.beverage]
      .filter(Boolean)
      .join(', ');

    const newMenu: MenuDraft = {
      id: Math.random().toString(),
      date: new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(formData.date as string)),
      mealType: formData.mealType,
      items: itemsList || 'No items added',
      status: status
    };

    setMenus([newMenu, ...menus]);
    
    // Reset mostly
    setFormData({
      ...formData,
      dish1: '', dish2: '', dish3: '', sideItem: '', beverage: '', instructions: ''
    });
  };

  const getStatusBadge = (status: MenuDraft['status']) => {
    switch (status) {
      case 'Draft': return <span className="flex items-center gap-1 text-xs font-bold bg-gray-200 text-gray-700 px-2 py-1 rounded border border-gray-300"><FileText className="w-3 h-3" /> Draft</span>;
      case 'Pending Approval': return <span className="flex items-center gap-1 text-xs font-bold bg-orange-100 text-orange-700 px-2 py-1 rounded border border-orange-200"><Clock className="w-3 h-3" /> Pending</span>;
      case 'Approved': 
      case 'Published': return <span className="flex items-center gap-1 text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded border border-green-200"><CheckCircle2 className="w-3 h-3" /> {status}</span>;
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary/10 rounded-xl">
            <Utensils className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-primary tracking-tight">Create Menu</h1>
            <p className="text-sm text-secondary">Draft menus and submit them to Manager/Owner for approval</p>
          </div>
        </div>
      </div>

      {/* Approval Flow Visualizer */}
      <div className="bg-card border border-border rounded-xl p-4 shadow-sm flex items-center justify-center sm:justify-start overflow-x-auto">
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider font-bold text-secondary/60 min-w-max">
          <div className="flex items-center gap-1.5 text-primary"><FileText className="w-4 h-4" /> Draft</div>
          <ChevronRight className="w-4 h-4 text-border" />
          <div className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> Manager Review</div>
          <ChevronRight className="w-4 h-4 text-border" />
          <div className="flex items-center gap-1.5 text-green-600"><CheckCircle2 className="w-4 h-4" /> Approved</div>
          <ChevronRight className="w-4 h-4 text-border" />
          <div className="flex items-center gap-1.5 text-indigo-600"><Utensils className="w-4 h-4" /> Published</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Create Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
            <div className="p-5 border-b border-border bg-page/30">
              <h2 className="text-lg font-bold text-primary">Menu Details</h2>
            </div>
            
            <div className="p-5 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-primary flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-secondary" /> Date
                  </label>
                  <input 
                    type="date" 
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full bg-page border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary text-primary" 
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-primary">Meal Type</label>
                  <select 
                    name="mealType"
                    value={formData.mealType}
                    onChange={handleInputChange}
                    className="w-full bg-page border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary text-primary"
                  >
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Snacks">Snacks</option>
                    <option value="Dinner">Dinner</option>
                    <option value="Special Meal">Special Meal</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-bold text-secondary uppercase tracking-wider border-b border-border pb-2">Main Items</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-primary">Dish 1</label>
                    <input type="text" name="dish1" placeholder="e.g. Rice / Poha" value={formData.dish1} onChange={handleInputChange} className="w-full bg-page border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary text-primary" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-primary">Dish 2 (Optional)</label>
                    <input type="text" name="dish2" placeholder="e.g. Dal / Curry" value={formData.dish2} onChange={handleInputChange} className="w-full bg-page border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary text-primary" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-primary">Dish 3 (Optional)</label>
                    <input type="text" name="dish3" placeholder="e.g. Roti / Sabzi" value={formData.dish3} onChange={handleInputChange} className="w-full bg-page border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary text-primary" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-bold text-secondary uppercase tracking-wider border-b border-border pb-2">Sides & Beverages</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-primary">Side Item</label>
                    <input type="text" name="sideItem" placeholder="e.g. Salad, Papad, Pickle" value={formData.sideItem} onChange={handleInputChange} className="w-full bg-page border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary text-primary" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-primary">Beverage</label>
                    <input type="text" name="beverage" placeholder="e.g. Tea, Coffee, Buttermilk" value={formData.beverage} onChange={handleInputChange} className="w-full bg-page border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary text-primary" />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-primary">Special Instructions / Notes</label>
                <textarea 
                  name="instructions"
                  rows={2}
                  placeholder="e.g. Keep food mild spicy, prepare 10 Jain plates"
                  value={formData.instructions}
                  onChange={handleInputChange}
                  className="w-full bg-page border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary text-primary resize-none" 
                />
              </div>
            </div>

            <div className="p-5 border-t border-border bg-page/30 flex flex-col sm:flex-row gap-3">
              <button 
                onClick={() => handleSave('Draft')}
                className="flex-1 flex items-center justify-center gap-2 bg-card border border-border hover:bg-page hover:border-primary/40 text-primary font-bold py-2.5 rounded-lg text-sm transition-all"
              >
                <Save className="w-4 h-4" /> Save as Draft
              </button>
              <button 
                onClick={() => handleSave('Pending Approval')}
                disabled={!formData.dish1}
                className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold py-2.5 rounded-lg text-sm transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" /> Submit for Approval
              </button>
            </div>
          </div>
          
          {/* Helper Note */}
          <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800 rounded-xl p-4 shadow-sm flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <p className="text-xs text-blue-800 dark:text-blue-300 font-medium leading-relaxed">
              Once you submit a menu for approval, the Manager/Owner will review it. Upon their approval, it will be automatically <strong>Published</strong> to the students' dashboard.
            </p>
          </div>
        </div>

        {/* Recent Drafts & Submissions Sidebar */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-primary uppercase tracking-wider flex items-center gap-2">
            <FileText className="w-4 h-4 text-secondary" /> Recent Submissions
          </h3>
          
          <div className="space-y-3">
            {menus.map((menu) => (
              <div key={menu.id} className="bg-card border border-border rounded-xl p-4 shadow-sm hover:border-primary/30 transition-colors">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h4 className="font-bold text-primary">{menu.mealType}</h4>
                    <span className="text-xs font-medium text-secondary">{menu.date}</span>
                  </div>
                  {getStatusBadge(menu.status)}
                </div>
                <p className="text-sm text-secondary truncate mt-1">
                  {menu.items}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
