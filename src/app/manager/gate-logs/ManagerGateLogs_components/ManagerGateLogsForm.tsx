// RESPONSIBILITY: Renders the ManagerGateLogsForm component.
// [COMPONENT] ManagerGateLogsForm
// Responsibility: Standalone form for manually logging student entry/exit events.
// Uses React Hook Form + Zod (GateLogFormSchema) for validation and reset.
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { GateLogFormSchema } from '@/app/manager/gate-logs/ManagerGateLogs_types/ManagerGateLogs.types';
import type { GateLogFormData } from '@/app/manager/gate-logs/ManagerGateLogs_types/ManagerGateLogs.types';
interface ManagerGateLogsFormProps {
  handleAdd: (studentId: string, type: 'entry' | 'exit', isLate: boolean) => void;
}
export function ManagerGateLogsForm({ handleAdd }: ManagerGateLogsFormProps) {
  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<GateLogFormData>({
    // @ts-expect-error
    resolver: zodResolver(GateLogFormSchema) as unknown,
    defaultValues: { studentId: '', type: 'entry', isLate: false },
  });
  const watchedType = watch('type');
  const onSubmit = (data: GateLogFormData) => {
    handleAdd(data.studentId, data.type, data.isLate);
    reset({ studentId: '', type: 'entry', isLate: false });
  };
  return (
    <div className="bg-card border border p-5 rounded-[var(--radius-lg,12px)] sticky top-6">
      <h2 className="font-bold text-lg text-primary mb-4">Manual Entry</h2>
      <form onSubmit={handleSubmit(onSubmit as any)} className="space-y-4">
        <div>
          <label className="block text-sm text-secondary mb-1">Student ID</label>
          <input
            type="text"
            {...register('studentId')}
            placeholder="e.g. ten_123"
            className="w-full bg-input border border px-3 py-2 rounded text-primary focus:outline-none focus:border-primary"
          />
          {errors.studentId && <p className="text-xs text-danger mt-1">{errors.studentId.message}</p>}
        </div>
        <div>
          <label className="block text-sm text-secondary mb-1">Type</label>
          <select
            {...register('type')}
            className="w-full bg-input border border px-3 py-2 rounded text-primary focus:outline-none focus:border-primary"
          >
            <option value="entry">Entry</option>
            <option value="exit">Exit</option>
          </select>
        </div>
        {watchedType === 'entry' && (
          <label className="flex items-center gap-2 cursor-pointer text-sm text-primary mt-2">
            <input
              type="checkbox"
              {...register('isLate')}
              className="accent-[var(--danger)] w-4 h-4"
            />
            Flag as Late Entry
          </label>
        )}
        <button type="submit" className="w-full py-2 bg-primary text-white rounded font-medium mt-4">
          Log {watchedType}
        </button>
      </form>
    </div>
  );
}