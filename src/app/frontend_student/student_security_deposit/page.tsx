import { StudentSecurityDepositMain } from './student_security_deposit_components/StudentSecurityDepositMain';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Security Deposit | Student Portal',
  description: 'View your deposit details and settlement status.',
};

export default function Page() {
  return <StudentSecurityDepositMain />;
}
