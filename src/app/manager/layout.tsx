import { ManagerClientShell } from '@/app/manager/manager_components/ManagerClientShell';

export default function ManagerLayout({ children }: { children: React.ReactNode }) {
  return (
    <ManagerClientShell>
      {children}
    </ManagerClientShell>
  );
}