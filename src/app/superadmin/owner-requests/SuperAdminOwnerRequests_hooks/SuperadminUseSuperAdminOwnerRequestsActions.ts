// DATA FLOW: [AI_TODO: Document data flow direction for SuperadminUseSuperAdminOwnerRequestsActions.ts]
import { useState } from 'react';
import { ownerRequestsApi } from '@/app/superadmin/superadmin_lib/superadmin_api/SuperadminOwnerRequests';
import { useToast } from '@/components/shared/ToastContext';
import { useRouter } from 'next/navigation';

export const SuperadminUseSuperAdminOwnerRequestsActions = (refetch: () => void) => {
  const router = useRouter();
  const { showToast } = useToast();
  
  // Modals state
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [holdModalOpen, setHoldModalOpen] = useState(false);
  const [selectedReqId, setSelectedReqId] = useState('');

  const onApproveClick = (id: string) => {
    router.push(`/superadmin/create-owner?requestId=${id}`);
  };

  const onHoldClick = (id: string) => {
    setSelectedReqId(id);
    setHoldModalOpen(true);
  };

  const onRejectClick = (id: string) => {
    setSelectedReqId(id);
    setRejectModalOpen(true);
  };

  const handleHold = () => {
    ownerRequestsApi.updateStatus(selectedReqId, 'Hold');
    setHoldModalOpen(false);
    showToast('Request marked as Hold.', 'info');
    refetch();
  };

  const handleRejectSubmit = (reason: string) => {
    ownerRequestsApi.updateStatus(selectedReqId, 'Rejected', reason);
    setRejectModalOpen(false);
    showToast('Request rejected successfully.', 'success');
    refetch();
  };

  return {
    rejectModalOpen,
    setRejectModalOpen,
    holdModalOpen,
    setHoldModalOpen,
    onApproveClick,
    onHoldClick,
    onRejectClick,
    handleHold,
    handleRejectSubmit
  };
};
