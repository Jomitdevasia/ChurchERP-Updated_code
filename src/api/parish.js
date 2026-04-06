import axiosInstance from './axiosConfig';

export const parishAPI = {
  getParishDetails: () => {
    return axiosInstance.get('/parish');
  },
  
  updateParish: (data) => {
    return axiosInstance.put('/parish/update', data);
  },
  
  getParishStats: () => {
    return axiosInstance.get('/parish/stats');
  },
  
  getParishHistory: () => {
    return axiosInstance.get('/parish/history');
  },
  
  uploadParishImage: (formData) => {
    return axiosInstance.post('/parish/upload-image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  
  getMassSchedules: () => {
    return axiosInstance.get('/parish/mass-schedules');
  },
  
  updateMassSchedules: (schedules) => {
    return axiosInstance.put('/parish/mass-schedules', schedules);
  }
};