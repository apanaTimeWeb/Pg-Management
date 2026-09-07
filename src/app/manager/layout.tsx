'use client';
import { RequireManager } from '@/app/manager/manager_shared/RequireManager';
import { ManagerPropertyProvider } from '@/app/manager/manager_shared/ManagerPropertyContext';
import { ManagerLayout as LayoutShell } from '@/app/manager/manager_shared/ManagerLayout';
import { ToastProvider } from '@/components/shared/ToastContext';
import { ManagerI18nProvider } from './i18n';

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
