import { StaffLayout } from '@/app/staff/components/StaffLayout';
import { ToastProvider } from '@/components/shared/ToastContext';
import { StaffI18nProvider } from '@/app/staff/i18n';

export const metadata = {
  title: 'Staff Portal | Smart PG',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <StaffI18nProvider>
      <ToastProvider>
        <StaffLayout>{children}</StaffLayout>
      </ToastProvider>
    </StaffI18nProvider>
  );
}
