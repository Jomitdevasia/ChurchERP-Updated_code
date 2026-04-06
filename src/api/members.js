import axiosInstance from './axiosConfig';

export const membersAPI = {
  getAllMembers: (params) => {
    return axiosInstance.get('/members', { params });
  },
  
  getMemberById: (id) => {
    return axiosInstance.get(`/members/${id}`);
  },
  
  createMember: (data) => {
    return axiosInstance.post('/members/create', data);
  },
  
  updateMember: (id, data) => {
    return axiosInstance.put(`/members/${id}`, data);
  },
  
  deleteMember: (id) => {
    return axiosInstance.delete(`/members/${id}`);
  },
  
  getMemberSacraments: (id) => {
    return axiosInstance.get(`/members/${id}/sacraments`);
  },
  
  getMemberDonations: (id, params) => {
    return axiosInstance.get(`/members/${id}/donations`, { params });
  },
  
  getMemberFamilies: (id) => {
    return axiosInstance.get(`/members/${id}/families`);
  },
  
  searchMembers: (query) => {
    return axiosInstance.get('/members/search', { params: { q: query } });
  },
  
  exportMembers: async (format = 'pdf') => {
    try {
      const response = await axiosInstance.get(`/members/export/${format}`, {
        responseType: 'blob'
      });
      return response;
    } catch (error) {
      console.error('Export failed:', error);
      throw error;
    }
  },
  
  getMemberStatistics: () => {
    return axiosInstance.get('/members/statistics');
  },
  
  getBirthdays: (month) => {
    return axiosInstance.get('/members/birthdays', { params: { month } });
  },
  
  getAnniversaries: (month) => {
    return axiosInstance.get('/members/anniversaries', { params: { month } });
  }
};