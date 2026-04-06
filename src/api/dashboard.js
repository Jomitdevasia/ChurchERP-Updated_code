import axiosInstance from './axiosConfig';

export const dashboardAPI = {
  getDashboardStats: async () => {
    try {
      const response = await axiosInstance.get('/dashboard');
      return response;
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      return { data: { totalFamilies: 0, totalMembers: 0, totalDonations: 0 } };
    }
  },
  
  getMonthlyDonations: async (year, month) => {
    try {
      const response = await axiosInstance.get('/reports/monthly-donations', {
        params: { year, month }
      });
      return response;
    } catch (error) {
      console.error('Error fetching monthly donations:', error);
      return { data: [] };
    }
  },
  
  getMemberGrowth: async (period = 'monthly') => {
    try {
      const response = await axiosInstance.get('/reports/member-growth', {
        params: { period }
      });
      return response;
    } catch (error) {
      console.error('Error fetching member growth:', error);
      return { data: [] };
    }
  },
  
  getRecentActivities: async (limit = 10) => {
    try {
      const response = await axiosInstance.get('/dashboard/recent-activities', {
        params: { limit }
      });
      return response;
    } catch (error) {
      console.error('Error fetching recent activities:', error);
      return { data: [] };
    }
  },
  
  getUpcomingEvents: async (limit = 5) => {
    try {
      const response = await axiosInstance.get('/dashboard/upcoming-events', {
        params: { limit }
      });
      return response;
    } catch (error) {
      console.error('Error fetching upcoming events:', error);
      return { data: [] };
    }
  },
  
  getSacramentStats: async () => {
    try {
      const response = await axiosInstance.get('/dashboard/sacrament-stats');
      console.log('API Response:', response);
      return response;
    } catch (error) {
      console.error('Error fetching sacrament stats:', error);
      return { data: { baptisms: 0, communions: 0, confirmations: 0, marriages: 0, total: 0 } };
    }
  },
  
  // ADD THIS NEW METHOD:
  getDashboardTrends: async () => {
    try {
      const response = await axiosInstance.get('/dashboard/trends');
      console.log('Trends API Response:', response);
      return response;
    } catch (error) {
      console.error('Error fetching dashboard trends:', error);
      return { 
        data: { 
          families: { positive: true, value: 0 }, 
          members: { positive: true, value: 0 }, 
          donations: { positive: true, value: 0 }, 
          sacraments: { positive: true, value: 0 } 
        } 
      };
    }
  }
};