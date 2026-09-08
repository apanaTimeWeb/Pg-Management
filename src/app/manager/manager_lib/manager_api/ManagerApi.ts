import { managerEnquiriesApi } from './managerEnquiries';
import { managerCheckinApi } from './managerCheckin';
import { mealsApi } from './ManagerMeals';
import { managerOperationsApi } from './managerOperations';
import { managerDashboardApi } from './managerDashboard';
import { authApi } from './ManagerAuth';
import { 
  studentsApi, roomsApi, bedsApi, propertiesApi, 
  foodApi, financeApi, stockRequestsApi 
} from './managerSharedApi';

export const api = {
  ...authApi,
  managerDashboard: managerDashboardApi,
  managerOperations: managerOperationsApi,
  managerEnquiries: managerEnquiriesApi,
  meals: mealsApi,
  managerMeals: mealsApi,
  checkin: managerCheckinApi,
  managerCheckin: managerCheckinApi,
  enquiries: managerEnquiriesApi,
  students: studentsApi,
  rooms: roomsApi,
  beds: bedsApi,
  properties: propertiesApi,
  food: foodApi,
  finance: financeApi,
  stockRequests: stockRequestsApi,
};