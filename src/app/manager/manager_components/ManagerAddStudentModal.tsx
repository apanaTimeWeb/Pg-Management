// RESPONSIBILITY: Renders the ManagerAddStudentModal component.
'use client';
import React, { useState, useEffect } from 'react';
import { X, User, Home, IndianRupee, Users, Eye, EyeOff } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { api } from '@/app/manager/manager_lib/manager_api/ManagerApi';
import { useManagerSession } from '@/app/manager/manager_components/manager_hooks/useManagerSession';

const studentSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email'),
  phone: z.string().min(10, 'Valid phone required'),
  password: z.string().optional(),
  bedId: z.string().min(1, 'Bed is required'),
  roomId: z.string().optional(),
  rentAmount: z.number().min(0, 'Rent must be positive'),
  stayDuration: z.number().min(1).max(12),
  hasMessFacility: z.boolean(),
  parentName: z.string().optional(),
  parentEmail: z.string().email('Invalid email').optional().or(z.literal('')),
  parentPhone: z.string().optional()
});

type StudentFormData = z.infer<typeof studentSchema>;

interface AddStudentModalProps {
  propertyId: string;
  onClose: () => void;
  onSuccess: () => void;
}

export function ManagerAddStudentModal({ propertyId, onClose, onSuccess }: AddStudentModalProps) {
  const user = useManagerSession();
  
  const [error, setError] = useState('');
  const [availableBeds, setAvailableBeds] = useState<Record<string, any>[]>([]);
  const [rooms, setRooms] = useState<Record<string, any>[]>([]);
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitting } } = useForm<StudentFormData>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      name: '', email: '', phone: '', password: '', bedId: '', roomId: '',
      rentAmount: 0, stayDuration: 3, hasMessFacility: false,
      parentName: '', parentEmail: '', parentPhone: ''
    }
  });

  const selectedBedId = watch('bedId');

  useEffect(() => {
    const allRooms = api.rooms.listByProperty(propertyId) as Record<string, any>[];
    const allBeds = api.beds.listByProperty(propertyId) as Record<string, any>[];
    setRooms(allRooms);
    setAvailableBeds(allBeds.filter((b) => b.status === 'available'));
  }, [propertyId]);

  useEffect(() => {
    if (selectedBedId) {
      const bed = availableBeds.find(b => String(b.id) === selectedBedId);
      if (bed) {
        const room = rooms.find(r => String(r.id) === String(bed.roomId));
        setValue('roomId', String(room?.id || ''));
        if (room?.rentPerBed) {
          setValue('rentAmount', Number(room.rentPerBed));
        }
      }
    }
  }, [selectedBedId, availableBeds, rooms, setValue]);

  const onSubmit = async (data: StudentFormData) => {
    setError('');
    try {
      const startDate = new Date();
      const endDate = new Date(startDate);
      endDate.setMonth(endDate.getMonth() + Number(data.stayDuration));
      
      const payload = {
        ...data,
        propertyId,
        stayStartDate: startDate.toISOString().split('T')[0],
        stayEndDate: endDate.toISOString().split('T')[0]
      };
      
      (api.students as any).onboardStudent(payload, user?.id || '');
      onSuccess();
    } catch (err: any) {
      setError(err?.message || 'Failed to onboard student');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in fade-in zoom-in motion-safe:duration-300">
        <div className="flex items-center justify-between p-6 border-b border-border sticky top-0 bg-card z-10">
          <div>
            <h2 className="text-xl font-bold text-primary">Onboard New Student</h2>
            <p className="text-sm text-secondary mt-1">Fill in the details to create a student account.</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-input rounded-full text-secondary motion-safe:transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-8">
          {error && (
            <div className="p-3 bg-danger-bg border border-danger text-danger rounded-lg text-sm">
              {error}
            </div>
          )}
          {/* Student Details */}
          <section>
            <h3 className="text-sm font-bold text-primary uppercase tracking-wider mb-4 flex items-center gap-2">
              <User className="w-4 h-4" /> Personal Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-secondary mb-1">Full Name *</label>
                <input {...register('name')} className="w-full bg-input border border-border rounded-[var(--radius-md,8px)] px-3 py-2 text-primary focus:outline-none focus:border-primary" placeholder="John Doe" />
                {errors.name && <p className="text-danger text-xs mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary mb-1">Email *</label>
                <input type="email" {...register('email')} className="w-full bg-input border border-border rounded-[var(--radius-md,8px)] px-3 py-2 text-primary focus:outline-none focus:border-primary" placeholder="john@example.com" />
                {errors.email && <p className="text-danger text-xs mt-1">{errors.email.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary mb-1">Phone Number *</label>
                <input type="tel" {...register('phone')} className="w-full bg-input border border-border rounded-[var(--radius-md,8px)] px-3 py-2 text-primary focus:outline-none focus:border-primary" placeholder="+91 9876543210" />
                {errors.phone && <p className="text-danger text-xs mt-1">{errors.phone.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary mb-1">Temporary Password</label>
                <div className="relative">
                  <input type={showPassword ? 'text' : 'password'} {...register('password')} className="w-full bg-input border border-border rounded-[var(--radius-md,8px)] pl-3 pr-10 py-2 text-primary focus:outline-none focus:border-primary" placeholder="Default: Student@123" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-2.5 text-secondary hover:text-primary">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          </section>
          {/* Stay Details */}
          <section>
            <h3 className="text-sm font-bold text-primary uppercase tracking-wider mb-4 flex items-center gap-2">
              <Home className="w-4 h-4" /> Stay Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-secondary mb-1">Select Room & Bed *</label>
                <select {...register('bedId')} className="w-full bg-input border border-border rounded-[var(--radius-md,8px)] px-3 py-2 text-primary focus:outline-none focus:border-primary">
                  <option value="">-- Select Available Bed --</option>
                  {availableBeds.map(bed => {
                    const room = rooms.find(r => String(r.id) === String(bed.roomId));
                    return (
                      <option key={String(bed.id)} value={String(bed.id)}>
                        Room {String(room?.roomNumber || room?.number || 'Unknown')} - Bed {String(bed.code || bed.name || 'Unknown')}
                      </option>
                    );
                  })}
                </select>
                {availableBeds.length === 0 && <p className="text-xs text-warning mt-1">No vacant beds available in this PG.</p>}
                {errors.bedId && <p className="text-danger text-xs mt-1">{errors.bedId.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary mb-1">Monthly Rent *</label>
                <div className="relative">
                  <IndianRupee className="absolute left-3 top-2.5 w-4 h-4 text-secondary" />
                  <input type="number" min="0" onKeyDown={e => ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault()} {...register('rentAmount', { valueAsNumber: true })} className="w-full bg-input border border-border rounded-[var(--radius-md,8px)] pl-9 pr-3 py-2 text-primary focus:outline-none focus:border-primary" placeholder="8000" />
                </div>
                {errors.rentAmount && <p className="text-danger text-xs mt-1">{errors.rentAmount.message}</p>}
              </div>
              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-secondary mb-1">Stay Duration (Months) *</label>
                <select {...register('stayDuration', { valueAsNumber: true })} className="w-full bg-input border border-border rounded-[var(--radius-md,8px)] px-3 py-2 text-primary focus:outline-none focus:border-primary">
                  {[1, 2, 3, 4, 5, 6, 9, 12].map(months => (
                    <option key={months} value={months}>{months} {months === 1 ? 'Month' : 'Months'}</option>
                  ))}
                </select>
                <p className="text-xs text-secondary mt-1">Rent schedule will be generated automatically for this duration.</p>
              </div>
              <div className="col-span-1 md:col-span-2">
                <label className="flex items-center gap-3 p-3 bg-input border border-border rounded-[var(--radius-md,8px)] cursor-pointer">
                  <input 
                    type="checkbox" 
                    {...register('hasMessFacility')}
                    className="w-5 h-5 accent-[var(--primary)]"
                  />
                  <div>
                    <div className="font-bold text-primary">Enable Mess Facility</div>
                    <div className="text-xs text-secondary">If checked, include the mess charges in the Monthly Rent above.</div>
                  </div>
                </label>
              </div>
            </div>
          </section>
          {/* Parent Details */}
          <section>
            <h3 className="text-sm font-bold text-primary uppercase tracking-wider mb-4 flex items-center gap-2">
              <Users className="w-4 h-4" /> Parent/Guardian Details (Optional)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-secondary mb-1">Parent Name</label>
                <input {...register('parentName')} className="w-full bg-input border border-border rounded-[var(--radius-md,8px)] px-3 py-2 text-primary focus:outline-none focus:border-primary" placeholder="Parent's Name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary mb-1">Parent Email</label>
                <input type="email" {...register('parentEmail')} className="w-full bg-input border border-border rounded-[var(--radius-md,8px)] px-3 py-2 text-primary focus:outline-none focus:border-primary" placeholder="For Parent App Access" />
                {errors.parentEmail && <p className="text-danger text-xs mt-1">{errors.parentEmail.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary mb-1">Parent Phone</label>
                <input type="tel" {...register('parentPhone')} className="w-full bg-input border border-border rounded-[var(--radius-md,8px)] px-3 py-2 text-primary focus:outline-none focus:border-primary" placeholder="+91 9876543210" />
              </div>
            </div>
          </section>
          <div className="pt-4 border-t border-border flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 text-secondary hover:bg-input rounded-[var(--radius-md,8px)] font-medium motion-safe:transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting} className="px-6 py-2 bg-primary hover:bg-primary-hover text-white rounded-[var(--radius-md,8px)] font-bold motion-safe:transition-colors disabled:opacity-50">
              {isSubmitting ? 'Creating...' : 'Onboard Student'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}