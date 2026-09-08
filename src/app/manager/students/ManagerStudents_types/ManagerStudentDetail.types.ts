export interface StudentProfile {
  id: string; 
  userId?: string; 
  bedId?: string; 
  createdAt: string; 
  status?: string;
  parentName?: string; 
  parentPhone?: string; 
  rentAmount?: number; 
  duesAmount?: number;
  hasMessFacility?: boolean; 
  pgScore?: number; 
  stayStartDate?: string; 
  stayEndDate?: string;
  roomId?: string;
  propertyId?: string;
}

export interface StudentUser {
  id: string; 
  name: string; 
  phone?: string; 
  email?: string;
}

export interface StudentDetail {
  user: StudentUser;
  profile: StudentProfile;
}

export interface Invoice {
  id: string; 
  month?: string; 
  type?: string; 
  dueDate: string; 
  status?: string;
  title?: string; 
  description?: string; 
  amount: number;
  electricityBillAmount?: number; 
  electricityBillImage?: string;
}
