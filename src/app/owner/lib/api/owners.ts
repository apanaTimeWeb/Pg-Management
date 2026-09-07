import { createOwner } from './owners/create';
import { listOwners, getOwner360 } from './owners/read';
import { upgradePlan, updateStatus, resetPassword, addInternalNote } from './owners/update';

export const ownersApi = {
  createOwner,
  listOwners,
  getOwner360,
  upgradePlan,
  updateStatus,
  resetPassword,
  addInternalNote
};
