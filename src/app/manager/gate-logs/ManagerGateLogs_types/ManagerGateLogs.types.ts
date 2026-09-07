// [TYPES] ManagerGateLogs
import { z } from 'zod';

export interface GateLog {
  id: string;
  propertyId: string;
  studentId: string;
  type: 'entry' | 'exit';
  timestamp: string;
  isLate: boolean;
  managerId: string;
}

export const GateLogFormSchema = z.object({
  studentId: z.string().min(1, 'Student ID is required'),
  type: z.enum(['entry', 'exit']),
  isLate: z.boolean(),
});

export type GateLogFormData = z.infer<typeof GateLogFormSchema>;

export interface ManagerGateLogsData {
  logs: GateLog[];
  loading: boolean;
  currentPage: number;
  totalPages: number;
  paginatedData: GateLog[];
}

export interface UseManagerGateLogsReturn extends ManagerGateLogsData {
  setCurrentPage: (p: number) => void;
  handleAdd: (studentId: string, type: 'entry' | 'exit', isLate: boolean) => void;
  selectedPropertyId: string | null;
  ctxLoading: boolean;
}
