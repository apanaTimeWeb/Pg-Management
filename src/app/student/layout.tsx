import { StudentLayout } from '@/app/student/student_components/StudentLayout';
import { ToastProvider } from '@/components/shared/ToastContext';
import { StudentI18nProvider } from '@/app/student/StudentI18n';

export const metadata = {
  title: 'Student Portal | ApnaPG',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <StudentI18nProvider>
      <ToastProvider>
        <StudentLayout>{children}</StudentLayout>
      </ToastProvider>
    </StudentI18nProvider>
  );
}
