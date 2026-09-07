// RESPONSIBILITY: Renders the ManagerStudentsMain component.
'use client';

import { useState } from 'react';
import { useManagerPropertyContext } from '@/app/manager/manager_components/ManagerPropertyContext';
import { Plus } from 'lucide-react';
import { ManagerAddStudentModal } from '@/app/manager/manager_components/ManagerAddStudentModal';
import { ManagerUseManagerStudents } from '@/app/manager/students/ManagerStudents_hooks/ManagerUseManagerStudents';
import { ManagerStudentsTable } from '@/app/manager/students/ManagerStudents_components/ManagerStudentsTable';

export function ManagerStudentsMain() {
  const { selectedPropertyId, loading: ctxLoading } = useManagerPropertyContext();
  const [showAddModal, setShowAddModal] = useState(false);
  const { students, fetchStudents } = ManagerUseManagerStudents(selectedPropertyId, ctxLoading);

  if (ctxLoading) return <div className="p-6 text-[var(--text-secondary)]">Loading...</div>;
  if (!selectedPropertyId) return <div className="p-6 text-center text-[var(--text-secondary)]">Property Required</div>;

  return (
    <div className="space-y-6 pb-20">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-[24px] font-bold text-[var(--text-primary)]">Students</h1>
          <p className="text-sm text-[var(--text-secondary)]">Manage active students.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-[var(--primary)] text-white px-4 py-2 rounded-[var(--radius-md,8px)] hover:bg-[var(--primary-hover)] transition-colors text-sm font-medium"
        >
          <Plus className="w-4 h-4" /> Add Student
        </button>
      </div>

      <ManagerStudentsTable students={students} />

      {showAddModal && selectedPropertyId && (
        <ManagerAddStudentModal
          propertyId={selectedPropertyId}
          onClose={() => setShowAddModal(false)}
          onSuccess={() => {
            setShowAddModal(false);
            fetchStudents();
          }}
        />
      )}
    </div>
  );
}
