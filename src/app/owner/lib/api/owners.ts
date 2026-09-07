import { createOwner } from '@/app/owner/lib/api/owners/create';
import { listOwners, getOwner360 } from '@/app/owner/lib/api/owners/read';
import { upgradePlan, updateStatus, resetPassword, addInternalNote } from '@/app/owner/lib/api/owners/update';

export const ownersApi = {
  createOwner,
  listOwners,
  getOwner360,
  upgradePlan,
  updateStatus,
  resetPassword,
  addInternalNote
};
