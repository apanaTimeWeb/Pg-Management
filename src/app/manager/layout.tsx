'use client';
import { RequireManager } from '@/app/manager/manager_components/ManagerRequireManager';
import { ManagerPropertyProvider } from '@/app/manager/manager_components/ManagerPropertyContext';
import { ManagerLayout as LayoutShell } from '@/app/manager/manager_components/ManagerLayout';
import { ToastProvider } from '@/components/shared/ToastContext';
import { ManagerI18nProvider } from '@/app/manager/ManagerI18n';

export default function ManagerLayout({ children }: { children: React.ReactNode }) {
  return (
    <RequireManager>
      <ManagerI18nProvider>
        <ToastProvider>
          <ManagerPropertyProvider>
            <LayoutShell>
              {children}
            </LayoutShell>
          </ManagerPropertyProvider>
        </ToastProvider>
      </ManagerI18nProvider>
    </RequireManager>
  );
}
