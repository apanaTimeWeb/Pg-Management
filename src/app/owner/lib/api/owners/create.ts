// @ts-nocheck
import { db } from '@/lib/storage/db';
import { STORAGE_KEYS } from '@/lib/storage/keys';
import { createId } from '@/lib/utils/id';
import { User } from '@/app/owner/lib/types';
import { ownerRequestsApi } from '@/app/superadmin/lib/api/ownerRequests';

export function createOwner(data: any) {
  // 1. Validate unique email in users
  const existingUser = db.query<User>(STORAGE_KEYS.USERS, u => u.email === data.email && !u.isDeleted);
  if (existingUser.length > 0) {
    throw new Error('Email is already in use by another user.');
  }

  const now = new Date().toISOString();
  const adminId = 'superadmin'; // hardcoded for backend simulation

  // 2. Create User record
  const user: User = {
    id: createId('usr'),
    role: 'owner',
    name: data.name,
    email: data.email,
    phone: data.phone,
    password: data.temporaryPassword,
    status: 'Active',
    mustChangePassword: data.mustChangePassword ?? true,
    createdAt: now,
    updatedAt: now,
    createdBy: adminId,
    updatedBy: adminId,
    isDeleted: false
  };
  const createdUser = db.insert(STORAGE_KEYS.USERS, user);

  // 3. Create Owner Profile
  const ownerProfile = {
    id: createId('own'),
    userId: createdUser.id,
    name: data.name,
    businessName: data.businessName,
    email: data.email,
    phone: data.phone,
    city: data.city,
    address: data.address,
    gst: data.gst,
    pan: data.pan,
    expectedPgs: data.expectedPgs,
    expectedBeds: data.expectedBeds,
    createdAt: now,
    updatedAt: now,
    createdBy: adminId,
    updatedBy: adminId,
    isDeleted: false
  };
  const createdOwner = db.insert(STORAGE_KEYS.OWNERS, ownerProfile);

  // Link user to ownerId
  db.update<User>(STORAGE_KEYS.USERS, createdUser.id, { ownerId: createdOwner.id });

  // 4. Create Subscription (Only if planId is selected)
  if (data.planId && data.planId !== 'none') {
    const subscription = {
      id: createId('sub'),
      ownerId: createdOwner.id,
      planId: data.planId,
      billingCycle: data.billingCycle,
      maxProperties: data.maxProperties,
      maxBeds: data.maxBeds,
      maxStaff: data.maxStaff,
      features: data.features,
      status: 'active',
      startDate: now,
      endDate: data.billingCycle === 'yearly' ? new Date(Date.now() + 365*24*60*60*1000).toISOString() : new Date(Date.now() + 30*24*60*60*1000).toISOString(),
      createdAt: now,
      updatedAt: now,
      createdBy: adminId,
      updatedBy: adminId,
      isDeleted: false
    };
    db.insert(STORAGE_KEYS.SUBSCRIPTIONS, subscription);
  }

  // 5. Audit Log
  db.insert(STORAGE_KEYS.AUDIT_LOGS, {
    id: createId('aud'),
    action: 'OWNER_CREATED',
    actorId: adminId,
    targetId: createdOwner.id,
    details: `Created owner ${data.businessName} (${data.email})`,
    createdAt: now,
    updatedAt: now,
    createdBy: adminId,
    updatedBy: adminId,
    isDeleted: false
  });

  // 6. Update Request if linked
  if (data.requestId) {
    ownerRequestsApi.updateStatus(data.requestId, 'Approved');
  }

  return { user: createdUser, owner: createdOwner };
}
