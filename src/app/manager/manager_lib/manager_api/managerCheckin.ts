import type { BaseEntity } from '@/lib/storage/db';
import { db } from '@/lib/storage/db';
import { STORAGE_KEYS } from '@/lib/storage/keys';
import { createId } from '@/lib/utils/id';
import type { User } from '@/lib/types/models';
;
import { managerEnquiriesApi } from '@/app/manager/manager_lib/manager_api/managerEnquiries';
export const managerCheckinApi = {
  getVacantBeds: (propertyId: string) => {
    if (!propertyId) return [];
    const rooms = db.getAll<BaseEntity & { propertyId?: string; isDeleted?: boolean; [key: string]: unknown }>(STORAGE_KEYS.ROOMS).filter(r => r.propertyId === propertyId && !r.isDeleted);
    const roomIds = rooms.map(r => r.id);
    const beds = db.getAll<BaseEntity & { propertyId?: string; isDeleted?: boolean; [key: string]: unknown }>(STORAGE_KEYS.BEDS).filter(b => roomIds.includes(b.roomId as string) && (b.status === 'vacant' || b.status === 'available' || b.status === 'Vacant') && !b.isDeleted);
    return beds.map(b => {
      const room = rooms.find(r => r.id === b.roomId);
      return {
        ...b,
        roomNumber: room?.number || room?.roomNumber
      };
    });
  },
  getCompatibilityScore: (roomId: string, currentStudentAnswers: unknown, newStudentAnswers: unknown) => {
    // Mock simple compatibility score
    // In real app, we would fetch existing occupying student answers in this room
    return Math.floor(Math.random() * 40) + 60; // 60-100 score
  },
  commitCheckin: (data: unknown) => {
    const now = new Date().toISOString();
    const actorId = (data as Record<string, unknown>).managerId || 'system';
    // 1. Create Parent User & Profile if provided
    let parentId = '';
    // @ts-expect-error
    if (data.parent.name && (data as Record<string, unknown>).parent.phone) {
      const pUser: User = {
        id: createId('usr'),
        role: 'parent',
        // @ts-expect-error
        name: (data as Record<string, unknown>).parent.name,
        // @ts-expect-error
        email: (data as Record<string, unknown>).parent.email || `parent_${data.parent.phone}@example.com`,
        // @ts-expect-error
        phone: (data as Record<string, unknown>).parent.phone,
        // @ts-expect-error
        password: (data as Record<string, unknown>).credentials.password || 'Parent@123',
        status: 'Active',
        // @ts-expect-error
        createdAt: now, updatedAt: now, createdBy: actorId, updatedBy: actorId, isDeleted: false
      };
      db.insert(STORAGE_KEYS.USERS, pUser);
      const pProfile = {
        id: createId('par'),
        userId: pUser.id,
        relation: 'parent',
        createdAt: now, updatedAt: now, createdBy: actorId, updatedBy: actorId, isDeleted: false
      };
      // @ts-expect-error
      db.insert(STORAGE_KEYS.PARENTS, pProfile);
      parentId = pUser.id; // Or profile ID depending on relation mapping, we use user ID for simplicity
    }
    // 2. Create Student User
    const tUser: User = {
      id: createId('usr'),
      role: 'student',
      // @ts-expect-error
      name: (data as Record<string, unknown>).personal.name,
      // @ts-expect-error
      email: (data as Record<string, unknown>).personal.email,
      // @ts-expect-error
      phone: (data as Record<string, unknown>).personal.phone,
      // @ts-expect-error
      password: (data as Record<string, unknown>).credentials.password || 'Student@123',
      status: 'Active',
      mustChangePassword: true,
      // @ts-expect-error
      createdAt: now, updatedAt: now, createdBy: actorId, updatedBy: actorId, isDeleted: false
    };
    db.insert(STORAGE_KEYS.USERS, tUser);
    // Calculate Stay Dates
    const stayStartDate = new Date();
    const stayEndDate = new Date(stayStartDate);
    // @ts-expect-error
    stayEndDate.setMonth(stayEndDate.getMonth() + Number(data.deposit.stayDuration || 3));
    // 3. Create Student Profile
    const tProfile = {
      id: createId('ten'),
      userId: tUser.id,
      propertyId: (data as Record<string, unknown>).propertyId,
      // @ts-expect-error
      roomId: (data as Record<string, unknown>).room.roomId,
      // @ts-expect-error
      bedId: (data as Record<string, unknown>).room.bedId,
      status: 'active',
      // @ts-expect-error
      rentAmount: parseInt(data.deposit.rentAmount) || 0,
      duesAmount: 0,
      pgScore: 100,
      parentId,
      // @ts-expect-error
      parentName: (data as Record<string, unknown>).parent.name,
      // @ts-expect-error
      parentPhone: (data as Record<string, unknown>).parent.phone,
      // @ts-expect-error
      agreementAccepted: (data as Record<string, unknown>).agreement.accepted,
      // @ts-expect-error
      agreementTimestamp: (data as Record<string, unknown>).agreement.accepted ? now : undefined,
      stayStartDate: stayStartDate.toISOString().split('T')[0],
      stayEndDate: stayEndDate.toISOString().split('T')[0],
      // @ts-expect-error
      aadharNumber: (data as Record<string, unknown>).documents?.aadharNumber || '',
      // @ts-expect-error
      panNumber: (data as Record<string, unknown>).documents?.panNumber || '',
      createdAt: now, updatedAt: now, createdBy: actorId, updatedBy: actorId, isDeleted: false
    };
    // @ts-expect-error
    db.insert(STORAGE_KEYS.STUDENTS, tProfile);
    // Generate Rent Schedule (Invoices)
    let totalDues = 0;
    const current = new Date(stayStartDate);
    while (current <= stayEndDate) {
      const monthYear = current.toLocaleString('default', { month: 'short', year: 'numeric' });
      db.insert(STORAGE_KEYS.INVOICES, {
        id: createId('inv'),
        propertyId: (data as Record<string, unknown>).propertyId,
        studentId: tUser.id,
        // @ts-expect-error
        amount: parseInt(data.deposit.rentAmount) || 0,
        status: 'Pending',
        type: 'Rent',
        dueDate: new Date(current.getFullYear(), current.getMonth(), 5).toISOString(),
        description: `Rent for ${monthYear}`,
        createdAt: now,
        updatedAt: now,
        // @ts-expect-error
        createdBy: actorId,
        // @ts-expect-error
        updatedBy: actorId,
        isDeleted: false
      });
      // @ts-expect-error
      totalDues += (parseInt(data.deposit.rentAmount) || 0);
      current.setMonth(current.getMonth() + 1);
    }
    // Update initial dues
    db.update<BaseEntity & { propertyId?: string; isDeleted?: boolean; [key: string]: unknown }>(STORAGE_KEYS.STUDENTS, tProfile.id, {
      duesAmount: totalDues
    });
    // 4. Mark Bed as Occupied
    // @ts-expect-error
    db.update<BaseEntity & { propertyId?: string; isDeleted?: boolean; [key: string]: unknown }>(STORAGE_KEYS.BEDS, (data as Record<string, unknown>).room.bedId, {
      status: 'Occupied',
      studentId: tUser.id,
      updatedAt: now,
      // @ts-expect-error
      updatedBy: actorId
    });
    // 5. Save Documents
    // @ts-expect-error
    if (data.documents.files && (data as Record<string, unknown>).documents.files.length > 0) {
      // @ts-expect-error
      (data as Record<string, unknown>).documents.files.forEach((file: Record<string, unknown>) => {
        db.insert(STORAGE_KEYS.DOCUMENTS, {
          id: createId('doc'),
          uploaderId: tUser.id,
          propertyId: (data as Record<string, unknown>).propertyId,
          type: 'id_proof',
          url: file.name, // mock storing filename as URL
          status: 'verified',
          // @ts-expect-error
          createdAt: now, updatedAt: now, createdBy: actorId, updatedBy: actorId, isDeleted: false
        });
      });
    }
    // 6. Create Agreement
    // @ts-expect-error
    if (data.agreement.accepted) {
      db.insert(STORAGE_KEYS.AGREEMENTS, {
        id: createId('agr'),
        studentId: tUser.id,
        propertyId: (data as Record<string, unknown>).propertyId,
        // @ts-expect-error
        depositType: (data as Record<string, unknown>).deposit.type,
        // @ts-expect-error
        loanPartner: (data as Record<string, unknown>).deposit.loanPartner,
        acceptedAt: now,
        // @ts-expect-error
        createdAt: now, updatedAt: now, createdBy: actorId, updatedBy: actorId, isDeleted: false
      });
    }
    // 7. Initialize Mess Wallet
    db.insert(STORAGE_KEYS.WALLETS, {
      id: createId('wal'),
      studentId: tUser.id,
      balance: 0,
      // @ts-expect-error
      createdAt: now, updatedAt: now, createdBy: actorId, updatedBy: actorId, isDeleted: false
    });
    // 8. If from Enquiry, mark converted
    // @ts-expect-error
    if (data.enquiryId) {
      // @ts-expect-error
      managerEnquiriesApi.updateStatus(data.enquiryId, 'converted', actorId);
    }
    // 9. Audit Log
    db.insert(STORAGE_KEYS.AUDIT_LOGS, {
      id: createId('aud'),
      action: 'STUDENT_CHECKED_IN',
      actorId: actorId,
      targetId: tUser.id,
      // @ts-expect-error
      details: `Checked in ${data.personal.name} to bed ${data.room.bedId}`,
      // @ts-expect-error
      createdAt: now, updatedAt: now, createdBy: actorId, updatedBy: actorId, isDeleted: false
    });
    return { success: true, studentUserId: tUser.id };
  }
};