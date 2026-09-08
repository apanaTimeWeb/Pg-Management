'use client';
import { ManagerRequireManager } from '@/app/manager/manager_components/ManagerRequireManager';
import { ManagerPropertyProvider } from '@/app/manager/manager_components/ManagerPropertyContext';
import { ManagerLayout as LayoutShell } from '@/app/manager/manager_components/ManagerLayout';
import { ManagerI18nProvider } from '@/app/manager/ManagerI18n';

export function ManagerClientShell({ children }: { children: React.ReactNode }) {
  return (
    <ManagerRequireManager>
      <ManagerI18nProvider>
        <ManagerPropertyProvider>
          <LayoutShell>
            {children}
          </LayoutShell>
        </ManagerPropertyProvider>
      </ManagerI18nProvider>
    </ManagerRequireManager>
  );
}
