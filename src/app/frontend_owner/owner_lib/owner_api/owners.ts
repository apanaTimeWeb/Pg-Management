import { createOwner } from '@/app/frontend_owner/owner_lib/owner_api/owners/OwnerCreate';
import { listOwners, getOwner360 } from '@/app/frontend_owner/owner_lib/owner_api/owners/OwnerRead';
import { upgradePlan, updateStatus, resetPassword, addInternalNote } from '@/app/frontend_owner/owner_lib/owner_api/owners/OwnerUpdate';

export const ownersApi = {
  createOwner,
  listOwners,
  getOwner360,
  upgradePlan,
  updateStatus,
  resetPassword,
  addInternalNote
};
