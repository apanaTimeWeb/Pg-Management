/**
 * RESPONSIBILITY: Centralized URL configuration for the Student module.
 * Never hardcode URLs in components or API wrappers. Use this file.
 */

export const STUDENT_ROUTES = {
  // Page Routes
  DASHBOARD: '/student/dashboard',
  PROFILE: '/student/profile',
  RENT: '/student/rent',
  MESS: '/student/mess',
  DOCUMENTS: '/student/documents',
  NOTICES: '/student/notices',
  COMPLAINTS: '/student/complaints',
  NEW_COMPLAINT: '/student/complaints/new',
  NOTICE_PERIOD: '/student/notice-period',
  SOS: '/student/sos',
  LOGIN: '/student/login',
};

export const STUDENT_API_ENDPOINTS = {
  PROFILE: '/api/v1/student/profile',
  RENT_HISTORY: '/api/v1/student/rent-history',
  DOCUMENTS: '/api/v1/student/documents',
  MESS_MENU: '/api/v1/student/mess-menu',
  NOTICES: '/api/v1/student/notices',
  COMPLAINTS: '/api/v1/student/complaints',
};
