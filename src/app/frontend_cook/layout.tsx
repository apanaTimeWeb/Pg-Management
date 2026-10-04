import { CookProvider } from './CookContext';
import { CookLayout } from './CookLayout';

export const metadata = {
  title: 'Cook Portal | Smart PG',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <CookProvider>
      <CookLayout>{children}</CookLayout>
    </CookProvider>
  );
}
