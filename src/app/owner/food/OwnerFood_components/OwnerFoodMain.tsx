'use client';

// RESPONSIBILITY: Renders the OwnerFoodMain component. Receives data via props/hooks.

import { useState, useEffect } from 'react';
import { useOwnerPropertyContext } from '@/app/owner/owner_components/OwnerPropertyContext';
import { authApi as api } from '@/app/owner/owner_lib/owner_api/OwnerAuth';
import { getSession } from '@/app/owner/owner_lib/owner_auth/OwnerSession';
import { UtensilsCrossed, Calendar, CheckCircle2, Save, Edit3, PlusCircle } from 'lucide-react';
import { FoodMenu } from '@/app/staff/staff_lib/staff_api/StaffFood';

const defaultMenu = {
  monday: '',
  tuesday: '',
  wednesday: '',
  thursday: '',
  friday: '',
  saturday: '',
  sunday: '',
  monthEndSpecial: ''
};

export function OwnerFoodMain() {
  const user = typeof window !== 'undefined' ? getSession() : null;
  const { properties, selectedPropertyId, setSelectedPropertyId } = useOwnerPropertyContext();
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [menu, setMenu] = useState<Partial<FoodMenu>>(defaultMenu);
  const [isEditing, setIsEditing] = useState(false);
  const [hasMenu, setHasMenu] = useState(false);

  useEffect(() => {
    if (!user) return;
    
    if (selectedPropertyId === 'all' && properties.length > 0) {
      if (setSelectedPropertyId) setSelectedPropertyId(properties[0].id);
      return;
    }

    if (selectedPropertyId && selectedPropertyId !== 'all') {
      setLoading(true);
      const data = api.food.getByProperty(selectedPropertyId);
      if (data) {
        setMenu(data);
        setHasMenu(true);
        setIsEditing(false);
      } else {
        setMenu(defaultMenu);
        setHasMenu(false);
        setIsEditing(false); // Show empty state first
      }
      setLoading(false);
      setSuccessMsg('');
    }
  }, [selectedPropertyId, properties.length, user?.id, setSelectedPropertyId]);

  const handleFillDummyData = () => {
    const dummyDay = JSON.stringify({ breakfast: 'Poha & Tea', lunch: 'Dal, Rice, Roti, Sabji', dinner: 'Paneer Butter Masala, Naan' });
    const dummySunday = JSON.stringify({ breakfast: 'Aloo Paratha & Curd', lunch: 'Rajma Chawal', dinner: 'Chicken Curry, Roti' });
    setMenu({
      monday: dummyDay,
      tuesday: dummyDay,
      wednesday: dummyDay,
      thursday: dummyDay,
      friday: dummyDay,
      saturday: dummyDay,
      sunday: dummySunday,
      monthEndSpecial: 'Special Veg/Non-Veg Thali with Gulab Jamun & Ice Cream'
    });
  };

  const handleSave = () => {
    if (!selectedPropertyId || selectedPropertyId === 'all') return;
    setSaving(true);
    try {
      api.food.save(selectedPropertyId, menu);
      setSuccessMsg('Food Menu saved successfully!');
      setHasMenu(true);
      setTimeout(() => {
        setSuccessMsg('');
        setIsEditing(false); // Switch to read-only view after save
      }, 1500);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const parseDay = (val: string = '') => {
    try {
      return JSON.parse(val);
    } catch (e) {
      return { breakfast: '', lunch: '', dinner: val };
    }
  };

  const handleMealChange = (day: keyof FoodMenu, meal: 'breakfast'|'lunch'|'dinner', value: string) => {
    const current = parseDay((menu as unknown)[day]);
    current[meal] = value;
    setMenu(prev => ({ ...prev, [day]: JSON.stringify(current) }));
  };

  if (properties.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-secondary">
        <UtensilsCrossed className="w-12 h-12 mb-4 opacity-50" />
        <p>No properties found. Add a property to manage the food menu.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[22px] font-bold text-primary">Food Menu Planner</h1>
          <p className="text-sm text-secondary">Plan your weekly food schedule and month-end specials per PG.</p>
        </div>
        
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-secondary">Select PG:</label>
          <select 
            value={selectedPropertyId === 'all' ? properties[0]?.id : selectedPropertyId}
            onChange={(e) => {
              if (setSelectedPropertyId) setSelectedPropertyId(e.target.value);
            }}
            className="bg-input border border-border rounded-md px-3 py-2 text-sm text-primary focus:border-primary outline-none min-w-[200px]"
          >
            {properties.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="motion-safe:animate-pulse h-[400px] bg-card rounded-lg border border-border"></div>
      ) : (
        <>
          {successMsg && (
            <div className="p-4 bg-success-bg border border-[rgba(16,185,129,0.2)] rounded-md flex items-center gap-3 text-success animate-fade-in">
              <CheckCircle2 className="w-5 h-5 shrink-0" />
              <span className="font-medium text-sm">{successMsg}</span>
            </div>
          )}

          {/* Empty State */}
          {!hasMenu && !isEditing && (
            <div className="flex flex-col items-center justify-center py-20 bg-card border border-border rounded-lg text-center shadow-sm">
              <UtensilsCrossed className="w-16 h-16 text-primary opacity-50 mb-4" />
              <h3 className="text-xl font-bold text-primary mb-2">No Menu Found</h3>
              <p className="text-secondary text-sm max-w-sm mb-6">
                You haven't created a food menu for this property yet. Managers and Kitchen staff cannot see any menu.
              </p>
              <button 
                onClick={() => setIsEditing(true)}
                className="bg-primary text-white px-6 py-3 rounded-md text-sm font-bold hover:bg-primary-hover motion-safe:transition-colors flex items-center gap-2"
              >
                <PlusCircle className="w-5 h-5" />
                Add Your Food Menu
              </button>
            </div>
          )}

          {/* Form View */}
          {isEditing && (
            <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm animate-fade-in">
              <div className="p-6 border-b border-border bg-[rgba(99,102,241,0.02)] flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[rgba(99,102,241,0.1)] flex items-center justify-center text-primary">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-primary">Edit Weekly Schedule</h2>
                    <p className="text-xs text-secondary">Set standard items for each day</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={handleFillDummyData}
                    className="bg-input border border-border text-secondary hover:text-primary px-4 py-2.5 rounded-md text-sm font-bold motion-safe:transition-colors"
                  >
                    Fill Dummy Data
                  </button>
                  <button 
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-primary text-white px-5 py-2.5 rounded-md text-sm font-bold hover:bg-primary-hover motion-safe:transition-colors flex items-center gap-2 disabled:opacity-70"
                  >
                    <Save className="w-4 h-4" />
                    {saving ? 'Saving...' : 'Save Menu'}
                  </button>
                  {hasMenu && (
                    <button 
                      onClick={() => setIsEditing(false)}
                      className="text-secondary hover:text-primary font-medium text-sm px-3"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
                  {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((day) => {
                    const dayData = parseDay((menu as unknown)[day]);
                    return (
                      <div key={day} className="space-y-3 bg-page border border-border rounded-lg p-4 shadow-sm">
                        <label className="text-sm font-bold text-primary capitalize flex items-center gap-2 mb-2 pb-2 border-b border-border">
                          <span className="w-2 h-2 rounded-full bg-primary opacity-70"></span>
                          {day}
                        </label>
                        <div className="space-y-3">
                          <div>
                            <label className="text-[10px] uppercase tracking-wider font-bold text-secondary mb-1 block">Breakfast</label>
                            <input 
                              value={dayData.breakfast}
                              onChange={(e) => handleMealChange(day as keyof FoodMenu, 'breakfast', e.target.value)}
                              placeholder="e.g. Poha, Tea"
                              className="w-full bg-input border border-border rounded-sm px-3 py-2 text-sm text-primary focus:border-primary outline-none motion-safe:transition-colors"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] uppercase tracking-wider font-bold text-secondary mb-1 block">Lunch</label>
                            <input 
                              value={dayData.lunch}
                              onChange={(e) => handleMealChange(day as keyof FoodMenu, 'lunch', e.target.value)}
                              placeholder="e.g. Dal, Rice, Roti"
                              className="w-full bg-input border border-border rounded-sm px-3 py-2 text-sm text-primary focus:border-primary outline-none motion-safe:transition-colors"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] uppercase tracking-wider font-bold text-secondary mb-1 block">Dinner</label>
                            <input 
                              value={dayData.dinner}
                              onChange={(e) => handleMealChange(day as keyof FoodMenu, 'dinner', e.target.value)}
                              placeholder={day === 'sunday' ? "e.g. Paneer, Roti" : "e.g. Chicken, Roti"}
                              className="w-full bg-input border border-border rounded-sm px-3 py-2 text-sm text-primary focus:border-primary outline-none motion-safe:transition-colors"
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-8 border-t border-border pt-8">
                  <div className="bg-gradient-to-br from-[var(--primary-subtle)] to-[var(--bg-card)] border border-primary border-opacity-30 rounded-lg p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
                      <UtensilsCrossed className="w-24 h-24" />
                    </div>
                    <div className="relative z-10">
                      <h3 className="text-lg font-bold text-primary mb-2 flex items-center gap-2">
                        🎉 Month End Special
                      </h3>
                      <p className="text-sm text-secondary mb-4 max-w-xl">
                        Define a special menu for the last day of the month to treat your students. This overrides the regular weekday menu for that specific date.
                      </p>
                      <textarea 
                        value={menu.monthEndSpecial}
                        onChange={(e) => setMenu(prev => ({ ...prev, monthEndSpecial: e.target.value }))}
                        placeholder="e.g. Special Chicken Biryani / Mutton / Premium Veg Thali with Dessert"
                        className="w-full max-w-2xl bg-white dark:bg-input border border-border rounded-md p-4 text-sm text-primary focus:border-primary outline-none resize-none h-24 shadow-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Read-only View */}
          {hasMenu && !isEditing && (
            <div className="bg-card border border-border rounded-lg overflow-hidden shadow-sm animate-fade-in">
              <div className="p-6 border-b border-border bg-[rgba(99,102,241,0.02)] flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[rgba(99,102,241,0.1)] flex items-center justify-center text-primary">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-primary">Current Weekly Schedule</h2>
                    <p className="text-xs text-secondary">This menu is currently active</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsEditing(true)}
                  className="bg-input border border-border text-primary px-4 py-2 rounded-md text-sm font-bold hover:bg-border motion-safe:transition-colors flex items-center gap-2"
                >
                  <Edit3 className="w-4 h-4" />
                  Edit Menu
                </button>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
                  {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map((day) => {
                    const dayData = parseDay((menu as unknown)[day]);
                    return (
                      <div key={day} className="bg-card border border-border rounded-lg p-5 shadow-sm hover:shadow-md hover:border-primary/50 motion-safe:transition-all relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[var(--primary)] to-transparent opacity-[0.03] group-hover:opacity-[0.06] rounded-bl-full pointer-events-none transition-opacity"></div>
                        
                        <h3 className="text-sm font-black text-primary capitalize mb-4 flex items-center gap-2 pb-3 border-b border-border">
                          <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(99,102,241,0.6)]"></div>
                          {day}
                        </h3>
                        
                        <div className="space-y-4 relative z-10">
                          <div>
                            <p className="text-[10px] uppercase tracking-widest font-bold text-secondary mb-1">Breakfast</p>
                            <p className="text-sm font-medium text-primary">{dayData.breakfast || '-'}</p>
                          </div>
                          <div>
                            <p className="text-[10px] uppercase tracking-widest font-bold text-secondary mb-1">Lunch</p>
                            <p className="text-sm font-medium text-primary">{dayData.lunch || '-'}</p>
                          </div>
                          <div>
                            <p className="text-[10px] uppercase tracking-widest font-bold text-secondary mb-1">Dinner</p>
                            <p className="text-sm font-medium text-primary">{dayData.dinner || '-'}</p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {menu.monthEndSpecial && (
                  <div className="mt-8 border-t border-border pt-8">
                    <div className="bg-gradient-to-br from-[var(--primary-subtle)] to-[var(--bg-card)] border border-primary border-opacity-30 rounded-lg p-6 relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
                        <UtensilsCrossed className="w-24 h-24" />
                      </div>
                      <div className="relative z-10">
                        <h3 className="text-lg font-bold text-primary mb-2 flex items-center gap-2">
                          🎉 Month End Special
                        </h3>
                        <div className="w-full max-w-2xl bg-white dark:bg-input border border-border rounded-md p-4 text-sm text-primary shadow-sm whitespace-pre-wrap">
                          {menu.monthEndSpecial}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
