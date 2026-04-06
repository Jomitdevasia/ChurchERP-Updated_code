import axiosInstance from './axiosConfig';

export const familiesAPI = {
  getAllFamilies: (params) => {
    return axiosInstance.get('/families', { params });
  },
  
  getFamilyById: (id) => {
    return axiosInstance.get(`/families/${id}`);
  },
  
  createFamily: (data) => {
    return axiosInstance.post('/families/create', data);
  },
  
  updateFamily: (id, data) => {
    return axiosInstance.put(`/families/${id}`, data);
  },
  
  deleteFamily: (id) => {
    return axiosInstance.delete(`/families/${id}`);
  },
  
  getFamilyMembers: (id) => {
    return axiosInstance.get(`/families/${id}/members`);
  },
  
  getFamilyDonations: (id, params) => {
    return axiosInstance.get(`/families/${id}/donations`, { params });
  },
  
  exportFamilies: async (format = 'pdf') => {
    try {
      const response = await axiosInstance.get(`/families/export/${format}`, {
        responseType: 'blob'
      });
      return response;
    } catch (error) {
      console.error('Export failed:', error);
      throw error;
    }
  },

  getFamilyStatistics: () => {
    return axiosInstance.get('/families/statistics');
  }
};