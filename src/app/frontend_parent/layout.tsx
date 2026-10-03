// RESPONSIBILITY: Next.js layout boundary for the Parent app.
import { ParentLayout } from '@/app/frontend_parent/parent_components/ParentLayout';
import { ParentRequireParent } from '@/app/frontend_parent/parent_components/ParentRequireParent';

export const metadata = {
  title: 'Parent Portal - Smart PG',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ParentRequireParent>
      <ParentLayout>
        {children}
      </ParentLayout>
    </ParentRequireParent>
  );
}
