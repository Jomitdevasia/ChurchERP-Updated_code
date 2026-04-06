import axiosInstance from './axiosConfig';

export const reportsAPI = {
  // Families
  getFamiliesByWard: () => axiosInstance.get('/reports/families-by-ward'),
  
  // Members
  getMembersByGender: () => axiosInstance.get('/reports/members-by-gender'),
  getMemberGrowth: (year) => axiosInstance.get('/reports/member-growth', { params: { year } }),
  
  // Sacraments
  getSacramentsSummary: (year) => axiosInstance.get('/reports/sacraments-summary', { params: { year } }),
  
  // Donations
  getDonationsByType: (year) => axiosInstance.get('/reports/donations-by-type', { params: { year } }),
  getMonthlyDonations: (year) => axiosInstance.get('/reports/monthly-donations', { params: { year } }),
  
  // Finance
  getFinanceSummary: (year) => axiosInstance.get('/finance/reports/summary', { params: { year } }),
  getMonthlyFinance: (year) => axiosInstance.get('/finance/reports/monthly', { params: { year } }),
  
  // Events
  getEventsSummary: (year) => axiosInstance.get('/reports/events-summary', { params: { year } }),
  
  // Hall Bookings
  getHallBookingsRevenue: (year) => axiosInstance.get('/reports/hall-bookings-revenue', { params: { year } }),
  
  // Export
  exportReport: (type, params, format = 'pdf') => {
    return axiosInstance.get(`/reports/export/${type}`, {
      params: { ...params, format },
      responseType: 'blob'
    });
  }
};