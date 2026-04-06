import axiosInstance from './axiosConfig';

export const sacramentsAPI = {
  getSacramentsDashboard: () => {
    return axiosInstance.get('/sacraments/dashboard');
  },
  
  getAllSacraments: (params) => {
    return axiosInstance.get('/sacraments/records', { params });
  },
  
  getSacramentById: (id) => {
    return axiosInstance.get(`/sacraments/${id}`);
  },
  
  createSacrament: (data) => {
    return axiosInstance.post('/sacraments/create', data);
  },
  
  updateSacrament: (id, data) => {
    return axiosInstance.put(`/sacraments/${id}`, data);
  },
  
  deleteSacrament: (id) => {
    return axiosInstance.delete(`/sacraments/${id}`);
  },
  
  getSacramentTypes: () => {
    return axiosInstance.get('/sacraments/types');
  },
  
  getSacramentStats: (year) => {
    return axiosInstance.get('/sacraments/stats', { params: { year } });
  },
  
  getMemberSacraments: (memberId) => {
    return axiosInstance.get(`/sacraments/member/${memberId}`);
  },
  
  generateSacramentCertificate: (id) => {
    return axiosInstance.get(`/sacraments/${id}/certificate`, {
      responseType: 'blob'
    });
  },
  
  getSacramentByType: (type, params) => {
    return axiosInstance.get(`/sacraments/type/${type}`, { params });
  }
};