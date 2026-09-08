import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/app/manager/manager_lib/manager_api/ManagerApi';
import { useManagerSession } from '@/app/manager/manager_components/manager_hooks/useManagerSession';
import type { StudentDetail, Invoice } from '@/app/manager/students/ManagerStudents_types/ManagerStudentDetail.types';

export function useManagerStudentDetail(studentId: string) {
  const router = useRouter();
  const user = useManagerSession();
  
  const [student, setStudent] = useState<StudentDetail | null>(null);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [isBillModalOpen, setIsBillModalOpen] = useState(false);
  const [selectedInvoiceForBill, setSelectedInvoiceForBill] = useState<Invoice | null>(null);
  const [isConfirmCheckoutOpen, setIsConfirmCheckoutOpen] = useState(false);

  const loadData = useCallback(() => {
    if (studentId) {
      const detail = api.students.getById(studentId) as unknown as StudentDetail;
      setStudent(detail);
      if (detail && detail.user) {
        setInvoices(api.students.getInvoices(detail.user.id));
      }
    }
  }, [studentId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleCheckoutConfirm = () => {
    if (student?.profile?.id && user?.id) {
      api.students.checkout(student.profile.id, user.id);
      setIsConfirmCheckoutOpen(false);
      router.push('/manager/students');
    }
  };

  const handleCheckoutClick = () => {
    setIsConfirmCheckoutOpen(true);
  };

  const handleSaveElectricityBill = (amount: number, imageUrl: string) => {
    if (selectedInvoiceForBill && user) {
      api.finance.updateElectricityBill(selectedInvoiceForBill.id, amount, imageUrl, user.id);
      loadData();
    }
  };

  const handleOpenBillModal = (invoice: Invoice) => {
    setSelectedInvoiceForBill(invoice);
    setIsBillModalOpen(true);
  };

  const handleCloseBillModal = () => {
    setIsBillModalOpen(false);
    setSelectedInvoiceForBill(null);
  };

  return {
    student,
    invoices,
    isBillModalOpen,
    selectedInvoiceForBill,
    isConfirmCheckoutOpen,
    setIsConfirmCheckoutOpen,
    handleCheckoutClick,
    handleCheckoutConfirm,
    handleSaveElectricityBill,
    handleOpenBillModal,
    handleCloseBillModal
  };
}
