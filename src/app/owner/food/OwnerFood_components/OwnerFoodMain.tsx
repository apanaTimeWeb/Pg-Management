'use client';

// RESPONSIBILITY: Renders the OwnerFoodMain component. Receives data via props/hooks.

import { useState, useEffect } from 'react';
import { UtensilsCrossed, CheckCircle2, PlusCircle } from 'lucide-react';

import { useOwnerPropertyContext } from '@/app/owner/owner_components/OwnerPropertyContext';
import { authApi as api } from '@/app/owner/owner_lib/owner_api/OwnerAuth';
import { getSession } from '@/app/owner/owner_lib/owner_auth/OwnerSession';


import { OwnerFoodMenuForm } from './OwnerFoodMenuForm';
import { OwnerFoodMenuReadView } from './OwnerFoodMenuReadView';

import type { FoodMenu } from '@/app/staff/staff_lib/staff_api/StaffFood';

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
// @ts-expect-error
      if (setSelectedPropertyId) setSelectedPropertyId(properties[0].id);
      return;
    }

    if (selectedPropertyId && selectedPropertyId !== 'all') {
      setLoading(true);
      const data = (api as any).food.getByProperty(selectedPropertyId);
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
      (api as any).food.save(selectedPropertyId, menu);
      setSuccessMsg('Food Menu saved successfully!');
      setHasMenu(true);
      setTimeout(() => {
        setSuccessMsg('');
        setIsEditing(false); // Switch to read-only view after save
      }, 1500);
    } catch (err: any) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const parseDay = (val: string = '') => {
    try {
      return JSON.parse(val);
    } catch (e: any) {
      return { breakfast: '', lunch: '', dinner: val };
    }
  };

  const handleMealChange = (day: keyof FoodMenu, meal: 'breakfast'|'lunch'|'dinner', value: string) => {
// @ts-expect-error
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
              <option key={p.id} value={p.id}>{(p as any).name}</option>
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
            <OwnerFoodMenuForm
              menu={menu}
              hasMenu={hasMenu}
              saving={saving}
              parseDay={parseDay}
              onMealChange={handleMealChange}
              onMonthEndChange={(val) => setMenu(prev => ({ ...prev, monthEndSpecial: val }))}
              onFillDummy={handleFillDummyData}
              onSave={handleSave}
              onCancel={() => setIsEditing(false)}
            />
          )}

          {/* Read-only View */}
          {hasMenu && !isEditing && (
            <OwnerFoodMenuReadView
              menu={menu}
              parseDay={parseDay}
              onEdit={() => setIsEditing(true)}
            />
          )}
        </>
      )}
    </div>
  );
}
