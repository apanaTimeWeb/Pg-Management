// RESPONSIBILITY: Renders the OwnerLayout component. Receives data via props/hooks.

import { Metadata } from 'next';
import { RequireOwner } from '@/app/owner/owner_components/OwnerRequireOwner';
import { OwnerPropertyProvider } from '@/app/owner/owner_components/OwnerPropertyContext';
import { OwnerLayout } from '@/app/owner/owner_components/OwnerLayout';
import { ToastProvider } from '@/components/shared/ToastContext';
import { OwnerI18nProvider } from '@/app/owner/OwnerI18n';

export const metadata: Metadata = {
  title: 'Owner Portal | SmartPG',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <RequireOwner>
      <OwnerI18nProvider>
        <ToastProvider>
          <OwnerPropertyProvider>
            <OwnerLayout>
              {children}
            </OwnerLayout>
          </OwnerPropertyProvider>
        </ToastProvider>
      </OwnerI18nProvider>
    </RequireOwner>
  );
}
