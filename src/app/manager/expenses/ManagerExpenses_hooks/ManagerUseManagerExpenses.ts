// DATA FLOW: [AI_TODO: Document data flow direction for ManagerUseManagerExpenses.ts]
import { ManagerUseManagerUrlPagination } from '@/app/manager/manager_components/manager_hooks/ManagerUseManagerUrlPagination';
// [DATA HOOK] ManagerUseManagerExpenses
// Responsibility: Fetches expense list and handles add/delete expense mutations with toast feedback.
// Data Flow: ManagerPropertyContext → (api as any).finance.listExpenses → local state → ManagerExpensesMain
// Forms: React Hook Form + Zod (ExpenseFormSchema) — no manual validation logic here.

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { authApi as api } from '@/app/manager/manager_lib/manager_api/ManagerAuth';
import { toast } from 'sonner';
import type { ExpenseFormData } from '@/app/manager/expenses/ManagerExpenses_types/ManagerExpenses.types';
import { ExpenseFormSchema } from '@/app/manager/expenses/ManagerExpenses_types/ManagerExpenses.types';

export function ManagerUseManagerExpenses(selectedPropertyId: string | null, propsLoading: boolean, userId: string | undefined) {
  

  const [loading, setLoading] = useState(true);
  const [expenses, setExpenses] = useState<any[]>([]);
  const [studentCount, setStudentCount] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // React Hook Form with Zod resolver — replaces all manual useState + validation
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const form = useForm<ExpenseFormData>({
// @ts-expect-error
    resolver: zodResolver(ExpenseFormSchema) as unknown,
    defaultValues: {
      category: 'maintenance',
      amount: '',
      description: '',
    },
  });

  const loadExpenses = () => {
    if (!userId || !selectedPropertyId) return;
    setLoading(true);
    const stats = (api as any).finance.getStats(userId, selectedPropertyId);
    setExpenses(stats.expenses);
    const students = (api as any).managerOperations.listStudents(selectedPropertyId);
    setStudentCount(students.length);
    setLoading(false);
  };

  // Re-fetch expenses when property changes or context loading state updates.
  useEffect(() => {
    if (!propsLoading && selectedPropertyId) {
      loadExpenses();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [propsLoading, selectedPropertyId, userId]);

  const { currentPage, setCurrentPage } = ManagerUseManagerUrlPagination(1);
  const itemsPerPage = 10;

  // Reset pagination to page 1 whenever the selected property changes.
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedPropertyId]);

  const onModalOpen = () => {
    form.reset({ category: 'maintenance', amount: '', description: '' });
    setIsModalOpen(true);
  };

  const onModalClose = () => {
    form.reset();
    setIsModalOpen(false);
  };

  // RHF-compatible submit handler — receives validated data directly, no manual checks needed
// @ts-expect-error
  const handleSubmit = form.handleSubmit(async (data: ExpenseFormData) => {
    if (!userId || !selectedPropertyId) return;
    setIsSubmitting(true);
    (api as any).finance.createExpense({
      propertyId: selectedPropertyId,
      category: data.category as unknown,
      amount: Number(data.amount),
      description: data.description,
    }, userId);
    toast.success('Expense logged successfully');
    setIsSubmitting(false);
    onModalClose();
    loadExpenses();
  });

  return {
    loading, expenses, studentCount,
    isModalOpen, onModalOpen, onModalClose,
    isSubmitting,
    form,
    currentPage, setCurrentPage, itemsPerPage,
    handleSubmit,
  };
}
