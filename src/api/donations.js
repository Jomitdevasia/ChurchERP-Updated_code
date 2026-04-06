import axiosInstance from './axiosConfig';

export const donationsAPI = {
  getAllDonations: (params) => {
    return axiosInstance.get('/donations', { params });
  },
  
  getDonationById: (id) => {
    return axiosInstance.get(`/donations/${id}`);
  },
  
  createDonation: (data) => {
    return axiosInstance.post('/donations/create', data);
  },
  
  updateDonation: (id, data) => {
    return axiosInstance.put(`/donations/${id}`, data);
  },
  
  deleteDonation: (id) => {
    return axiosInstance.delete(`/donations/${id}`);
  },
  
  getDonationTypes: () => {
    return axiosInstance.get('/donations/types');
  },
  
  getDonationReports: (type, params) => {
    return axiosInstance.get(`/reports/donations/${type}`, { params });
  },
  
  getMemberDonations: (memberId, params) => {
    return axiosInstance.get(`/donations/member/${memberId}`, { params });
  },
  
  exportDonations: async (params, format = 'pdf') => {
    try {
      const response = await axiosInstance.get('/donations/export', {
        params: { ...params, format },
        responseType: 'blob'
      });
      return response;
    } catch (error) {
      console.error('Export failed:', error);
      throw error;
    }
  },
  
  getDonationSummary: (year) => {
    return axiosInstance.get('/donations/summary', { params: { year } });
  }
};