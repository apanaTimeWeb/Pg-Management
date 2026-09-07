// DATA FLOW: [AI_TODO: Document data flow direction for ManagerPropertyContext.tsx]
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

import { authApi as api } from '@/app/manager/manager_lib/manager_api/ManagerAuth';
import { getSession } from '@/app/manager/manager_lib/manager_auth/ManagerSession';

interface ManagerPropertyContextType {
  properties: unknown[];
  selectedPropertyId: string;
  setSelectedPropertyId: (id: string) => void;
  loading: boolean;
}

const ManagerPropertyContext = createContext<ManagerPropertyContextType>({
  properties: [],
  selectedPropertyId: '',
  setSelectedPropertyId: () => {},
  loading: true
});

export const ManagerPropertyProvider = ({ children }: { children: React.ReactNode }) => {
  const user = typeof window !== 'undefined' ? getSession() : null;
  const [properties, setProperties] = useState<any[]>([]);
  const [selectedPropertyId, setPropertyId] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.role === 'manager' && user.assignedPropertyIds && user.assignedPropertyIds.length > 0) {
      // Find all properties in the system (or by owner if manager's owner was known, but assignedPropertyIds is direct)
      // Since manager belongs to an owner, and we want to load just their assigned properties:
      const allProps = (api as any).properties.listAll();
// @ts-expect-error
      const assignedProps = allProps.filter((p: unknown) => user.assignedPropertyIds?.includes(p.id));
      
      setProperties(assignedProps);
      
      if (assignedProps.length > 0) {
        // Default to first property
        setPropertyId(assignedProps[0].id);
      }
    }
    setLoading(false);
  }, [user?.id]);

  return (
    <ManagerPropertyContext.Provider value={{
      properties,
      selectedPropertyId,
      setSelectedPropertyId: setPropertyId,
      loading
    }}>
      {children}
    </ManagerPropertyContext.Provider>
  );
};

export const useManagerPropertyContext = () => useContext(ManagerPropertyContext);
