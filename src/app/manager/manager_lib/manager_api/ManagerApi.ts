import { authApi } from './ManagerAuth';
import { managerDashboardApi } from './managerDashboard';
import { managerOperationsApi } from './managerOperations';
import { mealsApi } from './ManagerMeals';
import { managerCheckinApi } from './managerCheckin';
import { managerEnquiriesApi } from './managerEnquiries';
import { studentsApi } from '@/app/owner/owner_lib/owner_api/OwnerStudents';
import { roomsApi } from '@/app/owner/owner_lib/owner_api/OwnerRooms';
import { bedsApi } from '@/app/owner/owner_lib/owner_api/OwnerBeds';
import { propertiesApi } from '@/app/owner/owner_lib/owner_api/OwnerProperties';
import { foodApi } from '@/app/owner/owner_lib/owner_api/OwnerFood';
import { financeApi } from '@/app/owner/owner_lib/owner_api/OwnerFinance';
import { stockRequestsApi } from '@/app/staff/staff_lib/staff_api/StaffStockRequests';
export const api = {
  ...authApi,
  managerDashboard: managerDashboardApi,
  managerOperations: managerOperationsApi,
  meals: mealsApi,
  checkin: managerCheckinApi,
  enquiries: managerEnquiriesApi,
  students: studentsApi,
  rooms: roomsApi,
  beds: bedsApi,
  properties: propertiesApi,
  food: foodApi,
  finance: financeApi,
  stockRequests: stockRequestsApi,
};